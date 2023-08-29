import { SafeAny } from "@/toolkit/common/types";

export const createPluginSystem = <
  M extends {
    [key: Exclude<string, "id" | "name" | "description" | "addOptions">]: (
      ...args: any[]
    ) => any;
  } = {}
>() => {
  type PluginInitializationConfiguration<
    O extends Record<string, SafeAny> = {}
  > = {
    id?: string;
    name?: string;
    description?: string;
    addOptions?: () => O;
  } & M;

  type PluginType<O = {}> = {
    id?: string;
    name?: string;
    description?: string;
    options: O;
    configure(partialOptions: Partial<O>): PluginType<O>;
  } & M;

  const createPlugin = <T extends Record<string, SafeAny>>(
    config: PluginInitializationConfiguration<T>
  ) => {
    // const { addOptions = () => ({}) } = config;
    // type PluginOptions = ReturnType<typeof addOptions>;

    return (partialOptions: Partial<T> = {}) => {
      const {
        id,
        name,
        description,
        addOptions = () => ({}),
        ...lifecycles
      } = config;
      const options = addOptions();
      const configure = (partialOptions: Partial<T>) => {
        Object.assign(options, partialOptions);
        return plugin;
      };
      const plugin = {
        id,
        name,
        description,
        options,
        configure,
      };
      configure(partialOptions);
      type RawLifecycles = typeof lifecycles;
      type Lifecycles = {
        [k in keyof RawLifecycles]: (
          this: ReturnType<typeof createPlugin>,
          ...args: Parameters<RawLifecycles[k]>
        ) => ReturnType<RawLifecycles[k]>;
      };
      const newLifecycles: Lifecycles = {} as Lifecycles;
      for (const k in lifecycles) {
        newLifecycles[k as keyof Lifecycles] = lifecycles[k].bind(plugin);
      }
      return Object.assign(plugin, newLifecycles) as unknown as PluginType<T>;
    };
  };
  return {
    createPlugin,
  };
};
