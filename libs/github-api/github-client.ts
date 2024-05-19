import { Base64 } from "js-base64";
import { FileHelper, Method } from "libs/git-client.types";
import { GithubAuthInfo } from "libs/github-api/github-fs";
import { Octokit } from "octokit";
import axios from "redaxios";
// type Method =
//   | "get"
//   | "post"
//   | "put"
//   | "patch"
//   | "delete"
//   | "options"
//   | "head"
//   | "GET"
//   | "POST"
//   | "PUT"
//   | "PATCH"
//   | "DELETE"
//   | "OPTIONS"
//   | "HEAD";
// type ApiResponse<T> = {
//   status: number;
//   statusText: string;
//   config: any;
//   data: T;
//   headers: Headers;
//   redirect: boolean;
//   url: string;
//   type: ApiResponseType;
//   body: ReadableStream<Uint8Array> | null;
//   bodyUsed: boolean;
// };

// interface FileApiResponse {
//   content: string;
//   sha: string;
//   name: string;
//   path: string;
//   download_url: string;
//   html_url: string;
//   size: number;
//   type: "file" | "dir";
//   [name: string]: any;
// }
// type FileItemApiResponse = Pick<
//   FileApiResponse,
//   "name" | "path" | "download_url" | "html_url" | "type" | "sha"
// >;
// interface FileHelper {
//   get: ({
//     owner,
//     repo,
//     path,
//   }: {
//     owner: any;
//     repo: any;
//     path: any;
//   }) => Promise<ApiResponse<FileApiResponse>>;
//   getInfo: ({
//     owner,
//     repo,
//     path,
//   }: {
//     owner: any;
//     repo: any;
//     path: any;
//   }) => Promise<FileItemApiResponse[]>;
//   add: ({
//     owner,
//     repo,
//     path,
//     content,
//     message,
//     branch,
//   }: {
//     owner: any;
//     repo: any;
//     path: any;
//     content: any;
//     message?: any;
//     branch?: string | undefined;
//   }) => Promise<ApiResponse<any>>;
//   update: ({
//     owner,
//     repo,
//     path,
//     content,
//     message,
//     branch,
//     sha,
//   }: {
//     owner: any;
//     repo: any;
//     path: any;
//     content: any;
//     message?: any;
//     branch?: string | undefined;
//     sha?: null | undefined;
//   }) => Promise<ApiResponse<any>>;
//   delete: ({
//     owner,
//     repo,
//     path,
//     sha,
//     message,
//   }: {
//     owner: any;
//     repo: any;
//     path: any;
//     sha?: string;
//     message?: any;
//   }) => Promise<ApiResponse<any>>;
// }

export const getGithubLoginUrl = ({ redirectUri, clientId }) => {
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&apiresponse_type=code&scope=user%20repo`;
};

const prepareParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined)
  );
};
export const getGithubAccessToken = async ({
  code,
  clientId,
  clientSecret,
  redirectUri,
  repository_id,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  repository_id?: number;
}): Promise<GithubAuthInfo> => {
  // const url =
  //   `https://github.com/login/oauth/access_token?code=${code}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${clientSecret}` +
  //   (repository_id ? `&repository_id=${repository_id}` : "");
  const proxyUrl = `https://github.com/login/oauth/access_token?code=${code}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&client_secret=${clientSecret}`;
  // const url = `https://cors-anywhere.herokuapp.com/${proxyUrl}`;
  const url =`https://proxy.brainbo.fun/?${proxyUrl}`
  console.log("url:", url);
  const res = await axios.post(url);
  // store.set("github", res.data);
  return Object.fromEntries(
    new URLSearchParams(res.data).entries()
  ) as unknown as GithubAuthInfo;
  // return res.data;
};

export const getGithubRepositoryId = async (owner: string, repo: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const res = await axios.get(url);
  return res.data.id;
};

