import { TokenResponse, UserInfo } from '../types';
import { BaseProvider } from './base-provider';

export class GitHubProvider extends BaseProvider {
  name = 'GitHub';
  authUrl = 'https://github.com/login/oauth/authorize';
  tokenUrl = 'https://github.com/login/oauth/access_token';
  userInfoUrl = 'https://api.github.com/user';
  defaultScopes = ['repo', 'user'];

  async getUserInfo(token: string): Promise<UserInfo> {
    const response = await this.makeRequest(this.userInfoUrl, {
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
