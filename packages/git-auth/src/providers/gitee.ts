import { TokenResponse, UserInfo } from '../types';
import { BaseProvider } from './base-provider';

export class GiteeProvider extends BaseProvider {
  name = 'Gitee';
  authUrl = 'https://gitee.com/oauth/authorize';
  tokenUrl = 'https://gitee.com/oauth/token';
  userInfoUrl = 'https://gitee.com/api/v5/user';
  defaultScopes = ['projects', 'user_info'];

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
