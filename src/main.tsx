import { addGiteeSpace } from "@/plugins/space/addSpace";
import base from "@/plugins/core/base";
import xbook from "xbook";
import { folderTreeService } from "@/plugins/space/folderTreeService";
import { spaceService } from "@/plugins/space/spaceService";
import { listenGiteeLoginCallback } from "@/plugins/space/listenGiteeLoginCallback";
import displaySpaces from "@/plugins/space/displaySpaces";
import openerService from "@/plugins/services/openerService";
import theme from "@/plugins/utilities/theme";
import settings from "@/plugins/widgets/settings";
import clearLocalCache from "@/plugins/utilities/clearLocalCache";
import asyncPluginService from "@/plugins/services/asyncPluginService";
import fileSystemService from "@/plugins/services/fileSystemService";
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("testMode")) {
  import("https://esm.sh/vconsole@latest" as any).then((m) => {
    new m.default();
  });
}
xbook.pluginService.use([
  base,
  // asyncPluginService,
  spaceService,
  displaySpaces,
  listenGiteeLoginCallback,
  addGiteeSpace,
  fileSystemService,
  folderTreeService,
  openerService,
  settings,
  theme,
  clearLocalCache,
  asyncPluginService,
]);
xbook.taskService.start();
xbook.layoutService.renderLayout(document.getElementById("root")!);
