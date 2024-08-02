import {
    TreeEventKeys,
    TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({
    viewSystem,
    eventBus,
    dataStore,
    serviceBus,
    options: {
      space: { platform, owner, repo },
    },
  }) {
    // const spaceId = spaceHelper.generateSpaceId(platform, owner, repo);
    eventBus.on(
      TreeEventKeys.NodeContentLoaded,
      ({ node }: { node: TreeDataNode<FolderTreeNode> }) => {
        // 自动打开README.md，如果存在的话
        if (
          node.type === TreeNodeTypeEnum.Dir &&
          (node.children?.length || 0) > 0
        ) {
          const readme = node.children?.find(
            (child) =>
              child.name.toUpperCase() === "README.MD" &&
              child.type === TreeNodeTypeEnum.File
          );
          if (readme) {
            eventBus.emit(TreeEventKeys.NodeClick, { node: readme });
          }
          //   const readme = data.find(
          //     ([name, type]) =>
          //       name.toUpperCase() === "README.MD" && type === FileType.File
          //   );
          //   if (readme) {
          //     const readmePath = join(node.path!, "README.md");
          //     const openerService = xbook.serviceBus.createProxy(
          //       Tokens.OpenerService
          //     );
          //     const readmeNode = dataStore.getNode(readmePath);
          //     console.log("readmeNode:", readmeNode, "readmePath:", readmePath);
          //     if (readmeNode) {
          //       openerService.open(spaceId, readmeNode);
          //     }
          //   }
        }
      }
    );
  },
});
