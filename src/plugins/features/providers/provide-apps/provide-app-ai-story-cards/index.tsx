import { openerService } from "@/services/opener.service";
import { AppAIStoryCards } from "@/plugins/features/providers/provide-apps/provide-app-ai-story-cards/app";
import { createPlugin } from "xbook/common/createPlugin";

export const provideAppAIStoryCards = createPlugin({
  initilize(xbook) {
    // setTimeout(() => {
    //   xbook.layoutService.pageBox.addPage({
    //     id: "ai-story-cards",
    //     title: "AI故事卡",
    //     viewData: {
    //       type: "ai-story-cards",
    //       props: {
    //         uri: "1471276762:/demos/demo.aicard.json",
    //       },
    //     },
    //   });
    // });
    xbook.componentService.register("ai-story-cards", AppAIStoryCards);
    // Use singleton openerService
    openerService.register({
      match: [".aicard.json"],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        console.log("open uri:", uri);
        xbook.layoutService.pageBox.addPage({
          id: `ai-story-cards:${uri}`,
          title: `AI故事卡:${getFileName(uri)}`,
          viewData: {
            type: "ai-story-cards",
            props: { uri },
          },
        });
      },
    });
  },
});
