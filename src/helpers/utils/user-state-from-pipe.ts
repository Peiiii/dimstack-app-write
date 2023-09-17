import { SpaceDef } from "@/toolkit/types/space";
import { useEffect, useState } from "react";
import xbook from "xbook/index";
export const useStateFromPipe = <T>(key: string, defaultValue: T) => {
  const [state] = useState(defaultValue);
  const setState = (data: T) => xbook.pipeService.emit(key, data);
  useEffect(() => {
    return xbook.pipeService.on(key, (data: T) => {
      setState(data);
    });
  }, []);
  return [state, setState];
};
