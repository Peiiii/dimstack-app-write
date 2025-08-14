import { AuthProvider, AuthUrlConfig, TokenExchangeConfig, TokenResponse, UserInfo, ProviderConfig } from '../types';

export class GiteeProvider implements AuthProvider {
  name = 'Gitee';
  authUrl = 'https://gitee.com/oauth/authorize';
  tokenUrl = 'https://gitee.com/oauth/token';
  userInfoUrl = 'https://gitee.com/api/v5/user';
  defaultScopes = ['projects', 'user_info'];

  private customFetch?: (url: string, options: RequestInit) => Promise<Response>;

  constructor(config?: ProviderConfig) {
    this.customFetch = config?.httpClient?.fetch;
  }

  private async makeRequest(url: string, options: RequestInit): Promise<Response> {
    const fetchFn = this.customFetch || fetch;
    return fetchFn(url, options);
  }

  buildAuthUrl(config: AuthUrlConfig): string {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(' '),
      state: config.state,
      response_type: 'code'
    };

    return `${this.authUrl}?${Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')}`;
  }

  async exchangeCodeForToken(code: string, config: TokenExchangeConfig): Promise<TokenResponse> {
    const response = await this.makeRequest(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code,
        redirect_uri: config.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Gitee error: ${data.error_description || data.error}`);
    }

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      token_type: data.token_type || 'bearer',
      expires_in: data.expires_in || 0,
      scope: data.scope || ''
    };
  }

  async getUserInfo(token: string): Promise<UserInfo> {
    const response = await this.makeRequest(this.userInfoUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      login: data.login,
      name: data.name,
      email: data.email,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url
    };
  }
}
