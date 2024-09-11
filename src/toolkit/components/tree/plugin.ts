import {
  PluginInitializationConfiguration,
  createPluginSystem,
} from "@/toolkit/factories/pluginSystem";
import { SafeAny } from "@/toolkit/types";
import { WidgetContext } from ".";

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
