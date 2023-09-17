import { createServiceMapper } from "@/helpers/utils/mapper";
const SEPERATOR="::";
const createFileSystemHelper = () => {
  const service = createServiceMapper<{
    open: (spaceId: string, path: string) => Promise<string>;
    read: (fid: string) => Promise<string>;
    write: (fid: string, content: string) => Promise<boolean>;
    createFile: (fid: string, content?: string) => Promise<boolean>;
    delete: (fid: string) => Promise<boolean>;
    rename: (fid1: string, fid2: string) => Promise<boolean>;
  }>("fileSystemService");
  const generateFileId = (spaceId: string, path: string) => `${spaceId}${SEPERATOR}${path}`;
  return {
    service,
    generateFileId,
  };
};
export const fileSystemHelper = createFileSystemHelper();