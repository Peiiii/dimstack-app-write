import { AnyFunction, SafeAny } from "@/toolkit/common/types";
import xbook from "xbook";
import { ActivityItem } from "xbook/ui/activityBar";
const _xbook = xbook;

type SimplePageMap = {
  [pageId: string]: {
    title: string;
  };
};
type SimplePageConfiguration = [string, SimplePageMap] | SimplePageMap;

export type PluginConfiguration = {
  initilize?: (xbook: typeof _xbook) => void;
  addServices?: (
    xbook: typeof _xbook
  ) =>
    | [string, { [name: string]: AnyFunction }]
    | { [name: string]: AnyFunction };
  addEvents?: (xbook: typeof _xbook) => SafeAny;
  addCommands?: (xbook: typeof _xbook) => SafeAny;
  addComponents?: (
    xbook: typeof _xbook
  ) => Record<string, React.ComponentType<SafeAny>>;
  addActivities?: (xbook: typeof _xbook) => ActivityItem | ActivityItem[];
  addPages?: (xbook: typeof _xbook) => SimplePageConfiguration;
};
const createHelper = (xbook: typeof _xbook) => {
  const doAddEvents = (res) => {
    if (Array.isArray(res)) {
      xbook.eventBus.createScopedProxy(res[0]).on(res[1]);
    } else if (res) {
      xbook.eventBus.on(res);
    }
  };

  const doAddCommands = (res) => {
    if (Array.isArray(res)) {
      xbook.commandService.registerCommandWithScope(res[0], res[1]);
    } else if (res) {
      xbook.commandService.registerCommand(res);
    }
  };

  const doAddServices = (res) => {
    if (Array.isArray(res)) {
      xbook.serviceBus.exposeAt(res[0], res[1]);
    } else if (res) {
      xbook.serviceBus.expose(res);
    }
  };

  const doAddComponents = (
    res: Record<string, React.ComponentType<SafeAny>>
  ) => {
    Object.entries(res).forEach(([name, component]: [string, SafeAny]) => {
      xbook.componentService.register(name, component);
    });
  };

  const doAddActivities = (res) => {
    if (Array.isArray(res)) {
      res.forEach((activity) => {
        xbook.layoutService.activityBar.addActivity(activity);
      });
    } else {
      xbook.layoutService.activityBar.addActivity(res);
    }
  };

  const doAddPages = (res: SimplePageConfiguration) => {
    const addPageAt = (scope: string, { id, title }) => {
      xbook.eventBus.createScopedProxy(scope).on(id, () => {
        xbook.layoutService.pageBox.addPage({
          id,
          title,
          viewData: {
            type: id,
          },
        });
        xbook.layoutService.pageBox.showPage(id);
      });
    };
    const addPage = ({ id, title }) => {
      xbook.eventBus.on(id, () => {
        xbook.layoutService.pageBox.addPage({
          id,
          title,
          viewData: {
            type: id,
          },
        });
        xbook.layoutService.pageBox.showPage(id);
      });
    };
    if (Array.isArray(res)) {
      for (const [id, { title }] of Object.entries(res[1])) {
        addPageAt(res[0], { id, title });
      }
    } else if (res) {
      for (const [id, { title }] of Object.entries(res)) {
        addPage({ id, title });
      }
    }
  };

  return {
    doAddEvents,
    doAddCommands,
    doAddServices,
    doAddComponents,
    doAddActivities,
    doAddPages,
  };
};

export const createPlugin = ({
  initilize,
  addCommands,
  addEvents,
  addServices,
  addComponents,
  addPages,
  addActivities,
}: PluginConfiguration) => {
  return {
    activate: () => {
      const helper = createHelper(xbook); // create helper
      if (addEvents) {
        const res = addEvents(xbook);
        helper.doAddEvents(res);
      }
      if (addCommands) {
        const res = addCommands(xbook);
        helper.doAddCommands(res);
      }
      if (addServices) {
        const res = addServices(xbook);
        helper.doAddServices(res);
      }
      if (addComponents) {
        const res = addComponents(xbook);
        helper.doAddComponents(res);
      }
      if (addActivities) {
        const res = addActivities(xbook);
        helper.doAddActivities(res);
      }
      if (addPages) {
        const res = addPages(xbook);
        helper.doAddPages(res);
      }
      initilize?.(xbook);
    },
  };
};
