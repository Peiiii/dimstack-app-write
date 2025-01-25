import { Tokens } from "@/constants/tokens";
import { GitRepoFileSystemProvider } from "@/services/gite-repo-file-system.provider";
import { IndexedDBFileSystemProvider } from "@/services/indexed-db-file-system.provider";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { createPlugin } from "xbook/common/createPlugin";
import { SpaceFileSystemProviderProxy } from "@/services/space-file-system-provider-proxy";
import { spacePlatformRegistry } from "@/services/space-platform.registry";

export const AddFileSystemProviderForEachSpace = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);

    spaceService.subscribeSpaces((spaces) => {
      spaces.forEach((space) => {
        const platform = spacePlatformRegistry.getPlatform(space.platform);
        if (!platform) return;

        const provider = platform.getProvider({
          accessToken: authService.getAnyAuthInfo(space.platform, space.owner)?.accessToken,
          owner: space.owner,
          repo: space.repo,
        });

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
