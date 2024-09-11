import { WidgetContext } from "@/toolkit/components/tree";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Box, Flex } from "@chakra-ui/react";
import classNames from "classnames";

import { TreeContext } from "@/toolkit/components/tree/tokens";

export const TreeNode = ({
  node,
  level,
  context,
  parentNode,
}: {
  node: TreeDataNode;
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

  const { expanded, highlight } = viewState;
  return (
    <TreeContext.Provider value={context}>
      <Flex
        w="100%"
        direction={"column"}
        // overflow={"hidden"}
        className="tree-node-wrapper"
        key={id}
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
