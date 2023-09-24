import { useStateFromPipe } from "@/helpers/hooks/user-state-from-pipe";
import { DataStore } from "@/toolkit/common/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import xbook from "xbook/index";

const createSpaceHelper = () => {
  const getStore = () =>
    xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const useSpaces = () => useStateFromPipe<SpaceDef[]>("spaceStore.spaces", []);
  const generateSpaceId = (platform: string, owner: string, repo: string) => {
    return `${platform}:${owner}:${repo}`;
  };
  return { getStore, useSpaces, generateSpaceId };
};
export const spaceHelper = createSpaceHelper();
