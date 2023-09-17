import { SpaceDef } from "@/toolkit/types/space";
import { createGiteeClient } from "libs/gitee-api";

export const getFileContent = async (space: SpaceDef, path: string) => {
  const { access_token, refresh_token } = space.auth || {};
  const File = createGiteeClient({ accessToken: access_token }).File;
  return (await File.get({ owner: space.owner, repo: space.repo, path })).data
    .content;
};

export const setFileContent = async (
  space: SpaceDef,
  path: string,
  content: string
) => {
  const { access_token, refresh_token } = space.auth || {};
  const File = createGiteeClient({ accessToken: access_token }).File;
  return await File.update({
    owner: space.owner,
    repo: space.repo,
    path,
    content,
  });
};

export const createFile = async (
  space: SpaceDef,
  path: string,
  content: string = ""
) => {
  const { owner, repo } = space;
  return getSpaceFileHelper(space).add({ owner, repo, path, content });
};

export const rm = async (
  space: SpaceDef,
  path: string
) => {
  const { owner, repo } = space;
  return getSpaceFileHelper(space).delete({ owner, repo, path });
};

export const rename = async (space1: SpaceDef, path1:string,  space2: SpaceDef, path2:string)=>{
  const content=await getSpaceFileHelper(space1).get({ owner:space1.owner, repo:space1.repo, path:path1 });
  await getSpaceFileHelper(space1).add({owner:space2.owner, repo:space2.repo, path:path2,content});
  await getSpaceFileHelper(space1).delete({owner:space1.owner, repo:space1.repo, path:path1});
}

export const getSpaceFileHelper = (space: SpaceDef) => {
  const { access_token, refresh_token } = space.auth || {};
  const File = createGiteeClient({ accessToken: access_token }).File;
  return File;
};
