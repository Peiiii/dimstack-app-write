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
