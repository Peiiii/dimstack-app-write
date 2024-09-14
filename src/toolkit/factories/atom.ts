import { createConstraintEventBus } from "@/toolkit/factories/eventBus/constraintEventBus";
import { createRegistry } from "@/toolkit/factories/registry";
import { createServiceBus } from "@/toolkit/factories/serviceBus";
import { nanoid } from "@reduxjs/toolkit";

export interface AtomSpec<
  TEvents extends Record<string, []> = any,
  TServices extends Record<string, (...args: any[]) => any> = any
> {
  events?: TEvents;
  services?: TServices;
}

export type AtomProps = {
  id?: string;
};
export const createAtom = <T extends AtomSpec = AtomSpec>(
  props?: AtomProps
) => {
  let { id } = props || {};
  id = id || nanoid();
  const eventBus = createConstraintEventBus<T["events"]>();
  const registry = createRegistry<Record<string, any>>();
  const serviceBus = createServiceBus<T["services"]>();
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
