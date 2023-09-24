import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import xbook from "xbook";
export default createTreeHelper<FolderTreeNode>().createPlugin({
  addOptions() {
    return {
      interval: null as never as ReturnType<typeof setInterval>,
    };
  },
  activate({ options: { space } }) {
    const checkSpace = async () => {
      const status = await xbook.serviceBus.invoke(
        "spaceService.refreshAuth",
        space.id
      );
      xbook.pipeService.emit(`space[${space.id}].isLogin`, status);
    };
    this.options.interval = setInterval(checkSpace, 1000 * 60 * 10);
    setTimeout(() => {
      checkSpace();
    }, 3000);
  },
  deactivate() {
    clearInterval(this.options.interval);
  },
});
