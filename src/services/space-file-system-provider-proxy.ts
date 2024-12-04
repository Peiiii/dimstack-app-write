import { MaybeThenable } from "@/toolkit/types";
import { Disposable } from "@/toolkit/vscode/disposable";
import { Event } from "@/toolkit/vscode/event";
import { EventEmitter } from "@/toolkit/vscode/event-emitter";
import {
    FileChangeType,
    FileStat,
    FileSystemProvider,
    FileType,
} from "@/toolkit/vscode/file-system";
import { Uri } from "@/toolkit/vscode/uri";

export class SpaceFileSystemProviderProxy implements FileSystemProvider {
  private readonly _onDidChangeFile = new EventEmitter<
    {
      type: FileChangeType;
      uri: Uri;
    }[]
  >();

  readonly onDidChangeFile: Event<{ type: FileChangeType; uri: Uri }[]> =
    this._onDidChangeFile.event;

  constructor(
    private readonly provider: FileSystemProvider,
    private readonly spaceId: string
  ) {}

  // 文件监听
  watch(
    uri: Uri,
    options: { recursive: boolean; excludes: string[] }
  ): Disposable {
    if (uri.authority !== this.spaceId) {
      return new Disposable(() => {});
    }
    return this.provider.watch?.(uri, options) || new Disposable(() => {});
  }

  // 状态查询
  stat(uri: Uri): MaybeThenable<FileStat> {
    if (uri.authority !== this.spaceId) {
      throw new Error(`Invalid space ID: ${uri.authority}`);
    }
    return this.provider.stat(uri);
  }

  // 目录读取
  readDirectory(uri: Uri): MaybeThenable<[string, FileType][]> {
    if (uri.authority !== this.spaceId) {
      throw new Error(`Invalid space ID: ${uri.authority}`);
    }
    return this.provider.readDirectory(uri);
  }

  // 文件创建
  createDirectory(uri: Uri): MaybeThenable<void> {
    if (uri.authority !== this.spaceId) {
      throw new Error(`Invalid space ID: ${uri.authority}`);
    }
    return this.provider.createDirectory(uri);
  }

  // 文件读取
  readFile(uri: Uri): MaybeThenable<Uint8Array> {
    if (uri.authority !== this.spaceId) {
      throw new Error(`Invalid space ID: ${uri.authority}`);
    }
    return this.provider.readFile(uri);
  }

  // 文件写入
  writeFile(
    uri: Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): MaybeThenable<void> {
    if (uri.authority !== this.spaceId) {
      throw new Error(`Invalid space ID: ${uri.authority}`);
    }
    return this.provider.writeFile(uri, content, options);
  }

  // 文件删除
  delete(uri: Uri, options: { recursive: boolean }): MaybeThenable<void> {
    if (uri.authority !== this.spaceId) {
      throw new Error(`Invalid space ID: ${uri.authority}`);
    }
    return this.provider.delete(uri, options);
  }

  // 文件重命名
  rename(
    oldUri: Uri,
    newUri: Uri,
    options: { overwrite: boolean }
  ): MaybeThenable<void> {
    if (
      oldUri.authority !== this.spaceId ||
      newUri.authority !== this.spaceId
    ) {
      throw new Error(
        `Invalid space ID: ${oldUri.authority} or ${newUri.authority}`
      );
    }
    return this.provider.rename(oldUri, newUri, options);
  }

  // 文件复制 (可选实现)
  copy?(
    source: Uri,
    destination: Uri,
    options: { overwrite: boolean }
  ): MaybeThenable<void> {
    if (
      source.authority !== this.spaceId ||
      destination.authority !== this.spaceId
    ) {
      throw new Error(
        `Invalid space ID: ${source.authority} or ${destination.authority}`
      );
    }
    return this.provider.copy?.(source, destination, options);
  }

  // 事件转发处理
  private handleFileChange(changes: { type: FileChangeType; uri: Uri }[]) {
    this._onDidChangeFile.fire(
      changes.filter((change) => change.uri.authority === this.spaceId)
    );
  }

  // 资源释放
  dispose(): void {
    this._onDidChangeFile.dispose();
    if ("dispose" in this.provider) {
      (this.provider as unknown as { dispose: () => void }).dispose();
    }
  }
}
