import { Tokens } from "@/constants/tokens";
import { appInfo } from "@/plugins/services/auth/providers/gitee/appInfo";
import {
  createGitRepoAuthProvider,
  createOAuthCallbackTask,
} from "@/plugins/services/auth/providers/utils/create-git-repo-auth-provider";
import {
  createGiteeClient,
  getGiteeAccessToken,
  getGiteeLoginUrl,
  refreshGiteeAccessToken,
} from "libs/gitee-api";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    const callbackTask = createOAuthCallbackTask({
      platform: "gitee",
      clientId: appInfo.clientId,
      clientSecret: appInfo.clientSecret,
      redirectUri: appInfo.redirectUri,
      createToken: getGiteeAccessToken,
      fetchUserInfo: async ({ accessToken }) => {
        const client = createGiteeClient({
          getAccessToken: () => accessToken,
        });
        const user = await client.User.getInfo();
        console.log("user", user);

        return {
          username: user.data?.name,
          response: user,
        };
      },
    });
    const authProvider = createGitRepoAuthProvider({
      id: "gitee",
      platform: "gitee",
      callbackTaskName: callbackTask.name,
      refreshAccessToken: refreshGiteeAccessToken,
      getLoginUrl: () => {
        return getGiteeLoginUrl({
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
