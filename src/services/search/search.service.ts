import { FileType } from "@/toolkit/vscode/file-system";
import { ProviderSource, FileReader, isProbablyBinary, shouldIgnorePath } from "@/services/search/provider-source";
import { MetaStore, PathMeta } from "@/services/search/meta-store";
import { SimpleIndexEngine, SearchDoc, SearchResult } from "@/services/search/simple-index";
import { spaceHelper } from "@/helpers/space.helper";
import { estimateSpaceSize } from "@/services/search/sizer";
import { ArchiveSource } from "@/services/search/archive-source";
import { EventEmitter } from "@/toolkit/vscode/event-emitter";
import xbook from "xbook/index";
import { FileChangeEvent } from "@/toolkit/vscode/file-system";

const textDecoder = new TextDecoder();

const hash32 = (s: string): string => {
  // Reuse the same stable hash from spaceHelper; expose a local fallback
  return spaceHelper.generateHash(s);
};

export class SearchService {
  private reader: FileReader;
  private meta = new MetaStore();
  private index = new SimpleIndexEngine();
  private logs = new Map<string, string[]>();
  private onLogEmitter = new EventEmitter<{ spaceId: string; message: string; level?: "info" | "warn" | "error" }>();
  private onProgressEmitter = new EventEmitter<{ spaceId: string; phase: string; indexed: number; removed: number; path?: string }>();
  private watching = new Set<string>();
  private fsListenerRegistered = false;

  constructor(reader: FileReader = new ProviderSource()) {
    this.reader = reader;
  }

  async restore(spaceId: string) {
    await this.index.restore(spaceId);
  }

  async dropSpace(spaceId: string) {
    await this.index.drop(spaceId);
  }

  async search(spaceId: string, q: string, opt?: { limit?: number; offset?: number }): Promise<SearchResult> {
    await this.index.restore(spaceId); // lazy restore
    const qq = (q || "").trim();
    // Fallback for very short ASCII queries: do a substring scan to improve recall
    if (/^[a-z0-9]$/i.test(qq)) {
      this.log(spaceId, `Substring scan fallback for short query: '${qq}'`);
      return this.index.scanSubstring(spaceId, qq, opt);
    }
    return this.index.search(spaceId, qq, opt);
  }

  onLog(listener: (e?: { spaceId: string; message: string; level?: "info" | "warn" | "error" }) => void) {
    return this.onLogEmitter.event(listener);
  }

  onProgress(listener: (e?: { spaceId: string; phase: string; indexed: number; removed: number; path?: string }) => void) {
    return this.onProgressEmitter.event(listener);
  }

  getLogs(spaceId: string): string[] {
    return this.logs.get(spaceId) || [];
  }

  clearLogs(spaceId: string) {
    this.logs.delete(spaceId);
  }

  getDocCount(spaceId: string): number {
    return this.index.getDocCount(spaceId);
  }

  private log(spaceId: string, message: string, level: "info" | "warn" | "error" = "info") {
    const list = this.logs.get(spaceId) || [];
    const line = `[${new Date().toLocaleTimeString()}] ${message}`;
    list.push(line);
    // cap tail
    if (list.length > 500) list.shift();
    this.logs.set(spaceId, list);
    this.onLogEmitter.fire({ spaceId, message: line, level });
  }

