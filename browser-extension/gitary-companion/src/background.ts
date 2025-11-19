import { ExtensionAction } from "./config.js";
import { buildGitaryOpenUrl } from "./gitary.js";
import { extractGithubRepoFromUrl } from "./github.js";

function openRepoInGitaryFromUrl(rawUrl: string): void {
  const repo = extractGithubRepoFromUrl(rawUrl);
  if (!repo) {
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
  chrome.contextMenus.create({
    id: ExtensionAction.OpenInGitary,
    title: "在 Gitary 中打开此仓库",
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
