import { DataStore } from "@/toolkit/common/dataStore";

export const wrapDataStoreAsService = <T extends Record<string, unknown>>(
  store: DataStore<T>
) => {
  type OpParameters<
    OpName extends keyof ReturnType<DataStore<T>["getActions"]>
  > = Parameters<ReturnType<DataStore<T>["getActions"]>[OpName]>;

  return {
    add: (...args: OpParameters<"add">) => store.getActions().add(...args),
    clear: (...args: OpParameters<"clear">) =>
      store.getActions().clear(...args),
    delete: (...args: OpParameters<"delete">) =>
      store.getActions().delete(...args),
    init: (...args: OpParameters<"init">) => store.getActions().init(...args),
    update: (...args: OpParameters<"update">) =>
      store.getActions().update(...args),
    upsert: (...args: OpParameters<"upsert">) =>
      store.getActions().upsert(...args),
  };
};
