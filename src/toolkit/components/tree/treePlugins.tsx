import {
  HookPoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { nameSorter } from "@/toolkit/components/tree/utils";
import {
  PluginInitializationConfiguration,
  createPluginSystem,
} from "@/toolkit/factories/pluginSystem";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { SafeAny } from "@/toolkit/types";
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
  Portal,
  Text,
} from "@chakra-ui/react";
import { css, keyframes } from "@emotion/css";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import xbook from "xbook/index";
import { NodeMenuItem, ViewSystem, WidgetContext } from ".";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { BaseServicePoints } from "@/toolkit/components/tree/tokens";
import { getBaseTreeServiceClass } from "@/toolkit/components/tree/tree.service";

export const getCreateTreePlugin = <
  TreeNodeType extends Record<string, SafeAny>
>() =>
  createPluginSystem<WidgetContext<TreeNodeType>, "activate" | "deactivate">()
    .createPlugin;

export const createTreePlugin = <TreeNodeType extends Record<string, SafeAny>>(
  ...args: Parameters<ReturnType<typeof getCreateTreePlugin<TreeNodeType>>>
) => getCreateTreePlugin<TreeNodeType>()(...args);

export const createTreeHelper = <
  TreeNodeType extends Record<string, SafeAny>
>() => {
  return {
    createPlugin: <TypeOptions extends Record<string, SafeAny>>(
      config: PluginInitializationConfiguration<
        TypeOptions,
        "activate" | "deactivate",
        WidgetContext<TreeNodeType>
      >
    ) =>
      createPluginSystem<
        WidgetContext<TreeNodeType>,
        "activate" | "deactivate"
      >().createPlugin(config),
  };
};

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
  activate({ eventBus, viewSystem, serviceBus, dataStore }) {
    const treeService = serviceBus.createProxy(BaseServicePoints.TreeService);
    eventBus.on(TreeEventKeys.NodeClick, ({ node: { id } }) =>
      treeService.toggleNode({ id })
    );
    eventBus.on(TreeEventKeys.EditKeyEnter, ({ node: { id } }) =>
      treeService.toggleNode({ id })
    );
  },
});

export const treePluginProvideBaseTreeService = createTreePluginTemplate({
  activate(context) {
    const { serviceBus } = context;
    const Cls = getBaseTreeServiceClass(context);
    serviceBus.registerFromMap(BaseServicePoints.TreeService, new Cls());
  },
});

