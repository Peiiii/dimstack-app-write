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
}

/**
 * Git提供商配置选项
 */
export interface GitProviderOptions {
  owner: string;
  repo: string;
  token: string;
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
 * 错误类型
 */
export class GitProviderError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = "GitProviderError";
  }
}
