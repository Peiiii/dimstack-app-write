import { createCacheSpace } from "@/toolkit/factories/cacheSpace";

export type PathMeta = {
  mtime?: number;
  size?: number;
  hash?: string; // content hash fallback when mtime/size not reliable
  updatedAt?: number;
};

export type RepoMeta = { head?: string; etag?: string; validatedAt?: number };

// Store a single JSON object per spaceId to make listing cheap.
const metaSpace = createCacheSpace("search-meta", "localStorage");

export class MetaStore {
  getAll(spaceId: string): Record<string, PathMeta> {
    return metaSpace.get(spaceId, {}) || {};
  }

  set(spaceId: string, path: string, meta: PathMeta) {
    const all = this.getAll(spaceId);
    all[path] = meta;
    metaSpace.set(spaceId, all);
  }

  remove(spaceId: string, path: string) {
    const all = this.getAll(spaceId);
    delete all[path];
    metaSpace.set(spaceId, all);
  }

  listPaths(spaceId: string): string[] {
    return Object.keys(this.getAll(spaceId));
  }

  // Repo-level metadata (HEAD/ETag/last validated time). Stored under a reserved key.
  private readonly REPO_META_KEY = "__repo__";
  getRepoMeta(spaceId: string): RepoMeta {
    const all = metaSpace.get(spaceId, {}) as Record<string, unknown> | undefined;
    const raw = all ? (all as Record<string, unknown>)[this.REPO_META_KEY] : undefined;
    if (raw && typeof raw === "object") return raw as RepoMeta;
    return {};
  }
  setRepoMeta(spaceId: string, meta: RepoMeta) {
    const all = this.getAll(spaceId) as Record<string, unknown>;
    const prev = all[this.REPO_META_KEY];
    const next: RepoMeta = {
      ...(typeof prev === "object" && prev ? (prev as RepoMeta) : {}),
      ...meta,
    };
    all[this.REPO_META_KEY] = next as unknown as PathMeta; // reserve key in same object
    metaSpace.set(spaceId, all);
  }
}
