import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import xbook from "xbook/index";
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
        key: "deleteNode",
        name: "删除",
        label: "删除",
        event: TreeEventKeys.DeleteNode.name,
        when: "level >= 1",
        icon: "AiFillDelete",
      },
    ]);
    eventBus.on(TreeEventKeys.DeleteNode, async ({ node, event }) => {
      event.preventDefault();
      event.stopPropagation();
      if (
        await xbook.modalService.confirm({
          title: "你确定要删除该文件吗？",
        })
      ) {
        this.options.deleteNode(node);
      }
    });
  },
});
