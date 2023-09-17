import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import {
  createTreeHelper,
  createTreePlugin,
} from "@/toolkit/components/tree/treePlugins";
import { nanoid } from "@reduxjs/toolkit";
import { AiFillEdit } from "react-icons/ai";
export default createTreeHelper<FolderTreeNode>().createPlugin({
  addOptions() {
    return {
      editable: ({ level }) => {
        return level === 1;
      },
      renameNode: (() => {}) as (node: FolderTreeNode, name: string) => void,
    };
  },
  activate({ viewSystem, serviceBus, eventBus, dataStore, pipe }) {
    viewSystem.addNodeMenuItems([
      {
        id: "editNode",
        event: "editNode",
        name: "编辑",
        title: "编辑",
        validate: (context) => {
          return this.options.editable(context);
        },
        icon: <AiFillEdit />,
      },
    ]);
    serviceBus.exposeAt("edit", {
      inputNodeName: (parentId: string, callback: (name: string) => void) => {
      setTimeout(()=>{
        const childId = nanoid();
        console.log("addNode:", childId,"parentId:",parentId);
        dataStore.getActions().add({
          node: { id: childId, type: "file", name: "" },
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
        unlisten = eventBus.on("edit.inputResult", (name: string) => {
          console.log("name:", name);
          dataStore.getActions().delete({id:childId});
          if (name.trim()) callback(name.trim());
          unlisten();
        });
      },0)
      },
    });
    eventBus.on("editNode", ({ node, event }) => {
      event.preventDefault();
      event.stopPropagation();
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node)),
        editMode: true,
      });
    });
    eventBus.on("editBlur", ({ node, event }) => {
      console.log("editing exit:", event.target.value, "node:", node,"event:",event);
      // return 
      viewSystem.viewStateStore.getActions().upsert({
        ...viewSystem.getViewStateOrDefaultViewState(node.id),
        editMode: false,
      });
      if (pipe.get("edit.forInput")) {
        pipe.emit("edit.forInput", false);
        eventBus.emit("edit.inputResult", event.target.value);
      } else if (event.target.value.trim()) {
        this.options.renameNode(node, event.target.value.trim());
      }
    });
    eventBus.on("editKeyEnter", ({ node, event }) => {
      console.log("editKeyEnter:", event);
      eventBus.emit("editBlur", { node, event });
    });
  },
});
