import { openerService } from "@/services/opener.service";
import { AppAIQuotes } from "./app";
import { createPlugin } from "xbook/common/createPlugin";
import { t } from "@/i18n/utils";

export const provideAppAIQuotes = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("ai-quotes", AppAIQuotes);
    // Use singleton openerService
    openerService.register({
      id: "ai-quotes",
      label: t("apps.aiQuotes"),
      match: [".aiquotes.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `ai-quotes:${uri}`,
          title: `${t("apps.aiQuotes")}:${getFileName(uri)}`,
          viewData: {
            type: "ai-quotes",
            props: { uri },
          },
        });
      },
    });
  },
}); 
