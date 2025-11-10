import { DataStore } from "@/toolkit/factories/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import { Uri } from "@/toolkit/vscode/uri";
import xbook from "xbook/index";

class HashGenerator {
  /**
   * Generates a stable positive hash string from input parts.
   */
  static generateHash(...parts: string[]): string {
    const combined = parts.join("");
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0; // 32-bit
    }
    // Ensure positive and stringify
    return (hash >>> 0).toString();
  }
}

const createSpaceHelper = () => {
  const generateHash = (s: string) => HashGenerator.generateHash(s);
  const getStore = () =>
    xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const generateSpaceId = (platform: string, owner: string, repo: string) => {
    return generateHash(`${platform}:${owner}:${repo}`);
  };
  const getUri = (
    spaceId: string,
    path: string,
    options?: {
      fragment?: string;
      query?: string;
    }
  ) => {
    return new Uri({
      scheme: "space",
      authority: spaceId,
      path,
      fragment: options?.fragment || "",
      query: options?.query || "",
    });
  };
  const parseUri = (uri: string) => {
    return Uri.parse(uri);
  };
  const getSpaceIdFromUri = (uri: string) => {
    return Uri.parse(uri).authority;
  };
  const getInSpacePathFromUri = (uri: string) => {
    return Uri.parse(uri).path;
  };
  const getFileName = (uri: string) => {
    return getInSpacePathFromUri(uri).split("/").pop();
  };
  return {
    getStore,
    generateSpaceId,
    getUri,
    generateHash,
    parseUri,
    getSpaceIdFromUri,
    getInSpacePathFromUri,
    getFileName,
  };
};
export const spaceHelper = createSpaceHelper();
