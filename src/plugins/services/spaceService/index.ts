import { createDataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";

export const spaceService = createPlugin({
  initilize(xbook) {
    const spaceStore = createDataStore({
      initialState: [],
      persistConfig: {
        name: "spaces",
        type: "LocalStorage",
      },
    });
    xbook.registry.set("spaceStore", spaceStore);
    spaceStore.reduxStore.subscribe(() => {
      xbook.pipeService.emit("spaceStore.spaces", spaceStore.getData());
    });
  },
});
