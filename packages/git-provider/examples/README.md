# Git Provider Examples

这个目录包含了基于 `@dimstack/git-provider` 库的各种示例应用。

## 📁 示例列表

### 1. 基础使用示例
**文件**: `basic-usage.ts`

展示库的基本功能，包括：
- 创建 GitHub 和 Gitee Provider
- 获取用户和仓库信息
- 文件系统操作
- 版本管理功能
- 错误处理

```bash
# 运行基础示例
npx ts-node examples/basic-usage.ts
```

### 2. 个人知识管理系统
**文件**: `personal-kms.ts`

基于 Git 的个人知识管理系统，支持：
- 分类笔记管理
- 版本历史追踪
- 全文搜索
- 标签系统
- 统计信息

```bash
# 运行个人KMS示例
npx ts-node examples/personal-kms.ts
```

### 3. 团队文档协作系统
**文件**: `team-docs.ts`

支持团队协作的文档系统，包括：
- 分支管理
- 拉取请求和代码审查
- 文档模板
- 版本比较
- 团队统计

```bash
# 运行团队协作示例
npx ts-node examples/team-docs.ts
```

### 4. Git博客系统
**文件**: `git-blog.ts`

基于 Git 的博客系统，功能包括：
- 文章发布和更新
- 草稿管理
- 标签和分类
- 搜索功能
- 自动生成站点地图和RSS

```bash
# 运行博客系统示例
npx ts-node examples/git-blog.ts
```

## 🚀 快速开始

### 1. 设置环境变量

```bash
# GitHub Token
export GITHUB_TOKEN="your-github-token"

# Gitee Token (可选)
export GITEE_TOKEN="your-gitee-token"
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行示例

```bash
# 运行所有基础示例
npx ts-node examples/basic-usage.ts

# 运行特定应用示例
npx ts-node examples/personal-kms.ts
npx ts-node examples/team-docs.ts
npx ts-node examples/git-blog.ts
```

## 📋 示例应用详解

### PersonalKMS - 个人知识管理系统

```typescript
import { PersonalKMS } from './examples/personal-kms';

const kms = new PersonalKMS(token, owner, repo);

// 初始化知识库结构
await kms.initializeStructure();

// 添加笔记
await kms.addNote(
  'daily-notes',
  'Learning Git Provider',
  'Today I learned about the @dimstack/git-provider library...',
  ['git', 'learning', 'typescript']
);

// 搜索笔记
const results = await kms.searchNotes('git');

// 获取统计信息
const stats = await kms.getStats();
```

### TeamDocs - 团队文档协作

```typescript
import { TeamDocs } from './examples/team-docs';

const teamDocs = new TeamDocs(token, owner, repo);

// 创建文档草稿
const { branchName } = await teamDocs.createDocumentDraft(
  'API Documentation',
  'Complete API documentation...',
  'john-doe'
);

// 创建拉取请求
await teamDocs.createPullRequest(
  'API Documentation',
  'Add comprehensive API documentation',
  branchName
);

// 审查和合并
await teamDocs.reviewAndMerge(prNumber, true, 'Looks good!');
```

### GitBlog - 博客系统

```typescript
import { GitBlog } from './examples/git-blog';

const blog = new GitBlog(token, owner, repo);

// 发布文章
await blog.publishPost(
  'Getting Started with Git Provider',
  'Complete tutorial content...',
  ['git', 'tutorial', 'typescript']
);

// 获取文章列表
const posts = await blog.getPosts('published');

// 搜索文章
const results = await blog.searchPosts('git');

// 生成站点地图和RSS
await blog.generateSitemap();
await blog.generateRSS();
```

## 🔧 自定义和扩展

### 创建自定义应用

```typescript
import { GitHubProvider, GitFileSystem } from '@dimstack/git-provider';

class CustomApp {
  private provider: GitHubProvider;
  private fs: GitFileSystem;

  constructor(token: string, owner: string, repo: string) {
    this.provider = new GitHubProvider({ token });
    this.fs = new GitFileSystem(this.provider, { owner, repo });
  }

  async customMethod() {
    // 你的自定义逻辑
  }
}
```

### 添加新功能

每个示例应用都可以轻松扩展：

1. **添加新的方法**到现有类中
2. **创建新的应用类**继承现有功能
3. **组合多个应用**的功能

## 📚 学习路径

1. **初学者**: 从 `basic-usage.ts` 开始
2. **个人用户**: 尝试 `personal-kms.ts`
3. **团队协作**: 学习 `team-docs.ts`
4. **内容创作**: 探索 `git-blog.ts`
5. **高级用户**: 基于示例创建自己的应用

## 🛠️ 故障排除

### 常见问题

1. **Token 错误**
   ```
   Error: Failed to get user info: 401 Unauthorized
   ```
   解决：检查 GitHub/Gitee token 是否正确设置

2. **仓库不存在**
   ```
   Error: Failed to get repository: 404 Not Found
   ```
   解决：确保仓库存在且有访问权限

3. **权限不足**
   ```
   Error: Failed to create branch: 403 Forbidden
   ```
   解决：检查 token 权限是否足够

### 调试技巧

1. 启用详细日志
2. 检查网络连接
3. 验证 API 限制
4. 使用 try-catch 包装操作

## 🤝 贡献

欢迎贡献新的示例应用！

1. 创建新的示例文件
2. 添加详细的文档
3. 包含使用示例
4. 更新此 README

## 📄 许可证

这些示例遵循与主库相同的 MIT 许可证。 