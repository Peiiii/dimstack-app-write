// 3.0 的 vscode-uri 没有导出这个
export interface UriComponents {
  scheme: string;
  authority?: string;
  path?: string;
  query?: string;
  fragment?: string;
}

/**
 * Interface representing the shape of a URI object.
 */
export interface IUri {
  readonly scheme: string;
  readonly authority: string;
  readonly path: string;
  readonly query: string;
  readonly fragment: string;
  readonly fsPath: string;

  /**
   * Derives a new Uri from this Uri.
   * @param change An object describing changes to this Uri.
   * @returns A new Uri reflecting the given change, or this Uri if unchanged.
   */
  with(change: {
    scheme?: string;
    authority?: string;
    path?: string;
    query?: string;
    fragment?: string;
  }): IUri;

  /**
   * Returns a string representation of this Uri.
   * @param skipEncoding Whether to skip encoding, default is `false`.
   * @returns String representation of this Uri.
   */
  toString(skipEncoding?: boolean): string;

  /**
   * Returns a JSON representation of this Uri.
   * @returns An object.
   */
  toJSON(): UriComponents;
}

/**
 * Type alias to represent the static side of the Uri class.
 */
export type IUriStatic = {
  /**
   * Creates an URI from a string.
   * @param value The string value of an Uri.
   * @param strict Whether to throw an error if no scheme is parsed.
   * @returns A new Uri instance.
   */
  parse(value: string, strict?: boolean): Uri;

  /**
   * Creates an URI from a file system path.
   * @param path A file system or UNC path.
   * @returns A new Uri instance.
   */
  file(path: string): IUri;

  /**
   * Joins the path of a base Uri with provided path segments.
   * @param base An Uri with a path.
   * @param pathSegments Path fragments to join.
   * @returns A new Uri with the joined path.
   */
  joinPath(base: IUri, ...pathSegments: string[]): IUri;
};

/**
 * Uri类实现
 */
class Uri implements IUri {
  readonly scheme: string;
  readonly authority: string;
  readonly path: string;
  readonly query: string;
  readonly fragment: string;

  constructor(components: Partial<UriComponents>) {
    this.scheme = components.scheme || "";
    this.authority = components.authority || "";
    this.path = components.path || "";
    this.query = components.query || "";
    this.fragment = components.fragment || "";
  }

  get fsPath(): string {
    if (!this.scheme) {
      throw new Error("Cannot derive fsPath for non-file scheme");
    }
    return this.path.replace(/\//g, "\\"); // 简化的路径转换，实际可能需要更复杂的处理
  }

  with(change: {
    scheme?: string;
    authority?: string;
    path?: string;
    query?: string;
    fragment?: string;
  }): IUri {
    if (!change) {
      return this;
    }

    return new Uri({
      scheme: change.scheme || this.scheme,
      authority: change.authority || this.authority,
      path: change.path || this.path,
      query: change.query || this.query,
      fragment: change.fragment || this.fragment,
    });
  }

  toString(skipEncoding?: boolean): string {
    let result = `${this.scheme}:`;
    if (this.authority) {
      result += `//${this.authority}`;
    }
    result += this.path;

    if (this.query && !skipEncoding) {
      result += `?${this._encodeQuery(this.query)}`;
    } else if (this.query) {
      result += `?${this.query}`;
    }

    if (this.fragment && !skipEncoding) {
      result += `#${this._encodeFragment(this.fragment)}`;
    } else if (this.fragment) {
      result += `#${this.fragment}`;
    }

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON(): UriComponents {
    return {
      scheme: this.scheme,
      authority: this.authority,
      path: this.path,
      query: this.query,
      fragment: this.fragment,
    };
  }

  private _encodeQuery(query: string): string {
    return encodeURIComponent(query).replace(/%20/g, "+");
  }

  private _encodeFragment(fragment: string): string {
    return encodeURIComponent(fragment).replace(/%20/g, "+");
  }

  static parse(value: string): Uri {
    return UriStatic.parse(value);
  }

  static file(path: string): IUri {
    return UriStatic.file(path);
  }

  static joinPath(base: IUri, ...pathSegments: string[]): IUri {
    return UriStatic.joinPath(base, ...pathSegments);
  }
}

/**
 * Uri类的静态部分实现
 */
const UriStatic: IUriStatic = {
  parse(value: string): Uri {
    const [scheme, rest] = value.split(":", 2);
    const fakeHttpUrl = `http:${rest}`;
    const url = new URL(fakeHttpUrl);
    const authority = url.host;
    const path = url.pathname;
    const query = url.search.slice(1);
    const fragment = url.hash.slice(1);
    return new Uri({
      scheme,
      authority,
      path: path.replace(/^\/+/, ""),
      query,
      fragment,
    });
  },

  file(path: string): IUri {
    return new Uri({ scheme: "file", path });
  },

  joinPath(base: IUri, ...pathSegments: string[]): IUri {
    let joinedPath = base.path;
    for (const segment of pathSegments) {
      if (segment.startsWith("/")) {
        joinedPath = segment;
      } else if (
        joinedPath.endsWith("/") ||
        segment.startsWith("?") ||
        segment.startsWith("#")
      ) {
        joinedPath += segment;
      } else {
        joinedPath += "/" + segment;
      }
    }
    return base.with({ path: joinedPath });
  },
};

export { Uri };
