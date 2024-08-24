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
  provider: FileSystemProvider;
  disposable: Disposable;
}

export class FileSystemService {
  private providers: FileSystemProviderEntry[] = [];
  private onDidChangeFileEmitter = new EventEmitter<FileChangeEvent[]>();

  get onDidChangeFile(): Event<FileChangeEvent[]> {
    return this.onDidChangeFileEmitter.event;
  }

  registerProvider(
    id: string,
    scheme: string,
    provider: FileSystemProvider,
    options: {
      overwrite?: boolean;
    } = {}
  ): Disposable {
    const disposable = new Disposable(() => {
      this.unregisterProvider(id);
    });
    const entry: FileSystemProviderEntry = {
      id,
      scheme,
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

  private getProvider(scheme: string): FileSystemProvider | undefined {
    const entry = this.providers.find((entry) => entry.scheme === scheme);
    return entry?.provider;
  }

  watch(
    uri: Uri,
    options: { recursive: boolean; excludes: string[] }
  ): Disposable {
    const provider = this.getProvider(uri.scheme);
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
    const provider = this.getProvider(uri.scheme);
    if (provider) {
      const result = await provider.stat(uri);
      return Promise.resolve(result);
    }
    throw new Error(`No provider registered for scheme '${uri.scheme}'`);
  }

  async readDirectory(uri: Uri): Promise<[string, FileType][]> {
    const provider = this.getProvider(uri.scheme);
    if (provider) {
      const result = await provider.readDirectory(uri);
      return Array.isArray(result) ? result : Promise.resolve(result);
    }
    throw new Error(`No provider registered for scheme '${uri.scheme}'`);
  }

  async createDirectory(uri: Uri): Promise<void> {
    const provider = this.getProvider(uri.scheme);
    if (provider) {
      await provider.createDirectory(uri);
    } else {
      throw new Error(`No provider registered for scheme '${uri.scheme}'`);
    }
  }

  async readFile(uri: Uri): Promise<Uint8Array> {
    const provider = this.getProvider(uri.scheme);
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
    const provider = this.getProvider(uri.scheme);
    if (provider) {
      await provider.writeFile(uri, content, options);
    } else {
      throw new Error(`No provider registered for scheme '${uri.scheme}'`);
    }
  }

  async delete(uri: Uri, options?: { recursive: boolean }): Promise<void> {
    const provider = this.getProvider(uri.scheme);
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
    const provider = this.getProvider(oldUri.scheme);
    if (provider) {
      await provider.rename(oldUri, newUri, options);
    } else {
      throw new Error(`No provider registered for scheme '${oldUri.scheme}'`);
    }
  }
}
