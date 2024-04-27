import { TypedKey } from "@/toolkit/types";
import { getPlainKey } from "@/toolkit/utils/typedKey";
import { Subject } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;

type EventHandler<T> = (eventData: T) => void;

export function createFreeEventBus() {
  const listeners: Partial<{ [eventName: string]: SafeAny[] }> = {};

  const event$ = new Subject<{
    key: TypedKey<unknown> | string;
    payload: unknown;
  }>();

  function on<T>(
    key: TypedKey<T> | string,
    handler: EventHandler<T>
  ): () => void {
    const eventName = getPlainKey(key);

    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName]!.push(handler);

    return function off(): void {
      if (!listeners[eventName]) {
        return;
      }
      const index = listeners[eventName]!.indexOf(handler);
      if (index > -1) {
        listeners[eventName]!.splice(index, 1);
      }
    };
  }
  function emit<T>(key: TypedKey<T> | string, eventData?: T): void {
    const eventName = getPlainKey(key);
    if (listeners[eventName]) {
      listeners[eventName]!.forEach((handler) => {
        handler(eventData);
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event$.next({ key: key as any, payload: eventData });
  }

  const connector = <
    T extends
      | string
      | number
      | symbol
      | object
      | null
      | undefined
      | void
      | boolean
      | bigint
  >(
    key: TypedKey<T> | string,
    data?: T | ((e: Event) => T),
    stopBubbling: boolean = false
  ) => {
    return (e: SafeAny) => {
      if (stopBubbling) {
        e.stopPropagation();
        e.preventDefault();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (emit as any)(key, typeof data === "function" ? data(e) : data);
    };
  };

  return {
    on,
    emit,
    connector,
    event$,
  };
}

export type FreeEventBus = ReturnType<typeof createFreeEventBus>;
