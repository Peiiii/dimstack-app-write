import IframeOpener from "@/plugins/services/openerService/IframeOpener";
import { createPlugin } from "@/toolkit/common/plugin";

export default createPlugin({
  addComponents() {
    return {
      IframeOpener,
    };
  },
  addServices(xbook) {
    return [
      "openerService",
      {
        open: (spaceId, file) => {
          if (file.path?.endsWith(".md")) {
            xbook.layoutService.pageBox.addPage({
              id: file.path,
              title: file.name,
              viewData: {
                type: "IframeOpener",
                props: {
                  url: import.meta.env.DEV
                    ? "http://localhost:3000"
                    : "https://apps.eiooie.com/tiptap-editor/",
                  path: file.path,
                  spaceId,
                },
              },
            });
          }
        },
      },
    ];
  },
});
