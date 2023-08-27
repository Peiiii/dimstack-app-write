import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import {
  sidebar,
  pageBox,
  titleBar,
  statusBar,
  activityBar,
} from "xbook/ui/componentService";
import { createWorkbench } from "xbook/ui/workBench";

const workbench = createWorkbench();
const createLayoutService = () => {
  const renderLayout = (dom: HTMLElement) => {
    ReactDOM.createRoot(dom).render(
      <ChakraProvider>{workbench.instance}</ChakraProvider>
    );
  };
  return {
    renderLayout,
    sidebar: sidebar.proxy,
    pageBox: pageBox.proxy,
    titleBar: titleBar.proxy,
    statusBar: statusBar.proxy,
    activityBar: activityBar.proxy,
    workbench: workbench.proxy,
  };
};

export const layoutService = createLayoutService();
