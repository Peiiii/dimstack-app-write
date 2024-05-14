import { SafeAny } from "@/toolkit/types";
import { Alert, Box, Button } from "@chakra-ui/react";
import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { ErrorBoundary } from "react-error-boundary";
import { Provider, useSelector } from "react-redux";
import xbook from "xbook/index";

// 定义组件节点的类型
export interface LayoutNode {
  type: string;
  props?: Record<string, SafeAny>;
  children?: LayoutNode[];
}
type ComponentNode = React.ComponentType<SafeAny>;
type ComponentRegistry = Record<string, ComponentNode>;

function matchPath(path: string, routePath) {
  function parseQueryParams(search) {
    const searchParams = new URLSearchParams(search);
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }
  const re = new RegExp("^" + routePath.replace(/:\w+/g, "([\\w-]+)") + "$");
  const match = path.match(re);
  if (match) {
    const params = {};
    const paramNames = routePath.match(/:(\w+)/g)
      ? routePath.match(/:(\w+)/g)!.map((s) => s.slice(1))
      : [];
    for (let i = 1; i < match.length; i++) {
      params[paramNames[i - 1]] = match[i];
    }
    Object.assign(params, parseQueryParams(location.search));
    return {
      match: path,
      params: params,
    };
  } else {
    return false;
  }
}
function DefaultErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
// 创建渲染系统和API
export const createRenderer = (registryName: string = "componentRegistry") => {
  // 动态组件注册表

  const slice = createSlice({
    initialState: {} as ComponentRegistry,
    name: registryName,
    reducers: {
      register(state, action) {
        const { name, component, override } = action.payload;
        // console.log("register", name)
        if (state[name] && !override) return;
        state[name] = component;
      },
    },
  });

  const store = configureStore({
    reducer: combineReducers({
      [registryName]: slice.reducer,
      // requests: requestSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  const getComponent = (state: ComponentRegistry, name: string) => {
    const component = state![registryName][name];
    if (component) return component;
    else {
      for (const namePattern in state![registryName]) {
        const matcher = matchPath(name, namePattern);
        if (matcher) {
          return state![registryName][namePattern];
        }
      }
    }
  };

  const useComponent = (name) =>
    useSelector<SafeAny, ComponentNode>((state) => {
      return getComponent(state, name);
    });

  let ErrorFallback = DefaultErrorFallback;
  const setFallbackComponent = (fallback) => {
    ErrorFallback = fallback;
  };
  let DefaultNotFoundComponent = ({ type }: { type: string }) => {
    return (
      <Box>
        <Alert>Unknown component type: {type}</Alert>
        <Button
          onClick={() => {
            xbook.eventBus.emit("/welcome");
          }}
        >
          返回首页
        </Button>
      </Box>
    );
  };

  // 注册组件
  const registerComponent = (
    name: string,
    component: ComponentNode,
    override: boolean = false
  ) => {
    store.dispatch(slice.actions.register({ name, component, override }));
  };

  // 渲染系统
  const Renderer = ({ layout }: { layout: LayoutNode }) => {
    // 渲染节点
    const { type, children, props } = layout;
    const Component = useComponent(type);
    if (!Component) {
      // requestComponent(type);
      // console.log("components:", store.getState());

      const NotFoundComponent =
        getComponent(store.getState(), "NotFoundComponent") ||
        DefaultNotFoundComponent;

      return <NotFoundComponent type={type} />;
    }

    const ReactComponent = Component as React.ComponentType<SafeAny>;
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ReactComponent {...props}>
          {children &&
            children.map((child, index) => (
              <Renderer key={index} layout={child} />
            ))}
        </ReactComponent>
      </ErrorBoundary>
    );
  };

  // 注册组件
  const register = (
    name: string,
    component: React.ComponentType<SafeAny>,
    override: boolean = false
  ) => {
    registerComponent(name, component, override);
  };

  // 渲染
  const render = (layout: LayoutNode, key = 0) => {
    return (
      <Provider key={key} store={store}>
        <Renderer key={key} layout={layout} />
      </Provider>
    );
  };
  const getComponents = () => {
    return store.getState();
  };
  return {
    register,
    render,
    getComponents,
    setFallbackComponent,
  };
};

export type Renderer = ReturnType<typeof createRenderer>;
