import { spaceHelper } from "@/helpers/space.helper";
import {
  DocumentTypeEnum,
  ServicePoints,
  TreeEventKeys,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { joinPath } from "@/toolkit/utils/path";
import { nanoid } from "@reduxjs/toolkit";
import { fs } from "xbook/services";

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
        name: "新建文件",
        label: "新建文件",
        event: TreeEventKeys.AddFileAt.name,
        when: "type === 'dir'",
        icon: "AiFillFileAdd",
        group: "add",
      },
      {
        id: "addNode",
        key: "addNode",
        name: "新建文件夹",
        label: "新建文件夹",
        event: TreeEventKeys.AddFolderAt.name,
        when: "type === 'dir'",
        icon: "AiFillFolderAdd",
        group: "add",
      },
      // 新建markdown文档
      {
        id: "addMarkdownDocumnet",
        key: "addMarkdownDocumnet",
        label: "新建 Markdown 文档",
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
      serviceBus.invoke(ServicePoints.EditInputNodeName, {
        parentId,
        defaultName:
          documentType === DocumentTypeEnum.Markdown ? "Untitled.md" : "",
        nodeType: TreeNodeTypeEnum.File,
        callback: async (name: string) => {
          const path = joinPath(parentNode.path!, name);
          await fs.writeFile(
            spaceHelper.getUri(space?.id, path),
            new TextEncoder().encode("# "),
            {
              create: true,
              overwrite: true,
            }
          );
          const childNode = {
            id: childId,
            type: TreeNodeTypeEnum.File,
            path,
            name,
          };
          dataStore.getActions().add({
            node: childNode,
            parentId,
          });
          eventBus.emit(TreeEventKeys.NodeClick, { node: childNode });
        },
      });
    });
    eventBus.on(TreeEventKeys.AddFolderAt, ({ node }) => {
      const parentId = node.id;
      const parentNode = dataStore.getNode(parentId)!;
      const space = spaceHelper.getStore().getRecord(spaceId)!;
            const childId = nanoid();
      serviceBus.invoke(ServicePoints.EditInputNodeName, {
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
