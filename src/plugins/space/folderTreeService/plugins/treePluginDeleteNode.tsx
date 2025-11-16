import {
  TreeEventKeys,
  TreeServicePoints,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import xbook from "xbook/index";
import { t } from "@/i18n/utils";
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
        name: t("tree.delete"),
        label: t("tree.delete"),
        group: "more",
        event: TreeEventKeys.DeleteNode.name,
        when: "level >= 1",
        validationRules: [
          {
            check: "type !== 'dir'",
            failMessage: t("tree.deleteFolderHint"),
          },
        ],
        icon: "AiFillDelete",
      },
    ]);
    eventBus.on(TreeEventKeys.DeleteNode, async ({ node, event }) => {
      if (
        await xbook.modalService.confirm({
          title: t("tree.confirmDeleteFile"),
        })
      ) {
        await treeService.deleteNode(node);
      }
    });
  },
});
