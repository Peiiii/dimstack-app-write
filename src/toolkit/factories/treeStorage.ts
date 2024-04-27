export class JSONStorage<T extends object = object> {
  private storageKey: string;
  private data: T;

  constructor(storageKey: string, defaultValue: T) {
    this.storageKey = storageKey;
    const savedData = localStorage.getItem(this.storageKey);
    if (savedData) {
      this.data = JSON.parse(savedData);
    } else {
      this.data = defaultValue;
      localStorage.setItem(this.storageKey, JSON.stringify(defaultValue));
    }
  }
  public getData() {
    return this.data;
  }
  public get(path: string): any {
    const keys = path.split(".");
    let value = this.data;

    for (const key of keys) {
      if (!value.hasOwnProperty(key)) {
        return undefined;
      }
      value = value[key];
    }

    return value;
  }

  public set(path: string, newValue: any): void {
    const keys = path.split(".");
    let obj = this.data;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (!obj.hasOwnProperty(key) || typeof obj[key] !== "object") {
        obj[key] = {};
      }

      obj = obj[key];
    }

    obj[keys[keys.length - 1]] = newValue;
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  public remove(path: string): void {
    const keys = path.split(".");
    let obj = this.data;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (!obj.hasOwnProperty(key) || typeof obj[key] !== "object") {
        return;
      }

      obj = obj[key];
    }

    delete obj[keys[keys.length - 1]];
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }
}
