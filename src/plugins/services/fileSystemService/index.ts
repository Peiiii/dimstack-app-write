import {
  getFileContent,
  setFileContent,
} from "@/plugins/services/fileSystemService/utils";
import { DataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";
import { SpaceDef } from "@/toolkit/types/space";

export default createPlugin({
  addServices(xbook) {
    return [
      "fileSystemService",
      {
        open: async (spaceId, path) => {
          return `${spaceId}::${path}`;
        },
        read: async (fid: string) => {
          const [spaceId, path] = fid.split("::");
          const spaceStore = xbook.registry.get(
            "spaceStore"
          ) as DataStore<SpaceDef>;
          const space = spaceStore.getRecord(spaceId)!;
          return await getFileContent(space, path);
        },
        write: async (fid: string, content: string) => {
          const [spaceId, path] = fid.split("::");
          const spaceStore = xbook.registry.get(
            "spaceStore"
          ) as DataStore<SpaceDef>;
          const space = spaceStore.getRecord(spaceId)!;
          await setFileContent(space, path, content);
        },
      },
    ];
  },
});
