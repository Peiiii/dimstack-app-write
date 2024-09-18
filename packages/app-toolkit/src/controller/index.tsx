import { SafeAny } from "@/toolkit/types";
import React, { useContext, useMemo } from "react";

export const defineController = <
  TResult,
  TParams extends SafeAny[],
  TIsHook extends true | false = false
>(
  maybeHookCreate: (...params: TParams) => TResult,
  {
    extraContext,
    isHook,
  }: {
    extraContext?: React.Context<any>;
    isHook?: TIsHook;
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
    useInstace: isHook
      ? maybeHookCreate
      : (...params: TParams) => useMemo(() => maybeHookCreate(...params), []),
    Provider,
    useExistingInstance: () => useContext(Context) as TResult | undefined,
    create: (isHook ? undefined : maybeHookCreate) as TIsHook extends true
      ? undefined
      : (...params: TParams) => TResult,
  };
};
