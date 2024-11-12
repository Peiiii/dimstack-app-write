import { pluginToastProvider } from "@/plugins/core/common-utility-providers/toast-provider";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([pluginToastProvider]);
  },
});
