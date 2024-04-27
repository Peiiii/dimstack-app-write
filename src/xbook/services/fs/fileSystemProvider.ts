import { Uri } from "./Uri";
import { Disposable } from "@/toolkit/vscode/Disposable";
import { Event } from "@/toolkit/vscode/EventEmitter";

export interface FileChangeEvent {
  /**
   * The type of change.
   */
  type: FileChangeType;

  /**
   * The uri of the file that has changed.
   */
  uri: Uri;
}

/**
 * Enumeration of file change types.
 */
export enum FileChangeType {
  /**
   * The contents or metadata of a file have changed.
   */
  Changed = 1,

  /**
   * A file has been created.
   */
  Created = 2,

  /**
   * A file has been deleted.
   */
  Deleted = 3,
}

export enum FileType {
  /**
   * The file type is unknown.
   */
  Unknown = 0,
  /**
   * A regular file.
   */
  File = 1,
  /**
   * A directory.
   */
  Directory = 2,
  /**
   * A symbolic link to a file.
   */
  SymbolicLink = 64,
}
/**
 * The `FileStat`-type represents metadata about a file
 */
export interface FileStat {
  /**
   * The type of the file, e.g. is a regular file, a directory, or symbolic link
   * to a file.
   */
  type: FileType;
  /**
   * The creation timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   */
  ctime: number;
  /**
   * The modification timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   */
  mtime: number;
  /**
   * The size in bytes.
   */
  size: number;
}

export interface FileSystemProvider {
  readonly onDidChangeFile: Event<FileChangeEvent[]>;
  watch(
    uri: Uri,
    options: { recursive: boolean; excludes: string[] }
  ): Disposable;
  stat(uri: Uri): FileStat | Promise<FileStat>;
  readDirectory(uri: Uri): [string, FileType][] | Promise<[string, FileType][]>;
  createDirectory(uri: Uri): void | Promise<void>;
  readFile(uri: Uri): Uint8Array | Promise<Uint8Array>;
  writeFile(
    uri: Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Promise<void>;
  delete(uri: Uri, options: { recursive: boolean }): void | Promise<void>;
  rename(
    oldUri: Uri,
    newUri: Uri,
    options: { overwrite: boolean }
  ): void | Promise<void>;
  copy?(
    source: Uri,
    destination: Uri,
    options: { overwrite: boolean }
  ): void | Promise<void>;
}
