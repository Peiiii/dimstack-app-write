export { logService } from "./logService";
export { serviceBus } from "./serviceBus";
export { commandService } from "./commandService";
export { eventBus } from "./eventBus";
export { pipeService } from "./pipeService";
export { registry as registryService } from "./registry";
export { pluginService } from "./pluginService";
export { cacheService } from "./cacheService";
export { layoutService } from "./layoutService";
export { notificationService } from "./notificationService";
export { componentService as componentService } from "../ui/componentService";

import { logService } from "./logService";
import { serviceBus } from "./serviceBus";
import { commandService } from "./commandService";
import { eventBus } from "./eventBus";
import { pipeService } from "./pipeService";
import { layoutService } from "./layoutService";

import { registry } from "./registry";
import { pluginService } from "./pluginService";
import { cacheService } from "./cacheService";
import { notificationService } from "./notificationService";
import { componentService } from "xbook/ui/componentService";

export default {
  logService,
  serviceBus,
  commandService,
  eventBus,
  pipeService,
  registry,
  pluginService,
  cacheService,
  layoutService,
  notificationService,
  componentService: componentService,
};
