import { Key, SafeAny } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";
import { defineController } from "app-toolkit";

export type IHook = SafeAny;

export const HookRegistry = defineController(() => {
  const hookMap = new Map<string, IHook[]>();
  const addHook = <T extends IHook>(name: Key<T>, hook: T) => {
    const plainKey = getPlainKey(name);
    const hooks = hookMap.get(plainKey) || [];
    hooks.push(hook);
    hookMap.set(plainKey, hooks);
  };
  const getHooks = <T extends IHook>(name: Key<T>): T[] => {
    return hookMap.get(getPlainKey(name)) || [];
  };
  return {
    addHook,
    getHooks,
  };
});
