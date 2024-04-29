import { Key } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";

export type ServiceHandler<Tin extends any[], Tout extends any> = (
  ...args: Tin
) => Tout;

const joinKeys = (a: string, b: string) => `${a}.${b}`;

export const createServiceBus = () => {
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
    registerFromMap,
    invoke,
    createProxy,
  };
};

// const serviceBus = createServiceBus();

// interface ISpaceService {
//   getSpace: (id: string) => {
//     id: string;
//     name: string;
//   };
//   addSpace: (space: { id: string; name: string }) => void;
// }
// const Keys = {
//   getSpace: typedKey<
//     [
//       [string],
//       {
//         id: string;
//         name: string;
//       }
//     ]
//   >("spaceService.getSpace"),
//   addSpace: typedKey<[[{ id: string; name: string }], void]>(
//     "spaceService.addSpace"
//   ),
//   spaceService: typedKey<ISpaceService>("spaceService"),
// };

// const createSpaceService = () => {
//   const getSpace = (id: string) => {
//     return { id: "1", name: "space1" };
//   };
//   const addSpace = (space: { id: string; name: string }) => {
//     console.log("addSpace", space);
//   };
//   return {
//     getSpace,
//     addSpace,
//   };
// };

// const spaceService = createSpaceService();

// serviceBus.registerServiceMap(Keys.spaceService, spaceService);

// const proxy = serviceBus.createProxy(Keys.spaceService);

// proxy.addSpace({
//   id: "2",
//   name: "space2",
// });
