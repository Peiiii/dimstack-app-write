import { Disposable } from "@/toolkit/vscode/disposable";
import { Event } from "@/toolkit/vscode/event";

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
