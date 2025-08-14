# @dimstack/git-auth

一个简单的Git平台认证库，支持GitHub、Gitee等平台的OAuth认证。

## 特性

- 🔐 **简单易用**: 极简的API设计，几行代码即可实现Git平台认证
- 🚀 **多平台支持**: 支持GitHub、Gitee等主流Git平台
- 🛡️ **安全可靠**: 基于OAuth 2.0标准，支持状态验证
- 📱 **无存储耦合**: 完全由使用者控制数据存储方式
- 🎯 **轻量级**: 只包含核心认证逻辑，无额外依赖

## 安装

```bash
npm install @dimstack/git-auth
```

## 快速开始

### 基本使用

```typescript
import { GitAuth, generateState, parseAuthCode, GitHubProvider } from '@dimstack/git-auth';

// 1. 创建GitHub提供者
const githubProvider = new GitHubProvider();

// 2. 创建认证实例
const auth = new GitAuth(githubProvider, {
  clientId: 'your-github-client-id',
  redirectUri: 'https://your-app.com/auth/callback',
  scopes: ['repo', 'user']
});

// 3. 启动认证流程
const state = generateState(32); // 生成状态参数
const authUrl = await auth.startAuth({ state });

// 4. 存储状态参数（由使用者决定存储方式）
localStorage.setItem('github_auth_state', state);

// 5. 重定向用户到Git平台
window.location.href = authUrl;

// 6. 在回调页面处理认证结果
const { code, state: receivedState } = parseAuthCode(window.location.href);
const originalState = localStorage.getItem('github_auth_state');

if (code && receivedState === originalState) {
  try {
    const result = await auth.handleCallback(code, receivedState);
    console.log('认证成功:', result.user.login);
    
    // 存储认证结果（由使用者决定存储方式）
    localStorage.setItem('github_auth_result', JSON.stringify(result));
    
    // 清理临时状态
    localStorage.removeItem('github_auth_state');
    
  } catch (error) {
    console.error('认证失败:', error);
  }
}
```

### 支持GitHub

```typescript
import { GitAuth, GitHubProvider } from '@dimstack/git-auth';

// 创建GitHub提供者
const githubProvider = new GitHubProvider();

const githubAuth = new GitAuth(githubProvider, {
  clientId: 'your-github-client-id',
  redirectUri: 'https://your-app.com/auth/github/callback',
  scopes: ['repo', 'user', 'pages']
});

// 启动认证
const authUrl = await githubAuth.startAuth();
window.location.href = authUrl;
```

### 支持Gitee

```typescript
import { GitAuth, GiteeProvider } from '@dimstack/git-auth';

// 创建Gitee提供者
const giteeProvider = new GiteeProvider();

const giteeAuth = new GitAuth(giteeProvider, {
  clientId: 'your-gitee-client-id',
  redirectUri: 'https://your-app.com/auth/gitee/callback',
  scopes: ['projects', 'user_info']
});

// 启动认证
const authUrl = await giteeAuth.startAuth();
window.location.href = authUrl;
```

## 完整认证流程示例

### 场景：个人博客平台接入GitHub认证

假设你开发了一个个人博客平台，用户想要将文章自动发布到GitHub Pages。

#### 第一阶段：应用注册（一次性操作）

1. 在GitHub上注册OAuth应用：
   - 访问：https://github.com/settings/developers
   - 填写应用信息：
     - Application name: "我的博客平台"
     - Homepage URL: "https://myblog.com"
     - Authorization callback URL: "https://myblog.com/auth/github/callback"
   - GitHub会自动分配Client ID和Client Secret

#### 第二阶段：用户授权流程

```typescript
// 用户点击"连接GitHub"按钮
const githubProvider = new GitHubProvider();

const auth = new GitAuth(githubProvider, {
  clientId: 'abc123def456',
  redirectUri: 'https://myblog.com/auth/github/callback',
  scopes: ['repo', 'pages']
});

// 生成状态参数并存储
const state = generateState(32);
sessionStorage.setItem('github_auth_state', state);

// 启动认证流程
const authUrl = await auth.startAuth({ state });
window.location.href = authUrl;
```

