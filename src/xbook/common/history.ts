const realHistory = window.history;
const realLocation = document.location;

const makeQuery = () => {
  const handler = {
    get(_, prop) {
      return new URLSearchParams(realLocation.search).get(prop);
    },
    set(_, prop, value) {
      const query = {};
      for (const [k, v] of new URLSearchParams(realLocation.search))
        query[k] = v;
      query[prop] = value;
      const search: string[] = [];
      Object.keys(query).forEach((key) => {
        search.push(`${key}=${query[key]}`);
      });
      const searchString = "?" + search.join("&&");
      console.log(searchString);
      realLocation.search = searchString;
      return true;
    },
  };
  return new Proxy({}, handler);
};
type LocationType = Location & {
  query: {
    [k: string]: string;
  };
};
const makeLocation = () => {
  const query = makeQuery();
  const handler = {
    get(target, prop) {
      if (prop === "query") return query;
      else return target[prop];
    },
  };
  return new Proxy(realLocation, handler);
};
const parse = (): LocationType => {
  return makeLocation();
};
const TransmitionManager = {
  counter: -1,
  bank: {},
  addListener: function (listener: HistoryListener) {
    this.counter += 1;
    this.bank[this.counter] = listener;
    return () => {
      delete this.bank[this.counter];
    };
  },
  callAll: function () {
    Object.keys(this.bank).map((key) => this.bank[key](history.location));
  },
};
type HistoryListener = (location: LocationType) => void;
type Unlisten = () => void;
type HrefSpec = { query?: object; pathname: string };
type HistoryType = {
  location: LocationType;
  length: number;
  push: (path: string | HrefSpec, update?: boolean) => void;
  createHref: (obj: HrefSpec) => string;
  listen: (listener: HistoryListener) => Unlisten;
  update: () => void;
};
const history: HistoryType = {
  location: parse(),
  length: realHistory.length,
  createHref: function (obj: HrefSpec) {
    let s = "";
    if (obj.query && Object.keys(obj.query).length) {
      s = "?";
      const parts: string[] = [];
      Object.keys(obj.query).map((key) => {
        parts.push(`${key}=${encodeURIComponent(obj.query![key])}`);
      });
      s += parts.join("&");
    }
    return obj.pathname + s;
  },
  push: function (path: string | HrefSpec, update: boolean = true) {
    if (typeof path === "object") path = this.createHref(path);
    realHistory.pushState({}, "", path);
    this.location = parse();
    this.length = realHistory.length;
    if (update) TransmitionManager.callAll();
  },
  listen: function (listener: HistoryListener) {
    return TransmitionManager.addListener(listener);
  },
  update: function () {
    this.location = parse();
    this.length = realHistory.length;
    TransmitionManager.callAll();
  },
};
window.onpopstate = () => {
  history.update();
};
export default history;
export { history };
