import { EventMap, createEventBus } from "@/toolkit/factories/eventBus";
import { createRegistry } from "@/toolkit/factories/registry";
import { createServiceBus } from "@/toolkit/factories/serviceBus";
import { AnyFunction, SafeAny } from "@/toolkit/types";
import { nanoid } from "@reduxjs/toolkit";

export interface AtomSpec {
  events?: EventMap;
  services?: Record<string, AnyFunction>;
  variables?: Record<string, SafeAny>;
}
export type AtomProps = {
  id?: string;
};
export const createAtom = <T extends AtomSpec = AtomSpec>(
  props?: AtomProps
) => {
  let { id } = props || {};
  id = id || nanoid();
  const eventBus =
    createEventBus<
      T["events"] extends undefined ? {} : NonNullable<T["events"]>
    >();
  const registry =
    createRegistry<
      T["variables"] extends undefined ? {} : NonNullable<T["variables"]>
    >();
  const serviceBus =
    createServiceBus<
      T["services"] extends undefined ? {} : NonNullable<T["services"]>
    >();
  return {
    id,
    emit: eventBus.emit,
    on: eventBus.on,
    expose: serviceBus.expose,
    invoke: serviceBus.invoke,
    get: registry.get,
    set: registry.set,
    waitAvailable: registry.waitAvailable,
    subscribe: registry.subscribe,
  };
};

export type Atom<T extends AtomSpec = AtomSpec> = ReturnType<
  typeof createAtom<T>
>;
