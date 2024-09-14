import { SafeAny } from "@/toolkit/types";
import React, { useContext } from "react";

export const defineController = <TResult, TParams extends SafeAny[]>(
  hookCreate: (...params: TParams) => TResult,
  {
    extraContext,
  }: {
    extraContext?: React.Context<any>;
  } = {}
) => {
  const Context = React.createContext<TResult | undefined>(undefined);
  const Provider = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: TResult;
  }) => {
    return (
      <Context.Provider value={value}>
        {extraContext ? (
          <extraContext.Provider value={value}>
            {children}
          </extraContext.Provider>
        ) : (
          children
        )}
      </Context.Provider>
    );
  };
  return {
    useInstace: hookCreate,
    Provider,
    useExistingInstance: () => useContext(Context) as TResult | undefined,
    create: hookCreate,
  };
};
