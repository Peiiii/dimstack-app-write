# FileSystemProvider 集成指南

本文档介绍如何在 GitNote 中实现和集成自定义的文件系统提供者。

## 目录

1. [基本概念](#基本概念)
2. [实现 FileSystemProvider](#实现-filesystemprovider)
3. [注册文件系统](#注册文件系统)
4. [最佳实践](#最佳实践)
5. [示例实现](#示例实现)

## 基本概念

GitNote 使用 FileSystemProvider 接口来抽象不同的文件系统操作。每个文件系统提供者都需要实现这个接口来支持基本的文件操作。

### URI 格式

GitNote 使用统一的 URI 格式来访问文件：

```typescript
space://${spaceId}/${path}
```

例如：
- `space://gitee-repo1/docs/note.md`
- `space://github-repo2/images/photo.png`

## 实现 FileSystemProvider

### 基本接口

```typescript
interface FileSystemProvider {
  // 文件变更事件
  readonly onDidChangeFile: Event<FileChangeEvent[]>;

  // 文件操作方法
  stat(uri: Uri): MaybeThenable<FileStat>;
  readDirectory(uri: Uri): MaybeThenable<[string, FileType][]>;
  readFile(uri: Uri): MaybeThenable<Uint8Array>;
  writeFile(uri: Uri, content: Uint8Array, options: { create: boolean; overwrite: boolean }): MaybeThenable<void>;
  delete(uri: Uri, options: { recursive: boolean }): MaybeThenable<void>;
  rename(oldUri: Uri, newUri: Uri, options: { overwrite: boolean }): MaybeThenable<void>;
  
  // 可选方法
  watch?(uri: Uri, options: { recursive: boolean; excludes: string[] }): Disposable;
  copy?(source: Uri, destination: Uri, options: { overwrite: boolean }): MaybeThenable<void>;
}
```

### 示例实现

```typescript
export class CustomFileSystemProvider implements FileSystemProvider {
  private readonly _onDidChangeFile = new EventEmitter<FileChangeEvent[]>();
  readonly onDidChangeFile: Event<FileChangeEvent[]> = this._onDidChangeFile.event;

  constructor(private config: CustomConfig) {}

  async stat(uri: Uri): Promise<FileStat> {
    // 实现文件状态查询
    const path = uri.path;
    // 返回文件信息
    return {
      type: FileType.File,
      ctime: 0,
      mtime: 0,
      size: 0
    };
  }

  async readDirectory(uri: Uri): Promise<[string, FileType][]> {
    // 实现目录读取
    const path = uri.path;
    return [
      ['file.txt', FileType.File],
      ['folder', FileType.Directory]
    ];
  }

  // ... 实现其他必要方法
}
```

## 注册文件系统

### 创建插件

```typescript
import { createPlugin } from "xbook/common/createPlugin";
import { SpaceFileSystemProviderProxy } from "@/services/space-file-system-provider-proxy";

export const CustomFileSystemPlugin = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    
    spaceService.subscribeSpaces((spaces) => {
      spaces.forEach((space) => {
        if (space.platform === "custom") {
          const provider = new CustomFileSystemProvider(/* 配置 */);
          const proxyProvider = new SpaceFileSystemProviderProxy(provider, space.id);
          
          xbook.fs.registerProvider({
            id: `space-${space.id}`,
            scheme: 'space',
            provider: proxyProvider,
            authority: space.id,
            options: { overwrite: true },
          });
        }
      });
    });
  },
});
```

## 最佳实践

### 1. 错误处理

```typescript
async readFile(uri: Uri): Promise<Uint8Array> {
  try {
    const content = await this.doReadFile(uri.path);
    return new TextEncoder().encode(content);
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      throw FileSystemError.FileNotFound(uri);
    }
    throw error;
  }
}
```

### 2. 缓存管理

```typescript
private cache = new Map<string, CacheEntry>();

private getCached(uri: Uri): CacheEntry | undefined {
  return this.cache.get(uri.toString());
}

private setCached(uri: Uri, entry: CacheEntry): void {
  this.cache.set(uri.toString(), entry);
}
```

### 3. 事件通知

```typescript
private notifyFileChanged(uri: Uri, type: FileChangeType): void {
  this._onDidChangeFile.fire([{ type, uri }]);
}
```

## 示例实现

### Git 仓库文件系统

```typescript
export class GitRepoFileSystemProvider implements FileSystemProvider {
  constructor(
    private gitClient: GitClient,
    private owner: string,
    private repo: string
  ) {}

  async readFile(uri: Uri): Promise<Uint8Array> {
    const path = uri.path;
    const response = await this.gitClient.File.get({
      owner: this.owner,
      repo: this.repo,
      path,
    });
    
    return new TextEncoder().encode(response.data.content);
  }

  async writeFile(uri: Uri, content: Uint8Array): Promise<void> {
    const path = uri.path;
    const contentString = new TextDecoder().decode(content);
    
    await this.gitClient.File.update({
      owner: this.owner,
      repo: this.repo,
      path,
      content: contentString,
    });
  }
  
  // ... 实现其他方法
}
```

## 注意事项

1. 所有文件操作都应该是异步的
2. 正确处理路径分隔符
3. 实现适当的错误处理
4. 考虑并发操作的情况
5. 实现资源清理机制

## 调试建议

1. 启用调试日志：

```typescript
private log(message: string) {
  if (process.env.DEBUG) {
    console.log(`[CustomFS] ${message}`);
  }
}
```

2. 使用 URI 工具函数：

```typescript
import { Uri } from "@/toolkit/vscode/uri";

const uri = Uri.parse('space://spaceId/path');
const normalized = uri.with({ path: normalizePath(uri.path) });
```

## 参考资料

- [VSCode FileSystem API](https://code.visualstudio.com/api/references/vscode-api#FileSystem)
- [GitNote 源码](https://github.com/yourusername/gitnote) 