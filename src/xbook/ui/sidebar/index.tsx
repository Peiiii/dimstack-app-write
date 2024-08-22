import { Box } from "@chakra-ui/react";
import { css } from "@emotion/css";
import classNames from "classnames";
import { ReactNode, useEffect } from "react";
import { componentService } from "xbook/ui/componentService";
import { SidebarController } from "xbook/ui/sidebar/controller";

export const createSidebar = (): {
  proxy: ReturnType<typeof SidebarController.create>;
  instance: ReactNode;
} => {
  const sidebarController = SidebarController.create();
  const Component = () => {
    const isMobile = false;
    const {
      useVisible,
      hide,
      show,
      toggle,
      getFullwidth,
      setFullwidth,
      useFullwidth,
      getViewList,
      useActiveViewId,
      useViewList,
    } = sidebarController;
    const visible = useVisible();
    const isFullwidth = useFullwidth();
    const viewList = useViewList();

    const activeViewId = useActiveViewId();
    const options = {};
    if (isMobile) {
      options["w"] = "100%";
    }
    useEffect(() => {
      if (isMobile) {
        if (isFullwidth) {
          document.getElementById("homeBox")!.style.width = "100%";
        } else {
          document.getElementById("homeBox")!.style.width = "";
        }
      }
    }, [isFullwidth]);

    return (
      <>
        {
          <Box
            maxH={"100%"}
            {...options}
            overflow={"hidden"}
            flexGrow={1}
            className={classNames(
              "sidebar sidebarV2 " + (visible ? "" : "width-collapsed"),
              css`
                & {
                  .view.active {
                    /* display: block; */
                    visibility: visible;
                  }
                  .view.nonActive {
                    /* display: none; */
                    position: absolute;
                    left: -99999999px;
                    top: -99999999px;
                    visibility: hidden;
                  }
                }
              `
            )}
          >
            {viewList.map((view) => {
              const { id, viewData } = view;
              return (
                <Box
                  w="100%"
                  h="100%"
                  key={id}
                  m="0 !important"
                  className={classNames("view", {
                    active: activeViewId === id,
                    nonActive: activeViewId !== id,
                  })}
                >
                  {visible && componentService.render(viewData)}
                </Box>
              );
            })}
          </Box>
        }
      </>
    );
  };
  return {
    proxy: sidebarController,
    instance: <Component />,
  };
};
