import provideCommonTextFileOpener from "@/plugins/features/providers/provide-common-text-file-opener";
import { provideMilkdownEditor } from "@/plugins/features/providers/provide-milkdown-editor";
import provideTiptapEditor from "@/plugins/features/providers/provide-tiptap-editor";
import { provideVditor } from "@/plugins/features/providers/provide-vditor";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginForProviders = createPlugin({
    initilize(xbook) {
        xbook.pluginService.use([
            provideCommonTextFileOpener,
            // provideTiptapEditor,
            // provideMilkdownEditor,
            provideVditor,
        ])
    },
});