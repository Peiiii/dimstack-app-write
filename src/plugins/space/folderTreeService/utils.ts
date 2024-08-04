import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";


export const getNodeType = (node: FolderTreeNode) => {
  // if (node.id === "root" || !/.+\/.+/.test(node.id)) return "dir";
  if (node.id === "root") return "dir";
  else return node.type!;
};

export const getNodeFileType = (_) => {
  // if (!node.id) return "dir";
  // if (!/.+\/.+/.test(node.id)) "dir";
  // else return "file";
  return "file";
};
