type EventHandler<T extends any[]> = (...args: T) => void;
export type EventMap = Record<string, any[]>;

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
    data?: T[K] extends [] ? (e: Event) => T[K] : T[K],
    stopBubbling: boolean = false
  ) => {
    return (e: Event) => {
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

// eventBus.on("change",(age,name)=>{

// })

// type EventHandler = (...args: any[]) => void;
// type EventBusListeners = { [key: string]: EventHandler[] };

// export function createEventBus() {
//   const listeners: EventBusListeners = {};

//   function on(eventName: string, handler: EventHandler): () => void {

//     if (!listeners[eventName]) {
//       listeners[eventName] = [];
//     }
//     listeners[eventName].push(handler);
//     return function off(): void {
//       if (!listeners[eventName]) {
//         return;
//       }
//       const index = listeners[eventName].indexOf(handler);
//       if (index > -1) {
//         listeners[eventName].splice(index, 1);
//       }
//     };
//   }

//   function emit(eventName: string, ...args: any[]): void {
//     if (!listeners[eventName]) {
//       return;
//     }
//     listeners[eventName].forEach((handler) => {
//       handler(...args);
//     });
//   }
//   const connector = (
//     eventName: string,
//     data?: any,
//     stopBubbling: boolean = false
//   ) => {
//     return (e) => {
//       if (stopBubbling) {
//         e.stopPropagation();
//         e.preventDefault();
//       }
//       emit(eventName, typeof data === "function" ? data(e) : data);
//     };
//   };
//   return {
//     on,
//     emit,
//     connector,
//   };
// }

// export type EventBus = ReturnType<typeof createEventBus>;
