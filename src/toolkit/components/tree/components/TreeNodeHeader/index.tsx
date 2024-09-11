import { InputBox } from "@/toolkit/components/tree/components/TreeNodeHeader/components/InputBox";
import { LeftExtra } from "@/toolkit/components/tree/components/TreeNodeHeader/components/LeftExtra";
import { useNodeEventHandlers } from "@/toolkit/components/tree/components/TreeNodeHeader/hooks/use-node-event-handlers";
import { useTreeContext } from "@/toolkit/components/tree/tokens";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Text } from "@chakra-ui/react";
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
    <div
      className={`tree-node-content-top flex flex-row h-8 mt-0.5 mb-0.5 self-stretch items-center overflow-hidden ${
        level === 0 ? "ml-2" : ""
      }`}
    >
      <div
        className="flex min-w-0 flex-row h-9 max-h-full w-full flex-grow items-center overflow-hidden hover-action tree-node-header"
        onClick={handleNodeClick}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-row items-center overflow-hidden pr-2 hover-action">
          <LeftExtra viewState={viewState} viewSystem={viewSystem} />
          {viewSystem.render("icon-node-type", { node })}
          <div className="w-2" />
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
            <Text fontSize="1rem" title={name} className="truncate">
              {name}
            </Text>
          )}
        </div>
        <div className="flex-grow" />
        <div className="action-box flex items-center justify-center h-full">
          {renderer.render({
            type: "tree-node-action-bar",
            props: { node, level },
          })}
        </div>
      </div>
      <div className="w-2" />
    </div>
  );
};
