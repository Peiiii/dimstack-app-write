import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

/**
 * Git URI Examples:
 * 
 * 1. 基础仓库引用
 * git://github.com/owner/repo
 * git://gitlab.com/group/project
 * 
 * 2. 带分支
 * git://github.com/owner/repo#main
 * git://gitlab.com/group/project#develop
 * 
 * 3. 带提交哈希
 * git://github.com/owner/repo#a1b2c3d
 * git://gitlab.com/group/project#feat/new-feature
 * 
 * 4. 带文件路径
 * git://github.com/owner/repo/path/to/file.txt
 * git://gitlab.com/group/project/src/main.ts#develop
 * 
 * 5. 带标签
 * git://github.com/owner/repo#v1.0.0
 * git://gitlab.com/group/project#release/2.0
 * 
 * 6. 私有仓库
 * git://git@github.com/owner/private-repo
 * git://git@gitlab.company.com/internal/project
 * 
 * 7. 完整示例
 * git://git@github.com/owner/repo/src/feature/file.ts#feat/new-feature
 */

export class GitUriParser extends BaseUriParser {
  readonly scheme = "git";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: true,
      supportsQuery: false,
      supportsFragment: true, // 用于指定提交或分支
    };
  }

  protected parseUri(value: string): UriComponents {
    // git://hostname/owner/repo#ref
    const [mainPart, ref] = value.slice(this.scheme.length + 3).split('#');
    const [authority, ...pathParts] = mainPart.split('/');

    return {
      scheme: this.scheme,
      authority,
      path: '/' + pathParts.join('/'),
      fragment: ref || '',
      query: ''
    };
  }
} 