import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-c5f59699.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-8559eec6.js";
import { v as setConfig } from "./index-dac1bf8a.js";
import "./app-e6b7fe9d.js";
import "./graph-8751c269.js";
import "./layout-cc9f4a20.js";
import "./index-3862675e-f8b7915e.js";
import "./clone-9d7c6388.js";
import "./edges-e0da2a9e-af1878f0.js";
import "./createText-2e5e7dd3-47bf0959.js";
import "./react-markdown-1245d4fe.js";
import "./chakra-ui-31f48106.js";
import "./line-3eb34943.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-053f04aa.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./react-utils-d801a309.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./remark-gfm-e39f7469.js";
const diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
