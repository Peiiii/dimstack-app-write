export interface Plugin {
    activate(): void;
}
const createPluginService = () => {
    const usedPlugins:Plugin[]=[];
    const use = (plugins: Plugin[] | Plugin) => {
        if (!Array.isArray(plugins)) {
            plugins = [plugins];
        }
        plugins.forEach(plugin => {
          usedPlugins.push(plugin);
          plugin.activate();
        })
    };
    return {
        use,
    }
}

export const pluginService = createPluginService();