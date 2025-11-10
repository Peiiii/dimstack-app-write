import store from "@/plugins/widgets/settings/store";
import type { SettingEntry } from "@/plugins/widgets/settings/types";

export class SettingService {
  addSettingEntry(entry: SettingEntry) {
    store.getActions().add(entry);
  }
}

export const settingService = new SettingService();

