import { EventKeys } from "@/constants/eventKeys";
import { AiOutlineSetting } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import { SettingsPage } from "./page";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("AiOutlineSetting", AiOutlineSetting);
    xbook.shortcutService.addShortcut({
      id: "settings",
      name: "设置",
      order: 10000,
      icon: "AiOutlineSetting",
    });

    xbook.eventBus.on(
      EventKeys.Shortcut.ShortcutClicked("settings"),
      () => {
        xbook.modalService.open({
          content: <SettingsPage />,
          footer: false,
          width: "720px"
        });
      }
    );
  },
});
