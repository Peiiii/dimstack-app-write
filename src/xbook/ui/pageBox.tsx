import { LayoutNode } from "@/toolkit/factories/renderer";
import {
  Box,
  Button,
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
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMenuFold,
} from "react-icons/ai";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { device } from "xbook/common/device";
import { VisibilityControl } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { cacheService } from "xbook/services";
import { commandService } from "xbook/services/commandService";
import { DragSortItem, moveItem } from "xbook/ui/components/DragSort";
import { componentService } from "./componentService";

type PageDescriptor = {
  id: string;
  title: string;
  viewData?: LayoutNode;
  src?: string;
  active?: boolean;
  status?: "deleted" | "loading";
};
type PageBoxMethods = {
  addPage(page: PageDescriptor): void;
  removePage(id: string): void;
  showPage(id: string): void;
  updatePage(page: Partial<PageDescriptor> & Pick<PageDescriptor, "id">): void;
  hideTabBar(): void;
  showTabBar(): void;
} & VisibilityControl;

const cache = cacheService.space("pageBox", "localStorage");
const Tab: FC<{
  title: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClose?: MouseEventHandler<SVGElement>;
  stretch?: boolean;
  status?: PageDescriptor["status"];
}> = ({
  title,
  isActive,
  onClick,
  onClose,
  stretch,
  width,
  minWidth,
  maxWidth,
  status,
}) => {
  const classList: string[] = ["tab", "hover-action"];
  if (isActive) classList.push("active");
  const shortTitle = useMemo(
    () => title.split("::").splice(-1)[0].split("/").splice(-1)[0],
    [title]
  );
  return (
    <HStack
      h="100%"
      m="0 !important"
      className={classList.join(" ")}
      pl="12px"
      pr="12px"
      align={"center"}
      justify="flex-start"
      overflow={"hidden"}
      onClick={onClick}
      w={width !== undefined ? width : stretch ? "100%" : undefined}
      minW={minWidth}
      maxW={maxWidth}
      flexGrow={1}
      flexShrink={0}
    >
      <Box
        textOverflow={"ellipsis"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        title={title}
        className="tab-title"
        flexGrow={1}
        textDecoration={status === "deleted" ? "line-through" : undefined}
      >
        {shortTitle}
      </Box>
      {(stretch || width || minWidth) && <Box flexGrow={1} />}
      <Icon
        flexShrink={0}
        className="hover-visible"
        as={AiOutlineClose}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose?.(e);
        }}
      ></Icon>
    </HStack>
  );
};

const TabIconButton = forwardRef((_, ref) => (
  <Button bg="none" p="0" borderRadius={0} color={"inherit"} {..._} ref={ref} />
));
export const createPageBox = () =>
  createDeferredComponentProxy<PageBoxMethods>(
    ({ proxy }) => {
      const tabBarRef = useRef<HTMLDivElement>(null);
      const minTabWidth = 100;
      const maxTabWidth = 10000;
      const maxCacheSize = 5;
      const [tabBarWidth, setTabBarWidth] = useState(1e4);

      const resizeObserver = useMemo(
        () =>
          new ResizeObserver((entries) => {
            const el = entries[0];
            setTimeout(() => {
              setTabBarWidth(el.contentRect.width);
            }, 100);
          }),
        []
      );
      useEffect(() => {
        if (tabBarRef.current) {
          setTabBarWidth(tabBarRef.current.clientWidth);
          resizeObserver.observe(tabBarRef.current);
        }
      }, [tabBarRef.current, resizeObserver]);
      const tabBarCapacity = useMemo(
        () => Math.floor((tabBarWidth - 100) / (minTabWidth * 1.5)),
        [tabBarWidth]
      );

      console.log("rendering pageBox...");
      const loadPageList = useCallback(() => {
        const pageList: PageDescriptor[] = cache.get("pageList", []);

        return pageList
          .filter((page) => page.active)
          .concat(
            pageList.filter((page) => !page.active).slice(0, maxCacheSize - 1)
          );
      }, [cache]);
      const [pageList, setPageList] = useState<PageDescriptor[]>(loadPageList);
      useEffect(() => {
        cache.set("pageList", pageList);
      }, [pageList, setPageList]);
      // const visibilityControl = ProxiedControls.useVisibilityControl(
      //   proxy,
      //   true
      // );

      const [visible, setVisible] = cache.useCachedState("visible", true);
      const [tabBarVisible, setTabBarVisible] = cache.useCachedState(
        "tabBar.visible",
        true
      );
      useEffect(() => {
        const show = () => setVisible(true);
        const hide = () => setVisible(false);
        const toggle = () => setVisible(!visible);
        return proxy.register({ show, hide, toggle });
      }, [proxy, visible]);

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
        const updatePage = (
          page: Partial<PageDescriptor> & Pick<PageDescriptor, "id">
        ) => {
          const { id } = page;
          setPageList((pl) =>
            pl.map((p) => (p.id === id ? { ...p, ...page } : p))
          );
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
          updatePage,
          hideTabBar,
          showTabBar,
        });
      }, [pageList, setPageList, setTabBarVisible, tabBarVisible, proxy]);
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
                  setPageList((data) => moveItem(data, idx1, idx2));
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
        () =>
          pageList.length > tabBarCapacity && (
            <>
              <Flex
                align={"center"}
                h="100%"
                flexShrink={0}
                flexGrow={0}
                className="tab-bar-right-extra"
              >
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
              </Flex>
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
      // console.log("pageList:", JSON.stringify(pageList));
      return (
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
                zIndex={1}
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
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("pageBox", name, func);
    }
  );
