

export enum TreeNodeTypeEnum {
  FILE  = "file",
  DIR = "dir"

}

export type FolderTreeNode = {
  id: string;
  name: string;
  content?: string;
  type?: "file" | "dir";
  path?: string;
};
