import {
  TreeServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { t } from "@/i18n/utils";

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
        name: t("tree.refresh"),
        label: t("tree.refresh"),
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
