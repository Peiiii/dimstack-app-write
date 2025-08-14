import { AuthResult, GitAuthConfig, GitAuthError, StartAuthOptions, AuthProvider, UserInfo } from './types';
import { generateState } from './utils';

export class GitAuth {
    private provider: AuthProvider;
    private config: GitAuthConfig;

    constructor(provider: AuthProvider, config: GitAuthConfig) {
        this.provider = provider;
        this.config = config;
    }

    // 启动认证流程
    async startAuth(options: StartAuthOptions = {}): Promise<string> {
        const scopes = options.scopes || this.config.scopes || this.provider.defaultScopes;
        const state = options.state || generateState();

        const authUrl = this.provider.buildAuthUrl({
            clientId: this.config.clientId,
            redirectUri: this.config.redirectUri,
            scopes,
            state
        });

        return authUrl;
    }

    // 处理回调
    async handleCallback(code: string, state?: string): Promise<AuthResult> {
        if (!code) {
            throw new GitAuthError('Authorization code is required', 'MISSING_CODE');
        }

        // 交换授权码获取令牌
        const tokenResponse = await this.provider.exchangeCodeForToken(code, {
            clientId: this.config.clientId,
            redirectUri: this.config.redirectUri,
            code
        });

        // 获取用户信息
        const userInfo = await this.provider.getUserInfo(tokenResponse.access_token);

        // 构建认证结果
        const result: AuthResult = {
            accessToken: tokenResponse.access_token,
            refreshToken: tokenResponse.refresh_token,
            tokenType: tokenResponse.token_type,
            expiresIn: tokenResponse.expires_in,
            scope: tokenResponse.scope,
            user: userInfo,
            platform: this.provider.name.toLowerCase(),
            createdAt: Date.now()
        };

        return result;
    }

    // 获取用户信息
    async getUserInfo(accessToken: string): Promise<UserInfo> {
        return await this.provider.getUserInfo(accessToken);
    }

    // 验证令牌
    async validateToken(accessToken: string): Promise<boolean> {
        try {
            await this.provider.getUserInfo(accessToken);
            return true;
        } catch {
            return false;
        }
    }
}
