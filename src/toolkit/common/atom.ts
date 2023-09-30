import { EventMap, createEventBus } from "@/toolkit/common/eventBus";
import { createRegistry } from "@/toolkit/common/registry";
import { createServiceBus } from "@/toolkit/common/serviceBus";
import { AnyFunction, SafeAny } from "@/toolkit/common/types";
import { nanoid } from "@reduxjs/toolkit";

// interface AtomPreDef {
//   emit: ReturnType<typeof createEventBus>["emit"];
//   on: ReturnType<typeof createEventBus>["on"];
//   expose: ReturnType<typeof createServiceBus>["expose"];
//   invoke: ReturnType<typeof createServiceBus>["invoke"];
//   get: ReturnType<typeof createRegistry>["get"];
//   set: ReturnType<typeof createRegistry>["set"];
//   waitAvailable: ReturnType<typeof createRegistry>["waitAvailable"];
// }

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
