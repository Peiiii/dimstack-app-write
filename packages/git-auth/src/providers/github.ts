import { AuthProvider, AuthUrlConfig, TokenExchangeConfig, TokenResponse, UserInfo } from '../types';

export class GitHubProvider implements AuthProvider {
  name = 'GitHub';
  authUrl = 'https://github.com/login/oauth/authorize';
  tokenUrl = 'https://github.com/login/oauth/access_token';
  userInfoUrl = 'https://api.github.com/user';
  defaultScopes = ['repo', 'user'];

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
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      throw new Error(`GitHub error: ${data.error_description || data.error}`);
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
    const response = await fetch(this.userInfoUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
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
