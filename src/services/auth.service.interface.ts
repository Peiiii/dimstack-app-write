
export type AuthInfo = {
  platform: string;
  username: string;
  accessToken?: string;
  refreshToken?: string;
  expirationTime?: number;
  [k: string]: number | string | undefined;
};
export type IAuthService = {
  saveAuthInfo: (authInfo: AuthInfo) => void;
  getAuthInfo: (platform: string, username: string) => AuthInfo | undefined;
  authenticate: (platform: string, username: string) => Promise<void>;
  registerAuthProvider: (provider: AuthProvider) => void;
};
export type AuthProvider = {
  platform: string;
  authenticate: (username: string) => Promise<void>;
};
