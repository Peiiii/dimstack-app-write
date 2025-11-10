import { Tokens } from "@/constants/tokens";
import { SpaceFileSystemProviderProxy } from "@/services/space-file-system-provider-proxy";
import { spacePlatformRegistry } from "@/services/space-platform.registry";
import { spaceService } from "@/services/space.service";
import { authService } from "@/services/auth.service";
import { createPlugin } from "xbook/common/createPlugin";

export const AddFileSystemProviderForEachSpace = createPlugin({
  initilize(xbook) {
    // Use singleton services directly

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
