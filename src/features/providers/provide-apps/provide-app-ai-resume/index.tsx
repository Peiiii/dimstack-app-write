import { openerService } from "@/services/opener.service";
import { AppAIResume } from "./app";
import { createPlugin } from "xbook/common/createPlugin";
import { t } from "@/i18n/utils";

export const provideAppAIResume = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("ai-resume", AppAIResume);
    // Use singleton openerService
    openerService.register({
      id: "ai-resume",
      label: t("apps.aiResume"),
      match: [".airesume.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `ai-resume:${uri}`,
          title: `${t("apps.aiResume")}:${getFileName(uri)}`,
          viewData: {
            type: "ai-resume",
            props: { uri },
          },
        });
      },
    });
  },
}); 
