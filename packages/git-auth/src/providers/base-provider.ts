import { AuthProvider, AuthUrlConfig, TokenExchangeConfig, TokenResponse, UserInfo, ProviderConfig, TokenRequestMethod } from '../types';

export abstract class BaseProvider implements AuthProvider {
  abstract name: string;
  abstract authUrl: string;
  abstract tokenUrl: string;
  abstract userInfoUrl: string;
  abstract defaultScopes: string[];

  protected customFetch?: (url: string, options: RequestInit) => Promise<Response>;
  protected tokenRequestMethod: TokenRequestMethod;

  constructor(config?: ProviderConfig) {
    this.customFetch = config?.httpClient?.fetch;
    this.tokenRequestMethod = config?.tokenRequestMethod || 'body';
  }

  protected async makeRequest(url: string, options: RequestInit): Promise<Response> {
    const fetchFn = this.customFetch || fetch;
    return fetchFn(url, options);
  }

  protected buildTokenRequestParams(config: TokenExchangeConfig, code: string): URLSearchParams {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', config.clientId);
    if (config.clientSecret) {
      params.append('client_secret', config.clientSecret);
    }
    params.append('code', code);
    params.append('redirect_uri', config.redirectUri);
    return params;
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
    const params = this.buildTokenRequestParams(config, code);
    
    let requestUrl = this.tokenUrl;
    let requestBody = '';

    if (this.tokenRequestMethod === 'url') {
      // 方式2: 所有参数放在URL中
      requestUrl = `${this.tokenUrl}?${params.toString()}`;
    } else {
      // 方式1: 参数放在body中（默认，符合OAuth 2.0标准）
      requestBody = params.toString();
    }

    const response = await this.makeRequest(requestUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`${this.name} error: ${data.error_description || data.error}`);
    }

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      token_type: data.token_type || 'bearer',
      expires_in: data.expires_in || 0,
      scope: data.scope || ''
    };
  }

  abstract getUserInfo(token: string): Promise<UserInfo>;
}
