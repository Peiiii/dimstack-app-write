import { fileSystemHelper } from "@/helpers/file-system.helper";
import { spaceHelper } from "@/helpers/space.helper";
import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import {
  createTreeHelper,
  createTreePlugin,
  getCreateTreePlugin,
} from "@/toolkit/components/tree/treePlugins";
import { space } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { AiFillPlusCircle } from "react-icons/ai";
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
        name: "添加",
        title: "添加",
        event: "addNodeAt",
        validate: (context) => {
          return this.options.addable(context);
        },
        icon: <AiFillPlusCircle />,
      },
    ]);
    eventBus.on("addNodeAt", ({ node, event }) => {
      // event.preventDefault();
      // event.stopPropagation();
      const parentId = node.id;
      const parentNode = dataStore.getNode(parentId)!;
      const space = spaceHelper.getStore().getRecord(spaceId)!;
      // console.log("space:",space,"spaces:",spaceHelper.getStore().getData())
      console.log("[addNodeAt] parentId:",parentId)
      const childId = nanoid();
      serviceBus.invoke("edit.inputNodeName",parentId, async (name: string) => {
        console.log("[afterInputNodeName]")
        const path = parentNode.path + "/" + name;
        await fileSystemHelper.service.createFile(
          fileSystemHelper.generateFileId(space?.id, path),"# "
        );
        dataStore.getActions().add({
          node: { id: childId, type: "file", name },
          parentId,
        });
      });
    });
  },
});
