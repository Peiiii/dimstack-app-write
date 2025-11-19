import { openerService } from "@/services/opener.service";
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
    const { unsubscribes } = this.options;
    const registeredIds = new Set<string>();

    const registerOpenerMenu = (opener: {
      id: string;
      label?: string;
      icon?: string;
      showInTreeMenu?: boolean;
    }) => {
      if (!opener.showInTreeMenu) return;
      if (registeredIds.has(opener.id)) return;
      registeredIds.add(opener.id);

      const eventKey = `openWith:${opener.id}`;
      const label =
        t("tree.openWith", {
          name: opener.label || opener.id,
        }) || `Open with ${opener.label || opener.id}`;

      viewSystem.addNodeMenuItems([
        {
          id: eventKey,
          key: eventKey,
          label,
          icon: opener.icon,
          group: "more",
          when: "type === 'file'",
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
    for (const off of this.options.unsubscribes) {
      off();
    }
    this.options.unsubscribes = [];
  },
});
