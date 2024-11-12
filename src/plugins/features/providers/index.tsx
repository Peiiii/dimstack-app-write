import { provideApps } from "@/plugins/features/providers/provide-apps";
import provideCommonTextFileOpener from "@/plugins/features/providers/provide-common-text-file-opener";
import provideTiptapEditor from "@/plugins/features/providers/provide-tiptap-editor";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginForProviders = createPlugin({
  initilize(xbook) {
    xbook.pluginService.use([
      provideApps,
      provideCommonTextFileOpener,
      provideTiptapEditor,
      // provideMilkdownEditor,
      // provideVditor,
    ]);
  },
});
