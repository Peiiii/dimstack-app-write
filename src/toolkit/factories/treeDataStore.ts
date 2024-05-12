import { configureStore, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import type { Transform } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
// import PouchDBStorage from "redux-persist-pouchdb";
import persistLocalStorage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const Storages = {
  localStorage: persistLocalStorage,
  // PouchDBStorage: PouchDBStorage,
};

export type PersistConfig = {
  name: string;
  type: "LocalStorage";
  transforms?: Transform<any, any>[];
};

export type TreeDataNode<T> = T & {
  children?: TreeDataNode<T>[];
  id: string;
};

type TreeDataAction<T> = {
  type: string;
  payload?: {
    node?: TreeDataNode<T>;
    id?: string;
    parentId?: string;
  };
};

type TreeDataObserver<T> = (action: TreeDataAction<T>) => void;

export const createTreeDataStore = <T extends { [k: string]: any }>({
  name = "treeData",
  initialState,
  primaryKey = "id",
  middlewareConfig = {},
  persistConfig,
}: {
  name?: string;
  initialState: TreeDataNode<T>;
  primaryKey?: string;
  middlewareConfig?: any;
  persistConfig?: PersistConfig;
}) => {
  const slice = createSlice({
    name,
    initialState: {
      data: initialState,
    },
    reducers: {
      init: (state, action) => {
        state.data = action.payload || initialState;
      },
      update: (
        state,
        action: { type: string; payload: { node: Partial<TreeDataNode<T>> } }
      ) => {
        const { node } = action.payload || {};
        if (!node) return;
        const findAndReplace = (
          parent: TreeDataNode<T>,
          node: Partial<TreeDataNode<T>>
        ) => {
          if (parent[primaryKey] === node[primaryKey]) {
            Object.assign(parent, node);
            return true;
          } else if (parent.children) {
            for (const child of parent.children) {
              if (findAndReplace(child, node)) return true;
            }
          }
          return false;
        };
        findAndReplace(state.data as TreeDataNode<T>, node);
      },

      add: (state, action) => {
        const { node, parentId } = action.payload || {};
        if (!node) return;
        if (!parentId) {
          state.data.push(node);
        } else {
          const findAndAdd = (
            parent: TreeDataNode<T>,
            node: TreeDataNode<T>
          ) => {
            if (parent[primaryKey] === parentId) {
              if (!parent.children) parent.children = [];
              parent.children.push(node);
              return true;
            } else if (parent.children) {
              for (const child of parent.children) {
                if (findAndAdd(child, node)) return true;
              }
            }
            return false;
          };
          findAndAdd(state.data as TreeDataNode<T>, node);
        }
      },
      delete: (state, action) => {
        // console.log("action:",action)
        const{ id } = action.payload||{};
        if (!id) return;
        const findAndDelete = (parent: TreeDataNode<T>, id: string) => {
          // console.log("parent:",parent)
          if (parent.children) {
            const index = parent.children.findIndex(
              (node) => node[primaryKey] === id
            );
            // console.log("foundNode：",index)
            if (index !== -1) {
              
              parent.children.splice(index, 1);
              return true;
            } else {
              for (const child of parent.children) {
                if (findAndDelete(child, id)) return true;
              }
            }
          }
          return false;
        };
        findAndDelete(state.data as TreeDataNode<T>, id);
      },
    },
  });

  const defaultMiddlewareConfig = {
    serializableCheck: false,
  };
  let reducer: any = slice.reducer;
  if (persistConfig) {
    let storage;
    switch (persistConfig.type) {
      case "LocalStorage":
        storage = Storages.localStorage;
        break;
      // case "PouchDB":
      //   storage = new Storages.PouchDBStorage(new PouchDB(persistConfig.name));
      //   break;
      default:
        storage = Storages.localStorage;
        break;
    }
    reducer = persistReducer(
      {
        key: persistConfig.name,
        storage: storage,
        transforms: persistConfig.transforms || [],
      },
      slice.reducer
    );
  }
  type ChangeMonifier = (changes: TreeDataChange<T>[]) => any;
  const changeMonifierList: ChangeMonifier[] = [];
  const diffMiddleware = (store) => (next) => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    const differences = diff(prevState, nextState);
    if (differences) {
      // console.log("State changed:", differences);
      // 调用监听函数
      changeMonifierList.forEach((changeMonifier) => {
        changeMonifier(differences);
      });
    }
    return result;
  };
  const store = configureStore({
    reducer: {
      [name]: reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        ...defaultMiddlewareConfig,
        ...middlewareConfig,
      }).concat([thunk, diffMiddleware]),
  });
  if (persistConfig) persistStore(store);

  function useSelectedState(store, selector) {
    const [selectedState, setSelectedState] = useState(
      selector(store.getState())
    );
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const newSelectedState = selector(store.getState());
        if (newSelectedState !== selectedState) {
          setSelectedState(newSelectedState);
        }
      });
      return () => unsubscribe();
    }, [store, selector, selectedState]);
    return selectedState;
  }

  const useData = () => {
    return useSelectedState(
      store,
      (state) => state![name].data as TreeDataNode<T>
    );
  };

  const findNode = (
    current: TreeDataNode<T>,
    id: string
  ): TreeDataNode<T> | undefined => {
    if (current[primaryKey] === id) return current;
    if (current.children) {
      for (const child of current.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
    }
    return undefined;
  };
  const getNode = (id: string) => {
    return findNode(
      (store.getState()[name] as ReturnType<(typeof slice)["getInitialState"]>)
        .data,
      id
    );
  };
  const useNode = (id: string) => {
    return useSelectedState(store, (state) => {
      return findNode(state[name].data, id);
    });
  };
  const useInternalSelector = (selector) => {
    return useSelectedState(store, (state) => selector(state![name].data));
  };
  let observers: TreeDataObserver<any>[] = [];

  const notifyObservers = (action: TreeDataAction<any>) => {
    for (const observer of observers) {
      observer(action);
    }
  };
  const addObserver = (observer: TreeDataObserver<any>) => {
    observers.push(observer);
    return () => removeObserver(observer);
  };

  const removeObserver = (observer: TreeDataObserver<any>) => {
    observers = observers.filter((o) => o !== observer);
  };
  const getActions = () => {
    const actions: typeof slice.actions = {} as any;
    for (const actionName in slice.actions) {
      actions[actionName] = (...args) => {
        const action = slice.actions[actionName](...args);
        store.dispatch(action);
        notifyObservers(action);
      };
    }
    return actions;
  };

  const onChange = (handler: ChangeMonifier) => {
    changeMonifierList.push(handler);
    return () =>
      changeMonifierList.splice(changeMonifierList.indexOf(handler), 1);
  };
  return {
    reduxStore: store,
    useSelector: useInternalSelector,
    useData: useData,
    useNode,
    onChange,
    getActions,
    getNode,
    getData: () => {
      return (
        store.getState()[name] as ReturnType<(typeof slice)["getInitialState"]>
      ).data;
    },
    id: nanoid(),
    addObserver,
    removeObserver,
  };
};

