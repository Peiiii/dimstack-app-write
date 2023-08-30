type EventHandler = (...args: any[]) => void;
type EventBusListeners = { [key: string]: EventHandler[] };

export function createEventBus() {
  const listeners: EventBusListeners = {};

  function on(eventName: string, handler: EventHandler): () => void {
    // console.log("on", eventName, handler);

    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(handler);
    // console.log("listeners", listeners);
    return function off(): void {
      // console.log("off", eventName);
      if (!listeners[eventName]) {
        return;
      }
      const index = listeners[eventName].indexOf(handler);
      if (index > -1) {
        listeners[eventName].splice(index, 1);
      }
    };
  }

  function emit(eventName: string, ...args: any[]): void {
    // console.log("emit", eventName, ...args);
    // console.log("listeners", listeners);
    if (!listeners[eventName]) {
      return;
    }
    listeners[eventName].forEach((handler) => {
      handler(...args);
    });
  }
  const connector = (
    eventName: string,
    data?: any,
    stopBubbling: boolean = false
  ) => {
    return (e) => {
      if (stopBubbling) {
        e.stopPropagation();
        e.preventDefault();
      }
      emit(eventName, typeof data === "function" ? data(e) : data);
    };
  };
  return {
    on,
    emit,
    connector,
  };
}

export type EventBus = ReturnType<typeof createEventBus>;
