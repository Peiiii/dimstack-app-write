import { createPlugin } from "@/toolkit/common/plugin";
import { Button, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default createPlugin({
  initilize(xbook) {
    xbook.serviceBus.invoke("settingService.addSettingEntry", {
      id: "themer",
      name: "主题",
      description: "黑夜/白天",
      menuItems: ["Dark", "Light"],
      icon: (props) => {
        // console.log("theme:",props)
        const { colorMode, toggleColorMode } = useColorMode();
        useEffect(() => {
          const themeColor = colorMode === "light" ? "#f8f8f8" : "#2e2e2e";
          const meta = document.querySelector(`meta[name="theme-color"]`);
          if (meta) {
            meta.setAttribute("content", themeColor);
          }
        }, [colorMode, toggleColorMode]);
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
        useEffect(() => {
          const themeColor = colorMode === "light" ? "#f8f8f8" : "#2e2e2e";
          const meta = document.querySelector(`meta[name="theme-color"]`);
          if (meta) {
            meta.setAttribute("content", themeColor);
          }
        }, [colorMode, toggleColorMode]);
        return (
         <Button onClick={()=>{
          toggleColorMode();
         }}>切换</Button>
        );
      },
    });
  },
});
