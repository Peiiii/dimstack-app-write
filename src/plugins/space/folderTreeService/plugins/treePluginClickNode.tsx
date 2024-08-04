import {
  ServicePoints,
  TreeEventKeys,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";

export default createTreePlugin<FolderTreeNode>({
  activate(context) {
    const { eventBus, serviceBus } = context;
    const treeService = serviceBus.createProxy(ServicePoints.TreeService);
    eventBus.on(
      TreeEventKeys.NodeClick,
      async ({ node }: { node: FolderTreeNode }) => {
        if (node.id === "root" || node.type === TreeNodeTypeEnum.Dir) {
          return await serviceBus.invoke(ServicePoints.RefershNode, node.id);
        } else {
          treeService.openNode(node.id);
        }
      }
    );
  },
});
