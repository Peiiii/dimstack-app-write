export type SupportedPlatform = "github";

export interface RepoLocation {
  platform: SupportedPlatform;
  owner: string;
  repo: string;
}

/**
 * 从 GitHub 页面或链接 URL 中提取仓库信息。
 * 只接受形如 https://github.com/{owner}/{repo}[/*] 的地址。
 */
export function extractGithubRepoFromUrl(rawUrl: string): RepoLocation | null {
  try {
    const url = new URL(rawUrl);
    if (url.hostname !== "github.com") {
      return null;
    }

    const segments = url.pathname.split("/").filter(Boolean);
    if (segments.length < 2) {
      return null;
    }

    const [owner, repo] = segments;
    if (!owner || !repo) {
      return null;
    }

    return {
      platform: "github",
      owner,
      repo,
    };
  } catch {
    return null;
  }
}

/**
 * 构造平台原始仓库地址（目前仅支持 GitHub）。
 */
export function buildRepoRootUrl(repo: RepoLocation): string {
  switch (repo.platform) {
    case "github":
      return `https://github.com/${repo.owner}/${repo.repo}`;
    default:
      // 目前不会触发，预留扩展点
      return "";
  }
}

