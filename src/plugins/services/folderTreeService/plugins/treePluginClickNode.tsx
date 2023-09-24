import { FolderTreeNode } from '@/plugins/services/folderTreeService/types';
import { createTreePlugin } from '@/toolkit/components/tree/treePlugins';
import xbook from 'xbook';

export default createTreePlugin<FolderTreeNode>({
  activate(context) {
    const {
      eventBus,
      serviceBus,
      options: {
        space: { repo, owner, platform },
      },
    } = context;
    const spaceId = `${platform}:${owner}:${repo}`;
    eventBus.on("node::click", async ({ node }: { node: FolderTreeNode }) => {
      if (node.id === "root" || node.type === "dir") {
        return await serviceBus.invoke("refresh", node.id);
      } else {
        xbook.serviceBus.invoke("openerService.open", spaceId, node);
      }
    });
  },
});
