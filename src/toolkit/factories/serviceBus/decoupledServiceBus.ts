import { Key } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";

export type ServiceHandler<Tin extends any[], Tout extends any> = (
  ...args: Tin
) => Tout;

export const createDecoupledServiceBus = () => {
  const map: Record<string, ServiceHandler<any[], any>> = {};
  const expose = <Tin extends any[], Tout>(
    key: Key<[Tin, Tout]>,
    handler: ServiceHandler<Tin, Tout>
  ) => {
    const plainKey = getPlainKey(key);
    map[plainKey] = handler;
    return () => delete map[plainKey];
  };
  const invoke = <Tin extends any[], Tout>(
    key: Key<[Tin, Tout]>,
    ...args: Tin
  ): Tout => {
    const plainKey = getPlainKey(key);
    if (!map[plainKey]) {
      throw new Error(`Service not found: ${plainKey}`);
    }
    return map[plainKey](...args);
  };

  return {
    expose,
    invoke,
  };
};
