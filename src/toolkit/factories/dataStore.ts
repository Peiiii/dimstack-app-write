import { createAtom } from "@/toolkit/factories/atom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { batch } from "react-redux";
import type { Transform } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
// import PouchDBStorage from "redux-persist-pouchdb";
import persistLocalStorage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { ReplaySubject, Subject } from "rxjs";

const Storages = {
  localStorage: persistLocalStorage,
  // PouchDBStorage: PouchDBStorage,
};
export type PersistConfig = {
  name: string;
  type: "LocalStorage";
  transforms?: Transform<any, any>[];
};
type DataStoreAction<T> = {
  type: string;
  payload?: T;
};
export interface DataChange<T = any> {
  id: string;
  type: "add" | "delete" | "update";
  value?: Partial<T>;
}

type DataLayerObserver<T> = (action: DataStoreAction<T>) => void;
export const createDataStore = <T extends { [k: string]: any }>({
  name = "dataLayer",
  initialState,
  primaryKey = "id",
  middlewareConfig = {},
  persistConfig,
}: {
  name?: string;
  initialState: T[];
  primaryKey?: string;
  middlewareConfig?: any;
  persistConfig?: PersistConfig;
}) => {
  const loadEvent$ = new ReplaySubject(1);
  const slice = createSlice({
    name,
    initialState: {
      data: initialState,
      rehydrated: false,
    },
    reducers: {
      init: (state, action) => {
        state.data = action.payload || initialState;
      },
      reduce: (state, action) => {
        state.data = action.payload(state.data);
      },
      upsert: (state, action) => {
        const record = action.payload;
        const pValue = record[primaryKey];
        const oldRecord = state.data.find(
          (record) => record[primaryKey] === pValue
        );
        if (oldRecord) {
          Object.assign(oldRecord, record);
        } else {
          state.data.push(record);
        }
      },
      update: (state, action) => {
        // transforms(state);
        const record = action.payload;
        const pValue = record[primaryKey];
        const oldRecord = state.data.find(
          (record) => record[primaryKey] === pValue
        );
        if (oldRecord) {
          Object.assign(oldRecord, record);
        }
        // console.log("updated:", oldRecord);
      },
      clear: (state) => {
        state.data.splice(0, state.data.length);
      },
      add: (state, action) => {
        state.data.push(action.payload);
      },
      delete: (state, action) => {
        const _record = state.data.find(
          (record) => record[primaryKey] === action.payload
        )!;
        console.log("state:", [...state.data]);
        console.log("find_record:", action.payload, _record);
        const index = state.data.indexOf(_record);
        console.log("deleted:", index);
        if (index !== -1) {
          state.data.splice(index, 1);
        }
      },
      __rehydrationCompleted: (state, action) => {
        state.rehydrated = action.payload === undefined ? action.payload : true;
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
      // () => {
      //   // slice.actions.rehydrationCompleted(true);
      // }
    );
  }
  const store = configureStore({
    reducer: {
      [name]: reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        ...defaultMiddlewareConfig,
        ...middlewareConfig,
      }).concat([
        // thunk
      ]),
  });

  const atom = createAtom<{
    events: {
      load: [];
    };
  }>();

  if (persistConfig)
    persistStore(store, {}, () => {
      store.dispatch(slice.actions.__rehydrationCompleted(true));
      atom.emit("load");
      loadEvent$.next(true);
    });

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
    // console.log(store.getState)
    return useSelectedState(store, (state) => {
      // console.log(store.getState());
      return state![name].data as T[];
    }) as T[];
  };
  const useRecord = (id: string) => {
    return useSelectedState(store, (state) => {
      // console.log(store.getState());
      return (state![name].data as T[]).find((item) => item[primaryKey] === id);
    }) as T | undefined;
  };
  const useInternalSelector = (selector) => {
    return useSelectedState(store, (state) => selector(state![name].data));
  };
  let observers: DataLayerObserver<any>[] = [];

  const notifyObservers = (action: DataStoreAction<any>) => {
    for (const observer of observers) {
      observer(action);
    }
  };
  const addObserver = (observer: DataLayerObserver<any>) => {
    observers.push(observer);
    return () => removeObserver(observer);
  };

  const removeObserver = (observer: DataLayerObserver<any>) => {
    observers = observers.filter((o) => o !== observer);
  };
  const getActions = () => {
    const actions: typeof slice.actions = {} as any;
    for (const actionName in slice.actions) {
      actions[actionName] = (...args) => {
        // if(args.length===0)args=[undefined];
        const action = slice.actions[actionName](...args);
        store.dispatch(action);
        // console.log("dispatching action :", action);
        notifyObservers(action);
      };
    }
    return actions;
  };
  const applyChanges = (changes: DataChange<T>[]) => {
    batch(() => {
      changes.forEach((change) => {
        switch (change.type) {
          case "add":
            getActions().add(change.value);
            break;
          case "delete":
            getActions().delete(change.id);
            break;
          case "update":
            getActions().update(change.value);
            break;
        }
      });
    });
  };
  const getData = () => {
    return (store.getState() as { [k: string]: { data: T[] } })[name].data;
  };
  const getRecord = (id) => {
    return (store.getState() as { [k: string]: { data: T[] } })[name].data.find(
      (record) => record[primaryKey] === id
    );
  };
  return {
    reduxStore: store,
    useSelector: useInternalSelector,
    useData: useData,
    useRecord,
    applyChanges,
    getActions,
    getData,
    getRecord,
    id: nanoid(),
    addObserver,
    removeObserver,
    on: atom.on,
    waitUtilLoaded: (callback: () => void) => {
      const sub = loadEvent$.subscribe(callback);
      return () => sub.unsubscribe();
    },
  };
};

export type DataStore<T extends Record<string, any>> = ReturnType<
  typeof createDataStore<T>
>;
