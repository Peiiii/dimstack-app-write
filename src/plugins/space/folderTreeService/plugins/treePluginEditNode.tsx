import {
  TreeServicePoints,
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
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    serviceBus.expose(
      TreeServicePoints.EditInputNodeName,
      ({ parentId, callback, nodeType, defaultName }) => {
        setTimeout(() => {
          const childId = nanoid();
          const newNode = {
            id: childId,
            type: nodeType,
            name: defaultName || "",
          };
          dataStore.getActions().add({
            node: newNode,
            parentId,
          });
          treeService.updateViewState(parentId, {
            expanded: true,
          });
          treeService.updateViewState(childId, {
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
      treeService.updateViewState(node.id, {
        editMode: true,
      });
    });
    eventBus.on(TreeEventKeys.EditBlur, ({ node, event, parentNode }) => {
      eventBus.emit(TreeEventKeys.EditKeyEnter, { node, event, parentNode });
    });
    eventBus.on(
      TreeEventKeys.EditKeyEnter,
      async ({ node, event, parentNode }) => {
        treeService.updateViewState(node.id, {
          editMode: false,
        });
        const newName = event.currentTarget.value.trim();
        if (pipe.get("edit.forInput")) {
          pipe.emit("edit.forInput", false);
          eventBus.emit(TreeEventKeys.EditWillFinish, {
            name: event.currentTarget.value,
            node,
            parentNode,
          });
        } else if (newName === node.name) {
        } else if (newName) {
          const { hasError, message } = treeService.validateForEditingName({
            name: newName,
            node,
            parentNode,
          });
          if (!hasError) {
            // Set loading state
            treeService.updateViewState(node.id, { loading: true });

            try {
              await this.options.renameNode!(node, newName);

              // Update node with new name
              dataStore.getActions().update({
                node: { ...node, name: newName },
              });
            } catch (error) {
              xbook.notificationService.error("Failed to rename node");
            } finally {
              // Remove loading state
              treeService.updateViewState(node.id, { loading: false });
            }
          } else {
            xbook.notificationService.error(message);
          }
        }
      }
    );

    eventBus.on(TreeEventKeys.EditChange, ({ node, event, parentNode }) => {
      treeService.updateViewState(node.id, {
        editingName: event.currentTarget.value,
      });

      const { message } = treeService.validateForEditingName({
        name: event.currentTarget.value,
        parentNode,
        node,
      });
      treeService.updateViewState(node.id, {
        validationMessage: message,
      });
    });
  },
});
