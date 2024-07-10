import { StorageProviders } from "@/toolkit/factories/cacheSpace";
import { SafeAny } from "@/toolkit/types";
import { defineController } from "app-toolkit";
import { BeanReflector, IAnyTypeOfBean, createCustomReactBean } from "rx-bean";
import { distinctUntilChanged } from "rxjs";

export const getStorage = (storage: "localStorage" | "memory") => {
  return StorageProviders[storage];
};

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

export type ICache = ReturnType<typeof CacheController.create>;

export const withCache = <
  TBean extends IAnyTypeOfBean<string, SafeAny, SafeAny>
>(
  bean: TBean,
  cache: ICache
) => {
  const key = BeanReflector.getKey(bean as SafeAny);
  const cachedValue = cache.get(
    key,
    BeanReflector.getGetter(bean as SafeAny)()
  );
  if (cachedValue !== BeanReflector.getGetter(bean as SafeAny)()) {
    BeanReflector.getSetter(bean as SafeAny)(cachedValue);
  }
  BeanReflector.getObservable(bean as SafeAny)
    .pipe(distinctUntilChanged())
    .subscribe((value) => {
      cache.set(key, value);
    });
  return bean;
};
