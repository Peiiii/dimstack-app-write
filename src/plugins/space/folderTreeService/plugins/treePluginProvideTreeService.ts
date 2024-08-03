import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { createTreeService } from "@/plugins/space/folderTreeService/services/tree.service";
import { ServicePoints } from "@/plugins/space/folderTreeService/tokens";

export const treePluginProvideTreeService = createFolderTreePlugin({
  activate(context) {
    const { serviceBus } = context;
    const treeService = createTreeService(context);
    serviceBus.registerFromMap(ServicePoints.TreeService, treeService);
  },
});
