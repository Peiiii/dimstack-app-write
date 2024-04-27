import { Disposable } from "@/toolkit/vscode/Disposable";
export interface Event<T> {
  /**
   * A function that represents an event to which you subscribe by calling it with
   * a listener function as argument.
   *
   * @param listener The listener function will be called when the event happens.
   * @param thisArgs The `this`-argument which will be used when calling the event listener.
   * @param disposables An array to which a [disposable](#Disposable) will be added.
   * @return A disposable which unsubscribes the event listener.
   */
  (
    listener: (e?: T) => any,
    thisArgs?: any,
    disposables?: Disposable[]
  ): Disposable;
}
export class EventEmitter<T> {
  private listeners: ((e?: T) => any)[] = [];

  event: Event<T> = (
    listener: (e?: T) => any,
    thisArgs?: any,
    disposables?: Disposable[]
  ): Disposable => {
    const disposable = new Disposable(() => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    });

    const boundListener = thisArgs ? listener.bind(thisArgs) : listener;
    this.listeners.push(boundListener);

    if (disposables) {
      disposables.push(disposable);
    }

    return disposable;
  };

  fire(data?: T): void {
    for (const listener of this.listeners) {
      try {
        listener.call(undefined, data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  dispose(): void {
    this.listeners = [];
  }
}
