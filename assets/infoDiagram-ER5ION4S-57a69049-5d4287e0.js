import { H as m, M as R, aK as bT, ah as Of, aL as kh } from "./app-e6b7fe9d.js";
import { Y as Yy } from "./mermaid-parser.core-6f66fbe8-f2925e8f.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./_baseUniq-cfe137aa-1ec7b86a.js";
import "./_basePickBy-9e57dae2-b5abaae4.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
import "./clone-66b7ef27-cf08d957.js";
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
