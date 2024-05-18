import { Tokens } from "@/constants/tokens";
import { GitRepoFileSystemProvider } from "@/services/gite-repo-file-system.provider";
import { createGiteeClient } from "libs/gitee-api";
import { createPlugin } from "xbook/common/createPlugin";

export const AddFileSystemProviderForEachSpace = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
    spaceService.subscribeSpaces((spaces) => {
      spaces.forEach((space) => {
        xbook.fs.registerProvider(
          space.id,
          space.id,
          new GitRepoFileSystemProvider(
            createGiteeClient({
              accessToken: authService.getAnyAuthInfo(space.platform, space.owner)
                ?.accessToken,
            }),
            space.owner,
            space.repo
          ),
          { overwrite: true }
        );
      });
    });
  },
});
