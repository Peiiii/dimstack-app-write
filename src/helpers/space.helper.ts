import { useStateFromPipe } from "@/helpers/hooks/user-state-from-pipe";
import { DataStore } from "@/toolkit/factories/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import { Uri } from "@/toolkit/vscode/uri";
import xbook from "xbook/index";

class HashGenerator {
  private static readonly ALPHABET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  /**
   * Generates a custom hash with only alphabetic characters.
   * @param parts Array of strings to be hashed.
   * @returns A string representing the hash value using only alphabetic characters.
   */
  static generateAlphabeticHash(...parts: string[]): string {
    const combined = parts.join("").replace(/[^a-zA-Z]/g, ""); // Remove non-alphabetic characters
    let hash = 0;

    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash &= 0x7fffffff; // Ensure positive 32bit integer
    }

    return hash.toString();
  }
}

const createSpaceHelper = () => {
  const generateHash = (s: string) => {
    return HashGenerator.generateAlphabeticHash(s);
  };
  const getStore = () =>
    xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const useSpaces = () => useStateFromPipe<SpaceDef[]>("spaceStore.spaces", []);
  const generateSpaceId = (platform: string, owner: string, repo: string) => {
    return generateHash(`${platform}:${owner}:${repo}`);
  };
  const getUri = (
    spaceId: string,
    path: string,
    extraOptions?: { authority?: string }
  ) => {
    return new Uri({
      scheme: spaceId,
      authority: extraOptions?.authority ?? "no-authority",
      path,
    });
  };
  const parseUri = (uri: string) => {
    return Uri.parse(uri);
  };
  const getSpaceIdFromUri = (uri: string) => {
    return Uri.parse(uri).scheme;
  };
  const getInSpacePathFromUri = (uri: string) => {
    const parsed = Uri.parse(uri);
    return parsed.path;
  };
  const getFileName = (uri: string) => {
    return getInSpacePathFromUri(uri).split("/").pop();
  };
  return {
    getStore,
    useSpaces,
    generateSpaceId,
    getUri,
    generateHash,
    parseUri,
    getSpaceIdFromUri,
    getInSpacePathFromUri,
    getFileName
  };
};
export const spaceHelper = createSpaceHelper();
