import { provideAppAIStoryCards } from "./provide-app-ai-story-cards";
import { provideStreamingNote } from "./provide-streaming-note";
import { provideZenNotes } from "./provide-zen-notes";
import { createPlugin } from "xbook/common/createPlugin";

export const provideApps = createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([
      provideAppAIStoryCards,
      provideStreamingNote,
      provideZenNotes,
    ]);
  },
});
