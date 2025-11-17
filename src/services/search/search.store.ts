import { searchService } from "@/services/search/search.service";
import { estimateSpaceSize } from "@/services/search/sizer";
import { fetchRepoValidation } from "@/services/search/validator";
import { MetaStore } from "@/services/search/meta-store";
import { BehaviorSubject, Observable, catchError, combineLatest, debounceTime, distinctUntilChanged, from, map, of, shareReplay, switchMap, tap } from "rxjs";
import { layoutService, notificationService } from "xbook/services";
import { spaceService } from "@/services/space.service";

export type SearchStoreResult = {
  hits: { id: string; path: string; title?: string; snippet: string }[];
  total: number;
};

export class SearchStore {
  // Inputs
  readonly spaceId$ = new BehaviorSubject<string | undefined>(undefined);
  readonly query$ = new BehaviorSubject<string>("");
  readonly debouncedQuery$ = this.query$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    shareReplay(1)
  );

  // UI flags
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly watching$ = new BehaviorSubject<boolean>(false);
  readonly indexing$ = new BehaviorSubject<boolean>(false);

  // Derived
  readonly results$: Observable<SearchStoreResult> = combineLatest([
    this.spaceId$,
    this.debouncedQuery$,
  ]).pipe(
    switchMap(([spaceId, q]) => {
      if (!spaceId || !q) return of({ hits: [], total: 0 });
      this.loading$.next(true);
      return from(searchService.search(spaceId, q, { limit: 50 })).pipe(
        map((res) => ({
          hits: res.hits.map((h) => ({ id: h.id, path: h.path, title: h.title, snippet: h.snippet })),
          total: res.total,
        })),
        tap(() => this.loading$.next(false)),
        catchError((err) => {
          console.warn("search error", err);
          this.loading$.next(false);
          return of({ hits: [], total: 0 });
        })
      );
    }),
    shareReplay(1)
  );

  readonly docCount$ = new BehaviorSubject<number>(0);
  readonly sizer$ = this.spaceId$.pipe(
    switchMap((spaceId) =>
      spaceId
        ? from(estimateSpaceSize(spaceId)).pipe(
            map((est) => ({ isLarge: est.isLarge, reason: est.reason })),
            catchError(() => of({ isLarge: false, reason: "error" }))
          )
        : of(null)
    ),
    shareReplay(1)
  );

  readonly logs$ = new BehaviorSubject<string[]>([]);
  // Validation/staleness (manual)
  readonly stale$ = new BehaviorSubject<boolean | null>(null);
  readonly lastValidatedAt$ = new BehaviorSubject<number | undefined>(undefined);
  private meta = new MetaStore();

  constructor() {
    // When space changes, restore index, pull initial docCount and logs
    this.spaceId$
      .pipe(distinctUntilChanged())
      .subscribe(async (sid) => {
        if (!sid) {
          this.docCount$.next(0);
          this.logs$.next([]);
          return;
        }
        await searchService.restore(sid);
        this.docCount$.next(searchService.getDocCount(sid));
        this.logs$.next(searchService.getLogs(sid));
      });

    // Reflect progress into docCount
    searchService.onProgress((e) => {
      const sid = this.spaceId$.getValue();
      if (!e || !sid || e.spaceId !== sid) return;
      this.docCount$.next(searchService.getDocCount(sid));
    });

    // Pipe logs into logs$
    searchService.onLog((e) => {
      const sid = this.spaceId$.getValue();
      if (!e || !sid || e.spaceId !== sid) return;
      this.logs$.next([...searchService.getLogs(sid)]);
    });
  }

  setSpaceId(id?: string) {
    this.spaceId$.next(id);
  }

  setQuery(q: string) {
    this.query$.next(q);
  }

  async reindex() {
    let sid = this.spaceId$.getValue();
    if (!sid) {
      const focused = spaceService.getFocusedSpace();
      sid = focused?.id || layoutService.sidebar.getActiveViewId?.();
    }
    if (!sid) return;
    this.indexing$.next(true);
    try {
      const { indexed, removed } = await searchService.indexSpace(sid, { full: true });
      // Update counter immediately
      this.docCount$.next(searchService.getDocCount(sid));
      // Toast feedback if available
      notificationService.success(`索引完成：新增/更新 ${indexed}，移除 ${removed}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      notificationService.error(`重建索引失败：${msg}`);
    } finally {
      this.indexing$.next(false);
    }
  }

  toggleWatch() {
    const sid = this.spaceId$.getValue();
    if (!sid) return;
    const next = !this.watching$.getValue();
    this.watching$.next(next);
    if (next) searchService.startWatch(sid);
    else searchService.stopWatch(sid);
  }

  // Manual validation: compare remote HEAD/ETag with stored repo meta; do not auto-trigger
  async validate() {
    const sid = this.spaceId$.getValue();
    if (!sid) return;
    const current = await fetchRepoValidation(sid);
    const repoMeta = this.meta.getRepoMeta(sid);
    const stale =
      typeof repoMeta.head === "string" && typeof current?.head === "string"
        ? repoMeta.head !== current.head
        : null; // unknown when no baseline
    this.stale$.next(stale);
    const now = Date.now();
    this.lastValidatedAt$.next(now);
    // Update validation timestamp and optional ETag; keep baseline head unchanged
    this.meta.setRepoMeta(sid, { validatedAt: now, etag: current?.etag });
  }

  // Accept current remote HEAD as baseline (resets stale flag)
  async acceptCurrentHead() {
    const sid = this.spaceId$.getValue();
    if (!sid) return;
    const current = await fetchRepoValidation(sid);
    if (current?.head) {
      const now = Date.now();
      this.meta.setRepoMeta(sid, { head: current.head, validatedAt: now, etag: current.etag });
      this.stale$.next(false);
      this.lastValidatedAt$.next(now);
    }
  }
}

export const searchStore = new SearchStore();
