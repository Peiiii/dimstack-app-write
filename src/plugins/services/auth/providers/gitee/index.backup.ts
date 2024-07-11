import { Tokens } from "@/constants/tokens";
import { appInfo } from "@/plugins/services/auth/providers/gitee/appInfo";
import { CheckAuthCodeAndNext } from "@/plugins/services/auth/providers/gitee/checkAuthCodeAndNext";
import { IAuthProvider } from "@/services/auth.service.interface";
import { getGiteeLoginUrl } from "libs/gitee-api";
import giteeClient from "libs/gitee-api/gitee-client";
import { createPlugin } from "xbook/common/createPlugin";
import xbook from "xbook/index";

export const giteeAuthProvider: IAuthProvider = {
  platform: "gitee",
  refresh: async (params: {
    platform: string;
    username: string;
    refreshToken: string;
  }) => {
    const { platform, username, refreshToken } = params;
    const auth = await giteeClient.refreshAccessToken({ refreshToken });
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
    authService.saveAuthInfo({
      platform,
      username,
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
      expirationTime: auth.expires_in,
      createdAt: auth.created_at,
      scope: auth.scope,
      tokenType: auth.token_type,
    });
  },
  authenticate: async (username: string) => {
    // 弹窗询问用户是否确定跳转到对应平台的登录页面
    const userConfirmation = await xbook.modalService.confirm({
      title: "即将跳转",
      description: "是否确定跳转到Gitee登录页面？",
    });
    if (!userConfirmation) {
      return; // 用户取消认证
    }

    // 执行其他认证流程，例如调用认证服务进行验证等
    // ...

    // 向任务管理器添加一个类型为检查地址栏code并获取认证信息的任务
    xbook.taskService.addTask(
      CheckAuthCodeAndNext.name,
      {
        platform: "gitee",
        username,
      },
      {
        deffered: true,
      }
    );
    const url = getGiteeLoginUrl({
      redirectUri: appInfo.redirectUri,
      clientId: appInfo.clientId,
    });
    console.log("url to redirect: " + url);
    window.open(url, "_self");
  },
};

export default createPlugin({
  initilize(xbook) {
    xbook.taskService.registerTaskType(CheckAuthCodeAndNext);
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
    authService.registerAuthProvider(giteeAuthProvider);
  },
});