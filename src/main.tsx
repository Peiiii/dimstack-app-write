import { pluginCore } from "@/plugins/core";
import features from "@/features";
import migrations from "@/plugins/migrations";
import authService from "@/plugins/services/auth";
import { addGiteeSpace } from "@/plugins/space/addSpace";
import displaySpaces from "@/plugins/space/displaySpaces";
import { folderTreeService } from "@/plugins/space/folderTreeService";
import { AddFileSystemProviderForEachSpace } from "@/plugins/space/provideFileSystems";
import checkUrlParamAndQuickOpen from "@/plugins/utilities/checkUrlParamAndQuickOpen";
import clearLocalCache from "@/plugins/utilities/clearLocalCache";
import theme from "@/plugins/utilities/theme";
import widgets from "@/plugins/widgets";
import xbook from "xbook";
import "@/plugins/space/platforms";
import { platformsPlugin } from "@/plugins/space/platforms";
import "@/i18n/config";
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("testMode")) {
  import("https://esm.sh/vconsole@latest" as any).then((m) => {
    new m.default();
  });
}
xbook.pluginService.use([
  pluginCore,
  // asyncPluginService,
  authService,
  platformsPlugin,
  displaySpaces,
  // listenGiteeLoginCallback,

  /** basic */
  folderTreeService,
  AddFileSystemProviderForEachSpace,

  /** features */
  features,

  /** widgets */
  // settings,
  widgets,
  theme,
  clearLocalCache,

  checkUrlParamAndQuickOpen,
  addGiteeSpace,
  // introduction,
  // Migration20240518,
  migrations,
]);
xbook.taskService.start();
xbook.layoutService.renderLayout(document.getElementById("root")!);
