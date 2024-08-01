import { Base64 } from "js-base64";
import { FileHelper, GiteeClient, Method } from "libs/git-client.types";
import { GithubAuthInfo } from "libs/github-api";
import axios from "redaxios";


export interface IGiteeUser {
  avatar_url: string;
  bio: string | null;
  blog: string | null;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  html_url: string;
  id: number;
  login: string;
  name: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  remark: string;
  repos_url: string;
  stared: number;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  updated_at: string;
  url: string;
  watched: number;
  weibo: string | null;
}

const API_BASE_URL = "https://gitee.com/api/v5";
const AUTHORIZE_URL = "https://gitee.com/oauth/token";

export const getGiteeLoginUrl = ({ redirectUri, clientId }) => {
  return `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user_info%20projects`;
};

const prepareParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined)
  );
};
export const getGiteeAccessToken = async ({
  code,
  clientId,
  clientSecret,
  redirectUri,
}): Promise<GithubAuthInfo> => {
  const url = `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}`;
  console.log("url:", url);
  const res = await axios.post(url);
  // store.set("gitee", res.data);
  return res.data;
};

export const refreshGiteeAccessToken = async ({
  refreshToken,
}): Promise<{
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}> => {
  const url = `https://gitee.com/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
  const res = await axios.post(url);
  // store.set("gitee", res.data);
  return res.data;
};
export const getUrlParam = (name: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(name);
};
const URLBuilder = (() => {
  const getUserInfo = () => `${API_BASE_URL}/user`;
  const getBranchList = (owner, repo) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/branches`;
  const createBranch = (owner, repo) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/branches`;
  const getBranch = (owner, repo, branch) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/branches/${branch}`;
  const getPathContents = (owner, repo, path) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const createFile = (owner, repo, path) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const updateFile = (owner, repo, path) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const deleteFile = (owner, repo, path) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const getRepo = (owner, repo) => `${API_BASE_URL}/repos/${owner}/${repo}`;
  const deleteRepo = (owner, repo) => `${API_BASE_URL}/repos/${owner}/${repo}`;
  const clearRepo = (owner, repo) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/clear`;
  const createRepo = () => `${API_BASE_URL}/user/repos`;
  const getRepoList = () => `${API_BASE_URL}/user/repos`;
  return {
    getUserInfo,
    createBranch,
    getBranch,
    getBranchList,
    createRepo,
    getRepo,
    deleteRepo,
    clearRepo,
    getRepoList,
    createFile,
    updateFile,
    deleteFile,
    getPathContents,
  };
})();
export const createGiteeClient = ({
  getAccessToken,
}: {
  getAccessToken: () => string | undefined;
}): GiteeClient => {
  // let access_token = accessToken;
  // const setAccessToken = (accessToken) => {
  //   access_token = accessToken;
  // };
  const submitForm = async (url, data, method: Method = "POST") => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log("formdata:", data);
    return axios.request({
      method: method as any,
      url,
      data: formData,
      // headers: { "Content-Type": "multipart/form-data" },
    } as any);
  };

  const User = {
    getInfo: async () => {
      return axios.get(URLBuilder.getUserInfo(), {
        params: prepareParams({ access_token: getAccessToken() }),
      });
    },
  };
  const Repo = {
    get: async ({ owner, repo }) => {
      return axios.get(URLBuilder.getRepo(owner, repo), {
        params: prepareParams({ access_token: getAccessToken() }),
      });
    },
    add: async ({ repo }) => {
      const data = {
        access_token: getAccessToken(),
        name: repo,
        has_issues: true,
        has_wiki: true,
        can_comment: true,
        private: true,
      };
      return submitForm(URLBuilder.createRepo(), data);
    },
    getList: async ({ page = 1, per_page = 20 }) => {
      return axios.get(URLBuilder.getRepoList(), {
        params: prepareParams({
          access_token: getAccessToken(),
          page,
          per_page,
        }),
      });
    },
    delete: async ({ owner, repo }) => {
      return axios.delete(URLBuilder.deleteRepo(owner, repo), {
        params: { access_token: getAccessToken(), owner, repo },
      });
    },
    clear: async ({ owner, repo }) => {
      return axios.put(URLBuilder.clearRepo(owner, repo), {
        params: { access_token: getAccessToken(), owner, repo },
      });
    },
  };
  const Branch = {
    get: async ({ owner, repo, branch }) => {
      return axios.get(URLBuilder.getBranch(owner, repo, branch), {
        params: prepareParams({
          access_token: getAccessToken(),
          owner,
          repo,
          branch,
        }),
      });
    },
    getList: async ({ owner, repo }) => {
      return axios.get(URLBuilder.getBranchList(owner, repo), {
        params: prepareParams({ access_token: getAccessToken(), owner, repo }),
      });
    },
    add: async ({ owner, repo, branch, refs = "master" }) => {
      const data = {
        access_token: getAccessToken(),
        owner,
        repo,
        branch_name: branch,
        refs,
      };
      return submitForm(URLBuilder.createBranch(owner, repo), data);
    },
  };
  const isBase64Encoded = (data) => {
    const base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(data);
  };

  const getPathInfo = async ({ owner, repo, path }) => {
    return axios.get(URLBuilder.getPathContents(owner, repo, path), {
      params: prepareParams({
        access_token: getAccessToken(),
        owner,
        repo,
        path,
      }),
    });
  };

  const File: FileHelper = {
    add: async ({ owner, repo, path, content, message, branch = "master" }) => {
      if (!isBase64Encoded(content)) content = Base64.encode(content);
      if (!message) message = "create " + path;

      const data = {
        access_token: getAccessToken(),
        owner,
        path,
        content,
        message,
        branch,
      };
      return submitForm(URLBuilder.createFile(owner, repo, path), data) as any;
    },
    update: async ({
      owner,
      repo,
      path,
      content,
      message,
      branch = "master",
      sha = null,
    }) => {
      if (!isBase64Encoded(content)) content = Base64.encode(content);
      if (!sha) sha = (await getPathInfo({ owner, repo, path })).data.sha;
      if (!message) message = "update " + path;
      return submitForm(
        URLBuilder.updateFile(owner, repo, path),
        {
          access_token: getAccessToken(),
          owner,
          repo,
          path,
          content,
          message,
          branch,
          sha,
        },
        "PUT"
      ) as any;
    },
    delete: async ({ owner, repo, path, sha, message }) => {
      if (!sha) sha = (await getPathInfo({ owner, repo, path })).data.sha;
      if (!message) message = "delete " + path;
      return axios.delete(URLBuilder.deleteFile(owner, repo, path), {
        params: {
          access_token: getAccessToken(),
          owner,
          repo,
          path,
          sha,
          message,
        },
      }) as any;
    },
    get: async ({ owner, repo, path }) => {
      const r = await getPathInfo({ owner, repo, path });
      r.data.rawContent = r.data.content;
      r.data.uint8array = Base64.toUint8Array(r.data.rawContent);
      r.data.content = Base64.decode(r.data.rawContent);
      return r as any;
    },
    getInfo: getPathInfo as any,
  };
  return {
    File,
    Repo,
    User,
    Branch,
  };
};

export default {
  refreshAccessToken: refreshGiteeAccessToken,
  getGiteeAccessToken,
  getUrlParam,
  getLoginUrl: getGiteeLoginUrl,
  createGiteeClient,
};

export type { GiteeClient } from "../git-client.types";
