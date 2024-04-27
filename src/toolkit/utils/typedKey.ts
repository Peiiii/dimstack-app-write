import { Key, TypedKey } from "@/toolkit/types";

export const typedKey = <T=undefined>(name: string) => {
  return {
    name,
  } as TypedKey<T>;
};

export const getPlainKey = <T>(key: Key<T> | string): string => {
  return typeof key === "string" ? key : key.name;
};

