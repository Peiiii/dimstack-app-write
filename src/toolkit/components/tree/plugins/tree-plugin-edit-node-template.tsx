import {
  TreeServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { createTreePluginTemplate } from "@/toolkit/components/tree/plugin";

export const treePluginEditNodeTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ viewSystem, eventBus, serviceBus }) {
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
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);    
    eventBus.on(TreeEventKeys.EditNode, ({ node }) => {      
      treeService.updateViewState(node.id, {
        editMode: true,
      });
    });
  },
});
