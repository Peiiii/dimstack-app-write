import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-9d091a57.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-60274b26.js";
import { v as setConfig } from "./index-ecbc3fd6.js";
import "./app-325be324.js";
import "./graph-b9698585.js";
import "./layout-0f02b88f.js";
import "./index-3862675e-1f34ca9d.js";
import "./clone-c27a09e6.js";
import "./edges-e0da2a9e-4f90d3d0.js";
import "./createText-2e5e7dd3-b6aee590.js";
import "./react-markdown-1245d4fe.js";
import "./chakra-ui-31f48106.js";
import "./line-6ad9c82c.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-c68cc19d.js";
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
