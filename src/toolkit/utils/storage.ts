// Safe wrappers around localStorage with minimal surface and typed helpers.
// Avoids try/catch noise and makes it easy to swap storage later.

export const storage = {
  get(key: string): string | undefined {
    try {
      return localStorage.getItem(key) ?? undefined;
    } catch {
      return undefined;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
  getJSON<T>(key: string): T | undefined {
    const raw = this.get(key);
    if (!raw) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  },
  setJSON<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

