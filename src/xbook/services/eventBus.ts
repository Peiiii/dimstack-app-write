import { AnyArgs } from "xbook/common/types";

type Callback = (...args: AnyArgs) => void;

interface ScopedEventBus {
  on: (
    event: string | Record<string, Callback>,
    callback?: Callback
  ) => () => void;
  emit: (event: string, ...args: AnyArgs) => void;
}

interface EventBus extends ScopedEventBus {
  createScopedProxy: (scope: string) => ScopedEventBus;
}

export const createEventBus = (): EventBus => {
  const events = new Map<string, Callback[]>();

  const on = (
    event: string | Record<string, Callback>,
    callback?: Callback
  ): (() => void) => {
    if (typeof event === "string") {
      if (!events.has(event)) {
        events.set(event, []);
      }
      const callbacks = events.get(event)!;
      callbacks.push(callback!);
      return () => {
        const index = callbacks.indexOf(callback!);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      };
    } else if (typeof event === "object") {
      const listeners: (() => void)[] = [];
      Object.entries(event).forEach(([eventType, eventCallback]) => {
        const listener = on(eventType, eventCallback);
        listeners.push(listener);
      });
      return () => {
        listeners.forEach((listener) => listener());
      };
    } else {
      throw new Error(`Invalid event type: ${event}`);
    }
  };

  const emit = (event: string, ...args: AnyArgs): void => {
    if (events.has(event)) {
      const callbacks = events.get(event)!;
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  };

  const createScopedProxy = (scope: string): ScopedEventBus => {
    const scopedOn = (
      event: string | Record<string, Callback>,
      callback?: Callback
    ): (() => void) => {
      if (typeof event === "string") {
        return on(`${scope}/${event}`, callback);
      } else {
        const mappedEvent: Record<string, Callback> = {};
        Object.entries(event).forEach(([eventType, eventCallback]) => {
          mappedEvent[`${scope}/${eventType}`] = eventCallback;
        });
        return on(mappedEvent);
      }
    };

    const scopedEmit = (event: string, ...args: AnyArgs): void => {
      emit(`${scope}/${event}`, ...args);
    };

    return { on: scopedOn, emit: scopedEmit };
  };

  return { on, emit, createScopedProxy };
};

export const eventBus = createEventBus();
