import { createCacheSpace } from "@/toolkit/factories/cacheSpace";
import { tokenize, tokenizeForIndex } from "@/services/search/tokenizer";

export type SearchDoc = {
  id: string; // stable id (spaceId + path [+ sectionId])
  spaceId: string;
  path: string;
  sectionId?: string;
  title?: string;
  text: string;
  updatedAt?: number;
};

export type SearchHit = {
  id: string;
  spaceId: string;
  path: string;
  title?: string;
  snippet: string;
  score: number;
};

export type SearchResult = {
  hits: SearchHit[];
  total: number;
};

const indexCache = createCacheSpace("search-index", "localStorage");

type DocInfo = {
  id: string;
  spaceId: string;
  path: string;
  title?: string;
  text: string; // store text for snippet (simple MVP)
  len: number; // token length
};

// Minimal TF-IDF inverted index per space.
export class SimpleIndexEngine {
  // per space
  private terms = new Map<string, Map<string, Map<string, number>>>();
  // spaceId -> (docId -> DocInfo)
  private docs = new Map<string, Map<string, DocInfo>>();
  // spaceId -> (path -> Set<docId>) for path-based removal
  private pathIndex = new Map<string, Map<string, Set<string>>>();

  private getSpaceTerms(spaceId: string) {
    if (!this.terms.has(spaceId)) this.terms.set(spaceId, new Map());
    return this.terms.get(spaceId)!;
  }
  private getSpaceDocs(spaceId: string) {
    if (!this.docs.has(spaceId)) this.docs.set(spaceId, new Map());
    return this.docs.get(spaceId)!;
  }
  private getSpacePathIndex(spaceId: string) {
    if (!this.pathIndex.has(spaceId)) this.pathIndex.set(spaceId, new Map());
    return this.pathIndex.get(spaceId)!;
  }

  async upsert(spaceId: string, docs: SearchDoc[]): Promise<void> {
    const terms = this.getSpaceTerms(spaceId);
    const docStore = this.getSpaceDocs(spaceId);
    const pIndex = this.getSpacePathIndex(spaceId);

    for (const d of docs) {
      // Remove previous tokens if exists
      const prev = docStore.get(d.id);
      if (prev) this.removeDocTokens(spaceId, prev);

      const toks = tokenizeForIndex(d.title || "", d.text || "");
      const tfCounter = new Map<string, number>();
      toks.forEach((t) => tfCounter.set(t, (tfCounter.get(t) || 0) + 1));

      const di: DocInfo = {
        id: d.id,
        spaceId: d.spaceId,
        path: d.path,
        title: d.title,
        text: d.text,
        len: Math.max(1, toks.length),
      };
      docStore.set(d.id, di);
      if (!pIndex.has(d.path)) pIndex.set(d.path, new Set());
      pIndex.get(d.path)!.add(d.id);

      for (const [term, tf] of tfCounter) {
        if (!terms.has(term)) terms.set(term, new Map());
        const posting = terms.get(term)!;
        posting.set(d.id, tf);
      }
    }
    await this.persist(spaceId);
  }

  async removeByPath(spaceId: string, path: string): Promise<void> {
    const docStore = this.getSpaceDocs(spaceId);
    const pIndex = this.getSpacePathIndex(spaceId);
    const set = pIndex.get(path);
    if (!set) return;
    for (const docId of Array.from(set)) {
      const di = docStore.get(docId);
      if (di) this.removeDocTokens(spaceId, di);
      docStore.delete(docId);
    }
    pIndex.delete(path);
    await this.persist(spaceId);
  }

  private removeDocTokens(spaceId: string, di: DocInfo) {
    const terms = this.getSpaceTerms(spaceId);
    // Re-tokenize to find all terms this doc contributed
    const toks = tokenizeForIndex(di.title || "", di.text || "");
    const uniq = new Set(toks);
    for (const term of uniq) {
      const posting = terms.get(term);
      if (posting) {
        posting.delete(di.id);
        if (posting.size === 0) terms.delete(term);
      }
    }
    const pIndex = this.getSpacePathIndex(spaceId);
    const set = pIndex.get(di.path);
    if (set) {
      set.delete(di.id);
      if (set.size === 0) pIndex.delete(di.path);
    }
  }

