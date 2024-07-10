import { defineController } from "app-toolkit";
import { createCustomReactBean } from "rx-bean";
import { eventBus } from "xbook/services/eventBus";
import { ActivityItem, createCRUDActions } from "xbook/ui/activiti-bar/types";
import { CacheController, withCache } from "xbook/ui/services/cache-controller";

const cache = CacheController.create({
  scope: "activityBar",
  storage: "localStorage",
});

export const ActivityBarController = defineController(() => {
  const isMobile = false; // const isMobile = device.isMobile();
  const direction = isMobile ? "row" : "column";

  const { getActiveId, setActiveId, useActiveId } = createCustomReactBean(
    "ActiveId",
    "",
    (bean) => {
      withCache(bean, cache);
    }
  );

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
  } = createCustomReactBean("ActivityList", [] as ActivityItem[], (bean) => {
    withCache(bean, cache);
    const addActivity = (activity: ActivityItem) => {
      const activityList = bean.getActivityList();
      const existActivity = (id: string) => {
        return activityList.find((activity) => activity.id === id);
      };
      if (existActivity(activity.id)) {
        return activityList;
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
      if (activityList.find((a) => a.id === id)) {
        setActiveId(id);
        eventBus.emit(`activity:${id}:clicked`);
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

  const { addShortcut, useShortcutList } = createCustomReactBean(
    "ShortcutList",
    [] as ActivityItem[],
    (bean) => {
      withCache(bean, cache);
      const { add: addShortcut } = createCRUDActions(
        bean.setShortcutList,
        bean.getShortcutList
      );
      return { addShortcut };
    }
  );

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
    getActivityList,
    useActivityList,
    setActivityList,
    addActivity,
    showActivity,
    setHighlightActivity,
    removeActivity,
    addShortcut,
    useShortcutList,
  };
});
