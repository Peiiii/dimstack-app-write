import { provideApps } from "@/features/providers/provide-apps";
import provideCommonTextFileOpener from "@/features/providers/provide-common-text-file-opener";
import provideZenmarkEditor from "@/features/providers/provide-zenmark-editor";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginForProviders = createPlugin({
  async initilize(xbook) {
    xbook.pluginService.use([
      provideApps,
      provideCommonTextFileOpener,
      // Use zenmark as the single markdown editor implementation
      // @note: keep zenmark available for offline/first-load scenarios
      provideZenmarkEditor,
      // provideMilkdownEditor,
      // provideVditor,
    ]);
  },
});
