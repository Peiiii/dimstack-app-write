import { Tokens } from "@/constants/tokens";
import { SpaceService } from "@/services/space.service";
import { createPlugin } from "xbook/common/createPlugin";

export const spaceServiceModule = createPlugin({
  initilize(xbook) {
    xbook.serviceBus.exposeAt(Tokens.SpaceService, new SpaceService());
  },
});
