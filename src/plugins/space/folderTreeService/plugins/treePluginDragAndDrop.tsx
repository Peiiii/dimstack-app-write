import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import {
  TreeServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";

export const treePluginDragAndDrop = createTreePlugin<FolderTreeNode>({
  activate({ viewSystem, eventBus, dataStore, serviceBus }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);

    // 添加拖拽开始事件处理
    eventBus.on(TreeEventKeys.DragStart, ({ node, event }) => {
      event.dataTransfer.setData("text/plain", node.id);
      event.dataTransfer.effectAllowed = "move";
    });

    // 添加拖拽结束事件处理
    eventBus.on(TreeEventKeys.DragEnd, ({ node, event }) => {
      // 清理任何拖拽相关的状态
    });

    // 添加拖拽进入事件处理
    eventBus.on(TreeEventKeys.DragEnter, ({ node, event }) => {
      if (node.type === "dir") {
        treeService.updateViewState(node.id, { isDragOver: true });
      }
    });

    // 添加拖拽离开事件处理
    eventBus.on(TreeEventKeys.DragLeave, ({ node, event }) => {
      treeService.updateViewState(node.id, { isDragOver: false });
    });

    // 更新放置事件处理
    eventBus.on(TreeEventKeys.Drop, async ({ node, event, position }) => {
      const draggedNodeId = event.dataTransfer.getData("text");
      const draggedNode = dataStore.getNode(draggedNodeId);

      if (draggedNode && node.id !== draggedNode.id) {
        // 根据position决定如何移动节点
        if (position === "inside" && node.type === "dir") {
          await treeService.moveNode(draggedNode, node);
        } else if (position === "before" || position === "after") {
          //   const parentNode = dataStore.getParent(node.id);
          const parentNode = treeService.findParentNode(node.id);
          if (parentNode) {
            await treeService.moveNodeRelative(draggedNode, node, position);
          }
        }

        // 刷新视图
        treeService.deepRefresh(node.id);
      }

      treeService.updateViewState(node.id, { isDragOver: false });
    });
  },
});

export default treePluginDragAndDrop;
