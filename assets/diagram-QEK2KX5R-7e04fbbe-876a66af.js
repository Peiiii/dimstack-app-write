import { ax as Lf, H as m, a7 as $5, a8 as B5, ak as R5, al as I5, a9 as D5, aa as F5, M as R, ay as lu, az as Xt, ar as M5, aK as bT, aQ as J6 } from "./app-33e0c163.js";
import { m as m$1 } from "./chunk-4BX2VUAB-fea36534-f9eeabfd.js";
import { Y as Yy } from "./mermaid-parser.core-6f66fbe8-f50f87bc.js";
import "./chakra-ui-1d60df8d.js";
import "./react-utils-0e8f4d03.js";
import "./_baseUniq-cfe137aa-75cabb2d.js";
import "./_basePickBy-9e57dae2-21bbebf4.js";
import "./monaco-45e206c0.js";
import "./vendor-75a482ef.js";
import "./common-utils-40e9b830.js";
import "./clone-66b7ef27-0fd17639.js";
var h = {
  showLegend: true,
  ticks: 5,
  max: null,
  min: 0,
  graticule: "circle"
}, w = {
  axes: [],
  curves: [],
  options: h
}, g = structuredClone(w), B = Lf.radar, j = /* @__PURE__ */ m(() => lu({
  ...B,
  ...Xt().radar
}), "getConfig"), b = /* @__PURE__ */ m(() => g.axes, "getAxes"), K = /* @__PURE__ */ m(() => g.curves, "getCurves"), N = /* @__PURE__ */ m(() => g.options, "getOptions"), U = /* @__PURE__ */ m((e) => {
  g.axes = e.map((t) => ({
    name: t.name,
    label: t.label ?? t.name
  }));
}, "setAxes"), X = /* @__PURE__ */ m((e) => {
  g.curves = e.map((t) => ({
    name: t.name,
    label: t.label ?? t.name,
    entries: Y(t.entries)
  }));
}, "setCurves"), Y = /* @__PURE__ */ m((e) => {
  if (e[0].axis == null)
    return e.map((r) => r.value);
  const t = b();
  if (t.length === 0)
    throw new Error("Axes must be populated before curves for reference entries");
  return t.map((r) => {
    const a = e.find((o) => {
      var s;
      return ((s = o.axis) == null ? void 0 : s.$refText) === r.name;
    });
    if (a === void 0)
      throw new Error("Missing entry for axis " + r.label);
    return a.value;
  });
}, "computeCurveEntries"), Z = /* @__PURE__ */ m((e) => {
  var r, a, o, s, n;
  const t = e.reduce(
    (i, l) => (i[l.name] = l, i),
    {}
  );
  g.options = {
    showLegend: ((r = t.showLegend) == null ? void 0 : r.value) ?? h.showLegend,
    ticks: ((a = t.ticks) == null ? void 0 : a.value) ?? h.ticks,
    max: ((o = t.max) == null ? void 0 : o.value) ?? h.max,
    min: ((s = t.min) == null ? void 0 : s.value) ?? h.min,
    graticule: ((n = t.graticule) == null ? void 0 : n.value) ?? h.graticule
  };
}, "setOptions"), q = /* @__PURE__ */ m(() => {
  M5(), g = structuredClone(w);
}, "clear"), $ = {
  getAxes: b,
  getCurves: K,
  getOptions: N,
  setAxes: U,
  setCurves: X,
  setOptions: Z,
  getConfig: j,
  clear: q,
  setAccTitle: $5,
  getAccTitle: B5,
  setDiagramTitle: R5,
  getDiagramTitle: I5,
  getAccDescription: D5,
  setAccDescription: F5
}, J = /* @__PURE__ */ m((e) => {
  m$1(e, $);
  const { axes: t, curves: r, options: a } = e;
  $.setAxes(t), $.setCurves(r), $.setOptions(a);
}, "populate"), Q = {
  parse: /* @__PURE__ */ m(async (e) => {
    const t = await Yy("radar", e);
    R.debug(t), J(t);
  }, "parse")
}, tt = /* @__PURE__ */ m((e, t, r, a) => {
  const o = a.db, s = o.getAxes(), n = o.getCurves(), i = o.getOptions(), l = o.getConfig(), m2 = o.getDiagramTitle(), d = bT(t), c = rt(d, l), u = i.max ?? Math.max(...n.map((f) => Math.max(...f.entries))), x = i.min, v = Math.min(l.width, l.height) / 2;
  et(c, s, v, i.ticks, i.graticule), at(c, s, v, l), M(c, s, n, x, u, i.graticule, l), T(c, n, i.showLegend, l), c.append("text").attr("class", "radarTitle").text(m2).attr("x", 0).attr("y", -l.height / 2 - l.marginTop);
}, "draw"), rt = /* @__PURE__ */ m((e, t) => {
  const r = t.width + t.marginLeft + t.marginRight, a = t.height + t.marginTop + t.marginBottom, o = {
    x: t.marginLeft + t.width / 2,
    y: t.marginTop + t.height / 2
  };
  return e.attr("viewbox", `0 0 ${r} ${a}`).attr("width", r).attr("height", a), e.append("g").attr("transform", `translate(${o.x}, ${o.y})`);
}, "drawFrame"), et = /* @__PURE__ */ m((e, t, r, a, o) => {
  if (o === "circle")
    for (let s = 0; s < a; s++) {
      const n = r * (s + 1) / a;
      e.append("circle").attr("r", n).attr("class", "radarGraticule");
    }
  else if (o === "polygon") {
    const s = t.length;
    for (let n = 0; n < a; n++) {
      const i = r * (n + 1) / a, l = t.map((m2, d) => {
        const c = 2 * d * Math.PI / s - Math.PI / 2, u = i * Math.cos(c), x = i * Math.sin(c);
        return `${u},${x}`;
      }).join(" ");
      e.append("polygon").attr("points", l).attr("class", "radarGraticule");
    }
  }
}, "drawGraticule"), at = /* @__PURE__ */ m((e, t, r, a) => {
  const o = t.length;
  for (let s = 0; s < o; s++) {
    const n = t[s].label, i = 2 * s * Math.PI / o - Math.PI / 2;
    e.append("line").attr("x1", 0).attr("y1", 0).attr("x2", r * a.axisScaleFactor * Math.cos(i)).attr("y2", r * a.axisScaleFactor * Math.sin(i)).attr("class", "radarAxisLine"), e.append("text").text(n).attr("x", r * a.axisLabelFactor * Math.cos(i)).attr("y", r * a.axisLabelFactor * Math.sin(i)).attr("class", "radarAxisLabel");
  }
}, "drawAxes");
function M(e, t, r, a, o, s, n) {
  const i = t.length, l = Math.min(n.width, n.height) / 2;
  r.forEach((m2, d) => {
    if (m2.entries.length !== i)
      return;
    const c = m2.entries.map((u, x) => {
      const v = 2 * Math.PI * x / i - Math.PI / 2, f = A(u, a, o, l), O = f * Math.cos(v), S = f * Math.sin(v);
      return { x: O, y: S };
    });
    s === "circle" ? e.append("path").attr("d", L(c, n.curveTension)).attr("class", `radarCurve-${d}`) : s === "polygon" && e.append("polygon").attr("points", c.map((u) => `${u.x},${u.y}`).join(" ")).attr("class", `radarCurve-${d}`);
  });
}
m(M, "drawCurves");
function A(e, t, r, a) {
  const o = Math.min(Math.max(e, t), r);
  return a * (o - t) / (r - t);
}
m(A, "relativeRadius");
function L(e, t) {
  const r = e.length;
  let a = `M${e[0].x},${e[0].y}`;
  for (let o = 0; o < r; o++) {
    const s = e[(o - 1 + r) % r], n = e[o], i = e[(o + 1) % r], l = e[(o + 2) % r], m2 = {
      x: n.x + (i.x - s.x) * t,
      y: n.y + (i.y - s.y) * t
    }, d = {
      x: i.x - (l.x - n.x) * t,
      y: i.y - (l.y - n.y) * t
    };
    a += ` C${m2.x},${m2.y} ${d.x},${d.y} ${i.x},${i.y}`;
  }
  return `${a} Z`;
}
m(L, "closedRoundCurve");
function T(e, t, r, a) {
  if (!r)
    return;
  const o = (a.width / 2 + a.marginRight) * 3 / 4, s = -(a.height / 2 + a.marginTop) * 3 / 4, n = 20;
  t.forEach((i, l) => {
    const m2 = e.append("g").attr("transform", `translate(${o}, ${s + l * n})`);
    m2.append("rect").attr("width", 12).attr("height", 12).attr("class", `radarLegendBox-${l}`), m2.append("text").attr("x", 16).attr("y", 0).attr("class", "radarLegendText").text(i.label);
  });
}
m(T, "drawLegend");
var ot = { draw: tt }, it = /* @__PURE__ */ m((e, t) => {
  let r = "";
  for (let a = 0; a < e.THEME_COLOR_LIMIT; a++) {
    const o = e[`cScale${a}`];
    r += `
		.radarCurve-${a} {
			color: ${o};
			fill: ${o};
			fill-opacity: ${t.curveOpacity};
			stroke: ${o};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${a} {
			fill: ${o};
			fill-opacity: ${t.curveOpacity};
			stroke: ${o};
		}
		`;
  }
  return r;
}, "genIndexStyles"), st = /* @__PURE__ */ m((e) => {
  const t = J6(), r = Xt(), a = lu(t, r.themeVariables), o = lu(a.radar, e);
  return { themeVariables: a, radarOptions: o };
}, "buildRadarStyleOptions"), nt = /* @__PURE__ */ m(({ radar: e } = {}) => {
  const { themeVariables: t, radarOptions: r } = st(e);
  return `
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${r.axisColor};
		stroke-width: ${r.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${r.axisLabelFontSize}px;
		color: ${r.axisColor};
	}
	.radarGraticule {
		fill: ${r.graticuleColor};
		fill-opacity: ${r.graticuleOpacity};
		stroke: ${r.graticuleColor};
		stroke-width: ${r.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${r.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${it(t, r)}
	`;
}, "styles"), Dr = {
  parser: Q,
  db: $,
  renderer: ot,
  styles: nt
};
export {
  Dr as diagram
};
