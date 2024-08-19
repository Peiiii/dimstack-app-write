import {
  Box,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  forwardRef,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import { AiOutlineMenu, AiOutlineMenuFold } from "react-icons/ai";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { device } from "xbook/common/device";
import { commandService } from "xbook/services/commandService";
import { DragSortItem, moveItem } from "xbook/ui/components/DragSort";
import { PageActions } from "xbook/ui/page-box/components/page-actions";
import { PageBoxController } from "xbook/ui/page-box/controller";
import { componentService } from "../componentService";
import { Tab, TabIconButton } from "../components/tab";

export const createPageBox = (): {
  proxy: ReturnType<typeof PageBoxController.create>;
  instance: ReactNode;
} => {
  const pageBoxController = PageBoxController.create();

  const PageBoxView = () => {
    const proxy = pageBoxController;
    const {
      maxTabWidth,
      minTabWidth,
      usePageList,
      getPageList,
      setPageList,
      useTabBarCapacity,
      useTabBarVisible,
      useVisible,
    } = proxy;
    const pageList = usePageList();
    const tabBarCapacity = useTabBarCapacity();
    const tabBarVisible = useTabBarVisible();
    const visible = useVisible();
    const tabBarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (tabBarRef.current) {
        return proxy.observeTabBar(tabBarRef.current);
      }
      return () => {};
    }, []);
    const tabsView = useMemo(
      () =>
        pageList.map(({ id, title, active, status }, index) => {
          return device.isMobile() ? (
            <Tab
              minWidth={minTabWidth}
              maxWidth={maxTabWidth}
              key={id}
              title={title}
              status={status}
              isActive={active}
              onClick={() => {
                proxy.showPage(id);
              }}
              onClose={() => {
                proxy.removePage(id);
              }}
            />
          ) : (
            <DragSortItem
              style={{ height: "100%" }}
              key={id}
              id={id}
              index={index}
              moveItem={(idx1: number, idx2: number) => {
                setPageList(moveItem(getPageList(), idx1, idx2));
              }}
            >
              <Tab
                minWidth={minTabWidth}
                maxWidth={maxTabWidth}
                key={id}
                title={title}
                status={status}
                isActive={active}
                onClick={() => {
                  proxy.showPage(id);
                }}
                onClose={() => {
                  proxy.removePage(id);
                }}
              />
            </DragSortItem>
          );
        }),
      [pageList, minTabWidth, maxTabWidth, proxy]
    );

    const tabBarRight = useMemo(
      () => (
        <>
          <>
            <Flex
              align={"center"}
              h="100%"
              flexShrink={0}
              flexGrow={0}
              className="tab-bar-right-extra"
            >
              <PageActions />
              {pageList.length > tabBarCapacity && (
                <Menu>
                  <MenuButton
                    as={forwardRef((props, ref) => (
                      <TabIconButton {...props} ref={ref}>
                        <Icon fontSize={"lg"} as={AiOutlineMenu} />
                      </TabIconButton>
                    ))}
                  ></MenuButton>
                  <MenuList maxW="400px" className="right-list" zIndex={100}>
                    {pageList.slice(0).map(({ title, id, active, status }) => (
                      <MenuItem key={id}>
                        <Tab
                          minWidth={minTabWidth}
                          title={title}
                          isActive={active}
                          onClick={() => proxy.showPage(id)}
                          onClose={() => proxy.removePage(id)}
                          status={status}
                          stretch
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </>
        </>
      ),
      [pageList, tabBarCapacity]
    );

    const bodiesView = useMemo(
      () =>
        pageList.map((page) => {
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
        }),
      [pageList]
    );
    return (
      <PageBoxController.Provider value={pageBoxController}>
        <VStack
          w="100%"
          h="100%"
          align="stretch"
          className="page-box"
          overflow={"hidden"}
          display={visible ? "flex" : "none"}
          gap={0}
        >
          <>
            {tabBarVisible && (
              <HStack
                ref={tabBarRef}
                key={"tab-bar"}
                h={"40px"}
                minH={"40px"}
                className="tab-bar"
                // overflow="auto"
                w="100%"
                gap={0}
                zIndex={999999}
              >
                <TabIconButton
                  className="tab-bar-left-extra"
                  onClick={() => {
                    commandService.executeCommand("client:toggleHome");
                  }}
                >
                  <Icon fontSize={"lg"} as={AiOutlineMenuFold} />
                </TabIconButton>
                <HStack
                  className="tab-bar-content scroll scroll-9"
                  flexGrow={1}
                  h="100%"
                  // overflow={"hidden"}
                  overflowY={"hidden"}
                  overflowX="auto"
                  gap={0}
                >
                  {device.isMobile() ? (
                    tabsView
                  ) : (
                    <SimpleBar
                      autoHide
                      style={{
                        width: "100%",
                        display: "flex",
                        height: "100%",
                        flexFlow: "row",
                      }}
                    >
                      {tabsView}
                    </SimpleBar>
                  )}
                </HStack>
                {tabBarRight}
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
      </PageBoxController.Provider>
    );
  };
  return {
    proxy: pageBoxController,
    instance: <PageBoxView />,
  };
};
