import { EventKeys } from "@/constants/eventKeys";
import gitee from "@/plugins/services/auth/providers/gitee";
import github from "@/plugins/services/auth/providers/github";
import { authService } from "@/services/auth.service";
import { createPlugin } from "xbook/common/createPlugin";
import { spaceService } from "@/services/space.service";
import xbook from "xbook/index";

export default createPlugin({
  initilize() {
    (window as any).authService = authService;
    xbook.eventBus.on(EventKeys.RequestRedirectAuthPage, (spaceId: string) => {
      const space = spaceService.getSpace(spaceId);
      if (!space) return;
      authService.authenticate({
        platform: space.platform,
        username: space.owner,
        repo: space.repo,
      });
    });
    xbook.pluginService.use(gitee);
    xbook.pluginService.use(github);
  },
});
