import { authService } from "@/services/auth.service";
import { appInfo } from "@/plugins/services/auth/providers/gitcode/appInfo";
import {
  createGitRepoAuthProvider,
  createOAuthCallbackTask,
} from "@/plugins/services/auth/providers/utils/create-git-repo-auth-provider";
import {
  createGitcodeClient,
  getGitcodeAccessToken,
  getGitcodeLoginUrl,
  refreshGitcodeAccessToken,
} from "libs/gitcode-api/gitcode-client";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    const callbackTask = createOAuthCallbackTask({
      platform: "gitcode",
      clientId: appInfo.clientId,
      clientSecret: appInfo.clientSecret,
      redirectUri: appInfo.redirectUri,
      createToken: getGitcodeAccessToken,
      fetchUserInfo: async ({ accessToken }) => {
        const client = createGitcodeClient({
          getAccessToken: () => accessToken,
        });
        const user = await client.User.getInfo();
        return {
          username: user.data?.name || user.data?.login,
        };
      },
    });

    const authProvider = createGitRepoAuthProvider({
      id: "gitcode",
      platform: "gitcode",
      callbackTaskName: callbackTask.name,
      refreshAccessToken: refreshGitcodeAccessToken,
      getLoginUrl: () => {
        return getGitcodeLoginUrl({
          clientId: appInfo.clientId,
          redirectUri: appInfo.redirectUri,
        });
      },
    });

    xbook.taskService.registerTaskType(callbackTask);
    authService.registerAuthProvider(authProvider);
  },
});

