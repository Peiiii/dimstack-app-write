import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";

export const createFolderTreePlugin = createTreeHelper<FolderTreeNode>().createPlugin;
