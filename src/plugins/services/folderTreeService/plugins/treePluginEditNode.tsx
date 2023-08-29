import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { AiFillEdit } from "react-icons/ai";
export default createTreePlugin<FolderTreeNode>({
  addOptions() {
    return {
      editable: ({ level }) => {
        return level === 1;
      },
      updateNode: () => {},
    };
  },
  activate({ viewSystem, eventBus }) {
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
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node)),
        editMode: false,
      });
      if (event.target.value.trim())
        this.options.updateNode({
          ...node.data,
          name: event.target.value,
        });
    });
    eventBus.on("editKeyEnter", ({ node, event }) => {
      eventBus.emit("editBlur", { node, event });
    });
  },
});
