/* eslint-disable @typescript-eslint/no-explicit-any */
export class Uri {
  public readonly scheme: string;
  public readonly authority: string;
  public readonly path: string;
  public readonly query: string;
  public readonly fragment: string;

  constructor(
    scheme: string,
    authority: string,
    path: string,
    query: string,
    fragment: string
  ) {
    this.scheme = scheme;
    this.authority = authority;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
  }

  static parse(value: string): Uri {
    // 解析 URI 字符串并返回 Uri 实例
    const match =
      /^([a-z][a-z0-9+.-]*):\/\/([^/?#]*)?([^?#]*)(\?[^#]*)?(#.*)?$/i.exec(
        value
      );
    if (!match) {
      throw new Error(`Invalid URI: ${value}`);
    }
    const [, scheme, authority, path, query, fragment] = match;
    return new Uri(
      scheme,
      authority || "",
      path || "",
      query || "",
      fragment || ""
    );
  }

  static file(path: string): Uri {
    // 根据文件系统路径创建 Uri 实例，并将 scheme 设置为 'file'
    // 实现略
    return new Uri("file", "", path, "", "");
  }

  with(change: {
    scheme?: string;
    authority?: string;
    path?: string;
    query?: string;
    fragment?: string;
  }): Uri {
    // 根据 change 对象创建一个新的 Uri 实例，并返回
    const newScheme = change.scheme !== undefined ? change.scheme : this.scheme;
    const newAuthority =
      change.authority !== undefined ? change.authority : this.authority;
    const newPath = change.path !== undefined ? change.path : this.path;
    const newQuery = change.query !== undefined ? change.query : this.query;
    const newFragment =
      change.fragment !== undefined ? change.fragment : this.fragment;
    return new Uri(newScheme, newAuthority, newPath, newQuery, newFragment);
  }

  toString(): string {
    // 返回 Uri 的字符串表示形式
    let uriString = `${this.scheme}://`;
    if (this.authority) {
      uriString += this.authority;
    }
    uriString += this.path;
    if (this.query) {
      uriString += `?${this.query}`;
    }
    if (this.fragment) {
      uriString += `#${this.fragment}`;
    }
    return uriString;
  }

  toJSON(): any {
    // 返回 Uri 的 JSON 表示形式
    return {
      $mid: 1,
      fsPath: this.fsPath,
      external: this.scheme === "file" ? this.fsPath : undefined,
      path: this.path,
      scheme: this.scheme,
      authority: this.authority,
      query: this.query,
      fragment: this.fragment,
    };
  }

  get fsPath(): string {
    // 返回对应文件系统路径的字符串表示形式
    return this.getFileSystemPath();
  }
  private getFileSystemPath(): string {
    // 返回对应文件系统路径的字符串表示形式
    if (this.scheme === "file") {
      return this.path;
    }
    throw new Error("Cannot convert non-file URI to a file system path.");
  }
}

export interface UriComponents {
  scheme: string;
  authority?: string;
  path?: string;
  query?: string;
  fragment?: string;
}
