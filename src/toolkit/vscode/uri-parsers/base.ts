import {
  IUriParser,
  UriComponents,
  UriParserConfig,
} from "@/toolkit/vscode/uri";

export abstract class BaseUriParser implements IUriParser {
  abstract readonly scheme: string;

  parse(value: string): UriComponents {
    if (!this.isValid(value)) {
      throw new Error(`Invalid URI format for scheme: ${this.scheme}`);
    }
    return this.parseUri(value);
  }

  isValid(value: string): boolean {
    return value.startsWith(`${this.scheme}:`);
  }

  getConfig(): UriParserConfig {
    return {};
  }

  protected getDefaultComponents(): UriComponents {
    return {
      scheme: this.scheme,
      authority: '',
      path: '',
      query: '',
      fragment: ''
    };
  }

  protected parseUri(value: string): UriComponents {
    return {
      ...this.getDefaultComponents(),
      // 子类可以覆盖这个方法来提供具体实现
    };
  }
}
