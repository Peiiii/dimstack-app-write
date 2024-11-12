import { provideAppAIStoryCards } from "@/plugins/features/providers/provide-apps/provide-app-ai-story-cards";
import { provideReactIDE } from "@/plugins/features/providers/provide-apps/provide-online-ide";
import { createPlugin } from "xbook/common/createPlugin";

export const provideApps = createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([provideAppAIStoryCards, provideReactIDE]);
  },
});
