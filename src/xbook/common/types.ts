export type { Uri } from "xbook/services/fs/Uri";
export type {
  FileSystemProvider,
  FileChangeEvent,
  FileChangeType,
  FileStat,
} from "xbook/services/fs/fileSystemProvider";

export { FileType } from "xbook/services/fs/fileSystemProvider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;
