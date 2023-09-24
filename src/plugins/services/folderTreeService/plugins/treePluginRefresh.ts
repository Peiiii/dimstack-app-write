import { spaceHelper } from "@/helpers/space.helper";
import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { createGiteeClient, refreshAccessToken } from "libs/gitee-api";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({ serviceBus, dataStore, options: { space } }) {
    serviceBus.expose("refresh", async (id: string) => {
      const node = dataStore.getNode(id)!;
      const { access_token, refresh_token } = space.auth || {};
      const { owner, repo, platform } = space;
      const File = createGiteeClient({ accessToken: access_token }).File;
      const info = await File.getInfo({
        owner,
        repo,
        path: node.id === "root" ? "/" : node.path!,
      });
      const oldNode = dataStore.getNode(node.id)!;
      console.log("info:", info);
      dataStore.getActions().update({
        node: {
          ...node,
          children: info.data
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
        const spaceStore = spaceHelper.getStore();
        console.log(spaceStore.getData()[0]);
        const res = await refreshAccessToken({ refreshToken: refresh_token });
        console.log("res:", res);
        spaceStore.getActions().update({ id: spaceId, auth: res });
        console.log(spaceStore.getData()[0]);
      }
    });
  },
});
