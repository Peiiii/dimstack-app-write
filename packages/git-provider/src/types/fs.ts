import { FileSystemOptions, FileItem } from "./git-client";

/**
 * 文件系统统计信息
 */
export interface FileStats {
  /**
   * 是否为目录
   */
  isDirectory(): boolean;

  /**
   * 是否为文件
   */
  isFile(): boolean;

  /**
   * 文件大小（字节）
   */
  size: number;

  /**
   * 最后修改时间
   */
  mtime: Date;

  /**
   * 创建时间
   */
  ctime: Date;
}

/**
 * 文件系统接口
 */
export interface FileSystem {
  /**
   * 创建目录
   */
  mkdir(path: string, options?: FileSystemOptions): Promise<void>;

  /**
   * 删除目录
   */
  rmdir(path: string, options?: FileSystemOptions): Promise<void>;

  /**
   * 重命名文件或目录
   */
  rename(oldPath: string, newPath: string, options?: FileSystemOptions): Promise<void>;

  /**
   * 读取目录内容
   */
  readdir(path: string, options?: FileSystemOptions): Promise<FileItem[]>;

  /**
   * 写入文件
   */
  writeFile(path: string, data: string | Uint8Array, options?: FileSystemOptions): Promise<void>;

  /**
   * 删除文件
   */
  unlink(path: string, options?: FileSystemOptions): Promise<void>;

  /**
   * 读取文件内容
   */
  readFile(path: string, options?: FileSystemOptions & { encoding?: string }): Promise<string | Uint8Array>;

  /**
   * 获取文件/目录信息
   */
  stat(path: string, options?: FileSystemOptions): Promise<FileStats>;

  /**
   * 检查文件/目录是否存在
   */
  exists(path: string, options?: FileSystemOptions): Promise<boolean>;
}

export {
  FileSystemOptions,
  FileItem
}; 