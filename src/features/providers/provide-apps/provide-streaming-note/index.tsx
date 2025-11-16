import { openerService } from "@/services/opener.service";
import { AppStreamingNote } from "./app";
import { createPlugin } from "xbook/common/createPlugin";
import { t } from "@/i18n/utils";

export const provideStreamingNote = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("streaming-note", AppStreamingNote);
    // Use singleton openerService
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
          title: `${t("apps.streamingNote")}:${getFileName(uri)}`,
          viewData: {
            type: "streaming-note",
            props: { uri },
          },
        });
      },
    });
  },
});
