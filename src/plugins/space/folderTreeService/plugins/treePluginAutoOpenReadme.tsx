import {
  ServicePoints,
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
    const treeService = serviceBus.createProxy(ServicePoints.TreeService);
    eventBus.on(TreeEventKeys.TreeOpened, () => {
      // 自动打开README.md，如果存在的话
      const rootNode = dataStore.getData();
      const readme = rootNode.children?.find(
        (child) =>
          child.name.toUpperCase() === "README.MD" &&
          child.type === TreeNodeTypeEnum.File
      );
      if (readme) {
        treeService.openNode(readme.id);
      }
    });
  },
});
