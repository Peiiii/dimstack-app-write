import { pluginAddInitialIndexedDbSpace } from "@/features/add-initial-indexed-db-space";
import { bindSpaceWithRoute } from "@/features/bind-space-with-route";
import { pluginForProviders } from "@/features/providers";
import { ShowCurrentSpacePagesOnly } from "@/features/show-current-space-pages-only";
import { featureSearch } from "@/features/search";
import { gitaryBrandActivity } from "@/features/gitary-brand-activity";
import { featureGlobalSidecar } from "@/features/global-sidecar-providers";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([
      gitaryBrandActivity,
      featureGlobalSidecar,
      pluginForProviders,
      bindSpaceWithRoute,
      ShowCurrentSpacePagesOnly,
      featureSearch,
      // featureAIAssistant,
      pluginAddInitialIndexedDbSpace,
    ]);
  },
});
