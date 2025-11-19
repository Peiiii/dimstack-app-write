import { createPlugin } from "xbook/common/createPlugin";
import { GitaryBrandActivityItem } from "./components/gitary-brand-activity-item";

export const gitaryBrandActivity = createPlugin({
  initilize(xbook) {
    const id = "gitary-brand";
    
    xbook.componentService.register(`activity:${id}`, GitaryBrandActivityItem);
    
    xbook.layoutService.activityBar.addActivity(
      {
        id,
        icon: "gitary-logo",
        name: "Gitary",
        order: 0,
        unselectable: true,
      },
      true
    );
  },
});

