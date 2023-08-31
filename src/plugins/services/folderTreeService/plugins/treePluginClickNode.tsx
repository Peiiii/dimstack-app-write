import Auth from "@/plugins/services/folderTreeService/components/Auth";
import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { DataStore } from "@/toolkit/common/dataStore";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { SpaceDef } from "@/toolkit/types/space";
import { createGiteeClient } from "libs/gitee-api";
import xbook from "xbook/index";
import { modalService } from "xbook/services";
export default createTreePlugin<FolderTreeNode>({
  activate(context) {
    const {
      eventBus,
      dataStore,
      options: {
        space: { repo, owner, platform },
      },
    } = context;

    eventBus.on("clickNode", async ({ node }: { node: FolderTreeNode }) => {
      const spaceId = `${platform}:${owner}:${repo}`;
      if (node.id === "root" || node.type === "dir") {
        const spaceStore = xbook.registry.get(
          "spaceStore"
        ) as DataStore<SpaceDef>;

        const space = spaceStore.getRecord(spaceId)!;
        if (!space.auth) {
          const modal = modalService.createModal({
            title: `登录 ${space.platform}`,
            content: <Auth spaceId={spaceId} />,
            footer: false,
          });
          modal.open();
        } else {
          const { access_token, refresh_token } = space.auth;
          const File = createGiteeClient({ accessToken: access_token }).File;
          const info = await File.getInfo({
            owner,
            repo,
            path: node.id === "root" ? "/" : node.path!,
          });
          dataStore.getActions().update({
            node: {
              ...node,
              children: info.data.map((child) => ({
                ...child,
                id: child.path,
              })),
            },
          });
          console.log("info:", info);
          // createGiteeFS({
          //   accessToken: access_token,
          //   owner: space.owner,
          //   repo: space.repo,
          //   refreshToken: refresh_token,
          // }).then(async ({ fsPromises: fs }) => {
          //   const children = fs.readdir("/");
          // });
        }
        // console.log("Space:", space);
      } else {
        xbook.serviceBus.invoke("openerService.open", spaceId, node);
      }
    });
  },
});
