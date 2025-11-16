import { EventKeys } from "@/constants/eventKeys";
import { IntroductionPage } from "@/plugins/widgets/introduction/page";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import { t } from "@/i18n/utils";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register(
      "AiOutlineQuestionCircle",
      AiOutlineQuestionCircle
    );
    xbook.shortcutService.addShortcut({
      id: "introduction",
      name: t("introduction.title"),
      order: 10000,
      icon: "AiOutlineQuestionCircle",
    });

    xbook.eventBus.on(
      EventKeys.Shortcut.ShortcutClicked("introduction"),
      () => {
        xbook.modalService.open({
          content: <IntroductionPage />,
          footer: false,
          width: "720px"
        });
      }
    );
  },
});
