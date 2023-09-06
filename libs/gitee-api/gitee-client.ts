import axios from "redaxios";
import { Base64 } from "js-base64";
type Method =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "options"
  | "head"
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";
type Response<T> = {
  status: number;
  statusText: string;
  config: any;
  data: T;
  headers: Headers;
  redirect: boolean;
  url: string;
  type: ResponseType;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
};

interface FileResponse {
  content: string;
  sha: string;
  name: string;
  path: string;
  download_url: string;
  html_url: string;
  size: number;
  type: "file" | "dir";
  [name: string]: any;
}
type FileItemResponse = Pick<
  FileResponse,
  "name" | "path" | "download_url" | "html_url" | "type" | "sha"
>;
interface FileHelper {
  get: ({
    owner,
    repo,
    path,
  }: {
    owner: any;
    repo: any;
    path: any;
  }) => Promise<Response<FileResponse>>;
  getInfo: ({
    owner,
    repo,
    path,
  }: {
    owner: any;
    repo: any;
    path: any;
  }) => Promise<Response<FileItemResponse[]>>;
  add: ({
    owner,
    repo,
    path,
    content,
    message,
    branch,
  }: {
    owner: any;
    repo: any;
    path: any;
    content: any;
    message?: any;
    branch?: string | undefined;
  }) => Promise<Response<any>>;
  update: ({
    owner,
    repo,
    path,
    content,
    message,
    branch,
    sha,
  }: {
    owner: any;
    repo: any;
    path: any;
    content: any;
    message?: any;
    branch?: string | undefined;
    sha?: null | undefined;
  }) => Promise<Response<any>>;
  delete: ({
    owner,
    repo,
    path,
    sha,
    message,
  }: {
    owner: any;
    repo: any;
    path: any;
    sha?: string;
    message?: any;
  }) => Promise<Response<any>>;
}

export const getLoginUrl = ({ redirectUri, clientId }) => {
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
}): Promise<{
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}> => {
  const url = `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}`;
  console.log("url:", url);
  const res = await axios.post(url);
  // store.set("gitee", res.data);
  return res.data;
};

export const refreshAccessToken = async ({
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
  const getUserInfo = () => "https://gitee.com/api/v5/user";
  const getBranchList = (owner, repo) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/branches`;
  const createBranch = (owner, repo) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/branches`;
  const getBranch = (owner, repo, branch) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/branches/${branch}`;
  const getPathContents = (owner, repo, path) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`;
  const createFile = (owner, repo, path) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`;
  const updateFile = (owner, repo, path) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`;
  const deleteFile = (owner, repo, path) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`;
  const getRepo = (owner, repo) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}`;
  const deleteRepo = (owner, repo) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}`;
  const clearRepo = (owner, repo) =>
    `https://gitee.com/api/v5/repos/${owner}/${repo}/clear`;
  const createRepo = () => `https://gitee.com/api/v5/user/repos`;
  const getRepoList = () => `https://gitee.com/api/v5/user/repos`;
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
export const createGiteeClient = ({ accessToken }: { accessToken? }) => {
  let access_token = accessToken;
  const setAccessToken = (accessToken) => {
    access_token = accessToken;
  };
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
        params: prepareParams({ access_token }),
      });
    },
  };
  const Repo = {
    get: async ({ owner, repo }) => {
      return axios.get(URLBuilder.getRepo(owner, repo), {
        params: prepareParams({ access_token }),
      });
    },
    add: async ({ repo }) => {
      const data = {
        access_token,
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
        params: prepareParams({ access_token, page, per_page }),
      });
    },
    delete: async ({ owner, repo }) => {
      return axios.delete(URLBuilder.deleteRepo(owner, repo), {
        params: { access_token, owner, repo },
      });
    },
    clear: async ({ owner, repo }) => {
      return axios.put(URLBuilder.clearRepo(owner, repo), {
        params: { access_token, owner, repo },
      });
    },
  };
  const Branch = {
    get: async ({ owner, repo, branch }) => {
      return axios.get(URLBuilder.getBranch(owner, repo, branch), {
        params: prepareParams({ access_token, owner, repo, branch }),
      });
    },
    getList: async ({ owner, repo }) => {
      return axios.get(URLBuilder.getBranchList(owner, repo), {
        params: prepareParams({ access_token, owner, repo }),
      });
    },
    add: async ({ owner, repo, branch, refs = "master" }) => {
      const data = { access_token, owner, repo, branch_name: branch, refs };
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
      params: prepareParams({ access_token, owner, repo, path }),
    });
  };

  const File: FileHelper = {
    add: async ({ owner, repo, path, content, message, branch = "master" }) => {
      if (!isBase64Encoded(content)) content = Base64.encode(content);
      if (!message) message = "create " + path;

      const data = { access_token, owner, path, content, message, branch };
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
          access_token,
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
        params: { access_token, owner, repo, path, sha, message },
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
  refreshAccessToken,
  getGiteeAccessToken,
  getUrlParam,
  getLoginUrl,
  createGiteeClient,
};

export type GiteeClient = ReturnType<typeof createGiteeClient>;
