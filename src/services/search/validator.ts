import axios from "redaxios";
import { spaceService } from "@/services/space.service";
import { authService } from "@/services/auth.service";

export type RepoValidation = {
  head?: string; // commit sha
  etag?: string; // archive ETag
  contentLength?: number;
};

async function getGithubHead(owner: string, repo: string, token?: string): Promise<string | undefined> {
  try {
    // Get default branch first
    const repoInfo = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const branch = repoInfo.data?.default_branch || "master";
    const commit = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
    );
    return commit.data?.sha as string | undefined;
  } catch {
    return undefined;
  }
}

async function getGithubArchiveMeta(owner: string, repo: string, token?: string): Promise<{ etag?: string; contentLength?: number }> {
  try {
    const res = await axios.head(`https://api.github.com/repos/${owner}/${repo}/zipball`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const len = Number(res.headers.get("content-length") || res.headers.get("Content-Length") || 0);
    const etag = res.headers.get("etag") || res.headers.get("ETag") || undefined;
    return { etag, contentLength: len || undefined };
  } catch {
    return {};
  }
}

export async function fetchRepoValidation(spaceId: string): Promise<RepoValidation | undefined> {
  const space = spaceService.getSpace(spaceId);
  if (!space) return undefined;
  const { platform, owner, repo } = space;
  if (platform === "github") {
    const token = authService.getAnyAuthInfo(platform, owner)?.accessToken;
    const [head, archive] = await Promise.all([
      getGithubHead(owner, repo, token),
      getGithubArchiveMeta(owner, repo, token),
    ]);
    return { head, etag: archive.etag, contentLength: archive.contentLength };
  }
  // TODO: add gitee or others
  return undefined;
}

