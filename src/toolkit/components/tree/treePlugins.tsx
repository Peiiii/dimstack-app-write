import {
  PluginInitializationConfiguration,
  createPluginSystem,
} from "@/toolkit/common/pluginSystem";
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
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { WidgetContext } from ".";
import { SafeAny } from "@/toolkit/common/types";

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
  addOptions() {
    return {
      defaultExpanded: false,
    };
  },
  activate({ eventBus, viewSystem, serviceBus, dataStore }) {
    const toggleNode = ({ node, event }: { node: any; event?: any }) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      const viewState =
        viewSystem.viewStateStore.getRecord(node.id) ||
        viewSystem.getDefaultViewState(node, {
          expanded: this.options.defaultExpanded,
        });
      viewSystem.viewStateStore
        .getActions()
        .upsert({ ...viewState, expanded: !viewState.expanded });
    };
    const expandNode = ({ node, event }: { node: any; event?: any }) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      const viewState =
        viewSystem.viewStateStore.getRecord(node.id) ||
        viewSystem.getDefaultViewState(node, {
          expanded: this.options.defaultExpanded,
        });
      viewSystem.viewStateStore
        .getActions()
        .upsert({ ...viewState, expanded: true });
    };
    eventBus.on("node::click", toggleNode);
    eventBus.on("node::keydown.enter", toggleNode);
    serviceBus.expose("expandNode", (id: string) => {
      expandNode({ node: dataStore.getNode(id)! });
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
    const IconEllipsis = HiOutlineEllipsisVertical;
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
      // console.log("children：",children)
      // if(children){
      //   console.log([...children].sort(i=>i.type))
      // }
      const viewState =
        viewSystem.viewStateStore.useRecord(id) ||
        viewSystem.getDefaultViewState({ id });
      const inputRef = useRef<HTMLInputElement>(null);

      const { expanded, editMode, expandable, highlight } = viewState;
      const nodeMenuItems = viewSystem.getNodeMenuItems({ node, level });
      let actionBar;
      if (nodeMenuItems.length === 0) actionBar = null;
      else if (nodeMenuItems.length >= 3)
        actionBar = (
          <Menu>
            <MenuButton
              h="100%"
              className="hover-visible"
              as={Button}
              borderRadius={0}
              variant="solid"
              size="xs"
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
                    })
                  )
                  .map((menuItem, index) => (
                    <MenuItem key={index}>{menuItem}</MenuItem>
                  ))}
              </MenuList>
            </Portal>
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
            <Box
              className="placeholder"
              w={3}
              flexShrink={0}
              flexGrow={0}
            />
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
                // flexGrow={1}
                align={"center"}
                overflow={"hidden"}
              >
                <Flex
                  minW={0}
                  overflow={"hidden"}
                  direction={"row"}
                  h="2rem"
                  w="100%"
                  flexGrow={1}
                  align="center"
                  onClick={eventBus.connector("node::click", (event) => ({
                    node,
                    event,
                  }))}
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
                    </Flex>
                    {viewSystem.render("icon-node-type", { node })}
                    <Box w="0.5em"></Box>
                    {editMode ? (
                      <Input
                        ref={inputRef}
                        autoFocus
                        size={"sm"}
                        flexGrow={0}
                        onChange={eventBus.connector(
                          "editProgress",
                          (event) => ({
                            node,
                            event,
                          })
                        )}
                        onBlur={eventBus.connector("editBlur", (event) => ({
                          node,
                          event,
                        }))}
                        onKeyDown={(event) => {
                          if (event.code.toLocaleLowerCase() === "enter") {
                            eventBus.emit("editKeyEnter", { node, event });
                          }
                        }}
                        defaultValue={name}
                      />
                    ) : (
                      // <Tooltip label={name}>
                      <Text
                        title={name}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                      >
                        {name}
                      </Text>
                      // </Tooltip>
                    )}
                  </Flex>
                  {/* <Button
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
              
              </Button> */}
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
                className="tree-node-children-list"
                w="calc(100% - 0.5rem)"
                {...(expanded ? {} : { display: "none" })}
              >
                {children &&
                  [...children]
                    .sort(
                      (a, b) =>
                        (a.type === "file" ? 1 : 0) -
                        (b.type === "file" ? 1 : 0)
                    )
                    .map((node) =>
                      viewSystem.renderNode({
                        node,
                        level: level + 1,
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
