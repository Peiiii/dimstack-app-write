import { TreeContext } from "@/toolkit/components/tree/tokens";
import { createDataStore, DataStore } from "@/toolkit/factories/dataStore";
import { createEventBus, EventBus } from "@/toolkit/factories/eventBus";
import { HookRegistry } from "@/toolkit/factories/hook-registry";
import {
  MenuController,
  MenuItem,
  validateMenuItem,
} from "@/toolkit/factories/menuController";
import { createPipeService } from "@/toolkit/factories/pipeService";
import { createRegistry } from "@/toolkit/factories/registry";
import { createRenderer, Renderer } from "@/toolkit/factories/renderer";
import { createDecoupledServiceBus } from "@/toolkit/factories/serviceBus";
import { TreeDataNode, TreeDataStore } from "@/toolkit/factories/treeDataStore";
import { SafeAny } from "@/toolkit/types";
import { parseWhenClause } from "@/toolkit/utils/when-clause";
import { Box, Flex } from "@chakra-ui/react";
import { css } from "@emotion/css";
import classNames from "classnames";
import { useCallback, useEffect, useMemo } from "react";

// View System
export type WidgetViewState = {
  id: string;
  expanded: boolean;
  editMode?: boolean;
  expandable: boolean;
  highlight?: boolean;
  loading?: boolean;
  validationMessage?: string;
  editingName?: string;
  isDragOver?: boolean;
};
// export type NodeMenuItem = {
//   id: string;
//   name: string;
//   group?: string;
//   title?: string;
//   event?: string;
//   icon?: string;
//   validate?: (context: { node: any; level: number }) => boolean;
// };

// export interface NodeMenuItemGroup {
//   id: string;
//   name: string;
//   icon: string;
//   children: NodeMenuItem[];
// }

export interface NodeMenuItem extends MenuItem {
  event?: string;
}

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
  const renderNode = ({
    node,
    level = 0,
    parentNode,
  }: {
    node: TreeDataNode;
    level?: number;
    parentNode?: TreeDataNode;
  }) => {
    return renderer.render(
      {
        type: "tree-node",
        props: {
          node,
          level,
          context: getContext(),
          parentNode,
        },
      },
      node.id
    );
  };
  const render = (type: string, props = {}) => {
    return renderer.render({
      type,
      props,
    });
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
export type ViewSystem = ReturnType<typeof createViewSystem>;
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
  serviceBus: ReturnType<typeof createDecoupledServiceBus>;
  hookRegistry: ReturnType<typeof HookRegistry.create>;
  registry: ReturnType<typeof createRegistry>;
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
  hookRegistry,
  registry,
  onPluginsLoaded,
}: {
  plugins?: WidgetPlugin<T, OptionsType>[];
  onPluginsLoaded?: (context: WidgetContext<T, OptionsType>) => void;
} & Partial<Exclude<WidgetContext<T, OptionsType>, "dataStore">> &
  Pick<WidgetContext<T, OptionsType>, "dataStore"> & {
    viewStateStore?: DataStore<WidgetViewState>;
  }) => {
  const renderer = useMemo(() => createRenderer(), []);
  const finalEventBus = useMemo(() => eventBus || createEventBus(), [eventBus]);
  const finalServiceBus = useMemo(
    () => serviceBus || createDecoupledServiceBus(),
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
      hookRegistry: finalHookRegistry,
      registry: finalRegistry,
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

  const finalHookRegistry = useMemo(
    () => hookRegistry || HookRegistry.create(),
    [hookRegistry]
  );

  const finalRegistry = useMemo(
    () => registry || createRegistry({}),
    [registry]
  );

  useEffect(() => {
    const context = getContext();
    for (const plugin of plugins) {
      plugin.activate?.(getContext());
    }
    onPluginsLoaded?.(context);
    return () => {
      for (const plugin of plugins) {
        plugin.deactivate?.(getContext());
      }
    };
  }, []);

  const rootNode = dataStore.useData() as TreeDataNode;
  const rootViewState =
    (viewStateStore?.useRecord(rootNode.id) as WidgetViewState) || {};
  const { expanded } = rootViewState;

  const context = useMemo(() => getContext(), [getContext]);

  return (
    <TreeContext.Provider value={context}>
      <Box
        className={classNames(
          "tree overflow-y-hidden flex-container-limited flex-col",
          css``
        )}
      >
        <div
          className={classNames(
            "w-full py-1 px-2 cursor-pointer hover:bg-gray-200 flex justify-between"
          )}
        >
          目录
          <div className="h-full flex items-center hover-show">
            {renderer.render({
              type: "tree-node-action-bar",
              props: {
                node: rootNode,
                level: 0,
              },
            })}
          </div>
        </div>
        <div
          className={classNames(
            `max-h-full h-full transition-all flex-grow flex-col overflow-y-auto scroll scroll-7`,
            {
              [`h-0 max-h-0`]: !expanded,
            }
          )}
        >
          {renderer.render({
            type: "tree-node-list",
            props: {
              nodes: rootNode.children,
              level: 0,
              parentNode: rootNode,
              expanded: rootViewState.expanded,
            },
          })}
        </div>
      </Box>
    </TreeContext.Provider>
  );
};
