import { B as Be, M as Me, U as Ue } from "./chunk-DI55MBZ5-1f8f1e84-20cc7fc4.js";
import { H as m, O as yt, a6 as gt, M as R$1, ah as Of, ad as Ii, aS as lT, b2 as qa, a_ as x5, aq as $e } from "./app-e6b7fe9d.js";
import { L as L$1 } from "./graph-0964e3a5-65d3090f.js";
import { h as ht } from "./layout-68acff99-d4efa446.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./_baseUniq-cfe137aa-1ec7b86a.js";
import "./_basePickBy-9e57dae2-b5abaae4.js";
import "./chunk-55IACEB6-b744bec0-8f6ea791.js";
import "./chunk-QN33PNHL-94a673b4-03d17604.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
var X = /* @__PURE__ */ m((e) => e.append("circle").attr("class", "start-state").attr("r", yt().state.sizeUnit).attr("cx", yt().state.padding + yt().state.sizeUnit).attr("cy", yt().state.padding + yt().state.sizeUnit), "drawStartState"), D = /* @__PURE__ */ m((e) => e.append("line").style("stroke", "grey").style("stroke-dasharray", "3").attr("x1", yt().state.textHeight).attr("class", "divider").attr("x2", yt().state.textHeight * 2).attr("y1", 0).attr("y2", 0), "drawDivider"), Y = /* @__PURE__ */ m((e, a) => {
  const s = e.append("text").attr("x", 2 * yt().state.padding).attr("y", yt().state.textHeight + 2 * yt().state.padding).attr("font-size", yt().state.fontSize).attr("class", "state-title").text(a.id), p = s.node().getBBox();
  return e.insert("rect", ":first-child").attr("x", yt().state.padding).attr("y", yt().state.padding).attr("width", p.width + 2 * yt().state.padding).attr("height", p.height + 2 * yt().state.padding).attr("rx", yt().state.radius), s;
}, "drawSimpleState"), I = /* @__PURE__ */ m((e, a) => {
  const s = /* @__PURE__ */ m(function(c, B, w) {
    const E = c.append("tspan").attr("x", 2 * yt().state.padding).text(B);
    w || E.attr("dy", yt().state.textHeight);
  }, "addTspan"), o = e.append("text").attr("x", 2 * yt().state.padding).attr("y", yt().state.textHeight + 1.3 * yt().state.padding).attr("font-size", yt().state.fontSize).attr("class", "state-title").text(a.descriptions[0]).node().getBBox(), g = o.height, m$1 = e.append("text").attr("x", yt().state.padding).attr(
    "y",
    g + yt().state.padding * 0.4 + yt().state.dividerMargin + yt().state.textHeight
  ).attr("class", "state-description");
  let i = true, n = true;
  a.descriptions.forEach(function(c) {
    i || (s(m$1, c, n), n = false), i = false;
  });
  const y = e.append("line").attr("x1", yt().state.padding).attr("y1", yt().state.padding + g + yt().state.dividerMargin / 2).attr("y2", yt().state.padding + g + yt().state.dividerMargin / 2).attr("class", "descr-divider"), h = m$1.node().getBBox(), d = Math.max(h.width, o.width);
  return y.attr("x2", d + 3 * yt().state.padding), e.insert("rect", ":first-child").attr("x", yt().state.padding).attr("y", yt().state.padding).attr("width", d + 2 * yt().state.padding).attr("height", h.height + g + 2 * yt().state.padding).attr("rx", yt().state.radius), e;
}, "drawDescrState"), $ = /* @__PURE__ */ m((e, a, s) => {
  const p = yt().state.padding, o = 2 * yt().state.padding, g = e.node().getBBox(), m2 = g.width, i = g.x, n = e.append("text").attr("x", 0).attr("y", yt().state.titleShift).attr("font-size", yt().state.fontSize).attr("class", "state-title").text(a.id), h = n.node().getBBox().width + o;
  let d = Math.max(h, m2);
  d === m2 && (d = d + o);
  let c;
  const B = e.node().getBBox();
  a.doc, c = i - p, h > m2 && (c = (m2 - d) / 2 + p), Math.abs(i - B.x) < p && h > m2 && (c = i - (h - m2) / 2);
  const w = 1 - yt().state.textHeight;
  return e.insert("rect", ":first-child").attr("x", c).attr("y", w).attr("class", s ? "alt-composit" : "composit").attr("width", d).attr(
    "height",
    B.height + yt().state.textHeight + yt().state.titleShift + 1
  ).attr("rx", "0"), n.attr("x", c + p), h <= m2 && n.attr("x", i + (d - o) / 2 - h / 2 + p), e.insert("rect", ":first-child").attr("x", c).attr(
    "y",
    yt().state.titleShift - yt().state.textHeight - yt().state.padding
  ).attr("width", d).attr("height", yt().state.textHeight * 3).attr("rx", yt().state.radius), e.insert("rect", ":first-child").attr("x", c).attr(
    "y",
    yt().state.titleShift - yt().state.textHeight - yt().state.padding
  ).attr("width", d).attr("height", B.height + 3 + 2 * yt().state.textHeight).attr("rx", yt().state.radius), e;
}, "addTitleAndBox"), j = /* @__PURE__ */ m((e) => (e.append("circle").attr("class", "end-state-outer").attr("r", yt().state.sizeUnit + yt().state.miniPadding).attr(
  "cx",
  yt().state.padding + yt().state.sizeUnit + yt().state.miniPadding
).attr(
  "cy",
  yt().state.padding + yt().state.sizeUnit + yt().state.miniPadding
), e.append("circle").attr("class", "end-state-inner").attr("r", yt().state.sizeUnit).attr("cx", yt().state.padding + yt().state.sizeUnit + 2).attr("cy", yt().state.padding + yt().state.sizeUnit + 2)), "drawEndState"), q = /* @__PURE__ */ m((e, a) => {
  let s = yt().state.forkWidth, p = yt().state.forkHeight;
  if (a.parentId) {
    let o = s;
    s = p, p = o;
  }
  return e.append("rect").style("stroke", "black").style("fill", "black").attr("width", s).attr("height", p).attr("x", yt().state.padding).attr("y", yt().state.padding);
}, "drawForkJoinState"), Z = /* @__PURE__ */ m((e, a, s, p) => {
  let o = 0;
  const g = p.append("text");
  g.style("text-anchor", "start"), g.attr("class", "noteText");
  let m2 = e.replace(/\r\n/g, "<br/>");
  m2 = m2.replace(/\n/g, "<br/>");
  const i = m2.split(Ii.lineBreakRegex);
  let n = 1.25 * yt().state.noteMargin;
  for (const y of i) {
    const h = y.trim();
    if (h.length > 0) {
      const d = g.append("tspan");
      if (d.text(h), n === 0) {
        const c = d.node().getBBox();
        n += c.height;
      }
      o += n, d.attr("x", a + yt().state.noteMargin), d.attr("y", s + o + 1.25 * yt().state.noteMargin);
    }
  }
  return { textWidth: g.node().getBBox().width, textHeight: o };
}, "_drawLongText"), K = /* @__PURE__ */ m((e, a) => {
  a.attr("class", "state-note");
  const s = a.append("rect").attr("x", 0).attr("y", yt().state.padding), p = a.append("g"), { textWidth: o, textHeight: g } = Z(e, 0, 0, p);
  return s.attr("height", g + 2 * yt().state.noteMargin), s.attr("width", o + yt().state.noteMargin * 2), s;
}, "drawNote"), L = /* @__PURE__ */ m(function(e, a) {
  const s = a.id, p = {
    id: s,
    label: a.id,
    width: 0,
    height: 0
  }, o = e.append("g").attr("id", s).attr("class", "stateGroup");
  a.type === "start" && X(o), a.type === "end" && j(o), (a.type === "fork" || a.type === "join") && q(o, a), a.type === "note" && K(a.note.text, o), a.type === "divider" && D(o), a.type === "default" && a.descriptions.length === 0 && Y(o, a), a.type === "default" && a.descriptions.length > 0 && I(o, a);
  const g = o.node().getBBox();
  return p.width = g.width + 2 * yt().state.padding, p.height = g.height + 2 * yt().state.padding, p;
}, "drawState"), R = 0, Q = /* @__PURE__ */ m(function(e, a, s) {
  const p = /* @__PURE__ */ m(function(n) {
    switch (n) {
      case Me.relationType.AGGREGATION:
        return "aggregation";
      case Me.relationType.EXTENSION:
        return "extension";
      case Me.relationType.COMPOSITION:
        return "composition";
      case Me.relationType.DEPENDENCY:
        return "dependency";
    }
  }, "getRelationType");
  a.points = a.points.filter((n) => !Number.isNaN(n.y));
  const o = a.points, g = lT().x(function(n) {
    return n.x;
  }).y(function(n) {
    return n.y;
  }).curve(qa), m$1 = e.append("path").attr("d", g(o)).attr("id", "edge" + R).attr("class", "transition");
  let i = "";
  if (yt().state.arrowMarkerAbsolute && (i = x5(true)), m$1.attr(
    "marker-end",
    "url(" + i + "#" + p(Me.relationType.DEPENDENCY) + "End)"
  ), s.title !== void 0) {
    const n = e.append("g").attr("class", "stateLabel"), { x: y, y: h } = $e.calcLabelPosition(a.points), d = Ii.getRows(s.title);
    let c = 0;
    const B = [];
    let w = 0, E = 0;
    for (let x = 0; x <= d.length; x++) {
      const l = n.append("text").attr("text-anchor", "middle").text(d[x]).attr("x", y).attr("y", h + c), f = l.node().getBBox();
      w = Math.max(w, f.width), E = Math.min(E, f.x), R$1.info(f.x, y, h + c), c === 0 && (c = l.node().getBBox().height, R$1.info("Title height", c, h)), B.push(l);
    }
    let k = c * d.length;
    if (d.length > 1) {
      const x = (d.length - 1) * c * 0.5;
      B.forEach((l, f) => l.attr("y", h + f * c - x)), k = c * d.length;
    }
    const r = n.node().getBBox();
    n.insert("rect", ":first-child").attr("class", "box").attr("x", y - w / 2 - yt().state.padding / 2).attr("y", h - k / 2 - yt().state.padding / 2 - 3.5).attr("width", w + yt().state.padding).attr("height", k + yt().state.padding), R$1.info(r);
  }
  R++;
}, "drawEdge"), b, T = {}, V = /* @__PURE__ */ m(function() {
}, "setConf"), tt = /* @__PURE__ */ m(function(e) {
  e.append("defs").append("marker").attr("id", "dependencyEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "insertMarkers"), et = /* @__PURE__ */ m(function(e, a, s, p) {
  b = yt().state;
  const o = yt().securityLevel;
  let g;
  o === "sandbox" && (g = gt("#i" + a));
  const m2 = o === "sandbox" ? gt(g.nodes()[0].contentDocument.body) : gt("body"), i = o === "sandbox" ? g.nodes()[0].contentDocument : document;
  R$1.debug("Rendering diagram " + e);
  const n = m2.select(`[id='${a}']`);
  tt(n);
  const y = p.db.getRootDoc();
  A(y, n, void 0, false, m2, i, p);
  const h = b.padding, d = n.node().getBBox(), c = d.width + h * 2, B = d.height + h * 2, w = c * 1.75;
  Of(n, B, w, b.useMaxWidth), n.attr(
    "viewBox",
    `${d.x - b.padding}  ${d.y - b.padding} ` + c + " " + B
  );
}, "draw"), it = /* @__PURE__ */ m((e) => e ? e.length * b.fontSizeFactor : 1, "getLabelWidth"), A = /* @__PURE__ */ m((e, a, s, p, o, g, m2) => {
  const i = new L$1({
    compound: true,
    multigraph: true
  });
  let n, y = true;
  for (n = 0; n < e.length; n++)
    if (e[n].stmt === "relation") {
      y = false;
      break;
    }
  s ? i.setGraph({
    rankdir: "LR",
    multigraph: true,
    compound: true,
    // acyclicer: 'greedy',
    ranker: "tight-tree",
    ranksep: y ? 1 : b.edgeLengthFactor,
    nodeSep: y ? 1 : 50,
    isMultiGraph: true
    // ranksep: 5,
    // nodesep: 1
  }) : i.setGraph({
    rankdir: "TB",
    multigraph: true,
    compound: true,
    // isCompound: true,
    // acyclicer: 'greedy',
    // ranker: 'longest-path'
    ranksep: y ? 1 : b.edgeLengthFactor,
    nodeSep: y ? 1 : 50,
    ranker: "tight-tree",
    // ranker: 'network-simplex'
    isMultiGraph: true
  }), i.setDefaultEdgeLabel(function() {
    return {};
  });
  const h = m2.db.getStates(), d = m2.db.getRelations(), c = Object.keys(h);
  for (const r of c) {
    const x = h[r];
    s && (x.parentId = s);
    let l;
    if (x.doc) {
      let f = a.append("g").attr("id", x.id).attr("class", "stateGroup");
      l = A(x.doc, f, x.id, !p, o, g, m2);
      {
        f = $(f, x, p);
        let v = f.node().getBBox();
        l.width = v.width, l.height = v.height + b.padding / 2, T[x.id] = { y: b.compositTitleSize };
      }
    } else
      l = L(a, x, i);
    if (x.note) {
      const f = {
        descriptions: [],
        id: x.id + "-note",
        note: x.note,
        type: "note"
      }, v = L(a, f, i);
      x.note.position === "left of" ? (i.setNode(l.id + "-note", v), i.setNode(l.id, l)) : (i.setNode(l.id, l), i.setNode(l.id + "-note", v)), i.setParent(l.id, l.id + "-group"), i.setParent(l.id + "-note", l.id + "-group");
    } else
      i.setNode(l.id, l);
  }
  R$1.debug("Count=", i.nodeCount(), i);
  let B = 0;
  d.forEach(function(r) {
    B++, R$1.debug("Setting edge", r), i.setEdge(
      r.id1,
      r.id2,
      {
        relation: r,
        width: it(r.title),
        height: b.labelHeight * Ii.getRows(r.title).length,
        labelpos: "c"
      },
      "id" + B
    );
  }), ht(i), R$1.debug("Graph after layout", i.nodes());
  const w = a.node();
  i.nodes().forEach(function(r) {
    r !== void 0 && i.node(r) !== void 0 ? (R$1.warn("Node " + r + ": " + JSON.stringify(i.node(r))), o.select("#" + w.id + " #" + r).attr(
      "transform",
      "translate(" + (i.node(r).x - i.node(r).width / 2) + "," + (i.node(r).y + (T[r] ? T[r].y : 0) - i.node(r).height / 2) + " )"
    ), o.select("#" + w.id + " #" + r).attr("data-x-shift", i.node(r).x - i.node(r).width / 2), g.querySelectorAll("#" + w.id + " #" + r + " .divider").forEach((l) => {
      const f = l.parentElement;
      let v = 0, M = 0;
      f && (f.parentElement && (v = f.parentElement.getBBox().width), M = parseInt(f.getAttribute("data-x-shift"), 10), Number.isNaN(M) && (M = 0)), l.setAttribute("x1", 0 - M + 8), l.setAttribute("x2", v - M - 8);
    })) : R$1.debug("No Node " + r + ": " + JSON.stringify(i.node(r)));
  });
  let E = w.getBBox();
  i.edges().forEach(function(r) {
    r !== void 0 && i.edge(r) !== void 0 && (R$1.debug("Edge " + r.v + " -> " + r.w + ": " + JSON.stringify(i.edge(r))), Q(a, i.edge(r), i.edge(r).relation));
  }), E = w.getBBox();
  const k = {
    id: s || "root",
    label: s || "root",
    width: 0,
    height: 0
  };
  return k.width = E.width + 2 * b.padding, k.height = E.height + 2 * b.padding, R$1.debug("Doc rendered", k, i), k;
}, "renderDoc"), at = {
  setConf: V,
  draw: et
}, Ae = {
  parser: Be,
  get db() {
    return new Me(1);
  },
  renderer: at,
  styles: Ue,
  init: /* @__PURE__ */ m((e) => {
    e.state || (e.state = {}), e.state.arrowMarkerAbsolute = e.arrowMarkerAbsolute;
  }, "init")
};
export {
  Ae as diagram
};
