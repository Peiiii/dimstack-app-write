import { LayoutNode } from "@/toolkit/factories/renderer";
import { defineController } from "app-toolkit";
import { useEffect, useState } from "react";
import { createCustomReactBean, createReactBean } from "rx-bean";
import { distinctUntilChanged, map } from "rxjs";
import { CacheController, withCache } from "xbook/ui/services/cache-controller";
import { createCRUDActions } from "xbook/utils/create-actions";

type View = {
  id: string;
  viewData: LayoutNode;
  visible?: boolean;
};

const cache = CacheController.create({
  scope: "pageBox",
  storage: "localStorage",
});

export const SidebarController = defineController(() => {
  const ActiveViewId = createCustomReactBean(
    "ActiveViewId",
    undefined as string | undefined,
    (bean) => {
      withCache(bean, cache);
      return {};
    }
  );
  const { setActiveViewId, getActiveViewId } = ActiveViewId;
  const ViewList = createCustomReactBean("ViewList", [] as View[], (bean) => {
    withCache(bean, cache);
    const { setViewList, getViewList, ViewList$ } = bean;
    const {
      add: addView,
      update: updateView,
      delete: removeView,
    } = createCRUDActions(setViewList, getViewList, "id");

    const toggleView = (id: string) => {
      if (getActiveViewId() === id) {
        setActiveViewId(undefined);
      } else {
        setActiveViewId(id);
      }
    };

    const showView = (id: string) => {
      setActiveViewId(id);
    };

    const hideView = (id: string) => {
      if (getActiveViewId() === id) {
        setActiveViewId(undefined);
      }
    };

    const useView = (id: string) => {
      const [state, setState] = useState(
        getViewList().find((v) => v.id === id)
      );
      useEffect(() => {
        const sub = ViewList$.pipe(
          map((views) => views.find((v) => v.id === id)),
          distinctUntilChanged()
        ).subscribe(setState);
        return () => sub.unsubscribe();
      }, [id]);
      return state;
    };

    return {
      addView,
      updateView,
      removeView,
      toggleView,
      showView,
      hideView,
      useView,
    };
  });
  const Visible = createCustomReactBean("Visible", true, (bean) => {
    withCache(bean, cache);
    const { getVisible, setVisible } = bean;
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      toggle: () => setVisible(!getVisible()),
    };
  });
  const Fullwidth = createCustomReactBean("Fullwidth", true, (bean) => {
    withCache(bean, cache);
    return {};
  });
  const getCurrentView = () => {
    const viewList = ViewList.getViewList();
    return viewList.find((view) => view.id === getActiveViewId());
  };
  const useCurrentView = () => {
    const id = ActiveViewId.useActiveViewId() || "";
    return ViewList.useView(id);
  };
  const setView = (id: string) => {
    ActiveViewId.setActiveViewId(id);
  };
  return {
    ...ActiveViewId,
    ...ViewList,
    ...Visible,
    ...Fullwidth,
    getCurrentView,
    useCurrentView,
    setView,
  };
});
