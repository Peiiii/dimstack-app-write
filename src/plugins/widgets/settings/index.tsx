import { EventKeys } from "@/constants/eventKeys";
import { SettingEntry } from "@/plugins/widgets/settings/types";
import { AiOutlineSetting } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import { SettingsPage } from "./page";
import store from "@/plugins/widgets/settings/store";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("AiOutlineSetting", AiOutlineSetting);
    xbook.serviceBus.exposeAt("settingService", {
      addSettingEntry: (entry: SettingEntry) => {
        store.getActions().add(entry);
      },
    });
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
