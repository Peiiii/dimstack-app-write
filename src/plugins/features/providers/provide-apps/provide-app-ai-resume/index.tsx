import { openerService } from "@/services/opener.service";
import { AppAIResume } from "./app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideAppAIResume = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("ai-resume", AppAIResume);
    // Use singleton openerService
    openerService.register({
      match: [".airesume.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        xbook.layoutService.pageBox.addPage({
          id: `ai-resume:${uri}`,
          title: `AI简历助手:${getFileName(uri)}`,
          viewData: {
            type: "ai-resume",
            props: { uri },
          },
        });
      },
    });
  },
}); 
