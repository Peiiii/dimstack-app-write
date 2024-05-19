import { Tokens } from "@/constants/tokens";
import { appInfo } from "@/plugins/services/auth/providers/gitee/appInfo";
import {
  createGitRepoAuthProvider,
  createOAuthCallbackTask,
} from "@/plugins/services/auth/providers/utils/create-git-repo-auth-provider";
import {
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
    });
    const authProvider = createGitRepoAuthProvider({
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
