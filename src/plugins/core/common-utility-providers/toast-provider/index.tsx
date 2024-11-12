import { Toaster } from "@/components/ui/toaster";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginToastProvider = createPlugin({
  initilize(xbook) {
    xbook.workbenchService.addReactEntry({
      id: "toast-provider",
      reactNode: <Toaster />,
    });
  },
});
