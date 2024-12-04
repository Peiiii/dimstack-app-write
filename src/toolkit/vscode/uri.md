让我们将 URI 结构归类为几种核心模式：

1. **基础文件系统模式** (FileSystemUri)
```typescript
interface FileSystemUriPattern {
  // 1. 本地文件系统
  local: 'file:///path/to/file'
  
  // 2. 网络共享
  network: 'file://host/share/path'
  
  // 3. 虚拟文件系统
  virtual: 'memfs:///path/to/resource'
  
  // 统一格式
  pattern: `${scheme}://${authority?}/${path}`
}

// 示例：
file:///home/user/doc.txt          // 本地文件
file://server/share/doc.txt        // 网络共享
memfs:///temp/cache.json          // 内存文件系统
zipfs:///archive.zip!/file.txt    // 压缩文件系统
```

2. **远程资源模式** (RemoteUri)
```typescript
interface RemoteUriPattern {
  // 1. 基础认证
  basic: 'scheme://user:pass@host:port/path'
  
  // 2. Token认证
  token: 'scheme://token@host/path'
  
  // 3. 无认证
  public: 'scheme://host/path'
  
  // 统一格式
  pattern: `${scheme}://${auth?}${host}:${port?}/${path}`
}

// 示例：
ssh://git@github.com:22/repo       // SSH
http://api.example.com/data        // HTTP
ftp://user:pass@host:21/file      // FTP
```

3. **数据资源模式** (DataUri)
```typescript
interface DataUriPattern {
  // 1. 数据库资源
  database: 'db://user:pass@host:port/database/collection'
  
  // 2. 云存储资源
  storage: 'storage://account:key@service/container/blob'
  
  // 统一格式
  pattern: `${scheme}://${auth}@${host}/${resource}`
}

// 示例：
mongodb://user:pass@localhost:27017/db
s3://key:secret@bucket/object
redis://user:pass@host:6379/0
```

4. **命令/动作模式** (CommandUri)
```typescript
interface CommandUriPattern {
  // 1. 简单命令
  simple: 'command://namespace.action'
  
  // 2. 带参数命令
  withParams: 'command://namespace.action?param=value'
  
  // 统一格式
  pattern: `${scheme}://${namespace}.${action}${params?}`
}

// 示例：
command://workspace.openFile
command://git.commit?message=fix
settings://editor.fontSize?value=14
```

5. **复合资源模式** (CompositeUri)
```typescript
interface CompositeUriPattern {
  // 1. 嵌套资源
  nested: 'outer://auth@host/inner://path'
  
  // 2. 多重定位
  multi: 'scheme://location1+location2/path'
  
  // 统一格式
  pattern: `${primaryScheme}://${location}/${secondaryUri}`
}

// 示例：
remote://dev.example.com/docker://container/app
vfs://overlay/file:///path+memfs:///path
git://repo/commit/file:///path
```

核心属性定义：
```typescript
interface CoreUriComponents {
  // 基础组件
  scheme: string;      // 协议
  authority?: string;  // 认证和主机信息
  path: string;       // 资源路径
  query?: string;     // 查询参数
  fragment?: string;  // 片段标识

  // 扩展信息
  meta?: {
    type: 'file' | 'remote' | 'data' | 'command' | 'composite';
    virtual?: boolean;
    readonly?: boolean;
    temporary?: boolean;
  };

  // 认证信息
  auth?: {
    type: 'basic' | 'token' | 'key';
    credentials: Record<string, string>;
  };
}
```

这五种模式基本上可以覆盖大多数使用场景：

1. **FileSystemUri**
   - 本地文件访问
   - 网络共享
   - 虚拟文件系统

2. **RemoteUri**
   - API 访问
   - 远程服务
   - 网络协议

3. **DataUri**
   - 数据库操作
   - 云存储访问
   - 数据服务

4. **CommandUri**
   - 应用命令
   - 系统操作
   - 设置管理

5. **CompositeUri**
   - 容器化环境
   - 虚拟化环境
   - 多重定位

每种模式都有其特定的：
- 格式规范
- 认证方式
- 参数处理
- 安全考虑
- 错误处理

这种分类可以帮助：
1. 简化实现
2. 统一处理
3. 提高可维护性
4. 保持一致性
5. 便于扩展
