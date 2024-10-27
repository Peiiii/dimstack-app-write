import {
  IMenuItem,
  IMenuItemData,
  MenuManager,
} from "@/toolkit/factories/menu-manager";
import { parseWhenClause } from "@/toolkit/utils/when-clause";

export interface IEnhancedMenuItemData extends IMenuItemData {
  key: string; // addFile
  label: string; // Add File
  icon?: string; // icon-add-file
  /**
   * @description display only when the condition is true
   */
  when?: string; // fileType === 'dir'
  /**
   * @description validate the menu item, if the condition is false, the menu item will be disabled, and show the message
   */
  validationRules?: {
    check: string;
    failMessage: string;
  }[];
  name?: string;
  title?: string;
}

export type IEnhancedMenuItem<
  T extends IEnhancedMenuItemData = IEnhancedMenuItemData
> = IMenuItem<T>;

export class EnhancedMenuManager<
  T extends IEnhancedMenuItemData = IEnhancedMenuItemData
> extends MenuManager<T> {}

export const validateMenuItem = <TContext extends Record<string, any>>(
  item: IEnhancedMenuItem,
  context: TContext
) => {
  const { validationRules } = item.data;
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
