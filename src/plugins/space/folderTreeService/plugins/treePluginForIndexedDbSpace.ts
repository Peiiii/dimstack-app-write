import { EventKeys } from "@/constants/eventKeys";
import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { TreeServicePoints, TreeNodeTypeEnum } from "@/plugins/space/folderTreeService/tokens";
import xbook from "xbook/index";

export const treePluginForIndexedDbSpace = createFolderTreePlugin({
  activate: ({ serviceBus, dataStore }) => {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    xbook.eventBus.on(EventKeys.ReadMeFileInitialized, async ({ spaceId }) => {
      if (spaceId === treeService.getSpace().id) {
        await treeService.shallowRefresh("root");
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
          (node) =>
            node.type === TreeNodeTypeEnum.File &&
            node.name === excalidrawFileName
        );
        
        if (excalidrawNode) {
          setTimeout(() => {
            treeService.openNode(excalidrawNode.id);
            treeService.focusNode(excalidrawNode.id);
          }, 1000);
        }
      }
    });
  },
});