export type TreeDataStore<T extends Record<string, any> = any> = ReturnType<
  typeof createTreeDataStore<T>
>;

export interface TreeDataChange<T = any> {
  id: string;
  type: "add" | "delete" | "update";
  path?: string[];
  value?: T;
}

function diff<Node extends { id: string; children?: any[] }>(
  obj1: Node,
  obj2: Node
): TreeDataChange[] {
  const changes: TreeDataChange[] = [];

  const dfs = (
    node1: Node | undefined,
    node2: Node | undefined,
    path: string[]
  ) => {
    if (!node1 && !node2) {
      return;
    }

    if (!node1) {
      // node1 不存在，node2为新增节点
      changes.push({ id: node2!.id, type: "add", path });
      return;
    }

    if (!node2) {
      // node2 不存在，node1为删除节点
      changes.push({ id: node1!.id, type: "delete", path });
      return;
    }

    // 对比 node1 和 node2 的属性
    const keys = new Set([...Object.keys(node1), ...Object.keys(node2)]);
    for (const key of keys) {
      if (key === "children") {
        continue;
      }
      if (node1[key] !== node2[key]) {
        changes.push({
          id: node1.id,
          type: "update",
          path: [...path, key],
          value: node2[key],
        });
      }
    }

    // 对比 node1 和 node2 的子节点列表
    // const childChanges: TreeDataChange[] = [];
    const childIds = new Set([
      ...(node1.children || []).map((child) => child.id),
      ...(node2.children || []).map((child) => child.id),
    ]);
    for (const id of childIds) {
      const child1 = node1.children?.find((child) => child.id === id);
      const child2 = node2.children?.find((child) => child.id === id);
      dfs(child1, child2, [...path, "children", String(id)]);
    }
  };
  dfs(obj1, obj2, []);
  return changes;
}
