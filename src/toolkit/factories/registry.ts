// type Callback<T> = (value: T) => void;
// type CancelFunction = () => void;
// interface Registry<T> {
//   has: (key: keyof T) => boolean;
//   get: <K extends keyof T>(key: K) => T[K] | undefined;
//   set: <K extends keyof T>(key: K, value: T[K]) => void;
//   waitAvailable: <K extends keyof T>(key: K, callback: Callback<T[K]>) => void;
//   subscribe: <K extends keyof T>(
//     key: K,
//     callback: Callback<T[K]>
//   ) => CancelFunction;
// }

import { Key, SafeAny } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";
import { createNestedBean } from "rx-nested-bean";
import { Observable } from "rxjs";

// const Registry = {
//   create: <T>(): Registry<T> => {
//     const map: Partial<T> = {};
//     const observers: { key: keyof T; callback: Callback<T[keyof T]> }[] = [];

//     const has = (key: keyof T): boolean => {
//       return key in map;
//     };

//     const get = <K extends keyof T>(key: K): T[K] | undefined => {
//       return map[key];
//     };

//     const set = <K extends keyof T>(key: K, value: T[K]): void => {
//       map[key] = value;
//     };

//     const notifyObservers = <K extends keyof T>(key: K, value: T[K]): void => {
//       const filteredObservers = observers.filter(
//         (observer) => observer.key === key
//       );
//       for (const observer of filteredObservers) {
//         observer.callback(value);
//       }
//     };

//     const subscribe = <K extends keyof T>(
//       key: K,
//       callback: Callback<T[K]>
//     ): CancelFunction => {
//       const observer = {
//         key: key as keyof T,
//         callback: callback as Callback<T[keyof T]>,
//       };
//       observers.push(observer);

//       return () => {
//         const index = observers.indexOf(observer);
//         if (index >= 0) {
//           observers.splice(index, 1);
//         }
//       };
//     };

//     const waitAvailable = <K extends keyof T>(
//       key: K,
//       callback: Callback<T[K]>
//     ): void => {
//       if (has(key)) {
//         const value = get(key);
//         callback(value!);
//       } else {
//         const observer = {
//           key: key as keyof T,
//           callback: (value: T[keyof T]) => {
//             callback(value as T[K]);
//             const index = observers.indexOf(observer);
//             if (index >= 0) {
//               observers.splice(index, 1);
//             }
//           },
//         };
//         observers.push(observer);
//       }
//     };

//     const setWithNotify = <K extends keyof T>(key: K, value: T[K]): void => {
//       set(key, value);
//       notifyObservers(key, value);
//     };

//     return {
//       has,
//       get,
//       set: setWithNotify,
//       waitAvailable,
//       subscribe,
//     };
//   },
// };

// export const createRegistry = <T>(): Registry<T> => Registry.create<T>();

export const createTypedRegistry = <T extends Record<string, SafeAny>>(
  defaultValue: T
) => {
  const bean = createNestedBean<T>(defaultValue);
  const { namespaces } = bean;

  const getItem = <K extends Extract<keyof T, string>>(key: K): T[K] => {
    return namespaces[key].get();
  };

  const setItem = <K extends Extract<keyof T, string>>(
    key: K,
    value: T[K]
  ): void => {
    namespaces[key].set(value);
  };

  const getItem$ = <K extends Extract<keyof T, string>>(
    key: K
  ): Observable<T[K]> => {
    return namespaces[key].$;
  };

  return Object.assign(bean, {
    getItem,
    setItem,
    getItem$,
  });
};

export const createRegistry = (defaultValue: Record<string, SafeAny>) => {
  const bean = createNestedBean(defaultValue);
  const { namespaces } = bean;

  const get = <T>(key: Key<T>): T => {
    return namespaces[getPlainKey(key)].get();
  };

  const set = <T>(key: Key<T>, value: T): void => {
    namespaces[getPlainKey(key)].set(value);
  };

  const get$ = <T>(key: Key<T>): Observable<T> => {
    return namespaces[getPlainKey(key)].$;
  };

  return {
    get,
    set,
    get$,
  };
};