export const treePluginEditNodeTemplate = createTreePluginTemplate<{
  id: string;
}>({
  activate({ viewSystem, eventBus }) {
    viewSystem.addNodeMenuItems([
      {
        id: "editNode",
        key: "editNode",
        event: TreeEventKeys.EditNode.name,
        name: "编辑",
        label: "编辑",
        when: "level >= 1",
      },
    ]);
    eventBus.on(TreeEventKeys.EditNode, ({ node }) => {
      viewSystem.viewStateStore.getActions().upsert({
        ...(viewSystem.viewStateStore.getRecord(node.id) ||
          viewSystem.getDefaultViewState(node, { expanded: false })),
        editMode: true,
      });
    });
  },
});

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
  if (nodeMenuItems.length === 0) actionBar = null;
  else if (nodeMenuItems.length >= 3) {
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
                <MenuItem key={index}>{menuItem}</MenuItem>
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
  activate({ viewSystem, hookRegistry }) {
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

    const TreeNode = ({
      node,
      level,
      context: { dataStore, viewSystem, eventBus },
      parentNode,
    }: {
      node: TreeDataNode;
      level: number;
      context: WidgetContext<any>;
      parentNode?: TreeDataNode;
    }) => {
      const { id } = node;
      const nodeData = dataStore.useNode(id) as TreeDataNode;
      if (!nodeData) return null;
      const { name, children } = nodeData;

      const viewState =
        viewSystem.viewStateStore.useRecord(id) ||
        viewSystem.getDefaultViewState({ id });
      const inputRef = useRef<HTMLInputElement>(null);
      useEffect(() => {
        if (viewState.editMode) {
          inputRef.current?.focus();
          // 设置光标位置到[name].[ext]的.[ext]之前，也就是最后一个点之前（如果存在点的话）
          const dotIndex = name.lastIndexOf(".");
          if (dotIndex > 0) {
            console.log("inputRef.current:", inputRef.current);

            inputRef.current?.setSelectionRange(0, dotIndex);
          }
        }
      }, [viewState.editMode]);

      const {
        expanded,
        editMode,
        expandable,
        highlight,
        loading,
        validationMessage,
        editingName,
      } = viewState;
      const nodeMenuItems = viewSystem.getNodeMenuItems({ node, level });
      const actionBar = renderMenuEntry({
        nodeMenuItems,
        viewSystem,
        node,
        level,
      });

      const classList = ["tree-node"];
      if (level === 0) classList.push("tree-root-node");
      if (highlight) classList.push("tree-node-highlight");

      const leftExtra = (
        <>
          {loading ? (
            viewSystem.render("icon-loading")
          ) : (
            <>
              {expandable ? (
                expanded ? (
                  viewSystem.render("icon-expanded")
                ) : (
                  viewSystem.render("icon-collapsed")
                )
              ) : (
                <Box visibility={"hidden"}>
                  {viewSystem.render("icon-collapsed")}
                </Box>
              )}
            </>
          )}
        </>
      );

      const inputBox = (
        <Input
          ref={inputRef}
          type="text"
          autoFocus
          size={"sm"}
          fontSize={"1rem"}
          pl={0}
          value={editingName}
          flexGrow={0}
          onChange={eventBus.connector(TreeEventKeys.EditChange, (event) => ({
            node,
            event,
            parentNode,
          }))}
          onBlur={eventBus.connector(TreeEventKeys.EditBlur, (event) => ({
            node,
            event,
            parentNode,
          }))}
          onKeyDown={(event) => {
            if (event.code.toLocaleLowerCase() === "enter") {
              eventBus.emit(TreeEventKeys.EditKeyEnter, {
                node,
                event,
                parentNode,
              });
            }
          }}
          defaultValue={name}
        />
      );

      useEffect(() => {
        if (validationMessage && editMode && inputRef.current) {
          return xbook.popupService.open({
            target: inputRef.current,
            content: validationMessage,
          });
        }
        return () => {};
      }, [validationMessage, editMode]);

      const filterUsingHooks = (nodes: TreeDataNode<FolderTreeNode>[]) => {
        const hooks = hookRegistry.getHooks(HookPoints.FilterNodes);
        return hooks.reduce((acc, hook) => hook(acc), nodes);
      };

      return (
        <Flex
          w="100%"
          direction={"column"}
          overflow={"hidden"}
          className="tree-node-wrapper"
        >
          <Flex
            direction={"row"}
            w="100%"
            align={"center"}
            overflow={"hidden"}
            className={classList.join(" ")}
          >
            <Box className="placeholder" w={3} flexShrink={0} flexGrow={0} />
            <Flex
              className="tree-node-content"
              flexFlow={"column"}
              h="100%"
              flexGrow={1}
              align={"center"}
              overflow={"hidden"}
            >
              <Flex
                className="tree-node-content-top"
                flexFlow={"row"}
                w="100%"
                h="2rem"
                mt="2px"
                mb="2px"
                // flexGrow={1}
                align={"center"}
                overflow={"hidden"}
              >
                <Flex
                  minW={0}
                  overflow={"hidden"}
                  direction={"row"}
                  h={"36px"}
                  maxH={"100%"}
                  w="100%"
                  flexGrow={1}
                  align="center"
                  onClick={eventBus.connector(
                    TreeEventKeys.NodeClick,
                    (event) => ({
                      node,
                      event,
                    })
                  )}
                  tabIndex={-1}
                  onKeyDown={(e) => {
                    if (e.code.toLowerCase() === "enter") {
                      eventBus.emit("node::keydown.enter", { node, event: e });
                    }
                  }}
                  className={"hover-action tree-node-header"}
                >
                  <Flex
                    direction={"row"}
                    pl="6p"
                    align="center"
                    overflow={"hidden"}
                    className="hover-action"
                  >
                    <Flex pr="0.5rem" alignItems={"center"}>
                      {leftExtra}
                    </Flex>
                    {viewSystem.render("icon-node-type", { node })}
                    <Box w="0.5em"></Box>
                    {editMode ? (
                      <>{inputBox}</>
                    ) : (
                      <Text
                        fontSize={"1rem"}
                        title={name}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                      >
                        {name}
                      </Text>
                    )}
                  </Flex>
                  <Box flexGrow={1} />
                  <Flex
                    className="action-box"
                    align={"center"}
                    justify={"center"}
                    h="100%"
                  >
                    {actionBar}
                  </Flex>
                </Flex>
                <Box w="0.5rem" flexShrink={0} />
              </Flex>
              <Flex
                // w="100%"
                direction={"column"}
                overflow={"hidden"}
                ml="0.5rem"
                className={classNames({
                  "tree-node-children-list": true,
                  "tree-node-children-list-expanded": expanded,
                  "tree-node-children-list-collapsed": !expanded,
                  [css`
                    height: ${children?.length ? `auto` : "0"};
                  `]: expanded,
                })}
                w="calc(100% - 0.5rem)"
              >
                {children &&
                  filterUsingHooks(
                    [...children]
                      .sort(nameSorter)
                      .sort(
                        (a, b) =>
                          (a.type === "file" ? 1 : 0) -
                          (b.type === "file" ? 1 : 0)
                      )
                  ).map((child) =>
                    viewSystem.renderNode({
                      node: child,
                      level: level + 1,
                      parentNode: node,
                    })
                  )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      );
    };
    viewSystem.renderer.register("tree-node", TreeNode);
  },
});
