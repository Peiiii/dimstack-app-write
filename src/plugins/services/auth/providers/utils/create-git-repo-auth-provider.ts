import { Tokens } from "@/constants/tokens";
import { IAuthProvider } from "@/services/auth.service.interface";
import { GithubAuthInfo } from "libs/github-api";
import history from "xbook/common/history";
import xbook from "xbook/index";

export const createOAuthCallbackTask = ({
  platform,
  createToken,
  clientId,
  clientSecret,
  redirectUri,
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
    repo: string;
  }) => Promise<GithubAuthInfo>;
}) => {
  const CheckAuthCodeAndNext = {
    name: "CheckAuthCodeAndNext:" + platform,
    execute(taskData: { platform: string; username: string }): void {
      const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
      const { platform, username } = taskData;
      const code = history.location.query["code"];
      const codePlatform = history.location.query["platform"];
      const repo = localStorage.getItem("authRepo");
      if (code && platform === codePlatform && repo) {
        createToken({
          clientId,
          clientSecret,
          redirectUri,
          code: code,
          repo,
        }).then((auth) => {
          if (auth) {
            authService.saveAuthInfo({
              platform,
              username,
              accessToken: auth.access_token,
              refreshToken: auth.refresh_token,
              expirationTime: auth.expires_in,
              refreshExpirationTime: auth.refresh_token_expires_in,
              createdAt: auth.created_at || Math.ceil(Date.now() / 1000),
              scope: auth.scope,
              tokenType: auth.token_type,
            });
          }
        });
        const newQuery = { ...history.location.query };
        delete newQuery["code"];
        history.push(
          history.createHref({
            pathname: history.location.pathname,
            query: newQuery,
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
}: {
  platform: string;
  refreshAccessToken: (params: {
    refreshToken: string;
  }) => Promise<GithubAuthInfo>;
  getLoginUrl(): string;
  callbackTaskName: string;
}) => {
  const authProvider: IAuthProvider = {
    platform,
    refresh: async (params: {
      platform: string;
      username: string;
      refreshToken: string;
    }) => {
      const { platform, username, refreshToken } = params;
      const auth = await refreshAccessToken({ refreshToken });
      const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
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
    authenticate: async (username: string, repo: string) => {
      // 弹窗询问用户是否确定跳转到对应平台的登录页面
      const userConfirmation = await xbook.modalService.confirm({
        title: "即将跳转",
        description: `是否确定跳转到${platform}登录页面？`,
      });
      if (!userConfirmation) {
        return; // 用户取消认证
      }
      localStorage.setItem("authRepo", repo);
      localStorage.setItem("authOwner", username);

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
      console.log("url to redirect: " + url);
      window.open(url, "_self");
    },
  };
  return authProvider;
};
