import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
export default createTreePlugin({
  addOptions() {
    return {
      clickNode: () => {},
    };
  },
  activate(context) {
    const { eventBus } = context;
    eventBus.on("clickNode", ({ node }) => {
      this.options.clickNode(node, context);
    });
  },
});
