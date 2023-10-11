import { AnyFunction } from "@/toolkit/common/types";

export const createServiceBus = <T extends Record<string, AnyFunction>>() => {
  const SPERATOR = ".";
  // const allowOverride = true;
  const map: Partial<T> = {};
  const exist = (name: string | symbol | number) => {
    return Object.hasOwnProperty.call(map, name);
  };
  const exposeAt = (
    scope: string,
    serviceMap: { [name: string]: AnyFunction }
  ) => {
    for (const name in serviceMap) {
      if (exist(`${scope}${SPERATOR}${name}`)) {
        return false;
      }
    }
    for (const name in serviceMap) {
      expose(`${scope}${SPERATOR}${name}`, serviceMap[name] as T[keyof T]);
    }
  };
  const expose = <K extends keyof T = never>(
    nameOrMap: K | Partial<T>,
    handler?: T[K]
  ) => {
    if (typeof nameOrMap !== "string") {
      const cancellers: (() => void)[] = [];
      for (const key of Object.keys(nameOrMap)) {
        const cancel = expose(key, (nameOrMap as Partial<T>)[key as keyof T]);
        if (cancel) cancellers.push(cancel);
      }
      return () => cancellers.forEach((c) => c());
    } else {
      map[nameOrMap as keyof T] = handler;
      return () => delete map[nameOrMap as keyof T];
    }
  };
  const invoke = <K extends keyof T>(name: K, ...args: Parameters<T[K]>) => {
    if (!exist(name)) throw new Error(`Service not found: ${name.toString()}`);
    const result = map[name]!(...args);
    return result;
  };
  return {
    expose,
    exposeAt,
    invoke,
  };
};

