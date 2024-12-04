/**
 * HTTP/HTTPS URI Examples:
 * 
 * 1. 基础URL
 * http://example.com
 * https://example.com
 * 
 * 2. 带路径
 * http://example.com/path/to/resource
 * https://api.example.com/v1/users
 * 
 * 3. 带查询参数
 * http://example.com/search?q=test&page=1
 * https://api.example.com/users?role=admin&status=active
 * 
 * 4. 带认证信息
 * http://user:pass@example.com
 * https://token@api.example.com
 * 
 * 5. 带端口
 * http://localhost:8080/api
 * https://example.com:443/secure
 * 
 * 6. 带片段
 * http://example.com/page#section1
 * https://docs.example.com/guide#installation
 * 
 * 7. 完整示例
 * https://user:pass@api.example.com:8443/v1/resources?query=test&page=1#section
 */

import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

export class HttpUriParser extends BaseUriParser {
  readonly scheme: "http" | "https" = "http";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: true,
      supportsQuery: true,
      supportsFragment: true,
    };
  }

  protected parseUri(value: string): UriComponents {
    const url = new URL(value);
    return {
      scheme: this.scheme,
      authority: url.username 
        ? `${url.username}${url.password ? ':' + url.password : ''}@${url.host}`
        : url.host,
      path: url.pathname || '/',
      query: url.search.slice(1),
      fragment: url.hash.slice(1)
    };
  }
}

// HTTPS 解析器可以继承 HTTP 解析器
export class HttpsUriParser extends HttpUriParser {
  readonly scheme = "https";
} 