import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { WidgetContext } from "@/toolkit/components/tree";
import { useDragDrop } from "@/toolkit/components/tree/components/hooks/use-drag-drop";
import { TreeContext } from "@/toolkit/components/tree/tokens";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Box, Flex } from "@chakra-ui/react";
import classNames from "classnames";

export const TreeNode = ({
  node,
  level,
  context,
  parentNode,
}: {
  node: TreeDataNode<FolderTreeNode>;
  level: number;
  context: WidgetContext<TreeDataNode<FolderTreeNode>>;
  parentNode?: TreeDataNode;
}) => {
  const { dataStore, viewSystem, eventBus } = context;
  const { renderer } = viewSystem;
  const { id } = node;
  const nodeData = dataStore.useNode(id) as TreeDataNode<FolderTreeNode>;
  if (!nodeData) return null;
  const { children } = nodeData;
  const viewState =
    viewSystem.viewStateStore.useRecord(id) ||
    viewSystem.getDefaultViewState({ id });

  const { expanded, highlight, isDragOver } = viewState;

  const {
    dragPosition,
    canDrop,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useDragDrop(nodeData, dataStore, eventBus);

  const draggable = true;

  return (
    <TreeContext.Provider value={context}>
      <Flex
        w="100%"
        direction={"column"}
        className={classNames("tree-node-wrapper relative", {
          "cursor-no-drop": !canDrop && isDragOver,
        })}
        key={id}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Flex
          direction={"row"}
          w="100%"
          align={"center"}
          overflow={"hidden"}
          className={classNames({
            "tree-node": true,
            "tree-node-highlight": highlight,
            "tree-root-node": level === 0,
            "bg-gray-200 dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50":
              isDragOver && canDrop,
            "outline outline-2 outline-blue-500 dark:outline-blue-400":
              isDragOver && dragPosition === "inside" && canDrop,
            "outline outline-2 outline-red-500 dark:outline-red-400":
              isDragOver && dragPosition === "inside" && !canDrop, // 添加不可拖放时的红色边框
            [`level-${level}`]: true,
          })}
        >
          {level > 1 && (
            <Box className="placeholder" w={3} flexShrink={0} flexGrow={0} />
          )}
          <Flex
            className="tree-node-content"
            flexFlow={"column"}
            h="100%"
            flexGrow={1}
            align={"center"}
            overflow={"hidden"}
          >
            {renderer.render(
              {
                type: "tree-node-header",
                props: {
                  node,
                  level,
                  parentNode,
                  dragPosition, // 添加这行
                  isDragOver,
                  canDrop,
                },
              },
              0
            )}
            {renderer.render(
              {
                type: "tree-node-list",
                props: {
                  nodes: children,
                  expanded,
                  parentNode: node,
                  level,
                },
              },
              1
            )}
          </Flex>
        </Flex>
      </Flex>
    </TreeContext.Provider>
  );
};
