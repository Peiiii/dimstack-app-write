/**
 * Git提供商接口
 */
export interface GitProvider {
  /**
   * 获取仓库信息
   */
  getRepository(options: {
    owner: string;
    repo: string;
  }): Promise<ApiResponse<Repository>>;

  /**
   * 创建仓库
   */
  createRepository(options: {
    name: string;
    private?: boolean;
    description?: string;
  }): Promise<ApiResponse<Repository>>;

  /**
   * 删除仓库
   */
  deleteRepository(options: {
    owner: string;
    repo: string;
  }): Promise<ApiResponse<void>>;

  /**
   * 获取用户信息
   */
  getUserInfo(): Promise<ApiResponse<User>>;

  /**
   * 获取分支列表
   */
  getBranches(options: {
    owner: string;
    repo: string;
  }): Promise<ApiResponse<Branch[]>>;

  /**
   * 创建分支
   */
  createBranch(options: {
    owner: string;
    repo: string;
    branch: string;
    ref?: string;
  }): Promise<ApiResponse<Branch>>;

  /**
   * 获取文件内容
   */
  getFile(
    options: FileSystemOptions & { path: string }
  ): Promise<ApiResponse<FileContent>>;

  /**
   * 获取文件/目录信息
   */
  getFileInfo(
    options: FileSystemOptions & { path: string }
  ): Promise<ApiResponse<FileItem[]>>;

  /**
   * 创建/更新文件
   */
  putFile(
    options: FileSystemOptions & {
      path: string;
      content: string | Uint8Array;
      sha?: string;
    }
  ): Promise<ApiResponse<FileItem>>;

  /**
   * 删除文件
   */
  deleteFile(
    options: FileSystemOptions & { path: string; sha?: string }
  ): Promise<ApiResponse<void>>;

  /**
   * 刷新访问令牌
   */
  refreshAccessToken?(refreshToken: string): Promise<AuthInfo>;

  /**
   * 获取提交历史
   */
  getCommits(options: {
    owner: string;
    repo: string;
    path?: string;
    branch?: string;
    since?: string;
    until?: string;
    per_page?: number;
    page?: number;
  }): Promise<ApiResponse<Commit[]>>;

  /**
   * 获取单个提交信息
   */
  getCommit(options: {
    owner: string;
    repo: string;
    sha: string;
  }): Promise<ApiResponse<Commit>>;

  /**
   * 获取文件差异
   */
  getDiff(options: {
    owner: string;
    repo: string;
    base: string;
    head: string;
    path?: string;
  }): Promise<ApiResponse<Diff[]>>;

  /**
   * 合并分支
   */
  mergeBranch(options: {
    owner: string;
    repo: string;
    base: string;
    head: string;
    commit_message?: string;
  }): Promise<ApiResponse<MergeResult>>;

  /**
   * 创建拉取请求
   */
  createPullRequest(options: {
    owner: string;
    repo: string;
    title: string;
    body?: string;
    head: string;
    base: string;
  }): Promise<ApiResponse<PullRequest>>;

  /**
   * 获取拉取请求列表
   */
  getPullRequests(options: {
    owner: string;
    repo: string;
    state?: 'open' | 'closed' | 'all';
    head?: string;
    base?: string;
  }): Promise<ApiResponse<PullRequest[]>>;

  /**
   * 合并拉取请求
   */
  mergePullRequest(options: {
    owner: string;
    repo: string;
    pull_number: number;
    commit_title?: string;
    commit_message?: string;
    merge_method?: 'merge' | 'squash' | 'rebase';
  }): Promise<ApiResponse<MergeResult>>;
}

/**
 * Git提供商配置选项
 */
export interface GitProviderOptions {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * 基础响应类型
 */
export interface ApiResponse<T> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
}

/**
 * 文件项响应类型
 */
export interface FileItem {
  name: string;
  path: string;
  downloadUrl: string;
  htmlUrl: string;
  type: "file" | "dir";
  sha: string;
  size?: number;
}

/**
 * 文件内容响应类型
 */
export interface FileContent extends FileItem {
  content: string;
  uint8array: Uint8Array;
}

/**
 * 仓库信息类型
 */
export interface Repository {
  id: number;
  fullName: string;
  name: string;
  owner: User;
  description?: string;
  private: boolean;
  htmlUrl: string;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 用户信息类型
 */
export interface User {
  id: number;
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  type: string;
}

/**
 * 分支信息类型
 */
export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

/**
 * 认证信息类型
 */
export interface AuthInfo {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresIn: number;
  createdAt: number;
  scope: string;
}

/**
 * 文件系统操作选项
 */
export interface FileSystemOptions {
  owner: string;
  repo: string;
  branch?: string;
  message?: string;
}

/**
 * 提交信息类型
 */
export interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: string;
  };
  parents: string[];
  tree: {
    sha: string;
    url: string;
  };
  url: string;
  htmlUrl: string;
  commentsUrl: string;
}

/**
 * 差异信息类型
 */
export interface Diff {
  sha: string;
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  blobUrl: string;
  rawUrl: string;
  contentsUrl: string;
  patch?: string;
}

/**
 * 合并结果类型
 */
export interface MergeResult {
  sha: string;
  merged: boolean;
  message: string;
  htmlUrl: string;
}

/**
 * 拉取请求类型
 */
export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  locked: boolean;
  user: User;
  assignees: User[];
  requestedReviewers: User[];
  labels: Label[];
  milestone?: Milestone;
  draft: boolean;
  merged: boolean;
  mergeable?: boolean;
  mergeableState: 'dirty' | 'clean' | 'unstable' | 'blocked';
  mergedBy?: User;
  mergeCommitSha?: string;
  comments: number;
  reviewComments: number;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  mergedAt?: string;
  head: {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: Repository;
  };
  base: {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: Repository;
  };
  htmlUrl: string;
  diffUrl: string;
  patchUrl: string;
  issueUrl: string;
  commitsUrl: string;
  reviewCommentsUrl: string;
  reviewCommentUrl: string;
  commentsUrl: string;
  statusesUrl: string;
}

/**
 * 标签类型
 */
export interface Label {
  id: number;
  name: string;
  color: string;
  description?: string;
  default: boolean;
}

/**
 * 里程碑类型
 */
export interface Milestone {
  id: number;
  number: number;
  title: string;
  description?: string;
  state: 'open' | 'closed';
  creator: User;
  openIssues: number;
  closedIssues: number;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  dueOn?: string;
}

/**
 * Git提供商错误类型
 */
export class GitProviderError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'GitProviderError';
  }
}
