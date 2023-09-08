import _xbook from "xbook/index";

export interface Plugin {
  activate(xbook: typeof _xbook): void;
}
const createPluginService = () => {
  const usedPlugins: Plugin[] = [];
  const use = (plugins: Plugin[] | Plugin) => {
    if (!Array.isArray(plugins)) {
      plugins = [plugins];
    }
    plugins.forEach((plugin) => {
      usedPlugins.push(plugin);
      plugin.activate(_xbook);
    });
  };
  return {
    use,
  };
};

export const pluginService = createPluginService();
