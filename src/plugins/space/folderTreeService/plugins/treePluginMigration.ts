import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { nanoid } from "@reduxjs/toolkit";
import { t } from "@/i18n/utils";

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
        cloned.name = t("common.file");
      }
      return cloned;
    };
    setTimeout(() => {
      const rootNode = dataStore.getData();
      dataStore.getActions().init(fixId(rootNode));
    }, 0);
  },
});
