import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-645007a1.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-0f8809bf.js";
import { v as setConfig } from "./index-9b8f0683.js";
import "./app-3c8e0cdd.js";
import "./graph-e2ec6876.js";
import "./layout-6c8daa00.js";
import "./index-3862675e-098b9819.js";
import "./clone-67de3a0d.js";
import "./edges-e0da2a9e-941b61d7.js";
import "./createText-2e5e7dd3-8288a2bb.js";
import "./line-a86e6fe0.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-6526ff1f.js";
import "./monaco-45e206c0.js";
import "./chakra-ui-1d60df8d.js";
import "./vendor-75a482ef.js";
import "./react-utils-d24e6041.js";
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
