import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import { createPlugin } from "xbook/common/createPlugin";
import { CacheController } from "xbook/ui/services/cache-controller";
import readMeContent from "./readme.md?raw";

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

export const pluginAddInitialIndexedDbSpace = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
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
      console.log("space", space);
      
      if (space) {
        const state = cache.get(space.id, getDefaultSpaceState());
        const { isIndexedDbReadMeFileInitialized } = state;
        console.log("isIndexedDbReadMeFileInitialized", isIndexedDbReadMeFileInitialized);
        
        if (!isIndexedDbReadMeFileInitialized) {
          // const content = `# Welcome to your new IndexedDB space`;
          const content = readMeContent;
          const path = "/README.md";
          let fileExists;
          try {
            await xbook.fs.readFile(spaceHelper.getUri(space.id, path));
            fileExists = true;
          } catch (error) {
            fileExists = false;
          }
          const uint = new TextEncoder().encode(content);
          await xbook.fs.writeFile(spaceHelper.getUri(space.id, path), uint, {
            overwrite: true,
            create: true,
          });
          cache.set(space.id, {
            ...cache.get(space.id, getDefaultSpaceState()),
            isIndexedDbReadMeFileInitialized: true,
          });
          console.log("emit ReadMeFileInitialized:", space.id);
          
          xbook.eventBus.emit(EventKeys.ReadMeFileInitialized, {
            spaceId: space.id,
          });
        }
      }
    });
  },
});
