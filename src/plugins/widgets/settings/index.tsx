import { AiOutlineSetting } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import View from "./View";
import store from "./store";

export default createPlugin({
  initilize(xbook) {
    xbook.componentService.register("settings", AiOutlineSetting);
    xbook.shortcutService.addShortcut(
      {
        id: "settings",
        name: "设置",
        hasPopover: true,
        order: 10000,
        icon: "settings",
      },
      true
    );
  },
  addServices() {
    return [
      "settingService",
      {
        addSettingEntry: store.getActions().add,
      },
    ];
  },
  addCommands() {
    return [
      "settingService",
      {
        addSettingEntry: store.getActions().add,
      },
    ];
  },
  addComponents() {
    return {
      "shortcut:settings:page": View,
    };
  },
});
