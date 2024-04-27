import { createPlugin } from "xbook/common/createPlugin";
import { AiOutlineSetting } from "react-icons/ai";
import store from "./store";
import View from "./View";

export default createPlugin({
  initilize(xbook) {
    xbook.layoutService.activityBar.addShortcut({
      id: "settings",
      name: "设置",
      icon: (props) => {
        return (
          <>
            <AiOutlineSetting {...props} />
          </>
        );
      },
    });
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
