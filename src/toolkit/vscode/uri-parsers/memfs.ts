import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

/**
 * Memory FileSystem URI Examples:
 * 
 * 1. 基础文件路径
 * memfs:///file.txt
 * memfs:///folder/document.md
 * 
 * 2. 临时文件
 * memfs:///tmp/cache.json
 * memfs:///temp/scratch.txt
 * 
 * 3. 会话特定文件
 * memfs:///session123/state.json
 * memfs:///workspace/settings.json
 * 
 * 4. 虚拟配置文件
 * memfs:///config/app.json
 * memfs:///settings/user.json
 * 
 * 5. 缓存文件
 * memfs:///cache/images/avatar.png
 * memfs:///cache/data/response.json
 * 
 * 6. 临时工作区
 * memfs:///workspace/project/src
 * memfs:///workspace/temp/build
 * 
 * 7. 完整示例
 * memfs:///workspace/project123/src/components/App.tsx
 */

export class MemFsUriParser extends BaseUriParser {
  readonly scheme = "memfs";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: false,
      supportsQuery: false,
      supportsFragment: false,
    };
  }

  protected parseUri(value: string): UriComponents {
    // memfs:///path/to/virtual/file
    const path = value.slice(this.scheme.length + 1);
    
    return {
      scheme: this.scheme,
      authority: '',
      path: path.startsWith('///') ? path.slice(2) : path,
      query: '',
      fragment: ''
    };
  }
} 