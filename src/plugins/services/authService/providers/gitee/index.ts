import { appInfo } from "@/plugins/services/authService/providers/gitee/appInfo";
import { CheckAuthCodeAndNext } from "@/plugins/services/authService/providers/gitee/checkAuthCodeAndNext";
import { getLoginUrl } from "libs/gitee-api";
import xbook from "xbook/index";

export const giteeAuthProvider = {
  platform: "gitee",
  authenticate: async (username: string) => {
    // 弹窗询问用户是否确定跳转到对应平台的登录页面
    const userConfirmation = await xbook.modalService.confirm(
      "即将跳转",
      "是否确定跳转到Gitee登录页面？"
    );
    if (!userConfirmation) {
      return; // 用户取消认证
    }

    // 执行其他认证流程，例如调用认证服务进行验证等
    // ...

    // 向任务管理器添加一个类型为检查地址栏code并获取认证信息的任务
    xbook.taskService.addTask(CheckAuthCodeAndNext.name, {
      platform: "gitee",
      username,
    });
    const url = getLoginUrl({
      redirectUri: appInfo.redirectUri,
      clientId: appInfo.clientId,
    });
    console.log("url to redirect: " + url);
    window.open(url);
  },
};
