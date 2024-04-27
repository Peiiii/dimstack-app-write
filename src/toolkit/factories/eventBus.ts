// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;

type EventHandler<T extends SafeAny[]> = (...args: T) => void;
export type EventMap = Record<string, SafeAny[]>;

export function createEventBus<T extends EventMap>() {
  const listeners: Partial<{ [K in keyof T]: EventHandler<T[K]>[] }> = {};

  function on<K extends keyof T>(
    eventName: K,
    handler: EventHandler<T[K]>
  ): () => void {
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

  function emit<K extends keyof T>(eventName: K, ...args: T[K]): void {
    if (!listeners[eventName]) {
      return;
    }
    listeners[eventName]!.forEach((handler) => {
      handler(...args);
    });
  }

  const connector = <K extends keyof T>(
    eventName: K,
    data?: (e: Event) => T[K][0] | T[K][0],
    stopBubbling: boolean = false
  ) => {
    return (e: SafeAny) => {
      if (stopBubbling) {
        e.stopPropagation();
        e.preventDefault();
      }
      emit(
        eventName,
        ...([typeof data === "function" ? data(e) : data] as T[K])
      );
    };
  };

  return {
    on,
    emit,
    connector,
  };
}

export type EventBus = ReturnType<typeof createEventBus>;
