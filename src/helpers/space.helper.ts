import { useStateFromPipe } from "@/helpers/utils/user-state-from-pipe";
import { DataStore } from "@/toolkit/common/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import xbook from "xbook/index";

const createSpaceHelper = () => {
  const getStore = () =>
    xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const useSpaces = () => useStateFromPipe<SpaceDef[]>("spaceStore.spaces", []);
  return { getStore, useSpaces };
};
export const spaceHelper = createSpaceHelper();
