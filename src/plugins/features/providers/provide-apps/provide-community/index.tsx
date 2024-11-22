import { Tokens } from "@/constants/tokens";
import { AppCommunity } from "./app";
import { createPlugin } from "xbook/common/createPlugin";
import { spaceHelper } from "@/helpers/space.helper";

export const provideCommunity = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("community", AppCommunity);
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
    openerService.register({
      match: [".community.json"],
      priority: 100,
      init: async (uri) => {
        return xbook.layoutService.pageBox.addPage({
          id: `community:${uri}`,
          title: `社区:${spaceHelper.getFileName(uri)}`,
          viewData: {
            type: "community",
            props: { uri },
          },
        });
      },
    });
  },
}); 