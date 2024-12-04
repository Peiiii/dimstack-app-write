import { Tokens } from "@/constants/tokens";
import { GitRepoFileSystemProvider } from "@/services/gite-repo-file-system.provider";
import { IndexedDBFileSystemProvider } from "@/services/indexed-db-file-system.provider";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { createPlugin } from "xbook/common/createPlugin";
import { SpaceFileSystemProviderProxy } from "@/services/space-file-system-provider-proxy";

export const AddFileSystemProviderForEachSpace = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);

    spaceService.subscribeSpaces((spaces) => {
      spaces.forEach((space) => {
        let provider;
        
        if (space.platform === "idb") {
          provider = new IndexedDBFileSystemProvider();
        } else if (space.platform === "gitee") {
          provider = new GitRepoFileSystemProvider(
            createGiteeClient({
              getAccessToken: () =>
                authService.getAnyAuthInfo(space.platform, space.owner)
                  ?.accessToken,
            }),
            space.owner,
            space.repo
          );
        } else {
          provider = new GitRepoFileSystemProvider(
            createGithubClient({
              getAccessToken: () =>
                authService.getAnyAuthInfo(space.platform, space.owner)
                  ?.accessToken,
            }),
            space.owner,
            space.repo
          );
        }

        // 使用代理包装原始提供者
        const proxyProvider = new SpaceFileSystemProviderProxy(provider, space.id);
        
        xbook.fs.registerProvider({
          id: `space-${space.id}`,
          scheme: 'space',
          provider: proxyProvider,
          authority: space.id,
          options: { overwrite: true },
        });
      });
    });
  },
});
