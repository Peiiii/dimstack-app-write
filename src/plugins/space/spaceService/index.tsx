import { Tokens } from "@/constants/tokens";
import { SpaceServiceImpl } from "@/services/space.service.impl";
import { createPlugin } from "xbook/common/createPlugin";

export const spaceServiceModule = createPlugin({
  initilize(xbook) {
    xbook.serviceBus.exposeAt(Tokens.SpaceService, new SpaceServiceImpl());
  },
});
