import xbook from "xbook/index";
import { spaceHelper } from "@/helpers/space.helper";

const SEPERATOR = "::";

const parseFid = (fid: string) => {
  const [spaceId, ...rest] = fid.split(SEPERATOR);
  const path = rest.join(SEPERATOR);
  return { spaceId, path };
};

const createFileSystemHelper = () => {
  const service = {
    open: async (spaceId: string, path: string) => {
      return spaceHelper.getUri(spaceId, path).toString();
    },
    read: async (idOrUri: string) => {
      const isUri = /:\/\//.test(idOrUri);
      const uri = isUri
        ? spaceHelper.parseUri(idOrUri)
        : spaceHelper.getUri(...Object.values(parseFid(idOrUri)) as [string, string]);
      const uint = await xbook.fs.readFile(uri);
      return new TextDecoder().decode(uint);
    },
    write: async (idOrUri: string, content: string) => {
      const isUri = /:\/\//.test(idOrUri);
      const uri = isUri
        ? spaceHelper.parseUri(idOrUri)
        : spaceHelper.getUri(...Object.values(parseFid(idOrUri)) as [string, string]);
      const uint = new TextEncoder().encode(content);
      await xbook.fs.writeFile(uri, uint, {
        overwrite: true,
        create: true,
      });
      return true;
    },
  };

  const generateFileId = (spaceId: string, path: string) =>
    `${spaceId}${SEPERATOR}${path}`;
  const isRootPath = (path: string) => {
    return path === "/" || path === "." || path === "";
  };
  return { service, generateFileId, isRootPath };
};

export const fileSystemHelper = createFileSystemHelper();
