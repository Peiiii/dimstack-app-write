import { LayoutNode } from "@/toolkit/factories/renderer";
import { defineController } from "app-toolkit";
import {
  createBeanFromObservable,
  createCustomReactBean,
  createReactBean,
  withUseHook,
} from "rx-bean";
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  tap,
} from "rxjs";
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

export type IEvent<T> = T;

export type IPageAction = {
  id: string;
  title: string;
  icon?: string;
  onClick: (e: IEvent<{ page: PageDescriptor }>) => void;
  when?: (() => Observable<boolean>) | Observable<boolean>;
};

// const cache = cacheService.space("pageBox", "localStorage");



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
  const {
    getPageList,
    setPageList,
    usePageList,
    PageList$: pageList$,
  } = createCustomReactBean(
    "PageList",
    loadPageList() as PageDescriptor[],
    ({ PageList$: pageList$ }) => {
      pageList$.pipe(distinctUntilChanged()).subscribe((pageList) => {
        cache.set("pageList", pageList);
      });
    }
  );

  const {
    getCurrentPage,
    useCurrentPage,
    CurrentPage$: currentPage$,
  } = withUseHook(
    createBeanFromObservable(
      "CurrentPage",
      pageList$.pipe(map((pageList) => pageList.find((p) => p.active))),
      undefined
    )
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

  const PageActions = createCustomReactBean(
    "PageActions",
    [] as IPageAction[],
    (bean) => {
      const enabledMap$ = new BehaviorSubject<Record<string, boolean>>({});
      const registerPageAction = (action: IPageAction) => {
        bean.setPageActions([...bean.getPageActions(), action]);
        const when$ =
          (action.when instanceof Function ? action.when() : action.when) ||
          of(true);
        const sub = when$.subscribe((enabled) => {
          enabledMap$.next({
            ...enabledMap$.getValue(),
            [action.id]: enabled,
          });
        });
        return () => {
          bean.setPageActions(
            bean.getPageActions().filter((p) => p.id !== action.id)
          );
          enabledMap$.next({
            ...enabledMap$.getValue(),
            [action.id]: false,
          });
          sub.unsubscribe();
        };
      };
      const {
        getActivePageActions,
        useActivePageActions,
        ActivePageActions$: activePageActions$,
      } = withUseHook(
        createBeanFromObservable(
          "ActivePageActions",
          combineLatest([bean.PageActions$, enabledMap$]).pipe(
            tap(([actions, enabledMap]) => {
              console.log("allPageActions", actions);
              console.log("enabledMap", enabledMap);
            }),
            map(([actions, enabledMap]) =>
              actions.filter((action) => enabledMap[action.id] === true)
            ),
            tap((actions) => console.log("activePageActions", actions))
          ),
          [] as IPageAction[]
        )
      );
      return {
        registerPageAction,
        getActivePageActions,
        useActivePageActions,
        activePageActions$,
      };
    }
  );

  return {
    addPage,
    removePage,
    showPage,
    updatePage,
    getCurrentPage,
    useCurrentPage,
    currentPage$,
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
    ...PageActions,
  };
});
