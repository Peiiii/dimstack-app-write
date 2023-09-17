import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import {
  ProxiedControls,
  VisibilityControl,
} from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { cacheService } from "xbook/services";
import { commandService } from "xbook/services/commandService";
import { componentService } from "./componentService";
import { LayoutNode } from "@/toolkit/common/renderer";
type PageDescriptor = {
  id: string;
  title: string;
  viewData?: LayoutNode;
  src?: string;
  active?: boolean;
};
type PageBoxMethods = {
  addPage(page: PageDescriptor): void;
  removePage(id: string): void;
  showPage(id: string): void;
  hideTabBar(): void;
  showTabBar(): void;
} & VisibilityControl;

const cache = cacheService.space("pageBox", "localStorage");

export const createPageBox = () =>
  createDeferredComponentProxy<PageBoxMethods>(
    ({ proxy }) => {
      const loadPageList = () => {
        const pageList: PageDescriptor[] = cache.get("pageList", []);

        return pageList.filter((page) => page.active);
      };
      const [pageList, setPageList] = useState<PageDescriptor[]>(loadPageList);
      useEffect(() => {
        cache.set("pageList", pageList);
      }, [pageList, setPageList]);
      const visibilityControl = ProxiedControls.useVisibilityControl(
        proxy,
        true
      );
      const [tabBarVisible, setTabBarVisible] = cache.useCachedState(
        "tabBar.visible",
        true
      );
      useEffect(() => {
        const addPage = (page: PageDescriptor, show: boolean = true) => {
          let exists = false;
          for (const p of pageList) {
            if (p.id === page.id) {
              exists = true;
            }
          }
          if (!exists) pageList.push(page);
          if (show) {
            pageList.forEach(
              (p) => (p.active = p.id === page.id ? true : false)
            );
          }
          setPageList(pageList.slice());
        };
        const removePage = (id: string) => {
          for (const p of pageList.slice()) {
            if (p.id === id) {
              const idx = pageList.indexOf(p);
              pageList.splice(idx, 1);
              if (p.active && pageList.length > 0) {
                pageList[idx % pageList.length].active = true;
              }
              setPageList(pageList.slice());
              break;
            }
          }
        };
        const showPage = (id: string) => {
          console.log("showPage:", id);
          setPageList((pageList) => {
            for (const p of pageList) {
              if (p.id === id) {
                p.active = true;
              } else {
                p.active = false;
              }
            }
            return pageList.slice();
          });
          proxy.show();
          commandService.executeCommandOnReady("client:toChatPage");
        };
        const hideTabBar = () => {
          setTabBarVisible(false);
        };
        const showTabBar = () => {
          setTabBarVisible(true);
        };
        proxy.register({
          addPage,
          showPage,
          removePage,
          hideTabBar,
          showTabBar,
        });
      }, [pageList, setPageList, setTabBarVisible, tabBarVisible, proxy]);
      const tabsView = pageList.map((page) => {
        const { title, id, active } = page;
        const classList: string[] = ["tab"];
        if (active) classList.push("active");
        return (
          <HStack
            key={id}
            h="100%"
            m="0 !important"
            className={classList.join(" ")}
            pl="5px"
            pr="5px"
            align={"center"}
            justify="flex-start"
            overflow={"hidden"}
            onClick={() => {
              proxy.showPage(id);
            }}
          >
            <Box
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
            >
              {title}
            </Box>
            <Icon
              as={VscClose}
              onClick={(e) => {
                proxy.removePage(id);
                e.stopPropagation();
                e.preventDefault();
              }}
            ></Icon>
          </HStack>
        );
      });
      const bodiesView = pageList.map((page) => {
        const { id, active, viewData } = page;
        let finalView;
        if (viewData) {
          finalView = componentService.render(viewData);
        }
        return (
          <Box
            key={id}
            m="0 !important"
            h="100%"
            w="100%"
            id={id}
            overflow={"auto"}
            display={active ? "block" : "none"}
          >
            {finalView}
          </Box>
        );
      });
      // console.log("pageList:", JSON.stringify(pageList));
      return (
        <VStack
          w="100%"
          h="100%"
          align="stretch"
          className="page-box"
          overflow={"hidden"}
          display={visibilityControl.visible ? "flex" : "none"}
        >
          <>
            {tabBarVisible && (
              <HStack
                key={"tab-bar"}
                h={"40px"}
                minH={"40px"}
                className="tab-bar"
                overflow="auto"
              >
                <Icon
                  ml="5px"
                  mr="5px"
                  as={AiOutlineMenuFold}
                  onClick={() => {
                    // commandService.executeCommand("sidebar.toggle");
                    commandService.executeCommand("client:toggleHome");
                  }}
                ></Icon>
                {tabsView}
              </HStack>
            )}
          </>
          <>
            {
              <Box
                key="body"
                flexBasis={"100%"}
                m="0 !important"
                className={"content-area"}
                h="100%"
                overflow={"hidden"}
              >
                {bodiesView}
              </Box>
            }
          </>
        </VStack>
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("pageBox", name, func);
    }
  );
