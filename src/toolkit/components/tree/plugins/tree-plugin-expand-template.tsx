import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import { createTreePluginTemplate } from "@/toolkit/components/tree/plugin";
import { BaseServicePoints } from "@/toolkit/components/tree/tokens";

export const treePluginExpandTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ eventBus, viewSystem, serviceBus, dataStore }) {
    const treeService = serviceBus.createProxy(BaseServicePoints.TreeService);
    eventBus.on(TreeEventKeys.NodeClick, ({ node: { id } }) =>
      treeService.toggleNode({ id })
    );
    eventBus.on(TreeEventKeys.EditKeyEnter, ({ node: { id } }) =>
      treeService.toggleNode({ id })
    );
  },
});
