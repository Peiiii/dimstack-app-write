import { EventKeys } from "@/constants/eventKeys";
import { defineController } from "app-toolkit";
import { createCustomReactBean } from "rx-bean";
import { combineLatest } from "rxjs";
import { eventBus } from "xbook/services/eventBus";
import { IActivityItem } from "xbook/ui/activiti-bar/types";
import { CacheController, withCache } from "xbook/ui/services/cache-controller";

const cache = CacheController.create({
  scope: "activityBar",
  storage: "localStorage",
});

export const ActivityBarController = defineController(() => {
  const isMobile = false; // const isMobile = device.isMobile();
  const direction = isMobile ? "row" : "column";

  const {
    getActiveId,
    setActiveId,
    useActiveId,
    ActiveId$: activeId$,
  } = createCustomReactBean("ActiveId", "", (bean) => {
    withCache(bean, cache);
  });

  const { hide, show, toggle, useVisible, getVisible } = createCustomReactBean(
    "Visible",
    true,
    (bean) => {
      withCache(bean, cache);
      const hide = () => {
        bean.setVisible(false);
      };
      const show = () => {
        bean.setVisible(true);
      };
      const toggle = () => {
        bean.setVisible(!bean.getVisible());
      };
      return {
        hide,
        show,
        toggle,
      };
    }
  );

  const {
    getActivityList,
    useActivityList,
    setActivityList,
    addActivity,
    showActivity,
    setHighlightActivity,
    removeActivity,
    ActivityList$: activityList$,
  } = createCustomReactBean("ActivityList", [] as IActivityItem[], (bean) => {
    // withCache(bean, cache);
    const addActivity = (activity: IActivityItem, update = false) => {
      const activityList = bean.getActivityList();
      const existActivity = (id: string) => {
        return activityList.find((activity) => activity.id === id);
      };
      if (existActivity(activity.id)) {
        if (update) {
          setActivityList(
            activityList.map((a) => {
              if (a.id === activity.id) {
                return {
                  ...a,
                  ...activity,
                };
              }
              return a;
            })
          );
          return;
        } else {
          return;
        }
      }
      if (activity.isActive) {
        activityList.forEach((activity) => {
          activity.isActive = false;
        });
      }
      activityList.push(activity);
      setActivityList(activityList.slice());
    };

    const setHighlightActivity = (id: string) => {
      setActiveId(id);
    };

    const showActivity = (id: string) => {
      const activityList = bean.getActivityList();
      const activity = activityList.find((a) => a.id === id);
      if (activity) {
        if (!activity.unselectable) setActiveId(id);
        eventBus.emit(EventKeys.ActivityBar.ActivityClicked(id));
      }
    };

    const removeActivity = (id: string) => {
      const activityList = bean.getActivityList();
      const activeId = getActiveId();
      const existingActivity = activityList.find((a) => a.id === id);
      const isActive = id === activeId;
      const isOnly = activityList.length === 1;
      setActivityList(activityList.filter((a) => a.id !== id));
      if (existingActivity && isActive && !isOnly) {
        showActivity(activityList.filter((a) => a.id !== id)[0].id);
      }
    };
    return {
      addActivity,
      showActivity,
      setHighlightActivity,
      removeActivity,
    };
  });

  const { getExpanded, setExpanded, useExpanded, toggleExpanded } = createCustomReactBean(
    "Expanded",
    false,
    (bean) => {
      withCache(bean, cache);
      const toggleExpanded = () => {
        bean.setExpanded(!bean.getExpanded());
      };
      return {
        toggleExpanded,
      };
    }
  );

  combineLatest([activeId$, activityList$]).subscribe(
    ([activeId, activityList]) => {
      if (activeId) {
        const activity = activityList.find((a) => a.id === activeId);
        if (!activity) {
          setActiveId("");
        } else {
          if (activity.unselectable) {
            setActiveId("");
          }
        }
      }
    }
  );

  // const { addShortcut, useShortcutList } = createCustomReactBean(
  //   "ShortcutList",
  //   [] as IShortcutItem[],
  //   (bean) => {
  //     withCache(bean, cache);
  //     const { add: addShortcut } = createCRUDActions(
  //       bean.setShortcutList,
  //       bean.getShortcutList
  //     );
  //     return { addShortcut };
  //   }
  // );

  const options = {};
  if (isMobile) {
    options["w"] = "100%";
    options["minH"] = "48px";
    options["p"] = "0.3rem 0.5rem";
  } else {
    options["h"] = "100%";
    options["minW"] = "48px";
    options["p"] = "0.5rem 0";
  }
  const textFontSize = "0.8rem";
  const iconFontSize = "1.5rem";
  return {
    direction,
    isMobile,
    options,
    textFontSize,
    iconFontSize,
    getVisible,
    useVisible,
    show,
    hide,
    toggle,
    getActiveId,
    useActiveId,
    getActivityList: () =>
      getActivityList().sort((a, b) => (a.order || 0) - (b.order || 0)),
    useActivityList: () =>
      useActivityList().sort((a, b) => (a.order || 0) - (b.order || 0)),
    setActivityList,
    addActivity,
    showActivity,
    setHighlightActivity,
    removeActivity,
    // addShortcut,
    // useShortcutList,
    getExpanded,
    setExpanded,
    useExpanded,
    toggleExpanded,
  };
});
