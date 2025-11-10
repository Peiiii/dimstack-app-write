import { pluginAddInitialIndexedDbSpace } from "@/plugins/features/add-initial-indexed-db-space";
import { bindSpaceWithRoute } from "@/plugins/features/bind-space-with-route";
import { pluginForProviders } from "@/plugins/features/providers";
import { ShowCurrentSpacePagesOnly } from "@/plugins/features/show-current-space-pages-only";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([
     pluginForProviders,
      bindSpaceWithRoute,
      ShowCurrentSpacePagesOnly,
      pluginAddInitialIndexedDbSpace,
    ]);
  },
});
