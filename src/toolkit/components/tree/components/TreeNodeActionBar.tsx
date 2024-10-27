import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NodeMenuItemData } from "@/toolkit/components/tree/menu-v2.service";
import {
  TreeNodeContext,
  useTreeContext,
  useTreeNodeContext,
} from "@/toolkit/components/tree/tokens";
import { renderMenuEntry } from "@/toolkit/components/tree/treePlugins";
import { validateMenuItem } from "@/toolkit/factories/enhanced-menu-manager";
import { IMenuTree } from "@/toolkit/factories/menu-manager";
import { ITreeNode } from "@/toolkit/factories/reactive-tree";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { FC, useMemo } from "react";

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

export const MenuItemView: FC<{
  menuItem: IMenuTree<NodeMenuItemData>;
}> = ({ menuItem }) => {
  const {
    viewSystem: { renderer },
    eventBus,
  } = useTreeContext();
  const {
    data: { event },
  } = menuItem;

  const nodeContext = useTreeNodeContext();
  const { node, level } = nodeContext;
  const { isValid, message } = validateMenuItem(menuItem, {
    ...node,
    level,
  });

  if (menuItem.children && menuItem.children.length > 0) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          {menuItem.data.icon &&
            renderer.render({
              type: menuItem.data.icon,
            })}
          {menuItem.data.label}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {menuItem.children?.map((child) => {
            return <MenuItemView key={child.id} menuItem={child} />;
          })}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }
  // console.log("nodeContext", nodeContext);
  return (
    <DropdownMenuItem
      disabled={!isValid}
      title={!isValid ? message : undefined}
      onClick={(e) => {
        isValid && event && eventBus.emit(event, { ...nodeContext, event: e });
      }}
    >
      {menuItem.data.icon &&
        renderer.render({
          type: menuItem.data.icon,
        })}
      {menuItem.data.label}
    </DropdownMenuItem>
  );
};

export const TreeNodeActionEntry: FC<{
  menuTree: IMenuTree<NodeMenuItemData>;
}> = ({ menuTree }) => {
  const {
    viewSystem: { renderer },
  } = useTreeContext();
  if (!(menuTree.children && menuTree.children.length > 0)) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus:outline-none h-6 w-6"
        >
          {menuTree.data.icon
            ? renderer.render({
                type: menuTree.data.icon,
              })
            : menuTree.data.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuTree.children?.map((child) => {
          return <MenuItemView key={child.id} menuItem={child} />;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TreeNodeActions: FC<{
  menuItems: IMenuTree<NodeMenuItemData>[];
  node: ITreeNode<any>;
  level: number;
}> = ({ menuItems, node, level }) => {
  const nodeContext = useMemo(
    () => ({
      node,
      level,
    }),
    [node, level]
  );
  return (
    <TreeNodeContext.Provider value={nodeContext}>
      <div
        className="flex items-center gap-1 pr-1 hover-visible"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {menuItems.map((item) => {
          return <TreeNodeActionEntry key={item.id} menuTree={item} />;
        })}
      </div>
    </TreeNodeContext.Provider>
  );
};
