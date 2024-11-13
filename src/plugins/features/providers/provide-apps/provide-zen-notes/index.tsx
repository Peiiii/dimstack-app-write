import { Tokens } from "@/constants/tokens";
import { AppZenNotes } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideZenNotes = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("zen-notes", AppZenNotes);
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
    openerService.register({
      match: [".zennotes.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `zen-notes:${uri}`,
          title: `禅意笔记:${getFileName(uri)}`,
          viewData: {
            type: "zen-notes",
            props: { uri },
          },
        });
      },
    });
  },
}); 