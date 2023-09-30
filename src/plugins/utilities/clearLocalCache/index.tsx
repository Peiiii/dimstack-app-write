import { createPlugin } from "@/toolkit/common/plugin";
import {
  Button
} from "@chakra-ui/react";
import { AiOutlineClear } from "react-icons/ai";

export default createPlugin({
  initilize(xbook) {
    xbook.serviceBus.invoke("settingService.addSettingEntry", {
      id: "localCache",
      name: "本地缓存",
      icon: AiOutlineClear,
      widget: () => {
        return (
          <Button
            onClick={() => {
              if (confirm("确认清空本地缓存（LocalStorage）吗？")) {
                localStorage.clear();
              }
            }}
          >
            清空
          </Button>
        );
      },
    });
  },
});
