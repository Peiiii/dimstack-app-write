import { p as parser$1, f as flowDb } from "./flowDb-956e92f1-a8a6ca42.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c10674c1-cadcc430.js";
import { v as setConfig } from "./index-a80a752f.js";
import "./app-c48027fd.js";
import "./graph-96327a76.js";
import "./layout-1886a76d.js";
import "./index-3862675e-faaecb11.js";
import "./clone-cb6cef5d.js";
import "./edges-e0da2a9e-59e84e83.js";
import "./createText-2e5e7dd3-a1f5bd25.js";
import "./line-b87426b7.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-3cd47841.js";
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
