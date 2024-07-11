import { SafeAny } from "@/toolkit/types";
import { IShortcutItem } from "xbook/services/shortcutService";

export type IActivityItem = {
  id: string;
  name: string;
  shortcut?: string;
  unselectable?: boolean;
  icon: string;
  isActive?: boolean;
  order?: number;
  disabled?: boolean;
  events?: "click" | "focus" | "blur" | "mouseenter" | "mouseleave";
};

export type ActivityBarMethods = {
  addActivity(activity: IActivityItem): SafeAny;
  showActivity(id: string): SafeAny;
  removeActivity(id: string): SafeAny;
  setHighlightActivity(id: string): SafeAny;
  toggleActivity(id: string): SafeAny;
  hideActivity(id: string): SafeAny;
  setDirection(direction: string): SafeAny;
  // addShortcut(shortcut: IShortcutItem): SafeAny;
  hide(): void;
  show(): void;
  toggle(): void;
};
