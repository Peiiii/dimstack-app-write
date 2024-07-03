import base from "@/plugins/core/base";
import features from "@/plugins/features";
import { Migration20240518 } from "@/plugins/migrations";
import asyncPluginService from "@/plugins/services/asyncPluginService";
import authService from "@/plugins/services/auth";
import commonServiceProviders from "@/plugins/services/common-service-providers";
import fileSystemService from "@/plugins/services/fileSystemService";
import { addGiteeSpace } from "@/plugins/space/addSpace";
import displaySpaces from "@/plugins/space/displaySpaces";
import { folderTreeService } from "@/plugins/space/folderTreeService";
import { AddFileSystemProviderForEachSpace } from "@/plugins/space/provideFileSystems";
import { spaceServiceModule } from "@/plugins/space/spaceService";
import checkUrlParamAndQuickOpen from "@/plugins/utilities/checkUrlParamAndQuickOpen";
import clearLocalCache from "@/plugins/utilities/clearLocalCache";
import theme from "@/plugins/utilities/theme";
import introduction from "@/plugins/widgets/introduction";
import settings from "@/plugins/widgets/settings";
import xbook from "xbook";
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("testMode")) {
  import("https://esm.sh/vconsole@latest" as any).then((m) => {
    new m.default();
  });
}
xbook.pluginService.use([
  base,
  // asyncPluginService,
  authService,
  spaceServiceModule,
  displaySpaces,
  // listenGiteeLoginCallback,
  /** basic */
  fileSystemService,
  folderTreeService,
  AddFileSystemProviderForEachSpace,
  commonServiceProviders,
  asyncPluginService,
  /** features */
  features,

  /** widgets */
  settings,
  theme,
  clearLocalCache,

  checkUrlParamAndQuickOpen,
  addGiteeSpace,
  introduction,
  Migration20240518,
]);
xbook.taskService.start();
xbook.layoutService.renderLayout(document.getElementById("root")!);
