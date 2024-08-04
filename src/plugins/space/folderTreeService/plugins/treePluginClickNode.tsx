import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import {
  ServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import xbook from "xbook";

export default createTreePlugin<FolderTreeNode>({
  activate(context) {
    const {
      eventBus,
      serviceBus,
      options: {
        space: { repo, owner, platform },
      },
    } = context;
    const spaceId = spaceHelper.generateSpaceId(platform, owner, repo);
    eventBus.on(
      TreeEventKeys.NodeClick,
      async ({ node }: { node: FolderTreeNode }) => {
        if (node.id === "root" || node.type === "dir") {
          return await serviceBus.invoke(ServicePoints.RefershNode, node.id);
        } else {
          const openerService = xbook.serviceBus.createProxy(
            Tokens.OpenerService
          );
          openerService.open(spaceId, node);
        }
      }
    );
  },
});
