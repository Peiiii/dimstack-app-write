import { ITreeService } from "@/plugins/space/folderTreeService/services/tree.service";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { typedKey } from "@/toolkit/utils/typedKey";

export const TreeEventKeys = {
  NodeContentLoaded: "NodeContentLoaded",
  TreeOpened: "TreeOpened",
  NodeClick: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event?: React.MouseEvent<HTMLDivElement>;
  }>("node::click"),
  AddMarkdownAt: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
  }>("addMarkdownAt"),
  AddFileAt: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    documentType?: string;
  }>("addFileAt"),
  AddFolderAt: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
  }>("addFolderAt"),
  DeleteNode: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event: Event;
  }>("deleteNode"),
  EditNode: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event: Event;
  }>("editNode"),
  EditBlur: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event: React.KeyboardEvent<HTMLInputElement>;
    parentNode?: TreeDataNode<FolderTreeNode>;
  }>("editBlur"),
  EditKeyEnter: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event: React.KeyboardEvent<HTMLInputElement>;
    parentNode?: TreeDataNode<FolderTreeNode>;
  }>("editKeyEnter"),
  EditChange: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event: React.KeyboardEvent<HTMLInputElement>;
    parentNode?: TreeDataNode<FolderTreeNode>;
  }>("editProgress"),
  EditWillFinish: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    name: string;
    parentNode?: TreeDataNode<FolderTreeNode>;
  }>("editWillFinish"),
  RefreshNode: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
  }>("refreshNode"),
  KeydownEnter: typedKey<{
    node: TreeDataNode<FolderTreeNode>;
    event: React.KeyboardEvent<HTMLInputElement>;
  }>("keydownEnter"),
};

export const ServicePoints = {
  TreeService: typedKey<ITreeService>("treeService"),
  EditInputNodeName: typedKey<
    [
      [
        {
          parentId: string;
          defaultName?: string;
          callback: (name: string) => void;
          nodeType: TreeNodeTypeEnum;
          validate?: () => boolean;
        }
      ],
      void
    ]
  >("edit.inputNodeName"),
  RefershNode: typedKey<[[string], void]>("refreshNode"),
};

export const HookPoints = {
  FilterNodes:
    typedKey<
      (nodes: TreeDataNode<FolderTreeNode>[]) => TreeDataNode<FolderTreeNode>[]
    >("filterNodes"),
};

export enum TreeNodeTypeEnum {
  File = "file",
  Dir = "dir",
}

export enum DocumentTypeEnum {
  PlainText = "plainText",
  Markdown = "markdown",
}
