import { openerService } from "@/services/opener.service";
import { AppCommunity } from "./app";
import { createPlugin } from "xbook/common/createPlugin";
import { spaceHelper } from "@/helpers/space.helper";
import { t } from "@/i18n/utils";

export const provideCommunity = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("community", AppCommunity);
    // Use singleton openerService
    openerService.register({
      id: "community",
      label: t("apps.community"),
      match: [".community.json"],
      priority: 100,
      init: async (uri) => {
        return xbook.layoutService.pageBox.addPage({
          id: `community:${uri}`,
          title: `${t("apps.community")}:${spaceHelper.getFileName(uri)}`,
          viewData: {
            type: "community",
            props: { uri },
          },
        });
      },
    });
  },
}); 
