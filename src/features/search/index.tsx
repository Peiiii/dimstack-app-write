import { createPlugin } from "xbook/common/createPlugin";
import { searchService } from "@/services/search/search.service";
import { spaceService } from "@/services/space.service";
import { AiOutlineSearch } from "react-icons/ai";
import { EventKeys } from "@/constants/eventKeys";
import { QuickSearchModal } from "@/features/search/QuickSearchModal";
import { searchStore } from "@/services/search/search.store";
import { t } from "@/i18n/utils";

// Feature entry for search. Registers minimal commands; no UI coupling.
export const featureSearch = createPlugin({
  async initilize(xbook) {
    // Register icon only (no sidebar view for search panel)
    xbook.componentService.register("AiOutlineSearch", AiOutlineSearch);

    // Clean up any legacy cached sidebar view named 'search'
    try {
      xbook.layoutService.sidebar.removeView("search");
    } catch {
      // Ignore errors when removing view
    }
    xbook.layoutService.activityBar.addActivity({
      id: "search",
      name: "Search",
      icon: "AiOutlineSearch",
      unselectable: true,
      order: 30,
    });
    xbook.eventBus.on(EventKeys.ActivityBar.ActivityClicked("search"), () => {
      xbook.commandService.executeCommand("search.quickOpen");
    });
    // Command: search.indexSpace [spaceId?]
    xbook.commandService.registerCommand("search.indexSpace", async (spaceId?: string) => {
      const sid = spaceId || spaceService.getFocusedSpace()?.id;
      if (!sid) return xbook.notificationService.warning(t("search.noFocusedSpaceToIndex"));
      const { indexed, removed } = await searchService.indexSpace(sid, { full: true });
      xbook.notificationService.success(t("search.indexedSuccess", { indexed, removed }));
    });

    // Command: search.searchInSpace [query, spaceId?]
    xbook.commandService.registerCommand(
      "search.searchInSpace",
      async (query: string, spaceId?: string) => {
        const sid = spaceId || spaceService.getFocusedSpace()?.id;
        if (!sid) return xbook.notificationService.warning(t("search.noFocusedSpaceToSearch"));
        const res = await searchService.search(sid, query, { limit: 20 });
        // For now just log results; UI can be added later.
        console.log("search results", { spaceId: sid, query, res });
        xbook.notificationService.success(t("search.foundHits", { total: res.total, query }));
        return res;
      }
    );

    // Command: search.quickOpen (Notion-style global popup)
    xbook.commandService.registerCommand("search.quickOpen", async () => {
      // Align search context to currently focused space at open time only.
      const focused = spaceService.getFocusedSpace();
      if (focused?.id) searchStore.setSpaceId(focused.id);
      const modal = xbook.modalService.open({
        footer: false,
        closeIcon: true,
        modalContentClassName: "sm:max-w-3xl",
        modalBodyClassName: "p-0",
        content: <QuickSearchModal onClose={() => modal.close()} />,
      });
    });

    // Global hotkey: Cmd/Ctrl + K to open quick search
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === "k" || e.key === "K")) {
        // Avoid when in input/textarea/contenteditable
        const t = e.target as HTMLElement | null;
        const tag = (t?.tagName || '').toLowerCase();
        const editable = t?.isContentEditable;
        if (tag === 'input' || tag === 'textarea' || editable) return;
        e.preventDefault();
        xbook.commandService.executeCommand("search.quickOpen");
      }
    };
    window.addEventListener("keydown", onKey);
    // no explicit dispose infra here; ok on single-page app
  },
});
