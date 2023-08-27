import { ReplaySubject } from "rxjs";

type Callback<T> = (arg: T) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;
interface ScopedPipeService {
  on: <T>(
    event: string | Record<string, Callback<T>>,
    callback?: Callback<T>
  ) => () => void;
  emit: <T>(event: string, data: T) => void;
}

interface PipeService extends ScopedPipeService {
  createScopedProxy: (scope: string) => ScopedPipeService;
}

export const createPipeService = (): PipeService => {
  const events = new Map<string, ReplaySubject<SafeAny>>();

  const on = <T = SafeAny>(
    event: string | Record<string, Callback<T>>,
    callback?: Callback<T>
  ): (() => void) => {
    if (typeof event === "string") {
      if (!events.has(event)) {
        events.set(event, new ReplaySubject());
      }
      const subject = events.get(event)!;
      const subscription = subject.subscribe((data: T) => {
        callback?.(data);
      });
      return () => {
        subscription.unsubscribe();
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

  const emit = <T = SafeAny>(event: string, data: T): void => {
    if (!events.has(event)) {
      events.set(event, new ReplaySubject());
    }
    const subject = events.get(event)!;
    subject.next(data);
  };

  const createScopedProxy = (scope: string): ScopedPipeService => {
    const scopedOn = <T = SafeAny>(
      event: string | Record<string, Callback<T>>,
      callback?: Callback<T>
    ): (() => void) => {
      if (typeof event === "string") {
        return on(`${scope}/${event}`, callback);
      } else {
        const mappedEvent: Record<string, Callback<T>> = {};
        Object.entries(event).forEach(([eventType, eventCallback]) => {
          mappedEvent[`${scope}/${eventType}`] = eventCallback;
        });
        return on(mappedEvent);
      }
    };

    const scopedEmit = <T = SafeAny>(event: string, data: T): void => {
      emit(`${scope}/${event}`, data);
    };

    return { on: scopedOn, emit: scopedEmit };
  };

  return { on, emit, createScopedProxy };
};

export const pipeService = createPipeService();