export const refreshGithubAccessToken = async ({
  refreshToken,
}): Promise<{
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}> => {
  const url = `https://github.com/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
  const res = await axios.post(url);
  // store.set("github", res.data);
  return res.data;
};
export const getUrlParam = (name: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(name);
};
const URLBuilder = (() => {
  const getUserInfo = () => "https://api.github.com/user";
  const getBranchList = (owner, repo) =>
    `https://api.github.com/repos/${owner}/${repo}/branches`;
  const createBranch = (owner, repo) =>
    `https://api.github.com/repos/${owner}/${repo}/branches`;
  const getBranch = (owner, repo, branch) =>
    `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`;
  const getPathContents = (owner, repo, path: string) =>
    `https://api.github.com/repos/${owner}/${repo}/contents/${
      path.startsWith("/") ? path.slice(1) : path
    }`;
  const createFile = (owner, repo, path) =>
    `https://api.github.com/repos/${owner}/${repo}/contents/${
      path.startsWith("/") ? path.slice(1) : path
    }`;
  const updateFile = (owner, repo, path) =>
    `https://api.github.com/repos/${owner}/${repo}/contents/${
      path.startsWith("/") ? path.slice(1) : path
    }`;
  const deleteFile = (owner, repo, path) =>
    `https://api.github.com/repos/${owner}/${repo}/contents/${
      path.startsWith("/") ? path.slice(1) : path
    }`;
  const getRepo = (owner, repo) =>
    `https://api.github.com/repos/${owner}/${repo}`;
  const deleteRepo = (owner, repo) =>
    `https://api.github.com/repos/${owner}/${repo}`;
  const clearRepo = (owner, repo) =>
    `https://api.github.com/repos/${owner}/${repo}/clear`;
  const createRepo = () => `https://api.github.com/user/repos`;
  const getRepoList = () => `https://api.github.com/user/repos`;
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

export const createGithubClient = ({ accessToken }: { accessToken? }) => {
  let access_token = accessToken;
  const setAccessToken = (accessToken) => {
    access_token = accessToken;
  };
  const submitForm = async (
    url,
    data,
    method: Method = "POST",
    json = false
  ) => {
    if (json) {
      return axios.request({
        method: method as any,
        url,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      } as any);
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log("formdata:", data);
    return axios.request({
      method: method as any,
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // headers: { "Content-Type": "multipart/form-data" },
    } as any);
  };

  const User = {
    getInfo: async () => {
      return axios.get(URLBuilder.getUserInfo(), {
        params: prepareParams({ access_token }),
      });
    },
  };
  const Repo = {
    get: async ({ owner, repo }) => {
      return axios.get(URLBuilder.getRepo(owner, repo), {
        params: prepareParams({}),
      });
    },
    add: async ({ repo }) => {
      const data = {
        //
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
        params: prepareParams({ page, per_page }),
      });
    },
    delete: async ({ owner, repo }) => {
      return axios.delete(URLBuilder.deleteRepo(owner, repo), {
        params: { owner, repo },
      });
    },
    clear: async ({ owner, repo }) => {
      return axios.put(URLBuilder.clearRepo(owner, repo), {
        params: { owner, repo },
      });
    },
  };
  const Branch = {
    get: async ({ owner, repo, branch }) => {
      return axios.get(URLBuilder.getBranch(owner, repo, branch), {
        params: prepareParams({ owner, repo, branch }),
      });
    },
    getList: async ({ owner, repo }) => {
      return axios.get(URLBuilder.getBranchList(owner, repo), {
        params: prepareParams({ owner, repo }),
      });
    },
    add: async ({ owner, repo, branch, refs = "master" }) => {
      const data = { owner, repo, branch_name: branch, refs };
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
      params: prepareParams({ owner, repo, path }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const File: FileHelper = {
    add: async ({ owner, repo, path, content, message, branch = "master" }) => {
      const octokit = new Octokit({
        auth: accessToken,
      });
      path = path.startsWith("/") ? path.slice(1) : path;

      if (!isBase64Encoded(content)) content = Base64.encode(content);
      if (!message) message = "create " + path;

      const data = { owner, path, content, message, branch, repo };
      return octokit.rest.repos.createOrUpdateFileContents(data) as any;
      // return submitForm(URLBuilder.createFile(owner, repo, path), data) as any;
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
          owner,
          repo,
          path,
          content,
          message,
          branch,
          sha,
        },
        "PUT",
        true
      ) as any;
    },
    delete: async ({ owner, repo, path, sha, message }) => {
      if (!sha) sha = (await getPathInfo({ owner, repo, path })).data.sha;
      if (!message) message = "delete " + path;
      return axios.delete(URLBuilder.deleteFile(owner, repo, path), {
        params: { owner, repo, path, sha, message },
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    setAccessToken,
  };
};

export default {
  refreshAccessToken: refreshGithubAccessToken,
  getGiteeAccessToken: getGithubAccessToken,
  getUrlParam,
  getLoginUrl: getGithubLoginUrl,
  createGiteeClient: createGithubClient,
};

export type GiteeClient = ReturnType<typeof createGithubClient>;
