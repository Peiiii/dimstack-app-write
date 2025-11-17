import { useSearchStore } from "@/features/search/hooks/useSearchStore";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { openerService } from "@/services/opener.service";
import { spaceService } from "@/services/space.service";
import { useEffect, useRef } from "react";

export const SearchPanel = () => {
  const { spaces, spaceId, selectSpace, q, setQ, loading, items, docCount, sizer, logs, watching, toggleWatch, reindex } = useSearchStore();
  const logRef = useRef<HTMLDivElement>(null);

  // autoscroll logs when appended
  useEffect(() => {
    requestAnimationFrame(() => {
      const el = logRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [logs]);

  const onOpen = async (path: string) => {
    if (!spaceId) return;
    // Ensure workbench focuses the space only when opening a hit
    spaceService.focusSpace(spaceId);
    const node: FolderTreeNode = {
      id: path,
      name: path.split("/").pop() || path,
      path,
      type: "file",
    };
    await openerService.open(spaceId, node);
  };

  return (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", height: "100%", gap: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <select
          value={spaceId || ""}
          onChange={(e) => selectSpace(e.target.value || undefined)}
          style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--sidebar-border)", borderRadius: 6 }}
        >
          <option value="">Select space…</option>
          {spaces.map((s) => (
            <option key={s.id} value={s.id}>
              {s.owner}/{s.repo}
            </option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={spaceId ? `Search in selected space` : "Select a space to search"}
          style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--sidebar-border)", borderRadius: 6 }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={reindex}
            style={{ padding: "6px 10px", border: "1px solid var(--sidebar-border)", borderRadius: 6 }}
          >
            Reindex
          </button>
          <button
            onClick={toggleWatch}
            style={{ padding: "6px 10px", border: "1px solid var(--sidebar-border)", borderRadius: 6 }}
          >
            {watching ? "Watching" : "Watch FS"}
          </button>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "var(--sidebar-accent-foreground)", lineHeight: 1.4 }}>
        <div style={{ wordBreak: "break-all" }}>
          Space: {spaceId || "-"}
        </div>
        <div>Docs: {docCount} · Large? {sizer ? String(sizer.isLarge) : "-"} {sizer?.reason ? `( ${sizer.reason} )` : ""}</div>
        <div>{loading ? "Loading..." : items.length ? `${items.length} results` : q ? "No results" : "Type to search"}</div>
      </div>
      <div style={{ overflow: "auto", flex: 1 }}>
        {items.map((it) => (
          <div
            key={it.id}
            onClick={() => onOpen(it.path)}
            style={{ cursor: "pointer", padding: "8px 6px", borderBottom: "1px solid var(--sidebar-border)" }}
          >
            <div style={{ fontWeight: 600, fontSize: 13 }}>{it.title || it.path.split("/").pop()}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{it.path}</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>{it.snippet}</div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--sidebar-border)", paddingTop: 6 }}>
        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Logs</div>
        <div ref={logRef} style={{ height: 120, overflow: "auto", fontFamily: "monospace", fontSize: 11, whiteSpace: "pre-wrap", background: "var(--sidebar-accent)", padding: 6, borderRadius: 6 }}>
          {logs.length === 0 ? <div style={{ opacity: 0.7 }}>No logs yet.</div> : logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  );
};
