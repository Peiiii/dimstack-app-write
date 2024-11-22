import { Tokens } from "@/constants/tokens";
import { AppAIQuotes } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideAppAIQuotes = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("ai-quotes", AppAIQuotes);
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
    openerService.register({
      match: [".aiquotes.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `ai-quotes:${uri}`,
          title: `AI名言:${getFileName(uri)}`,
          viewData: {
            type: "ai-quotes",
            props: { uri },
          },
        });
      },
    });
  },
}); 