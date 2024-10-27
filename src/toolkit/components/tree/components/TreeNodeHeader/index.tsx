import { ProgressBar } from "@/components/progress-bar";
import { InputBox } from "@/toolkit/components/tree/components/TreeNodeHeader/components/InputBox";
import { LeftExtra } from "@/toolkit/components/tree/components/TreeNodeHeader/components/LeftExtra";
import { useNodeEventHandlers } from "@/toolkit/components/tree/components/TreeNodeHeader/hooks/use-node-event-handlers";
import { useTreeContext } from "@/toolkit/components/tree/tokens";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Box, Flex, Text } from "@chakra-ui/react";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import xbook from "xbook/index";

export const TreeNodeHeader = ({
  node,
  level,
  parentNode,
  dragPosition, // 添加这个参数
  isDragOver,
  canDrop,
}: {
  node: TreeDataNode;
  level: number;
  parentNode?: TreeDataNode;
  dragPosition?: "before" | "inside" | "after" | null;
  isDragOver?: boolean;
  canDrop?: boolean;
}) => {
  const { viewSystem, dataStore, eventBus } = useTreeContext();
  const nodeData = dataStore.useNode(node.id);
  const { renderer } = viewSystem;

  if (!nodeData) return null;

  const { name } = nodeData;
  const viewState =
    viewSystem.viewStateStore.useRecord(node.id) ||
    viewSystem.getDefaultViewState({ id: node.id });
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleNodeClick, handleKeyDown } = useNodeEventHandlers(
    node,
    parentNode
  );

  useEffect(() => {
    setTimeout(() => {
      if (viewState.editMode && inputRef.current) {
        inputRef.current.focus();
        const dotIndex = name.lastIndexOf(".");
        if (dotIndex > 0) {
          inputRef.current.setSelectionRange(0, dotIndex);
        }
      }
    });
  }, [viewState.editMode, name]);

  useEffect(() => {
    if (viewState.validationMessage && viewState.editMode && inputRef.current) {
      return xbook.popupService.open({
        target: inputRef.current,
        content: viewState.validationMessage,
      });
    }
    return () => {};
  }, [viewState.validationMessage, viewState.editMode]);

  return (
    <Flex
      className={`tree-node-content-top h-8 mt-0.5 mb-0.5 items-center overflow-hidden ${
        level === 0 ? "ml-2" : ""
      }`}
      width="100%"
      position="relative"
    >
      {dragPosition === "before" && (
        <Box className="h-0.5  bg-blue-500  absolute top-0 left-0 right-0" /> // 修改这行
      )}
      <Flex
        className={classNames(
          "min-w-0 h-9 mr-2 max-h-full w-full items-center overflow-hidden hover-action tree-node-header",
          {
            "can-drop": isDragOver && canDrop,
          }
        )}
        onClick={handleNodeClick}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        position="relative" // 添加这行
        border={
          isDragOver && canDrop && dragPosition === "inside"
            ? "1px solid blue"
            : "none"
        }
        bg={
          isDragOver && canDrop && dragPosition === "inside"
            ? "blue"
            : "transparent"
        }
      >
        <Flex
          className="items-center overflow-hidden pr-2 hover-action"
          minWidth="0"
          flex="1"
        >
          <LeftExtra viewState={viewState} viewSystem={viewSystem} />
          <Box flexShrink={0}>
            {viewState.loading
              ? viewSystem.render("icon-loading", { size: "1rem" })
              : viewSystem.render("icon-node-type", { node })}
          </Box>
          <Box width="0.5rem" flexShrink={0} />
          <Box minWidth="0" flex="1">
            {viewState.editMode ? (
              <InputBox
                inputRef={inputRef}
                value={viewState.editingName}
                name={name}
                parentNode={parentNode}
                eventBus={eventBus}
                node={node}
              />
            ) : (
              <Text fontSize="1rem" title={name} isTruncated>
                {name}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex
          className="action-box items-center justify-center h-full"
          flexShrink={0}
        >
          {renderer.render({
            type: "tree-node-action-bar",
            props: { node, level },
          })}
        </Flex>
      </Flex>
      {dragPosition === "after" && (
        <Box className="h-0.5  bg-blue-500 absolute bottom-0 left-0 right-0" /> // 修改这行
      )}
    </Flex>
  );
};
