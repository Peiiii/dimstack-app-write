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
    name: K | Partial<T>,
    handler?: T[K]
  ) => {
    if (typeof name !== "string") {
      const cancellers: (() => void)[] = [];
      for (const key of Object.keys(name)) {
        const cancel = expose(key, name[key]);
        if (cancel) cancellers.push(cancel);
      }
      return () => cancellers.forEach((c) => c());
    } else {
      // if (exist(name) && !allowOverride) return false;
      map[name as keyof T] = handler;
      return () => delete map[name as keyof T];
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

// import { AnyArgs, AnyFunction } from "@/toolkit/common/types";

// export const createServiceBus = () => {
//   const SPERATOR = ".";
//   const allowOverride = true;
//   const map = new Map();
//   const exist = (name: string) => {
//     return map.has(name);
//   };
//   const exposeAt = (
//     scope: string,
//     serviceMap: { [name: string]: AnyFunction }
//   ) => {
//     for (const name in serviceMap) {
//       if (map.has(`${scope}${SPERATOR}${name}`)) {
//         return false;
//       }
//     }
//     for (const name in serviceMap) {
//       expose(`${scope}${SPERATOR}${name}`, serviceMap[name]);
//     }
//   };
//   const expose = (
//     name: string | { [name: string]: AnyFunction },
//     handler?: AnyFunction
//   ) => {
//     if (typeof name !== "string") {
//       for (const key of Object.keys(name)) {
//         expose(key, name[key]);
//       }
//     } else {
//       if (exist(name) && !allowOverride) return false;
//       map.set(name, handler);
//       return true;
//     }
//   };
//   const invoke = (name: string, ...args: AnyArgs) => {
//     if (!exist(name)) throw new Error("Service not found: " + name);
//     const result = map.get(name)(...args);
//     return result;
//   };
//   return {
//     expose,
//     exposeAt,
//     invoke,
//   };
// };
