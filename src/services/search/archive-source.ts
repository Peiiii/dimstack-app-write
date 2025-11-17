import axios from "redaxios";
import { authService } from "@/services/auth.service";
import { spaceService } from "@/services/space.service";

export type ArchiveEntry = { path: string; content?: string };

// Skeleton of an archive-backed reader. For now it fetches archive bytes
// and returns false to allow graceful fallback to provider scanning.
export class ArchiveSource {
  async tryFetchZip(spaceId: string): Promise<ArrayBuffer | undefined> {
    const space = spaceService.getSpace(spaceId);
    if (!space) return undefined;
    const { platform, owner, repo } = space;
    if (platform !== "github") return undefined; // TODO: add other platforms
    const token = authService.getAnyAuthInfo(platform, owner)?.accessToken;
    const url = `https://api.github.com/repos/${owner}/${repo}/zipball`;
    const res = await axios.get(url, {
      responseType: "arraybuffer",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data as ArrayBuffer;
  }

  async enumerate(spaceId: string): Promise<ArchiveEntry[] | undefined> {
    try {
      const buf = await this.tryFetchZip(spaceId);
      if (!buf) return undefined;
      // TODO: parse ZIP in browser (e.g. via a zip library). For now, return undefined to fallback.
      return undefined;
    } catch {
      return undefined;
    }
  }
}

