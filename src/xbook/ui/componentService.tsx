import { Box } from "@chakra-ui/react";
import { createActivityBar } from "./activityBar";
import { createPageBox } from "./pageBox";
import { createSidebar } from "./sidebar";
import { createStatusBar } from "./statusBar";
import { createTitleBar } from "./titleBar";
import { createRenderer } from "xbook/common/renderer";
export const activityBar = createActivityBar();
export const statusBar = createStatusBar();
export const titleBar = createTitleBar();
export const pageBox = createPageBox();
export const sidebar = createSidebar();

export const componentService = createRenderer();
// 注册行组件
componentService.register("row", ({ children, ...rest }) => (
  <Box
    display="flex"
    overflow={"hidden"}
    className="row"
    flexDirection="row"
    w="100%"
    {...rest}
  >
    {children}
  </Box>
));

// 注册列组件
componentService.register("column", ({ children, ...rest }) => (
  <Box
    display="flex"
    overflow={"hidden"}
    className="colomn"
    flexDirection="column"
    h="100%"
    {...rest}
  >
    {children}
  </Box>
));

componentService.register("activityBar", () => {
  return activityBar.instance;
});
componentService.register("sidebar", () => {
  return sidebar.instance;
});
componentService.register("statusBar", () => {
  return statusBar.instance;
});
componentService.register("titleBar", () => {
  return titleBar.instance;
});
componentService.register("pageBox", () => {
  return pageBox.instance;
});
