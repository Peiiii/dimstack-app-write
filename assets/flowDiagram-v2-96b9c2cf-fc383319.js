import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-a4813e17.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-bdf39295.js";
import { v as setConfig } from "./index-5e4bb2a2.js";
import "./app-254b8ee7.js";
import "./graph-f72a900a.js";
import "./layout-9255b992.js";
import "./index-3862675e-d28ce485.js";
import "./clone-1a563b99.js";
import "./edges-e0da2a9e-656565e9.js";
import "./createText-2e5e7dd3-31a1e77d.js";
import "./react-markdown-1245d4fe.js";
import "./chakra-ui-31f48106.js";
import "./line-c7e9cc57.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-fb242dfa.js";
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
