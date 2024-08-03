import { createEventBus } from "@/toolkit/factories/eventBus";
import { createRegistry } from "@/toolkit/factories/registry";
import { createServiceBus } from "@/toolkit/factories/serviceBus";
import { nanoid } from "@reduxjs/toolkit";

export interface AtomSpec {}
export type AtomProps = {
  id?: string;
};
export const createAtom = <T extends AtomSpec = AtomSpec>(
  props?: AtomProps
) => {
  let { id } = props || {};
  id = id || nanoid();
  const eventBus = createEventBus();
  const registry = createRegistry<Record<string, any>>();
  const serviceBus = createServiceBus();
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
