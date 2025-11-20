import { openerService, type FileOpenerOptions } from "@/services/opener.service";
import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";
import { t } from "@/i18n/utils";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";

export default createFolderTreePlugin({
  addOptions() {
    return {
      unsubscribes: [] as (() => void)[],
    };
  },
  activate({ viewSystem, eventBus, serviceBus }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    const space = treeService.getSpace();
    const unsubscribes = this.options.unsubscribes || (this.options.unsubscribes = []);
    const registeredIds = new Set<string>();

    const registerOpenerMenu = (opener: FileOpenerOptions) => {
      if (!opener.showInTreeMenu) return;
      if (registeredIds.has(opener.id)) return;
      registeredIds.add(opener.id);

      const eventKey = `openWith:${opener.id}`;
      const label =
        t("tree.openWith", {
          name: opener.label || opener.id,
        }) || `Open with ${opener.label || opener.id}`;

      // Build a dynamic "when" expression so that the menu item only
      // appears for files whose name/path matches the opener's match rules
      // (string suffix patterns only; regex/function matchers are ignored).
      let when = "type === 'file'";
      if (Array.isArray(opener.match) && opener.match.length > 0) {
        if (typeof opener.match[0] === "string") {
          const suffixes = opener.match as string[];
          const conds = suffixes.map((suffix) => {
            const safeSuffix = suffix.replace(/"/g, '\\"');
            return `(name && name.endsWith("${safeSuffix}")) || (path && path.endsWith("${safeSuffix}"))`;
          });
          if (conds.length > 0) {
            when = `type === "file" && (${conds.join(" || ")})`;
          }
        }
      }

      viewSystem.addNodeMenuItems([
        {
          id: eventKey,
          key: eventKey,
          label,
          icon: opener.icon,
          group: "more",
          when,
          event: eventKey,
        },
      ]);

      const off = eventBus.on(eventKey, ({ node }: { node: FolderTreeNode }) => {
        openerService.openWith(space.id, node, opener.id);
      });
      unsubscribes.push(off);
    };

    // Register menus for already-registered openers.
    openerService.getOpeners().forEach(registerOpenerMenu);

    // Listen for future openers.
    const offSubscribe = openerService.subscribe((opener) => {
      registerOpenerMenu(opener);
    });
    unsubscribes.push(offSubscribe);
  },
  deactivate() {
    const unsubscribes = this.options.unsubscribes || [];
    for (const off of unsubscribes) {
      off();
    }
    this.options.unsubscribes = [];
  },
});
