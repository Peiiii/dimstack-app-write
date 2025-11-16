import { spaceHelper } from "@/helpers/space.helper";
import {
  DocumentTypeEnum,
  TreeServicePoints,
  TreeEventKeys,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { joinPath } from "@/toolkit/utils/path";
import { nanoid } from "@reduxjs/toolkit";
import xbook from "xbook/index";
import { fs } from "xbook/services";
import { t } from "@/i18n/utils";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  addOptions() {
    return {
      addable: ({ node }) => {
        return node.type === TreeNodeTypeEnum.Dir;
      },
    };
  },
  activate({
    viewSystem,
    eventBus,
    dataStore,
    serviceBus,
    options: {
      space: { id: spaceId },
    },
  }) {
    viewSystem.addNodeMenuItems([
      {
        id: "addFile",
        key: "addFile",
        name: t("tree.newFile"),
        label: t("tree.newFile"),
        event: TreeEventKeys.AddFileAt.name,
        when: "type === 'dir'",
        icon: "AiFillFileAdd",
        group: "add",
      },
      {
        id: "addNode",
        key: "addNode",
        name: t("tree.newFolder"),
        label: t("tree.newFolder"),
        event: TreeEventKeys.AddFolderAt.name,
        when: "type === 'dir'",
        icon: "AiFillFolderAdd",
        group: "add",
      },
      {
        id: "addMarkdownDocumnet",
        key: "addMarkdownDocumnet",
        label: t("tree.newMarkdown"),
        event: TreeEventKeys.AddMarkdownAt.name,
        when: "type === 'dir'",
        icon: "AiFillFileMarkdown",
        group: "add",
      },
    ]);

    eventBus.on(TreeEventKeys.AddMarkdownAt, ({ node }) => {
      eventBus.emit(TreeEventKeys.AddFileAt, {
        node,
        documentType: DocumentTypeEnum.Markdown,
      });
    });

    eventBus.on(TreeEventKeys.AddFileAt, ({ node, documentType }) => {
      const parentId = node.id;
      const parentNode = dataStore.getNode(parentId)!;
      const space = spaceHelper.getStore().getRecord(spaceId)!;
      const childId = nanoid();
      serviceBus.invoke(TreeServicePoints.EditInputNodeName, {
        parentId,
        defaultName: documentType === DocumentTypeEnum.Markdown ? "Untitled.md" : "",
        nodeType: TreeNodeTypeEnum.File,
        callback: async (name: string) => {
          const path = joinPath(parentNode.path!, name);
          const childNode = {
            id: childId,
            type: TreeNodeTypeEnum.File,
            path,
            name,
          };
          
          // Add the node with loading state
          dataStore.getActions().add({
            node: { ...childNode, loading: true },
            parentId,
          });

          try {
            console.log("writeFile", spaceHelper.getUri(space?.id, path));
            await fs.writeFile(
              spaceHelper.getUri(space?.id, path),
              new TextEncoder().encode("# "),
              {
                create: true,
                overwrite: true,
              }
            );

            console.log("writeFile success");
            // Update the node to remove loading state
            dataStore.getActions().update({
              node: childNode,
            });

            console.log("emit NodeClick");
            eventBus.emit(TreeEventKeys.NodeClick, { node: childNode });
          } catch (error) {
            // If there's an error, remove the node
            dataStore.getActions().delete({ id: childId });
            xbook.notificationService.error("Failed to create file");
          }
        },
      });
    });
    eventBus.on(TreeEventKeys.AddFolderAt, ({ node }) => {
      const parentId = node.id;
      const parentNode = dataStore.getNode(parentId)!;
      const space = spaceHelper.getStore().getRecord(spaceId)!;
            const childId = nanoid();
      serviceBus.invoke(TreeServicePoints.EditInputNodeName, {
        parentId,
        nodeType: TreeNodeTypeEnum.Dir,
        callback: async (name: string) => {
          const path = joinPath(parentNode.path!, name);
          await fs.createDirectory(spaceHelper.getUri(space?.id, path));
          dataStore.getActions().add({
            node: {
              id: childId,
              type: TreeNodeTypeEnum.Dir,
              path,
              name,
              children: [],
            },
            parentId,
          });
        },
      });
    });
  },
});
