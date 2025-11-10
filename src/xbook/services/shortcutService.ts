import { defineController } from "app-toolkit";
import { createCustomReactBean } from "rx-bean";
import { CacheController } from "xbook/ui/services/cache-controller";
import { createCRUDActions } from "xbook/utils/create-actions";

const cache = CacheController.create({
  scope: "shortcut",
  storage: "localStorage",
});

export type IShortcutItem = {
  id: string;
  name: string;
  icon: string;
  hasPopover?: boolean;
  order?: number;
};

export const ShortcutController = defineController(() => {
  const { addShortcut, useShortcutList } = createCustomReactBean(
    "ShortcutList",
    [] as IShortcutItem[],
    (bean) => {
      // withCache(bean, cache);
      const { add: addShortcut } = createCRUDActions(
        bean.setShortcutList,
        bean.getShortcutList
      );
      return {
        addShortcut,
      };
    }
  );
  return {
    addShortcut,
    useShortcutList: () => {
      return useShortcutList().sort(
        (a, b) => (a.order || Infinity) - (b.order || Infinity)
      );
    },
  };
});

export const shortcutService = ShortcutController.create();
