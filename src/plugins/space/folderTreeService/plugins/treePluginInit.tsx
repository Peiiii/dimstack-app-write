import { TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";

export default createTreePlugin<FolderTreeNode>({
  activate({ serviceBus }) {
    serviceBus.invoke(TreeServicePoints.RefershNode, "root");
  },
});
