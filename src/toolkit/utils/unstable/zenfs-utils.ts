import { configureSingle, fs } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";

export const acquireIndexedDBZenfs = async () => {
  await configureSingle({
    backend: IndexedDB,
  });
  return fs;
};
