import base from "@/plugins/core/base";
import asyncPluginService from "@/plugins/services/asyncPluginService";
import authService from "@/plugins/services/authService";
import fileSystemService from "@/plugins/services/fileSystemService";
import openerService from "@/plugins/services/openerService";
import { addGiteeSpace } from "@/plugins/space/addSpace";
import displaySpaces from "@/plugins/space/displaySpaces";
import { folderTreeService } from "@/plugins/space/folderTreeService";
import { spaceServiceModule } from "@/plugins/space/spaceService";
import checkUrlParamAndQuickOpen from "@/plugins/utilities/checkUrlParamAndQuickOpen";
import clearLocalCache from "@/plugins/utilities/clearLocalCache";
import introduction from "@/plugins/widgets/introduction";
import theme from "@/plugins/utilities/theme";
import settings from "@/plugins/widgets/settings";
import xbook from "xbook";
import { AddFileSystemProviderForEachSpace } from "@/plugins/space/provideFileSystems";
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("testMode")) {
  import("https://esm.sh/vconsole@latest" as any).then((m) => {
    new m.default();
  });
}
xbook.pluginService.use([
  base,
  // asyncPluginService,
  spaceServiceModule,
  displaySpaces,
  // listenGiteeLoginCallback,

  fileSystemService,
  folderTreeService,
  AddFileSystemProviderForEachSpace,
  openerService,
  settings,
  theme,
  clearLocalCache,
  asyncPluginService,
  authService,
  checkUrlParamAndQuickOpen,
  addGiteeSpace,
  introduction,
]);
xbook.taskService.start();
xbook.layoutService.renderLayout(document.getElementById("root")!);
