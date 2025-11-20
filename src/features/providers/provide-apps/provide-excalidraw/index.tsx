import { openerService } from "@/services/opener.service";
import { AppExcalidraw } from "./app";
import { createPlugin } from "xbook/common/createPlugin";
import { t } from "@/i18n/utils";

export const provideExcalidraw = createPlugin({
  initilize(xbook) {
    xbook.componentService.register("excalidraw", AppExcalidraw);

    openerService.register({
      id: "excalidraw",
      label: t("apps.excalidraw"),
      showInTreeMenu: true,
      icon: "AiOutlineFileAdd",
      match: [".excalidraw.json", ".excalidraw"],
      priority: 100,
      templates: [
        {
          id: "new-excalidraw",
          label: t("excalidraw.newFile"),
          defaultFileName: "Untitled.excalidraw.json",
          initialContent: "{}",
          icon: "AiOutlineFileAdd",
        },
      ],
      init: (uri) => {
        const getFileName = (value: string) => {
          return value.split("/").pop() ?? "unknown";
        };

        xbook.layoutService.pageBox.addPage({
          id: `excalidraw:${uri}`,
          title: `${t("apps.excalidraw")}:${getFileName(uri)}`,
          viewData: {
            type: "excalidraw",
            props: { uri },
          },
        });
      },
    });
  },
});
