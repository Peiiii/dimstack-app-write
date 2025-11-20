import { H as m, M as R, aK as bT, ah as Of, aL as kh } from "./app-c48027fd.js";
import { Y as Yy } from "./mermaid-parser.core-6f66fbe8-a6ea0164.js";
import "./chakra-ui-1d60df8d.js";
import "./react-utils-0e8f4d03.js";
import "./_baseUniq-cfe137aa-14cfd2a3.js";
import "./_basePickBy-9e57dae2-3ca9a685.js";
import "./monaco-45e206c0.js";
import "./vendor-75a482ef.js";
import "./common-utils-40e9b830.js";
import "./clone-66b7ef27-a8b22bb3.js";
var g = {
  parse: /* @__PURE__ */ m(async (r) => {
    const t = await Yy("info", r);
    R.debug(t);
  }, "parse")
}, v = {
  version: kh.version + ""
}, d = /* @__PURE__ */ m(() => v.version, "getVersion"), c = {
  getVersion: d
}, l = /* @__PURE__ */ m((r, t, m2) => {
  R.debug(`rendering info diagram
` + r);
  const i = bT(t);
  Of(i, 100, 400, true), i.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${m2}`);
}, "draw"), f = { draw: l }, Gr = {
  parser: g,
  db: c,
  renderer: f
};
export {
  Gr as diagram
};
