import { EventKeys } from "@/constants/eventKeys";
import { spaceHelper } from "@/helpers/space.helper";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import { AddSpaceActivityItem } from "./components/add-space-activity-item";

export const addGiteeSpace = createPlugin({
  initilize(xbook) {
    const id = "addGiteeRepo";
    xbook.componentService.register("AiOutlinePlusCircle", AiOutlinePlusCircle);
    xbook.componentService.register(`activity:${id}`, AddSpaceActivityItem);
    xbook.layoutService.activityBar.addActivity(
      {
        id,
        icon: "AiOutlinePlusCircle",
        name: "添加",
        order: 100,
        unselectable: true,
      },
      true
    );
    spaceHelper.getStore().waitUtilLoaded(() => {
      if (spaceHelper.getStore().getData().length === 0) {
        const activityList = xbook.layoutService.activityBar.getActivityList();
        const activity = activityList.find((a) => a.id === id);
        if (activity) {
          xbook.eventBus.emit(EventKeys.ActivityBar.ActivityClicked(id));
        }
      }
    });
  },
});
