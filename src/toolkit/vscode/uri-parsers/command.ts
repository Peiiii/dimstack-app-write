/**
 * Command URI Examples:
 * 
 * 1. 基础命令
 * command:workbench.action.files.newFile
 * command:workbench.action.openSettings
 * 
 * 2. 带命名空间的命令
 * command:extension.gitSync
 * command:markdown.showPreview
 * 
 * 3. 带简单参数
 * command:git.checkout?branch=main
 * command:workbench.action.tasks.runTask?task=build
 * 
 * 4. 带复杂参数（JSON编码）
 * command:extension.updateConfig?{"setting":"value"}
 * command:git.commit?{"message":"fix: bug","amend":true}
 * 
 * 5. 带多个参数
 * command:search.action.openEditor?query=test&replace=fixed
 * 
 * 6. 系统命令
 * command:vscode.open
 * command:workbench.action.terminal.new
 * 
 * 7. 自定义扩展命令
 * command:myextension.feature?param=value
 * command:customtool.process?input=file.txt&output=result.txt
 */

import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

export class CommandUriParser extends BaseUriParser {
  readonly scheme = "command";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: false,
      supportsQuery: true,
      supportsFragment: false,
    };
  }

  protected parseUri(value: string): UriComponents {
    const [commandPath, argsStr] = value.slice(this.scheme.length + 1).split('?');
    
    return {
      scheme: this.scheme,
      authority: '',
      path: commandPath,
      query: argsStr || '',
      fragment: ''
    };
  }
} 