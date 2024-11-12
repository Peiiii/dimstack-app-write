import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import {
  createFile,
  getDirectoryContent,
  getFileContent,
  rename,
  rm,
  setFileContent,
} from "@/plugins/services/fileSystemService/utils";
import { SpaceDef } from "@/toolkit/types/space";
import { join } from "path-browserify";
import { createPlugin } from "xbook/common/createPlugin";
import xbook from "xbook/index";
import { fs } from "xbook/services";
const SEPERATOR = ":";

const getSpaceWithAuth = (spaceId: string): SpaceDef | undefined => {
  const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
  const space = spaceService.getSpace(spaceId);
  if (!space) return;
  const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
  const authInfo = authService.getAnyAuthInfo(space.platform, space.owner);
  if (!authInfo) return;
  if (!authInfo.accessToken || !authInfo.refreshToken) return;
  return {
    ...space,
    auth: {
      access_token: authInfo.accessToken,
      refresh_token: authInfo.refreshToken,
    },
  };
};

export default createPlugin({
  // addServices(xbook) {
  //   return [
  //     "fileSystemService",
  //     {
  //       open: async (spaceId, path) => {
  //         return `${spaceId}${SEPERATOR}${path}`;
  //       },
  //       read: async (fid: string) => {
  //         const [spaceId, path] = fid.split(SEPERATOR);
  //         const space = getSpaceWithAuth(spaceId)!;
  //         return await getFileContent(space, path);
  //       },
  //       readDirectory: async (fid: string) => {
  //         const [spaceId, path] = fid.split(SEPERATOR);
  //         const space = getSpaceWithAuth(spaceId)!;
  //         return await getDirectoryContent(space, path);
  //       },
  //       write: async (fid: string, content: string) => {
  //         const [spaceId, path] = fid.split(SEPERATOR);
  //         const space = getSpaceWithAuth(spaceId)!;
  //         return await setFileContent(space, path, content);
  //       },
  //       createFile: async (fid: string, content: string = "") => {
  //         const [spaceId, path] = fid.split(SEPERATOR);
  //         const space = getSpaceWithAuth(spaceId)!;
  //         console.assert(space);
  //         return await createFile(space!, path, content);
  //       },
  //       createDirectory: async (fid: string) => {
  //         const [spaceId, path] = fid.split(SEPERATOR);
  //         const space = getSpaceWithAuth(spaceId)!;
  //         console.assert(space);
  //         const keepPath = join(path, ".keep");
  //         return await createFile(space!, keepPath, ".keep");
  //       },
  //       rename: async (fid1: string, fid2: string) => {
  //         const [spaceId1, path1] = fid1.split(SEPERATOR);
  //         const [spaceId2, path2] = fid2.split(SEPERATOR);
  //         const space1 = getSpaceWithAuth(spaceId1)!;
  //         const space2 = getSpaceWithAuth(spaceId2)!;
  //         return await rename(space1, path1, space2, path2);
  //       },
  //       delete: async (fid: string) => {
  //         const [spaceId, path] = fid.split(SEPERATOR);
  //         const space = getSpaceWithAuth(spaceId)!;
  //         return await rm(space, path);
  //       },
  //     },
  //   ];
  // },

  addServices(xbook) {
    return [
      "fileSystemService",
      {
        open: async (spaceId, path) => {
          return spaceHelper.getUri(spaceId, path).toString();
        },
        read: async (fid: string) => {
          const uri = spaceHelper.parseUri(fid);
          console.log("read", uri);
          const uint = await fs.readFile(uri);
          return new TextDecoder().decode(uint);
          // const space = getSpaceWithAuth(spaceId)!;
          // return await getFileContent(space, path);
        },
        // readDirectory: async (fid: string) => {
        //   const [spaceId, path] = fid.split(SEPERATOR);
        //   const space = getSpaceWithAuth(spaceId)!;
        //   return await getDirectoryContent(space, path);
        // },
        write: async (fid: string, content: string) => {
          const uri = spaceHelper.parseUri(fid);
          const uint = new TextEncoder().encode(content);
          return await fs.writeFile(uri, uint, {
            overwrite: true,
            create: true,
          });
          // const space = getSpaceWithAuth(spaceId)!;
          // return await setFileContent(space, path, content);
        },
        // createFile: async (fid: string, content: string = "") => {
        //   const [spaceId, path] = fid.split(SEPERATOR);
        //   const space = getSpaceWithAuth(spaceId)!;
        //   console.assert(space);
        //   return await createFile(space!, path, content);
        // },
        // createDirectory: async (fid: string) => {
        //   const [spaceId, path] = fid.split(SEPERATOR);
        //   const space = getSpaceWithAuth(spaceId)!;
        //   console.assert(space);
        //   const keepPath = join(path, ".keep");
        //   return await createFile(space!, keepPath, ".keep");
        // },
        // rename: async (fid1: string, fid2: string) => {
        //   const [spaceId1, path1] = fid1.split(SEPERATOR);
        //   const [spaceId2, path2] = fid2.split(SEPERATOR);
        //   const space1 = getSpaceWithAuth(spaceId1)!;
        //   const space2 = getSpaceWithAuth(spaceId2)!;
        //   return await rename(space1, path1, space2, path2);
        // },
        // delete: async (fid: string) => {
        //   const [spaceId, path] = fid.split(SEPERATOR);
        //   const space = getSpaceWithAuth(spaceId)!;
        //   return await rm(space, path);
        // },
      },
    ];
  },
});
