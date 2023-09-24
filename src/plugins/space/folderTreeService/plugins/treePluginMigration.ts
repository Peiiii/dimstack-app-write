import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { nanoid } from "@reduxjs/toolkit";

export default createTreePlugin<FolderTreeNode>({
  activate({ dataStore }) {
    const fixId = (root) => {
      const cloned = { ...root };
      cloned.id = cloned.id || `node-${nanoid()}`;
      if (cloned.children && cloned.children.length) {
        cloned.children = cloned.children.map(fixId);
      }
      if (cloned.id === "root") {
        cloned.path = "/";
        cloned.type = "dir";
      }
      return cloned;
    };
    setTimeout(() => {
      const rootNode = dataStore.getData();
      dataStore.getActions().init(fixId(rootNode));
      console.log("rootNode:", dataStore.getData());
    }, 0);
  },
});
