import { fileSystemHelper } from "@/helpers/file-system.helper";
import { spaceHelper } from "@/helpers/space.helper";
import {
  TreeServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { FileType } from "@/toolkit/vscode/file-system";
import xbook from "xbook/index";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({
    serviceBus,
    dataStore,
    viewSystem: { viewStateStore, renderer, addNodeMenuItems },
    options: { space },
    eventBus,
  }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    viewStateStore.reduxStore.subscribe(() => {
      const data = viewStateStore.getData();
    });
    /** read children only when expanded */

    serviceBus.expose(TreeServicePoints.RefershNode, treeService.deepRefresh);
    addNodeMenuItems([
      {
        id: "refreshNode",
        key: "refreshNode",
        event: TreeEventKeys.RefreshNode.name,
        name: "刷新",
        label: "刷新",
        when: "level === 0 || type === 'dir'",
        icon: "AiOutlineReload",
        group: "more",
      },
    ]);
    eventBus.on(TreeEventKeys.RefreshNode, ({ node }) => {
      treeService.deepRefresh(node.id);
    });
  },
});
