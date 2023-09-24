import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";

export default createTreePlugin<FolderTreeNode>({
  addOptions() {
    return {
      rootId: "root",
    };
  },
  activate({ viewSystem }) {
    viewSystem.viewStateStore
      .getActions()
      .upsert(
        viewSystem.getDefaultViewState(
          { id: this.options.rootId },
          { expanded: true }
        )
      );
  },
});
