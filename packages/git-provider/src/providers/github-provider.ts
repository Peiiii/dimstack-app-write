import {
  ApiResponse,
  AuthInfo,
  Branch,
  FileContent,
  FileItem,
  FileSystemOptions,
  GitProvider,
  Repository,
  User,
  Commit,
  Diff,
  MergeResult,
  PullRequest,
} from "../types/git-client";

/**
 * GitHub提供者配置选项
 */
interface GitHubProviderOptions {
  token: string;
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * GitHub提供者
 */
export class GitHubProvider implements GitProvider {
  constructor(private options: GitHubProviderOptions) { }

  /**
   * 获取文件内容
   */
  async getFile(
    options: FileSystemOptions & { path: string }
  ): Promise<ApiResponse<FileContent>> {
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/contents/${options.path}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
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
      `https://api.github.com/repos/${options.owner}/${options.repo}/contents/${options.path}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
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
      `https://api.github.com/repos/${options.owner}/${options.repo}/contents/${options.path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: options.message || "Update file",
          content,
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
      `https://api.github.com/repos/${options.owner}/${options.repo}/contents/${options.path}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: options.message || "Delete file",
          sha: options.sha,
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
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      }
    );

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
      `https://api.github.com/repos/${options.owner}/${options.repo}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
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
    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `token ${this.options.token}`,
        Accept: "application/vnd.github.v3+json",
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
      `https://api.github.com/repos/${options.owner}/${options.repo}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
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
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${this.options.token}`,
        Accept: "application/vnd.github.v3+json",
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
      `https://api.github.com/repos/${options.owner}/${options.repo}/branches`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
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
    // 获取引用SHA
    const refResponse = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/git/refs/heads/${options.ref || "main"}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!refResponse.ok) {
      throw new Error(`Failed to get ref: ${refResponse.statusText}`);
    }

    const refData = await refResponse.json();

