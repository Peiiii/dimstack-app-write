import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import { createTreePluginTemplate } from "@/toolkit/components/tree/plugin";

export const treePluginEditNodeTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ viewSystem, eventBus }) {
    viewSystem.addNodeMenuItems([
      {
        id: "editNode",
        key: "editNode",
        event: TreeEventKeys.EditNode.name,
        name: "编辑",
        label: "编辑",
        when: "level >= 1",
      },
    ]);
    eventBus.on(TreeEventKeys.EditNode, ({ node }) => {
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node, { expanded: false })),
        editMode: true,
      });
    });
  },
});
