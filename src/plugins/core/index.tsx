import base from "@/plugins/core/base";
import commonUtilityProviders from "@/plugins/core/common-utility-providers";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginCore = createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([commonUtilityProviders, base]);
  },
});
