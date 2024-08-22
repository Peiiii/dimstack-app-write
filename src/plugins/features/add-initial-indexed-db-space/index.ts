import { Tokens } from "@/constants/tokens";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginAddInitialIndexedDbSpace = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    spaceService.onLoad(() => {
      spaceService.addSpace(
        {
          platform: "idb",
          owner: "root",
          repo: "home",
        },
        {
          silent: true,
        }
      );
    });
  },
});
