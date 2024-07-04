import { StorageProviders } from "@/toolkit/factories/cacheSpace";
import { LayoutNode } from "@/toolkit/factories/renderer";
import { defineController } from "app-toolkit";
import {
  createBeanFromObservable,
  createCustomReactBean,
  createReactBean,
  withUseHook,
} from "rx-bean";
import { distinctUntilChanged, map } from "rxjs";
import "simplebar-react/dist/simplebar.min.css";
import { VisibilityControl } from "xbook/hooks/proxiedControls";
import { commandService } from "xbook/services/commandService";
import { CacheController } from "../services/cache-controller";

export type PageDescriptor = {
  id: string;
  title: string;
  viewData?: LayoutNode;
  src?: string;
  active?: boolean;
  status?: "deleted" | "loading";
};

export type PageBoxMethods = {
  addPage(page: PageDescriptor): void;
  removePage(id: string): void;
  showPage(id: string): void;
  updatePage(page: Partial<PageDescriptor> & Pick<PageDescriptor, "id">): void;
  hideTabBar(): void;
  showTabBar(): void;
} & VisibilityControl;

// const cache = cacheService.space("pageBox", "localStorage");

export const getStorage = (storage: "localStorage" | "memory") => {
  return StorageProviders[storage];
};

const cache = CacheController.create({
  scope: "pageBox",
  storage: "localStorage",
});

export const PageBoxController = defineController(() => {
  //   const tabBarRef = useRef<HTMLDivElement>(null);
  const minTabWidth = 100;
  const maxTabWidth = 10000;
  const maxCacheSize = 5;
  //   const [tabBarWidth, setTabBarWidth] = useState(10000);
  const {
    getTabBarWidth,
    setTabBarWidth,
    TabBarWidth$: tabBarWidth$,
  } = createReactBean("TabBarWidth", 10000);

  const { useTabBarCapacity } = withUseHook(
    createBeanFromObservable(
      "TabBarCapacity",
      tabBarWidth$.pipe(
        map((width) => Math.floor((width - 100) / (minTabWidth * 1.5)))
      ),
      100
    )
  );

  const resizeObserver = new ResizeObserver((entries) => {
    const el = entries[0];
    setTimeout(() => {
      setTabBarWidth(el.contentRect.width);
    }, 100);
  });

  const observeTabBar = (element: HTMLElement) => {
    if (element) {
      resizeObserver.observe(element);
      return () => {
        resizeObserver.unobserve(element);
      };
    }
    return () => {};
  };

  console.log("rendering pageBox...");
  const loadPageList = () => {
    const pageList: PageDescriptor[] = cache.get("pageList", []);
    return pageList
      .filter((page) => page.active)
      .concat(
        pageList.filter((page) => !page.active).slice(0, maxCacheSize - 1)
      );
  };
  const { getPageList, setPageList, usePageList } = createCustomReactBean(
    "PageList",
    loadPageList() as PageDescriptor[],
    ({ PageList$: pageList$ }) => {
      pageList$.pipe(distinctUntilChanged()).subscribe((pageList) => {
        cache.set("pageList", pageList);
      });
    }
  );

  const { getVisible, setVisible, useVisible } = createCustomReactBean(
    "Visible",
    true,
    () => {}
  );

  //   const [visible, setVisible] = cache.useCachedState("visible", true);
  const {
    get: getTabBarVisible,
    set: setTabBarVisible,
    use: useTabBarVisible,
  } = cache.createCachedState("TabBarVisible", true);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible(!getVisible());

  const addPage = (page: PageDescriptor, show: boolean = true) => {
    let exists = false;
    const pageList = getPageList().slice();
    for (const p of pageList) {
      if (p.id === page.id) {
        exists = true;
      }
    }
    if (!exists) pageList.push(page);
    if (show) {
      pageList.forEach((p) => (p.active = p.id === page.id ? true : false));
    }
    setPageList(pageList.slice());
  };
  const removePage = (id: string) => {
    const pageList = getPageList().slice();
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
    const pageList = getPageList().slice();
    setPageList(pageList.map((p) => (p.id === id ? { ...p, ...page } : p)));
  };
  const showPage = (id: string) => {
    console.log("showPage:", id);
    const pageList = getPageList().slice();
    for (const p of pageList) {
      if (p.id === id) {
        p.active = true;
      } else {
        p.active = false;
      }
    }
    setPageList(pageList.slice());
    show();
    commandService.executeCommandOnReady("client:toChatPage");
  };
  const hideTabBar = () => {
    setTabBarVisible(false);
  };
  const showTabBar = () => {
    setTabBarVisible(true);
  };

  return {
    addPage,
    removePage,
    showPage,
    updatePage,
    hideTabBar,
    showTabBar,
    getTabBarWidth,
    useTabBarCapacity,
    observeTabBar,
    getTabBarVisible,
    useTabBarVisible,
    getVisible,
    setVisible,
    useVisible,
    show,
    hide,
    toggle,
    getPageList,
    setPageList,
    usePageList,
    minTabWidth,
    maxTabWidth,
  };
});
