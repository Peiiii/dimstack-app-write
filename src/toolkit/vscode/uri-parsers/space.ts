import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

/**
 * Space URI Examples:
 * 
 * 1. IndexedDB Space
 * space://{spaceId}/notes/todo.md
 * space://{spaceId}/documents/report.pdf
 * 
 * 2. Git Repository Space
 * space://{spaceId}/src/main.ts
 * space://{spaceId}/docs/README.md
 * 
 * 3. 带分支信息
 * space://{spaceId}/path/to/file.ts#main
 * space://{spaceId}/README.md#develop
 * 
 * 4. 带查询参数
 * space://{spaceId}/file.md?version=latest
 * 
 * 5. 完整示例
 * space://{spaceId}/project/src/file.ts?version=2#main
 */
export class SpaceUriParser extends BaseUriParser {
  readonly scheme = "space";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: true,
      supportsQuery: true,
      supportsFragment: true,
    };
  }

  protected parseUri(value: string): UriComponents {
    if (value.startsWith('space:///')) {
      throw new Error('Space URI requires spaceId');
    }

    const url = new URL(value);
    const path = decodeURIComponent(url.pathname);
    const [pathPart, fragment = ''] = path.split('#');

    return {
      scheme: this.scheme,
      authority: url.host,
      path: pathPart,
      query: url.search.slice(1),
      fragment: fragment || url.hash.slice(1)
    };
  }
} 