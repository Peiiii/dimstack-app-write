import React, { useCallback, useEffect, useState } from "react";
import {
  DeferredProxySpec,
  createDeferredProxy,
} from "xbook/common/deferredProxy";

export type DeferredProxy<T extends DeferredProxySpec> = T & {
  register: <K extends keyof T>(name: K | Partial<T>, func?: T[K]) => void;
};

interface DeferredComponentProxy<T extends DeferredProxySpec> {
  proxy: DeferredProxy<T>;
  instance: React.ReactElement;
}
type UseDeferredComponentProxy<T extends DeferredProxySpec> = [
  DeferredProxy<T>,
  React.ReactElement
];
export function useDeferredComponentProxy<T extends DeferredProxySpec>(
  createInstance: ({
    proxy,
  }: {
    proxy: DeferredProxy<T>;
  }) => React.ReactElement,
  onRegister?: (name: keyof T, func?: T[keyof T]) => void
): UseDeferredComponentProxy<T> {
  const [proxy] = useState(() =>
    createDeferredProxy<T>((name, func) => {
      if (onRegister) {
        onRegister(name, func);
      }
    })
  );
  const [instance, setInstance] = useState<React.ReactElement>();
  const onProxyReady = useCallback((proxy: DeferredProxy<T>) => {
    const CreateInstance = createInstance;
    const instance = <CreateInstance proxy={proxy} />;
    setInstance(instance);
  }, []);

  useEffect(() => {
    onProxyReady(proxy);
  }, [proxy, onProxyReady]);

  return [proxy, instance!];
}

export function createDeferredComponentProxy<T extends DeferredProxySpec>(
  createInstance: ({
    proxy,
  }: {
    proxy: DeferredProxy<T>;
  }) => React.ReactElement,
  onRegister?: (name: keyof T, func?: T[keyof T]) => void
): DeferredComponentProxy<T> {
  const CreateInstance = createInstance;
  const proxy = createDeferredProxy<T>((name, func) => {
    if (onRegister) {
      onRegister(name, func);
    }
  });
  const instance = <CreateInstance proxy={proxy} />;
  return { proxy, instance: instance! };
}
