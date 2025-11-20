import { l } from "./chunk-FMBD7UC4-1b0f6e04-940b3e31.js";
import { H as m, aj as vI, O as yt, a7 as $5, aa as F5, ak as R5, a8 as B5, a9 as D5, al as I5, ad as Ii, am as vA, an as CA, ao as N$, M as R, ap as OI, aq as $e, a6 as gt, ar as M5, as as SI, at as XI, au as VI, av as dn } from "./app-c48027fd.js";
import { g } from "./chunk-55IACEB6-b744bec0-193174fb.js";
import { d } from "./chunk-QN33PNHL-94a673b4-a55ff094.js";
import { e } from "./channel-4b3ee778-31a2307e.js";
import "./chakra-ui-1d60df8d.js";
import "./react-utils-0e8f4d03.js";
import "./monaco-45e206c0.js";
import "./vendor-75a482ef.js";
import "./common-utils-40e9b830.js";
var pe = "flowchart-", Ot, de = (Ot = class {
  // cspell:ignore funs
  constructor() {
    this.vertexCounter = 0, this.config = yt(), this.vertices = /* @__PURE__ */ new Map(), this.edges = [], this.classes = /* @__PURE__ */ new Map(), this.subGraphs = [], this.subGraphLookup = /* @__PURE__ */ new Map(), this.tooltips = /* @__PURE__ */ new Map(), this.subCount = 0, this.firstGraphFlag = true, this.secCount = -1, this.posCrossRef = [], this.funs = [], this.setAccTitle = $5, this.setAccDescription = F5, this.setDiagramTitle = R5, this.getAccTitle = B5, this.getAccDescription = D5, this.getDiagramTitle = I5, this.funs.push(this.setupToolTips.bind(this)), this.addVertex = this.addVertex.bind(this), this.firstGraph = this.firstGraph.bind(this), this.setDirection = this.setDirection.bind(this), this.addSubGraph = this.addSubGraph.bind(this), this.addLink = this.addLink.bind(this), this.setLink = this.setLink.bind(this), this.updateLink = this.updateLink.bind(this), this.addClass = this.addClass.bind(this), this.setClass = this.setClass.bind(this), this.destructLink = this.destructLink.bind(this), this.setClickEvent = this.setClickEvent.bind(this), this.setTooltip = this.setTooltip.bind(this), this.updateLinkInterpolate = this.updateLinkInterpolate.bind(this), this.setClickFun = this.setClickFun.bind(this), this.bindFunctions = this.bindFunctions.bind(this), this.lex = {
      firstGraph: this.firstGraph.bind(this)
    }, this.clear(), this.setGen("gen-2");
  }
  sanitizeText(i) {
    return Ii.sanitizeText(i, this.config);
  }
  /**
   * Function to lookup domId from id in the graph definition.
   *
   * @param id - id of the node
   */
  lookUpDomId(i) {
    for (const a of this.vertices.values())
      if (a.id === i)
        return a.domId;
    return i;
  }
  /**
   * Function called by parser when a node definition has been found
   */
  addVertex(i, a, n, u, o, f, c = {}, A) {
    var L, C;
    if (!i || i.trim().length === 0)
      return;
    let r;
    if (A !== void 0) {
      let p;
      A.includes(`
`) ? p = A + `
` : p = `{
` + A + `
}`, r = vA(p, { schema: CA });
    }
    const k = this.edges.find((p) => p.id === i);
    if (k) {
      const p = r;
      (p == null ? void 0 : p.animate) !== void 0 && (k.animate = p.animate), (p == null ? void 0 : p.animation) !== void 0 && (k.animation = p.animation), (p == null ? void 0 : p.curve) !== void 0 && (k.interpolate = p.curve);
      return;
    }
    let E, b = this.vertices.get(i);
    if (b === void 0 && (b = {
      id: i,
      labelType: "text",
      domId: pe + i + "-" + this.vertexCounter,
      styles: [],
      classes: []
    }, this.vertices.set(i, b)), this.vertexCounter++, a !== void 0 ? (this.config = yt(), E = this.sanitizeText(a.text.trim()), b.labelType = a.type, E.startsWith('"') && E.endsWith('"') && (E = E.substring(1, E.length - 1)), b.text = E) : b.text === void 0 && (b.text = i), n !== void 0 && (b.type = n), u != null && u.forEach((p) => {
      b.styles.push(p);
    }), o != null && o.forEach((p) => {
      b.classes.push(p);
    }), f !== void 0 && (b.dir = f), b.props === void 0 ? b.props = c : c !== void 0 && Object.assign(b.props, c), r !== void 0) {
      if (r.shape) {
        if (r.shape !== r.shape.toLowerCase() || r.shape.includes("_"))
          throw new Error(`No such shape: ${r.shape}. Shape names should be lowercase.`);
        if (!N$(r.shape))
          throw new Error(`No such shape: ${r.shape}.`);
        b.type = r == null ? void 0 : r.shape;
      }
      r != null && r.label && (b.text = r == null ? void 0 : r.label), r != null && r.icon && (b.icon = r == null ? void 0 : r.icon, !((L = r.label) != null && L.trim()) && b.text === i && (b.text = "")), r != null && r.form && (b.form = r == null ? void 0 : r.form), r != null && r.pos && (b.pos = r == null ? void 0 : r.pos), r != null && r.img && (b.img = r == null ? void 0 : r.img, !((C = r.label) != null && C.trim()) && b.text === i && (b.text = "")), r != null && r.constraint && (b.constraint = r.constraint), r.w && (b.assetWidth = Number(r.w)), r.h && (b.assetHeight = Number(r.h));
    }
  }
  /**
   * Function called by parser when a link/edge definition has been found
   *
   */
  addSingleLink(i, a, n, u) {
    const c = {
      start: i,
      end: a,
      type: void 0,
      text: "",
      labelType: "text",
      classes: [],
      isUserDefinedId: false,
      interpolate: this.edges.defaultInterpolate
    };
    R.info("abc78 Got edge...", c);
    const A = n.text;
    if (A !== void 0 && (c.text = this.sanitizeText(A.text.trim()), c.text.startsWith('"') && c.text.endsWith('"') && (c.text = c.text.substring(1, c.text.length - 1)), c.labelType = A.type), n !== void 0 && (c.type = n.type, c.stroke = n.stroke, c.length = n.length > 10 ? 10 : n.length), u && !this.edges.some((r) => r.id === u))
      c.id = u, c.isUserDefinedId = true;
    else {
      const r = this.edges.filter((k) => k.start === c.start && k.end === c.end);
      r.length === 0 ? c.id = OI(c.start, c.end, { counter: 0, prefix: "L" }) : c.id = OI(c.start, c.end, {
        counter: r.length + 1,
        prefix: "L"
      });
    }
    if (this.edges.length < (this.config.maxEdges ?? 500))
      R.info("Pushing edge..."), this.edges.push(c);
    else
      throw new Error(
        `Edge limit exceeded. ${this.edges.length} edges found, but the limit is ${this.config.maxEdges}.

Initialize mermaid with maxEdges set to a higher number to allow more edges.
You cannot set this config via configuration inside the diagram as it is a secure config.
You have to call mermaid.initialize.`
      );
  }
  isLinkData(i) {
    return i !== null && typeof i == "object" && "id" in i && typeof i.id == "string";
  }
  addLink(i, a, n) {
    const u = this.isLinkData(n) ? n.id.replace("@", "") : void 0;
    R.info("addLink", i, a, u);
    for (const o of i)
      for (const f of a) {
        const c = o === i[i.length - 1], A = f === a[0];
        c && A ? this.addSingleLink(o, f, n, u) : this.addSingleLink(o, f, n, void 0);
      }
  }
  /**
   * Updates a link's line interpolation algorithm
   */
  updateLinkInterpolate(i, a) {
    i.forEach((n) => {
      n === "default" ? this.edges.defaultInterpolate = a : this.edges[n].interpolate = a;
    });
  }
  /**
   * Updates a link with a style
   *
   */
  updateLink(i, a) {
    i.forEach((n) => {
      var u, o, f, c, A, r;
      if (typeof n == "number" && n >= this.edges.length)
        throw new Error(
          `The index ${n} for linkStyle is out of bounds. Valid indices for linkStyle are between 0 and ${this.edges.length - 1}. (Help: Ensure that the index is within the range of existing edges.)`
        );
      n === "default" ? this.edges.defaultStyle = a : (this.edges[n].style = a, (((o = (u = this.edges[n]) == null ? void 0 : u.style) == null ? void 0 : o.length) ?? 0) > 0 && !((c = (f = this.edges[n]) == null ? void 0 : f.style) != null && c.some((k) => k == null ? void 0 : k.startsWith("fill"))) && ((r = (A = this.edges[n]) == null ? void 0 : A.style) == null || r.push("fill:none")));
    });
  }
  addClass(i, a) {
    const n = a.join().replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    i.split(",").forEach((u) => {
      let o = this.classes.get(u);
      o === void 0 && (o = { id: u, styles: [], textStyles: [] }, this.classes.set(u, o)), n != null && n.forEach((f) => {
        if (/color/.exec(f)) {
          const c = f.replace("fill", "bgFill");
          o.textStyles.push(c);
        }
        o.styles.push(f);
      });
    });
  }
  /**
   * Called by parser when a graph definition is found, stores the direction of the chart.
   *
   */
  setDirection(i) {
    this.direction = i.trim(), /.*</.exec(this.direction) && (this.direction = "RL"), /.*\^/.exec(this.direction) && (this.direction = "BT"), /.*>/.exec(this.direction) && (this.direction = "LR"), /.*v/.exec(this.direction) && (this.direction = "TB"), this.direction === "TD" && (this.direction = "TB");
  }
  /**
   * Called by parser when a special node is found, e.g. a clickable element.
   *
   * @param ids - Comma separated list of ids
   * @param className - Class to add
   */
  setClass(i, a) {
    for (const n of i.split(",")) {
      const u = this.vertices.get(n);
      u && u.classes.push(a);
      const o = this.edges.find((c) => c.id === n);
      o && o.classes.push(a);
      const f = this.subGraphLookup.get(n);
      f && f.classes.push(a);
    }
  }
  setTooltip(i, a) {
    if (a !== void 0) {
      a = this.sanitizeText(a);
      for (const n of i.split(","))
        this.tooltips.set(this.version === "gen-1" ? this.lookUpDomId(n) : n, a);
    }
  }
  setClickFun(i, a, n) {
    const u = this.lookUpDomId(i);
    if (yt().securityLevel !== "loose" || a === void 0)
      return;
    let o = [];
    if (typeof n == "string") {
      o = n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      for (let c = 0; c < o.length; c++) {
        let A = o[c].trim();
        A.startsWith('"') && A.endsWith('"') && (A = A.substr(1, A.length - 2)), o[c] = A;
      }
    }
    o.length === 0 && o.push(i);
    const f = this.vertices.get(i);
    f && (f.haveCallback = true, this.funs.push(() => {
      const c = document.querySelector(`[id="${u}"]`);
      c !== null && c.addEventListener(
        "click",
        () => {
          $e.runFunc(a, ...o);
        },
        false
      );
    }));
  }
  /**
   * Called by parser when a link is found. Adds the URL to the vertex data.
   *
   * @param ids - Comma separated list of ids
   * @param linkStr - URL to create a link for
   * @param target - Target attribute for the link
   */
  setLink(i, a, n) {
    i.split(",").forEach((u) => {
      const o = this.vertices.get(u);
      o !== void 0 && (o.link = $e.formatUrl(a, this.config), o.linkTarget = n);
    }), this.setClass(i, "clickable");
  }
  getTooltip(i) {
    return this.tooltips.get(i);
  }
  /**
   * Called by parser when a click definition is found. Registers an event handler.
   *
   * @param ids - Comma separated list of ids
   * @param functionName - Function to be called on click
   * @param functionArgs - Arguments to be passed to the function
   */
  setClickEvent(i, a, n) {
    i.split(",").forEach((u) => {
      this.setClickFun(u, a, n);
    }), this.setClass(i, "clickable");
  }
  bindFunctions(i) {
    this.funs.forEach((a) => {
      a(i);
    });
  }
  getDirection() {
    var i;
    return (i = this.direction) == null ? void 0 : i.trim();
  }
  /**
   * Retrieval function for fetching the found nodes after parsing has completed.
   *
   */
  getVertices() {
    return this.vertices;
  }
  /**
   * Retrieval function for fetching the found links after parsing has completed.
   *
   */
  getEdges() {
    return this.edges;
  }
  /**
   * Retrieval function for fetching the found class definitions after parsing has completed.
   *
   */
  getClasses() {
    return this.classes;
  }
  setupToolTips(i) {
    let a = gt(".mermaidTooltip");
    (a._groups || a)[0][0] === null && (a = gt("body").append("div").attr("class", "mermaidTooltip").style("opacity", 0)), gt(i).select("svg").selectAll("g.node").on("mouseover", (o) => {
      var r;
      const f = gt(o.currentTarget);
      if (f.attr("title") === null)
        return;
      const A = (r = o.currentTarget) == null ? void 0 : r.getBoundingClientRect();
      a.transition().duration(200).style("opacity", ".9"), a.text(f.attr("title")).style("left", window.scrollX + A.left + (A.right - A.left) / 2 + "px").style("top", window.scrollY + A.bottom + "px"), a.html(a.html().replace(/&lt;br\/&gt;/g, "<br/>")), f.classed("hover", true);
    }).on("mouseout", (o) => {
      a.transition().duration(500).style("opacity", 0), gt(o.currentTarget).classed("hover", false);
    });
  }
  /**
   * Clears the internal graph db so that a new graph can be parsed.
   *
   */
  clear(i = "gen-2") {
    this.vertices = /* @__PURE__ */ new Map(), this.classes = /* @__PURE__ */ new Map(), this.edges = [], this.funs = [this.setupToolTips.bind(this)], this.subGraphs = [], this.subGraphLookup = /* @__PURE__ */ new Map(), this.subCount = 0, this.tooltips = /* @__PURE__ */ new Map(), this.firstGraphFlag = true, this.version = i, this.config = yt(), M5();
  }
  setGen(i) {
    this.version = i || "gen-2";
  }
  defaultStyle() {
    return "fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;";
  }
  addSubGraph(i, a, n) {
    let u = i.text.trim(), o = n.text;
    i === n && /\s/.exec(n.text) && (u = void 0);
    const c = (/* @__PURE__ */ m((b) => {
      const L = { boolean: {}, number: {}, string: {} }, C = [];
      let p;
      return { nodeList: b.filter(function(W) {
        const Z = typeof W;
        return W.stmt && W.stmt === "dir" ? (p = W.value, false) : W.trim() === "" ? false : Z in L ? L[Z].hasOwnProperty(W) ? false : L[Z][W] = true : C.includes(W) ? false : C.push(W);
      }), dir: p };
    }, "uniq"))(a.flat()), A = c.nodeList;
    let r = c.dir;
    const k = yt().flowchart ?? {};
    if (r = r ?? (k.inheritDir ? this.getDirection() ?? yt().direction ?? void 0 : void 0), this.version === "gen-1")
      for (let b = 0; b < A.length; b++)
        A[b] = this.lookUpDomId(A[b]);
    u = u ?? "subGraph" + this.subCount, o = o || "", o = this.sanitizeText(o), this.subCount = this.subCount + 1;
    const E = {
      id: u,
      nodes: A,
      title: o.trim(),
      classes: [],
      dir: r,
      labelType: n.type
    };
    return R.info("Adding", E.id, E.nodes, E.dir), E.nodes = this.makeUniq(E, this.subGraphs).nodes, this.subGraphs.push(E), this.subGraphLookup.set(u, E), u;
  }
  getPosForId(i) {
    for (const [a, n] of this.subGraphs.entries())
      if (n.id === i)
        return a;
    return -1;
  }
  indexNodes2(i, a) {
    const n = this.subGraphs[a].nodes;
    if (this.secCount = this.secCount + 1, this.secCount > 2e3)
      return {
        result: false,
        count: 0
      };
    if (this.posCrossRef[this.secCount] = a, this.subGraphs[a].id === i)
      return {
        result: true,
        count: 0
      };
    let u = 0, o = 1;
    for (; u < n.length; ) {
      const f = this.getPosForId(n[u]);
      if (f >= 0) {
        const c = this.indexNodes2(i, f);
        if (c.result)
          return {
            result: true,
            count: o + c.count
          };
        o = o + c.count;
      }
      u = u + 1;
    }
    return {
      result: false,
      count: o
    };
  }
  getDepthFirstPos(i) {
    return this.posCrossRef[i];
  }
  indexNodes() {
    this.secCount = -1, this.subGraphs.length > 0 && this.indexNodes2("none", this.subGraphs.length - 1);
  }
  getSubGraphs() {
    return this.subGraphs;
  }
  firstGraph() {
    return this.firstGraphFlag ? (this.firstGraphFlag = false, true) : false;
  }
  destructStartLink(i) {
    let a = i.trim(), n = "arrow_open";
    switch (a[0]) {
      case "<":
        n = "arrow_point", a = a.slice(1);
        break;
      case "x":
        n = "arrow_cross", a = a.slice(1);
        break;
      case "o":
        n = "arrow_circle", a = a.slice(1);
        break;
    }
    let u = "normal";
    return a.includes("=") && (u = "thick"), a.includes(".") && (u = "dotted"), { type: n, stroke: u };
  }
  countChar(i, a) {
    const n = a.length;
    let u = 0;
    for (let o = 0; o < n; ++o)
      a[o] === i && ++u;
    return u;
  }
  destructEndLink(i) {
    const a = i.trim();
    let n = a.slice(0, -1), u = "arrow_open";
    switch (a.slice(-1)) {
      case "x":
        u = "arrow_cross", a.startsWith("x") && (u = "double_" + u, n = n.slice(1));
        break;
      case ">":
        u = "arrow_point", a.startsWith("<") && (u = "double_" + u, n = n.slice(1));
        break;
      case "o":
        u = "arrow_circle", a.startsWith("o") && (u = "double_" + u, n = n.slice(1));
        break;
    }
    let o = "normal", f = n.length - 1;
    n.startsWith("=") && (o = "thick"), n.startsWith("~") && (o = "invisible");
    const c = this.countChar(".", n);
    return c && (o = "dotted", f = c), { type: u, stroke: o, length: f };
  }
  destructLink(i, a) {
    const n = this.destructEndLink(i);
    let u;
    if (a) {
      if (u = this.destructStartLink(a), u.stroke !== n.stroke)
        return { type: "INVALID", stroke: "INVALID" };
      if (u.type === "arrow_open")
        u.type = n.type;
      else {
        if (u.type !== n.type)
          return { type: "INVALID", stroke: "INVALID" };
        u.type = "double_" + u.type;
      }
      return u.type === "double_arrow" && (u.type = "double_arrow_point"), u.length = n.length, u;
    }
    return n;
  }
  // Todo optimizer this by caching existing nodes
  exists(i, a) {
    for (const n of i)
      if (n.nodes.includes(a))
        return true;
    return false;
  }
  /**
   * Deletes an id from all subgraphs
   *
   */
  makeUniq(i, a) {
    const n = [];
    return i.nodes.forEach((u, o) => {
      this.exists(a, u) || n.push(i.nodes[o]);
    }), { nodes: n };
  }
  getTypeFromVertex(i) {
    if (i.img)
      return "imageSquare";
    if (i.icon)
      return i.form === "circle" ? "iconCircle" : i.form === "square" ? "iconSquare" : i.form === "rounded" ? "iconRounded" : "icon";
    switch (i.type) {
      case "square":
      case void 0:
        return "squareRect";
      case "round":
        return "roundedRect";
      case "ellipse":
        return "ellipse";
      default:
        return i.type;
    }
  }
  findNode(i, a) {
    return i.find((n) => n.id === a);
  }
  destructEdgeType(i) {
    let a = "none", n = "arrow_point";
    switch (i) {
      case "arrow_point":
      case "arrow_circle":
      case "arrow_cross":
        n = i;
        break;
      case "double_arrow_point":
      case "double_arrow_circle":
      case "double_arrow_cross":
        a = i.replace("double_", ""), n = a;
        break;
    }
    return { arrowTypeStart: a, arrowTypeEnd: n };
  }
  addNodeFromVertex(i, a, n, u, o, f) {
    var k;
    const c = n.get(i.id), A = u.get(i.id) ?? false, r = this.findNode(a, i.id);
    if (r)
      r.cssStyles = i.styles, r.cssCompiledStyles = this.getCompiledStyles(i.classes), r.cssClasses = i.classes.join(" ");
    else {
      const E = {
        id: i.id,
        label: i.text,
        labelStyle: "",
        parentId: c,
        padding: ((k = o.flowchart) == null ? void 0 : k.padding) || 8,
        cssStyles: i.styles,
        cssCompiledStyles: this.getCompiledStyles(["default", "node", ...i.classes]),
        cssClasses: "default " + i.classes.join(" "),
        dir: i.dir,
        domId: i.domId,
        look: f,
        link: i.link,
        linkTarget: i.linkTarget,
        tooltip: this.getTooltip(i.id),
        icon: i.icon,
        pos: i.pos,
        img: i.img,
        assetWidth: i.assetWidth,
        assetHeight: i.assetHeight,
        constraint: i.constraint
      };
      A ? a.push({
        ...E,
        isGroup: true,
        shape: "rect"
      }) : a.push({
        ...E,
        isGroup: false,
        shape: this.getTypeFromVertex(i)
      });
    }
  }
  getCompiledStyles(i) {
    let a = [];
    for (const n of i) {
      const u = this.classes.get(n);
      u != null && u.styles && (a = [...a, ...u.styles ?? []].map((o) => o.trim())), u != null && u.textStyles && (a = [...a, ...u.textStyles ?? []].map((o) => o.trim()));
    }
    return a;
  }
  getData() {
    const i = yt(), a = [], n = [], u = this.getSubGraphs(), o = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    for (let r = u.length - 1; r >= 0; r--) {
      const k = u[r];
      k.nodes.length > 0 && f.set(k.id, true);
      for (const E of k.nodes)
        o.set(E, k.id);
    }
    for (let r = u.length - 1; r >= 0; r--) {
      const k = u[r];
      a.push({
        id: k.id,
        label: k.title,
        labelStyle: "",
        parentId: o.get(k.id),
        padding: 8,
        cssCompiledStyles: this.getCompiledStyles(k.classes),
        cssClasses: k.classes.join(" "),
        shape: "rect",
        dir: k.dir,
        isGroup: true,
        look: i.look
      });
    }
    this.getVertices().forEach((r) => {
      this.addNodeFromVertex(r, a, o, f, i, i.look || "classic");
    });
    const A = this.getEdges();
    return A.forEach((r, k) => {
      var p;
      const { arrowTypeStart: E, arrowTypeEnd: b } = this.destructEdgeType(r.type), L = [...A.defaultStyle ?? []];
      r.style && L.push(...r.style);
      const C = {
        id: OI(r.start, r.end, { counter: k, prefix: "L" }, r.id),
        isUserDefinedId: r.isUserDefinedId,
        start: r.start,
        end: r.end,
        type: r.type ?? "normal",
        label: r.text,
        labelpos: "c",
        thickness: r.stroke,
        minlen: r.length,
        classes: (r == null ? void 0 : r.stroke) === "invisible" ? "" : "edge-thickness-normal edge-pattern-solid flowchart-link",
        arrowTypeStart: (r == null ? void 0 : r.stroke) === "invisible" || (r == null ? void 0 : r.type) === "arrow_open" ? "none" : E,
        arrowTypeEnd: (r == null ? void 0 : r.stroke) === "invisible" || (r == null ? void 0 : r.type) === "arrow_open" ? "none" : b,
        arrowheadStyle: "fill: #333",
        cssCompiledStyles: this.getCompiledStyles(r.classes),
        labelStyle: L,
        style: L,
        pattern: r.stroke,
        look: i.look,
        animate: r.animate,
        animation: r.animation,
        curve: r.interpolate || this.edges.defaultInterpolate || ((p = i.flowchart) == null ? void 0 : p.curve)
      };
      n.push(C);
    }), { nodes: a, edges: n, other: {}, config: i };
  }
  defaultConfig() {
    return SI.flowchart;
  }
}, m(Ot, "FlowDB"), Ot), fe = /* @__PURE__ */ m(function(s, i) {
  return i.db.getClasses();
}, "getClasses"), ge = /* @__PURE__ */ m(async function(s, i, a, n) {
  var L;
  R.info("REF0:"), R.info("Drawing state diagram (v2)", i);
  const { securityLevel: u, flowchart: o, layout: f } = yt();
  let c;
  u === "sandbox" && (c = gt("#i" + i));
  const A = u === "sandbox" ? c.nodes()[0].contentDocument : document;
  R.debug("Before getData: ");
  const r = n.db.getData();
  R.debug("Data: ", r);
  const k = g(i, u), E = n.db.getDirection();
  r.type = n.type, r.layoutAlgorithm = XI(f), r.layoutAlgorithm === "dagre" && f === "elk" && R.warn(
    "flowchart-elk was moved to an external package in Mermaid v11. Please refer [release notes](https://github.com/mermaid-js/mermaid/releases/tag/v11.0.0) for more details. This diagram will be rendered using `dagre` layout as a fallback."
  ), r.direction = E, r.nodeSpacing = (o == null ? void 0 : o.nodeSpacing) || 50, r.rankSpacing = (o == null ? void 0 : o.rankSpacing) || 50, r.markers = ["point", "circle", "cross"], r.diagramId = i, R.debug("REF1:", r), await VI(r, k);
  const b = ((L = r.config.flowchart) == null ? void 0 : L.diagramPadding) ?? 8;
  $e.insertTitle(
    k,
    "flowchartTitleText",
    (o == null ? void 0 : o.titleTopMargin) || 0,
    n.db.getDiagramTitle()
  ), d(k, b, "flowchart", (o == null ? void 0 : o.useMaxWidth) || false);
  for (const C of r.nodes) {
    const p = gt(`#${i} [id="${C.id}"]`);
    if (!p || !C.link)
      continue;
    const J = A.createElementNS("http://www.w3.org/2000/svg", "a");
    J.setAttributeNS("http://www.w3.org/2000/svg", "class", C.cssClasses), J.setAttributeNS("http://www.w3.org/2000/svg", "rel", "noopener"), u === "sandbox" ? J.setAttributeNS("http://www.w3.org/2000/svg", "target", "_top") : C.linkTarget && J.setAttributeNS("http://www.w3.org/2000/svg", "target", C.linkTarget);
    const W = p.insert(function() {
      return J;
    }, ":first-child"), Z = p.select(".label-container");
    Z && W.append(function() {
      return Z.node();
    });
    const At = p.select(".label");
    At && W.append(function() {
      return At.node();
    });
  }
}, "draw"), be = {
  getClasses: fe,
  draw: ge
}, r1 = function() {
  var s = /* @__PURE__ */ m(function(gt2, h, d2, g2) {
    for (d2 = d2 || {}, g2 = gt2.length; g2--; d2[gt2[g2]] = h)
      ;
    return d2;
  }, "o"), i = [1, 4], a = [1, 3], n = [1, 5], u = [1, 8, 9, 10, 11, 27, 34, 36, 38, 44, 60, 84, 85, 86, 87, 88, 89, 102, 105, 106, 109, 111, 114, 115, 116, 121, 122, 123, 124], o = [2, 2], f = [1, 13], c = [1, 14], A = [1, 15], r = [1, 16], k = [1, 23], E = [1, 25], b = [1, 26], L = [1, 27], C = [1, 49], p = [1, 48], J = [1, 29], W = [1, 30], Z = [1, 31], At = [1, 32], Mt = [1, 33], V = [1, 44], I = [1, 46], w = [1, 42], R2 = [1, 47], N = [1, 43], G = [1, 50], P = [1, 45], O = [1, 51], M = [1, 52], Ut = [1, 34], Wt = [1, 35], zt = [1, 36], jt = [1, 37], dt = [1, 57], y = [1, 8, 9, 10, 11, 27, 32, 34, 36, 38, 44, 60, 84, 85, 86, 87, 88, 89, 102, 105, 106, 109, 111, 114, 115, 116, 121, 122, 123, 124], et = [1, 61], st = [1, 60], it = [1, 62], Dt = [8, 9, 11, 75, 77, 78], a1 = [1, 78], xt = [1, 91], Tt = [1, 96], Et = [1, 95], yt2 = [1, 92], Ft = [1, 88], _t = [1, 94], Bt = [1, 90], vt = [1, 97], Lt = [1, 93], Vt = [1, 98], It = [1, 89], kt = [8, 9, 10, 11, 40, 75, 77, 78], z = [8, 9, 10, 11, 40, 46, 75, 77, 78], q = [8, 9, 10, 11, 29, 40, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 65, 67, 68, 70, 75, 77, 78, 89, 102, 105, 106, 109, 111, 114, 115, 116], n1 = [8, 9, 11, 44, 60, 75, 77, 78, 89, 102, 105, 106, 109, 111, 114, 115, 116], wt = [44, 60, 89, 102, 105, 106, 109, 111, 114, 115, 116], u1 = [1, 121], o1 = [1, 122], Kt = [1, 124], Yt = [1, 123], l1 = [44, 60, 62, 74, 89, 102, 105, 106, 109, 111, 114, 115, 116], c1 = [1, 133], h1 = [1, 147], p1 = [1, 148], d1 = [1, 149], f1 = [1, 150], g1 = [1, 135], b1 = [1, 137], A1 = [1, 141], k1 = [1, 142], m1 = [1, 143], C1 = [1, 144], S1 = [1, 145], D1 = [1, 146], x1 = [1, 151], T1 = [1, 152], E1 = [1, 131], y1 = [1, 132], F1 = [1, 139], _1 = [1, 134], B1 = [1, 138], v1 = [1, 136], Qt = [8, 9, 10, 11, 27, 32, 34, 36, 38, 44, 60, 84, 85, 86, 87, 88, 89, 102, 105, 106, 109, 111, 114, 115, 116, 121, 122, 123, 124], L1 = [1, 154], V1 = [1, 156], B = [8, 9, 11], H = [8, 9, 10, 11, 14, 44, 60, 89, 105, 106, 109, 111, 114, 115, 116], S = [1, 176], j = [1, 172], K = [1, 173], D = [1, 177], x = [1, 174], T = [1, 175], Rt = [77, 116, 119], F = [8, 9, 10, 11, 12, 14, 27, 29, 32, 44, 60, 75, 84, 85, 86, 87, 88, 89, 90, 105, 109, 111, 114, 115, 116], I1 = [10, 106], ft = [31, 49, 51, 53, 55, 57, 62, 64, 66, 67, 69, 71, 116, 117, 118], rt = [1, 247], at = [1, 245], nt = [1, 249], ut = [1, 243], ot = [1, 244], lt = [1, 246], ct = [1, 248], ht = [1, 250], Nt = [1, 268], w1 = [8, 9, 11, 106], $ = [8, 9, 10, 11, 60, 84, 105, 106, 109, 110, 111, 112], Jt = {
    trace: /* @__PURE__ */ m(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, graphConfig: 4, document: 5, line: 6, statement: 7, SEMI: 8, NEWLINE: 9, SPACE: 10, EOF: 11, GRAPH: 12, NODIR: 13, DIR: 14, FirstStmtSeparator: 15, ending: 16, endToken: 17, spaceList: 18, spaceListNewline: 19, vertexStatement: 20, separator: 21, styleStatement: 22, linkStyleStatement: 23, classDefStatement: 24, classStatement: 25, clickStatement: 26, subgraph: 27, textNoTags: 28, SQS: 29, text: 30, SQE: 31, end: 32, direction: 33, acc_title: 34, acc_title_value: 35, acc_descr: 36, acc_descr_value: 37, acc_descr_multiline_value: 38, shapeData: 39, SHAPE_DATA: 40, link: 41, node: 42, styledVertex: 43, AMP: 44, vertex: 45, STYLE_SEPARATOR: 46, idString: 47, DOUBLECIRCLESTART: 48, DOUBLECIRCLEEND: 49, PS: 50, PE: 51, "(-": 52, "-)": 53, STADIUMSTART: 54, STADIUMEND: 55, SUBROUTINESTART: 56, SUBROUTINEEND: 57, VERTEX_WITH_PROPS_START: 58, "NODE_STRING[field]": 59, COLON: 60, "NODE_STRING[value]": 61, PIPE: 62, CYLINDERSTART: 63, CYLINDEREND: 64, DIAMOND_START: 65, DIAMOND_STOP: 66, TAGEND: 67, TRAPSTART: 68, TRAPEND: 69, INVTRAPSTART: 70, INVTRAPEND: 71, linkStatement: 72, arrowText: 73, TESTSTR: 74, START_LINK: 75, edgeText: 76, LINK: 77, LINK_ID: 78, edgeTextToken: 79, STR: 80, MD_STR: 81, textToken: 82, keywords: 83, STYLE: 84, LINKSTYLE: 85, CLASSDEF: 86, CLASS: 87, CLICK: 88, DOWN: 89, UP: 90, textNoTagsToken: 91, stylesOpt: 92, "idString[vertex]": 93, "idString[class]": 94, CALLBACKNAME: 95, CALLBACKARGS: 96, HREF: 97, LINK_TARGET: 98, "STR[link]": 99, "STR[tooltip]": 100, alphaNum: 101, DEFAULT: 102, numList: 103, INTERPOLATE: 104, NUM: 105, COMMA: 106, style: 107, styleComponent: 108, NODE_STRING: 109, UNIT: 110, BRKT: 111, PCT: 112, idStringToken: 113, MINUS: 114, MULT: 115, UNICODE_TEXT: 116, TEXT: 117, TAGSTART: 118, EDGE_TEXT: 119, alphaNumToken: 120, direction_tb: 121, direction_bt: 122, direction_rl: 123, direction_lr: 124, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 8: "SEMI", 9: "NEWLINE", 10: "SPACE", 11: "EOF", 12: "GRAPH", 13: "NODIR", 14: "DIR", 27: "subgraph", 29: "SQS", 31: "SQE", 32: "end", 34: "acc_title", 35: "acc_title_value", 36: "acc_descr", 37: "acc_descr_value", 38: "acc_descr_multiline_value", 40: "SHAPE_DATA", 44: "AMP", 46: "STYLE_SEPARATOR", 48: "DOUBLECIRCLESTART", 49: "DOUBLECIRCLEEND", 50: "PS", 51: "PE", 52: "(-", 53: "-)", 54: "STADIUMSTART", 55: "STADIUMEND", 56: "SUBROUTINESTART", 57: "SUBROUTINEEND", 58: "VERTEX_WITH_PROPS_START", 59: "NODE_STRING[field]", 60: "COLON", 61: "NODE_STRING[value]", 62: "PIPE", 63: "CYLINDERSTART", 64: "CYLINDEREND", 65: "DIAMOND_START", 66: "DIAMOND_STOP", 67: "TAGEND", 68: "TRAPSTART", 69: "TRAPEND", 70: "INVTRAPSTART", 71: "INVTRAPEND", 74: "TESTSTR", 75: "START_LINK", 77: "LINK", 78: "LINK_ID", 80: "STR", 81: "MD_STR", 84: "STYLE", 85: "LINKSTYLE", 86: "CLASSDEF", 87: "CLASS", 88: "CLICK", 89: "DOWN", 90: "UP", 93: "idString[vertex]", 94: "idString[class]", 95: "CALLBACKNAME", 96: "CALLBACKARGS", 97: "HREF", 98: "LINK_TARGET", 99: "STR[link]", 100: "STR[tooltip]", 102: "DEFAULT", 104: "INTERPOLATE", 105: "NUM", 106: "COMMA", 109: "NODE_STRING", 110: "UNIT", 111: "BRKT", 112: "PCT", 114: "MINUS", 115: "MULT", 116: "UNICODE_TEXT", 117: "TEXT", 118: "TAGSTART", 119: "EDGE_TEXT", 121: "direction_tb", 122: "direction_bt", 123: "direction_rl", 124: "direction_lr" },
    productions_: [0, [3, 2], [5, 0], [5, 2], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [4, 2], [4, 2], [4, 2], [4, 3], [16, 2], [16, 1], [17, 1], [17, 1], [17, 1], [15, 1], [15, 1], [15, 2], [19, 2], [19, 2], [19, 1], [19, 1], [18, 2], [18, 1], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 9], [7, 6], [7, 4], [7, 1], [7, 2], [7, 2], [7, 1], [21, 1], [21, 1], [21, 1], [39, 2], [39, 1], [20, 4], [20, 3], [20, 4], [20, 2], [20, 2], [20, 1], [42, 1], [42, 6], [42, 5], [43, 1], [43, 3], [45, 4], [45, 4], [45, 6], [45, 4], [45, 4], [45, 4], [45, 8], [45, 4], [45, 4], [45, 4], [45, 6], [45, 4], [45, 4], [45, 4], [45, 4], [45, 4], [45, 1], [41, 2], [41, 3], [41, 3], [41, 1], [41, 3], [41, 4], [76, 1], [76, 2], [76, 1], [76, 1], [72, 1], [72, 2], [73, 3], [30, 1], [30, 2], [30, 1], [30, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [83, 1], [28, 1], [28, 2], [28, 1], [28, 1], [24, 5], [25, 5], [26, 2], [26, 4], [26, 3], [26, 5], [26, 3], [26, 5], [26, 5], [26, 7], [26, 2], [26, 4], [26, 2], [26, 4], [26, 4], [26, 6], [22, 5], [23, 5], [23, 5], [23, 9], [23, 9], [23, 7], [23, 7], [103, 1], [103, 3], [92, 1], [92, 3], [107, 1], [107, 2], [108, 1], [108, 1], [108, 1], [108, 1], [108, 1], [108, 1], [108, 1], [108, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [82, 1], [82, 1], [82, 1], [82, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [79, 1], [79, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [120, 1], [47, 1], [47, 2], [101, 1], [101, 2], [33, 1], [33, 1], [33, 1], [33, 1]],
    performAction: /* @__PURE__ */ m(function(h, d2, g2, l2, _, t, Pt) {
      var e2 = t.length - 1;
      switch (_) {
        case 2:
          this.$ = [];
          break;
        case 3:
          (!Array.isArray(t[e2]) || t[e2].length > 0) && t[e2 - 1].push(t[e2]), this.$ = t[e2 - 1];
          break;
        case 4:
        case 183:
          this.$ = t[e2];
          break;
        case 11:
          l2.setDirection("TB"), this.$ = "TB";
          break;
        case 12:
          l2.setDirection(t[e2 - 1]), this.$ = t[e2 - 1];
          break;
        case 27:
          this.$ = t[e2 - 1].nodes;
          break;
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
          this.$ = [];
          break;
        case 33:
          this.$ = l2.addSubGraph(t[e2 - 6], t[e2 - 1], t[e2 - 4]);
          break;
        case 34:
          this.$ = l2.addSubGraph(t[e2 - 3], t[e2 - 1], t[e2 - 3]);
          break;
        case 35:
          this.$ = l2.addSubGraph(void 0, t[e2 - 1], void 0);
          break;
        case 37:
          this.$ = t[e2].trim(), l2.setAccTitle(this.$);
          break;
        case 38:
        case 39:
          this.$ = t[e2].trim(), l2.setAccDescription(this.$);
          break;
        case 43:
          this.$ = t[e2 - 1] + t[e2];
          break;
        case 44:
          this.$ = t[e2];
          break;
        case 45:
          l2.addVertex(t[e2 - 1][t[e2 - 1].length - 1], void 0, void 0, void 0, void 0, void 0, void 0, t[e2]), l2.addLink(t[e2 - 3].stmt, t[e2 - 1], t[e2 - 2]), this.$ = { stmt: t[e2 - 1], nodes: t[e2 - 1].concat(t[e2 - 3].nodes) };
          break;
        case 46:
          l2.addLink(t[e2 - 2].stmt, t[e2], t[e2 - 1]), this.$ = { stmt: t[e2], nodes: t[e2].concat(t[e2 - 2].nodes) };
          break;
        case 47:
          l2.addLink(t[e2 - 3].stmt, t[e2 - 1], t[e2 - 2]), this.$ = { stmt: t[e2 - 1], nodes: t[e2 - 1].concat(t[e2 - 3].nodes) };
          break;
        case 48:
          this.$ = { stmt: t[e2 - 1], nodes: t[e2 - 1] };
          break;
        case 49:
          l2.addVertex(t[e2 - 1][t[e2 - 1].length - 1], void 0, void 0, void 0, void 0, void 0, void 0, t[e2]), this.$ = { stmt: t[e2 - 1], nodes: t[e2 - 1], shapeData: t[e2] };
          break;
        case 50:
          this.$ = { stmt: t[e2], nodes: t[e2] };
          break;
        case 51:
          this.$ = [t[e2]];
          break;
        case 52:
          l2.addVertex(t[e2 - 5][t[e2 - 5].length - 1], void 0, void 0, void 0, void 0, void 0, void 0, t[e2 - 4]), this.$ = t[e2 - 5].concat(t[e2]);
          break;
        case 53:
          this.$ = t[e2 - 4].concat(t[e2]);
          break;
        case 54:
          this.$ = t[e2];
          break;
        case 55:
          this.$ = t[e2 - 2], l2.setClass(t[e2 - 2], t[e2]);
          break;
        case 56:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "square");
          break;
        case 57:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "doublecircle");
          break;
        case 58:
          this.$ = t[e2 - 5], l2.addVertex(t[e2 - 5], t[e2 - 2], "circle");
          break;
        case 59:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "ellipse");
          break;
        case 60:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "stadium");
          break;
        case 61:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "subroutine");
          break;
        case 62:
          this.$ = t[e2 - 7], l2.addVertex(t[e2 - 7], t[e2 - 1], "rect", void 0, void 0, void 0, Object.fromEntries([[t[e2 - 5], t[e2 - 3]]]));
          break;
        case 63:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "cylinder");
          break;
        case 64:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "round");
          break;
        case 65:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "diamond");
          break;
        case 66:
          this.$ = t[e2 - 5], l2.addVertex(t[e2 - 5], t[e2 - 2], "hexagon");
          break;
        case 67:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "odd");
          break;
        case 68:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "trapezoid");
          break;
        case 69:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "inv_trapezoid");
          break;
        case 70:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "lean_right");
          break;
        case 71:
          this.$ = t[e2 - 3], l2.addVertex(t[e2 - 3], t[e2 - 1], "lean_left");
          break;
        case 72:
          this.$ = t[e2], l2.addVertex(t[e2]);
          break;
        case 73:
          t[e2 - 1].text = t[e2], this.$ = t[e2 - 1];
          break;
        case 74:
        case 75:
          t[e2 - 2].text = t[e2 - 1], this.$ = t[e2 - 2];
          break;
        case 76:
          this.$ = t[e2];
          break;
        case 77:
          var v = l2.destructLink(t[e2], t[e2 - 2]);
          this.$ = { type: v.type, stroke: v.stroke, length: v.length, text: t[e2 - 1] };
          break;
        case 78:
          var v = l2.destructLink(t[e2], t[e2 - 2]);
          this.$ = { type: v.type, stroke: v.stroke, length: v.length, text: t[e2 - 1], id: t[e2 - 3] };
          break;
        case 79:
          this.$ = { text: t[e2], type: "text" };
          break;
        case 80:
          this.$ = { text: t[e2 - 1].text + "" + t[e2], type: t[e2 - 1].type };
          break;
        case 81:
          this.$ = { text: t[e2], type: "string" };
          break;
        case 82:
          this.$ = { text: t[e2], type: "markdown" };
          break;
        case 83:
          var v = l2.destructLink(t[e2]);
          this.$ = { type: v.type, stroke: v.stroke, length: v.length };
          break;
        case 84:
          var v = l2.destructLink(t[e2]);
          this.$ = { type: v.type, stroke: v.stroke, length: v.length, id: t[e2 - 1] };
          break;
        case 85:
          this.$ = t[e2 - 1];
          break;
        case 86:
          this.$ = { text: t[e2], type: "text" };
          break;
        case 87:
          this.$ = { text: t[e2 - 1].text + "" + t[e2], type: t[e2 - 1].type };
          break;
        case 88:
          this.$ = { text: t[e2], type: "string" };
          break;
        case 89:
        case 104:
          this.$ = { text: t[e2], type: "markdown" };
          break;
        case 101:
          this.$ = { text: t[e2], type: "text" };
          break;
        case 102:
          this.$ = { text: t[e2 - 1].text + "" + t[e2], type: t[e2 - 1].type };
          break;
        case 103:
          this.$ = { text: t[e2], type: "text" };
          break;
        case 105:
          this.$ = t[e2 - 4], l2.addClass(t[e2 - 2], t[e2]);
          break;
        case 106:
          this.$ = t[e2 - 4], l2.setClass(t[e2 - 2], t[e2]);
          break;
        case 107:
        case 115:
          this.$ = t[e2 - 1], l2.setClickEvent(t[e2 - 1], t[e2]);
          break;
        case 108:
        case 116:
          this.$ = t[e2 - 3], l2.setClickEvent(t[e2 - 3], t[e2 - 2]), l2.setTooltip(t[e2 - 3], t[e2]);
          break;
        case 109:
          this.$ = t[e2 - 2], l2.setClickEvent(t[e2 - 2], t[e2 - 1], t[e2]);
          break;
        case 110:
          this.$ = t[e2 - 4], l2.setClickEvent(t[e2 - 4], t[e2 - 3], t[e2 - 2]), l2.setTooltip(t[e2 - 4], t[e2]);
          break;
        case 111:
          this.$ = t[e2 - 2], l2.setLink(t[e2 - 2], t[e2]);
          break;
        case 112:
          this.$ = t[e2 - 4], l2.setLink(t[e2 - 4], t[e2 - 2]), l2.setTooltip(t[e2 - 4], t[e2]);
          break;
        case 113:
          this.$ = t[e2 - 4], l2.setLink(t[e2 - 4], t[e2 - 2], t[e2]);
          break;
        case 114:
          this.$ = t[e2 - 6], l2.setLink(t[e2 - 6], t[e2 - 4], t[e2]), l2.setTooltip(t[e2 - 6], t[e2 - 2]);
          break;
        case 117:
          this.$ = t[e2 - 1], l2.setLink(t[e2 - 1], t[e2]);
          break;
        case 118:
          this.$ = t[e2 - 3], l2.setLink(t[e2 - 3], t[e2 - 2]), l2.setTooltip(t[e2 - 3], t[e2]);
          break;
        case 119:
          this.$ = t[e2 - 3], l2.setLink(t[e2 - 3], t[e2 - 2], t[e2]);
          break;
        case 120:
          this.$ = t[e2 - 5], l2.setLink(t[e2 - 5], t[e2 - 4], t[e2]), l2.setTooltip(t[e2 - 5], t[e2 - 2]);
          break;
        case 121:
          this.$ = t[e2 - 4], l2.addVertex(t[e2 - 2], void 0, void 0, t[e2]);
          break;
        case 122:
          this.$ = t[e2 - 4], l2.updateLink([t[e2 - 2]], t[e2]);
          break;
        case 123:
          this.$ = t[e2 - 4], l2.updateLink(t[e2 - 2], t[e2]);
          break;
        case 124:
          this.$ = t[e2 - 8], l2.updateLinkInterpolate([t[e2 - 6]], t[e2 - 2]), l2.updateLink([t[e2 - 6]], t[e2]);
          break;
        case 125:
          this.$ = t[e2 - 8], l2.updateLinkInterpolate(t[e2 - 6], t[e2 - 2]), l2.updateLink(t[e2 - 6], t[e2]);
          break;
        case 126:
          this.$ = t[e2 - 6], l2.updateLinkInterpolate([t[e2 - 4]], t[e2]);
          break;
        case 127:
          this.$ = t[e2 - 6], l2.updateLinkInterpolate(t[e2 - 4], t[e2]);
          break;
        case 128:
        case 130:
          this.$ = [t[e2]];
          break;
        case 129:
        case 131:
          t[e2 - 2].push(t[e2]), this.$ = t[e2 - 2];
          break;
        case 133:
          this.$ = t[e2 - 1] + t[e2];
          break;
        case 181:
          this.$ = t[e2];
          break;
        case 182:
          this.$ = t[e2 - 1] + "" + t[e2];
          break;
        case 184:
          this.$ = t[e2 - 1] + "" + t[e2];
          break;
        case 185:
          this.$ = { stmt: "dir", value: "TB" };
          break;
        case 186:
          this.$ = { stmt: "dir", value: "BT" };
          break;
        case 187:
          this.$ = { stmt: "dir", value: "RL" };
          break;
        case 188:
          this.$ = { stmt: "dir", value: "LR" };
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 9: i, 10: a, 12: n }, { 1: [3] }, s(u, o, { 5: 6 }), { 4: 7, 9: i, 10: a, 12: n }, { 4: 8, 9: i, 10: a, 12: n }, { 13: [1, 9], 14: [1, 10] }, { 1: [2, 1], 6: 11, 7: 12, 8: f, 9: c, 10: A, 11: r, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: k, 33: 24, 34: E, 36: b, 38: L, 42: 28, 43: 38, 44: C, 45: 39, 47: 40, 60: p, 84: J, 85: W, 86: Z, 87: At, 88: Mt, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M, 121: Ut, 122: Wt, 123: zt, 124: jt }, s(u, [2, 9]), s(u, [2, 10]), s(u, [2, 11]), { 8: [1, 54], 9: [1, 55], 10: dt, 15: 53, 18: 56 }, s(y, [2, 3]), s(y, [2, 4]), s(y, [2, 5]), s(y, [2, 6]), s(y, [2, 7]), s(y, [2, 8]), { 8: et, 9: st, 11: it, 21: 58, 41: 59, 72: 63, 75: [1, 64], 77: [1, 66], 78: [1, 65] }, { 8: et, 9: st, 11: it, 21: 67 }, { 8: et, 9: st, 11: it, 21: 68 }, { 8: et, 9: st, 11: it, 21: 69 }, { 8: et, 9: st, 11: it, 21: 70 }, { 8: et, 9: st, 11: it, 21: 71 }, { 8: et, 9: st, 10: [1, 72], 11: it, 21: 73 }, s(y, [2, 36]), { 35: [1, 74] }, { 37: [1, 75] }, s(y, [2, 39]), s(Dt, [2, 50], { 18: 76, 39: 77, 10: dt, 40: a1 }), { 10: [1, 79] }, { 10: [1, 80] }, { 10: [1, 81] }, { 10: [1, 82] }, { 14: xt, 44: Tt, 60: Et, 80: [1, 86], 89: yt2, 95: [1, 83], 97: [1, 84], 101: 85, 105: Ft, 106: _t, 109: Bt, 111: vt, 114: Lt, 115: Vt, 116: It, 120: 87 }, s(y, [2, 185]), s(y, [2, 186]), s(y, [2, 187]), s(y, [2, 188]), s(kt, [2, 51]), s(kt, [2, 54], { 46: [1, 99] }), s(z, [2, 72], { 113: 112, 29: [1, 100], 44: C, 48: [1, 101], 50: [1, 102], 52: [1, 103], 54: [1, 104], 56: [1, 105], 58: [1, 106], 60: p, 63: [1, 107], 65: [1, 108], 67: [1, 109], 68: [1, 110], 70: [1, 111], 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 114: P, 115: O, 116: M }), s(q, [2, 181]), s(q, [2, 142]), s(q, [2, 143]), s(q, [2, 144]), s(q, [2, 145]), s(q, [2, 146]), s(q, [2, 147]), s(q, [2, 148]), s(q, [2, 149]), s(q, [2, 150]), s(q, [2, 151]), s(q, [2, 152]), s(u, [2, 12]), s(u, [2, 18]), s(u, [2, 19]), { 9: [1, 113] }, s(n1, [2, 26], { 18: 114, 10: dt }), s(y, [2, 27]), { 42: 115, 43: 38, 44: C, 45: 39, 47: 40, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, s(y, [2, 40]), s(y, [2, 41]), s(y, [2, 42]), s(wt, [2, 76], { 73: 116, 62: [1, 118], 74: [1, 117] }), { 76: 119, 79: 120, 80: u1, 81: o1, 116: Kt, 119: Yt }, { 75: [1, 125], 77: [1, 126] }, s(l1, [2, 83]), s(y, [2, 28]), s(y, [2, 29]), s(y, [2, 30]), s(y, [2, 31]), s(y, [2, 32]), { 10: c1, 12: h1, 14: p1, 27: d1, 28: 127, 32: f1, 44: g1, 60: b1, 75: A1, 80: [1, 129], 81: [1, 130], 83: 140, 84: k1, 85: m1, 86: C1, 87: S1, 88: D1, 89: x1, 90: T1, 91: 128, 105: E1, 109: y1, 111: F1, 114: _1, 115: B1, 116: v1 }, s(Qt, o, { 5: 153 }), s(y, [2, 37]), s(y, [2, 38]), s(Dt, [2, 48], { 44: L1 }), s(Dt, [2, 49], { 18: 155, 10: dt, 40: V1 }), s(kt, [2, 44]), { 44: C, 47: 157, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, { 102: [1, 158], 103: 159, 105: [1, 160] }, { 44: C, 47: 161, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, { 44: C, 47: 162, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, s(B, [2, 107], { 10: [1, 163], 96: [1, 164] }), { 80: [1, 165] }, s(B, [2, 115], { 120: 167, 10: [1, 166], 14: xt, 44: Tt, 60: Et, 89: yt2, 105: Ft, 106: _t, 109: Bt, 111: vt, 114: Lt, 115: Vt, 116: It }), s(B, [2, 117], { 10: [1, 168] }), s(H, [2, 183]), s(H, [2, 170]), s(H, [2, 171]), s(H, [2, 172]), s(H, [2, 173]), s(H, [2, 174]), s(H, [2, 175]), s(H, [2, 176]), s(H, [2, 177]), s(H, [2, 178]), s(H, [2, 179]), s(H, [2, 180]), { 44: C, 47: 169, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, { 30: 170, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 178, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 180, 50: [1, 179], 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 181, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 182, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 183, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 109: [1, 184] }, { 30: 185, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 186, 65: [1, 187], 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 188, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 189, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 30: 190, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, s(q, [2, 182]), s(u, [2, 20]), s(n1, [2, 25]), s(Dt, [2, 46], { 39: 191, 18: 192, 10: dt, 40: a1 }), s(wt, [2, 73], { 10: [1, 193] }), { 10: [1, 194] }, { 30: 195, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 77: [1, 196], 79: 197, 116: Kt, 119: Yt }, s(Rt, [2, 79]), s(Rt, [2, 81]), s(Rt, [2, 82]), s(Rt, [2, 168]), s(Rt, [2, 169]), { 76: 198, 79: 120, 80: u1, 81: o1, 116: Kt, 119: Yt }, s(l1, [2, 84]), { 8: et, 9: st, 10: c1, 11: it, 12: h1, 14: p1, 21: 200, 27: d1, 29: [1, 199], 32: f1, 44: g1, 60: b1, 75: A1, 83: 140, 84: k1, 85: m1, 86: C1, 87: S1, 88: D1, 89: x1, 90: T1, 91: 201, 105: E1, 109: y1, 111: F1, 114: _1, 115: B1, 116: v1 }, s(F, [2, 101]), s(F, [2, 103]), s(F, [2, 104]), s(F, [2, 157]), s(F, [2, 158]), s(F, [2, 159]), s(F, [2, 160]), s(F, [2, 161]), s(F, [2, 162]), s(F, [2, 163]), s(F, [2, 164]), s(F, [2, 165]), s(F, [2, 166]), s(F, [2, 167]), s(F, [2, 90]), s(F, [2, 91]), s(F, [2, 92]), s(F, [2, 93]), s(F, [2, 94]), s(F, [2, 95]), s(F, [2, 96]), s(F, [2, 97]), s(F, [2, 98]), s(F, [2, 99]), s(F, [2, 100]), { 6: 11, 7: 12, 8: f, 9: c, 10: A, 11: r, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: k, 32: [1, 202], 33: 24, 34: E, 36: b, 38: L, 42: 28, 43: 38, 44: C, 45: 39, 47: 40, 60: p, 84: J, 85: W, 86: Z, 87: At, 88: Mt, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M, 121: Ut, 122: Wt, 123: zt, 124: jt }, { 10: dt, 18: 203 }, { 44: [1, 204] }, s(kt, [2, 43]), { 10: [1, 205], 44: C, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 112, 114: P, 115: O, 116: M }, { 10: [1, 206] }, { 10: [1, 207], 106: [1, 208] }, s(I1, [2, 128]), { 10: [1, 209], 44: C, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 112, 114: P, 115: O, 116: M }, { 10: [1, 210], 44: C, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 112, 114: P, 115: O, 116: M }, { 80: [1, 211] }, s(B, [2, 109], { 10: [1, 212] }), s(B, [2, 111], { 10: [1, 213] }), { 80: [1, 214] }, s(H, [2, 184]), { 80: [1, 215], 98: [1, 216] }, s(kt, [2, 55], { 113: 112, 44: C, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 114: P, 115: O, 116: M }), { 31: [1, 217], 67: S, 82: 218, 116: D, 117: x, 118: T }, s(ft, [2, 86]), s(ft, [2, 88]), s(ft, [2, 89]), s(ft, [2, 153]), s(ft, [2, 154]), s(ft, [2, 155]), s(ft, [2, 156]), { 49: [1, 219], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 30: 220, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 51: [1, 221], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 53: [1, 222], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 55: [1, 223], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 57: [1, 224], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 60: [1, 225] }, { 64: [1, 226], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 66: [1, 227], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 30: 228, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, { 31: [1, 229], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 67: S, 69: [1, 230], 71: [1, 231], 82: 218, 116: D, 117: x, 118: T }, { 67: S, 69: [1, 233], 71: [1, 232], 82: 218, 116: D, 117: x, 118: T }, s(Dt, [2, 45], { 18: 155, 10: dt, 40: V1 }), s(Dt, [2, 47], { 44: L1 }), s(wt, [2, 75]), s(wt, [2, 74]), { 62: [1, 234], 67: S, 82: 218, 116: D, 117: x, 118: T }, s(wt, [2, 77]), s(Rt, [2, 80]), { 77: [1, 235], 79: 197, 116: Kt, 119: Yt }, { 30: 236, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, s(Qt, o, { 5: 237 }), s(F, [2, 102]), s(y, [2, 35]), { 43: 238, 44: C, 45: 39, 47: 40, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, { 10: dt, 18: 239 }, { 10: rt, 60: at, 84: nt, 92: 240, 105: ut, 107: 241, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, { 10: rt, 60: at, 84: nt, 92: 251, 104: [1, 252], 105: ut, 107: 241, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, { 10: rt, 60: at, 84: nt, 92: 253, 104: [1, 254], 105: ut, 107: 241, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, { 105: [1, 255] }, { 10: rt, 60: at, 84: nt, 92: 256, 105: ut, 107: 241, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, { 44: C, 47: 257, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, s(B, [2, 108]), { 80: [1, 258] }, { 80: [1, 259], 98: [1, 260] }, s(B, [2, 116]), s(B, [2, 118], { 10: [1, 261] }), s(B, [2, 119]), s(z, [2, 56]), s(ft, [2, 87]), s(z, [2, 57]), { 51: [1, 262], 67: S, 82: 218, 116: D, 117: x, 118: T }, s(z, [2, 64]), s(z, [2, 59]), s(z, [2, 60]), s(z, [2, 61]), { 109: [1, 263] }, s(z, [2, 63]), s(z, [2, 65]), { 66: [1, 264], 67: S, 82: 218, 116: D, 117: x, 118: T }, s(z, [2, 67]), s(z, [2, 68]), s(z, [2, 70]), s(z, [2, 69]), s(z, [2, 71]), s([10, 44, 60, 89, 102, 105, 106, 109, 111, 114, 115, 116], [2, 85]), s(wt, [2, 78]), { 31: [1, 265], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 6: 11, 7: 12, 8: f, 9: c, 10: A, 11: r, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: k, 32: [1, 266], 33: 24, 34: E, 36: b, 38: L, 42: 28, 43: 38, 44: C, 45: 39, 47: 40, 60: p, 84: J, 85: W, 86: Z, 87: At, 88: Mt, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M, 121: Ut, 122: Wt, 123: zt, 124: jt }, s(kt, [2, 53]), { 43: 267, 44: C, 45: 39, 47: 40, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M }, s(B, [2, 121], { 106: Nt }), s(w1, [2, 130], { 108: 269, 10: rt, 60: at, 84: nt, 105: ut, 109: ot, 110: lt, 111: ct, 112: ht }), s($, [2, 132]), s($, [2, 134]), s($, [2, 135]), s($, [2, 136]), s($, [2, 137]), s($, [2, 138]), s($, [2, 139]), s($, [2, 140]), s($, [2, 141]), s(B, [2, 122], { 106: Nt }), { 10: [1, 270] }, s(B, [2, 123], { 106: Nt }), { 10: [1, 271] }, s(I1, [2, 129]), s(B, [2, 105], { 106: Nt }), s(B, [2, 106], { 113: 112, 44: C, 60: p, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 114: P, 115: O, 116: M }), s(B, [2, 110]), s(B, [2, 112], { 10: [1, 272] }), s(B, [2, 113]), { 98: [1, 273] }, { 51: [1, 274] }, { 62: [1, 275] }, { 66: [1, 276] }, { 8: et, 9: st, 11: it, 21: 277 }, s(y, [2, 34]), s(kt, [2, 52]), { 10: rt, 60: at, 84: nt, 105: ut, 107: 278, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, s($, [2, 133]), { 14: xt, 44: Tt, 60: Et, 89: yt2, 101: 279, 105: Ft, 106: _t, 109: Bt, 111: vt, 114: Lt, 115: Vt, 116: It, 120: 87 }, { 14: xt, 44: Tt, 60: Et, 89: yt2, 101: 280, 105: Ft, 106: _t, 109: Bt, 111: vt, 114: Lt, 115: Vt, 116: It, 120: 87 }, { 98: [1, 281] }, s(B, [2, 120]), s(z, [2, 58]), { 30: 282, 67: S, 80: j, 81: K, 82: 171, 116: D, 117: x, 118: T }, s(z, [2, 66]), s(Qt, o, { 5: 283 }), s(w1, [2, 131], { 108: 269, 10: rt, 60: at, 84: nt, 105: ut, 109: ot, 110: lt, 111: ct, 112: ht }), s(B, [2, 126], { 120: 167, 10: [1, 284], 14: xt, 44: Tt, 60: Et, 89: yt2, 105: Ft, 106: _t, 109: Bt, 111: vt, 114: Lt, 115: Vt, 116: It }), s(B, [2, 127], { 120: 167, 10: [1, 285], 14: xt, 44: Tt, 60: Et, 89: yt2, 105: Ft, 106: _t, 109: Bt, 111: vt, 114: Lt, 115: Vt, 116: It }), s(B, [2, 114]), { 31: [1, 286], 67: S, 82: 218, 116: D, 117: x, 118: T }, { 6: 11, 7: 12, 8: f, 9: c, 10: A, 11: r, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: k, 32: [1, 287], 33: 24, 34: E, 36: b, 38: L, 42: 28, 43: 38, 44: C, 45: 39, 47: 40, 60: p, 84: J, 85: W, 86: Z, 87: At, 88: Mt, 89: V, 102: I, 105: w, 106: R2, 109: N, 111: G, 113: 41, 114: P, 115: O, 116: M, 121: Ut, 122: Wt, 123: zt, 124: jt }, { 10: rt, 60: at, 84: nt, 92: 288, 105: ut, 107: 241, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, { 10: rt, 60: at, 84: nt, 92: 289, 105: ut, 107: 241, 108: 242, 109: ot, 110: lt, 111: ct, 112: ht }, s(z, [2, 62]), s(y, [2, 33]), s(B, [2, 124], { 106: Nt }), s(B, [2, 125], { 106: Nt })],
    defaultActions: {},
    parseError: /* @__PURE__ */ m(function(h, d2) {
      if (d2.recoverable)
        this.trace(h);
      else {
        var g2 = new Error(h);
        throw g2.hash = d2, g2;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m(function(h) {
      var d2 = this, g2 = [0], l2 = [], _ = [null], t = [], Pt = this.table, e2 = "", v = 0, R1 = 0, z1 = 2, N1 = 1, j1 = t.slice.call(arguments, 1), U = Object.create(this.lexer), mt = { yy: {} };
      for (var Zt in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, Zt) && (mt.yy[Zt] = this.yy[Zt]);
      U.setInput(h, mt.yy), mt.yy.lexer = U, mt.yy.parser = this, typeof U.yylloc > "u" && (U.yylloc = {});
      var $t = U.yylloc;
      t.push($t);
      var K1 = U.options && U.options.ranges;
      typeof mt.yy.parseError == "function" ? this.parseError = mt.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Y1(X) {
        g2.length = g2.length - 2 * X, _.length = _.length - X, t.length = t.length - X;
      }
      m(Y1, "popStack");
      function G1() {
        var X;
        return X = l2.pop() || U.lex() || N1, typeof X != "number" && (X instanceof Array && (l2 = X, X = l2.pop()), X = d2.symbols_[X] || X), X;
      }
      m(G1, "lex");
      for (var Y, Ct, Q, t1, Gt = {}, Ht, pt, P1, Xt; ; ) {
        if (Ct = g2[g2.length - 1], this.defaultActions[Ct] ? Q = this.defaultActions[Ct] : ((Y === null || typeof Y > "u") && (Y = G1()), Q = Pt[Ct] && Pt[Ct][Y]), typeof Q > "u" || !Q.length || !Q[0]) {
          var e1 = "";
          Xt = [];
          for (Ht in Pt[Ct])
            this.terminals_[Ht] && Ht > z1 && Xt.push("'" + this.terminals_[Ht] + "'");
          U.showPosition ? e1 = "Parse error on line " + (v + 1) + `:
` + U.showPosition() + `
Expecting ` + Xt.join(", ") + ", got '" + (this.terminals_[Y] || Y) + "'" : e1 = "Parse error on line " + (v + 1) + ": Unexpected " + (Y == N1 ? "end of input" : "'" + (this.terminals_[Y] || Y) + "'"), this.parseError(e1, {
            text: U.match,
            token: this.terminals_[Y] || Y,
            line: U.yylineno,
            loc: $t,
            expected: Xt
          });
        }
        if (Q[0] instanceof Array && Q.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + Ct + ", token: " + Y);
        switch (Q[0]) {
          case 1:
            g2.push(Y), _.push(U.yytext), t.push(U.yylloc), g2.push(Q[1]), Y = null, R1 = U.yyleng, e2 = U.yytext, v = U.yylineno, $t = U.yylloc;
            break;
          case 2:
            if (pt = this.productions_[Q[1]][1], Gt.$ = _[_.length - pt], Gt._$ = {
              first_line: t[t.length - (pt || 1)].first_line,
              last_line: t[t.length - 1].last_line,
              first_column: t[t.length - (pt || 1)].first_column,
              last_column: t[t.length - 1].last_column
            }, K1 && (Gt._$.range = [
              t[t.length - (pt || 1)].range[0],
              t[t.length - 1].range[1]
            ]), t1 = this.performAction.apply(Gt, [
              e2,
              R1,
              v,
              mt.yy,
              Q[1],
              _,
              t
            ].concat(j1)), typeof t1 < "u")
              return t1;
            pt && (g2 = g2.slice(0, -1 * pt * 2), _ = _.slice(0, -1 * pt), t = t.slice(0, -1 * pt)), g2.push(this.productions_[Q[1]][0]), _.push(Gt.$), t.push(Gt._$), P1 = Pt[g2[g2.length - 2]][g2[g2.length - 1]], g2.push(P1);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, W1 = /* @__PURE__ */ function() {
    var gt2 = {
      EOF: 1,
      parseError: /* @__PURE__ */ m(function(d2, g2) {
        if (this.yy.parser)
          this.yy.parser.parseError(d2, g2);
        else
          throw new Error(d2);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m(function(h, d2) {
        return this.yy = d2 || this.yy || {}, this._input = h, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m(function() {
        var h = this._input[0];
        this.yytext += h, this.yyleng++, this.offset++, this.match += h, this.matched += h;
        var d2 = h.match(/(?:\r\n?|\n).*/g);
        return d2 ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), h;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m(function(h) {
        var d2 = h.length, g2 = h.split(/(?:\r\n?|\n)/g);
        this._input = h + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - d2), this.offset -= d2;
        var l2 = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), g2.length - 1 && (this.yylineno -= g2.length - 1);
        var _ = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: g2 ? (g2.length === l2.length ? this.yylloc.first_column : 0) + l2[l2.length - g2.length].length - g2[0].length : this.yylloc.first_column - d2
        }, this.options.ranges && (this.yylloc.range = [_[0], _[0] + this.yyleng - d2]), this.yyleng = this.yytext.length, this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: /* @__PURE__ */ m(function() {
        return this._more = true, this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: /* @__PURE__ */ m(function() {
        if (this.options.backtrack_lexer)
          this._backtrack = true;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      }, "reject"),
      // retain first n characters of the match
      less: /* @__PURE__ */ m(function(h) {
        this.unput(this.match.slice(h));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m(function() {
        var h = this.matched.substr(0, this.matched.length - this.match.length);
        return (h.length > 20 ? "..." : "") + h.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m(function() {
        var h = this.match;
        return h.length < 20 && (h += this._input.substr(0, 20 - h.length)), (h.substr(0, 20) + (h.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m(function() {
        var h = this.pastInput(), d2 = new Array(h.length + 1).join("-");
        return h + this.upcomingInput() + `
` + d2 + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m(function(h, d2) {
        var g2, l2, _;
        if (this.options.backtrack_lexer && (_ = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (_.yylloc.range = this.yylloc.range.slice(0))), l2 = h[0].match(/(?:\r\n?|\n).*/g), l2 && (this.yylineno += l2.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: l2 ? l2[l2.length - 1].length - l2[l2.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + h[0].length
        }, this.yytext += h[0], this.match += h[0], this.matches = h, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(h[0].length), this.matched += h[0], g2 = this.performAction.call(this, this.yy, this, d2, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), g2)
          return g2;
        if (this._backtrack) {
          for (var t in _)
            this[t] = _[t];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var h, d2, g2, l2;
        this._more || (this.yytext = "", this.match = "");
        for (var _ = this._currentRules(), t = 0; t < _.length; t++)
          if (g2 = this._input.match(this.rules[_[t]]), g2 && (!d2 || g2[0].length > d2[0].length)) {
            if (d2 = g2, l2 = t, this.options.backtrack_lexer) {
              if (h = this.test_match(g2, _[t]), h !== false)
                return h;
              if (this._backtrack) {
                d2 = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return d2 ? (h = this.test_match(d2, _[l2]), h !== false ? h : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ m(function() {
        var d2 = this.next();
        return d2 || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ m(function(d2) {
        this.conditionStack.push(d2);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ m(function() {
        var d2 = this.conditionStack.length - 1;
        return d2 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ m(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ m(function(d2) {
        return d2 = this.conditionStack.length - 1 - Math.abs(d2 || 0), d2 >= 0 ? this.conditionStack[d2] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ m(function(d2) {
        this.begin(d2);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ m(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: {},
      performAction: /* @__PURE__ */ m(function(d2, g2, l2, _) {
        switch (l2) {
          case 0:
            return this.begin("acc_title"), 34;
          case 1:
            return this.popState(), "acc_title_value";
          case 2:
            return this.begin("acc_descr"), 36;
          case 3:
            return this.popState(), "acc_descr_value";
          case 4:
            this.begin("acc_descr_multiline");
            break;
          case 5:
            this.popState();
            break;
          case 6:
            return "acc_descr_multiline_value";
          case 7:
            return this.pushState("shapeData"), g2.yytext = "", 40;
          case 8:
            return this.pushState("shapeDataStr"), 40;
          case 9:
            return this.popState(), 40;
          case 10:
            const t = /\n\s*/g;
            return g2.yytext = g2.yytext.replace(t, "<br/>"), 40;
          case 11:
            return 40;
          case 12:
            this.popState();
            break;
          case 13:
            this.begin("callbackname");
            break;
          case 14:
            this.popState();
            break;
          case 15:
            this.popState(), this.begin("callbackargs");
            break;
          case 16:
            return 95;
          case 17:
            this.popState();
            break;
          case 18:
            return 96;
          case 19:
            return "MD_STR";
          case 20:
            this.popState();
            break;
          case 21:
            this.begin("md_string");
            break;
          case 22:
            return "STR";
          case 23:
            this.popState();
            break;
          case 24:
            this.pushState("string");
            break;
          case 25:
            return 84;
          case 26:
            return 102;
          case 27:
            return 85;
          case 28:
            return 104;
          case 29:
            return 86;
          case 30:
            return 87;
          case 31:
            return 97;
          case 32:
            this.begin("click");
            break;
          case 33:
            this.popState();
            break;
          case 34:
            return 88;
          case 35:
            return d2.lex.firstGraph() && this.begin("dir"), 12;
          case 36:
            return d2.lex.firstGraph() && this.begin("dir"), 12;
          case 37:
            return d2.lex.firstGraph() && this.begin("dir"), 12;
          case 38:
            return 27;
          case 39:
            return 32;
          case 40:
            return 98;
          case 41:
            return 98;
          case 42:
            return 98;
          case 43:
            return 98;
          case 44:
            return this.popState(), 13;
          case 45:
            return this.popState(), 14;
          case 46:
            return this.popState(), 14;
          case 47:
            return this.popState(), 14;
          case 48:
            return this.popState(), 14;
          case 49:
            return this.popState(), 14;
          case 50:
            return this.popState(), 14;
          case 51:
            return this.popState(), 14;
          case 52:
            return this.popState(), 14;
          case 53:
            return this.popState(), 14;
          case 54:
            return this.popState(), 14;
          case 55:
            return 121;
          case 56:
            return 122;
          case 57:
            return 123;
          case 58:
            return 124;
          case 59:
            return 78;
          case 60:
            return 105;
          case 61:
            return 111;
          case 62:
            return 46;
          case 63:
            return 60;
          case 64:
            return 44;
          case 65:
            return 8;
          case 66:
            return 106;
          case 67:
            return 115;
          case 68:
            return this.popState(), 77;
          case 69:
            return this.pushState("edgeText"), 75;
          case 70:
            return 119;
          case 71:
            return this.popState(), 77;
          case 72:
            return this.pushState("thickEdgeText"), 75;
          case 73:
            return 119;
          case 74:
            return this.popState(), 77;
          case 75:
            return this.pushState("dottedEdgeText"), 75;
          case 76:
            return 119;
          case 77:
            return 77;
          case 78:
            return this.popState(), 53;
          case 79:
            return "TEXT";
          case 80:
            return this.pushState("ellipseText"), 52;
          case 81:
            return this.popState(), 55;
          case 82:
            return this.pushState("text"), 54;
          case 83:
            return this.popState(), 57;
          case 84:
            return this.pushState("text"), 56;
          case 85:
            return 58;
          case 86:
            return this.pushState("text"), 67;
          case 87:
            return this.popState(), 64;
          case 88:
            return this.pushState("text"), 63;
          case 89:
            return this.popState(), 49;
          case 90:
            return this.pushState("text"), 48;
          case 91:
            return this.popState(), 69;
          case 92:
            return this.popState(), 71;
          case 93:
            return 117;
          case 94:
            return this.pushState("trapText"), 68;
          case 95:
            return this.pushState("trapText"), 70;
          case 96:
            return 118;
          case 97:
            return 67;
          case 98:
            return 90;
          case 99:
            return "SEP";
          case 100:
            return 89;
          case 101:
            return 115;
          case 102:
            return 111;
          case 103:
            return 44;
          case 104:
            return 109;
          case 105:
            return 114;
          case 106:
            return 116;
          case 107:
            return this.popState(), 62;
          case 108:
            return this.pushState("text"), 62;
          case 109:
            return this.popState(), 51;
          case 110:
            return this.pushState("text"), 50;
          case 111:
            return this.popState(), 31;
          case 112:
            return this.pushState("text"), 29;
          case 113:
            return this.popState(), 66;
          case 114:
            return this.pushState("text"), 65;
          case 115:
            return "TEXT";
          case 116:
            return "QUOTE";
          case 117:
            return 9;
          case 118:
            return 10;
          case 119:
            return 11;
        }
      }, "anonymous"),
      rules: [/^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:@\{)/, /^(?:["])/, /^(?:["])/, /^(?:[^\"]+)/, /^(?:[^}^"]+)/, /^(?:\})/, /^(?:call[\s]+)/, /^(?:\([\s]*\))/, /^(?:\()/, /^(?:[^(]*)/, /^(?:\))/, /^(?:[^)]*)/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["][`])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:["])/, /^(?:style\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:href[\s])/, /^(?:click[\s]+)/, /^(?:[\s\n])/, /^(?:[^\s\n]*)/, /^(?:flowchart-elk\b)/, /^(?:graph\b)/, /^(?:flowchart\b)/, /^(?:subgraph\b)/, /^(?:end\b\s*)/, /^(?:_self\b)/, /^(?:_blank\b)/, /^(?:_parent\b)/, /^(?:_top\b)/, /^(?:(\r?\n)*\s*\n)/, /^(?:\s*LR\b)/, /^(?:\s*RL\b)/, /^(?:\s*TB\b)/, /^(?:\s*BT\b)/, /^(?:\s*TD\b)/, /^(?:\s*BR\b)/, /^(?:\s*<)/, /^(?:\s*>)/, /^(?:\s*\^)/, /^(?:\s*v\b)/, /^(?:.*direction\s+TB[^\n]*)/, /^(?:.*direction\s+BT[^\n]*)/, /^(?:.*direction\s+RL[^\n]*)/, /^(?:.*direction\s+LR[^\n]*)/, /^(?:[^\s\"]+@(?=[^\{\"]))/, /^(?:[0-9]+)/, /^(?:#)/, /^(?::::)/, /^(?::)/, /^(?:&)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?--\s*)/, /^(?:[^-]|-(?!-)+)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?==\s*)/, /^(?:[^=]|=(?!))/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?:\s*[xo<]?-\.\s*)/, /^(?:[^\.]|\.(?!))/, /^(?:\s*~~[\~]+\s*)/, /^(?:[-/\)][\)])/, /^(?:[^\(\)\[\]\{\}]|!\)+)/, /^(?:\(-)/, /^(?:\]\))/, /^(?:\(\[)/, /^(?:\]\])/, /^(?:\[\[)/, /^(?:\[\|)/, /^(?:>)/, /^(?:\)\])/, /^(?:\[\()/, /^(?:\)\)\))/, /^(?:\(\(\()/, /^(?:[\\(?=\])][\]])/, /^(?:\/(?=\])\])/, /^(?:\/(?!\])|\\(?!\])|[^\\\[\]\(\)\{\}\/]+)/, /^(?:\[\/)/, /^(?:\[\\)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\\\|)/, /^(?:v\b)/, /^(?:\*)/, /^(?:#)/, /^(?:&)/, /^(?:([A-Za-z0-9!"\#$%&'*+\.`?\\_\/]|-(?=[^\>\-\.])|(?!))+)/, /^(?:-)/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\|)/, /^(?:\|)/, /^(?:\))/, /^(?:\()/, /^(?:\])/, /^(?:\[)/, /^(?:(\}))/, /^(?:\{)/, /^(?:[^\[\]\(\)\{\}\|\"]+)/, /^(?:")/, /^(?:(\r?\n)+)/, /^(?:\s)/, /^(?:$)/],
      conditions: { shapeDataEndBracket: { rules: [21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, shapeDataStr: { rules: [9, 10, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, shapeData: { rules: [8, 11, 12, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, callbackargs: { rules: [17, 18, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, callbackname: { rules: [14, 15, 16, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, href: { rules: [21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, click: { rules: [21, 24, 33, 34, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, dottedEdgeText: { rules: [21, 24, 74, 76, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, thickEdgeText: { rules: [21, 24, 71, 73, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, edgeText: { rules: [21, 24, 68, 70, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, trapText: { rules: [21, 24, 77, 80, 82, 84, 88, 90, 91, 92, 93, 94, 95, 108, 110, 112, 114], inclusive: false }, ellipseText: { rules: [21, 24, 77, 78, 79, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, text: { rules: [21, 24, 77, 80, 81, 82, 83, 84, 87, 88, 89, 90, 94, 95, 107, 108, 109, 110, 111, 112, 113, 114, 115], inclusive: false }, vertex: { rules: [21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, dir: { rules: [21, 24, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, acc_descr_multiline: { rules: [5, 6, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, acc_descr: { rules: [3, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, acc_title: { rules: [1, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, md_string: { rules: [19, 20, 21, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, string: { rules: [21, 22, 23, 24, 77, 80, 82, 84, 88, 90, 94, 95, 108, 110, 112, 114], inclusive: false }, INITIAL: { rules: [0, 2, 4, 7, 13, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 74, 75, 77, 80, 82, 84, 85, 86, 88, 90, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 108, 110, 112, 114, 116, 117, 118, 119], inclusive: true } }
    };
    return gt2;
  }();
  Jt.lexer = W1;
  function qt() {
    this.yy = {};
  }
  return m(qt, "Parser"), qt.prototype = Jt, Jt.Parser = qt, new qt();
}();
r1.parser = r1;
var M1 = r1, U1 = Object.assign({}, M1);
U1.parse = (s) => {
  const i = s.replace(/}\s*\n/g, `}
`);
  return M1.parse(i);
};
var Ae = U1, ke = /* @__PURE__ */ m((s, i) => {
  const a = e, n = a(s, "r"), u = a(s, "g"), o = a(s, "b");
  return dn(n, u, o, i);
}, "fade"), me = /* @__PURE__ */ m((s) => `.label {
    font-family: ${s.fontFamily};
    color: ${s.nodeTextColor || s.textColor};
  }
  .cluster-label text {
    fill: ${s.titleColor};
  }
  .cluster-label span {
    color: ${s.titleColor};
  }
  .cluster-label span p {
    background-color: transparent;
  }

  .label text,span {
    fill: ${s.nodeTextColor || s.textColor};
    color: ${s.nodeTextColor || s.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${s.mainBkg};
    stroke: ${s.nodeBorder};
    stroke-width: 1px;
  }
  .rough-node .label text , .node .label text, .image-shape .label, .icon-shape .label {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .rough-node .label,.node .label, .image-shape .label, .icon-shape .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }


  .root .anchor path {
    fill: ${s.lineColor} !important;
    stroke-width: 0;
    stroke: ${s.lineColor};
  }

  .arrowheadPath {
    fill: ${s.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${s.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${s.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${s.edgeLabelBackground};
    p {
      background-color: ${s.edgeLabelBackground};
    }
    rect {
      opacity: 0.5;
      background-color: ${s.edgeLabelBackground};
      fill: ${s.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${ke(s.edgeLabelBackground, 0.5)};
    // background-color:
  }

  .cluster rect {
    fill: ${s.clusterBkg};
    stroke: ${s.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${s.titleColor};
  }

  .cluster span {
    color: ${s.titleColor};
  }
  /* .cluster div {
    color: ${s.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${s.fontFamily};
    font-size: 12px;
    background: ${s.tertiaryColor};
    border: 1px solid ${s.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${s.textColor};
  }

  rect.text {
    fill: none;
    stroke-width: 0;
  }

  .icon-shape, .image-shape {
    background-color: ${s.edgeLabelBackground};
    p {
      background-color: ${s.edgeLabelBackground};
      padding: 2px;
    }
    rect {
      opacity: 0.5;
      background-color: ${s.edgeLabelBackground};
      fill: ${s.edgeLabelBackground};
    }
    text-align: center;
  }
  ${l()}
`, "getStyles"), Ce = me, qs = {
  parser: Ae,
  get db() {
    return new de();
  },
  renderer: be,
  styles: Ce,
  init: /* @__PURE__ */ m((s) => {
    s.flowchart || (s.flowchart = {}), s.layout && vI({ layout: s.layout }), s.flowchart.arrowMarkerAbsolute = s.arrowMarkerAbsolute, vI({ flowchart: { arrowMarkerAbsolute: s.arrowMarkerAbsolute } });
  }, "init")
};
export {
  qs as diagram
};
