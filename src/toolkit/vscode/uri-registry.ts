import { IUriParser, UriComponents } from "@/toolkit/vscode/uri";
import { FileUriParser } from "@/toolkit/vscode/uri-parsers/file";
import { HttpUriParser, HttpsUriParser } from "./uri-parsers/http";
import { CommandUriParser } from "./uri-parsers/command";
import { DatabaseUriParser } from "./uri-parsers/database";
import { GitUriParser } from "./uri-parsers/git";
import { MemFsUriParser } from "./uri-parsers/memfs";
import { SpaceUriParser } from "@/toolkit/vscode/uri-parsers/space";

export class UriRegistry {
  private static instance: UriRegistry;
  private parsers = new Map<string, IUriParser>();

  private constructor() {
    // 注册所有默认解析器
    this.register(new FileUriParser());
    this.register(new HttpUriParser());
    this.register(new HttpsUriParser());
    this.register(new CommandUriParser());
    this.register(new DatabaseUriParser());
    this.register(new GitUriParser());
    this.register(new MemFsUriParser());
    this.register(new SpaceUriParser());
  }

  static getInstance(): UriRegistry {
    if (!UriRegistry.instance) {
      UriRegistry.instance = new UriRegistry();
    }
    return UriRegistry.instance;
  }

  register(parser: IUriParser): void {
    this.parsers.set(parser.scheme, parser);
  }

  parse(value: string): UriComponents {
    const scheme = this.extractScheme(value);
    const parser = this.parsers.get(scheme);
    
    if (!parser) {
      throw new Error(`No parser registered for scheme: ${scheme}`);
    }

    return parser.parse(value);
  }

  private extractScheme(value: string): string {
    const match = value.match(/^([a-zA-Z][a-zA-Z0-9+.-]*?):/);
    if (!match) {
      throw new Error(`Invalid URI: ${value}`);
    }
    return match[1];
  }
} 