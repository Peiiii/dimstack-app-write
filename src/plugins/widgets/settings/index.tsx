import { AiOutlineSetting } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import SettingsShortcut from "./shortcut";
import { t } from "@/i18n/utils";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("AiOutlineSetting", AiOutlineSetting);
    xbook.shortcutService.addShortcut({
      id: "settings",
      name: t("common.settings"),
      order: 10000,
      icon: "AiOutlineSetting",
      hasPopover: true,
    });
    xbook.componentService.register(`shortcut:settings`, SettingsShortcut);
  },
});
