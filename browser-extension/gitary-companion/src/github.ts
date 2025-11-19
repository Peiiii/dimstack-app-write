export type SupportedPlatform = "github" | "gitee" | "gitcode";

export interface RepoLocation {
  platform: SupportedPlatform;
  owner: string;
  repo: string;
}

/**
 * 从支持的平台页面或链接 URL 中提取仓库信息。
 * 支持形如：
 * - https://github.com/{owner}/{repo}[/*]
 * - https://gitee.com/{owner}/{repo}[/*]
 * - https://gitcode.com/{owner}/{repo}[/*]
 */
export function extractGithubRepoFromUrl(rawUrl: string): RepoLocation | null {
  try {
    const url = new URL(rawUrl);
    let platform: SupportedPlatform;
    switch (url.hostname) {
      case "github.com":
        platform = "github";
        break;
      case "gitee.com":
        platform = "gitee";
        break;
      case "gitcode.com":
        platform = "gitcode";
        break;
      default:
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

    return { platform, owner, repo };
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
    case "gitee":
      return `https://gitee.com/${repo.owner}/${repo.repo}`;
    case "gitcode":
      return `https://gitcode.com/${repo.owner}/${repo.repo}`;
    default:
      // 目前不会触发，预留扩展点
      return "";
  }
}
