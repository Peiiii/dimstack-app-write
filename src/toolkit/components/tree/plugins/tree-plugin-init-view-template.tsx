import { NodeMenuItem, ViewSystem } from "@/toolkit/components/tree";
import { createTreePluginTemplate } from "@/toolkit/components/tree/plugin";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/css";
import { AiOutlineLoading } from "react-icons/ai";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

import { TreeNode } from "@/toolkit/components/tree/components/TreeNode";
import {
  TreeNodeActionBar,
  TreeNodeActions,
} from "@/toolkit/components/tree/components/TreeNodeActionBar";
import { TreeNodeHeader } from "@/toolkit/components/tree/components/TreeNodeHeader";
import { TreeNodeList } from "@/toolkit/components/tree/components/TreeNodeList";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";

export const renderMenuEntry = ({
  nodeMenuItems,
  viewSystem,
  node,
  level,
}: {
  nodeMenuItems: NodeMenuItem[];
  viewSystem: ViewSystem;
  node: TreeDataNode<any>;
  level: number;
}) => {
  let actionBar;
  const useV2Menu = true;
  if (nodeMenuItems.length === 0) actionBar = null;
  else if (useV2Menu) {
    actionBar = (
      <TreeNodeActions menuItems={nodeMenuItems} node={node} level={level} />
    );
  } else if (nodeMenuItems.length >= 3) {
    actionBar = (
      <Menu>
        <MenuButton
          h="100%"
          className="hover-visible"
          as={Button}
          variant="ghost"
          size="xs"
          mr="0.2rem"
          ml={2}
          aria-label="Options"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {viewSystem.render("icon-ellipsis")}
        </MenuButton>
        <Portal>
          <MenuList
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {nodeMenuItems
              .map((nodeMenuItem) =>
                viewSystem.renderNodeMenuItem(nodeMenuItem, {
                  node,
                  level,
                })
              )
              .map((menuItem, index) => (
                <MenuItem key={menuItem.key}>{menuItem}</MenuItem>
              ))}
          </MenuList>
        </Portal>
      </Menu>
    );
  } else {
    actionBar = (
      <Flex flexFlow={"row"} m="0 0.2rem" className="hover-show" gap={"0.2rem"}>
        {nodeMenuItems.map((nodeMenuItem) =>
          viewSystem.renderNodeMenuItem(nodeMenuItem, { node, level }, true)
        )}
      </Flex>
    );
  }
  return actionBar;
};

export const treePluginInitViewTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ viewSystem, hookRegistry, dataStore, eventBus }) {
    const { renderer } = viewSystem;
    // Initial View System
    const IconCollapsed = ChevronRightIcon;
    const IconExpanded = ChevronDownIcon;
    // const IconLoading = VscLoading;
    const IconLoading = () => {
      const spin = keyframes`
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    `;
      // 创建一个包含动画的样式
      const spinnerStyle = css`
        animation: ${spin} 1s linear infinite;
      `;
      return <AiOutlineLoading className={spinnerStyle} />;
    };
    const IconEllipsis = HiOutlineEllipsisVertical;
    viewSystem.renderer.register("icon-expanded", IconExpanded);
    viewSystem.renderer.register("icon-collapsed", IconCollapsed);
    viewSystem.renderer.register("icon-ellipsis", IconEllipsis);
    viewSystem.renderer.register("icon-expanded-default", IconExpanded);
    viewSystem.renderer.register("icon-collapsed-default", IconCollapsed);
    viewSystem.renderer.register("icon-ellipsis-default", IconEllipsis);
    viewSystem.renderer.register("icon-node-type", () => null);
    viewSystem.renderer.register("icon-loading", IconLoading);
    viewSystem.setDefaultViewStateProvider((node, props) => {
      return {
        id: node.id,
        expanded: false,
        editMode: false,
        expandable: true,
        highlight: false,
        ...props,
      };
    });

    renderer.register("tree-node-action-bar", TreeNodeActionBar);
    renderer.register("tree-node-header", TreeNodeHeader);
    renderer.register("tree-node-list", TreeNodeList);
    viewSystem.renderer.register("tree-node", TreeNode);
  },
});
