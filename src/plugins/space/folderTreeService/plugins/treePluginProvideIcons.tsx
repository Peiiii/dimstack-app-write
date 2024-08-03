import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileAdd,
  AiFillFileMarkdown,
  AiFillFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFileMarkdown,
  AiOutlineFolderAdd,
  AiOutlineLink,
  AiOutlinePlus,
  AiOutlineReload,
} from "react-icons/ai";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({ viewSystem: { renderer } }) {
    renderer.register("AiOutlineLink", AiOutlineLink);
    renderer.register("AiOutlineFolderAdd", AiOutlineFolderAdd);
    renderer.register("AiOutlineFileAdd", AiOutlineFileAdd);
    renderer.register("AiOutlinePlus", AiOutlinePlus);
    renderer.register("AiFillFolderAdd", AiFillFolderAdd);
    renderer.register("AiFillFileAdd", AiFillFileAdd);
    renderer.register("AiFillEdit", AiFillEdit);
    renderer.register("AiFillDelete", AiFillDelete);
    renderer.register("AiOutlineFileMarkdown", AiOutlineFileMarkdown);
    renderer.register("AiFillFileMarkdown", AiFillFileMarkdown);
    renderer.register("AiOutlineReload", AiOutlineReload);
  },
});