#### 第三阶段：GitHub授权页面

用户被重定向到GitHub，看到授权页面：
- "我的博客平台 想要访问你的账户"
- [x] 访问你的仓库
- [x] 管理GitHub Pages
- [ ] 访问你的邮箱地址

用户点击"Authorize 我的博客平台"

#### 第四阶段：处理回调

```typescript
// 用户被重定向回博客平台
// URL: https://myblog.com/auth/github/callback?code=def789ghi012&state=random_security_string

// 解析回调参数
const { code, state: receivedState } = parseAuthCode(window.location.href);
const originalState = sessionStorage.getItem('github_auth_state');

if (code && receivedState === originalState) {
  try {
    const result = await auth.handleCallback(code, receivedState);
    
    // 存储认证结果
    localStorage.setItem('github_auth', JSON.stringify(result));
    
    // 清理临时状态
    sessionStorage.removeItem('github_auth_state');
    
    // 显示成功消息
    showSuccessMessage('GitHub连接成功！');
    
  } catch (error) {
    showErrorMessage('认证失败: ' + error.message);
  }
}
```

#### 第五阶段：使用访问令牌

```typescript
// 现在可以使用访问令牌了
const authResult = JSON.parse(localStorage.getItem('github_auth'));
const { accessToken, user } = authResult;

// 创建Git Provider（使用现有的@dimstack/git-provider库）
import { GitHubProvider } from '@dimstack/git-provider';

const provider = new GitHubProvider({
  token: accessToken
});

// 获取用户的仓库列表
const repos = await provider.getRepositories();

// 发布新文章
const fs = new GitFileSystem(provider, {
  owner: user.login,
  repo: 'my-blog'
});

await fs.writeFile('posts/new-article.md', articleContent, {
  message: 'Add new blog post: Article Title'
});
```

## API 参考

### GitAuth 类

#### 构造函数

```typescript
new GitAuth(config: GitAuthConfig)
```

#### 方法

- `startAuth(options?: StartAuthOptions): Promise<string>` - 启动认证流程
- `handleCallback(code: string, state?: string): Promise<AuthResult>` - 处理回调
- `getUserInfo(accessToken: string): Promise<UserInfo>` - 获取用户信息
- `validateToken(accessToken: string): Promise<boolean>` - 验证令牌

### 配置选项

```typescript
interface GitAuthConfig {
  clientId: string;                       // 客户端ID
  redirectUri: string;                    // 回调地址
  scopes?: string[];                      // 权限范围
}
```

### 认证结果

```typescript
interface AuthResult {
  accessToken: string;                    // 访问令牌
  refreshToken?: string;                  // 刷新令牌
  tokenType: string;                      // 令牌类型
  expiresIn: number;                      // 过期时间（秒）
  scope: string;                          // 权限范围
  user: UserInfo;                         // 用户信息
  platform: string;                       // 平台名称
  createdAt: number;                      // 创建时间
}
```

### 工具函数

- `generateState(length?: number): string` - 生成随机状态字符串
- `validateState(receivedState: string, originalState: string): boolean` - 验证状态参数
- `parseAuthCode(url: string): { code?: string; state?: string; error?: string }` - 解析授权码

## 错误处理

```typescript
import { GitAuthError } from '@dimstack/git-auth';

try {
  const result = await auth.handleCallback(code, state);
} catch (error) {
  if (error instanceof GitAuthError) {
    console.error(`认证错误: ${error.message}`);
    console.error(`错误代码: ${error.code}`);
  } else {
    console.error('未知错误:', error);
  }
}
```

## 最佳实践

### 1. 状态参数管理
- 始终使用状态参数防止CSRF攻击
- 状态参数应该是一次性的，使用后立即删除
- 可以使用sessionStorage存储状态参数

### 2. 错误处理
- 处理网络错误和认证失败
- 提供用户友好的错误信息
- 实现重试机制

### 3. 令牌管理
- 安全存储访问令牌
- 实现令牌过期检查
- 考虑令牌刷新机制

### 4. 用户体验
- 显示认证进度
- 提供清晰的授权说明
- 实现认证状态持久化

## 许可证

MIT License
