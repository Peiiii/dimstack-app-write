import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";

export default createTreePlugin({
  addOptions() {
    return {
      rootId: "root",
    };
  },
  activate({ viewSystem }) {
    viewSystem.viewStateStore
      .getActions()
      .upsert(
        viewSystem.getDefaultViewState(
          { id: this.options.rootId },
          { expanded: true }
        )
      );
  },
});
