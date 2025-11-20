import { _, C as Color } from "./index-b1a4f929.js";
const channel = (color, channel2) => {
  return _.lang.round(Color.parse(color)[channel2]);
};
const channel$1 = channel;
export {
  channel$1 as c
};
