export type AuthInfo = {
  platform: string;
  username: string;
  accessToken?: string;
  refreshToken?: string;
  refreshTokenExpirationTime?: number;
  expirationTime?: number;
  createdAt?: number;
  [k: string]: number | string | undefined;
};
export type IAuthService = {
  saveAuthInfo: (authInfo: AuthInfo) => void;
  getAuthInfo: (platform: string, username: string) => AuthInfo | undefined;
  getAnyAuthInfo: (platform: string, username: string) => AuthInfo | undefined;
  authenticate: (platform: string, username: string, repo:string) => Promise<void>;
  registerAuthProvider: (provider: IAuthProvider) => void;
  hasWritePermission: (platform: string, username: string) => boolean;
  hasReadPermission: (platform: string, username: string) => boolean;
  // isExpired: (platform: string, username: string) => boolean;
  onAuthChange: (callback: () => void) => void;
};
export type IAuthProvider = {
  platform: string;
  authenticate: (username: string, repo: string) => Promise<void>;
  refresh?: (params: {
    platform: string;
    username: string;
    refreshToken: string;
  }) => Promise<void> | void;
};
