import { EventKeys } from "@/constants/eventKeys";
import { SpaceListView } from "@/plugins/widgets/space-list/components/space-list-view";
import { css } from "@emotion/css";
import { AiOutlineMenu } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("AiOutlineMenu", AiOutlineMenu);
    xbook.layoutService.activityBar.addActivity(
      {
        id: "space-list",
        name: "空间列表",
        order: -1,
        unselectable: true,
        icon: "AiOutlineMenu",
      },
      true
    );

    xbook.eventBus.on(
      EventKeys.ActivityBar.ActivityClicked("space-list"),
      () => {
        xbook.modalService.open({
          content: <SpaceListView />,
          closeIcon: false,
          footer: false,
          modalBodyClassName: css`
            padding: 0 !important;
          `,
        });
      }
    );
  },
});
