import { useSearchStore } from "@/features/search/hooks/useSearchStore";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { openerService } from "@/services/opener.service";
import { spaceService } from "@/services/space.service";
import { useCallback, useEffect, useRef, useState } from "react";
import { layoutService } from "xbook/services";
import {
  SearchEmptyState,
  SearchInputBar,
  SearchKeyboardHints,
  SearchResultList,
  SearchSpaceInfo,
  SearchStatusBar,
} from "./components";

type Props = { onClose: () => void };

export const QuickSearchModal: React.FC<Props> = ({ onClose }) => {
  const {
    spaceId,
    q,
    setQ,
    items,
    total,
    loading,
    reindex,
    indexing,
    stale,
    validate,
    acceptHead,
  } = useSearchStore();

  const [active, setActive] = useState(0);
  const activeItemRef = useRef<HTMLDivElement>(null);

  // Do NOT sync to focused space after open to avoid cross-space results.
  // Only set once at mount when store has no spaceId (handled elsewhere).

  useEffect(() => {
    setActive(0);
  }, [spaceId, q]);

  const openHit = useCallback(async (idx: number, opts?: { keepOpen?: boolean }) => {
    if (!spaceId) return;
    const it = items[idx];
    if (!it) return;

    spaceService.focusSpace(spaceId);
    const node: FolderTreeNode = {
      id: it.path,
      name: it.path.split("/").pop() || it.path,
      path: it.path,
      type: "file",
    };
    await openerService.open(spaceId, node);
    layoutService.pageBox.show?.();
    if (!opts?.keepOpen) {
      onClose();
    }
  }, [spaceId, items, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((p) => Math.min(p + 1, Math.max(0, items.length - 1)));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((p) => Math.max(0, p - 1));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (items.length > 0) {
          openHit(active, { keepOpen: e.metaKey || e.ctrlKey });
        }
        return;
      }
    },
    [items.length, active, openHit, onClose]
  );

  return (
    <div className="w-full max-w-3xl flex flex-col" style={{ height: "520px", maxHeight: "80vh" }}>
      <SearchInputBar
        spaceId={spaceId}
        query={q}
        onQueryChange={setQ}
        loading={loading}
        stale={stale}
        onValidate={validate}
        onAcceptHead={acceptHead}
        onKeyDown={handleKeyDown}
        disabled={!spaceId}
      />

      <SearchSpaceInfo
        space={spaceId ? spaceService.getSpace(spaceId) : undefined}
        onReindex={reindex}
        indexing={indexing}
        disabled={!spaceId}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {!spaceId && <SearchEmptyState type="no-space" />}

        {spaceId && (
          <>
            <SearchStatusBar
              loading={loading}
              query={q}
              total={total}
            />

            <SearchResultList
              items={items}
              query={q}
              loading={loading}
              activeIndex={active}
              onItemSelect={(idx) => openHit(idx)}
              onItemHover={setActive}
              activeItemRef={activeItemRef}
            />
          </>
        )}
      </div>

      {spaceId && (
        <SearchKeyboardHints
          itemsCount={items.length}
          activeIndex={active}
        />
      )}
    </div>
  );
};
