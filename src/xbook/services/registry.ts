const Registry = {
  create: () => {
    const map = new Map();
    const has = map.has.bind(map);
    const get = map.get.bind(map);
    const set = map.set.bind(map);
    return {
      has,
      get,
      set,
    };
  },
};
export const registry = Registry.create();
