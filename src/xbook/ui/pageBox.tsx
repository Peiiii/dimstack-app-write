import { LayoutNode } from "@/toolkit/common/renderer";
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
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineMenu, AiOutlineMenuFold } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import {
  ProxiedControls,
  VisibilityControl,
} from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { cacheService } from "xbook/services";
import { commandService } from "xbook/services/commandService";
import { componentService } from "./componentService";
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
const Tab: FC<{
  title: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClose?: MouseEventHandler<SVGElement>;
  stretch?: boolean;
}> = ({
  title,
  isActive,
  onClick,
  onClose,
  stretch,
  width,
  minWidth,
  maxWidth,
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
      pl="5px"
      pr="5px"
      align={"center"}
      justify="flex-start"
      overflow={"hidden"}
      onClick={onClick}
      w={width !== undefined ? width : stretch ? "100%" : undefined}
      minW={minWidth}
      maxW={maxWidth}
      flexGrow={1}
    >
      <Box
        textOverflow={"ellipsis"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        title={title}
      >
        {shortTitle}
      </Box>
      {(stretch || width || minWidth) && <Box flexGrow={1} />}
      <Icon
        className="hover-visible"
        as={VscClose}
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
      const maxTabWidth = 800;
      const maxCacheSize = 5;
      const [tabBarWidth, setTabBarWidth] = useState(1e4);

      const resizeObserver = useMemo(
        () =>
          new ResizeObserver((entries) => {
            const el = entries[0];
            setTabBarWidth(el.contentRect.width);
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

      const loadPageList = () => {
        const pageList: PageDescriptor[] = cache.get("pageList", []);

        return pageList
          .filter((page) => page.active)
          .concat(
            pageList.filter((page) => !page.active).slice(0, maxCacheSize - 1)
          );
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
      const tabsView = pageList.map(({ id, title, active }) => {
        return (
          <Tab
            minWidth={minTabWidth}
            maxWidth={maxTabWidth}
            key={id}
            title={title}
            isActive={active}
            onClick={() => {
              proxy.showPage(id);
            }}
            onClose={() => {
              proxy.removePage(id);
            }}
          />
        );
      });
      let tabBarRight;
      if (pageList.length > tabBarCapacity) {
        tabsView.splice(tabBarCapacity);
        tabBarRight = (
          <>
            <Flex align={"center"} h="100%" flexShrink={0} flexGrow={0}>
              <Menu>
                <MenuButton
                  as={forwardRef((props, ref) => (
                    <TabIconButton {...props} ref={ref}>
                      <Icon fontSize={"lg"} as={AiOutlineMenu} />
                    </TabIconButton>
                  ))}
                ></MenuButton>
                <MenuList maxW="400px" className="right-list">
                  {pageList
                    .slice(tabBarCapacity)
                    .map(({ title, id, active }) => (
                      <MenuItem key={id}>
                        <Tab
                          minWidth={minTabWidth}
                          title={title}
                          isActive={active}
                          onClick={() => proxy.showPage(id)}
                          onClose={() => proxy.removePage(id)}
                          stretch
                        />
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            </Flex>
          </>
        );
      }
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
              >
                <TabIconButton
                  onClick={() => {
                    commandService.executeCommand("client:toggleHome");
                  }}
                >
                  <Icon fontSize={"lg"} as={AiOutlineMenuFold} />
                </TabIconButton>
                <HStack
                  className="tab-bar-content"
                  flexGrow={1}
                  h="100%"
                  overflow={"hidden"}
                  gap={0}
                >
                  {tabsView}
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
