import { fileSystemHelper } from "@/helpers/file-system.helper";
import { spaceHelper } from "@/helpers/space.helper";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import {
  createTreeHelper,
  createTreePlugin,
  getCreateTreePlugin,
} from "@/toolkit/components/tree/treePlugins";
import { space } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { join } from "path-browserify";
import {
  AiFillFileAdd,
  AiFillFolderAdd,
  AiFillPlusCircle,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
} from "react-icons/ai";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
export default createTreeHelper<FolderTreeNode>().createPlugin({
  addOptions() {
    return {
      addable: ({ node }) => {
        return node.type === "dir";
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
        id: "addNode",
        name: "新建文件夹",
        title: "新建文件夹",
        event: "addFolderAt",
        validate: ({ node }) => {
          return node.type === "dir";
        },
        // icon: <VscNewFolder />,
        icon: <AiFillFolderAdd />,
      },
      {
        id: "addFile",
        name: "新建文件",
        title: "新建文件",
        event: "addFileAt",
        validate: ({ node }) => {
          return node.type === "dir";
        },
        // icon: <VscNewFile />,
        icon: <AiFillFileAdd />,
      },
    ]);

    eventBus.on("addFileAt", ({ node }) => {
      const parentId = node.id;
      const parentNode = dataStore.getNode(parentId)!;
      const space = spaceHelper.getStore().getRecord(spaceId)!;
      // console.log("space:",space,"spaces:",spaceHelper.getStore().getData())
      console.log("[addFileAt] parentId:", parentId);
      const childId = nanoid();
      serviceBus.invoke("edit.inputNodeName", {
        parentId,
        nodeType: "file",
        callback: async (name: string) => {
          console.log("[afterInputNodeName]");
          const path = join(parentNode.path!, name);
          await fileSystemHelper.service.createFile(
            fileSystemHelper.generateFileId(space?.id, path),
            "# "
          );
          dataStore.getActions().add({
            node: { id: childId, type: "file", path, name },
            parentId,
          });
        },
      });
    });
    eventBus.on("addFolderAt", ({ node }) => {
      const parentId = node.id;
      const parentNode = dataStore.getNode(parentId)!;
      const space = spaceHelper.getStore().getRecord(spaceId)!;
      // console.log("space:",space,"spaces:",spaceHelper.getStore().getData())
      console.log("[addFileAt] parentId:", parentId);
      const childId = nanoid();
      serviceBus.invoke("edit.inputNodeName", {
        parentId,
        nodeType: "dir",
        callback: async (name: string) => {
          console.log("[afterInputNodeName]");
          const path = join(parentNode.path!, name);
          await fileSystemHelper.service.createDirectory(
            fileSystemHelper.generateFileId(space?.id, path)
          );
          dataStore.getActions().add({
            node: { id: childId, type: "dir", path, name, children: [] },
            parentId,
          });
        },
      });
    });
  },
});
