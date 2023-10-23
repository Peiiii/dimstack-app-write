import { CheckAuthCodeAndNext } from "@/plugins/services/authService/providers/gitee/checkAuthCodeAndNext";
import { giteeAuthProvider } from "@/plugins/services/authService/providers/gitee";
import { authService } from "@/plugins/services/authService/service";
import { createPlugin } from "@/toolkit/common/plugin";
import xbook from "xbook/index";

export default createPlugin({
  initilize() {
    xbook.taskService.registerTaskType(CheckAuthCodeAndNext);
    authService.registerAuthProvider(giteeAuthProvider);
  },
  addServices() {
    return ["authService", authService];
  },
});
