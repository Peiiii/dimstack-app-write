import {
  TreeServicePoints,
  TreeEventKeys,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";

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
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    eventBus.on(TreeEventKeys.TreeOpened, () => {
      const rootNode = dataStore.getData();
      if (!rootNode || !rootNode.children) {
        return;
      }
      
      const getCurrentLanguage = (): string => {
        try {
          const stored = localStorage.getItem("i18nextLng");
          if (stored && (stored === "zh" || stored === "en")) {
            return stored;
          }
        } catch {
          // localStorage not available
        }
        
        const browserLang = navigator.language || "";
        if (browserLang.startsWith("zh")) {
          return "zh";
        }
        return "en";
      };
      
      const lang = getCurrentLanguage();
      const excalidrawFileName = lang === "zh" 
        ? "Excalidraw-示例.excalidraw.json" 
        : "Excalidraw-Example.excalidraw.json";
      
      const excalidrawNode = rootNode.children.find(
        (child) =>
          child.name === excalidrawFileName &&
          child.type === TreeNodeTypeEnum.File
      );
      
      if (excalidrawNode) {
        treeService.openNode(excalidrawNode.id);
      }
    });
  },
});
