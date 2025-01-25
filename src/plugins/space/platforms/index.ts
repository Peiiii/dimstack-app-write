import { GitRepoFileSystemProvider } from "@/services/gite-repo-file-system.provider";
import { IndexedDBFileSystemProvider } from "@/services/indexed-db-file-system.provider";
import { spacePlatformRegistry } from "@/services/space-platform.registry";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { createPlugin } from "xbook/common/createPlugin";

export const platformsPlugin = createPlugin({
  initilize() {
    // 注册Gitee
    spacePlatformRegistry.register({
      id: "gitee",
      name: "Gitee",
      hostname: "gitee.com",
      getProvider: ({ accessToken, owner, repo }) =>
        new GitRepoFileSystemProvider(
          createGiteeClient({ getAccessToken: () => accessToken }),
          owner,
          repo
        ),
    });

    // 注册GitHub
    spacePlatformRegistry.register({
      id: "github",
      name: "GitHub",
      hostname: "github.com",
      getProvider: ({ accessToken, owner, repo }) =>
        new GitRepoFileSystemProvider(
          createGithubClient({ getAccessToken: () => accessToken }),
          owner,
          repo
        ),
    });

    // 注册IndexedDB
    spacePlatformRegistry.register({
      id: "idb",
      name: "Local Storage",
      getProvider: () => new IndexedDBFileSystemProvider(),
    });
  }
});
