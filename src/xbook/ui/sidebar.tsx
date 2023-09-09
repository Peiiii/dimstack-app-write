import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { device } from "xbook/common/device";
import { ProxiedControls } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { cacheService } from "xbook/services";
import { commandService } from "xbook/services/commandService";
import { componentService } from "./componentService";
import { LayoutNode } from "@/toolkit/common/renderer";
import { AnyFunction } from "@/toolkit/common/types";
type View = {
  id: string;
  viewData: LayoutNode;
  visible?: boolean;
};

const cache = cacheService.space("sidebar", "localStorage");
export const createSidebar = () =>
  createDeferredComponentProxy<{
    setView(id: string): void;
    toggleView(id: string): void;
    addView(view: View, update?: boolean): void;
    showView(id: string): void;
    hideView(id: string): void;
    hide: AnyFunction;
    show: AnyFunction;
    toggle: AnyFunction;
    getFullwidth: AnyFunction;
    setFullwidth: AnyFunction;
  }>(
    ({ proxy }) => {
      // const isMobile=device.isMobile();
      const isMobile = false;
      const [viewList, setViewList] = cache.useCachedState<View[]>(
        "viewList",
        []
      );
      const visibilityControl = ProxiedControls.useVisibilityControl(
        proxy,
        true
      );
      const fullwidthControl = ProxiedControls.useBeanControl(
        proxy,
        "fullwidth",
        true
      );

      useEffect(() => {
        const findView = (id: string) => {
          for (const view of viewList) {
            if (view.id === id) return view;
          }
        };
        const addView = (view: View, update = false) => {
          if (findView(view.id)) {
            if (update) {
              setViewList((viewList) =>
                viewList.map((v) => {
                  if (v.id === view.id) return { ...v, ...view };
                  else return v;
                })
              );
              return;
            }
          }
          viewList.push(view);
          setViewList(viewList.slice());
        };

        const existView = (id: string) => {
          return viewList.find((view) => view.id === id);
        };
        const hideView = (id: string) => {
          existView(id) &&
            setViewList((viewList) =>
              viewList.map((view) => {
                if (view.id === id) view.visible = false;
                return view;
              })
            );
        };
        const toggleView = (id: string) => {
          existView(id) &&
            setViewList((viewList) =>
              viewList.map((view) => {
                if (view.id === id) view.visible = !view.visible;
                return view;
              })
            );
        };
        const showView = (id: string) => {
          console.log("showView", id, "views:", viewList);
          existView(id) &&
            setViewList((viewList) =>
              viewList.map((view) => {
                if (view.id === id) view.visible = true;
                else view.visible = false;
                return view;
              })
            );
        };
        const setView = (id: string) => {
          showView(id);
        };
        proxy.register({
          toggleView,
          addView,
          setView,
          hideView,
        });
      }, [setViewList]);

      const options = {};

      if (isMobile) {
        options["w"] = "100%";
      }
      useEffect(() => {
        if (isMobile) {
          if (fullwidthControl.value) {
            document.getElementById("homeBox")!.style.width = "100%";
          } else {
            document.getElementById("homeBox")!.style.width = "";
          }
        }
      }, [fullwidthControl.value]);

      return (
        <>
          {
            // visibilityControl.visible &&
            <Box
              maxH={"100%"}
              w="13em"
              {...options}
              display={visibilityControl.visible ? "block" : "none"}
              flexShrink={0}
              flexGrow={1}
              className="sidebar sidebarV2"
            >
              {viewList.map((view) => {
                const { id, visible, viewData } = view;
                return (
                  <Box
                    w="100%"
                    h="100%"
                    key={id}
                    m="0 !important"
                    display={visible ? "block" : "none"}
                  >
                    {componentService.render(viewData)}
                  </Box>
                );
              })}
            </Box>
          }
        </>
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("sidebar", name, func);
    }
  );
