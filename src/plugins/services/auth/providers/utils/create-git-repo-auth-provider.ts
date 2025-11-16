import { authService } from "@/services/auth.service";
import { IAuthProvider } from "@/services/auth.service.interface";
import { updateSearchParams } from "@/toolkit/utils/url";
import { GithubAuthInfo } from "libs/github-api";
import history from "xbook/common/history";
import xbook from "xbook/index";

export interface IUser {
  username: string;
}
export const createOAuthCallbackTask = ({
  platform,
  createToken,
  clientId,
  clientSecret,
  redirectUri,
  fetchUserInfo,
}: {
  platform: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  createToken: (params: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    code: string;
    // repo: string;
  }) => Promise<GithubAuthInfo>;
  fetchUserInfo?: (params: { accessToken: string }) => Promise<IUser>;
}) => {
  const CheckAuthCodeAndNext = {
    name: "CheckAuthCodeAndNext:" + platform,
    execute(taskData: { platform: string; username: string }): void {
      const { platform, username } = taskData;
      const code = history.location.query["code"];
      const codePlatform = history.location.query["platform"];
      // const repo = localStorage.getItem("authRepo");
      if (code && platform === codePlatform) {
        createToken({
          clientId,
          clientSecret,
          redirectUri,
          code: code,
          // repo,
        }).then(async (auth) => {
          let fetchedUsername;
          if (fetchUserInfo) {
            const user = await fetchUserInfo({
              accessToken: auth.access_token,
            });
            if (user) {
              fetchedUsername = user.username;
            }
          }
          if (auth) {
            authService.saveAuthInfo({
              platform,
              username: fetchedUsername || username,
              accessToken: auth.access_token,
              refreshToken: auth.refresh_token,
              expirationTime: auth.expires_in,
              refreshTokenExpirationTime: auth.refresh_token_expires_in,
              createdAt: auth.created_at || Math.ceil(Date.now() / 1000),
              scope: auth.scope,
              tokenType: auth.token_type,
            });
          }
        });
        const newQuery = { ...history.location.query };
        delete newQuery["code"];
        history.push(
          updateSearchParams(location.href, {
            code: null,
            platform: null,
          })
        );
      }
    },
  };

  return CheckAuthCodeAndNext;
};
export const createGitRepoAuthProvider = ({
  platform,
  refreshAccessToken,
  getLoginUrl,
  callbackTaskName,
  id,
  title,
  description,
}: {
  platform: string;
  refreshAccessToken: (params: {
    refreshToken: string;
  }) => Promise<GithubAuthInfo>;
  getLoginUrl(): string;
  callbackTaskName: string;
  id: string;
  title?: string;
  description?: string;
}) => {
  const authProvider: IAuthProvider = {
    platform,
    id,
    title,
    description,
    refresh: async (params: {
      platform: string;
      username: string;
      refreshToken: string;
    }) => {
      const { platform, username, refreshToken } = params;
      const auth = await refreshAccessToken({ refreshToken });
      authService.saveAuthInfo({
        platform,
        username,
        accessToken: auth.access_token,
        refreshToken: auth.refresh_token,
        expirationTime: auth.expires_in,
        refreshTokenExpirationTime: auth.refresh_token_expires_in,
        createdAt: auth.created_at,
        scope: auth.scope,
        tokenType: auth.token_type,
      });
    },
    getLoginUrl,
    authenticate: async (options) => {
      // 弹窗询问用户是否确定跳转到对应平台的登录页面
      const { username, repo, needConfirm } = options || {};
      if (needConfirm) {
        const { t } = await import("@/i18n/utils").then(m => ({ t: m.t }));
        const userConfirmation = await xbook.modalService.confirm({
          title: t("auth.redirecting"),
          description: t("auth.confirmRedirect", { platform }),
        });
        if (!userConfirmation) {
          return; // 用户取消认证
        }
      }
      localStorage.setItem("authRepo", repo || "");
      localStorage.setItem("authOwner", username || "");

      // 执行其他认证流程，例如调用认证服务进行验证等
      // ...

      // 向任务管理器添加一个类型为检查地址栏code并获取认证信息的任务
      xbook.taskService.addTask(
        callbackTaskName,
        {
          platform,
          username,
        },
        {
          deffered: true,
        }
      );
      //   const url = getLoginUrl({
      //     redirectUri: appInfo.redirectUri,
      //     clientId: appInfo.clientId,
      //   });
      const url = getLoginUrl();
      window.open(url, "_self");
    },
  };
  return authProvider;
};