  async search(
    spaceId: string,
    q: string,
    opt: { limit?: number; offset?: number } = {}
  ): Promise<SearchResult> {
    const terms = this.getSpaceTerms(spaceId);
    const docStore = this.getSpaceDocs(spaceId);
    const queryTokens = tokenize(q).filter(Boolean);
    const scores = new Map<string, number>();
    const N = Math.max(1, docStore.size);

    for (const t of queryTokens) {
      const posting = terms.get(t);
      if (!posting) continue;
      const df = posting.size;
      const idf = Math.log(1 + N / df);
      for (const [docId, tf] of posting) {
        const di = docStore.get(docId);
        if (!di) continue;
        const tfNorm = tf / di.len; // simple length normalization
        const s = (scores.get(docId) || 0) + tfNorm * idf;
        scores.set(docId, s);
      }
    }

    const sorted = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([docId, score]) => {
        const d = docStore.get(docId)!;
        return {
          id: d.id,
          spaceId: d.spaceId,
          path: d.path,
          title: d.title,
          snippet: this.makeSnippet(d.text, queryTokens),
          score,
        } as SearchHit;
      });

    const { limit = 20, offset = 0 } = opt;
    return { hits: sorted.slice(offset, offset + limit), total: sorted.length };
  }

  private makeSnippet(text: string, tokens: string[], window = 96): string {
    if (!text) return "";
    const s = text.toLowerCase();
    let pos = -1;
    for (const t of tokens) {
      const p = s.indexOf(t);
      if (p !== -1) {
        pos = p;
        break;
      }
    }
    if (pos === -1) return text.slice(0, window);
    const start = Math.max(0, pos - Math.floor(window / 2));
    const end = Math.min(text.length, start + window);
    return (start > 0 ? "..." : "") + text.slice(start, end) + (end < text.length ? "..." : "");
  }

  async persist(spaceId: string): Promise<void> {
    // Serialize per-space structures; compact for size by converting Maps
    const terms = this.getSpaceTerms(spaceId);
    const docs = this.getSpaceDocs(spaceId);
    const pIndex = this.getSpacePathIndex(spaceId);
    const dump = {
      terms: Array.from(terms.entries()).map(([term, posting]) => [term, Array.from(posting.entries())]),
      docs: Array.from(docs.entries()),
      paths: Array.from(pIndex.entries()).map(([p, set]) => [p, Array.from(set.values())]),
    };
    indexCache.set(spaceId, dump);
  }

  async restore(spaceId: string): Promise<void> {
    const dump = indexCache.get(spaceId);
    if (!dump) return;
    const terms = new Map<string, Map<string, number>>();
    for (const [term, posting] of dump.terms as [string, [string, number][]][]) {
      terms.set(term, new Map(posting));
    }
    this.terms.set(spaceId, terms);

    const docs = new Map<string, DocInfo>(dump.docs as [string, DocInfo][]);
    this.docs.set(spaceId, docs);

    const pIndex = new Map<string, Set<string>>();
    for (const [p, ids] of dump.paths as [string, string[]][]) {
      pIndex.set(p, new Set(ids));
    }
    this.pathIndex.set(spaceId, pIndex);
  }

  async drop(spaceId: string): Promise<void> {
    this.terms.delete(spaceId);
    this.docs.delete(spaceId);
    this.pathIndex.delete(spaceId);
    indexCache.remove(spaceId);
  }

  getDocCount(spaceId: string): number {
    return this.getSpaceDocs(spaceId).size;
  }

  // Naive substring scan for short ASCII queries; used as a fallback to improve recall
  // when the tokenizer doesn't create matching tokens (e.g., single character queries).
  async scanSubstring(
    spaceId: string,
    query: string,
    opt: { limit?: number; offset?: number } = {}
  ): Promise<SearchResult> {
    const { limit = 50, offset = 0 } = opt;
    const q = (query || "").toLowerCase();
    if (!q) return { hits: [], total: 0 };
    const docs = Array.from(this.getSpaceDocs(spaceId).values());
    const matches: SearchHit[] = [];
    for (const d of docs) {
      const pos = d.text.toLowerCase().indexOf(q);
      if (pos !== -1) {
        matches.push({
          id: d.id,
          spaceId: d.spaceId,
          path: d.path,
          title: d.title,
          snippet: this.makeSnippet(d.text, [q], 96),
          // Simple scoring: earlier occurrence and shorter doc get slightly higher score
          score: 1 / (1 + pos) + 0.1 / (1 + d.len),
        });
      }
    }
    matches.sort((a, b) => b.score - a.score);
    return { hits: matches.slice(offset, offset + limit), total: matches.length };
  }
}
