import { C as CB, N as NQ } from "./chunk-EIO257PC-caba92dd.js";
import "./app-3c8e0cdd.js";
import "./monaco-45e206c0.js";
import "./chakra-ui-1d60df8d.js";
import "./vendor-75a482ef.js";
import "./react-utils-d24e6041.js";
import "./common-utils-40e9b830.js";
var s = import.meta.url ? new URL(import.meta.url) : void 0;
typeof window > "u" && typeof self < "u" && (self.onmessage = async (e) => {
  switch (e.data.command) {
    case CB.Subset:
      let a = await NQ(e.data.arrayBuffer, e.data.codePoints);
      self.postMessage(a, { transfer: [a] });
      break;
  }
});
export {
  s as WorkerUrl
};
