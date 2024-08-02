import { createDataStore, DataStore } from "@/toolkit/factories/dataStore";
import { createEventBus, EventBus } from "@/toolkit/factories/eventBus";
import { createPipeService } from "@/toolkit/factories/pipeService";
import { createRenderer, Renderer } from "@/toolkit/factories/renderer";
import { createServiceBus } from "@/toolkit/factories/serviceBus";
import { TreeDataStore } from "@/toolkit/factories/treeDataStore";
import { SafeAny } from "@/toolkit/types";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo } from "react";

// View System
export type WidgetViewState = {
  id: string;
  expanded: boolean;
  editMode?: boolean;
  expandable: boolean;
  highlight?: boolean;
  loading?: boolean;
};
type NodeMenuItem = {
  id: string;
  name: string;
  title?: string;
  event?: string;
  icon?: React.ReactElement;
  validate?: (context: { node: any; level: number }) => boolean;
};

const createViewSystem = <T,>(
  {
    renderer,
    viewStateStore,
    eventBus,
  }: {
    renderer: Renderer;
    viewStateStore: DataStore<WidgetViewState>;
    eventBus: EventBus;
  },
  getContext: () => T
) => {
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
          onClick={(e) => {
            if (nodeMenuItem.event) {
              eventBus.emit(nodeMenuItem.event, { node, event: e });
              e.stopPropagation();
              e.preventDefault();
            }
          }}
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
          context: getContext(),
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
  const getDefaultViewState = (node?: any, props?: any): WidgetViewState => {
    return defaultViewStatePrider
      ? defaultViewStatePrider(node, props)
      : { ...props };
  };
  const getViewStateOrDefaultViewState = (id: string) => {
    return viewStateStore.getRecord(id) || getDefaultViewState({ id });
  };
  const viewSystem = {
    renderer,
    renderNode,
    render,
    addNodeMenuItems,
    renderNodeMenuItem,
    getDefaultViewState,
    getViewStateOrDefaultViewState,
    setDefaultViewStateProvider: setDefaultViewStateProvider,
    viewStateStore,
    getNodeMenuItems,
  };
  return viewSystem;
};
type ViewSystem = ReturnType<typeof createViewSystem>;
// const defaultRenderer = createRenderer();

// Plugin System
export type WidgetContext<
  TreeNodeType extends Record<string, any>,
  OptionsType extends Record<string, SafeAny> = Record<string, SafeAny>
> = {
  dataStore: TreeDataStore<TreeNodeType>;
  // viewStateStore: DataStore<WidgetViewState>;
  // renderer: ReturnType<typeof createRenderer>;
  eventBus: EventBus;
  pipe: ReturnType<typeof createPipeService>;
  serviceBus: ReturnType<typeof createServiceBus>;
  viewSystem: ViewSystem;
  options: OptionsType;
};
export type WidgetPlugin<
  T extends Record<string, any>,
  OptionsType extends Record<string, SafeAny>
> = {
  activate?: (context: WidgetContext<T, OptionsType>) => void;
  deactivate?: (context: WidgetContext<T, OptionsType>) => void;
};

// Tree Component

export const Tree = <
  T extends Record<string, any>,
  OptionsType extends Record<string, any> = Record<string, any>
>({
  plugins = [],
  dataStore,
  eventBus,
  viewSystem,
  viewStateStore,
  pipe,
  serviceBus,
  options = {} as OptionsType,
}: {
  plugins?: WidgetPlugin<T, OptionsType>[];
} & Partial<Exclude<WidgetContext<T, OptionsType>, "dataStore">> &
  Pick<WidgetContext<T, OptionsType>, "dataStore"> & {
    viewStateStore?: DataStore<WidgetViewState>;
  }) => {
  const renderer = useMemo(() => createRenderer(), []);
  const finalEventBus = useMemo(() => eventBus || createEventBus(), [eventBus]);
  const finalServiceBus = useMemo(
    () => serviceBus || createServiceBus(),
    [serviceBus]
  );
  const finalPipe = useMemo(() => pipe || createPipeService(), [pipe]);
  const getContext = useCallback((): WidgetContext<T, OptionsType> => {
    return {
      viewSystem: finalViewSystem,
      eventBus: finalEventBus,
      dataStore,
      options,
      pipe: finalPipe,
      serviceBus: finalServiceBus,
    };
  }, [finalEventBus, dataStore, options, finalPipe, finalServiceBus]);

  const finalViewSystem = useMemo(
    () =>
      viewSystem ||
      createViewSystem<WidgetContext<T, OptionsType>>(
        {
          viewStateStore:
            viewStateStore ||
            createDataStore<WidgetViewState>({
              initialState: [],
            })!,
          eventBus: finalEventBus,
          renderer,
        },
        getContext
      ),
    [finalEventBus, viewSystem, dataStore, renderer]
  );

  useEffect(() => {
    const context = getContext();
    console.log(
      `[${options.space.id}|${context.options.space.id}] plugin activating`
    );
    for (const plugin of plugins) {
      plugin.activate?.(getContext());
    }
    return () => {
      for (const plugin of plugins) {
        plugin.deactivate?.(getContext());
      }
    };
  }, []);

  const rootNode = dataStore.useData();
  return (
    <Box className="tree">
      {finalViewSystem.renderNode({
        node: rootNode,
        level: 0,
      })}
    </Box>
  );
};
