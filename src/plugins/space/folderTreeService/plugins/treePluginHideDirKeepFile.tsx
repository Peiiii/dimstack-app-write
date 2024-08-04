import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { HookPoints } from "@/plugins/space/folderTreeService/tokens";

export const treePluginHideDirKeepFile = createFolderTreePlugin({
  activate({ hookRegistry }) {
    hookRegistry.addHook(HookPoints.FilterNodes, (nodes) => {
      if (nodes.length > 1) {
        return nodes.filter((node) => node.name.toLowerCase() !== ".keep");
      }
      return nodes;
    });
  },
});