  async indexSpace(spaceId: string, options: { full?: boolean } = {}): Promise<{ indexed: number; removed: number }> {
    await this.index.restore(spaceId);
    const seen = new Set<string>();
    let indexed = 0;
    let removed = 0;
    const t0 = Date.now();
    this.log(spaceId, `Index start: full=${!!options.full}`);
    this.onProgressEmitter.fire({ spaceId, phase: "start", indexed: 0, removed: 0 });

    // Try archive acceleration for large spaces (best-effort)
    try {
      const est = await estimateSpaceSize(spaceId);
      this.log(spaceId, `Sizer: isLarge=${est.isLarge} reason=${est.reason || ""}`);
      if (est.isLarge) {
        const archive = new ArchiveSource();
        const entries = await archive.enumerate(spaceId);
        if (entries && entries.length) {
          for (const e of entries) {
            if (!e.path || shouldIgnorePath(e.path)) continue;
            const name = e.path.split("/").pop() || e.path;
            if (isProbablyBinary(name)) continue;
            const text = e.content || "";
            const docs: SearchDoc[] = [
              {
                id: spaceHelper.generateHash(`${spaceId}:${e.path}`),
                spaceId,
                path: e.path,
                title: name,
                text,
                updatedAt: Date.now(),
              },
            ];
            await this.index.upsert(spaceId, docs);
            this.meta.set(spaceId, e.path, { hash: spaceHelper.generateHash(text), updatedAt: Date.now() });
            seen.add(e.path);
            indexed++;
            if (indexed % 100 === 0) this.onProgressEmitter.fire({ spaceId, phase: "archive", indexed, removed });
          }
        }
      }
    } catch {}

    const walk = async (path: string) => {
      const entries = await this.reader.readDirectory(spaceId, path);
      for (const [name, type] of entries) {
        const child = path.endsWith("/") ? path + name : path + "/" + name;
        if (shouldIgnorePath(child)) continue;
        if (type === FileType.Directory) {
          await walk(child);
        } else if (type === FileType.File) {
          await this.processFile(spaceId, child, options);
          seen.add(child);
          indexed++;
        }
      }
    };

    if (indexed === 0) {
      this.log(spaceId, `Walk scan start`);
      await walk("/");
    }

    // Remove stale docs by path
    const allPaths = this.meta.listPaths(spaceId);
    for (const p of allPaths) {
      if (!seen.has(p)) {
        await this.index.removeByPath(spaceId, p);
        this.meta.remove(spaceId, p);
        removed++;
      }
    }
    const dt = Date.now() - t0;
    this.log(spaceId, `Index done: indexed=${indexed}, removed=${removed}, docs=${this.getDocCount(spaceId)}, took=${dt}ms`);
    this.onProgressEmitter.fire({ spaceId, phase: "done", indexed, removed });
    return { indexed, removed };
  }

  async reindexPaths(spaceId: string, paths: string[]): Promise<number> {
    await this.index.restore(spaceId);
    let count = 0;
    for (const p of paths) {
      await this.processFile(spaceId, p, { full: true });
      count++;
    }
    return count;
  }

  private async processFile(spaceId: string, path: string, options: { full?: boolean }) {
    const fileName = path.split("/").pop() || path;
    if (isProbablyBinary(fileName)) return;

    const stat = (await this.reader.stat?.(spaceId, path)) || {};
    const prev = this.meta.getAll(spaceId)[path] as PathMeta | undefined;

    let contentText = "";
    let contentHash: string | undefined = prev?.hash;

    const shouldRead = () => {
      if (options.full) return true;
      if (!prev) return true;
      if (typeof stat.mtime === "number" && typeof stat.size === "number") {
        if (prev.mtime !== stat.mtime || prev.size !== stat.size) return true;
        return false;
      }
      // If stat is not useful, use content hash fallback
      return true;
    };

    if (shouldRead()) {
      try {
        const uint = await this.reader.readFile(spaceId, path);
        contentText = textDecoder.decode(uint);
        contentHash = hash32(contentText);
        // If we only had hash previously and it is unchanged, we can skip reindex
        if (!options.full && prev && !stat.mtime && !stat.size && prev.hash === contentHash) {
          this.log(spaceId, `Skip unchanged ${path}`);
          return; // unchanged
        }
        const docs: SearchDoc[] = [
          {
            id: hash32(`${spaceId}:${path}`),
            spaceId,
            path,
            title: fileName,
            text: contentText,
            updatedAt: Date.now(),
          },
        ];
        await this.index.upsert(spaceId, docs);
        this.onProgressEmitter.fire({ spaceId, phase: "file", indexed: 1, removed: 0, path });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        this.log(spaceId, `Error reading ${path}: ${msg}`, "error");
      }
    }

    // Save meta for future incremental checks
    this.meta.set(spaceId, path, {
      mtime: stat.mtime,
      size: stat.size,
      hash: contentHash,
      updatedAt: Date.now(),
    });
  }

  startWatch(spaceId: string) {
    if (this.watching.has(spaceId)) return;
    this.watching.add(spaceId);
    this.ensureFsListener();
    this.log(spaceId, `FS watch enabled`);
  }

  stopWatch(spaceId: string) {
    this.watching.delete(spaceId);
    this.log(spaceId, `FS watch disabled`);
  }

  private ensureFsListener() {
    if (this.fsListenerRegistered) return;
    try {
      xbook.fs.onDidChangeFile?.((changes?: FileChangeEvent[]) => {
        if (!Array.isArray(changes)) return;
        for (const ch of changes) {
          const uriStr = ch.uri.toString();
          const sid = spaceHelper.getSpaceIdFromUri(uriStr);
          if (!sid || !this.watching.has(sid)) continue;
          const path = spaceHelper.getInSpacePathFromUri(uriStr);
          this.log(sid, `FS change ${path}`);
          // Fire-and-forget incremental update
          this.processFile(sid, path, { full: false });
        }
      });
      this.fsListenerRegistered = true;
    } catch (e) {
      // ignore
    }
  }
}

export const searchService = new SearchService();
