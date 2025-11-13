import "./css/index.scss";
import "./css/scroll.scss";
import "./css/utility.scss";
import "./css/widgets.scss";
import "./css/xbook.scss";
// import "./css/themes/theme-base.scss";
import "./css/globals.scss";
import "./css/themes/dark.scss";
import "./css/themes/discord-light.scss";
import "./css/themes/light.scss";

import { createPlugin } from "xbook/common/createPlugin";
import { device } from "xbook/common/device";
import { CommandKeys } from "xbook/constants/tokens";
import { PresetComponents } from "xbook/ui/componentService";
import { Layout } from "xbook/ui/workBench";
import "./css/themes/markdown/github.css";
import { sideResizer } from "xbook/ui/side-resizer";
import GithubShortcut from "./components/github-shortcut";
import { Github } from "lucide-react";

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
                  props: {
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

const CacheKeys = {
  Initialized: "initialized:20241201",
};

export default createPlugin({
  initilize(xbook) {
    (window as any).xbook = xbook;
    const cache = xbook.cacheService.space("base", "localStorage");

    // Register GitHub shortcut
    xbook.componentService.register("Github", Github);
    xbook.shortcutService.addShortcut({
      id: "github",
      name: "GitHub",
      order: 9999,
      icon: "Github",
    });
    xbook.componentService.register("shortcut:github", GithubShortcut);
    if (device.isMobile()) {
      xbook.layoutService.pageBox.showTabBar();
      xbook.layoutService.workbench.setLayout(MobileLayout);
      // xbook.layoutService.sidebar.hide();
      // xbook.layoutService.activityBar.hide();
      // xbook.layoutService.sidebar.setFullwidth(false);
      if (!cache.get(CacheKeys.Initialized, false)) {
        xbook.layoutService.sidebar.show();
        xbook.layoutService.activityBar.show();
        xbook.layoutService.pageBox.hide();
        console.log(
          "initialize mobile layout:",
          "sidebar:",
          xbook.layoutService.sidebar.getVisible(),
          "activityBar:",
          xbook.layoutService.activityBar.getVisible(),
          "pageBox:",
          xbook.layoutService.pageBox.getVisible()
        );
        // cache.set("initialized", import.meta.env.DEV ? false : true);
        cache.set(CacheKeys.Initialized, true);
      }

      xbook.commandService.registerCommand(CommandKeys.ToggleHome, () => {
        // xbook.layoutService.pageBox.showPage("home");
        // xbook.layoutService.sidebar.toggle();
        // // xbook.layoutService.sidebar.toggle();
        // // xbook.layoutService.sidebar.setFullwidth(
        // //   !xbook.layoutService.sidebar.getFullwidth()
        // // );
        // xbook.layoutService.activityBar.toggle();
        // xbook.layoutService.pageBox.toggle();
        if (xbook.layoutService.sidebar.getVisible()) {
          xbook.layoutService.sidebar.hide();
          xbook.layoutService.activityBar.hide();
          xbook.layoutService.pageBox.show();
        } else {
          xbook.layoutService.sidebar.show();
          xbook.layoutService.activityBar.show();
          xbook.layoutService.pageBox.hide();
        }
      });
      xbook.commandService.registerCommand(CommandKeys.ToChatPage, () => {
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
      xbook.commandService.registerCommand(CommandKeys.ToggleHome, () => {
        // xbook.layoutService.sidebar.toggle();
        xbook.layoutService.activityBar.toggle();
        sideResizer.toggleLeft();
      });

      xbook.commandService.registerCommand(CommandKeys.ToChatPage, () => {
        // xbook.layoutService.workbench.toggleSplitable();
      });
    }
  },
});
