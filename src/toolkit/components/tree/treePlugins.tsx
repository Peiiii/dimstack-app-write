import { hotkeys } from "@/toolkit/common/hotkeys";
import { createPluginSystem } from "@/toolkit/common/pluginSystem";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { WidgetContext } from ".";
import { SafeAny } from "@/toolkit/common/types";

const getCreateTreePlugin = <TreeNodeType extends Record<string, SafeAny>>() =>
  createPluginSystem<{
    activate(
      this: {
        id?: string;
        name?: string;
        description?: string;
        options: { [k: string]: any };
      },
      context: WidgetContext<TreeNodeType>
    ): any;
  }>().createPlugin;
export const createTreePlugin = <TreeNodeType extends Record<string, SafeAny>>(
  ...args: Parameters<ReturnType<typeof getCreateTreePlugin<TreeNodeType>>>
) => getCreateTreePlugin<TreeNodeType>()(...args);

export const createTreePluginTemplate =
  <TreeNodeTemplateType extends Record<string, SafeAny>>(
    outerArgs: Parameters<typeof createTreePlugin<TreeNodeTemplateType>>[0]
  ) =>
  <TreeNodeType extends TreeNodeTemplateType>(
    ...args: Parameters<ReturnType<typeof createTreePlugin<TreeNodeType>>>
  ) =>
    createTreePlugin<TreeNodeType>(
      outerArgs as unknown as Parameters<
        typeof createTreePlugin<TreeNodeType>
      >[0]
    )(...args);

export const treePluginExpandTemplate = createTreePluginTemplate<{
  id: string;
}>({
  addOptions() {
    return {
      defaultExpanded: false,
    };
  },
  activate({ eventBus, viewSystem }) {
    eventBus.on("clickNode", ({ node }) => {
      const viewState =
        viewSystem.viewStateStore.getRecord(node.id) ||
        viewSystem.getDefaultViewState(node, {
          expanded: this.options.defaultExpanded,
        });
      viewSystem.viewStateStore
        .getActions()
        .upsert({ ...viewState, expanded: !viewState.expanded });
    });
  },
});

export const treePluginEditNodeTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ viewSystem, eventBus }) {
    viewSystem.addNodeMenuItems([
      {
        id: "editNode",
        event: "editNode",
        name: "编辑",
        title: "编辑",
      },
    ]);
    eventBus.on("editNode", ({ node }) => {
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node, { expanded: false })),
        editMode: true,
      });
    });
  },
});

export const treePluginInitViewTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ viewSystem }) {
    // Initial View System
    const IconCollapsed = ChevronRightIcon;
    const IconExpanded = ChevronDownIcon;
    const IconEllipsis = AiOutlineEllipsis;
    viewSystem.renderer.register("icon-expanded", IconExpanded);
    viewSystem.renderer.register("icon-collapsed", IconCollapsed);
    viewSystem.renderer.register("icon-ellipsis", IconEllipsis);
    viewSystem.renderer.register("icon-expanded-default", IconExpanded);
    viewSystem.renderer.register("icon-collapsed-default", IconCollapsed);
    viewSystem.renderer.register("icon-ellipsis-default", IconEllipsis);
    viewSystem.renderer.register("icon-node-type", () => null);
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

    const TreeNode = ({
      node,
      level,
      context: { dataStore, viewSystem, eventBus },
    }: {
      node: any;
      level: number;
      context: WidgetContext<any>;
    }) => {
      const { id } = node;
      const nodeData = dataStore.useNode(id);
      if (!nodeData) return null;
      const { name, children } = nodeData;
      const viewState =
        viewSystem.viewStateStore.useRecord(id) ||
        viewSystem.getDefaultViewState({ id });
      const inputRef = useRef<HTMLInputElement>(null);
      useEffect(() => {
        if (inputRef.current) {
          hotkeys(inputRef.current!, {
            Enter: eventBus.connector("editKeyEnter", (event) => ({
              node,
              event,
            })),
          });
        }
      }, [inputRef.current]);
      const { expanded, editMode, expandable, highlight } = viewState;
      const nodeMenuItems = viewSystem.getNodeMenuItems({ node, level });
      let actionBar;
      if (nodeMenuItems.length === 0) actionBar = null;
      else if (nodeMenuItems.length >= 3)
        actionBar = (
          <Menu>
            <MenuButton
              className="hover-show"
              as={Button}
              variant="ghost"
              size="xs"
              ml={2}
              aria-label="Options"
              rightIcon={viewSystem.render("icon-ellipsis")}
            />
            <MenuList>
              {nodeMenuItems
                .map((nodeMenuItem) =>
                  viewSystem.renderNodeMenuItem(nodeMenuItem, {
                    node,
                  })
                )
                .map((menuItem, index) => (
                  <MenuItem key={index}>{menuItem}</MenuItem>
                ))}
            </MenuList>
          </Menu>
        );
      else {
        actionBar = (
          <Flex
            flexFlow={"row"}
            m="0 0.2rem"
            className="hover-show"
            gap={"0.2rem"}
          >
            {nodeMenuItems.map((nodeMenuItem) =>
              viewSystem.renderNodeMenuItem(nodeMenuItem, { node }, true)
            )}
          </Flex>
        );
      }

      const classList = ["tree-node"];
      if (level === 0) classList.push("tree-root-node");
      if (highlight) classList.push("tree-node-highlight");
      return (
        <Box w="100%" className="tree-node-wrapper">
          {
            <Flex
              direction={"row"}
              h="2rem"
              w="100%"
              align={"center"}
              className={classList.join(" ")}
            >
              <Box w={level * 4} flexShrink={0} />
              <Flex
                direction={"row"}
                h="2rem"
                flexGrow={1}
                align="center"
                onClick={eventBus.connector("clickNode", (event) => ({
                  node,
                  event,
                }))}
                className={"hover-action tree-node-header"}
              >
                <Button
                  pl="6px"
                  variant="link"
                  color={"inherit"}
                  leftIcon={
                    expandable ? (
                      expanded ? (
                        viewSystem.render("icon-expanded")
                      ) : (
                        viewSystem.render("icon-collapsed")
                      )
                    ) : (
                      <Box w="0.5rem"></Box>
                    )
                  }
                >
                  {viewSystem.render("icon-node-type", { node })}
                  <Box w="0.5em"></Box>
                  {editMode ? (
                    <Input
                      ref={inputRef}
                      autoFocus
                      size={"sm"}
                      onChange={eventBus.connector("editProgress", (event) => ({
                        node,
                        event,
                      }))}
                      onBlur={eventBus.connector("editBlur", (event) => ({
                        node,
                        event,
                      }))}
                      defaultValue={name}
                    />
                  ) : (
                    name
                  )}
                </Button>
                <Box flexGrow={1} />
                {actionBar}
              </Flex>
              <Box w="0.5rem" />
            </Flex>
          }
          <Box {...(expanded ? {} : { display: "none" })}>
            {children &&
              children.map((node) =>
                viewSystem.renderNode({
                  node,
                  level: level + 1,
                })
              )}
          </Box>
        </Box>
      );
    };
    viewSystem.renderer.register("tree-node", TreeNode);
  },
});
