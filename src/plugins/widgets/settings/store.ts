import { createDataStore } from "@/toolkit/common/dataStore";
import { SettingEntry } from "./types";

export default createDataStore<SettingEntry>({
    name: "settings",
    initialState:[]
})