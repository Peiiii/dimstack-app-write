import { H as m, Q as Q$, $ as $I, J as FI, M as MI, K as R$1, O as yt, U as K, V as LI, W as Nb, Y as E$, Z as Kc, a0 as BI, a1 as s$, a2 as D$, a3 as M$ } from "./app-254b8ee7.js";
import { L } from "./graph-fd011b0f-31248908.js";
import { h as ht } from "./layout-04cbe2d6-dd4c99e7.js";
import { D as Dt } from "./_baseUniq-2d28b45b-f0e7bb2a.js";
import { a } from "./clone-0336aba4-5f40fa91.js";
import { o as on } from "./_basePickBy-4aa50cae-dee3d51d.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
function E(e) {
  var n = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: ee(e),
    edges: te(e)
  };
  return Dt(e.graph()) || (n.value = a(e.graph())), n;
}
function ee(e) {
  return on(e.nodes(), function(n) {
    var t = e.node(n), s = e.parent(n), c = { v: n };
    return Dt(t) || (c.value = t), Dt(s) || (c.parent = s), c;
  });
}
function te(e) {
  return on(e.edges(), function(n) {
    var t = e.edge(n), s = { v: n.v, w: n.w };
    return Dt(n.name) || (s.name = n.name), Dt(t) || (s.value = t), s;
  });
}
var f = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Map(), ne = /* @__PURE__ */ m(() => {
  b.clear(), J.clear(), f.clear();
}, "clear"), O = /* @__PURE__ */ m((e, n) => {
  const t = b.get(n) || [];
  return R$1.trace("In isDescendant", n, " ", e, " = ", t.includes(e)), t.includes(e);
}, "isDescendant"), ie = /* @__PURE__ */ m((e, n) => {
  const t = b.get(n) || [];
  return R$1.info("Descendants of ", n, " is ", t), R$1.info("Edge is ", e), e.v === n || e.w === n ? false : t ? t.includes(e.v) || O(e.v, n) || O(e.w, n) || t.includes(e.w) : (R$1.debug("Tilt, ", n, ",not in descendants"), false);
}, "edgeInCluster"), G = /* @__PURE__ */ m((e, n, t, s) => {
  R$1.warn(
    "Copying children of ",
    e,
    "root",
    s,
    "data",
    n.node(e),
    s
  );
  const c = n.children(e) || [];
  e !== s && c.push(e), R$1.warn("Copying (nodes) clusterId", e, "nodes", c), c.forEach((a2) => {
    if (n.children(a2).length > 0)
      G(a2, n, t, s);
    else {
      const o = n.node(a2);
      R$1.info("cp ", a2, " to ", s, " with parent ", e), t.setNode(a2, o), s !== n.parent(a2) && (R$1.warn("Setting parent", a2, n.parent(a2)), t.setParent(a2, n.parent(a2))), e !== s && a2 !== e ? (R$1.debug("Setting parent", a2, e), t.setParent(a2, e)) : (R$1.info("In copy ", e, "root", s, "data", n.node(e), s), R$1.debug(
        "Not Setting parent for node=",
        a2,
        "cluster!==rootId",
        e !== s,
        "node!==clusterId",
        a2 !== e
      ));
      const m2 = n.edges(a2);
      R$1.debug("Copying Edges", m2), m2.forEach((l) => {
        R$1.info("Edge", l);
        const h = n.edge(l.v, l.w, l.name);
        R$1.info("Edge data", h, s);
        try {
          ie(l, s) ? (R$1.info("Copying as ", l.v, l.w, h, l.name), t.setEdge(l.v, l.w, h, l.name), R$1.info("newGraph edges ", t.edges(), t.edge(t.edges()[0]))) : R$1.info(
            "Skipping copy of edge ",
            l.v,
            "-->",
            l.w,
            " rootId: ",
            s,
            " clusterId:",
            e
          );
        } catch (C) {
          R$1.error(C);
        }
      });
    }
    R$1.debug("Removing node", a2), n.removeNode(a2);
  });
}, "copy"), R = /* @__PURE__ */ m((e, n) => {
  const t = n.children(e);
  let s = [...t];
  for (const c of t)
    J.set(c, e), s = [...s, ...R(c, n)];
  return s;
}, "extractDescendants"), re = /* @__PURE__ */ m((e, n, t) => {
  const s = e.edges().filter((l) => l.v === n || l.w === n), c = e.edges().filter((l) => l.v === t || l.w === t), a2 = s.map((l) => ({ v: l.v === n ? t : l.v, w: l.w === n ? n : l.w })), o = c.map((l) => ({ v: l.v, w: l.w }));
  return a2.filter((l) => o.some((h) => l.v === h.v && l.w === h.w));
}, "findCommonEdges"), D = /* @__PURE__ */ m((e, n, t) => {
  const s = n.children(e);
  if (R$1.trace("Searching children of id ", e, s), s.length < 1)
    return e;
  let c;
  for (const a2 of s) {
    const o = D(a2, n, t), m2 = re(n, t, o);
    if (o)
      if (m2.length > 0)
        c = o;
      else
        return o;
  }
  return c;
}, "findNonClusterChild"), k = /* @__PURE__ */ m((e) => !f.has(e) || !f.get(e).externalConnections ? e : f.has(e) ? f.get(e).id : e, "getAnchorId"), oe = /* @__PURE__ */ m((e, n) => {
  if (!e || n > 10) {
    R$1.debug("Opting out, no graph ");
    return;
  } else
    R$1.debug("Opting in, graph ");
  e.nodes().forEach(function(t) {
    e.children(t).length > 0 && (R$1.warn(
      "Cluster identified",
      t,
      " Replacement id in edges: ",
      D(t, e, t)
    ), b.set(t, R(t, e)), f.set(t, { id: D(t, e, t), clusterData: e.node(t) }));
  }), e.nodes().forEach(function(t) {
    const s = e.children(t), c = e.edges();
    s.length > 0 ? (R$1.debug("Cluster identified", t, b), c.forEach((a2) => {
      const o = O(a2.v, t), m2 = O(a2.w, t);
      o ^ m2 && (R$1.warn("Edge: ", a2, " leaves cluster ", t), R$1.warn("Descendants of XXX ", t, ": ", b.get(t)), f.get(t).externalConnections = true);
    })) : R$1.debug("Not a cluster ", t, b);
  });
  for (let t of f.keys()) {
    const s = f.get(t).id, c = e.parent(s);
    c !== t && f.has(c) && !f.get(c).externalConnections && (f.get(t).id = c);
  }
  e.edges().forEach(function(t) {
    const s = e.edge(t);
    R$1.warn("Edge " + t.v + " -> " + t.w + ": " + JSON.stringify(t)), R$1.warn("Edge " + t.v + " -> " + t.w + ": " + JSON.stringify(e.edge(t)));
    let c = t.v, a2 = t.w;
    if (R$1.warn(
      "Fix XXX",
      f,
      "ids:",
      t.v,
      t.w,
      "Translating: ",
      f.get(t.v),
      " --- ",
      f.get(t.w)
    ), f.get(t.v) || f.get(t.w)) {
      if (R$1.warn("Fixing and trying - removing XXX", t.v, t.w, t.name), c = k(t.v), a2 = k(t.w), e.removeEdge(t.v, t.w, t.name), c !== t.v) {
        const o = e.parent(c);
        f.get(o).externalConnections = true, s.fromCluster = t.v;
      }
      if (a2 !== t.w) {
        const o = e.parent(a2);
        f.get(o).externalConnections = true, s.toCluster = t.w;
      }
      R$1.warn("Fix Replacing with XXX", c, a2, t.name), e.setEdge(c, a2, s, t.name);
    }
  }), R$1.warn("Adjusted Graph", E(e)), T(e, 0), R$1.trace(f);
}, "adjustClustersAndEdges"), T = /* @__PURE__ */ m((e, n) => {
  var c, a2;
  if (R$1.warn("extractor - ", n, E(e), e.children("D")), n > 10) {
    R$1.error("Bailing out");
    return;
  }
  let t = e.nodes(), s = false;
  for (const o of t) {
    const m2 = e.children(o);
    s = s || m2.length > 0;
  }
  if (!s) {
    R$1.debug("Done, no node has children", e.nodes());
    return;
  }
  R$1.debug("Nodes = ", t, n);
  for (const o of t)
    if (R$1.debug(
      "Extracting node",
      o,
      f,
      f.has(o) && !f.get(o).externalConnections,
      !e.parent(o),
      e.node(o),
      e.children("D"),
      " Depth ",
      n
    ), !f.has(o))
      R$1.debug("Not a cluster", o, n);
    else if (!f.get(o).externalConnections && e.children(o) && e.children(o).length > 0) {
      R$1.warn(
        "Cluster without external connections, without a parent and with children",
        o,
        n
      );
      let l = e.graph().rankdir === "TB" ? "LR" : "TB";
      (a2 = (c = f.get(o)) == null ? void 0 : c.clusterData) != null && a2.dir && (l = f.get(o).clusterData.dir, R$1.warn("Fixing dir", f.get(o).clusterData.dir, l));
      const h = new L({
        multigraph: true,
        compound: true
      }).setGraph({
        rankdir: l,
        nodesep: 50,
        ranksep: 50,
        marginx: 8,
        marginy: 8
      }).setDefaultEdgeLabel(function() {
        return {};
      });
      R$1.warn("Old graph before copy", E(e)), G(o, e, h, o), e.setNode(o, {
        clusterNode: true,
        id: o,
        clusterData: f.get(o).clusterData,
        label: f.get(o).label,
        graph: h
      }), R$1.warn("New graph after copy node: (", o, ")", E(h)), R$1.debug("Old graph after copy", E(e));
    } else
      R$1.warn(
        "Cluster ** ",
        o,
        " **not meeting the criteria !externalConnections:",
        !f.get(o).externalConnections,
        " no parent: ",
        !e.parent(o),
        " children ",
        e.children(o) && e.children(o).length > 0,
        e.children("D"),
        n
      ), R$1.debug(f);
  t = e.nodes(), R$1.warn("New list of nodes", t);
  for (const o of t) {
    const m2 = e.node(o);
    R$1.warn(" Now next level", o, m2), m2 != null && m2.clusterNode && T(m2.graph, n + 1);
  }
}, "extractor"), M = /* @__PURE__ */ m((e, n) => {
  if (n.length === 0)
    return [];
  let t = Object.assign([], n);
  return n.forEach((s) => {
    const c = e.children(s), a2 = M(e, c);
    t = [...t, ...a2];
  }), t;
}, "sorter"), se = /* @__PURE__ */ m((e) => M(e, e.children()), "sortNodesByHierarchy"), j = /* @__PURE__ */ m(async (e, n, t, s, c, a2) => {
  R$1.warn("Graph in recursive render:XAX", E(n), c);
  const o = n.graph().rankdir;
  R$1.trace("Dir in recursive render - dir:", o);
  const m$1 = e.insert("g").attr("class", "root");
  n.nodes() ? R$1.info("Recursive render XXX", n.nodes()) : R$1.info("No nodes found for", n), n.edges().length > 0 && R$1.info("Recursive edges", n.edge(n.edges()[0]));
  const l = m$1.insert("g").attr("class", "clusters"), h = m$1.insert("g").attr("class", "edgePaths"), C = m$1.insert("g").attr("class", "edgeLabels"), u = m$1.insert("g").attr("class", "nodes");
  await Promise.all(
    n.nodes().map(async function(d) {
      const i = n.node(d);
      if (c !== void 0) {
        const p = JSON.parse(JSON.stringify(c.clusterData));
        R$1.trace(
          `Setting data for parent cluster XXX
 Node.id = `,
          d,
          `
 data=`,
          p.height,
          `
Parent cluster`,
          c.height
        ), n.setNode(c.id, p), n.parent(d) || (R$1.trace("Setting parent", d, c.id), n.setParent(d, c.id, p));
      }
      if (R$1.info("(Insert) Node XXX" + d + ": " + JSON.stringify(n.node(d))), i != null && i.clusterNode) {
        R$1.info("Cluster identified XBX", d, i.width, n.node(d));
        const { ranksep: p, nodesep: g } = n.graph();
        i.graph.setGraph({
          ...i.graph.graph(),
          ranksep: p + 25,
          nodesep: g
        });
        const N = await j(
          u,
          i.graph,
          t,
          s,
          n.node(d),
          a2
        ), S = N.elem;
        K(i, S), i.diff = N.diff || 0, R$1.info(
          "New compound node after recursive render XAX",
          d,
          "width",
          // node,
          i.width,
          "height",
          i.height
          // node.x,
          // node.y
        ), LI(S, i);
      } else
        n.children(d).length > 0 ? (R$1.trace(
          "Cluster - the non recursive path XBX",
          d,
          i.id,
          i,
          i.width,
          "Graph:",
          n
        ), R$1.trace(D(i.id, n)), f.set(i.id, { id: D(i.id, n), node: i })) : (R$1.trace("Node - the non recursive path XAX", d, u, n.node(d), o), await Nb(u, n.node(d), { config: a2, dir: o }));
    })
  ), await (/* @__PURE__ */ m(async () => {
    const d = n.edges().map(async function(i) {
      const p = n.edge(i.v, i.w, i.name);
      R$1.info("Edge " + i.v + " -> " + i.w + ": " + JSON.stringify(i)), R$1.info("Edge " + i.v + " -> " + i.w + ": ", i, " ", JSON.stringify(n.edge(i))), R$1.info(
        "Fix",
        f,
        "ids:",
        i.v,
        i.w,
        "Translating: ",
        f.get(i.v),
        f.get(i.w)
      ), await E$(C, p);
    });
    await Promise.all(d);
  }, "processEdges"))(), R$1.info("Graph before layout:", JSON.stringify(E(n))), R$1.info("############################################# XXX"), R$1.info("###                Layout                 ### XXX"), R$1.info("############################################# XXX"), ht(n), R$1.info("Graph after layout:", JSON.stringify(E(n)));
  let y = 0, { subGraphTitleTotalMargin: X } = Kc(a2);
  return await Promise.all(
    se(n).map(async function(d) {
      var p;
      const i = n.node(d);
      if (R$1.info(
        "Position XBX => " + d + ": (" + i.x,
        "," + i.y,
        ") width: ",
        i.width,
        " height: ",
        i.height
      ), i != null && i.clusterNode)
        i.y += X, R$1.info(
          "A tainted cluster node XBX1",
          d,
          i.id,
          i.width,
          i.height,
          i.x,
          i.y,
          n.parent(d)
        ), f.get(i.id).node = i, BI(i);
      else if (n.children(d).length > 0) {
        R$1.info(
          "A pure cluster node XBX1",
          d,
          i.id,
          i.x,
          i.y,
          i.width,
          i.height,
          n.parent(d)
        ), i.height += X, n.node(i.parentId);
        const g = (i == null ? void 0 : i.padding) / 2 || 0, N = ((p = i == null ? void 0 : i.labelBBox) == null ? void 0 : p.height) || 0, S = N - g || 0;
        R$1.debug("OffsetY", S, "labelHeight", N, "halfPadding", g), await s$(l, i), f.get(i.id).node = i;
      } else {
        const g = n.node(i.parentId);
        i.y += X / 2, R$1.info(
          "A regular node XBX1 - using the padding",
          i.id,
          "parent",
          i.parentId,
          i.width,
          i.height,
          i.x,
          i.y,
          "offsetY",
          i.offsetY,
          "parent",
          g,
          g == null ? void 0 : g.offsetY,
          i
        ), BI(i);
      }
    })
  ), n.edges().forEach(function(d) {
    const i = n.edge(d);
    R$1.info("Edge " + d.v + " -> " + d.w + ": " + JSON.stringify(i), i), i.points.forEach((S) => S.y += X / 2);
    const p = n.node(d.v);
    var g = n.node(d.w);
    const N = D$(h, i, f, t, p, g, s);
    M$(i, N);
  }), n.nodes().forEach(function(d) {
    const i = n.node(d);
    R$1.info(d, i.type, i.diff), i.isGroup && (y = i.diff);
  }), R$1.warn("Returning from recursive render XAX", m$1, y), { elem: m$1, diff: y };
}, "recursiveRender"), Gt = /* @__PURE__ */ m(async (e, n) => {
  var a2, o, m2, l, h, C;
  const t = new L({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: e.direction,
    nodesep: ((a2 = e.config) == null ? void 0 : a2.nodeSpacing) || ((m2 = (o = e.config) == null ? void 0 : o.flowchart) == null ? void 0 : m2.nodeSpacing) || e.nodeSpacing,
    ranksep: ((l = e.config) == null ? void 0 : l.rankSpacing) || ((C = (h = e.config) == null ? void 0 : h.flowchart) == null ? void 0 : C.rankSpacing) || e.rankSpacing,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  }), s = n.select("g");
  Q$(s, e.markers, e.type, e.diagramId), $I(), FI(), MI(), ne(), e.nodes.forEach((u) => {
    t.setNode(u.id, { ...u }), u.parentId && t.setParent(u.id, u.parentId);
  }), R$1.debug("Edges:", e.edges), e.edges.forEach((u) => {
    if (u.start === u.end) {
      const w = u.start, y = w + "---" + w + "---1", X = w + "---" + w + "---2", d = t.node(w);
      t.setNode(y, {
        domId: y,
        id: y,
        parentId: d.parentId,
        labelStyle: "",
        label: "",
        padding: 0,
        shape: "labelRect",
        // shape: 'rect',
        style: "",
        width: 10,
        height: 10
      }), t.setParent(y, d.parentId), t.setNode(X, {
        domId: X,
        id: X,
        parentId: d.parentId,
        labelStyle: "",
        padding: 0,
        // shape: 'rect',
        shape: "labelRect",
        label: "",
        style: "",
        width: 10,
        height: 10
      }), t.setParent(X, d.parentId);
      const i = structuredClone(u), p = structuredClone(u), g = structuredClone(u);
      i.label = "", i.arrowTypeEnd = "none", i.id = w + "-cyclic-special-1", p.arrowTypeStart = "none", p.arrowTypeEnd = "none", p.id = w + "-cyclic-special-mid", g.label = "", d.isGroup && (i.fromCluster = w, g.toCluster = w), g.id = w + "-cyclic-special-2", g.arrowTypeStart = "none", t.setEdge(w, y, i, w + "-cyclic-special-0"), t.setEdge(y, X, p, w + "-cyclic-special-1"), t.setEdge(X, w, g, w + "-cyc<lic-special-2");
    } else
      t.setEdge(u.start, u.end, { ...u }, u.id);
  }), R$1.warn("Graph at first:", JSON.stringify(E(t))), oe(t), R$1.warn("Graph after XAX:", JSON.stringify(E(t)));
  const c = yt();
  await j(
    s,
    t,
    e.type,
    e.diagramId,
    void 0,
    c
  );
}, "render");
export {
  Gt as render
};
