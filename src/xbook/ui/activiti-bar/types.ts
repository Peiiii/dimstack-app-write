import { SafeAny } from "@/toolkit/types";

export type IActivityItem = {
  id: string;
  name: string;
  shortcut?: string;
  icon: string;
  isActive?: boolean;
  order?: number;
  disabled?: boolean;
  events?: "click" | "focus" | "blur" | "mouseenter" | "mouseleave";
};

export type IShortcutItem = {
  id: string;
  name: string;
  icon: string;
  hasPopover?: boolean;
  order?: number;
};

export type ActivityBarMethods = {
  addActivity(activity: IActivityItem): SafeAny;
  showActivity(id: string): SafeAny;
  removeActivity(id: string): SafeAny;
  setHighlightActivity(id: string): SafeAny;
  toggleActivity(id: string): SafeAny;
  hideActivity(id: string): SafeAny;
  setDirection(direction: string): SafeAny;
  addShortcut(shortcut: IShortcutItem): SafeAny;
  hide(): void;
  show(): void;
  toggle(): void;
};

export const createCRUDActions = <T>(
  setData: (v: T[]) => void,
  getData: () => T[],
  primaryKey: string = "id"
) => {
  const add = (data, record, _update = false) => {
    if (data.find((rec) => rec[primaryKey] === record[primaryKey])) {
      if (_update) return update(data, record);
    } else {
      data.push(record);
      return data.slice();
    }
    return data;
  };
  const update = (data, record) => {
    const pValue = record[primaryKey];
    const oldRecord = data.find((record) => record[primaryKey] === pValue);
    if (oldRecord) {
      Object.assign(oldRecord, record);
    }
    return data.slice();
  };
  const remove = (data, id) => {
    data.filter((record) => record[primaryKey] !== id);
    return data;
  };

  return {
    add: (record: T, _update = false) =>
      setData(add(getData(), record, _update)),
    update: (record: T) => setData(update(getData(), record)),
    delete: (id: string) => setData(remove(getData(), id)),
  };
};
