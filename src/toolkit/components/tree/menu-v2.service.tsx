import {
  EnhancedMenuManager,
  IEnhancedMenuItem,
  IEnhancedMenuItemData,
  validateMenuItem,
} from "@/toolkit/factories/enhanced-menu-manager";
import { EventBus } from "@/toolkit/factories/eventBus";
import { IMenuTree } from "@/toolkit/factories/menu-manager";
import { Renderer } from "@/toolkit/factories/renderer";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { parseWhenClause } from "@/toolkit/utils/when-clause";
import { Flex } from "@chakra-ui/react";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";

export type NodeMenuItemData = IEnhancedMenuItemData & {
  id: string;
  group: string;
  event?: string;
};

export type NodeMenuItem = IEnhancedMenuItem<NodeMenuItemData>;

export const prepareMenuService = (options: {
  eventBus: EventBus;
  renderer: Renderer;
}) => {
  const { eventBus, renderer } = options;
  renderer.register("AiOutlineMore", AiOutlineMore);
  renderer.register("AiOutlinePlus", AiOutlinePlus);
  const menuService = new EnhancedMenuManager<NodeMenuItemData>({
    id: "root",
    data: {
      id: "root",
      key: "root",
      order: 0,
      label: "root",
      group: "",
    },
    children: [],
  });
  (window as any).menuService = menuService;
  const addNodeMenuItems = (menuItemDatas: NodeMenuItemData[]) => {
    menuService.addMenuItems(
      menuItemDatas.map(
        (data): NodeMenuItem => ({
          id: data.id,
          data: {
            ...data,
            parentId: data.group,
          },
        })
      )
    );
  };
  addNodeMenuItems([
    {
      id: "more",
      key: "more",
      label: "更多",
      group: "root",
      icon: "AiOutlineMore",
      order: 1,
    },
    {
      id: "add",
      key: "add",
      label: "添加",
      group: "root",
      icon: "AiOutlinePlus",
      order: 0,
    },
  ]);

  const filterMenuTree = (
    tree: IMenuTree<NodeMenuItemData>,
    { node, level }: { node: TreeDataNode; level: number }
  ): undefined | IMenuTree<NodeMenuItemData> => {
    if (
      tree.data.when &&
      !parseWhenClause(tree.data.when).eval({ ...node, level })
    ) {
      return undefined;
    }
    return {
      ...tree,
      children: tree.children
        ?.map((child) => filterMenuTree(child, { node, level }))
        .filter(
          (child) => child !== undefined
        ) as IMenuTree<NodeMenuItemData>[],
    };
  };

  const getNodeMenuItems = ({ node, level }) => {
    return (
      filterMenuTree(menuService.getRootMenuTree(), { node, level })
        ?.children || []
    );
  };

  const renderNodeMenuItem = (
    nodeMenuItem: NodeMenuItem,
    { node, level }: { node: TreeDataNode; level: number },
    simple = false
  ) => {
    const { icon, name, title } = nodeMenuItem.data;
    const { isValid, message } = validateMenuItem(nodeMenuItem, {
      ...node,
      level,
    });
    const disabled = !isValid;
    if (simple) {
      return (
        <Flex
          key={nodeMenuItem.id}
          title={nodeMenuItem.data.label || nodeMenuItem.data.name}
          onClick={(e) => {
            if (!disabled && nodeMenuItem.data.event) {
              eventBus.emit(nodeMenuItem.data.event, { node, event: e });
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {icon ? renderer.render({ type: icon }) : title || name}
        </Flex>
      );
    }
    return (
      <Flex
        w="100%"
        align={"center"}
        key={nodeMenuItem.id}
        justify="space-between"
        title={message}
        onClick={
          !disabled && nodeMenuItem.data.event
            ? eventBus.connector(nodeMenuItem.data.event, (event) => ({
                node,
                event,
              }))
            : undefined
        }
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {nodeMenuItem.data.label || nodeMenuItem.data.name}
        {icon && renderer.render({ type: icon })}
      </Flex>
    );
  };

  return {
    menuService,
    addNodeMenuItems,
    getNodeMenuItems,
    renderNodeMenuItem,
  };
};
