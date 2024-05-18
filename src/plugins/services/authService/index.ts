import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import gitee from "@/plugins/services/authService/providers/gitee";
import { AuthServiceImpl } from "@/services/auth.service.impl";
import { createPlugin } from "xbook/common/createPlugin";
import xbook from "xbook/index";

export default createPlugin({
  initilize() {
    const authService = new AuthServiceImpl();
    xbook.serviceBus.exposeAt(Tokens.AuthService, authService);
    xbook.eventBus.on(EventKeys.RequestRedirectAuthPage, (spaceId: string) => {
      const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
      const space = spaceService.getSpace(spaceId);
      if (!space) return;
      authService.authenticate(space.platform, space.owner);
    });
    xbook.pluginService.use(gitee);
  },
});
