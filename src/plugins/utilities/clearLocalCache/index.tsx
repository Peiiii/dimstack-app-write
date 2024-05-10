import { createPlugin } from "xbook/common/createPlugin";
import { Button } from "@chakra-ui/react";
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
            onClick={async () => {
              if (
                await xbook.modalService.confirm({
                  title: "清空本地缓存",
                  description: "是否确定清空本地缓存？",
                })
              ) {
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
