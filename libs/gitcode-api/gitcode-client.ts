import { Base64 } from "js-base64";
import { FileHelper, GiteeClient, Method } from "libs/git-client.types";
import { GithubAuthInfo } from "libs/github-api";
import axios from "redaxios";

export interface IGitcodeUser {
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
  repos_url: string;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  updated_at: string;
  url: string;
}

// GitCode API:
// - OAuth authorize/token endpoints are under https://gitcode.com/oauth
// - REST API is under https://api.gitcode.com/api/v5
const API_BASE_URL = "https://api.gitcode.com/api/v5";
const OAUTH_BASE_URL = "https://gitcode.com/oauth";

export const getGitcodeLoginUrl = ({
  redirectUri,
  clientId,
}: {
  redirectUri: string;
  clientId: string;
}) => {
  // Per docs:
  // GET https://gitcode.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}
  const authorizeUrl = `${OAUTH_BASE_URL}/authorize`;
  const scope = encodeURIComponent(
    // request broad access similar to Gitee/GitHub usage in the app
    "all_user all_repository"
  );
  return `${authorizeUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}`;
};

const prepareParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined)
  );
};

export const getGitcodeAccessToken = async ({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<GithubAuthInfo> => {
  // Per docs:
  // POST https://gitcode.com/oauth/token?grant_type=authorization_code&code={code}&client_id={client_id}&client_secret={client_secret}
  const url = `${OAUTH_BASE_URL}/token?grant_type=authorization_code&code=${encodeURIComponent(
    code
  )}&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(
    clientSecret
  )}`;
  const res = await axios.post(url);
  return res.data;
};

export const refreshGitcodeAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<{
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}> => {
  // Per docs:
  // POST https://gitcode.com/oauth/token?grant_type=refresh_token&refresh_token={refresh_token}
  const url = `${OAUTH_BASE_URL}/token?grant_type=refresh_token&refresh_token=${encodeURIComponent(
    refreshToken
  )}`;
  const res = await axios.post(url);
  return res.data;
};

const URLBuilder = (() => {
  const getUserInfo = () => `${API_BASE_URL}/user`;
  const getBranchList = (owner: string, repo: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/branches`;
  const createBranch = (owner: string, repo: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/branches`;
  const getBranch = (owner: string, repo: string, branch: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/branches/${branch}`;
  const getPathContents = (owner: string, repo: string, path: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const createFile = (owner: string, repo: string, path: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const updateFile = (owner: string, repo: string, path: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const deleteFile = (owner: string, repo: string, path: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  const getRepo = (owner: string, repo: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}`;
  const deleteRepo = (owner: string, repo: string) =>
    `${API_BASE_URL}/repos/${owner}/${repo}`;
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
    getRepoList,
    createFile,
    updateFile,
    deleteFile,
    getPathContents,
  };
})();

export const createGitcodeClient = ({
  getAccessToken,
}: {
  getAccessToken: () => string | undefined;
}): GiteeClient => {
  const submitForm = async (
    url: string,
    data: Record<string, any>,
    method: Method = "POST"
  ) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return axios.request({
      method: method as any,
      url,
      data: formData,
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
    get: async ({ owner, repo }: { owner: string; repo: string }) => {
      return axios.get(URLBuilder.getRepo(owner, repo), {
        params: prepareParams({ access_token: getAccessToken() }),
      });
    },
    add: async ({ repo }: { repo: string }) => {
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
    getList: async ({
      page = 1,
      per_page = 20,
    }: {
      page?: number;
      per_page?: number;
    }) => {
      return axios.get(URLBuilder.getRepoList(), {
        params: prepareParams({
          access_token: getAccessToken(),
          page,
          per_page,
        }),
      });
    },
    delete: async ({ owner, repo }: { owner: string; repo: string }) => {
      return axios.delete(URLBuilder.deleteRepo(owner, repo), {
        params: { access_token: getAccessToken(), owner, repo },
      });
    },
  };

  const isBase64Encoded = (data: string) => {
    const base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(data);
  };

  const getPathInfo = async ({
    owner,
    repo,
    path,
  }: {
    owner: string;
    repo: string;
    path: string;
  }) => {
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
    add: async ({
      owner,
      repo,
      path,
      content,
      message,
      branch = "master",
    }) => {
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
    delete: async ({
      owner,
      repo,
      path,
      sha,
      message,
    }): Promise<any> => {
      if (!sha) sha = (await getPathInfo({ owner, repo, path })).data.sha;
      if (!message) message = "delete " + path;
      const data = {
        access_token: getAccessToken(),
        owner,
        repo,
        path,
        sha,
        message,
      };
      return submitForm(URLBuilder.deleteFile(owner, repo, path), data, "DELETE");
    },
    get: async ({ owner, repo, path }) => {
      const r = await getPathInfo({ owner, repo, path });
      // Align with FileResponse expectations: attach decoded/typed data fields.
      (r.data as any).rawContent = r.data.content;
      (r.data as any).uint8array = Base64.toUint8Array(
        (r.data as any).rawContent
      );
      (r.data as any).content = Base64.decode((r.data as any).rawContent);
      return r as any;
    },
    getInfo: getPathInfo as any,
  };

  return {
    User,
    Repo,
    Branch: {
      // Not currently used in UI; keep minimal surface
      getList: async ({ owner, repo }: { owner: string; repo: string }) => {
        return axios.get(URLBuilder.getBranchList(owner, repo), {
          params: prepareParams({
            access_token: getAccessToken(),
            owner,
            repo,
          }),
        });
      },
    },
    File,
  } as unknown as GiteeClient;
};
