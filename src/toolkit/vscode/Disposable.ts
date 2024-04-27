export class Disposable {
  private disposables: { dispose: () => any }[];

  constructor(callOnDispose: () => any) {
    this.disposables = [];
    this.disposables.push({ dispose: callOnDispose });
  }

  static from(...disposableLikes: { dispose: () => any }[]): Disposable {
    const disposable = new Disposable(() => {
      for (const item of disposableLikes) {
        item.dispose();
      }
    });

    disposable.disposables.push(...disposableLikes);

    return disposable;
  }

  dispose(): any {
    for (const disposable of this.disposables) {
      disposable.dispose();
    }

    this.disposables = [];
  }
}
