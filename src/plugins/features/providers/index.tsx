import { provideApps } from "@/plugins/features/providers/provide-apps";
import provideCommonTextFileOpener from "@/plugins/features/providers/provide-common-text-file-opener";
import provideTiptapEditor from "@/plugins/features/providers/provide-tiptap-editor";
import provideZenmarkEditor from "@/plugins/features/providers/provide-zenmark-editor";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginForProviders = createPlugin({
  async initilize(xbook) {
    xbook.pluginService.use([
      provideApps,
      provideCommonTextFileOpener,
      // Keep both editors registered, but we won't expose UI switching.
      // Opener will prefer Tiptap if loaded, otherwise fall back to Zenmark.
      provideTiptapEditor,
      // @note: keep zenmark available for offline/first-load scenarios
      provideZenmarkEditor,
      // provideMilkdownEditor,
      // provideVditor,
    ]);
  },
});
