import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-0a3e0277.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-f21adee2.js";
import { v as setConfig } from "./index-fb82c419.js";
import "./app-b2dfa6ae.js";
import "./graph-96277dd1.js";
import "./layout-8a17b573.js";
import "./index-3862675e-739e0b6b.js";
import "./clone-f24c5aca.js";
import "./edges-e0da2a9e-8f9bbcb5.js";
import "./createText-2e5e7dd3-6f11bfb8.js";
import "./line-c4a808a6.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-86f8ba5f.js";
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
