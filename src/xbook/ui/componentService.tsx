import { createRenderer } from "@/toolkit/factories/renderer";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SplitPane from "xbook/ui/components/split-pane";
import { createActivityBar } from "./activityBar";
import { createPageBox } from "./page-box";
import { createSidebar } from "./sidebar";
import { createStatusBar } from "./statusBar";
import { createTitleBar } from "./titleBar";
export const activityBar = createActivityBar();
export const statusBar = createStatusBar();
export const titleBar = createTitleBar();
export const pageBox = createPageBox();
export const sidebar = createSidebar();

export const componentService = createRenderer();

componentService.register("NotFoundComponent", ({ type }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return <>{visible && <div>{type}组件未找到</div>}</>;
});

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
componentService.register("SplitPane.Horizontal", SplitPane.Horizontal);
// componentService.register("SplitPane.Horizontal", SplitPaneV2.Horizontal);
