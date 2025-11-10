import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { spaceService } from "@/services/space.service";
export default createTreeHelper<FolderTreeNode>().createPlugin({
  addOptions() {
    return {
      interval: null as never as ReturnType<typeof setInterval>,
    };
  },
  activate({ options: { space } }) {
    // Periodically refresh auth for the current space.
    // Emitters/bus are unnecessary here; `spaceService.refreshAuth` updates state internally.
    const checkSpace = async () => {
      await spaceService.refreshAuth(space.id);
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
