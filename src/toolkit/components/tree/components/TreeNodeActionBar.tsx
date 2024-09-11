import { useTreeContext } from "@/toolkit/components/tree/tokens";
import { renderMenuEntry } from "@/toolkit/components/tree/treePlugins";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { FC } from "react";

export const TreeNodeActionBar: FC<{
  node: TreeDataNode;
  level: number;
}> = ({ node, level }) => {
  const { viewSystem } = useTreeContext();
  const nodeMenuItems = viewSystem.getNodeMenuItems({ node, level });
  const actionBar = renderMenuEntry({
    nodeMenuItems,
    viewSystem,
    node,
    level,
  });
  return actionBar;
};
