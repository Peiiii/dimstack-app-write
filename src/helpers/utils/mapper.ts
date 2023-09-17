import { SafeAny } from "xbook/common/types";
import xbook from "xbook/index";

export const createServiceMapper = <T extends Record<string, SafeAny>>(
  serviceName: string
) => {
  const service = {} as any;
  const proxy = new Proxy(service, {
    get(_, p) {
      // console.log("get property :" , p);
      return (...args: SafeAny[]) => {
        return xbook.serviceBus.invoke(`${serviceName}.${String(p)}`, ...args);
      };
    },
  });
  return proxy as T;
};
