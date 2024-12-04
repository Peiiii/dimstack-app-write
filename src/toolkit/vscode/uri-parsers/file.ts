import { UriComponents, UriParserConfig } from "@/toolkit/vscode/uri";
import { BaseUriParser } from "@/toolkit/vscode/uri-parsers/base";

export class FileUriParser extends BaseUriParser {
  readonly scheme = "file";

  getConfig(): UriParserConfig {
    return {
      requiresAuthority: false,
      supportsQuery: false,
      supportsFragment: false,
    };
  }

  protected parseUri(value: string): UriComponents {
    const path = value.slice(this.scheme.length + 1);
    
    if (path.startsWith('///')) {
      return {
        scheme: this.scheme,
        authority: '',
        path: path.slice(2),
        query: '',
        fragment: ''
      };
    }

    if (path.startsWith('//')) {
      const [authority, ...pathParts] = path.slice(2).split('/');
      return {
        scheme: this.scheme,
        authority,
        path: '/' + pathParts.join('/'),
        query: '',
        fragment: ''
      };
    }

    throw new Error('Invalid file URI format');
  }
}
