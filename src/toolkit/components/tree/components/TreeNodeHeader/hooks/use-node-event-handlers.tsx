import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import { useTreeContext } from "@/toolkit/components/tree/tokens";
import { EventBus } from "@/toolkit/factories/eventBus";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";

// 事件处理的 hooks
export const useNodeEventHandlers = (
  node: TreeDataNode,
  parentNode: TreeDataNode
) => {
  const { eventBus } = useTreeContext();
  const handleNodeClick = (event) => {
    eventBus.emit(TreeEventKeys.NodeClick, { node, event });
  };

  const handleKeyDown = (event) => {
    if (event.code.toLowerCase() === "enter") {
      eventBus.emit(TreeEventKeys.KeydownEnter, { node, event });
    }
  };

  return { handleNodeClick, handleKeyDown };
};
