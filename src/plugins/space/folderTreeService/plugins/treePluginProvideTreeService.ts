import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { createTreeService } from "@/plugins/space/folderTreeService/services/tree.service";
import { TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";

export const treePluginProvideTreeService = createFolderTreePlugin({
  activate(context) {
    const { serviceBus } = context;
    const treeService = createTreeService(context);
    serviceBus.registerFromMap(TreeServicePoints.TreeService, treeService);
    (window as any).treeService = treeService;
    (window as any).tree = context;
  },
});
