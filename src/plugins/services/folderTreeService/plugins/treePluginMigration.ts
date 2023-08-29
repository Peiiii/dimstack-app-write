import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { nanoid } from "@reduxjs/toolkit";

export default createTreePlugin<FolderTreeNode>({
  activate({ dataStore }) {
    const rootNode = dataStore.getData();
    const fixId = (root) => {
      const cloned = { ...root };
      cloned.id = cloned.id || `node-${nanoid()}`;
      if (cloned.children && cloned.children.length) {
        cloned.children = cloned.children.map(fixId);
      }
      return cloned;
    };
    setTimeout(() => {
      dataStore.getActions().init(fixId(rootNode));
    }, 0);
  },
});
