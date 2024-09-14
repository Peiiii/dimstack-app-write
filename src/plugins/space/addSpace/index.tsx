import { EventKeys } from "@/constants/eventKeys";
import { spaceHelper } from "@/helpers/space.helper";
import { AddSpaceDialog } from "@/plugins/space/addSpace/components/add-space-diaglog";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";

export const addGiteeSpace = createPlugin({
  initilize(xbook) {
    const id = "addGiteeRepo";
    xbook.componentService.register("AiOutlinePlusCircle", AiOutlinePlusCircle);
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
    xbook.eventBus.on(EventKeys.ActivityBar.ActivityClicked(id), () => {
     xbook.modalService.open({
        title: "添加空间",
        width: "760px",
        content: <AddSpaceDialog />,
        footer: false,
      });
    });
    spaceHelper.getStore().waitUtilLoaded(() => {
      if (spaceHelper.getStore().getData().length === 0) {
        xbook.eventBus.emit(EventKeys.ActivityBar.ActivityClicked(id));
      }
    });
  },
});
