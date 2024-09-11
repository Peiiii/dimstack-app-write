import { HookPoints } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { useTreeContext } from "@/toolkit/components/tree/tokens";
import { nameSorter } from "@/toolkit/components/tree/utils";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { Flex } from "@chakra-ui/react";
import { css } from "@emotion/css";
import classNames from "classnames";
import { FC } from "react";

export const TreeNodeList: FC<{
  nodes: TreeDataNode<FolderTreeNode>[];
  expanded: boolean;
  parentNode?: TreeDataNode<FolderTreeNode>;
  level: number;
}> = ({ expanded, nodes, parentNode, level }) => {
  const { hookRegistry, viewSystem } = useTreeContext();
  const filterUsingHooks = (nodes: TreeDataNode<FolderTreeNode>[]) => {
    const hooks = hookRegistry.getHooks(HookPoints.FilterNodes);
    return hooks.reduce((acc, hook) => hook(acc), nodes);
  };
  return (
    <Flex
      direction={"column"}
      ml="0.5rem"
      className={classNames({
        [`level-${level}`]: true,
        "tree-node-children-list": true,
        "tree-node-children-list-expanded": expanded,
        "tree-node-children-list-collapsed": !expanded,
        [css`
          height: ${nodes?.length ? `auto` : "0"};
        `]: expanded,
        [css`
          flex-grow: 1;
          overflow-y: auto;
          max-height: 100%;
        `]: level === 0,
      })}
      w="calc(100% - 0.5rem)"
    >
      {nodes &&
        filterUsingHooks(
          [...nodes]
            .sort(nameSorter)
            .sort(
              (a, b) =>
                (a.type === "file" ? 1 : 0) - (b.type === "file" ? 1 : 0)
            )
        ).map((child) =>
          viewSystem.renderNode({
            node: child,
            level: level + 1,
            parentNode,
          })
        )}
    </Flex>
  );
};
