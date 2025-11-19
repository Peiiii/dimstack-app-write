export const APP_BASE_URLS = [
  "https://gitary.app",
  "https://write.dimstack.com",
] as const;

export const DEFAULT_APP_BASE_URL = APP_BASE_URLS[0];

export const enum ExtensionAction {
  OpenInGitary = "open-in-gitary",
}

