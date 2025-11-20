import { EventKeys } from "@/constants/eventKeys";
import { spaceService } from "@/services/space.service";
import { spaceHelper } from "@/helpers/space.helper";
import { createPlugin } from "xbook/common/createPlugin";
import { CacheController } from "xbook/ui/services/cache-controller";
import readMeContentZh from "./readme.md?raw";
import readMeContentEn from "./readme.en.md?raw";
import connectGitContentZh from "./connect-git.md?raw";
import connectGitContentEn from "./connect-git.en.md?raw";
import excalidrawExampleZh from "./excalidraw-example-zh.json?raw";
import excalidrawExampleEn from "./excalidraw-example-en.json?raw";

const cache = CacheController.create({
  scope: "spaceStateCache",
  storage: "localStorage",
});

export type ISpaceState = {
  isIndexedDbReadMeFileInitialized: boolean;
};

const getDefaultSpaceState = (): ISpaceState => {
  return {
    isIndexedDbReadMeFileInitialized: false,
  };
};

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

const getReadMeContent = (): string => {
  const lang = getCurrentLanguage();
  return lang === "en" ? readMeContentEn : readMeContentZh;
};

const getConnectGitContent = (): string => {
  const lang = getCurrentLanguage();
  return lang === "en" ? connectGitContentEn : connectGitContentZh;
};

const getExcalidrawExampleContent = (): string => {
  const lang = getCurrentLanguage();
  return lang === "zh" ? excalidrawExampleZh : excalidrawExampleEn;
};

export const pluginAddInitialIndexedDbSpace = createPlugin({
  initilize(xbook) {
    // Use singleton spaceService directly
    spaceService.getSpaceStore().waitUtilLoaded(async () => {
      const defaultSpaceConfig = {
        platform: "idb",
        owner: "root",
        repo: "home",
      };
      spaceService.addSpace(defaultSpaceConfig, {
        silent: true,
      });
      const space = spaceService.getSpaceByInfo(defaultSpaceConfig);
      
      if (space) {
        const state = cache.get(space.id, getDefaultSpaceState());
        const { isIndexedDbReadMeFileInitialized } = state;
        
        if (!isIndexedDbReadMeFileInitialized) {
          const readMeContent = getReadMeContent();
          const connectGitContent = getConnectGitContent();
          
          const createFileIfNotExists = async (path: string, content: string) => {
            let fileExists;
            try {
              await xbook.fs.readFile(spaceHelper.getUri(space.id, path));
              fileExists = true;
            } catch {
              fileExists = false;
            }
            if (!fileExists) {
              const uint = new TextEncoder().encode(content);
              await xbook.fs.writeFile(spaceHelper.getUri(space.id, path), uint, {
                overwrite: true,
                create: true,
              });
            }
          };
          
          const lang = getCurrentLanguage();
          const connectGitFileName = lang === "en" ? "/Connect-Git-Repository.md" : "/连接-Git-仓库.md";
          const excalidrawExampleFileName = lang === "zh" ? "/Excalidraw-示例.excalidraw.json" : "/Excalidraw-Example.excalidraw.json";
          const excalidrawExampleContent = getExcalidrawExampleContent();
          
          await createFileIfNotExists("/README.md", readMeContent);
          await createFileIfNotExists(connectGitFileName, connectGitContent);
          await createFileIfNotExists(excalidrawExampleFileName, excalidrawExampleContent);
          
          cache.set(space.id, {
            ...cache.get(space.id, getDefaultSpaceState()),
            isIndexedDbReadMeFileInitialized: true,
          });
          
          xbook.eventBus.emit(EventKeys.ReadMeFileInitialized, {
            spaceId: space.id,
          });
        }
      }
    });
  },
});
