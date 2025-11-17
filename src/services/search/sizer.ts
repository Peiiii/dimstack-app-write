import axios from "redaxios";
import { spaceService } from "@/services/space.service";
import { authService } from "@/services/auth.service";

export type SizeEstimation = {
  isLarge: boolean;
  reason?: string;
  metrics?: Record<string, number | string | boolean | undefined>;
};

// Default thresholds (tunable)
export const LARGE_ARCHIVE_BYTES = 50 * 1024 * 1024; // 50MB

export async function estimateSpaceSize(spaceId: string): Promise<SizeEstimation> {
  const space = spaceService.getSpace(spaceId);
  if (!space) return { isLarge: false, reason: "no-space" };

  const { platform, owner, repo } = space;
  // Try a cheap HEAD to archive endpoints for GitHub; others fallback false
  if (platform === "github") {
    const token = authService.getAnyAuthInfo(platform, owner)?.accessToken;
    const url = `https://api.github.com/repos/${owner}/${repo}/zipball`;
    try {
      const res = await axios.head(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const len = Number(res.headers.get("Content-Length") || res.headers.get("content-length") || 0);
      if (len && len >= LARGE_ARCHIVE_BYTES) {
        return { isLarge: true, reason: "archive-size", metrics: { contentLength: len } };
      }
      return { isLarge: false, reason: "archive-size", metrics: { contentLength: len } };
    } catch (e) {
      // Ignore errors and treat as non-large; Search falls back to provider scan
      return { isLarge: false, reason: "head-failed" };
    }
  }

  // Gitee or others: TODO add specific estimation; default to not-large
  return { isLarge: false, reason: "no-estimator" };
}

