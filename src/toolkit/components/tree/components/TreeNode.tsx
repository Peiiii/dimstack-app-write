import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import {
  FolderTreeNode,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/types";
import { WidgetContext } from "@/toolkit/components/tree";
import { TreeContext } from "@/toolkit/components/tree/tokens";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Box, Flex } from "@chakra-ui/react";
import classNames from "classnames";
import React, { useState } from "react";

export const TreeNode = ({
  node,
  level,
  context,
  parentNode,
}: {
  node: TreeDataNode<FolderTreeNode>;
  level: number;
  context: WidgetContext<any>;
  parentNode?: TreeDataNode;
}) => {
  const { dataStore, viewSystem, eventBus } = context;
  const { renderer } = viewSystem;
  const { id } = node;
  const nodeData = dataStore.useNode(id) as TreeDataNode;
  if (!nodeData) return null;
  const { children } = nodeData;
  const viewState =
    viewSystem.viewStateStore.useRecord(id) ||
    viewSystem.getDefaultViewState({ id });

  const { expanded, highlight, isDragOver } = viewState;
  const [dragPosition, setDragPosition] = useState<
    "before" | "inside" | "after" | null
  >(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", id);
    eventBus.emit(TreeEventKeys.DragStart, { node: nodeData, event: e });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log("handleDragOver", id, "element:", e);
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y < rect.height * 0.25) {
      setDragPosition("before");
    } else if (y > rect.height * 0.75) {
      setDragPosition("after");
    } else {
      setDragPosition("inside");
    }
    eventBus.emit(TreeEventKeys.DragOver, { node: nodeData, event: e });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    eventBus.emit(TreeEventKeys.DragEnter, { node: nodeData, event: e });
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDragPosition(null);
    eventBus.emit(TreeEventKeys.DragLeave, { node: nodeData, event: e });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragPosition) {
      eventBus.emit(TreeEventKeys.Drop, {
        node: nodeData,
        event: e,
        position: dragPosition,
      });
    }
    setDragPosition(null);
  };

  const draggable = node.type !== TreeNodeTypeEnum.DIR;

  return (
    <TreeContext.Provider value={context}>
      <Flex
        w="100%"
        direction={"column"}
        className="tree-node-wrapper relative"
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
              isDragOver,
            "outline outline-2 outline-blue-500 dark:outline-blue-400":
              isDragOver && dragPosition === "inside",
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
