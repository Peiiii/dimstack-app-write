import {
  ApiResponse,
  AuthInfo,
  Branch,
  FileContent,
  FileItem,
  FileSystemOptions,
  GitProvider,
  GitProviderOptions,
  Repository,
  User,
} from "../types/git-client";

/**
 * Gitee API响应类型
 */
interface GiteeResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Gitee仓库信息
 */
interface GiteeRepository {
  id: number;
  full_name: string;
  name: string;
  owner: GiteeUser;
  description: string | null;
  private: boolean;
  html_url: string;
  default_branch: string;
  created_at: string;
  updated_at: string;
}

/**
 * Gitee用户信息
 */
interface GiteeUser {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

/**
 * Gitee分支信息
 */
interface GiteeBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

/**
 * Gitee文件内容
 */
interface GiteeFileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}

/**
 * Gitee提供者
 */
export class GiteeProvider implements GitProvider {
  protected options: GitProviderOptions;

  constructor(options: GitProviderOptions) {
    this.options = options;
  }

  /**
   * 获取文件内容
   */
  async getFile(
    options: FileSystemOptions & { path: string }
  ): Promise<ApiResponse<FileContent>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${this.options.owner}/${this.options.repo}/contents/${options.path}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`);
    }

    const data = await response.json();
    const content = atob(data.content);
    const uint8array = new TextEncoder().encode(content);

    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        name: data.name,
        path: data.path,
        type: data.type === "dir" ? "dir" : "file",
        sha: data.sha,
        size: data.size,
        content,
        uint8array,
        downloadUrl: data.download_url,
        htmlUrl: data.html_url,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取文件/目录信息
   */
  async getFileInfo(
    options: FileSystemOptions & { path: string }
  ): Promise<ApiResponse<FileItem[]>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${this.options.owner}/${this.options.repo}/contents/${options.path}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get file info: ${response.statusText}`);
    }

    const data = await response.json();
    const items = Array.isArray(data) ? data : [data];

    return {
      status: response.status,
      statusText: response.statusText,
      data: items.map((item) => ({
        name: item.name,
        type: item.type === "dir" ? "dir" : "file",
        size: item.size,
        path: item.path,
        sha: item.sha,
        downloadUrl: item.download_url,
        htmlUrl: item.html_url,
      })),
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 创建/更新文件
   */
  async putFile(
    options: FileSystemOptions & {
      path: string;
      content: string | Uint8Array;
      sha?: string;
    }
  ): Promise<ApiResponse<FileItem>> {
    const content =
      typeof options.content === "string"
        ? btoa(options.content)
        : btoa(String.fromCharCode.apply(null, Array.from(options.content)));

    const response = await fetch(
      `https://gitee.com/api/v5/repos/${this.options.owner}/${this.options.repo}/contents/${options.path}`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          message: options.message || "Update file",
          sha: options.sha,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to put file: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        name: data.content.name,
        type: data.content.type === "dir" ? "dir" : "file",
        size: data.content.size,
        path: data.content.path,
        sha: data.content.sha,
        downloadUrl: data.content.download_url,
        htmlUrl: data.content.html_url,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 删除文件
   */
  async deleteFile(
    options: FileSystemOptions & { path: string; sha?: string }
  ): Promise<ApiResponse<void>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${this.options.owner}/${this.options.repo}/contents/${options.path}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sha: options.sha,
          message: options.message || "Delete file",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.statusText}`);
    }

    return {
      status: response.status,
      statusText: response.statusText,
      data: undefined,
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 刷新访问令牌
   */
  async refreshAccessToken(refreshToken: string): Promise<AuthInfo> {
    const response = await fetch("https://gitee.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      createdAt: Date.now(),
      scope: data.scope,
    };
  }

  /**
   * 获取仓库信息
   */
  async getRepository(options: {
    owner: string;
    repo: string;
  }): Promise<ApiResponse<Repository>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${options.owner}/${options.repo}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get repository: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        id: data.id,
        name: data.name,
        fullName: data.full_name,
        private: data.private,
        description: data.description,
        defaultBranch: data.default_branch,
        owner: {
          id: data.owner.id,
          login: data.owner.login,
          name: data.owner.name,
          avatarUrl: data.owner.avatar_url,
          htmlUrl: data.owner.html_url,
          type: data.owner.type,
        },
        htmlUrl: data.html_url,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 创建仓库
   */
  async createRepository(options: {
    name: string;
    private?: boolean;
    description?: string;
  }): Promise<ApiResponse<Repository>> {
    const response = await fetch("https://gitee.com/api/v5/user/repos", {
      method: "POST",
      headers: {
        Authorization: `token ${this.options.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: options.name,
        private: options.private,
        description: options.description,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create repository: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        id: data.id,
        name: data.name,
        fullName: data.full_name,
        private: data.private,
        description: data.description,
        defaultBranch: data.default_branch,
        owner: {
          id: data.owner.id,
          login: data.owner.login,
          name: data.owner.name,
          avatarUrl: data.owner.avatar_url,
          htmlUrl: data.owner.html_url,
          type: data.owner.type,
        },
        htmlUrl: data.html_url,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 删除仓库
   */
  async deleteRepository(options: {
    owner: string;
    repo: string;
  }): Promise<ApiResponse<void>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${options.owner}/${options.repo}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete repository: ${response.statusText}`);
    }

    return {
      status: response.status,
      statusText: response.statusText,
      data: undefined,
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(): Promise<ApiResponse<User>> {
    const response = await fetch("https://gitee.com/api/v5/user", {
      headers: {
        Authorization: `token ${this.options.token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        id: data.id,
        login: data.login,
        name: data.name,
        avatarUrl: data.avatar_url,
        htmlUrl: data.html_url,
        type: data.type,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取分支列表
   */
  async getBranches(options: {
    owner: string;
    repo: string;
  }): Promise<ApiResponse<Branch[]>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${options.owner}/${options.repo}/branches`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get branches: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: data.map((branch: any) => ({
        name: branch.name,
        commit: {
          sha: branch.commit.sha,
          url: branch.commit.url,
        },
        protected: branch.protected || false,
      })),
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 创建分支
   */
  async createBranch(options: {
    owner: string;
    repo: string;
    branch: string;
    ref?: string;
  }): Promise<ApiResponse<Branch>> {
    const response = await fetch(
      `https://gitee.com/api/v5/repos/${options.owner}/${options.repo}/branches`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branch_name: options.branch,
          refs: options.ref || "master",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create branch: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        name: data.name,
        commit: {
          sha: data.commit.sha,
          url: data.commit.url,
        },
        protected: data.protected || false,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }
}
