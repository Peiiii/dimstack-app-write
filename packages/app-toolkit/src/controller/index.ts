import React, { useContext } from "react";

export const defineController = <
  TResult,
  TParams,
  THook extends (params: TParams) => TResult
>(
  hookCreate: THook
) => {
  const Context = React.createContext<TResult | undefined>(undefined);
  return {
    useInstace: hookCreate,
    Provider: Context.Provider,
    useExistingInstance: () =>
      useContext(Context) as ReturnType<THook> | undefined,
  };
};
