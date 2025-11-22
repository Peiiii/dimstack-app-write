import { ExtensionAction } from "./config.js";
import { buildGitaryOpenUrl } from "./gitary.js";
import { extractRepoFromUrl } from "./repo-parser.js";

function getMessage(key: string, fallback: string): string {
  try {
    const msg = chrome.i18n.getMessage(key);
    return msg || fallback;
  } catch {
    return fallback;
  }
}

function openRepoInGitaryFromUrl(rawUrl: string): void {
  const repo = extractRepoFromUrl(rawUrl);
  if (!repo) {
    const title = getMessage("appName", "Gitary Companion");
    const message = getMessage(
      "notARepository",
      "Gitary Companion can only be used on GitHub / Gitee / GitCode repository pages."
    );
    void chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title,
      message,
    });
    return;
  }

  const targetUrl = buildGitaryOpenUrl(repo);
  void chrome.tabs.create({ url: targetUrl });
}

function openCurrentTabRepoInGitary(tab: ChromeTab): void {
  const url = tab.url;
  if (!url) {
    return;
  }
  openRepoInGitaryFromUrl(url);
}

chrome.action.onClicked.addListener((tab: ChromeTab) => {
  openCurrentTabRepoInGitary(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  const title = getMessage(
    "contextMenuTitle",
    "Open this repository in Gitary"
  );
  chrome.contextMenus.create({
    id: ExtensionAction.OpenInGitary,
    title,
    contexts: ["page", "link"],
    documentUrlPatterns: [
      "https://github.com/*",
      "https://gitee.com/*",
      "https://gitcode.com/*",
    ],
  });
});

chrome.contextMenus.onClicked.addListener(
  (info: ChromeContextMenusOnClickData, tab?: ChromeTab) => {
  if (info.menuItemId === ExtensionAction.OpenInGitary) {
    const rawUrl = info.linkUrl ?? tab?.url;
    if (!rawUrl) {
      return;
    }
    openRepoInGitaryFromUrl(rawUrl);
  }
}
);
