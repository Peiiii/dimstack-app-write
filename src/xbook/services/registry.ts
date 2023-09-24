import { SafeAny } from "xbook/common/types";

type Callback<T> = (value: T) => void;
type CancelFunction = () => void;
interface Registry<T> {
  has: (key: keyof T) => boolean;
  get: <K extends keyof T>(key: K) => T[K] | undefined;
  set: <K extends keyof T, V extends T[K] = T[K]>(key: K, value: V) => void;
  waitAvailable: <K extends keyof T>(key: K, callback: Callback<T[K]>) => void;
  subscribe: <K extends keyof T>(
    key: K,
    callback: Callback<T[K]>
  ) => CancelFunction;
}

const Registry = {
  create: <T>(): Registry<T> => {
    const map: Partial<T> = {};
    const observers: { key: keyof T; callback: Callback<T[keyof T]> }[] = [];

    const has = (key: keyof T): boolean => {
      return key in map;
    };

    const get = <K extends keyof T>(key: K): T[K] | undefined => {
      return map[key];
    };

    const set = <K extends keyof T, V extends T[K] = T[K]>(
      key: K,
      value: V
    ): void => {
      map[key] = value;
    };

    const notifyObservers = <K extends keyof T>(key: K, value: T[K]): void => {
      const filteredObservers = observers.filter(
        (observer) => observer.key === key
      );
      for (const observer of filteredObservers) {
        observer.callback(value);
      }
    };

    const subscribe = <K extends keyof T>(
      key: K,
      callback: Callback<T[K]>
    ): CancelFunction => {
      const observer = {
        key: key as keyof T,
        callback: callback as Callback<T[keyof T]>,
      };
      observers.push(observer);

      return () => {
        const index = observers.indexOf(observer);
        if (index >= 0) {
          observers.splice(index, 1);
        }
      };
    };

    const waitAvailable = <K extends keyof T>(
      key: K,
      callback: Callback<T[K]>
    ): void => {
      if (has(key)) {
        const value = get(key);
        callback(value!);
      } else {
        const observer = {
          key: key as keyof T,
          callback: (value: T[keyof T]) => {
            callback(value as T[K]);
            const index = observers.indexOf(observer);
            if (index >= 0) {
              observers.splice(index, 1);
            }
          },
        };
        observers.push(observer);
      }
    };

    const setWithNotify = <K extends keyof T>(key: K, value: T[K]): void => {
      set(key, value);
      notifyObservers(key, value);
    };

    return {
      has,
      get,
      set: setWithNotify,
      waitAvailable,
      subscribe,
    };
  },
};

const createRegistry = <T>(): Registry<T> => Registry.create<T>();
export const registry = createRegistry<SafeAny>();
