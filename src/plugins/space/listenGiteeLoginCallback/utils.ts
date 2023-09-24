import { appInfo } from "@/plugins/space/listenGiteeLoginCallback/appInfo";
import { JSONStorage } from "@/toolkit/common/treeStorage";
import { getGiteeAccessToken } from "libs/gitee-api/gitee-client";

export var getUrlParam = function (name) {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  return urlParams.get(name);
};

export const getAuthInfo = async (code: string) => {
  return await getGiteeAccessToken({
    code,
    clientId: appInfo.clientId,
    clientSecret: appInfo.clientSecret,
    redirectUri: appInfo.redirectUri,
  });
};

export type AllMetaData = {
  [repoUrl: string]: {
    owner: string;
    repo: string;
    auth: string;
  };
};
export const giteeSessionService = new JSONStorage("giteeSession", {});

export const configRepo = async ({ owner, repo }: any) => {
  owner = prompt("input owner", owner || "");
  repo = prompt("input repo", repo || "");
  giteeSessionService.set(`${owner}/${repo}`, { owner, repo });
  return {
    owner,
    repo,
  };
};
