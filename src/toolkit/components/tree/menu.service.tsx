import { EventBus } from "@/toolkit/factories/eventBus";
import {
  MenuController,
  MenuItem,
  validateMenuItem,
} from "@/toolkit/factories/menuController";
import { Renderer } from "@/toolkit/factories/renderer";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { parseWhenClause } from "@/toolkit/utils/when-clause";
import { Flex } from "@chakra-ui/react";

export interface NodeMenuItem extends MenuItem {
  event?: string;
}

export const prepareMenuService = (options: {
  eventBus: EventBus;
  renderer: Renderer;
}) => {
  const { eventBus, renderer } = options;
  const menuService = MenuController.create();
  const { getMenuItems, upsertMenuItem } = menuService;
  const addNodeMenuItems = (menuItems: NodeMenuItem[]) => {
    for (const menuItem of menuItems) {
      upsertMenuItem(menuItem);
    }
  };
  const getNodeMenuItems = ({ node, level }) => {
    return getMenuItems().filter(
      (item) =>
        !item.when ||
        parseWhenClause(item.when).eval({
          ...node,
          level,
        })
    );
  };
  const renderNodeMenuItem = (
    nodeMenuItem: NodeMenuItem,
    { node, level }: { node: TreeDataNode; level: number },
    simple = false
  ) => {
    const { icon, name, title } = nodeMenuItem;
    const { isValid, message } = validateMenuItem(nodeMenuItem, {
      ...node,
      level,
    });
    const disabled = !isValid;
    if (simple) {
      return (
        <Flex
          key={nodeMenuItem.id}
          title={nodeMenuItem.label || nodeMenuItem.name}
          onClick={(e) => {
            if (!disabled && nodeMenuItem.event) {
              eventBus.emit(nodeMenuItem.event, { node, event: e });
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
          !disabled && nodeMenuItem.event
            ? eventBus.connector(nodeMenuItem.event, (event) => ({
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
        {nodeMenuItem.label || nodeMenuItem.name}
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
