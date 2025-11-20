import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-65a7eab5.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-63af28df.js";
import { v as setConfig } from "./index-b1a4f929.js";
import "./app-ac489121.js";
import "./graph-54dd913d.js";
import "./layout-c78b08c9.js";
import "./index-3862675e-849fd1a6.js";
import "./clone-47c8f3dd.js";
import "./edges-e0da2a9e-f214f9a8.js";
import "./createText-2e5e7dd3-60392a3d.js";
import "./line-2876613c.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-ccf2e28d.js";
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
