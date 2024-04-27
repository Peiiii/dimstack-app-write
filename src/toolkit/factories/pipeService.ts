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
  get: <T>(channel: string) => T|undefined;
}

interface PipeService extends ScopedPipeService {
  createScopedProxy: (scope: string) => ScopedPipeService;
}

export const createPipeService = (): PipeService => {
  const events = new Map<string, ReplaySubject<SafeAny>>();
  const map = new Map<string, SafeAny>();
  const addSubject = (channel: string) => {
    const subject = new ReplaySubject(1);
    events.set(channel, subject);
    subject.subscribe((val) => map.set(channel, val));
  };

  const on = <T = SafeAny>(
    event: string | Record<string, Callback<T>>,
    callback?: Callback<T>
  ): (() => void) => {
    if (typeof event === "string") {
      if (!events.has(event)) {
        addSubject(event);
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
      addSubject(event);
    }
    const subject = events.get(event)!;
    subject.next(data);
  };

  const get = <T = SafeAny>(channel: string): T|undefined => map.get(channel);

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
      return emit(`${scope}/${event}`, data);
    };

    const scopedGet = <T = SafeAny>(event: string): T|undefined => {
      return get<T>(`${scope}/${event}`);
    };

    return { on: scopedOn, emit: scopedEmit, get: scopedGet };
  };

  return { on, emit, createScopedProxy,get };
};

export const pipeService = createPipeService();
