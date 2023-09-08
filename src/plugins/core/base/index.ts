import "./css/index.scss";
import "./css/scroll.scss";
import "./css/themes/discord-light.scss";
import "./css/themes/dark.scss";
import "./css/themes/light.scss";

import { createPlugin } from "@/toolkit/common/plugin";
import { device } from "xbook/common/device";
import "./css/themes/markdown/github.css";
import { Layout } from "xbook/ui/workBench";

const MobileLayout: Layout = {
  type: "column",
  props: {
    h: "100%",
  },
  children: [
    {
      type: "row",
      props: {
        flexGrow: 1,
      },
      children: [
        {
          type: "row",
          props: {
            flexGrow: 1,
          },
          children: [
            {
              type: "column",
              props: {
                // w:"100%"
                h: "100%",
                overflow: "hidden",
                id: "homeBox",
              },
              children: [
                {
                  type: "row",
                  props: {
                    flexGrow: 1,
                  },
                  children: [
                    {
                      type: "sidebar",
                    },
                  ],
                },
                {
                  type: "row",
                  props: {
                    flexShrink: 0,
                  },
                  children: [
                    {
                      type: "activityBar",
                    },
                  ],
                },
              ],
            },
            {
              type: "pageBox",
            },
          ],
        },
      ],
    },
  ],
};
const PCLayout: Layout = {
  type: "column",
  props: {
    h: "100%",
    w: "100%",
  },
  children: [
    {
      type: "row",
      props: {
        flexGrow: 1,
      },
      children: [
        {
          type: "row",
          props: {
            flexShrink: 0,
          },
          children: [
            {
              type: "activityBar",
            },
          ],
        },
        {
          type: "row",
          props: {
            flexGrow: 1,
          },
          children: [
            {
              type: "sidebar",
            },
            {
              type: "pageBox",
            },
          ],
        },
      ],
    },
  ],
};
export default createPlugin({
  initilize(xbook) {
    xbook.layoutService.pageBox.hideTabBar();
    if (device.isMobile()) {
      xbook.layoutService.workbench.setLayout(MobileLayout);
      xbook.layoutService.sidebar.hide();
      xbook.layoutService.activityBar.hide();
      xbook.layoutService.sidebar.setFullwidth(false);
      xbook.commandService.registerCommand("client:toggleHome", () => {
        // xbook.layoutService.pageBox.showPage("home");
        xbook.layoutService.sidebar.toggle();
        xbook.layoutService.sidebar.setFullwidth(
          !xbook.layoutService.sidebar.getFullwidth()
        );
        xbook.layoutService.activityBar.toggle();
        xbook.layoutService.pageBox.toggle();
      });
      xbook.commandService.registerCommand("client:toChatPage", () => {
        xbook.layoutService.pageBox.show();
        xbook.layoutService.sidebar.hide();
        xbook.layoutService.activityBar.hide();
        xbook.layoutService.sidebar.setFullwidth(false);
      });
    } else {
      xbook.layoutService.workbench.setLayout(PCLayout);
      xbook.layoutService.sidebar.show();
      xbook.layoutService.sidebar.setFullwidth(false);
      xbook.layoutService.activityBar.show();
      xbook.commandService.registerCommand("client:toggleHome", () => {
        xbook.layoutService.sidebar.toggle();
        xbook.layoutService.activityBar.toggle();
      });

      xbook.commandService.registerCommand("client:toChatPage", () => {
        // xbook.layoutService.workbench.toggleSplitable();
      });
    }
  },
});
