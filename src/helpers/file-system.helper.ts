import { createServiceMapper } from "@/helpers/utils/mapper";
import { FileItem } from "@/plugins/services/fileSystemService/utils";
const SEPERATOR = "::";
const createFileSystemHelper = () => {
  const service = createServiceMapper<{
    open: (spaceId: string, path: string) => Promise<string>;
    read: (fid: string) => Promise<string>;
    write: (fid: string, content: string) => Promise<boolean>;
    createFile: (fid: string, content?: string) => Promise<boolean>;
    createDirectory: (fid: string) => Promise<boolean>;
    delete: (fid: string) => Promise<boolean>;
    rename: (fid1: string, fid2: string) => Promise<boolean>;
    readDirectory: (fid: string) => Promise<FileItem[]>;
  }>("fileSystemService");
  const generateFileId = (spaceId: string, path: string) =>
    `${spaceId}${SEPERATOR}${path}`;
  const isRootPath = (path: string) => {
    return path === "/" || path === "." || path === "";
  };
  return {
    service,
    generateFileId,
    isRootPath,
  };
};
export const fileSystemHelper = createFileSystemHelper();
