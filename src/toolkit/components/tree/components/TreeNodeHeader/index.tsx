import { InputBox } from "@/toolkit/components/tree/components/TreeNodeHeader/components/InputBox";
import { LeftExtra } from "@/toolkit/components/tree/components/TreeNodeHeader/components/LeftExtra";
import { useNodeEventHandlers } from "@/toolkit/components/tree/components/TreeNodeHeader/hooks/use-node-event-handlers";
import { useTreeContext } from "@/toolkit/components/tree/tokens";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import xbook from "xbook/index";

export const TreeNodeHeader = ({
  node,
  level,
  parentNode,
}: {
  node: TreeDataNode;
  level: number;
  parentNode?: TreeDataNode;
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
    if (viewState.editMode && inputRef.current) {
      inputRef.current.focus();
      const dotIndex = name.lastIndexOf(".");
      if (dotIndex > 0) {
        inputRef.current.setSelectionRange(0, dotIndex);
      }
    }
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
    >
      <Flex
        className="min-w-0 h-9 max-h-full w-full items-center overflow-hidden hover-action tree-node-header"
        onClick={handleNodeClick}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <Flex className="items-center overflow-hidden pr-2 hover-action" minWidth="0" flex="1">
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
        <Flex className="action-box items-center justify-center h-full" flexShrink={0}>
          {renderer.render({
            type: "tree-node-action-bar",
            props: { node, level },
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
