import { Disposable } from "@/toolkit/vscode/disposable";
import { Event } from "@/toolkit/vscode/event";
import { EventEmitter } from "@/toolkit/vscode/event-emitter";
import {
  FileChangeEvent,
  FileStat,
  FileSystemProvider,
  FileType,
} from "@/toolkit/vscode/file-system";
import { Uri } from "@/toolkit/vscode/uri";

interface FileSystemProviderEntry {
  id: string;
  scheme: string;
  authority?: string;
  provider: FileSystemProvider;
  disposable: Disposable;
}

export class FileSystemService {
  private providers: FileSystemProviderEntry[] = [];
  private onDidChangeFileEmitter = new EventEmitter<FileChangeEvent[]>();

  get onDidChangeFile(): Event<FileChangeEvent[]> {
    return this.onDidChangeFileEmitter.event;
  }

  registerProvider(registerOptions: {
    id: string;
    scheme: string;
    provider: FileSystemProvider;
    authority?: string;
    options: {
      overwrite?: boolean;
    };
  }): Disposable {
    const { id, scheme, provider, authority, options } = registerOptions;
    const disposable = new Disposable(() => {
      this.unregisterProvider(id);
    });
    const entry: FileSystemProviderEntry = {
      id,
      scheme,
      authority,
      provider,
      disposable,
    };

    if (this.providers.some((entry) => entry.id === id)) {
      if (options.overwrite) {
        this.unregisterProvider(id);
        this.providers.push(entry);
      } else {
        throw new Error(`Provider '${id}' already registered.`);
      }
    } else {
      this.providers.push(entry);
    }

    return disposable;
  }

  private unregisterProvider(id: string): void {
    const index = this.providers.findIndex((entry) => entry.id === id);
    if (index !== -1) {
      const entry = this.providers.splice(index, 1)[0];
      entry.disposable.dispose();
    }
  }

  private getProvider(uri: Uri): FileSystemProvider | undefined {
    const entry = this.providers.find((entry) => {
      if (entry.scheme && entry.scheme !== uri.scheme) {
        return false;
      }
      // example: space-vfs://spaceId/path
      // example: space-vfs://spaceId/path/to/file.md
      // github-vfs://
      if (entry.authority && entry.authority !== uri.authority) {
        return false;
      }
      return true;
    });
    return entry?.provider;
  }

  watch(
    uri: Uri,
    options: { recursive: boolean; excludes: string[] }
  ): Disposable {
    const provider = this.getProvider(uri);
    if (provider) {
      if (!provider.watch) {
        throw new Error(
          `Provider for scheme '${uri.scheme}' does not support watching.`
        );
      }
      return provider.watch(uri, options);
    }
    throw new Error(`No provider registered for scheme '${uri.scheme}'`);
  }

  async stat(uri: Uri): Promise<FileStat> {
    const provider = this.getProvider(uri);
    if (provider) {
      const result = await provider.stat(uri);
      return Promise.resolve(result);
    }
    throw new Error(`No provider registered for scheme '${uri.scheme}'`);
  }

  async readDirectory(uri: Uri): Promise<[string, FileType][]> {
    const provider = this.getProvider(uri);
    if (provider) {
      const result = await provider.readDirectory(uri);
      return Array.isArray(result) ? result : Promise.resolve(result);
    }
    throw new Error(`No provider registered for scheme '${uri.scheme}'`);
  }

  async createDirectory(uri: Uri): Promise<void> {
    const provider = this.getProvider(uri);
    if (provider) {
      await provider.createDirectory(uri);
    } else {
      throw new Error(`No provider registered for scheme '${uri.scheme}'`);
    }
  }

  async readFile(uri: Uri): Promise<Uint8Array> {
    const provider = this.getProvider(uri);
    if (provider) {
      const result = await provider.readFile(uri);
      return result instanceof Uint8Array ? result : Promise.resolve(result);
    }
    throw new Error(`No provider registered for scheme '${uri.scheme}'`);
  }

  async writeFile(
    uri: Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): Promise<void> {
    const provider = this.getProvider(uri);
    if (provider) {
      await provider.writeFile(uri, content, options);
    } else {
      throw new Error(`No provider registered for scheme '${uri.scheme}'`);
    }
  }

  async delete(uri: Uri, options?: { recursive: boolean }): Promise<void> {
    const provider = this.getProvider(uri);
    if (provider) {
      await provider.delete(uri, options);
    } else {
      throw new Error(`No provider registered for scheme '${uri.scheme}'`);
    }
  }

  async rename(
    oldUri: Uri,
    newUri: Uri,
    options: { overwrite: boolean }
  ): Promise<void> {
    const provider = this.getProvider(oldUri);
    if (provider) {
      await provider.rename(oldUri, newUri, options);
    } else {
      throw new Error(`No provider registered for scheme '${oldUri.scheme}'`);
    }
  }
}
