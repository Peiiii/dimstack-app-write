import { getStorage } from "../page-box/controller";

import { defineController } from "app-toolkit";
import { createCustomReactBean, BeanReflector } from "rx-bean";

export const CacheController = defineController(
  ({ scope, storage }: { scope: string; storage: "localStorage" }) => {
    const storageProvider = getStorage(storage);
    const joinKey = (scope: string, key: string) => scope + "." + key;
    const createCachedState = <T>(key: string, defaultValue: T) => {
      const finalKey = joinKey(scope, key);
      const bean = createCustomReactBean(
        "",
        storageProvider.get(finalKey) === undefined
          ? defaultValue
          : (storageProvider.get(finalKey) as T),
        (bean) => {
          BeanReflector.getObservable(bean).subscribe((value) => {
            storageProvider.setItem(finalKey, value);
          });
          storageProvider.subscribe?.(finalKey, (value) => {
            BeanReflector.getSetter(bean)(value as T);
          });
        }
      );
      return bean;
    };
    const get = <T>(key: string, defaultValue: T) => {
      return storageProvider.get(joinKey(scope, key)) || defaultValue;
    };
    const set = <T>(key: string, value: T) => {
      return storageProvider.set(joinKey(scope, key), value);
    };
    const remove = (key: string) => {
      return storageProvider.remove(joinKey(scope, key));
    };
    return {
      createCachedState,
      get,
      set,
      remove,
    };
  }
);
