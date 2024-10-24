import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import {
  FolderTreeNode,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/types";
import {
  TreeRegistryKeys,
  useTreeContext,
} from "@/toolkit/components/tree/tokens";
import { EventBus } from "@/toolkit/factories/eventBus";
import { TreeDataNode, TreeDataStore } from "@/toolkit/factories/treeDataStore";
import { isAnsestorPathOf } from "@/toolkit/utils/path";
import { useMemo, useState } from "react";

export const useDragDrop = (
  node: TreeDataNode<FolderTreeNode>,
  dataStore: TreeDataStore<FolderTreeNode>,
  eventBus: EventBus
) => {
  const { registry } = useTreeContext();
  const [dragPosition, setDragPosition] = useState<
    "before" | "inside" | "after" | null
  >(null);
  const [dragData, setDragData] = useState<{ draggedId: string } | null>(null);

  const canDrop = useMemo(() => {
    if (dragData && dragPosition === "inside") {
      const draggedNode = dataStore.getNode(dragData.draggedId);
      if (node.type !== TreeNodeTypeEnum.DIR) {
        return false;
      }
      // console.log("draggedNode", draggedNode, "dragData", dragData);
      if (draggedNode?.type === TreeNodeTypeEnum.DIR) {
        // 暂时不支持目录拖拽
        return false;
      }
      if (isAnsestorPathOf(draggedNode?.path || "", node.path || "")) {
        return false;
      }
    }
    return true;
  }, [dragPosition, dragData, node, dataStore]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // e.dataTransfer.setData("text/plain", node.id);
    registry.set(TreeRegistryKeys.DraggedNodeInfo, { nodeId: node.id });
    eventBus.emit(TreeEventKeys.DragStart, { node, event: e });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const rect = e.currentTarget.getBoundingClientRect();
    const draggedId = registry.get(TreeRegistryKeys.DraggedNodeInfo)?.nodeId;
    setDragData({ draggedId });
    const y = e.clientY - rect.top;
    if (y < rect.height * 0.25) {
      setDragPosition("before");
    } else if (y > rect.height * 0.75) {
      setDragPosition("after");
    } else {
      setDragPosition("inside");
    }
    eventBus.emit(TreeEventKeys.DragOver, { node, event: e });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    eventBus.emit(TreeEventKeys.DragEnter, { node, event: e });
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDragPosition(null);
    eventBus.emit(TreeEventKeys.DragLeave, { node, event: e });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragPosition) {
      eventBus.emit(TreeEventKeys.Drop, {
        node,
        event: e,
        position: dragPosition,
      });
    }
    setDragPosition(null);
  };

  return {
    dragPosition,
    canDrop,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
};
