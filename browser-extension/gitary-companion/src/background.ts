import { ExtensionAction } from "./config.js";
import { buildGitaryOpenUrl } from "./gitary.js";
import { extractGithubRepoFromUrl } from "./github.js";

const messages = {
  en: {
    notification: {
      title: "Gitary Companion",
      message: "Please use this feature on a GitHub repository page, or right-click on a repository link.",
    },
    contextMenu: "Open in Gitary",
  },
  zh: {
    notification: {
      title: "Gitary Companion",
      message: "请在 GitHub 仓库页面使用此功能，或右键点击仓库链接。",
    },
    contextMenu: "在 Gitary 中打开此仓库",
  },
};

function getBrowserLanguage(): "en" | "zh" {
  try {
    const lang = chrome.i18n.getUILanguage();
    if (lang.startsWith("zh")) {
      return "zh";
    }
  } catch {
    // Fallback if i18n is not available
  }
  return "en";
}

function getMessages() {
  return messages[getBrowserLanguage()];
}

function openRepoInGitaryFromUrl(rawUrl: string): void {
  const repo = extractGithubRepoFromUrl(rawUrl);
  if (!repo) {
    const msg = getMessages();
    void chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: msg.notification.title,
      message: msg.notification.message,
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
  const msg = getMessages();
  chrome.contextMenus.create({
    id: ExtensionAction.OpenInGitary,
    title: msg.contextMenu,
    contexts: ["page", "link"],
    documentUrlPatterns: ["https://github.com/*"],
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
