import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";

export default createTreePlugin<FolderTreeNode>({
  activate({ options }) {
    const { owner, repo } = options;
  },
});
