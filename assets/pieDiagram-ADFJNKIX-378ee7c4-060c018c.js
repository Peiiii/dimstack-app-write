import { ax as Lf, ak as R5, al as I5, a7 as $5, a8 as B5, aa as F5, a9 as D5, H as m, M as R, ar as M5, O as yt$1, ay as lu, aK as bT, aM as cs, ah as Of, aN as di, aO as DI, aP as aT } from "./app-325be324.js";
import { m as m$1 } from "./chunk-4BX2VUAB-fea36534-d9065520.js";
import { Y as Yy } from "./mermaid-parser.core-6f66fbe8-ae331462.js";
import { h as hn } from "./arc-8303a7b0-c5959eeb.js";
import { h } from "./ordinal-980380c7-3546a010.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./_baseUniq-cfe137aa-811428ad.js";
import "./_basePickBy-9e57dae2-bce83a6f.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
import "./clone-66b7ef27-21580ea0.js";
import "./init-f9637058-7f0fc388.js";
function lt(t, r) {
  return r < t ? -1 : r > t ? 1 : r >= t ? 0 : NaN;
}
function mt(t) {
  return t;
}
function ct() {
  var t = mt, r = lt, d = null, x = di(0), n = di(DI), p = di(0);
  function s(e) {
    var a, l = (e = aT(e)).length, m2, y, h2 = 0, c = new Array(l), o = new Array(l), v = +x.apply(this, arguments), w = Math.min(DI, Math.max(-DI, n.apply(this, arguments) - v)), f, C = Math.min(Math.abs(w) / l, p.apply(this, arguments)), $ = C * (w < 0 ? -1 : 1), g;
    for (a = 0; a < l; ++a)
      (g = o[c[a] = a] = +t(e[a], a, e)) > 0 && (h2 += g);
    for (r != null ? c.sort(function(A, D) {
      return r(o[A], o[D]);
    }) : d != null && c.sort(function(A, D) {
      return d(e[A], e[D]);
    }), a = 0, y = h2 ? (w - l * $) / h2 : 0; a < l; ++a, v = f)
      m2 = c[a], g = o[m2], f = v + (g > 0 ? g * y : 0) + $, o[m2] = {
        data: e[m2],
        index: a,
        value: g,
        startAngle: v,
        endAngle: f,
        padAngle: C
      };
    return o;
  }
  return s.value = function(e) {
    return arguments.length ? (t = typeof e == "function" ? e : di(+e), s) : t;
  }, s.sortValues = function(e) {
    return arguments.length ? (r = e, d = null, s) : r;
  }, s.sort = function(e) {
    return arguments.length ? (d = e, r = null, s) : d;
  }, s.startAngle = function(e) {
    return arguments.length ? (x = typeof e == "function" ? e : di(+e), s) : x;
  }, s.endAngle = function(e) {
    return arguments.length ? (n = typeof e == "function" ? e : di(+e), s) : n;
  }, s.padAngle = function(e) {
    return arguments.length ? (p = typeof e == "function" ? e : di(+e), s) : p;
  }, s;
}
var L = Lf.pie, G = {
  sections: /* @__PURE__ */ new Map(),
  showData: false,
  config: L
}, T = G.sections, N = G.showData, ut = structuredClone(L), gt = /* @__PURE__ */ m(() => structuredClone(ut), "getConfig"), dt = /* @__PURE__ */ m(() => {
  T = /* @__PURE__ */ new Map(), N = G.showData, M5();
}, "clear"), ft = /* @__PURE__ */ m(({ label: t, value: r }) => {
  if (r < 0)
    throw new Error(
      `"${t}" has invalid value: ${r}. Negative values are not allowed in pie charts. All slice values must be >= 0.`
    );
  T.has(t) || (T.set(t, r), R.debug(`added new section: ${t}, with value: ${r}`));
}, "addSection"), ht = /* @__PURE__ */ m(() => T, "getSections"), vt = /* @__PURE__ */ m((t) => {
  N = t;
}, "setShowData"), St = /* @__PURE__ */ m(() => N, "getShowData"), _ = {
  getConfig: gt,
  clear: dt,
  setDiagramTitle: R5,
  getDiagramTitle: I5,
  setAccTitle: $5,
  getAccTitle: B5,
  setAccDescription: F5,
  getAccDescription: D5,
  addSection: ft,
  getSections: ht,
  setShowData: vt,
  getShowData: St
}, xt = /* @__PURE__ */ m((t, r) => {
  m$1(t, r), r.setShowData(t.showData), t.sections.map(r.addSection);
}, "populateDb"), yt = {
  parse: /* @__PURE__ */ m(async (t) => {
    const r = await Yy("pie", t);
    R.debug(r), xt(r, _);
  }, "parse")
}, wt = /* @__PURE__ */ m((t) => `
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`, "getStyles"), At = wt, Dt = /* @__PURE__ */ m((t) => {
  const r = [...t.values()].reduce((n, p) => n + p, 0), d = [...t.entries()].map(([n, p]) => ({ label: n, value: p })).filter((n) => n.value / r * 100 >= 1).sort((n, p) => p.value - n.value);
  return ct().value((n) => n.value)(d);
}, "createPieArcs"), Ct = /* @__PURE__ */ m((t, r, d, x) => {
  R.debug(`rendering pie chart
` + t);
  const n = x.db, p = yt$1(), s = lu(n.getConfig(), p.pie), e = 40, a = 18, l = 4, m2 = 450, y = m2, h$1 = bT(r), c = h$1.append("g");
  c.attr("transform", "translate(" + y / 2 + "," + m2 / 2 + ")");
  const { themeVariables: o } = p;
  let [v] = cs(o.pieOuterStrokeWidth);
  v ?? (v = 2);
  const w = s.textPosition, f = Math.min(y, m2) / 2 - e, C = hn().innerRadius(0).outerRadius(f), $ = hn().innerRadius(f * w).outerRadius(f * w);
  c.append("circle").attr("cx", 0).attr("cy", 0).attr("r", f + v / 2).attr("class", "pieOuterCircle");
  const g = n.getSections(), A = Dt(g), D = [
    o.pie1,
    o.pie2,
    o.pie3,
    o.pie4,
    o.pie5,
    o.pie6,
    o.pie7,
    o.pie8,
    o.pie9,
    o.pie10,
    o.pie11,
    o.pie12
  ];
  let b = 0;
  g.forEach((i) => {
    b += i;
  });
  const P = A.filter((i) => (i.data.value / b * 100).toFixed(0) !== "0"), k = h(D);
  c.selectAll("mySlices").data(P).enter().append("path").attr("d", C).attr("fill", (i) => k(i.data.label)).attr("class", "pieCircle"), c.selectAll("mySlices").data(P).enter().append("text").text((i) => (i.data.value / b * 100).toFixed(0) + "%").attr("transform", (i) => "translate(" + $.centroid(i) + ")").style("text-anchor", "middle").attr("class", "slice"), c.append("text").text(n.getDiagramTitle()).attr("x", 0).attr("y", -(m2 - 50) / 2).attr("class", "pieTitleText");
  const W = [...g.entries()].map(([i, M]) => ({
    label: i,
    value: M
  })), E = c.selectAll(".legend").data(W).enter().append("g").attr("class", "legend").attr("transform", (i, M) => {
    const R2 = a + l, V = R2 * W.length / 2, U = 12 * a, j = M * R2 - V;
    return "translate(" + U + "," + j + ")";
  });
  E.append("rect").attr("width", a).attr("height", a).style("fill", (i) => k(i.label)).style("stroke", (i) => k(i.label)), E.append("text").attr("x", a + l).attr("y", a - l).text((i) => n.getShowData() ? `${i.label} [${i.value}]` : i.label);
  const B = Math.max(
    ...E.selectAll("text").nodes().map((i) => (i == null ? void 0 : i.getBoundingClientRect().width) ?? 0)
  ), O = y + e + a + l + B;
  h$1.attr("viewBox", `0 0 ${O} ${m2}`), Of(h$1, m2, O, s.useMaxWidth);
}, "draw"), $t = { draw: Ct }, rr = {
  parser: yt,
  db: _,
  renderer: $t,
  styles: At
};
export {
  rr as diagram
};
