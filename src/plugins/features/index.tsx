import provideCommonTextFileOpener from "@/plugins/features/provide-common-text-file-opener";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([provideCommonTextFileOpener]);
  },
});
