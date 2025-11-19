import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import {
  FilePlus,
  FolderPlus,
  FileText,
  FileCode,
  Pencil,
  Trash2,
  Copy,
  RefreshCw,
  Plus,
  Link,
} from "lucide-react";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({ viewSystem: { renderer } }) {
    renderer.register("AiOutlineLink", Link);
    renderer.register("AiOutlineFolderAdd", FolderPlus);
    renderer.register("AiOutlineFileAdd", FilePlus);
    renderer.register("AiOutlinePlus", Plus);
    renderer.register("AiFillFolderAdd", FolderPlus);
    renderer.register("AiFillFileAdd", FilePlus);
    renderer.register("AiFillEdit", Pencil);
    renderer.register("AiFillDelete", Trash2);
    // Markdown file icon (used for markdown-related openers)
    renderer.register("AiOutlineFileMarkdown", FileText);
    renderer.register("AiFillFileMarkdown", FileText);
    // Dedicated icon id for Monaco/code editor openers
    renderer.register("AiOutlineCodeEditor", FileCode);
    renderer.register("AiOutlineReload", RefreshCw);
    renderer.register("AiOutlineFileText", FileText);
    renderer.register("AiFillFileText", FileText);
  },
});
