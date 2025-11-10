import { createPlugin } from "xbook/common/createPlugin";
import { settingService } from "@/services/setting.service";
import { Button, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default createPlugin({
  initilize(xbook) {
    settingService.addSettingEntry({
      id: "themer",
      name: "主题",
      description: "黑夜/白天",
      menuItems: ["Dark", "Light"],
      icon: (props) => {
        const { colorMode, toggleColorMode } = useColorMode();

        // 处理 TailwindCSS 的 dark 模式适配
        useEffect(() => {
          const themeColor = colorMode === "light" ? "#f8f8f8" : "#2e2e2e";
          const meta = document.querySelector(`meta[name="theme-color"]`);
          if (meta) {
            meta.setAttribute("content", themeColor);
          }

          // 为 TailwindCSS 添加或移除 dark 类
          const rootElement = document.documentElement;
          if (colorMode === "dark") {
            rootElement.classList.add('dark');
          } else {
            rootElement.classList.remove('dark');
          }
        }, [colorMode]);

        return (
          <>
            {colorMode === "light" ? (
              <CiLight {...props} onClick={() => toggleColorMode()} />
            ) : (
              <CiDark {...props} onClick={() => toggleColorMode()} />
            )}
          </>
        );
      },
      widget: () => {
        const { colorMode, toggleColorMode } = useColorMode();

        // 同样在 widget 里处理 TailwindCSS 的 dark 模式适配
        useEffect(() => {
          const themeColor = colorMode === "light" ? "#f8f8f8" : "#2e2e2e";
          const meta = document.querySelector(`meta[name="theme-color"]`);
          if (meta) {
            meta.setAttribute("content", themeColor);
          }

          // 为 TailwindCSS 添加或移除 dark 类
          const rootElement = document.documentElement;
          if (colorMode === "dark") {
            rootElement.classList.add('dark');
          } else {
            rootElement.classList.remove('dark');
          }
        }, [colorMode]);

        return (
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "切换到暗黑模式" : "切换到明亮模式"}
          </Button>
        );
      },
    });
  },
});
