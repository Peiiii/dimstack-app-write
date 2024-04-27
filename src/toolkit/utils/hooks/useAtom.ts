import { AtomProps, AtomSpec, createAtom } from "@/toolkit/factories/atom";
import { useMemo } from "react";

export const useAtom = <T extends AtomSpec = AtomSpec>(props?: AtomProps) => {
  return useMemo(() => createAtom<T>(props), []);
};
