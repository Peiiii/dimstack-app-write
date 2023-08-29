import { createDataStore, DataStore } from "@/toolkit/common/dataStore";
import { createEventBus, EventBus } from "@/toolkit/common/eventBus";
import { createRenderer, Renderer } from "@/toolkit/common/renderer";
import { TreeDataStore } from "@/toolkit/common/treeDataStore";
import { SafeAny } from "@/toolkit/common/types";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";

// View System
export type WidgetViewState = {
  id: string;
  expanded: boolean;
  editMode?: boolean;
  expandable: boolean;
  highlight?: boolean;
};
type NodeMenuItem = {
  id: string;
  name: string;
  title?: string;
  event?: string;
  icon?: React.ReactElement;
  validate?: (context: { node: any; level: number }) => boolean;
};
const createViewSystem = <T = any,>({
  renderer,
  viewStateStore,
  eventBus,
  context,
}: {
  renderer: Renderer;
  viewStateStore: DataStore<WidgetViewState>;
  eventBus: EventBus;
  context: T;
}) => {
  const nodeMenuItems: NodeMenuItem[] = [];
  const addNodeMenuItems = (menuItems: NodeMenuItem[]) => {
    for (const menuItem of menuItems) {
      const existingItem = nodeMenuItems.find(
        (item) => item.id === menuItem.id
      );
      if (existingItem) {
        Object.assign(existingItem, menuItem);
      } else {
        nodeMenuItems.push(menuItem);
      }
    }
  };
  const renderNodeMenuItem = (nodeMenuItem, { node }, simple = false) => {
    if (simple) {
      return (
        <Flex
          key={nodeMenuItem.id}
          title={nodeMenuItem.title || nodeMenuItem.name}
          onClick={
            nodeMenuItem.event
              ? eventBus.connector(nodeMenuItem.event, (event) => ({
                  node,
                  event,
                }))
              : undefined
          }
        >
          {nodeMenuItem.icon || nodeMenuItem.name || nodeMenuItem.title}
        </Flex>
      );
    }
    return (
      <Flex
        w="100%"
        align={"center"}
        key={nodeMenuItem.id}
        justify="space-between"
        onClick={
          nodeMenuItem.event
            ? eventBus.connector(nodeMenuItem.event, (event) => ({
                node,
                event,
              }))
            : undefined
        }
      >
        {nodeMenuItem.title || nodeMenuItem.name}
        {nodeMenuItem.icon}
      </Flex>
    );
  };
  const renderNode = ({ node, level = 0 }: { node: any; level?: number }) => {
    return renderer.render(
      {
        type: "tree-node",
        props: {
          node,
          level,
          context: {
            viewSystem,
            eventBus,
            ...context,
          },
        },
      },
      node.id
    );
  };
  const render = (type, props = {}) => {
    return renderer.render({
      type,
      props,
    });
  };
  const getNodeMenuItems = ({ node, level }) => {
    return nodeMenuItems.filter(
      (item) => !item.validate || item.validate({ node, level })
    );
  };
  type ViewStateProvider = (node?: any, props?: any) => any;
  let defaultViewStatePrider;

  const setDefaultViewStateProvider = (provider: ViewStateProvider) =>
    (defaultViewStatePrider = provider);
  const getDefaultViewState = (node?: any, props?: any) => {
    return defaultViewStatePrider
      ? defaultViewStatePrider(node, props)
      : { ...props };
  };
  const viewSystem = {
    renderer,
    renderNode,
    render,
    addNodeMenuItems,
    renderNodeMenuItem,
    getDefaultViewState,
    setDefaultViewStateProvider: setDefaultViewStateProvider,
    viewStateStore,
    getNodeMenuItems,
  };
  return viewSystem;
};
type ViewSystem = ReturnType<typeof createViewSystem>;
const defaultRenderer = createRenderer();

// Plugin System
export type WidgetContext<TreeNodeType extends Record<string, any>> = {
  dataStore: TreeDataStore<TreeNodeType>;
  // viewStateStore: DataStore<WidgetViewState>;
  eventBus: EventBus;
  viewSystem: ViewSystem;
  options: Record<string, SafeAny>;
};
export type WidgetPlugin<T extends Record<string, any>> = {
  activate: (context: WidgetContext<T>) => void;
};

// Tree Component

export const Tree = <T extends Record<string, any>>({
  plugins = [],
  dataStore,
  eventBus,
  viewSystem,
  viewStateStore,
  options = {},
}: {
  plugins?: WidgetPlugin<T>[];
} & Partial<Exclude<WidgetContext<T>, "dataStore">> &
  Pick<WidgetContext<T>, "dataStore"> & {
    viewStateStore?: DataStore<WidgetViewState>;
  }) => {
  eventBus = useMemo(() => eventBus || createEventBus(), [eventBus]);
  viewSystem = useMemo(
    () =>
      viewSystem ||
      createViewSystem<Pick<WidgetContext<T>, "dataStore" | "options">>({
        viewStateStore:
          viewStateStore ||
          createDataStore<WidgetViewState>({
            initialState: [],
          })!,
        eventBus: eventBus!,
        renderer: defaultRenderer,
        context: { dataStore, options },
      }),
    [eventBus, viewSystem, dataStore]
  );

  useEffect(() => {
    for (const plugin of plugins) {
      plugin.activate({
        dataStore,
        eventBus: eventBus!,
        viewSystem: viewSystem!,
        options,
      });
    }
  }, []);

  const rootNode = dataStore.useData();
  return (
    <Box className="tree">
      {viewSystem.renderNode({
        node: rootNode,
        level: 0,
      })}
    </Box>
  );
};
