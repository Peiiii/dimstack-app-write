import { SafeAny } from "@/toolkit/types";
import React, { useContext } from "react";

export const defineController = <TResult, TParams extends SafeAny[]>(
  hookCreate: (...params: TParams) => TResult
) => {
  const Context = React.createContext<TResult | undefined>(undefined);
  return {
    useInstace: hookCreate,
    Provider: Context.Provider,
    useExistingInstance: () => useContext(Context) as TResult | undefined,
    create: hookCreate,
  };
};
