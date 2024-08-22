import { joinPath } from "@/toolkit/utils/path";
import { acquireIndexedDBZenfs } from "@/toolkit/utils/unstable/zenfs-utils";
import { Event } from "@/toolkit/vscode/event";
import { EventEmitter } from "@/toolkit/vscode/event-emitter";
import {
  FileChangeEvent,
  FileStat,
  FileSystemProvider,
  FileType,
} from "@/toolkit/vscode/file-system";
import { Uri } from "@/toolkit/vscode/uri";

let _fs;
const acquireFs = async () => {
  if (!_fs) {
    _fs = (await acquireIndexedDBZenfs()).promises;
  }
  return _fs;
};

export class IndexedDBFileSystemProvider implements FileSystemProvider {
  private onDidChangeFileEmitter: EventEmitter<FileChangeEvent[]> =
    new EventEmitter<FileChangeEvent[]>();

  readonly onDidChangeFile: Event<FileChangeEvent[]> =
    this.onDidChangeFileEmitter.event;

  async stat(uri: Uri): Promise<FileStat> {
    const fs = await acquireFs();
    const stat = await fs.stat(encodeURI(uri.path));
    return {
      ...stat,
      type: stat.isDirectory() ? FileType.Directory : FileType.File,
      ctime: stat.ctime.getTime(),
      mtime: stat.mtime.getTime(),
    };
  }

  async readDirectory(uri: Uri): Promise<[string, FileType][]> {
    const fs = await acquireFs();
    const entries = await fs.readdir(encodeURI(uri.path));
    return await Promise.all(
      entries
        .map(decodeURI)
        .map(async (name) => [
          name,
          await fs
            .stat(encodeURI(joinPath(uri.path, name)))
            .then((stat) =>
              stat.isDirectory() ? FileType.Directory : FileType.File
            ),
        ])
    );
  }

  async createDirectory(uri: Uri): Promise<void> {
    const fs = await acquireFs();
    await fs.mkdir(encodeURI(uri.path));
  }

  async readFile(uri: Uri): Promise<Uint8Array> {
    const fs = await acquireFs();
    return fs.readFile(encodeURI(uri.path));
  }

  async writeFile(uri: Uri, content: Uint8Array): Promise<void> {
    const fs = await acquireFs();
    await fs.writeFile(encodeURI(uri.path), content);
  }

  async delete(uri: Uri): Promise<void> {
    const fs = await acquireFs();
    await fs.unlink(encodeURI(uri.path));
  }

  async rename(oldUri: Uri, newUri: Uri, options: { overwrite: boolean }) {
    const fs = await acquireFs();
    // check if newUri exists
    if (!options.overwrite) {
      try {
        await fs.stat(encodeURI(newUri.path));
        throw new Error("EEXIST");
      } catch (e: any) {
        if (e.message !== "ENOENT") {
          throw e;
        }
      }
    }
    await fs.rename(encodeURI(oldUri.path), encodeURI(newUri.path));
  }

  async copy(source: Uri, destination: Uri, options: { overwrite: boolean }) {
    const fs = await acquireFs();
    // check if destination exists
    if (!options.overwrite) {
      try {
        await fs.stat(encodeURI(destination.path));
        throw new Error("EEXIST");
      } catch (e: any) {
        if (e.message !== "ENOENT") {
          throw e;
        }
      }
    }
    await fs.copyFile(encodeURI(source.path), encodeURI(destination.path));
  }
}
