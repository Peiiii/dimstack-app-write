import {
  TreeEventKeys,
  TreeServicePoints,
} from "@/plugins/space/folderTreeService/tokens";
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
  activate({ viewSystem, eventBus, serviceBus }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);

    viewSystem.addNodeMenuItems([
      {
        id: "deleteNode",
        key: "deleteNode",
        name: "删除",
        label: "删除",
        group: "more",
        event: TreeEventKeys.DeleteNode.name,
        when: "level >= 1",
        validationRules: [
          {
            check: "type !== 'dir'",
            failMessage: "删除文件夹中全部文件后，文件夹会自动删除",
          },
        ],
        icon: "AiFillDelete",
      },
    ]);
    eventBus.on(TreeEventKeys.DeleteNode, async ({ node, event }) => {
      // event.preventDefault();
      // event.stopPropagation();
      if (
        await xbook.modalService.confirm({
          title: "你确定要删除该文件吗？",
        })
      ) {
        await treeService.deleteNode(node);
      }
    });
  },
});
