import { Tokens } from "@/constants/tokens";
import { AppFlowDemo } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideFlowDemo = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("flow-demo", AppFlowDemo);
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
    openerService.register({
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