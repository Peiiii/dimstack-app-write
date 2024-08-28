import {
  ServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { nanoid } from "@reduxjs/toolkit";
import xbook from "xbook/index";
export default createTreeHelper<FolderTreeNode>().createPlugin({
  addOptions() {
    return {
      editable: ({ level, node }): boolean => false,
      renameNode: (() => {}) as (node: FolderTreeNode, name: string) => void,
    };
  },
  activate({ viewSystem, serviceBus, eventBus, dataStore, pipe }) {
    viewSystem.addNodeMenuItems([
      {
        id: "editNode",
        key: "editNode",
        event: TreeEventKeys.EditNode.name,
        name: "编辑",
        label: "编辑",
        icon: "AiFillEdit",
        when: "level >= 1",
      },
    ]);
    const treeService = serviceBus.createProxy(ServicePoints.TreeService);
    serviceBus.expose(
      ServicePoints.EditInputNodeName,
      ({ parentId, callback, nodeType, defaultName }) => {
        setTimeout(() => {
          const childId = nanoid();
          dataStore.getActions().add({
            node: { id: childId, type: nodeType, name: defaultName || "" },
            parentId,
          });
          viewSystem.viewStateStore.getActions().upsert({
            ...viewSystem.getViewStateOrDefaultViewState(parentId),
            expanded: true,
          });
          viewSystem.viewStateStore.getActions().upsert({
            ...viewSystem.getViewStateOrDefaultViewState(childId),
            editMode: true,
          });
          pipe.emit("edit.forInput", true);
          let unlisten;
          unlisten = eventBus.on(
            TreeEventKeys.EditWillFinish,
            ({ name, node, parentNode }) => {
              dataStore.getActions().delete({ id: childId });
              if (
                name.trim() &&
                !treeService.validateForEditingName({
                  name: name.trim(),
                  node,
                  parentNode,
                }).hasError
              )
                callback(name.trim());
              unlisten();
            }
          );
        }, 0);
      }
    );
    eventBus.on(TreeEventKeys.EditNode, ({ node, event }) => {
      event.preventDefault();
      event.stopPropagation();
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node)),
        editMode: true,
      });
    });
    eventBus.on(TreeEventKeys.EditBlur, ({ node, event, parentNode }) => {
      eventBus.emit(TreeEventKeys.EditKeyEnter, { node, event, parentNode });
    });
    eventBus.on(TreeEventKeys.EditKeyEnter, ({ node, event, parentNode }) => {
      viewSystem.viewStateStore.getActions().upsert({
        ...viewSystem.getViewStateOrDefaultViewState(node.id),
        editMode: false,
      });
      if (pipe.get("edit.forInput")) {
        pipe.emit("edit.forInput", false);
        eventBus.emit(TreeEventKeys.EditWillFinish, {
          name: event.currentTarget.value,
          node,
          parentNode,
        });
      } else if (event.currentTarget.value.trim()) {
        const { hasError, message } = treeService.validateForEditingName({
          name: event.currentTarget.value,
          node,
          parentNode,
        });
        if (!hasError) {
          this.options.renameNode!(node, event.currentTarget.value.trim());
        } else {
          xbook.notificationService.error(message);
        }
      }
    });

    eventBus.on(TreeEventKeys.EditChange, ({ node, event, parentNode }) => {
      viewSystem.viewStateStore.getActions().upsert({
        ...viewSystem.getViewStateOrDefaultViewState(node.id),
        editingName: event.currentTarget.value,
      });

      const { message } = treeService.validateForEditingName({
        name: event.currentTarget.value,
        parentNode,
        node,
      });
      viewSystem.viewStateStore.getActions().upsert({
        ...viewSystem.getViewStateOrDefaultViewState(node.id),
        validationMessage: message,
      });
    });
  },
});
