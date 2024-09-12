import { EventKeys } from "@/constants/eventKeys";
import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";
import xbook from "xbook/index";

export const treePluginForIndexedDbSpace = createFolderTreePlugin({
  activate: ({ serviceBus }) => {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    xbook.eventBus.on(EventKeys.ReadMeFileInitialized, async ({ spaceId }) => {
      if (spaceId === treeService.getSpace().id) {
        await treeService.shallowRefresh("root");
        const node = treeService.getReadMeFileNode();
        if (node) {
          // wait for the markdown editor to be registered
         setTimeout(() => {
          treeService.openNode(node.id);
          treeService.focusNode(node.id);
          }, 1000);
        };
      }
    });
  },
});
