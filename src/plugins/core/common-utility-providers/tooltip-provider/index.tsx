import { TooltipProvider } from "@/components/ui/tooltip";
import { createPlugin } from "xbook/common/createPlugin";

export const pluginTooltipProvider = createPlugin({
  initilize(xbook) {
    xbook.workbenchService.addReactEntry({
      id: "tooltip-provider",
      WrapperComponent: TooltipProvider,
    });
  },
});
