import { provideAppAIQuotes } from "./provide-app-ai-quotes";
import { provideAppAIStoryCards } from "./provide-app-ai-story-cards";
import { provideAppAIResume } from "./provide-app-ai-resume";
import { provideStreamingNote } from "./provide-streaming-note";
import { provideZenNotes } from "./provide-zen-notes";
import { provideCommunity } from "./provide-community";
import { provideMindFlow } from "./provide-mind-flow";
import { provideFlowDemo } from "./provide-flow-demo";
import { createPlugin } from "xbook/common/createPlugin";

export const provideApps = createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([
      provideAppAIQuotes,
      provideAppAIStoryCards,
      provideAppAIResume,
      provideStreamingNote,
      provideZenNotes,
      provideCommunity,
      provideMindFlow,
      provideFlowDemo,
    ]);
  },
});
