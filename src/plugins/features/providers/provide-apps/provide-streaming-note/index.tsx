import { Tokens } from "@/constants/tokens";
import { AppStreamingNote } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideStreamingNote = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("streaming-note", AppStreamingNote);
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
    openerService.register({
      match: [".streaming.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        console.log("open uri:", uri);
        xbook.layoutService.pageBox.addPage({
          id: `streaming-note:${uri}`,
          title: `流式笔记:${getFileName(uri)}`,
          viewData: {
            type: "streaming-note",
            props: { uri },
          },
        });
      },
    });
  },
});
