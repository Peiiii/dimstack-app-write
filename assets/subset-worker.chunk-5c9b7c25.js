import { C as CB, N as NQ } from "./chunk-EIO257PC-5652e2ff.js";
import "./app-254b8ee7.js";
import "./monaco-f0dde6c1.js";
import "./chakra-ui-31f48106.js";
import "./vendor-c051683a.js";
import "./react-utils-d801a309.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
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
