import base from "@/plugins/core/base";
import asyncPluginService from "@/plugins/services/asyncPluginService";
import authService from "@/plugins/services/authService";
import fileSystemService from "@/plugins/services/fileSystemService";
import openerService from "@/plugins/services/openerService";
import { addGiteeSpace } from "@/plugins/space/addSpace";
import displaySpaces from "@/plugins/space/displaySpaces";
import { folderTreeService } from "@/plugins/space/folderTreeService";
import { spaceServiceModule } from "@/plugins/space/spaceService";
import clearLocalCache from "@/plugins/utilities/clearLocalCache";
import theme from "@/plugins/utilities/theme";
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
  spaceServiceModule,
  displaySpaces,
  // listenGiteeLoginCallback,
  addGiteeSpace,
  fileSystemService,
  folderTreeService,
  openerService,
  settings,
  theme,
  clearLocalCache,
  asyncPluginService,
  authService,
]);
xbook.taskService.start();
xbook.layoutService.renderLayout(document.getElementById("root")!);
