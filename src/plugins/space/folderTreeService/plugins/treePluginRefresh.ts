import { fileSystemHelper } from "@/helpers/file-system.helper";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import xbook from "xbook/index";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({ serviceBus, dataStore, options: { space } }) {
    serviceBus.expose("refresh", async (id: string) => {
      const node = dataStore.getNode(id)!;
      const { owner, repo, platform } = space;
      const oldNode = dataStore.getNode(node.id)!;
      const info = await fileSystemHelper.service.readDirectory(
        fileSystemHelper.generateFileId(
          space.id,
          node.id === "root" ? "/" : node.path!
        )
      );
      console.log("info:", info);
      dataStore.getActions().update({
        node: {
          ...node,
          children: info
            .map((child) => ({
              ...oldNode.children?.find((c) => c.path == child.path),
              ...child,
            }))
            .map((child) => ({
              ...child,
              id: child.path,
            })),
        },
      });
      console.log("updatedData:", dataStore.getData());
      if (Math.random() > 0.9) {
        const spaceId = `${platform}:${owner}:${repo}`;
        xbook.serviceBus.invoke("spaceService.refreshAuth", spaceId);
      }
    });
  },
});
