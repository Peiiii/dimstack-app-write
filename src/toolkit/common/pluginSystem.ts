import { SafeAny } from "@/toolkit/common/types";

export type PluginInitializationConfiguration<
  TypeOptions extends Record<string, SafeAny>,
  TypeMethodName extends string,
  TypeContext
> = {
  id?: string;
  name?: string;
  description?: string;
  addOptions?: () => TypeOptions;
} & {
  [methdName in TypeMethodName]: (
    this: {
      id?: string;
      name?: string;
      description?: string;
      options: TypeOptions;
    },
    context: TypeContext
  ) => void;
};

export const createPluginSystem = <
  TypeContext,
  TypeMethodName extends string
>() => {
  // type PluginInitializationConfiguration<
  //   TypeOptions extends Record<string, SafeAny>,
  //   M
  // > = {
  //   id?: string;
  //   name?: string;
  //   description?: string;
  //   addOptions?: () => TypeOptions;
  // } & M;

  type PluginType<M, O> = {
    id?: string;
    name?: string;
    description?: string;
    options: O;
    configure(partialOptions: Partial<O>): PluginType<M, O>;
  } & M;

  // const createPlugin = <TypeOptions extends Record<string, SafeAny>>(
  //   config: PluginInitializationConfiguration<
  //     {
  //       [methdName in TypeMethodName]: (
  //         this: {
  //           id?: string;
  //           name?: string;
  //           description?: string;
  //           options: TypeOptions;
  //         },
  //         context: TypeContext
  //       ) => void;
  //     },
  //     TypeOptions
  //   >
  // ) => {
  const createPlugin = <TypeOptions extends Record<string, SafeAny>>(
    config: PluginInitializationConfiguration<
      TypeOptions,
      TypeMethodName,
      TypeContext
    >
  ) => {
    // const { addOptions = () => ({}) } = config;
    // type PluginOptions = ReturnType<typeof addOptions>;

    return (partialOptions: Partial<TypeOptions> = {}) => {
      const {
        id,
        name,
        description,
        addOptions = () => ({}),
        ...lifecycles
      } = config;
      const options = addOptions();
      const configure = (partialOptions: Partial<TypeOptions>) => {
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
      return Object.assign(plugin, newLifecycles) as unknown as PluginType<
        {
          [methdName in TypeMethodName]: (
            this: {
              id?: string;
              name?: string;
              description?: string;
              options: TypeOptions;
            },
            context: TypeContext
          ) => void;
        },
        TypeOptions
      >;
    };
  };
  return {
    createPlugin,
  };
};
