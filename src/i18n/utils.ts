import i18n from "./config";

export function t(key: string, options?: Record<string, string | number>) {
  return i18n.t(key, options);
}

