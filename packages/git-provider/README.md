# @dimstack/git-provider

一个统一的Git提供商接口，支持GitHub、Gitee等平台。

## 特性

- 统一的API接口
- 支持多个Git提供商（GitHub、Gitee）
- 完整的文件系统抽象
- TypeScript支持
- 自动令牌刷新
- 错误处理

## 安装

```bash
npm install @dimstack/git-provider
```

## 使用示例

### 创建GitHub客户端

```typescript
import { GitHubProvider } from '@dimstack/git-provider';

const client = new GitHubProvider({
  token: 'your-github-token'
});

// 获取仓库信息
const repo = await client.getRepository({
  owner: 'octocat',
  repo: 'Hello-World'
});

// 获取文件内容
const file = await client.getFile({
  owner: 'octocat',
  repo: 'Hello-World',
  path: 'README.md'
});
```

### 使用文件系统

```typescript
import { GitFileSystem } from '@dimstack/git-provider';
import { GitHubProvider } from '@dimstack/git-provider';

const provider = new GitHubProvider({
  token: 'your-github-token'
});

const fs = new GitFileSystem(provider);

// 读取文件
const content = await fs.readFile('README.md', { encoding: 'utf-8' });

// 写入文件
await fs.writeFile('test.txt', 'Hello, World!');

// 创建目录
await fs.mkdir('src');

// 列出目录内容
const files = await fs.readdir('src');
```

### 使用Gitee客户端

```typescript
import { GiteeProvider } from '@dimstack/git-provider';

const client = new GiteeProvider({
  token: 'your-gitee-token'
});

// 获取仓库信息
const repo = await client.getRepository({
  owner: 'your-username',
  repo: 'your-repo'
});

// 获取文件内容
const file = await client.getFile({
  owner: 'your-username',
  repo: 'your-repo',
  path: 'README.md'
});
```

## 项目结构

```
src/
├── types/           # 类型定义
│   ├── index.ts     # 类型导出
│   ├── fs.ts        # 文件系统类型
│   └── git-client.ts # Git客户端类型
├── filesystem/      # 文件系统实现
│   ├── index.ts     # 文件系统导出
│   └── git-file-system.ts # Git文件系统实现
├── providers/       # Git提供商实现
│   ├── index.ts     # 提供商导出
│   ├── github-provider.ts # GitHub实现
│   └── gitee-provider.ts  # Gitee实现
└── index.ts         # 主入口文件
```

## 支持的提供商

- GitHub
- Gitee
- GitLab (计划中)

## 许可证

MIT 