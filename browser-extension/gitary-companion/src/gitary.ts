import { APP_BASE_URL } from "./config.js";
import type { RepoLocation } from "./github.js";
import { buildRepoRootUrl } from "./github.js";

/**
 * 根据仓库信息构造 Gitary 打开链接。
 * Gitary 会通过 ?openRepo=<repo-url> 参数自动解析并打开空间。
 */
export function buildGitaryOpenUrl(repo: RepoLocation): string {
  const repoUrl = buildRepoRootUrl(repo);
  const encoded = encodeURIComponent(repoUrl);
  return `${APP_BASE_URL}/?openRepo=${encoded}`;
}
