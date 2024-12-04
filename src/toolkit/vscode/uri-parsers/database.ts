import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

/**
 * Database URI Examples:
 * 
 * 1. MySQL
 * db://user:password@localhost:3306/mydatabase
 * db://root:pass@mysql.example.com/users
 * 
 * 2. PostgreSQL
 * db://user:pass@localhost:5432/mydb?schema=public
 * db://admin:secret@pg.example.com/app?ssl=true
 * 
 * 3. MongoDB
 * db://user:pass@localhost:27017/mydb
 * db://admin:pass@mongo.example.com/app?authSource=admin
 * 
 * 4. Redis
 * db://user:pass@redis.example.com:6379/0
 * db://default:pass@localhost:6379/1?timeout=5000
 * 
 * 5. 带连接选项
 * db://user:pass@host/dbname?ssl=true&timeout=5000
 * db://app:pass@host/db?pool=true&max=20
 * 
 * 6. 带认证数据库
 * db://admin:pass@host/db?authSource=admin
 * 
 * 7. 完整示例
 * db://admin:secretpass@db.example.com:5432/production?ssl=true&pool=true&timeout=5000
 */

export class DatabaseUriParser extends BaseUriParser {
  readonly scheme = "db";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: true,
      supportsQuery: true,
      supportsFragment: false,
    };
  }

  protected parseUri(value: string): UriComponents {
    const url = new URL(value);
    const authority = url.username 
      ? `${url.username}${url.password ? ':' + url.password : ''}@${url.host}`
      : url.host;

    return {
      scheme: this.scheme,
      authority,
      path: url.pathname,
      query: url.search.slice(1),
      fragment: ''
    };
  }
} 