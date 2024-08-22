import { Tokens } from "@/constants/tokens";
import { GitRepoFileSystemProvider } from "@/services/gite-repo-file-system.provider";
import { IndexedDBFileSystemProvider } from "@/services/indexed-db-file-system.provider";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { createPlugin } from "xbook/common/createPlugin";

export const AddFileSystemProviderForEachSpace = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
    spaceService.subscribeSpaces((spaces) => {
      spaces.forEach((space) => {
        if (space.platform === "idb") {
          xbook.fs.registerProvider(
            space.id,
            space.id,
            new IndexedDBFileSystemProvider(),
            { overwrite: true }
          );
        } else if (space.platform === "gitee") {
          xbook.fs.registerProvider(
            space.id,
            space.id,
            new GitRepoFileSystemProvider(
              createGiteeClient({
                getAccessToken: () =>
                  authService.getAnyAuthInfo(space.platform, space.owner)
                    ?.accessToken,
              }),
              space.owner,
              space.repo
            ),
            { overwrite: true }
          );
        } else {
          xbook.fs.registerProvider(
            space.id,
            space.id,
            new GitRepoFileSystemProvider(
              createGithubClient({
                getAccessToken: () =>
                  authService.getAnyAuthInfo(space.platform, space.owner)
                    ?.accessToken,
              }),
              space.owner,
              space.repo
            ),
            { overwrite: true }
          );
        }
      });
    });
  },
});
