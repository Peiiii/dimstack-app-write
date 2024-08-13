import "./css/index.scss";
import "./css/utility.scss";
import "./css/xbook.scss";
import "./css/widgets.scss";
import "./css/scroll.scss";
// import "./css/themes/theme-base.scss";
import "./css/themes/discord-light.scss";
import "./css/themes/dark.scss";
import "./css/themes/light.scss";

import { createPlugin } from "xbook/common/createPlugin";
import { device } from "xbook/common/device";
import "./css/themes/markdown/github.css";
import { Layout } from "xbook/ui/workBench";
import { PresetComponents } from "xbook/ui/componentService";

const MobileLayout: Layout = {
  type: "column",
  props: {
    h: "100%",
    w: "100%",
    className: "layout",
  },
  children: [
    {
      type: "row",
      props: {
        h: "100%",
        flexGrow: 1,
        className: "middle-row",
      },
      children: [
        {
          type: "row",
          props: {
            h: "100%",
            flexShrink: 0,
            className: "",
          },
          children: [
            {
              type: "activityBar",
            },
            {
              type: "sidebar",
            },
            {
              type: "pageBox",
            },
          ],
        },

        // {
        //   type: "row",
        //   props: {
        //     h: "100%",
        //     flexGrow: 1,
        //   },
        //   children: [
        //     {
        //       type: "pageBox",
        //     },
        //   ],
        // },
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
        h: "100%",
        flexGrow: 1,
        className: "middle-row",
      },
      children: [
        {
          type: "row",
          props: {
            flexShrink: 0,
            h: "100%",
          },
          children: [
            {
              type: "activityBar",
            },
            {
              type: "row",
              children: [
                {
                  // type: "SplitPane.Horizontal",
                  type: PresetComponents.SideResizer,
                  props:{
                    // id: "sidebarResizer"
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
        },
        // {
        //   type: "row",
        //   props: {
        //     flexGrow: 1,
        //   },
        //   children: [
        //     {
        //       type: "sidebar",
        //     },
        //     {
        //       type: "pageBox",
        //     },
        //   ],
        // },
      ],
    },
  ],
};
export default createPlugin({
  initilize(xbook) {
    (window as any).xbook = xbook;
    const cache = xbook.cacheService.space("base", "localStorage");
    if (device.isMobile()) {
      xbook.layoutService.pageBox.showTabBar();
      xbook.layoutService.workbench.setLayout(MobileLayout);
      // xbook.layoutService.sidebar.hide();
      // xbook.layoutService.activityBar.hide();
      // xbook.layoutService.sidebar.setFullwidth(false);
      if (!cache.get("initialized", false)) {
        xbook.layoutService.sidebar.show();
        xbook.layoutService.activityBar.show();
        xbook.layoutService.pageBox.hide();
        cache.set("initialized", import.meta.env.DEV ? false : true);
      }

      xbook.commandService.registerCommand("client:toggleHome", () => {
        // xbook.layoutService.pageBox.showPage("home");
        xbook.layoutService.sidebar.toggle();
        // xbook.layoutService.sidebar.toggle();
        // xbook.layoutService.sidebar.setFullwidth(
        //   !xbook.layoutService.sidebar.getFullwidth()
        // );
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
      xbook.layoutService.pageBox.showTabBar();
      xbook.layoutService.workbench.setLayout(PCLayout);
      xbook.layoutService.sidebar.show();
      xbook.layoutService.sidebar.setFullwidth(false);
      xbook.layoutService.activityBar.show();
      xbook.commandService.registerCommand("client:toggleHome", () => {
        xbook.layoutService.sidebar.toggle();
        xbook.layoutService.activityBar.toggle();
        // xbook.serviceBus.invoke("sidebarResizer.toggleResizable")
        xbook.serviceBus.invoke("sideResizer.toggleLeft");
      });

      xbook.commandService.registerCommand("client:toChatPage", () => {
        // xbook.layoutService.workbench.toggleSplitable();
      });
    }
  },
});
