import { AiOutlineSetting } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import SettingsShortcut from "./shortcut";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("AiOutlineSetting", AiOutlineSetting);
    xbook.shortcutService.addShortcut({
      id: "settings",
      name: "设置",
      order: 10000,
      icon: "AiOutlineSetting",
      hasPopover: true,
    });
    // Custom render for the bottom-left settings shortcut to show a popover
    xbook.componentService.register(`shortcut:settings`, SettingsShortcut);

    // 移除旧的“完整设置”弹窗逻辑，无需再打开 Modal
  },
});
