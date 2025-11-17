import { useEffect, useRef } from "react";
import { spaceService } from "@/services/space.service";
import { searchStore } from "@/services/search/search.store";
import { useObservable } from "@/features/search/hooks/useObservable";

// Single hook that exposes all search-related UI state from the Rx store.
export const useSearchStore = () => {
  // Spaces list still comes from the space service
  const spaces = spaceService.useSpaces();

  // Observables from store
  const spaceId = useObservable(searchStore.spaceId$, searchStore.spaceId$.getValue());
  const q = useObservable(searchStore.query$, searchStore.query$.getValue());
  const loading = useObservable(searchStore.loading$, searchStore.loading$.getValue());
  const results = useObservable(searchStore.results$, { hits: [], total: 0 });
  const docCount = useObservable(searchStore.docCount$, searchStore.docCount$.getValue());
  const sizer = useObservable(searchStore.sizer$, null);
  const logs = useObservable(searchStore.logs$, []);
  const watching = useObservable(searchStore.watching$, false);
  const indexing = useObservable(searchStore.indexing$, false);
  const stale = useObservable(searchStore.stale$, null);
  const lastValidatedAt = useObservable(
    searchStore.lastValidatedAt$,
    searchStore.lastValidatedAt$.getValue?.() || undefined
  );

  // Sync default spaceId on first mount if missing
  useEffect(() => {
    if (!searchStore.spaceId$.getValue()) {
      const focused = spaceService.getFocusedSpace();
      if (focused?.id) searchStore.setSpaceId(focused.id);
      else if (spaces[0]?.id) searchStore.setSpaceId(spaces[0].id);
    }
  }, [spaces.length]);

  const selectSpace = (id?: string) => {
    // Only change the search context; DO NOT focus workbench space here.
    // This keeps the Search view active and decouples from folder tree switching.
    searchStore.setSpaceId(id);
  };

  const setQ = (value: string) => searchStore.setQuery(value);
  const toggleWatch = () => searchStore.toggleWatch();
  const reindex = () => searchStore.reindex();
  const validate = () => searchStore.validate();
  const acceptHead = () => searchStore.acceptCurrentHead();

  // Auto index on first enter to a space when no docs and not indexing
  const triedSpacesRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!spaceId) return;
    if (docCount === 0 && !indexing && !triedSpacesRef.current.has(spaceId)) {
      triedSpacesRef.current.add(spaceId);
      searchStore.reindex();
    }
  }, [spaceId, docCount, indexing]);

  return {
    spaces,
    spaceId,
    selectSpace,
    q,
    setQ,
    loading,
    items: results.hits,
    total: results.total,
    docCount,
    sizer,
    logs,
    watching,
    indexing,
    toggleWatch,
    reindex,
    stale,
    lastValidatedAt,
    validate,
    acceptHead,
  } as const;
};
