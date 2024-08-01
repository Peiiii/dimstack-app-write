import { AnyFunction, Key } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";

type ServiceHandler<Tin extends any[], Tout extends any> = (
  ...args: Tin
) => Tout;

export const createConstraintServiceBus = <
  T extends Record<string, AnyFunction>
>() => {
  const SEPERATOR = ".";
  // const allowOverride = true;
  const map: Partial<T> = {};
  const exist = (name: string | symbol | number) => {
    return Object.hasOwnProperty.call(map, name);
  };
  const exposeAt = <T extends Record<string, any>>(
    scope: Key<T>,
    serviceMap: T
  ) => {
    scope = getPlainKey(scope);
    for (const name in serviceMap) {
      if (exist(`${scope}${SEPERATOR}${name}`)) {
        return false;
      }
    }
    for (const name in serviceMap) {
      expose(`${scope}${SEPERATOR}${name}`, serviceMap[name] as T[keyof T]);
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

  const createProxy = <T extends Record<string, any>>(key: Key<T>) => {
    return new Proxy(
      {},
      {
        get: (_, prop: string) => {
          const plainKey = getPlainKey(`${getPlainKey(key)}${SEPERATOR}${prop}` as Key<any>);
          return (...args: any[]) => invoke(plainKey, ...(args as any));
        },
      }
    ) as T;
  };

  return {
    expose,
    exposeAt,
    invoke,
    createProxy,
    $map:map,
  };
};
