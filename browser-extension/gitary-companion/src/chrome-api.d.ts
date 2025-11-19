interface ChromeTabsCreateProperties {
  url?: string;
}

interface ChromeTab {
  id?: number;
  url?: string;
}

interface ChromeTabs {
  create(
    createProperties: ChromeTabsCreateProperties,
    callback?: (tab: ChromeTab) => void
  ): void;
}

interface ChromeActionOnClickedEvent {
  addListener(callback: (tab: ChromeTab) => void): void;
}

interface ChromeAction {
  onClicked: ChromeActionOnClickedEvent;
}

interface ChromeContextMenusOnClickData {
  menuItemId: string | number;
  linkUrl?: string;
}

type ChromeContextType = "page" | "link";

interface ChromeContextMenusCreateProperties {
  id: string;
  title: string;
  contexts: ChromeContextType[];
  documentUrlPatterns?: string[];
}

interface ChromeContextMenusOnClickedEvent {
  addListener(
    callback: (info: ChromeContextMenusOnClickData, tab?: ChromeTab) => void
  ): void;
}

interface ChromeContextMenus {
  create(createProperties: ChromeContextMenusCreateProperties): void;
  onClicked: ChromeContextMenusOnClickedEvent;
}

type ChromeRuntimeOnInstalledReason =
  | "install"
  | "update"
  | "chrome_update"
  | "shared_module_update";

interface ChromeRuntimeOnInstalledDetails {
  reason: ChromeRuntimeOnInstalledReason;
}

interface ChromeRuntimeOnInstalledEvent {
  addListener(
    callback: (details: ChromeRuntimeOnInstalledDetails) => void
  ): void;
}

interface ChromeRuntime {
  onInstalled: ChromeRuntimeOnInstalledEvent;
}

interface Chrome {
  tabs: ChromeTabs;
  action: ChromeAction;
  contextMenus: ChromeContextMenus;
  runtime: ChromeRuntime;
}

declare const chrome: Chrome;

