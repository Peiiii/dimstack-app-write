import { type } from "os";

export type FolderTreeNode = {
  id: string;
  name: string;
  content?: string;
  type?: "file" | "dir";
  path?: string;
};
