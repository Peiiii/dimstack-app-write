import { _, C as Color } from "./index-dac1bf8a.js";
const channel = (color, channel2) => {
  return _.lang.round(Color.parse(color)[channel2]);
};
const channel$1 = channel;
export {
  channel$1 as c
};
