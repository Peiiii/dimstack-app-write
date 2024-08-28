import { Key } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";

export type ServiceHandler<Tin extends any[], Tout extends any> = (
  ...args: Tin
) => Tout;

const joinKeys = (a: string, b: string) => `${a}.${b}`;

export const createDecoupledServiceBus = () => {
  const serviceRegistry: Record<string, ServiceHandler<any[], any>> = {};
  const register = <Tin extends any[], Tout>(
    key: Key<[Tin, Tout]>,
    // handler: ServiceHandler<Tin, Tout>
    handler: (...args: Tin) => Tout
  ) => {
    const plainKey = getPlainKey(key);
    serviceRegistry[plainKey] = handler;
    return () => delete serviceRegistry[plainKey];
  };

  const invoke = <Tin extends any[], Tout>(
    key: Key<[Tin, Tout]>,
    ...args: Tin
  ): Tout => {
    const plainKey = getPlainKey(key);
    if (!serviceRegistry[plainKey]) {
      throw new Error(`Service not found: ${plainKey}`);
    }
    return serviceRegistry[plainKey](...args);
  };

  const registerFromMap = <T extends Record<string, any>>(
    key: Key<T>,
    handlers: T
  ) => {
    for (const subKey in handlers) {
      if (handlers[subKey]) {
        register(
          joinKeys(getPlainKey(key), subKey) as Key<any>,
          (handlers as any)[subKey]
        );
      }
    }
  };

  const createProxy = <T extends Record<string, any>>(key: Key<T>) => {
    return new Proxy(
      {},
      {
        get: (_, prop: string) => {
          const plainKey = getPlainKey(
            joinKeys(getPlainKey(key), prop) as Key<any>
          );
          return (...args: any[]) => invoke(plainKey, ...args);
        },
      }
    ) as T;
  };

  return {
    register,
    expose: register,
    registerFromMap,
    invoke,
    createProxy,
  };
};
