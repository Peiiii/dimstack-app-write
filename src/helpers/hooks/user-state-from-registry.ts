import { useEffect, useState } from "react";
import xbook from "xbook/index";
export const useStateFromRegistry = <T>(key: string, defaultValue?: T) => {
  const [state, setState] = useState(() => {
    const v = xbook.registry.get(key);
    if (typeof v === "undefined") return defaultValue;
    else return v;
  });
  const setRegistryItem = (data: T) => xbook.registry.set(key, data);
  useEffect(() => {
    return xbook.registry.subscribe(key, (data: T) => {
      setState(data);
    });
  }, []);
  return [state, setRegistryItem] as [typeof state, typeof setRegistryItem];
};
