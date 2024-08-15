import { bindSpaceWithRoute } from "@/plugins/features/bind-space-with-route";
import provideCommonTextFileOpener from "@/plugins/features/provide-common-text-file-opener";
import { ShowCurrentSpacePagesOnly } from "@/plugins/features/show-current-space-pages-only";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([
      provideCommonTextFileOpener,
      bindSpaceWithRoute,
      ShowCurrentSpacePagesOnly,
    ]);
  },
});
