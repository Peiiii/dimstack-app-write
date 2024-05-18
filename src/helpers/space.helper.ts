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
  const getStore = () =>
    xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const useSpaces = () => useStateFromPipe<SpaceDef[]>("spaceStore.spaces", []);
  const generateSpaceId = (platform: string, owner: string, repo: string) => {
    return HashGenerator.generateAlphabeticHash(`${platform}:${owner}:${repo}`);
  };
  const getUri = (spaceId: string, path: string) => {
    return new Uri({
      scheme: spaceId,
      path,
    });
  };
  return { getStore, useSpaces, generateSpaceId, getUri };
};
export const spaceHelper = createSpaceHelper();
