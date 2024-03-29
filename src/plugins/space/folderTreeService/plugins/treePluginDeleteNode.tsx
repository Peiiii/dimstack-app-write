import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { AiFillDelete } from "react-icons/ai";
export default createTreePlugin<FolderTreeNode>({
  addOptions() {
    return {
      deletable: ({ level }) => {
        return level >= 1;
        // return true;
      },
      deleteNode: () => {},
    };
  },
  activate({ viewSystem, eventBus }) {
    viewSystem.addNodeMenuItems([
      {
        id: "deleteNode",
        name: "删除",
        title: "删除",
        event: "deleteNode",
        validate: (context) => {
          return this.options.deletable(context);
        },
        icon: <AiFillDelete />,
      },
    ]);
    eventBus.on("deleteNode", ({ node, event }) => {
      event.preventDefault();
      event.stopPropagation();
      if (confirm("你确定要删除该会话吗？")) {
        this.options.deleteNode(node);
        
      }
    });
  },
});
