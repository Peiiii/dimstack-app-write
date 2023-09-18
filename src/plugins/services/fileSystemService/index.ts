import { spaceHelper } from "@/helpers/space.helper";
import {
  createFile,
  getFileContent,
  getSpaceFileHelper,
  rename,
  rm,
  setFileContent,
} from "@/plugins/services/fileSystemService/utils";
import { DataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";
import { SpaceDef } from "@/toolkit/types/space";
import { space } from "@chakra-ui/react";
import { join } from "path-browserify";
const SEPERATOR = "::";
export default createPlugin({
  addServices(xbook) {
    return [
      "fileSystemService",
      {
        open: async (spaceId, path) => {
          return `${spaceId}${SEPERATOR}${path}`;
        },
        read: async (fid: string) => {
          const [spaceId, path] = fid.split(SEPERATOR);
          const spaceStore = xbook.registry.get(
            "spaceStore"
          ) as DataStore<SpaceDef>;
          const space = spaceStore.getRecord(spaceId)!;
          return await getFileContent(space, path);
        },
        write: async (fid: string, content: string) => {
          const [spaceId, path] = fid.split(SEPERATOR);
          const spaceStore = xbook.registry.get(
            "spaceStore"
          ) as DataStore<SpaceDef>;
          const space = spaceStore.getRecord(spaceId)!;
          return await setFileContent(space, path, content);
        },
        createFile: async (fid: string, content: string = "") => {
          const [spaceId, path] = fid.split(SEPERATOR);
          const space = spaceHelper.getStore().getRecord(spaceId);
          console.assert(space);
          return await createFile(space!, path, content);
        },
        createDirectory: async (fid: string) => {
          const [spaceId, path] = fid.split(SEPERATOR);
          const space = spaceHelper.getStore().getRecord(spaceId);
          console.assert(space);
          const keepPath=join(path,".keep");
          return await createFile(space!, keepPath, ".keep");
        },
        rename: async (fid1: string, fid2: string) =>{
          const [spaceId1, path1] = fid1.split(SEPERATOR);
          const [spaceId2, path2] = fid2.split(SEPERATOR);
          const space1 = spaceHelper.getStore().getRecord(spaceId1)!;
          const space2 = spaceHelper.getStore().getRecord(spaceId2)!;
          return await rename(space1,path1,space2,path2);
        },
        delete: async (fid: string) => {
          const [spaceId, path] = fid.split(SEPERATOR);
          const space = spaceHelper.getStore().getRecord(spaceId)!;
          return await rm(space, path);
        },
      },
    ];
  },
});
