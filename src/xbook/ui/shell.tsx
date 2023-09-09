import { useCallback, useEffect, useState } from "react";
import { DeferredProxy, DeferredProxySpec } from "xbook/common/deferredProxy";
import { cacheService } from "xbook/services/cacheService";

export const createShell = <T,>(
  proxy: T,
  id: string,
  storage?: "localStorage"
) => {
  const cache = cacheService.space(id, storage || "localStorage");
  const useCachedState = (name: string, initialState) => {
    const [state, setState] = cache.useCachedState(name, initialState);
    const getState = useCallback(() => state, [state]);
    return { state, setState, getState };
  };
  const useCachedBoolState = (name: string, initialState: boolean) => {
    const [state, setState] = cache.useCachedState(name, initialState);
    const getState = useCallback(() => state, [state]);
    const setTrue = useCallback(() => {
      setState(true);
    }, [setState]);
    const setFalse = useCallback(() => {
      setState(false);
    }, [setState]);
    const toggleState = useCallback(() => {
      setState((state) => !state);
    }, [setState]);
    return { state, setState, getState, toggleState, setTrue, setFalse };
  };
  return {
    proxy,
    useCachedState,
    useCachedBoolState,
  };
};
