export { componentService } from "../ui/componentService";
export { cacheService } from "./cacheService";
export { commandService } from "./commandService";
export { eventBus } from "./eventBus";
export { fs } from "./fs";
export { layoutService } from "./layoutService";
export { logService } from "./logService";
export { modalService } from "./modalService";
export { notificationService } from "./notificationService";
export { pluginService } from "./pluginService";
export { popupService } from "./popupService";
export { registry as registryService } from "./registry";
export { serviceBus } from "./serviceBus";
export { shortcutService } from "./shortcutService";
export { taskService } from "./taskService";
export { workbenchService } from "./workbench.service";

import { commandService } from "./commandService";
import { eventBus } from "./eventBus";
import { layoutService } from "./layoutService";
import { logService } from "./logService";
import { serviceBus } from "./serviceBus";
import { taskService } from "./taskService";

import { componentService } from "xbook/ui/componentService";
import { cacheService } from "./cacheService";
import { fs } from "./fs";
import { modalService } from "./modalService";
import { notificationService } from "./notificationService";
import { pluginService } from "./pluginService";
import { popupService } from "./popupService";
import { registry } from "./registry";
import { shortcutService } from "./shortcutService";
import { workbenchService } from "./workbench.service";

export default {
  logService,
  taskService,
  serviceBus,
  commandService,
  eventBus,
  registry,
  pluginService,
  cacheService,
  layoutService,
  fs,
  notificationService,
  modalService,
  componentService,
  shortcutService,
  popupService,
  workbenchService,
};
