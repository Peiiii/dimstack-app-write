
// 认证配置
export interface GitAuthConfig {
  clientId: string;
  redirectUri: string;
  scopes?: string[];
}

// 启动认证选项
export interface StartAuthOptions {
  scopes?: string[];
  state?: string;
}

// 认证结果
export interface AuthResult {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
  user: UserInfo;
  platform: string; // 改为string类型，更灵活
  createdAt: number;
}

// 用户信息
export interface UserInfo {
  id: number;
  login: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  htmlUrl?: string;
}

// 令牌响应
export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

// 平台提供者接口
export interface AuthProvider {
  name: string;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  defaultScopes: string[];
  
  buildAuthUrl(config: AuthUrlConfig): string;
  exchangeCodeForToken(code: string, config: TokenExchangeConfig): Promise<TokenResponse>;
  getUserInfo(token: string): Promise<UserInfo>;
}

// 授权URL配置
export interface AuthUrlConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  state: string;
}

// 令牌交换配置
export interface TokenExchangeConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  code: string;
}

// 错误类型
export class GitAuthError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'GitAuthError';
  }
}
