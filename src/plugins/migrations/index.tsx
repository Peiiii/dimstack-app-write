import { Migration20240518 } from "@/plugins/migrations/migration-20240518";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([Migration20240518]);
  },
});
