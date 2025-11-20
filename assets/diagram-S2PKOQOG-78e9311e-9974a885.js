import { ax as Lf, H as m, a7 as $5, a8 as B5, ak as R5, al as I5, a9 as D5, aa as F5, ay as lu, az as Xt, ar as M5, M as R, aK as bT, ah as Of } from "./app-33e0c163.js";
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
var L = Lf.packet, b, v = (b = class {
  constructor() {
    this.packet = [], this.setAccTitle = $5, this.getAccTitle = B5, this.setDiagramTitle = R5, this.getDiagramTitle = I5, this.getAccDescription = D5, this.setAccDescription = F5;
  }
  getConfig() {
    const t = lu({
      ...L,
      ...Xt().packet
    });
    return t.showBits && (t.paddingY += 10), t;
  }
  getPacket() {
    return this.packet;
  }
  pushWord(t) {
    t.length > 0 && this.packet.push(t);
  }
  clear() {
    M5(), this.packet = [];
  }
}, m(b, "PacketDB"), b), M = 1e4, Y = /* @__PURE__ */ m((r, t) => {
  m$1(r, t);
  let i = -1, o = [], p = 1;
  const { bitsPerRow: n } = t.getConfig();
  for (let { start: e, end: s, bits: c, label: l } of r.blocks) {
    if (e !== void 0 && s !== void 0 && s < e)
      throw new Error(`Packet block ${e} - ${s} is invalid. End must be greater than start.`);
    if (e ?? (e = i + 1), e !== i + 1)
      throw new Error(
        `Packet block ${e} - ${s ?? e} is not contiguous. It should start from ${i + 1}.`
      );
    if (c === 0)
      throw new Error(`Packet block ${e} is invalid. Cannot have a zero bit field.`);
    for (s ?? (s = e + (c ?? 1) - 1), c ?? (c = s - e + 1), i = s, R.debug(`Packet block ${e} - ${i} with label ${l}`); o.length <= n + 1 && t.getPacket().length < M; ) {
      const [m2, a] = H({ start: e, end: s, bits: c, label: l }, p, n);
      if (o.push(m2), m2.end + 1 === p * n && (t.pushWord(o), o = [], p++), !a)
        break;
      ({ start: e, end: s, bits: c, label: l } = a);
    }
  }
  t.pushWord(o);
}, "populate"), H = /* @__PURE__ */ m((r, t, i) => {
  if (r.start === void 0)
    throw new Error("start should have been set during first phase");
  if (r.end === void 0)
    throw new Error("end should have been set during first phase");
  if (r.start > r.end)
    throw new Error(`Block start ${r.start} is greater than block end ${r.end}.`);
  if (r.end + 1 <= t * i)
    return [r, void 0];
  const o = t * i - 1, p = t * i;
  return [
    {
      start: r.start,
      end: o,
      label: r.label,
      bits: o - r.start
    },
    {
      start: p,
      end: r.end,
      label: r.label,
      bits: r.end - p
    }
  ];
}, "getNextFittingBlock"), x = {
  // @ts-expect-error - PacketDB is not assignable to DiagramDB
  parser: { yy: void 0 },
  parse: /* @__PURE__ */ m(async (r) => {
    var o;
    const t = await Yy("packet", r), i = (o = x.parser) == null ? void 0 : o.yy;
    if (!(i instanceof v))
      throw new Error(
        "parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues."
      );
    R.debug(t), Y(t, i);
  }, "parse")
}, I = /* @__PURE__ */ m((r, t, i, o) => {
  const p = o.db, n = p.getConfig(), { rowHeight: e, paddingY: s, bitWidth: c, bitsPerRow: l } = n, m2 = p.getPacket(), a = p.getDiagramTitle(), g = e + s, d = g * (m2.length + 1) - (a ? 0 : e), h = c * l + 2, k = bT(t);
  k.attr("viewbox", `0 0 ${h} ${d}`), Of(k, d, h, n.useMaxWidth);
  for (const [y, $] of m2.entries())
    O(k, $, y, n);
  k.append("text").text(a).attr("x", h / 2).attr("y", d - g / 2).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("class", "packetTitle");
}, "draw"), O = /* @__PURE__ */ m((r, t, i, { rowHeight: o, paddingX: p, paddingY: n, bitWidth: e, bitsPerRow: s, showBits: c }) => {
  const l = r.append("g"), m2 = i * (o + n) + n;
  for (const a of t) {
    const g = a.start % s * e + 1, d = (a.end - a.start + 1) * e - p;
    if (l.append("rect").attr("x", g).attr("y", m2).attr("width", d).attr("height", o).attr("class", "packetBlock"), l.append("text").attr("x", g + d / 2).attr("y", m2 + o / 2).attr("class", "packetLabel").attr("dominant-baseline", "middle").attr("text-anchor", "middle").text(a.label), !c)
      continue;
    const h = a.end === a.start, k = m2 - 2;
    l.append("text").attr("x", g + (h ? d / 2 : 0)).attr("y", k).attr("class", "packetByte start").attr("dominant-baseline", "auto").attr("text-anchor", h ? "middle" : "start").text(a.start), h || l.append("text").attr("x", g + d).attr("y", k).attr("class", "packetByte end").attr("dominant-baseline", "auto").attr("text-anchor", "end").text(a.end);
  }
}, "drawWord"), j = { draw: I }, G = {
  byteFontSize: "10px",
  startByteColor: "black",
  endByteColor: "black",
  labelColor: "black",
  labelFontSize: "12px",
  titleColor: "black",
  titleFontSize: "14px",
  blockStrokeColor: "black",
  blockStrokeWidth: "1",
  blockFillColor: "#efefef"
}, K = /* @__PURE__ */ m(({ packet: r } = {}) => {
  const t = lu(G, r);
  return `
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`;
}, "styles"), wr = {
  parser: x,
  get db() {
    return new v();
  },
  renderer: j,
  styles: K
};
export {
  wr as diagram
};
