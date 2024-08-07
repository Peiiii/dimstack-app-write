import { Event } from "@/toolkit/vscode/event";
import { EventEmitter } from "@/toolkit/vscode/event-emitter";
import {
  FileChangeEvent,
  FileStat,
  FileSystemProvider,
  FileType,
} from "@/toolkit/vscode/file-system";
import { Uri } from "@/toolkit/vscode/uri";
import { GiteeClient } from "libs/gitee-api";

export class GitRepoFileSystemProvider implements FileSystemProvider {
  private onDidChangeFileEmitter: EventEmitter<FileChangeEvent[]> =
    new EventEmitter<FileChangeEvent[]>();
  readonly onDidChangeFile: Event<FileChangeEvent[]> =
    this.onDidChangeFileEmitter.event;

  constructor(
    private gitClient: GiteeClient,
    private owner: string,
    private repo: string
  ) {
    // Initialize with your GiteeClient instance
  }

  // watch(
  //   uri: Uri,
  //   options: { recursive: boolean; excludes: string[] }
  // ): Disposable {
  //   // Implement watch logic if necessary
  //   return new Disposable(() => {
  //     // Clean up the watch logic
  //   });
  // }

  async stat(uri: Uri): Promise<FileStat> {
    // Implement the logic to get file/directory metadata from Gitee using your GiteeClient
    // You can use the provided uri to determine which file or directory to retrieve metadata for
    // You can also use the GiteeClient to fetch the required information
    // For example, you can use `this.giteeClient.File.get()` to get file metadata
    // and `this.giteeClient.File.getInfo()` to get directory metadata.
    // Construct a FileStat object based on the fetched information and return it.

    const path = uri.path; // Extract the path from the Uri
    const fileResponse = await this.gitClient.File.get({
      owner: this.owner,
      repo: this.repo,
      path,
    });
    return {
      type:
        fileResponse.data.type === "file" ? FileType.File : FileType.Directory,
      ctime: 0, // Set the correct creation timestamp if available
      mtime: 0, // Set the correct modification timestamp if available
      size: fileResponse.data.size || 0,
    };
  }

  async readDirectory(uri: Uri): Promise<[string, FileType][]> {
    // Implement the logic to read the contents of a directory from Gitee using your GiteeClient
    // You can use the provided uri to determine which directory to read.
    // Use the GiteeClient to fetch the directory contents and return them as an array of [string, FileType] pairs.

    const path = uri.path.endsWith("/") ? uri.path : uri.path + "/"; // Extract the path from the Uri
    const directoryInfo = (
      await this.gitClient.File.getInfo({
        owner: this.owner,
        repo: this.repo,
        path,
      })
    ).data;
    return directoryInfo.map((item) => [
      item.name,
      item.type === "file" ? FileType.File : FileType.Directory,
    ]);
  }

  async readFile(uri: Uri): Promise<Uint8Array> {
    // Implement the logic to read the content of a file from Gitee using your GiteeClient
    // You can use the provided uri to determine which file to read.
    // Use the GiteeClient to fetch the file content and return it as a Uint8Array.

    const path = uri.path; // Extract the path from the Uri
    const fileResponse = await this.gitClient.File.get({
      owner: this.owner,
      repo: this.repo,
      path,
    });
    if (fileResponse.data.type === "file" && fileResponse.data.content) {
      // Convert the content to a Uint8Array
      const content = new TextEncoder().encode(fileResponse.data.content);
      return content;
    } else {
      throw new Error("File not found");
    }
  }

  async createDirectory(uri: Uri): Promise<void> {
    const path = uri.path; // 提取 Uri 中的路径
    // 使用 GiteeClient 创建目录
    // 实现逻辑以创建目录并处理错误
    await this.gitClient.File.add({
      owner: this.owner,
      repo: this.repo,
      path: path + "/" + ".keep",
      content: "placeholder",
    });
  }

  private async exists(uri: Uri): Promise<boolean> {
    const path = uri.path; // 提取 Uri 中的路径
    // 使用 GiteeClient 检查文件或目录是否存在
    // 实现逻辑以检查文件或目录是否存在并处理错误

    try {
      const fileExists = (
        await this.gitClient.File.getInfo({
          owner: this.owner,
          repo: this.repo,
          path,
        })
      ).data;
      if (Array.isArray(fileExists) && fileExists.length === 0) {
        return false;
      }
    } catch (error: any) {
      if (error && error.status === 404) return false;
    }
    return true;
  }

  async writeFile(uri: Uri, content: Uint8Array): Promise<void> {
    const path = uri.path; // 提取 Uri 中的路径
    const contentString = new TextDecoder().decode(content);

    const exists = await this.exists(uri);
    if (!exists) {
      await this.gitClient.File.add({
        owner: this.owner,
        repo: this.repo,
        path,
        content: contentString,
      });
      return;
      
    }
    // 使用 GiteeClient 写入文件内容
    // 实现逻辑以将内容写入文件并处理错误

    await this.gitClient.File.update({
      owner: this.owner,
      repo: this.repo,
      path,
      content: contentString,
    });
  }

  async delete(uri: Uri, options: { recursive: boolean }): Promise<void> {
    const path = uri.path; // 提取 Uri 中的路径
    // 使用 GiteeClient 删除文件或目录
    // 实现逻辑以删除文件或目录并处理错误
    await this.gitClient.File.delete({
      owner: this.owner,
      repo: this.repo,
      path,
    });
  }

  async rename(
    oldUri: Uri,
    newUri: Uri,
    options: { overwrite: boolean }
  ): Promise<void> {
    const oldPath = oldUri.path; // 提取旧 Uri 中的路径
    const newPath = newUri.path; // 提取新 Uri 中的路径
    // 使用 GiteeClient 重命名文件或目录
    // 实现逻辑以重命名文件或目录并处理错误
    const content = (
      await this.gitClient.File.get({
        owner: this.owner,
        repo: this.repo,
        path: oldPath,
      })
    ).data.content;

    await this.gitClient.File.add({
      owner: this.owner,
      repo: this.repo,
      path: newPath,
      content: content,
    });

    await this.gitClient.File.delete({
      owner: this.owner,
      repo: this.repo,
      path: oldPath,
    });
  }
}
