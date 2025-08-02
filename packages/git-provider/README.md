# @dimstack/git-provider

一个统一的Git提供商接口，支持GitHub、Gitee等平台。

## 特性

- 🔄 **统一接口**: 提供一致的API，支持GitHub和Gitee
- 📁 **文件系统抽象**: 将Git仓库当作本地文件系统使用
- 🔐 **版本控制**: 完整的Git操作支持，包括提交、分支、合并等
- 🛡️ **类型安全**: 完整的TypeScript类型定义
- 🚀 **现代化**: 基于fetch API，支持现代JavaScript环境

## 安装

```bash
npm install @dimstack/git-provider
```

## 快速开始

### 基本使用

```typescript
import { GitHubProvider, GitFileSystem } from '@dimstack/git-provider';

// 创建GitHub Provider
const provider = new GitHubProvider({
  token: 'your-github-token'
});

// 创建文件系统实例
const fs = new GitFileSystem(provider, {
  owner: 'octocat',
  repo: 'Hello-World'
});

// 读取文件
const content = await fs.readFile('README.md', { encoding: 'utf-8' });

// 写入文件
await fs.writeFile('docs/example.md', '# Hello World', {
  message: 'Add example document'
});
```

### 跨平台支持

```typescript
import { GitHubProvider, GiteeProvider } from '@dimstack/git-provider';

// GitHub
const githubProvider = new GitHubProvider({
  token: 'your-github-token'
});

// Gitee
const giteeProvider = new GiteeProvider({
  token: 'your-gitee-token'
});

// 相同的API接口
const repo = await githubProvider.getRepository({
  owner: 'octocat',
  repo: 'Hello-World'
});
```

## API 参考

### GitProvider 接口

```typescript
interface GitProvider {
  // 仓库操作
  getRepository(options: { owner: string; repo: string }): Promise<ApiResponse<Repository>>;
  createRepository(options: { name: string; private?: boolean; description?: string }): Promise<ApiResponse<Repository>>;
  deleteRepository(options: { owner: string; repo: string }): Promise<ApiResponse<void>>;

  // 用户信息
  getUserInfo(): Promise<ApiResponse<User>>;

  // 分支操作
  getBranches(options: { owner: string; repo: string }): Promise<ApiResponse<Branch[]>>;
  createBranch(options: { owner: string; repo: string; branch: string; ref?: string }): Promise<ApiResponse<Branch>>;

  // 文件操作
  getFile(options: FileSystemOptions & { path: string }): Promise<ApiResponse<FileContent>>;
  getFileInfo(options: FileSystemOptions & { path: string }): Promise<ApiResponse<FileItem[]>>;
  putFile(options: FileSystemOptions & { path: string; content: string | Uint8Array; sha?: string }): Promise<ApiResponse<FileItem>>;
  deleteFile(options: FileSystemOptions & { path: string; sha?: string }): Promise<ApiResponse<void>>;

  // 版本控制
  getCommits(options: { owner: string; repo: string; path?: string; branch?: string; per_page?: number }): Promise<ApiResponse<Commit[]>>;
  getCommit(options: { owner: string; repo: string; sha: string }): Promise<ApiResponse<Commit>>;
  getDiff(options: { owner: string; repo: string; base: string; head: string; path?: string }): Promise<ApiResponse<Diff[]>>;
  mergeBranch(options: { owner: string; repo: string; base: string; head: string; commit_message?: string }): Promise<ApiResponse<MergeResult>>;

  // 拉取请求
  createPullRequest(options: { owner: string; repo: string; title: string; body?: string; head: string; base: string }): Promise<ApiResponse<PullRequest>>;
  getPullRequests(options: { owner: string; repo: string; state?: 'open' | 'closed' | 'all' }): Promise<ApiResponse<PullRequest[]>>;
  mergePullRequest(options: { owner: string; repo: string; pull_number: number; commit_message?: string; merge_method?: 'merge' | 'squash' | 'rebase' }): Promise<ApiResponse<MergeResult>>;
}
```

### GitFileSystem 类

```typescript
class GitFileSystem {
  constructor(provider: GitProvider, options: { owner: string; repo: string });

  // 文件操作
  readFile(path: string, options?: { encoding?: string }): Promise<string | Uint8Array>;
  writeFile(path: string, content: string | Uint8Array, options?: { message?: string }): Promise<void>;
  deleteFile(path: string, options?: { message?: string }): Promise<void>;

  // 目录操作
  readdir(path: string): Promise<FileItem[]>;
  mkdir(path: string): Promise<void>;
}
```

## 配置选项

### GitHubProvider

```typescript
interface GitHubProviderOptions {
  token: string;                    // GitHub Personal Access Token
  baseUrl?: string;                 // 自定义API基础URL
  timeout?: number;                 // 请求超时时间
  headers?: Record<string, string>; // 自定义请求头
}
```

### GiteeProvider

```typescript
interface GiteeProviderOptions {
  token: string;                    // Gitee Personal Access Token
  baseUrl?: string;                 // 自定义API基础URL
  timeout?: number;                 // 请求超时时间
  headers?: Record<string, string>; // 自定义请求头
}
```

## 错误处理

```typescript
import { GitProviderError } from '@dimstack/git-provider';

try {
  const repo = await provider.getRepository({
    owner: 'octocat',
    repo: 'non-existent-repo'
  });
} catch (error) {
  if (error instanceof GitProviderError) {
    console.error(`Git Provider Error: ${error.message}`);
    console.error(`Error Code: ${error.code}`);
    console.error(`HTTP Status: ${error.status}`);
  }
}
```

## 示例应用

查看 `examples/` 目录获取完整的示例应用：

- **基础使用**: `examples/basic-usage.ts`
- **个人知识管理**: `examples/personal-kms.ts`
- **团队文档协作**: `examples/team-docs.ts`
- **Git博客系统**: `examples/git-blog.ts`

运行示例：

```bash
# 设置环境变量
export GITHUB_TOKEN="your-github-token"
export GITEE_TOKEN="your-gitee-token"

# 运行基础示例
npx ts-node examples/basic-usage.ts
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 