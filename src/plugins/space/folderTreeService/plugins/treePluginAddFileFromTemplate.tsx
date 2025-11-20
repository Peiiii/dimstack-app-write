import { openerService } from "@/services/opener.service";
import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import { TreeEventKeys, TreeNodeTypeEnum, TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { joinPath } from "@/toolkit/utils/path";
import { nanoid } from "@reduxjs/toolkit";
import { fs } from "xbook/services";
import { spaceHelper } from "@/helpers/space.helper";
import xbook from "xbook/index";

export default createFolderTreePlugin({
  addOptions() {
    return {
      unsubscribes: [] as (() => void)[],
    };
  },
  activate({ viewSystem, eventBus, dataStore, serviceBus }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    const space = treeService.getSpace();
    const unsubscribes =
      this.options.unsubscribes || (this.options.unsubscribes = []);

    const templateHandlers = new Map<
      string,
      {
        openerId: string;
        template: {
          id: string;
          label: string;
          defaultFileName: string;
          initialContent?: unknown;
          icon?: string;
        };
      }
    >();

    const registerTemplateMenu = (opener: {
      id: string;
      templates?: {
        id: string;
        label: string;
        defaultFileName: string;
        initialContent?: unknown;
        icon?: string;
      }[];
    }) => {
      if (!opener.templates || opener.templates.length === 0) return;

      for (const tpl of opener.templates) {
        const eventKey = `addFileWithTemplate:${opener.id}:${tpl.id}`;
        if (templateHandlers.has(eventKey)) continue;

        templateHandlers.set(eventKey, {
          openerId: opener.id,
          template: tpl,
        });

        viewSystem.addNodeMenuItems([
          {
            id: eventKey,
            key: eventKey,
            label: tpl.label,
            icon: tpl.icon,
            group: "add",
            when: "type === 'dir'",
            event: eventKey,
          },
        ]);

        const off = eventBus.on(eventKey, async ({ node }: { node: FolderTreeNode }) => {
          const handler = templateHandlers.get(eventKey);
          if (!handler) return;
          const { template } = handler;

          const parentId = node.id;
          const parentNode = dataStore.getNode(parentId)!;
          const spaceDef = space;

          const childId = nanoid();

          serviceBus.invoke(TreeServicePoints.EditInputNodeName, {
            parentId,
            defaultName: template.defaultFileName,
            nodeType: TreeNodeTypeEnum.File,
            callback: async (name: string) => {
              const path = joinPath(parentNode.path!, name);
              const childNode: FolderTreeNode = {
                id: childId,
                type: TreeNodeTypeEnum.File,
                path,
                name,
              };

              // Add node with loading state
              dataStore.getActions().add({
                node: { ...childNode, loading: true } as any,
                parentId,
              });

              try {
                let content: string | Uint8Array = "";
                if (typeof template.initialContent === "function") {
                  const result = await (template.initialContent as (
                    () => string | Uint8Array | Promise<string | Uint8Array>
                  ))();
                  content = result as any;
                } else if (template.initialContent != null) {
                  content = template.initialContent as any;
                }

                let bytes: Uint8Array;
                if (content instanceof Uint8Array) {
                  bytes = content;
                } else {
                  bytes = new TextEncoder().encode(
                    typeof content === "string" ? content : ""
                  );
                }

                await fs.writeFile(
                  spaceHelper.getUri(spaceDef.id, path),
                  bytes,
                  {
                    create: true,
                    overwrite: true,
                  }
                );

                // Update node to remove loading
                dataStore.getActions().update({
                  node: childNode,
                });

                // Auto-open the newly created file
                eventBus.emit(TreeEventKeys.NodeClick, {
                  node: childNode,
                });
              } catch (error) {
                // Clean up node on error
                dataStore.getActions().delete({ id: childId });
                xbook.notificationService.error(
                  "Failed to create file from template"
                );
              }
            },
          });
        });

        unsubscribes.push(off);
      }
    };

    // Register menus for existing openers with templates.
    openerService.getOpeners().forEach(registerTemplateMenu);

    // Subscribe to future openers.
    const offSubscribe = openerService.subscribe((opener) => {
      registerTemplateMenu(opener);
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
