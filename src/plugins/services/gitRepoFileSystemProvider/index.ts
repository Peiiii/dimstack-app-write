import { GitRepoFileSystemProvider } from "@/plugins/services/gitRepoFileSystemProvider/provider";
import { createGiteeClient } from "libs/gitee-api";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.fs.registerProvider(
      "git",
      new GitRepoFileSystemProvider(
        createGiteeClient({ accessToken: "" }),
        "peiiii",
        "docs"
      )
    );
  },
});
