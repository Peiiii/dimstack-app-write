import { createDataStore } from "@/toolkit/factories/dataStore";
import { SettingEntry } from "./types";

export default createDataStore<SettingEntry>({
    name: "settings",
    initialState:[]
})