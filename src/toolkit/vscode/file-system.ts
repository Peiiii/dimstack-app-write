import { Uri } from "@/toolkit/vscode/uri";
import { Event } from "@/toolkit/vscode/event";
import { Disposable } from "@/toolkit/vscode/disposable";


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

/**
 * The event filesystem providers must use to signal a file change.
 */
export interface FileChangeEvent {
  /**
   * The type of change.
   */
  readonly type: FileChangeType;

  /**
   * The uri of the file that has changed.
   */
  readonly uri: Uri;
}

/**
 * Enumeration of file types. The types `File` and `Directory` can also be
 * a symbolic links, in that use `FileType.File | FileType.SymbolicLink` and
 * `FileType.Directory | FileType.SymbolicLink`.
 */
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

//#region FileSystemProvider stat readonly - https://github.com/microsoft/vscode/issues/73122

export enum FilePermission {
  /**
   * The file is readonly.
   *
   * *Note:* All `FileStat` from a `FileSystemProvider` that is registered  with
   * the option `isReadonly: true` will be implicitly handled as if `FilePermission.Readonly`
   * is set. As a consequence, it is not possible to have a readonly file system provider
   * registered where some `FileStat` are not readonly.
   */
  Readonly = 1,
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
  /**
   * The permissions of the file, e.g. whether the file is readonly.
   *
   * *Note:* This value might be a bitmask, e.g. `FilePermission.Readonly | FilePermission.Other`.
   */
  permissions?: FilePermission;
}

export interface FileSystem {
  stat(uri: Uri): Thenable<FileStat>;
  readDirectory(uri: Uri): Thenable<[string, FileType][]>;
  createDirectory(uri: Uri): Thenable<void>;
  readFile(uri: Uri): Thenable<Uint8Array>;
  writeFile(
    uri: Uri,
    content: Uint8Array,
    options?: { create: boolean; overwrite: boolean }
  ): Thenable<void>;
  delete(uri: Uri, options?: { recursive: boolean }): Thenable<void>;
  rename(
    source: Uri,
    target: Uri,
    options?: { overwrite: boolean }
  ): Thenable<void>;
  copy(
    source: Uri,
    target: Uri,
    options?: { overwrite: boolean }
  ): Thenable<void>;
  isWritableFileSystem(scheme: string): boolean | undefined;
}

export interface FileSystemProvider {
  /**
   * An event to signal that a resource has been created, changed, or deleted. This
   * event should fire for resources that are being [watched](#FileSystemProvider.watch)
   * by clients of this provider.
   */

  readonly onDidChangeFile: Event<FileChangeEvent[]>;

  /**
   * Subscribe to events in the file or folder denoted by `uri`.
   *
   * The editor will call this function for files and folders. In the latter case, the
   * options differ from defaults, e.g. what files/folders to exclude from watching
   * and if subfolders, sub-subfolder, etc. should be watched (`recursive`).
   *
   * @param uri The uri of the file to be watched.
   * @param options Configures the watch.
   * @returns A disposable that tells the provider to stop watching the `uri`.
   */
  watch?(
    uri: Uri,
    options: { recursive: boolean; excludes: string[] }
  ): Disposable;

  /**
   * Retrieve metadata about a file.
   *
   * Note that the metadata for symbolic links should be the metadata of the file they refer to.
   * Still, the [SymbolicLink](#FileType.SymbolicLink)-type must be used in addition to the actual type, e.g.
   * `FileType.SymbolicLink | FileType.Directory`.
   *
   * @param uri The uri of the file to retrieve metadata about.
   * @return The file metadata about the file.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `uri` doesn't exist.
   */
  stat(uri: Uri): FileStat | Thenable<FileStat>;

  /**
   * Retrieve all entries of a [directory](#FileType.Directory).
   *
   * @param uri The uri of the folder.
   * @return An array of name/type-tuples or a thenable that resolves to such.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `uri` doesn't exist.
   */
  readDirectory(
    uri: Uri
  ): [string, FileType][] | Thenable<[string, FileType][]>;

  /**
   * Create a new directory (Note, that new files are created via `write`-calls).
   *
   * @param uri The uri of the new folder.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when the parent of `uri` doesn't exist, e.g. no mkdirp-logic required.
   * @throws [`FileExists`](#FileSystemError.FileExists) when `uri` already exists.
   * @throws [`NoPermissions`](#FileSystemError.NoPermissions) when permissions aren't sufficient.
   */
  createDirectory(uri: Uri): void | Thenable<void>;

  /**
   * Read the entire contents of a file.
   *
   * @param uri The uri of the file.
   * @return An array of bytes or a thenable that resolves to such.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `uri` doesn't exist.
   */
  readFile(uri: Uri): Uint8Array | Thenable<Uint8Array>;

  /**
   * Write data to a file, replacing its entire contents.
   *
   * @param uri The uri of the file.
   * @param content The new content of the file.
   * @param options Defines if missing files sfhould or must be created.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `uri` doesn't exist and `create` is not set.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when the parent of `uri` doesn't exist and `create` is set, e.g. no mkdirp-logic required.
   * @throws [`FileExists`](#FileSystemError.FileExists) when `uri` already exists, `create` is set but `overwrite` is not set.
   * @throws [`NoPermissions`](#FileSystemError.NoPermissions) when permissions aren't sufficient.
   */
  writeFile(
    uri: Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Thenable<void>;

  /**
   * Delete a file.
   *
   * @param uri The resource that is to be deleted.
   * @param options Defines if deletion of folders is recursive.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `uri` doesn't exist.
   * @throws [`NoPermissions`](#FileSystemError.NoPermissions) when permissions aren't sufficient.
   */
  delete(uri: Uri, options: { recursive: boolean }): void | Thenable<void>;

  /**
   * Rename a file or folder.
   *
   * @param oldUri The existing file.
   * @param newUri The new location.
   * @param options Defines if existing files should be overwritten.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `oldUri` doesn't exist.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when parent of `newUri` doesn't exist, e.g. no mkdirp-logic required.
   * @throws [`FileExists`](#FileSystemError.FileExists) when `newUri` exists and when the `overwrite` option is not `true`.
   * @throws [`NoPermissions`](#FileSystemError.NoPermissions) when permissions aren't sufficient.
   */
  rename(
    oldUri: Uri,
    newUri: Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void>;

  /**
   * Copy files or folders. Implementing this function is optional but it will speedup
   * the copy operation.
   *
   * @param source The existing file.
   * @param destination The destination location.
   * @param options Defines if existing files should be overwritten.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when `source` doesn't exist.
   * @throws [`FileNotFound`](#FileSystemError.FileNotFound) when parent of `destination` doesn't exist, e.g. no mkdirp-logic required.
   * @throws [`FileExists`](#FileSystemError.FileExists) when `destination` exists and when the `overwrite` option is not `true`.
   * @throws [`NoPermissions`](#FileSystemError.NoPermissions) when permissions aren't sufficient.
   */
  copy?(
    source: Uri,
    destination: Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void>;
}
