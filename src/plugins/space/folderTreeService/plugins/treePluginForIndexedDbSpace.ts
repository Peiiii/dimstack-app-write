import { EventKeys } from "@/constants/eventKeys";
import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { ServicePoints } from "@/plugins/space/folderTreeService/tokens";
import xbook from "xbook/index";

export const treePluginForIndexedDbSpace = createFolderTreePlugin({
  activate: ({ serviceBus }) => {
    const treeService = serviceBus.createProxy(ServicePoints.TreeService);
    xbook.eventBus.on(EventKeys.ReadMeFileInitialized, async ({ spaceId }) => {
      console.log(
        "on ReadMeFileInitialized",
        spaceId,
        "current space",
        treeService.getSpace().id
      );

      if (spaceId === treeService.getSpace().id) {
        await treeService.shallowRefresh("root");
        const node = treeService.getReadMeFileNode();
        console.log("node", node);

        if (node) treeService.openNode(node.id);
      }
    });
  },
});
