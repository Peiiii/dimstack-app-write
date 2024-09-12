import {
  TreeServicePoints,
  TreeEventKeys,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";

export default createTreePlugin<FolderTreeNode>({
  activate(context) {
    const { eventBus, serviceBus } = context;
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    eventBus.on(
      TreeEventKeys.NodeClick,
      async ({ node }: { node: FolderTreeNode }) => {
        treeService.focusNode(node.id);
        if (node.id === "root" || node.type === TreeNodeTypeEnum.Dir) {
          return await serviceBus.invoke(TreeServicePoints.RefershNode, node.id);
        } else {
          treeService.openNode(node.id);
        }
      }
    );
  },
});
