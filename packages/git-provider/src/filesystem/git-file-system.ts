import { FileItem, FileStats, FileSystem, FileSystemOptions } from '../types/fs';
import { GitProvider } from '../types/git-client';

/**
 * Git文件系统
 */
export class GitFileSystem implements FileSystem {

  constructor(private provider: GitProvider, public readonly options: FileSystemOptions) {}

  /**
   * 创建目录
   */
  async mkdir(path: string, options?: FileSystemOptions): Promise<void> {
    const keepFile = path.endsWith('/') ? `${path}.keep` : `${path}/.keep`;
    await this.writeFile(keepFile, '', options);
  }

  /**
   * 删除目录
   */
  async rmdir(path: string, options?: FileSystemOptions): Promise<void> {
    const files = await this.readdir(path, options);
    for (const file of files) {
      const fullPath = path.endsWith('/') ? `${path}${file.name}` : `${path}/${file.name}`;
      if (file.type === 'dir') {
        await this.rmdir(fullPath, options);
      } else {
        await this.unlink(fullPath, options);
      }
    }
  }

  /**
   * 重命名文件或目录
   */
  async rename(oldPath: string, newPath: string, options?: FileSystemOptions): Promise<void> {
    const file = await this.provider.getFile({ ...this.options, ...options, path: oldPath });
    await this.provider.putFile({
      ...this.options,
      ...options,
      path: newPath,
      content: file.data.content,
      message: `Rename ${oldPath} to ${newPath}`
    });
    await this.provider.deleteFile({
      ...this.options,
      ...options,
      path: oldPath,
      sha: file.data.sha,
      message: `Delete ${oldPath} after rename`
    });
  }

  /**
   * 读取目录内容
   */
  async readdir(path: string, options?: FileSystemOptions): Promise<FileItem[]> {
    const response = await this.provider.getFileInfo({ ...this.options, ...options, path });
    return response.data;
  }

  /**
   * 写入文件
   */
  async writeFile(path: string, data: string | Uint8Array, options?: Partial<FileSystemOptions>): Promise<void> {
    await this.provider.putFile({
      ...this.options,
      ...options,
      path,
      content: data,
      message: options?.message || `Update ${path}`
    });
  }

  /**
   * 删除文件
   */
  async unlink(path: string, options?: FileSystemOptions): Promise<void> {
    const file = await this.provider.getFile({ ...this.options, ...options, path });
    await this.provider.deleteFile({
      ...this.options,
      ...options,
      path,
      sha: file.data.sha,
      message: options?.message || `Delete ${path}`
    });
  }

  /**
   * 读取文件内容
   */
  async readFile(path: string, options?: Partial<FileSystemOptions> & { encoding?: string }): Promise<string | Uint8Array> {
    const response = await this.provider.getFile({ ...this.options, ...options, path });
    return options?.encoding ? response.data.content : response.data.uint8array;
  }

  /**
   * 获取文件/目录信息
   */
  async stat(path: string, options?: FileSystemOptions): Promise<FileStats> {
    const response = await this.provider.getFileInfo({ ...this.options, ...options, path });
    const item = response.data[0];
    
    return {
      isDirectory: () => item.type === 'dir',
      isFile: () => item.type === 'file',
      size: item.size || 0,
      mtime: new Date(),
      ctime: new Date()
    };
  }

  /**
   * 检查文件/目录是否存在
   */
  async exists(path: string, options?: FileSystemOptions): Promise<boolean> {
    try {
      await this.stat(path, options);
      return true;
    } catch (error) {
      return false;
    }
  }
} 