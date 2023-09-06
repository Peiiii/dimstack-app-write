import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { AiFillPlusCircle } from "react-icons/ai";
export default createTreePlugin<FolderTreeNode>({
  addOptions() {
    return {
      addable: ({ node }) => {
        return node.type==="dir";
      },
      addNodeAt: () => {},
    };
  },
  activate({ viewSystem, eventBus }) {
    viewSystem.addNodeMenuItems([
      {
        id: "addNode",
        name: "添加",
        title: "添加",
        event: "addNodeAt",
        validate: (context) => {
          return this.options.addable(context);
        },
        icon: <AiFillPlusCircle />,
      },
    ]);
    eventBus.on("addNodeAt", ({ node, event }) => {
      event.preventDefault();
      event.stopPropagation();

      const childId = this.options.addNodeAt(node.id);

      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node)),
        expanded: true,
      });
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(childId) ||
          viewSystem.getDefaultViewState({ id: childId })),
        editMode: true,
      });
    });
  },
});
