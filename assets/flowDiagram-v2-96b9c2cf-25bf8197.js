import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-c4cfbb96.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-1d1e7f35.js";
import { v as setConfig } from "./index-e34b1abf.js";
import "./app-33e0c163.js";
import "./graph-45d5224f.js";
import "./layout-4eabd354.js";
import "./index-3862675e-0c4e6ce6.js";
import "./clone-60baaae6.js";
import "./edges-e0da2a9e-1ebc9ec0.js";
import "./createText-2e5e7dd3-48c4770d.js";
import "./line-2353e7df.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-f78b77ea.js";
import "./monaco-45e206c0.js";
import "./chakra-ui-1d60df8d.js";
import "./vendor-75a482ef.js";
import "./react-utils-0e8f4d03.js";
import "./common-utils-40e9b830.js";
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