    // 创建新分支
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/git/refs`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref: `refs/heads/${options.branch}`,
          sha: refData.object.sha,
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
        name: options.branch,
        commit: {
          sha: data.object.sha,
          url: data.object.url,
        },
        protected: false,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取提交历史
   */
  async getCommits(options: {
    owner: string;
    repo: string;
    path?: string;
    branch?: string;
    since?: string;
    until?: string;
    per_page?: number;
    page?: number;
  }): Promise<ApiResponse<Commit[]>> {
    const params = new URLSearchParams();
    if (options.path) params.append('path', options.path);
    if (options.branch) params.append('sha', options.branch);
    if (options.since) params.append('since', options.since);
    if (options.until) params.append('until', options.until);
    if (options.per_page) params.append('per_page', options.per_page.toString());
    if (options.page) params.append('page', options.page.toString());

    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/commits?${params}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get commits: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: data.map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: {
          name: commit.commit.author.name,
          email: commit.commit.author.email,
          date: commit.commit.author.date,
        },
        committer: {
          name: commit.commit.committer.name,
          email: commit.commit.committer.email,
          date: commit.commit.committer.date,
        },
        parents: commit.parents.map((p: any) => p.sha),
        tree: {
          sha: commit.commit.tree.sha,
          url: commit.commit.tree.url,
        },
        url: commit.url,
        htmlUrl: commit.html_url,
        commentsUrl: commit.comments_url,
      })),
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取单个提交信息
   */
  async getCommit(options: {
    owner: string;
    repo: string;
    sha: string;
  }): Promise<ApiResponse<Commit>> {
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/commits/${options.sha}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get commit: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        sha: data.sha,
        message: data.commit.message,
        author: {
          name: data.commit.author.name,
          email: data.commit.author.email,
          date: data.commit.author.date,
        },
        committer: {
          name: data.commit.committer.name,
          email: data.commit.committer.email,
          date: data.commit.committer.date,
        },
        parents: data.parents.map((p: any) => p.sha),
        tree: {
          sha: data.commit.tree.sha,
          url: data.commit.tree.url,
        },
        url: data.url,
        htmlUrl: data.html_url,
        commentsUrl: data.comments_url,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取文件差异
   */
  async getDiff(options: {
    owner: string;
    repo: string;
    base: string;
    head: string;
    path?: string;
  }): Promise<ApiResponse<Diff[]>> {
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/compare/${options.base}...${options.head}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get diff: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: data.files.map((file: any) => ({
        sha: file.sha,
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        blobUrl: file.blob_url,
        rawUrl: file.raw_url,
        contentsUrl: file.contents_url,
        patch: file.patch,
      })),
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 合并分支
   */
  async mergeBranch(options: {
    owner: string;
    repo: string;
    base: string;
    head: string;
    commit_message?: string;
  }): Promise<ApiResponse<MergeResult>> {
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/merges`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base: options.base,
          head: options.head,
          commit_message: options.commit_message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to merge branch: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        sha: data.sha,
        merged: true,
        message: data.commit.message,
        htmlUrl: data.html_url,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 创建拉取请求
   */
  async createPullRequest(options: {
    owner: string;
    repo: string;
    title: string;
    body?: string;
    head: string;
    base: string;
  }): Promise<ApiResponse<PullRequest>> {
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/pulls`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: options.title,
          body: options.body,
          head: options.head,
          base: options.base,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create pull request: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: this.mapPullRequest(data),
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 获取拉取请求列表
   */
  async getPullRequests(options: {
    owner: string;
    repo: string;
    state?: 'open' | 'closed' | 'all';
    head?: string;
    base?: string;
  }): Promise<ApiResponse<PullRequest[]>> {
    const params = new URLSearchParams();
    if (options.state) params.append('state', options.state);
    if (options.head) params.append('head', options.head);
    if (options.base) params.append('base', options.base);

    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/pulls?${params}`,
      {
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get pull requests: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: data.map((pr: any) => this.mapPullRequest(pr)),
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 合并拉取请求
   */
  async mergePullRequest(options: {
    owner: string;
    repo: string;
    pull_number: number;
    commit_title?: string;
    commit_message?: string;
    merge_method?: 'merge' | 'squash' | 'rebase';
  }): Promise<ApiResponse<MergeResult>> {
    const response = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/pulls/${options.pull_number}/merge`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${this.options.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commit_title: options.commit_title,
          commit_message: options.commit_message,
          merge_method: options.merge_method,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to merge pull request: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      status: response.status,
      statusText: response.statusText,
      data: {
        sha: data.sha,
        merged: data.merged,
        message: data.message,
        htmlUrl: data.html_url,
      },
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * 映射拉取请求数据
   */
  private mapPullRequest(data: any): PullRequest {
    return {
      id: data.id,
      number: data.number,
      title: data.title,
      body: data.body,
      state: data.state,
      locked: data.locked,
      user: {
        id: data.user.id,
        login: data.user.login,
        name: data.user.name,
        avatarUrl: data.user.avatar_url,
        htmlUrl: data.user.html_url,
        type: data.user.type,
      },
      assignees: data.assignees?.map((a: any) => ({
        id: a.id,
        login: a.login,
        name: a.name,
        avatarUrl: a.avatar_url,
        htmlUrl: a.html_url,
        type: a.type,
      })) || [],
      requestedReviewers: data.requested_reviewers?.map((r: any) => ({
        id: r.id,
        login: r.login,
        name: r.name,
        avatarUrl: r.avatar_url,
        htmlUrl: r.html_url,
        type: r.type,
      })) || [],
      labels: data.labels?.map((l: any) => ({
        id: l.id,
        name: l.name,
        color: l.color,
        description: l.description,
        default: l.default,
      })) || [],
      milestone: data.milestone ? {
        id: data.milestone.id,
        number: data.milestone.number,
        title: data.milestone.title,
        description: data.milestone.description,
        state: data.milestone.state,
        creator: {
          id: data.milestone.creator.id,
          login: data.milestone.creator.login,
          name: data.milestone.creator.name,
          avatarUrl: data.milestone.creator.avatar_url,
          htmlUrl: data.milestone.creator.html_url,
          type: data.milestone.creator.type,
        },
        openIssues: data.milestone.open_issues,
        closedIssues: data.milestone.closed_issues,
        createdAt: data.milestone.created_at,
        updatedAt: data.milestone.updated_at,
        closedAt: data.milestone.closed_at,
        dueOn: data.milestone.due_on,
      } : undefined,
      draft: data.draft,
      merged: data.merged,
      mergeable: data.mergeable,
      mergeableState: data.mergeable_state,
      mergedBy: data.merged_by ? {
        id: data.merged_by.id,
        login: data.merged_by.login,
        name: data.merged_by.name,
        avatarUrl: data.merged_by.avatar_url,
        htmlUrl: data.merged_by.html_url,
        type: data.merged_by.type,
      } : undefined,
      mergeCommitSha: data.merge_commit_sha,
      comments: data.comments,
      reviewComments: data.review_comments,
      commits: data.commits,
      additions: data.additions,
      deletions: data.deletions,
      changedFiles: data.changed_files,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      closedAt: data.closed_at,
      mergedAt: data.merged_at,
      head: {
        label: data.head.label,
        ref: data.head.ref,
        sha: data.head.sha,
        user: {
          id: data.head.user.id,
          login: data.head.user.login,
          name: data.head.user.name,
          avatarUrl: data.head.user.avatar_url,
          htmlUrl: data.head.user.html_url,
          type: data.head.user.type,
        },
        repo: {
          id: data.head.repo.id,
          name: data.head.repo.name,
          fullName: data.head.repo.full_name,
          private: data.head.repo.private,
          description: data.head.repo.description,
          defaultBranch: data.head.repo.default_branch,
          owner: {
            id: data.head.repo.owner.id,
            login: data.head.repo.owner.login,
            name: data.head.repo.owner.name,
            avatarUrl: data.head.repo.owner.avatar_url,
            htmlUrl: data.head.repo.owner.html_url,
            type: data.head.repo.owner.type,
          },
          htmlUrl: data.head.repo.html_url,
          createdAt: data.head.repo.created_at,
          updatedAt: data.head.repo.updated_at,
        },
      },
      base: {
        label: data.base.label,
        ref: data.base.ref,
        sha: data.base.sha,
        user: {
          id: data.base.user.id,
          login: data.base.user.login,
          name: data.base.user.name,
          avatarUrl: data.base.user.avatar_url,
          htmlUrl: data.base.user.html_url,
          type: data.base.user.type,
        },
        repo: {
          id: data.base.repo.id,
          name: data.base.repo.name,
          fullName: data.base.repo.full_name,
          private: data.base.repo.private,
          description: data.base.repo.description,
          defaultBranch: data.base.repo.default_branch,
          owner: {
            id: data.base.repo.owner.id,
            login: data.base.repo.owner.login,
            name: data.base.repo.owner.name,
            avatarUrl: data.base.repo.owner.avatar_url,
            htmlUrl: data.base.repo.owner.html_url,
            type: data.base.repo.owner.type,
          },
          htmlUrl: data.base.repo.html_url,
          createdAt: data.base.repo.created_at,
          updatedAt: data.base.repo.updated_at,
        },
      },
      htmlUrl: data.html_url,
      diffUrl: data.diff_url,
      patchUrl: data.patch_url,
      issueUrl: data.issue_url,
      commitsUrl: data.commits_url,
      reviewCommentsUrl: data.review_comments_url,
      reviewCommentUrl: data.review_comment_url,
      commentsUrl: data.comments_url,
      statusesUrl: data.statuses_url,
    };
  }
}
