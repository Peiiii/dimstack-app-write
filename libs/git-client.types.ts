export type Method =
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

export type ApiResponse<T> = {
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

export type FileItemResponse = {
  name: string;
  path: string;
  download_url: string;
  html_url: string;
  type: "file" | "dir";
  sha: string;
  data: any;
};



export type FileResponse = FileItemResponse & {
  content: string;
  size: number;
  uint8array: Uint8Array;
};
export type FileHelper = {
  get: (options: {
    owner: string;
    repo: string;
    path: string;
  }) => Promise<ApiResponse<FileResponse>>;
  getInfo: (options: {
    owner: string;
    repo: string;
    path: string;
  }) => Promise<ApiResponse<FileItemResponse[]>>;
  add: (options: {
    owner: string;
    repo: string;
    path: string;
    content: any;
    message?: any;
    branch?: string | undefined;
  }) => Promise<ApiResponse<any>>;
  update: (options: {
    owner: string;
    repo: string;
    path: string;
    content: string;
    message?: any;
    branch?: string | undefined;
    sha?: string | null | undefined;
  }) => Promise<ApiResponse<any>>;
  delete: (options: {
    owner: string;
    repo: string;
    path: string;
    sha?: string;
    message?: any;
  }) => Promise<ApiResponse<any>>;
};

export type GiteeClient = {
  File: FileHelper;
  Repo: {
    get: (options: {
      owner: string;
      repo: string;
    }) => Promise<ApiResponse<any>>;
    add: (options: { repo: string }) => Promise<ApiResponse<any>>;
    getList: (options: {
      page?: number;
      per_page?: number;
    }) => Promise<ApiResponse<any>>;
    delete: (options: {
      owner: string;
      repo: string;
    }) => Promise<ApiResponse<any>>;
    clear: (options: {
      owner: string;
      repo: string;
    }) => Promise<ApiResponse<any>>;
  };
  User: {
    getInfo: () => Promise<ApiResponse<any>>;
  };
  Branch: {
    get: (options: {
      owner: string;
      repo: string;
      branch: any;
    }) => Promise<ApiResponse<any>>;
    getList: (options: {
      owner: string;
      repo: string;
    }) => Promise<ApiResponse<any>>;
    add: (options: {
      owner: string;
      repo: string;
      branch: any;
      refs?: string;
    }) => Promise<ApiResponse<any>>;
  };
  // setAccessToken: (accessToken: any) => void;
};
