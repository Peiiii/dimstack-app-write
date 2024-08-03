import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { WidgetContext } from "@/toolkit/components/tree";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";

export const createTreeService = (
  context: WidgetContext<TreeDataNode<FolderTreeNode>>
) => {
  class TreeService {
    validateForEditingName = ({
      name: tryName,
      parentNode,
      node,
    }: {
      name: string;
      parentNode?: TreeDataNode<FolderTreeNode>;
      node: TreeDataNode<FolderTreeNode>;
    }) => {
      const result = {
        hasError: false,
        message: "",
      };
      if (parentNode) {
        const exist = parentNode.children?.find((n) => n.name === tryName);
        if (exist && exist.id !== node.id) {
          result.hasError = true;
          result.message = "名称已存在";
        } else {
          result.hasError = false;
        }
      }
      return result;
    };
  }
  return new TreeService();
};

export type ITreeService = ReturnType<typeof createTreeService>;
