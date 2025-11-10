import { openerService } from "@/services/opener.service";
import { AppMindFlow } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideMindFlow = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("mind-flow", AppMindFlow);
    // Use singleton openerService
    openerService.register({
      match: [".mindflow.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `mind-flow:${uri}`,
          title: `思维流:${getFileName(uri)}`,
          viewData: {
            type: "mind-flow",
            props: { uri },
          },
        });
      },
    });
  },
}); 
