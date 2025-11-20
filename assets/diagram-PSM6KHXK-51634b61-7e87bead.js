import { H as m, a7 as $5, a8 as B5, ak as R5, al as I5, a9 as D5, aa as F5, az as Xt, ay as lu, bQ as mm, ar as M5, M as R, ax as Lf, aK as bT, ah as Of, bR as X, a6 as gt } from "./app-33e0c163.js";
import { d } from "./chunk-QN33PNHL-94a673b4-131b49bb.js";
import { m as m$1 } from "./chunk-4BX2VUAB-fea36534-f9eeabfd.js";
import { Y as Yy } from "./mermaid-parser.core-6f66fbe8-f50f87bc.js";
import { n as nn } from "./defaultLocale-2db4a961-5e6dc2fe.js";
import { h } from "./ordinal-980380c7-3546a010.js";
import "./chakra-ui-1d60df8d.js";
import "./react-utils-0e8f4d03.js";
import "./_baseUniq-cfe137aa-75cabb2d.js";
import "./_basePickBy-9e57dae2-21bbebf4.js";
import "./monaco-45e206c0.js";
import "./vendor-75a482ef.js";
import "./common-utils-40e9b830.js";
import "./clone-66b7ef27-0fd17639.js";
import "./init-f9637058-7f0fc388.js";
function Le(t2) {
  var a = 0, r = t2.children, n = r && r.length;
  if (!n)
    a = 1;
  else
    for (; --n >= 0; )
      a += r[n].value;
  t2.value = a;
}
function $e() {
  return this.eachAfter(Le);
}
function ke(t2, a) {
  let r = -1;
  for (const n of this)
    t2.call(a, n, ++r, this);
  return this;
}
function Fe(t2, a) {
  for (var r = this, n = [r], s, o, p = -1; r = n.pop(); )
    if (t2.call(a, r, ++p, this), s = r.children)
      for (o = s.length - 1; o >= 0; --o)
        n.push(s[o]);
  return this;
}
function Ae(t2, a) {
  for (var r = this, n = [r], s = [], o, p, d2, m2 = -1; r = n.pop(); )
    if (s.push(r), o = r.children)
      for (p = 0, d2 = o.length; p < d2; ++p)
        n.push(o[p]);
  for (; r = s.pop(); )
    t2.call(a, r, ++m2, this);
  return this;
}
function Ne(t2, a) {
  let r = -1;
  for (const n of this)
    if (t2.call(a, n, ++r, this))
      return n;
}
function Me(t2) {
  return this.eachAfter(function(a) {
    for (var r = +t2(a.data) || 0, n = a.children, s = n && n.length; --s >= 0; )
      r += n[s].value;
    a.value = r;
  });
}
function _e(t2) {
  return this.eachBefore(function(a) {
    a.children && a.children.sort(t2);
  });
}
function ze(t2) {
  for (var a = this, r = De(a, t2), n = [a]; a !== r; )
    a = a.parent, n.push(a);
  for (var s = n.length; t2 !== r; )
    n.splice(s, 0, t2), t2 = t2.parent;
  return n;
}
function De(t2, a) {
  if (t2 === a)
    return t2;
  var r = t2.ancestors(), n = a.ancestors(), s = null;
  for (t2 = r.pop(), a = n.pop(); t2 === a; )
    s = t2, t2 = r.pop(), a = n.pop();
  return s;
}
function Ve() {
  for (var t2 = this, a = [t2]; t2 = t2.parent; )
    a.push(t2);
  return a;
}
function Pe() {
  return Array.from(this);
}
function Be() {
  var t2 = [];
  return this.eachBefore(function(a) {
    a.children || t2.push(a);
  }), t2;
}
function Ee() {
  var t2 = this, a = [];
  return t2.each(function(r) {
    r !== t2 && a.push({ source: r.parent, target: r });
  }), a;
}
function* Re() {
  var t2 = this, a, r = [t2], n, s, o;
  do
    for (a = r.reverse(), r = []; t2 = a.pop(); )
      if (yield t2, n = t2.children)
        for (s = 0, o = n.length; s < o; ++s)
          r.push(n[s]);
  while (r.length);
}
function Q(t2, a) {
  t2 instanceof Map ? (t2 = [void 0, t2], a === void 0 && (a = Ie)) : a === void 0 && (a = He);
  for (var r = new U(t2), n, s = [r], o, p, d2, m2; n = s.pop(); )
    if ((p = a(n.data)) && (m2 = (p = Array.from(p)).length))
      for (n.children = p, d2 = m2 - 1; d2 >= 0; --d2)
        s.push(o = p[d2] = new U(p[d2])), o.parent = n, o.depth = n.depth + 1;
  return r.eachBefore(Ge);
}
function We() {
  return Q(this).eachBefore(Oe);
}
function He(t2) {
  return t2.children;
}
function Ie(t2) {
  return Array.isArray(t2) ? t2[1] : null;
}
function Oe(t2) {
  t2.data.value !== void 0 && (t2.value = t2.data.value), t2.data = t2.data.data;
}
function Ge(t2) {
  var a = 0;
  do
    t2.height = a;
  while ((t2 = t2.parent) && t2.height < ++a);
}
function U(t2) {
  this.data = t2, this.depth = this.height = 0, this.parent = null;
}
U.prototype = Q.prototype = {
  constructor: U,
  count: $e,
  each: ke,
  eachAfter: Ae,
  eachBefore: Fe,
  find: Ne,
  sum: Me,
  sort: _e,
  path: ze,
  ancestors: Ve,
  descendants: Pe,
  leaves: Be,
  links: Ee,
  copy: We,
  [Symbol.iterator]: Re
};
function je(t2) {
  if (typeof t2 != "function")
    throw new Error();
  return t2;
}
function O() {
  return 0;
}
function G(t2) {
  return function() {
    return t2;
  };
}
function qe(t2) {
  t2.x0 = Math.round(t2.x0), t2.y0 = Math.round(t2.y0), t2.x1 = Math.round(t2.x1), t2.y1 = Math.round(t2.y1);
}
function Xe(t2, a, r, n, s) {
  for (var o = t2.children, p, d2 = -1, m2 = o.length, c = t2.value && (n - a) / t2.value; ++d2 < m2; )
    p = o[d2], p.y0 = r, p.y1 = s, p.x0 = a, p.x1 = a += p.value * c;
}
function Ye(t2, a, r, n, s) {
  for (var o = t2.children, p, d2 = -1, m2 = o.length, c = t2.value && (s - r) / t2.value; ++d2 < m2; )
    p = o[d2], p.x0 = a, p.x1 = n, p.y0 = r, p.y1 = r += p.value * c;
}
var Ue = (1 + Math.sqrt(5)) / 2;
function Ze(t2, a, r, n, s, o) {
  for (var p = [], d2 = a.children, m2, c, h2 = 0, b = 0, i = d2.length, x, S, v = a.value, u, g, M, A, D, E, _; h2 < i; ) {
    x = s - r, S = o - n;
    do
      u = d2[b++].value;
    while (!u && b < i);
    for (g = M = u, E = Math.max(S / x, x / S) / (v * t2), _ = u * u * E, D = Math.max(M / _, _ / g); b < i; ++b) {
      if (u += c = d2[b].value, c < g && (g = c), c > M && (M = c), _ = u * u * E, A = Math.max(M / _, _ / g), A > D) {
        u -= c;
        break;
      }
      D = A;
    }
    p.push(m2 = { value: u, dice: x < S, children: d2.slice(h2, b) }), m2.dice ? Xe(m2, r, n, s, v ? n += S * u / v : o) : Ye(m2, r, n, v ? r += x * u / v : s, o), v -= u, h2 = b;
  }
  return p;
}
const Je = function t(a) {
  function r(n, s, o, p, d2) {
    Ze(a, n, s, o, p, d2);
  }
  return r.ratio = function(n) {
    return t((n = +n) > 1 ? n : 1);
  }, r;
}(Ue);
function Ke() {
  var t2 = Je, a = false, r = 1, n = 1, s = [0], o = O, p = O, d2 = O, m2 = O, c = O;
  function h2(i) {
    return i.x0 = i.y0 = 0, i.x1 = r, i.y1 = n, i.eachBefore(b), s = [0], a && i.eachBefore(qe), i;
  }
  function b(i) {
    var x = s[i.depth], S = i.x0 + x, v = i.y0 + x, u = i.x1 - x, g = i.y1 - x;
    u < S && (S = u = (S + u) / 2), g < v && (v = g = (v + g) / 2), i.x0 = S, i.y0 = v, i.x1 = u, i.y1 = g, i.children && (x = s[i.depth + 1] = o(i) / 2, S += c(i) - x, v += p(i) - x, u -= d2(i) - x, g -= m2(i) - x, u < S && (S = u = (S + u) / 2), g < v && (v = g = (v + g) / 2), t2(i, S, v, u, g));
  }
  return h2.round = function(i) {
    return arguments.length ? (a = !!i, h2) : a;
  }, h2.size = function(i) {
    return arguments.length ? (r = +i[0], n = +i[1], h2) : [r, n];
  }, h2.tile = function(i) {
    return arguments.length ? (t2 = je(i), h2) : t2;
  }, h2.padding = function(i) {
    return arguments.length ? h2.paddingInner(i).paddingOuter(i) : h2.paddingInner();
  }, h2.paddingInner = function(i) {
    return arguments.length ? (o = typeof i == "function" ? i : G(+i), h2) : o;
  }, h2.paddingOuter = function(i) {
    return arguments.length ? h2.paddingTop(i).paddingRight(i).paddingBottom(i).paddingLeft(i) : h2.paddingTop();
  }, h2.paddingTop = function(i) {
    return arguments.length ? (p = typeof i == "function" ? i : G(+i), h2) : p;
  }, h2.paddingRight = function(i) {
    return arguments.length ? (d2 = typeof i == "function" ? i : G(+i), h2) : d2;
  }, h2.paddingBottom = function(i) {
    return arguments.length ? (m2 = typeof i == "function" ? i : G(+i), h2) : m2;
  }, h2.paddingLeft = function(i) {
    return arguments.length ? (c = typeof i == "function" ? i : G(+i), h2) : c;
  }, h2;
}
var q, ne = (q = class {
  constructor() {
    this.nodes = [], this.levels = /* @__PURE__ */ new Map(), this.outerNodes = [], this.classes = /* @__PURE__ */ new Map(), this.setAccTitle = $5, this.getAccTitle = B5, this.setDiagramTitle = R5, this.getDiagramTitle = I5, this.getAccDescription = D5, this.setAccDescription = F5;
  }
  getNodes() {
    return this.nodes;
  }
  getConfig() {
    const a = Lf, r = Xt();
    return lu({
      ...a.treemap,
      ...r.treemap ?? {}
    });
  }
  addNode(a, r) {
    this.nodes.push(a), this.levels.set(a, r), r === 0 && (this.outerNodes.push(a), this.root ?? (this.root = a));
  }
  getRoot() {
    return { name: "", children: this.outerNodes };
  }
  addClass(a, r) {
    const n = this.classes.get(a) ?? { id: a, styles: [], textStyles: [] }, s = r.replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    s && s.forEach((o) => {
      mm(o) && (n != null && n.textStyles ? n.textStyles.push(o) : n.textStyles = [o]), n != null && n.styles ? n.styles.push(o) : n.styles = [o];
    }), this.classes.set(a, n);
  }
  getClasses() {
    return this.classes;
  }
  getStylesForClass(a) {
    var r;
    return ((r = this.classes.get(a)) == null ? void 0 : r.styles) ?? [];
  }
  clear() {
    M5(), this.nodes = [], this.levels = /* @__PURE__ */ new Map(), this.outerNodes = [], this.classes = /* @__PURE__ */ new Map(), this.root = void 0;
  }
}, m(q, "TreeMapDB"), q);
function re(t2) {
  if (!t2.length)
    return [];
  const a = [], r = [];
  return t2.forEach((n) => {
    const s = {
      name: n.name,
      children: n.type === "Leaf" ? void 0 : []
    };
    for (s.classSelector = n == null ? void 0 : n.classSelector, n != null && n.cssCompiledStyles && (s.cssCompiledStyles = [n.cssCompiledStyles]), n.type === "Leaf" && n.value !== void 0 && (s.value = n.value); r.length > 0 && r[r.length - 1].level >= n.level; )
      r.pop();
    if (r.length === 0)
      a.push(s);
    else {
      const o = r[r.length - 1].node;
      o.children ? o.children.push(s) : o.children = [s];
    }
    n.type !== "Leaf" && r.push({ node: s, level: n.level });
  }), a;
}
m(re, "buildHierarchy");
var Qe = /* @__PURE__ */ m((t2, a) => {
  m$1(t2, a);
  const r = [];
  for (const o of t2.TreemapRows ?? [])
    o.$type === "ClassDefStatement" && a.addClass(o.className ?? "", o.styleText ?? "");
  for (const o of t2.TreemapRows ?? []) {
    const p = o.item;
    if (!p)
      continue;
    const d2 = o.indent ? parseInt(o.indent) : 0, m2 = et(p), c = p.classSelector ? a.getStylesForClass(p.classSelector) : [], h2 = c.length > 0 ? c.join(";") : void 0, b = {
      level: d2,
      name: m2,
      type: p.$type,
      value: p.value,
      classSelector: p.classSelector,
      cssCompiledStyles: h2
    };
    r.push(b);
  }
  const n = re(r), s = /* @__PURE__ */ m((o, p) => {
    for (const d2 of o)
      a.addNode(d2, p), d2.children && d2.children.length > 0 && s(d2.children, p + 1);
  }, "addNodesRecursively");
  s(n, 0);
}, "populate"), et = /* @__PURE__ */ m((t2) => t2.name ? String(t2.name) : "", "getItemName"), ie = {
  // @ts-expect-error - TreeMapDB is not assignable to DiagramDB
  parser: { yy: void 0 },
  parse: /* @__PURE__ */ m(async (t2) => {
    var a;
    try {
      const n = await Yy("treemap", t2);
      R.debug("Treemap AST:", n);
      const s = (a = ie.parser) == null ? void 0 : a.yy;
      if (!(s instanceof ne))
        throw new Error(
          "parser.parser?.yy was not a TreemapDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues."
        );
      Qe(n, s);
    } catch (r) {
      throw R.error("Error parsing treemap:", r), r;
    }
  }, "parse")
}, tt = 10, B = 10, j = 25, at = /* @__PURE__ */ m((t2, a, r, n) => {
  const s = n.db, o = s.getConfig(), p = o.padding ?? tt, d$1 = s.getDiagramTitle(), m$12 = s.getRoot(), { themeVariables: c } = Xt();
  if (!m$12)
    return;
  const h$1 = d$1 ? 30 : 0, b = bT(a), i = o.nodeWidth ? o.nodeWidth * B : 960, x = o.nodeHeight ? o.nodeHeight * B : 500, S = i, v = x + h$1;
  b.attr("viewBox", `0 0 ${S} ${v}`), Of(b, v, S, o.useMaxWidth);
  let u;
  try {
    const e = o.valueFormat || ",";
    if (e === "$0,0")
      u = /* @__PURE__ */ m((l) => "$" + nn(",")(l), "valueFormat");
    else if (e.startsWith("$") && e.includes(",")) {
      const l = /\.\d+/.exec(e), f = l ? l[0] : "";
      u = /* @__PURE__ */ m((T) => "$" + nn("," + f)(T), "valueFormat");
    } else if (e.startsWith("$")) {
      const l = e.substring(1);
      u = /* @__PURE__ */ m((f) => "$" + nn(l || "")(f), "valueFormat");
    } else
      u = nn(e);
  } catch (e) {
    R.error("Error creating format function:", e), u = nn(",");
  }
  const g = h().range([
    "transparent",
    c.cScale0,
    c.cScale1,
    c.cScale2,
    c.cScale3,
    c.cScale4,
    c.cScale5,
    c.cScale6,
    c.cScale7,
    c.cScale8,
    c.cScale9,
    c.cScale10,
    c.cScale11
  ]), M = h().range([
    "transparent",
    c.cScalePeer0,
    c.cScalePeer1,
    c.cScalePeer2,
    c.cScalePeer3,
    c.cScalePeer4,
    c.cScalePeer5,
    c.cScalePeer6,
    c.cScalePeer7,
    c.cScalePeer8,
    c.cScalePeer9,
    c.cScalePeer10,
    c.cScalePeer11
  ]), A = h().range([
    c.cScaleLabel0,
    c.cScaleLabel1,
    c.cScaleLabel2,
    c.cScaleLabel3,
    c.cScaleLabel4,
    c.cScaleLabel5,
    c.cScaleLabel6,
    c.cScaleLabel7,
    c.cScaleLabel8,
    c.cScaleLabel9,
    c.cScaleLabel10,
    c.cScaleLabel11
  ]);
  d$1 && b.append("text").attr("x", S / 2).attr("y", h$1 / 2).attr("class", "treemapTitle").attr("text-anchor", "middle").attr("dominant-baseline", "middle").text(d$1);
  const D = b.append("g").attr("transform", `translate(0, ${h$1})`).attr("class", "treemapContainer"), E = Q(m$12).sum((e) => e.value ?? 0).sort((e, l) => (l.value ?? 0) - (e.value ?? 0)), ee = Ke().size([i, x]).paddingTop(
    (e) => e.children && e.children.length > 0 ? j + B : 0
  ).paddingInner(p).paddingLeft((e) => e.children && e.children.length > 0 ? B : 0).paddingRight((e) => e.children && e.children.length > 0 ? B : 0).paddingBottom((e) => e.children && e.children.length > 0 ? B : 0).round(true)(E), oe = ee.descendants().filter((e) => e.children && e.children.length > 0), R$1 = D.selectAll(".treemapSection").data(oe).enter().append("g").attr("class", "treemapSection").attr("transform", (e) => `translate(${e.x0},${e.y0})`);
  R$1.append("rect").attr("width", (e) => e.x1 - e.x0).attr("height", j).attr("class", "treemapSectionHeader").attr("fill", "none").attr("fill-opacity", 0.6).attr("stroke-width", 0.6).attr("style", (e) => e.depth === 0 ? "display: none;" : ""), R$1.append("clipPath").attr("id", (e, l) => `clip-section-${a}-${l}`).append("rect").attr("width", (e) => Math.max(0, e.x1 - e.x0 - 12)).attr("height", j), R$1.append("rect").attr("width", (e) => e.x1 - e.x0).attr("height", (e) => e.y1 - e.y0).attr("class", (e, l) => `treemapSection section${l}`).attr("fill", (e) => g(e.data.name)).attr("fill-opacity", 0.6).attr("stroke", (e) => M(e.data.name)).attr("stroke-width", 2).attr("stroke-opacity", 0.4).attr("style", (e) => {
    if (e.depth === 0)
      return "display: none;";
    const l = X({ cssCompiledStyles: e.data.cssCompiledStyles });
    return l.nodeStyles + ";" + l.borderStyles.join(";");
  }), R$1.append("text").attr("class", "treemapSectionLabel").attr("x", 6).attr("y", j / 2).attr("dominant-baseline", "middle").text((e) => e.depth === 0 ? "" : e.data.name).attr("font-weight", "bold").attr("style", (e) => {
    if (e.depth === 0)
      return "display: none;";
    const l = "dominant-baseline: middle; font-size: 12px; fill:" + A(e.data.name) + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;", f = X({ cssCompiledStyles: e.data.cssCompiledStyles });
    return l + f.labelStyles.replace("color:", "fill:");
  }).each(function(e) {
    if (e.depth === 0)
      return;
    const l = gt(this), f = e.data.name;
    l.text(f);
    const T = e.x1 - e.x0, $ = 6;
    let k;
    if (o.showValues !== false && e.value) {
      const w = T - 10, L = 30, N = 10;
      k = w - L - N - $;
    } else
      k = T - $ - 6;
    const F = Math.max(15, k), y = l.node();
    if (y.getComputedTextLength() > F) {
      const w = "...";
      let L = f;
      for (; L.length > 0; ) {
        if (L = f.substring(0, L.length - 1), L.length === 0) {
          l.text(w), y.getComputedTextLength() > F && l.text("");
          break;
        }
        if (l.text(L + w), y.getComputedTextLength() <= F)
          break;
      }
    }
  }), o.showValues !== false && R$1.append("text").attr("class", "treemapSectionValue").attr("x", (e) => e.x1 - e.x0 - 10).attr("y", j / 2).attr("text-anchor", "end").attr("dominant-baseline", "middle").text((e) => e.value ? u(e.value) : "").attr("font-style", "italic").attr("style", (e) => {
    if (e.depth === 0)
      return "display: none;";
    const l = "text-anchor: end; dominant-baseline: middle; font-size: 10px; fill:" + A(e.data.name) + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;", f = X({ cssCompiledStyles: e.data.cssCompiledStyles });
    return l + f.labelStyles.replace("color:", "fill:");
  });
  const le = ee.leaves(), X$1 = D.selectAll(".treemapLeafGroup").data(le).enter().append("g").attr("class", (e, l) => `treemapNode treemapLeafGroup leaf${l}${e.data.classSelector ? ` ${e.data.classSelector}` : ""}x`).attr("transform", (e) => `translate(${e.x0},${e.y0})`);
  X$1.append("rect").attr("width", (e) => e.x1 - e.x0).attr("height", (e) => e.y1 - e.y0).attr("class", "treemapLeaf").attr("fill", (e) => e.parent ? g(e.parent.data.name) : g(e.data.name)).attr("style", (e) => X({ cssCompiledStyles: e.data.cssCompiledStyles }).nodeStyles).attr("fill-opacity", 0.3).attr("stroke", (e) => e.parent ? g(e.parent.data.name) : g(e.data.name)).attr("stroke-width", 3), X$1.append("clipPath").attr("id", (e, l) => `clip-${a}-${l}`).append("rect").attr("width", (e) => Math.max(0, e.x1 - e.x0 - 4)).attr("height", (e) => Math.max(0, e.y1 - e.y0 - 4)), X$1.append("text").attr("class", "treemapLabel").attr("x", (e) => (e.x1 - e.x0) / 2).attr("y", (e) => (e.y1 - e.y0) / 2).attr("style", (e) => {
    const l = "text-anchor: middle; dominant-baseline: middle; font-size: 38px;fill:" + A(e.data.name) + ";", f = X({ cssCompiledStyles: e.data.cssCompiledStyles });
    return l + f.labelStyles.replace("color:", "fill:");
  }).attr("clip-path", (e, l) => `url(#clip-${a}-${l})`).text((e) => e.data.name).each(function(e) {
    const l = gt(this), f = e.x1 - e.x0, T = e.y1 - e.y0, $ = l.node(), k = 4, V = f - 2 * k, F = T - 2 * k;
    if (V < 10 || F < 10) {
      l.style("display", "none");
      return;
    }
    let y = parseInt(l.style("font-size"), 10);
    const z = 8, w = 28, L = 0.6, N = 6, W = 2;
    for (; $.getComputedTextLength() > V && y > z; )
      y--, l.style("font-size", `${y}px`);
    let H = Math.max(
      N,
      Math.min(w, Math.round(y * L))
    ), Z = y + W + H;
    for (; Z > F && y > z && (y--, H = Math.max(
      N,
      Math.min(w, Math.round(y * L))
    ), !(H < N && y === z)); )
      l.style("font-size", `${y}px`), Z = y + W + H;
    l.style("font-size", `${y}px`), ($.getComputedTextLength() > V || y < z || F < y) && l.style("display", "none");
  }), o.showValues !== false && X$1.append("text").attr("class", "treemapValue").attr("x", (l) => (l.x1 - l.x0) / 2).attr("y", function(l) {
    return (l.y1 - l.y0) / 2;
  }).attr("style", (l) => {
    const f = "text-anchor: middle; dominant-baseline: hanging; font-size: 28px;fill:" + A(l.data.name) + ";", T = X({ cssCompiledStyles: l.data.cssCompiledStyles });
    return f + T.labelStyles.replace("color:", "fill:");
  }).attr("clip-path", (l, f) => `url(#clip-${a}-${f})`).text((l) => l.value ? u(l.value) : "").each(function(l) {
    const f = gt(this), T = this.parentNode;
    if (!T) {
      f.style("display", "none");
      return;
    }
    const $ = gt(T).select(".treemapLabel");
    if ($.empty() || $.style("display") === "none") {
      f.style("display", "none");
      return;
    }
    const k = parseFloat($.style("font-size")), V = 28, F = 0.6, y = 6, z = 2, w = Math.max(
      y,
      Math.min(V, Math.round(k * F))
    );
    f.style("font-size", `${w}px`);
    const N = (l.y1 - l.y0) / 2 + k / 2 + z;
    f.attr("y", N);
    const W = l.x1 - l.x0, ce = l.y1 - l.y0 - 4, pe = W - 2 * 4;
    f.node().getComputedTextLength() > pe || N + w > ce || w < y ? f.style("display", "none") : f.style("display", null);
  });
  const se = o.diagramPadding ?? 8;
  d(b, se, "flowchart", (o == null ? void 0 : o.useMaxWidth) || false);
}, "draw"), nt = /* @__PURE__ */ m(function(t2, a) {
  return a.db.getClasses();
}, "getClasses"), rt = { draw: at, getClasses: nt }, it = {
  sectionStrokeColor: "black",
  sectionStrokeWidth: "1",
  sectionFillColor: "#efefef",
  leafStrokeColor: "black",
  leafStrokeWidth: "1",
  leafFillColor: "#efefef",
  labelColor: "black",
  labelFontSize: "12px",
  valueFontSize: "10px",
  valueColor: "black",
  titleColor: "black",
  titleFontSize: "14px"
}, ot = /* @__PURE__ */ m(({
  treemap: t2
} = {}) => {
  const a = lu(it, t2);
  return `
  .treemapNode.section {
    stroke: ${a.sectionStrokeColor};
    stroke-width: ${a.sectionStrokeWidth};
    fill: ${a.sectionFillColor};
  }
  .treemapNode.leaf {
    stroke: ${a.leafStrokeColor};
    stroke-width: ${a.leafStrokeWidth};
    fill: ${a.leafFillColor};
  }
  .treemapLabel {
    fill: ${a.labelColor};
    font-size: ${a.labelFontSize};
  }
  .treemapValue {
    fill: ${a.valueColor};
    font-size: ${a.valueFontSize};
  }
  .treemapTitle {
    fill: ${a.titleColor};
    font-size: ${a.titleFontSize};
  }
  `;
}, "getStyles"), lt = ot, Wa = {
  parser: ie,
  get db() {
    return new ne();
  },
  renderer: rt,
  styles: lt
};
export {
  Wa as diagram
};
