import { Tokens } from "@/constants/tokens";
import { AppMindFlow } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideMindFlow = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("mind-flow", AppMindFlow);
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
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