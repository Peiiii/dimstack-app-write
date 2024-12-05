import { pluginToastProvider } from "@/plugins/core/common-utility-providers/toast-provider";
import { pluginTooltipProvider } from "@/plugins/core/common-utility-providers/tooltip-provider";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([pluginToastProvider, pluginTooltipProvider]);
  },
});
