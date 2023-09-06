import { addGiteeSpace } from "@/plugins/utilities/addGiteeSpace";
import base from "@/plugins/core/base";
import xbook from "xbook";
import { folderTreeService } from "@/plugins/services/folderTreeService";
import { spaceService } from "@/plugins/services/spaceService";
import { listenGiteeLoginCallback } from "@/plugins/services/listenGiteeLoginCallback";
import displaySpaces from "@/plugins/core/displaySpaces";
import openerService from "@/plugins/services/openerService";
import theme from "@/plugins/utilities/theme";
import settings from "@/plugins/widgets/settings";

xbook.pluginService.use([
  base,
  folderTreeService,
  spaceService,
  displaySpaces,
  listenGiteeLoginCallback,
  addGiteeSpace,
  openerService,
  settings,
  theme,
]);
xbook.layoutService.renderLayout(document.getElementById("root")!);
