import { WidgetContext } from "@/toolkit/components/tree";
import { IBaseTreeService } from "@/toolkit/components/tree/tree.service";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { SafeAny } from "@/toolkit/types";
import { typedKey } from "@/toolkit/utils/typedKey";
import { createContext, useContext } from "react";

export const BaseServicePoints = {
  TreeService: typedKey<IBaseTreeService>("treeService"),
};

export const TreeRegistryKeys = {
  DraggedNodeInfo: typedKey<{
    nodeId: string;
  }>("draggedNodeInfo"),
};

export const TreeContext = createContext<WidgetContext<TreeDataNode>>(
  undefined as SafeAny
);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("No tree context provided");
  }
  return context;
};
