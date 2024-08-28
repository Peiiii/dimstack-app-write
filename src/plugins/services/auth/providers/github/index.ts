import { Tokens } from "@/constants/tokens";
import { appInfo } from "@/plugins/services/auth/providers/github/appInfo";
import {
  createGitRepoAuthProvider,
  createOAuthCallbackTask,
} from "@/plugins/services/auth/providers/utils/create-git-repo-auth-provider";
import {
  createGithubClient,
  getGithubAccessToken,
  getGithubLoginUrl,
  getGithubRepositoryId,
  refreshGithubAccessToken,
} from "libs/github-api";
import { OAuthApp } from "octokit";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    const callbackTask = createOAuthCallbackTask({
      platform: "github",
      clientId: appInfo.clientId,
      clientSecret: appInfo.clientSecret,
      redirectUri: appInfo.redirectUri,
      createToken: async (params) => {
        const { clientId, clientSecret } = params;

        const app = new OAuthApp({
          clientId,
          clientSecret,
        });

        const repo = localStorage.getItem("authRepo")!;
        const owner = localStorage.getItem("authOwner")!;

        // const info = await app.octokit.rest.repos.get({
        //   owner,
        //   repo,
        // });
        // const repoId = await getGithubRepositoryId(owner, repo);

        return getGithubAccessToken({
          ...params,
          // repository_id: repoId,
        });
      },
      fetchUserInfo: async ({ accessToken }) => {
        const client = createGithubClient({
          getAccessToken: () => accessToken,
        });
        const user = await client.User.getInfo();
        return {
          username: user.data?.name,
          response: user,
        };
      },
    });
    const authProvider = createGitRepoAuthProvider({
      id: "github",
      platform: "github",
      callbackTaskName: callbackTask.name,
      refreshAccessToken: refreshGithubAccessToken,
      getLoginUrl: () => {
        return getGithubLoginUrl({
          clientId: appInfo.clientId,
          redirectUri: appInfo.redirectUri,
        });
      },
    });
    xbook.taskService.registerTaskType(callbackTask);
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
    authService.registerAuthProvider(authProvider);
  },
});
