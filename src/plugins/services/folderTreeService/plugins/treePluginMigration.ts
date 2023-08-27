import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { nanoid } from "@reduxjs/toolkit";

export default createTreePlugin({
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
    dataStore.getActions().init(fixId(rootNode));
  },
});
