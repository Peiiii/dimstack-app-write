import { parseWhenClause } from "@/toolkit/utils/when-clause";
import { defineController } from "app-toolkit";
import { createCustomReactBean } from "rx-bean";
import { createCRUDActions } from "xbook/utils/create-actions";

export interface MenuItem {
  id: string; // addFile
  key: string; // addFile
  label: string; // Add File
  order?: number;
  icon?: string; // icon-add-file
  group?: string; // operations/add
  when?: string; // fileType === 'dir'
  validationRules?: {
    check: string;
    failMessage: string;
  }[];
  name?: string;
  title?: string;
  children?: MenuItem[];
}

export const validateMenuItem = (
  item: MenuItem,
  context: Record<string, any>
) => {
  const { validationRules } = item;
  const result = {
    isValid: true,
    message: "",
  };
  if (!validationRules) return result;
  for (const rule of validationRules) {
    const { check, failMessage } = rule;
    if (!parseWhenClause(check).eval(context)) {
      result.isValid = false;
      result.message = failMessage;
      return result;
    }
  }
  return result;
};

export const MenuController = defineController(() => {
  const MenuItems = createCustomReactBean(
    "MenuItems",
    [] as MenuItem[],
    ({ getMenuItems, setMenuItems, useMenuItems }) => {
      const {
        add: simpleAddMenuItem,
        update: updateMenuItem,
        delete: removeMenuItem,
      } = createCRUDActions(setMenuItems, getMenuItems, "id");

      const upsertMenuItem = (item: MenuItem) => {
        const existingItem = getMenuItems().find((i) => i.id === item.id);
        if (existingItem) {
          updateMenuItem(item);
        } else {
          simpleAddMenuItem(item);
        }
      };

      const sortMenuItems = (items: MenuItem[]) => {
        return items.sort(
          (a, b) => (a.order || Infinity) - (b.order || Infinity)
        );
      };

      const useGroupMenuItems = (group?: string) => {
        const items = useMenuItems().filter((item) => {
          if (!group) return !item.group;
          return item.group === group;
        });
        return sortMenuItems(items);
      };

      const getGroupMenuItems = (group?: string) => {
        const items = getMenuItems().filter((item) => {
          if (!group) return !item.group;
          return item.group === group;
        });
        return sortMenuItems(items);
      };

      return {
        upsertMenuItem,
        // updateMenuItem,
        removeMenuItem,
        getGroupMenuItems,
        useGroupMenuItems,
      };
    }
  );
  return {
    ...MenuItems,
  };
});
