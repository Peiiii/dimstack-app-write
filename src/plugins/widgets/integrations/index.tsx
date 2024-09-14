import { EventKeys } from "@/constants/eventKeys";
import IntegrationPanel from "@/plugins/widgets/integrations/components/integration-panel";
import { css } from "@emotion/css";
import { AiOutlineApi } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("AiOutlineApi", AiOutlineApi);
    xbook.layoutService.activityBar.addActivity(
      {
        id: "integrations",
        name: "集成",
        order: 1,
        unselectable: true,
        icon: "AiOutlineApi",
      },
      true
    );

    const openAuthManage = () => {
      xbook.modalService.open({
        content: <IntegrationPanel />,
        //   closeIcon: false,
        footer: false,
        modalBodyClassName: css`
          padding: 0 !important;
        `,
        autoFocus: false,
      });
    };

    xbook.eventBus.on(EventKeys.RequestAuthManage, openAuthManage);
    xbook.eventBus.on(
      EventKeys.ActivityBar.ActivityClicked("integrations"),
      openAuthManage
    );
  },
});
