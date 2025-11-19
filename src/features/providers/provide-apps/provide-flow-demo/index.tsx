import { openerService } from "@/services/opener.service";
import { AppFlowDemo } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideFlowDemo = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("flow-demo", AppFlowDemo);
    // Use singleton openerService
    openerService.register({
      id: "flow-demo",
      label: "Flow Demo",
      match: [".flowdemo.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `flow-demo:${uri}`,
          title: `Flow Demo:${getFileName(uri)}`,
          viewData: {
            type: "flow-demo",
            props: { uri },
          },
        });
      },
    });
  },
}); 
