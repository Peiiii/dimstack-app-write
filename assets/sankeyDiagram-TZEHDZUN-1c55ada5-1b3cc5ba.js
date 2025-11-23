import { H as m, O as yt$1, a8 as x5, a7 as b5, a9 as w5, aa as y5, al as _5, ak as k5, ar as m5, ad as Ii, as as hI, a6 as gt$1, bk as d5 } from "./app-254b8ee7.js";
import { h } from "./ordinal-980380c7-3546a010.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
import "./init-f9637058-7f0fc388.js";
function Nt(t) {
  for (var e = t.length / 6 | 0, i = new Array(e), a = 0; a < e; )
    i[a] = "#" + t.slice(a * 6, ++a * 6);
  return i;
}
const It = Nt("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
function ct(t, e) {
  let i;
  if (e === void 0)
    for (const a of t)
      a != null && (i < a || i === void 0 && a >= a) && (i = a);
  else {
    let a = -1;
    for (let h2 of t)
      (h2 = e(h2, ++a, t)) != null && (i < h2 || i === void 0 && h2 >= h2) && (i = h2);
  }
  return i;
}
function gt(t, e) {
  let i;
  if (e === void 0)
    for (const a of t)
      a != null && (i > a || i === void 0 && a >= a) && (i = a);
  else {
    let a = -1;
    for (let h2 of t)
      (h2 = e(h2, ++a, t)) != null && (i > h2 || i === void 0 && h2 >= h2) && (i = h2);
  }
  return i;
}
function nt(t, e) {
  let i = 0;
  if (e === void 0)
    for (let a of t)
      (a = +a) && (i += a);
  else {
    let a = -1;
    for (let h2 of t)
      (h2 = +e(h2, ++a, t)) && (i += h2);
  }
  return i;
}
function Pt(t) {
  return t.target.depth;
}
function Ct(t) {
  return t.depth;
}
function Ot(t, e) {
  return e - 1 - t.height;
}
function mt(t, e) {
  return t.sourceLinks.length ? t.depth : e - 1;
}
function Dt(t) {
  return t.targetLinks.length ? t.depth : t.sourceLinks.length ? gt(t.sourceLinks, Pt) - 1 : 0;
}
function q(t) {
  return function() {
    return t;
  };
}
function ut(t, e) {
  return Q(t.source, e.source) || t.index - e.index;
}
function ht(t, e) {
  return Q(t.target, e.target) || t.index - e.index;
}
function Q(t, e) {
  return t.y0 - e.y0;
}
function it(t) {
  return t.value;
}
function $t(t) {
  return t.index;
}
function jt(t) {
  return t.nodes;
}
function zt(t) {
  return t.links;
}
function ft(t, e) {
  const i = t.get(e);
  if (!i)
    throw new Error("missing: " + e);
  return i;
}
function pt({ nodes: t }) {
  for (const e of t) {
    let i = e.y0, a = i;
    for (const h2 of e.sourceLinks)
      h2.y0 = i + h2.width / 2, i += h2.width;
    for (const h2 of e.targetLinks)
      h2.y1 = a + h2.width / 2, a += h2.width;
  }
}
function Bt() {
  let t = 0, e = 0, i = 1, a = 1, h2 = 24, y = 8, m2, _ = $t, r = mt, o, l, x = jt, v = zt, p = 6;
  function b() {
    const n = { nodes: x.apply(null, arguments), links: v.apply(null, arguments) };
    return M(n), T(n), N(n), C(n), S(n), pt(n), n;
  }
  b.update = function(n) {
    return pt(n), n;
  }, b.nodeId = function(n) {
    return arguments.length ? (_ = typeof n == "function" ? n : q(n), b) : _;
  }, b.nodeAlign = function(n) {
    return arguments.length ? (r = typeof n == "function" ? n : q(n), b) : r;
  }, b.nodeSort = function(n) {
    return arguments.length ? (o = n, b) : o;
  }, b.nodeWidth = function(n) {
    return arguments.length ? (h2 = +n, b) : h2;
  }, b.nodePadding = function(n) {
    return arguments.length ? (y = m2 = +n, b) : y;
  }, b.nodes = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : q(n), b) : x;
  }, b.links = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : q(n), b) : v;
  }, b.linkSort = function(n) {
    return arguments.length ? (l = n, b) : l;
  }, b.size = function(n) {
    return arguments.length ? (t = e = 0, i = +n[0], a = +n[1], b) : [i - t, a - e];
  }, b.extent = function(n) {
    return arguments.length ? (t = +n[0][0], i = +n[1][0], e = +n[0][1], a = +n[1][1], b) : [[t, e], [i, a]];
  }, b.iterations = function(n) {
    return arguments.length ? (p = +n, b) : p;
  };
  function M({ nodes: n, links: f }) {
    for (const [c, s] of n.entries())
      s.index = c, s.sourceLinks = [], s.targetLinks = [];
    const u = new Map(n.map((c, s) => [_(c, s, n), c]));
    for (const [c, s] of f.entries()) {
      s.index = c;
      let { source: k, target: w } = s;
      typeof k != "object" && (k = s.source = ft(u, k)), typeof w != "object" && (w = s.target = ft(u, w)), k.sourceLinks.push(s), w.targetLinks.push(s);
    }
    if (l != null)
      for (const { sourceLinks: c, targetLinks: s } of n)
        c.sort(l), s.sort(l);
  }
  function T({ nodes: n }) {
    for (const f of n)
      f.value = f.fixedValue === void 0 ? Math.max(nt(f.sourceLinks, it), nt(f.targetLinks, it)) : f.fixedValue;
  }
  function N({ nodes: n }) {
    const f = n.length;
    let u = new Set(n), c = /* @__PURE__ */ new Set(), s = 0;
    for (; u.size; ) {
      for (const k of u) {
        k.depth = s;
        for (const { target: w } of k.sourceLinks)
          c.add(w);
      }
      if (++s > f)
        throw new Error("circular link");
      u = c, c = /* @__PURE__ */ new Set();
    }
  }
  function C({ nodes: n }) {
    const f = n.length;
    let u = new Set(n), c = /* @__PURE__ */ new Set(), s = 0;
    for (; u.size; ) {
      for (const k of u) {
        k.height = s;
        for (const { source: w } of k.targetLinks)
          c.add(w);
      }
      if (++s > f)
        throw new Error("circular link");
      u = c, c = /* @__PURE__ */ new Set();
    }
  }
  function O({ nodes: n }) {
    const f = ct(n, (s) => s.depth) + 1, u = (i - t - h2) / (f - 1), c = new Array(f);
    for (const s of n) {
      const k = Math.max(0, Math.min(f - 1, Math.floor(r.call(null, s, f))));
      s.layer = k, s.x0 = t + k * u, s.x1 = s.x0 + h2, c[k] ? c[k].push(s) : c[k] = [s];
    }
    if (o)
      for (const s of c)
        s.sort(o);
    return c;
  }
  function R(n) {
    const f = gt(n, (u) => (a - e - (u.length - 1) * m2) / nt(u, it));
    for (const u of n) {
      let c = e;
      for (const s of u) {
        s.y0 = c, s.y1 = c + s.value * f, c = s.y1 + m2;
        for (const k of s.sourceLinks)
          k.width = k.value * f;
      }
      c = (a - c + m2) / (u.length + 1);
      for (let s = 0; s < u.length; ++s) {
        const k = u[s];
        k.y0 += c * (s + 1), k.y1 += c * (s + 1);
      }
      A(u);
    }
  }
  function S(n) {
    const f = O(n);
    m2 = Math.min(y, (a - e) / (ct(f, (u) => u.length) - 1)), R(f);
    for (let u = 0; u < p; ++u) {
      const c = Math.pow(0.99, u), s = Math.max(1 - c, (u + 1) / p);
      z(f, c, s), P(f, c, s);
    }
  }
  function P(n, f, u) {
    for (let c = 1, s = n.length; c < s; ++c) {
      const k = n[c];
      for (const w of k) {
        let L = 0, F = 0;
        for (const { source: U, value: et } of w.targetLinks) {
          let G = et * (w.layer - U.layer);
          L += j(U, w) * G, F += G;
        }
        if (!(F > 0))
          continue;
        let W = (L / F - w.y0) * f;
        w.y0 += W, w.y1 += W, E(w);
      }
      o === void 0 && k.sort(Q), D(k, u);
    }
  }
  function z(n, f, u) {
    for (let c = n.length, s = c - 2; s >= 0; --s) {
      const k = n[s];
      for (const w of k) {
        let L = 0, F = 0;
        for (const { target: U, value: et } of w.sourceLinks) {
          let G = et * (U.layer - w.layer);
          L += I(w, U) * G, F += G;
        }
        if (!(F > 0))
          continue;
        let W = (L / F - w.y0) * f;
        w.y0 += W, w.y1 += W, E(w);
      }
      o === void 0 && k.sort(Q), D(k, u);
    }
  }
  function D(n, f) {
    const u = n.length >> 1, c = n[u];
    d(n, c.y0 - m2, u - 1, f), $(n, c.y1 + m2, u + 1, f), d(n, a, n.length - 1, f), $(n, e, 0, f);
  }
  function $(n, f, u, c) {
    for (; u < n.length; ++u) {
      const s = n[u], k = (f - s.y0) * c;
      k > 1e-6 && (s.y0 += k, s.y1 += k), f = s.y1 + m2;
    }
  }
  function d(n, f, u, c) {
    for (; u >= 0; --u) {
      const s = n[u], k = (s.y1 - f) * c;
      k > 1e-6 && (s.y0 -= k, s.y1 -= k), f = s.y0 - m2;
    }
  }
  function E({ sourceLinks: n, targetLinks: f }) {
    if (l === void 0) {
      for (const { source: { sourceLinks: u } } of f)
        u.sort(ht);
      for (const { target: { targetLinks: u } } of n)
        u.sort(ut);
    }
  }
  function A(n) {
    if (l === void 0)
      for (const { sourceLinks: f, targetLinks: u } of n)
        f.sort(ht), u.sort(ut);
  }
  function j(n, f) {
    let u = n.y0 - (n.sourceLinks.length - 1) * m2 / 2;
    for (const { target: c, width: s } of n.sourceLinks) {
      if (c === f)
        break;
      u += s + m2;
    }
    for (const { source: c, width: s } of f.targetLinks) {
      if (c === n)
        break;
      u -= s;
    }
    return u;
  }
  function I(n, f) {
    let u = f.y0 - (f.targetLinks.length - 1) * m2 / 2;
    for (const { source: c, width: s } of f.targetLinks) {
      if (c === n)
        break;
      u += s + m2;
    }
    for (const { target: c, width: s } of n.sourceLinks) {
      if (c === f)
        break;
      u -= s;
    }
    return u;
  }
  return b;
}
var rt = Math.PI, st = 2 * rt, V = 1e-6, Rt = st - V;
function ot() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function kt() {
  return new ot();
}
ot.prototype = kt.prototype = {
  constructor: ot,
  moveTo: function(t, e) {
    this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(t, e) {
    this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +e);
  },
  quadraticCurveTo: function(t, e, i, a) {
    this._ += "Q" + +t + "," + +e + "," + (this._x1 = +i) + "," + (this._y1 = +a);
  },
  bezierCurveTo: function(t, e, i, a, h2, y) {
    this._ += "C" + +t + "," + +e + "," + +i + "," + +a + "," + (this._x1 = +h2) + "," + (this._y1 = +y);
  },
  arcTo: function(t, e, i, a, h2) {
    t = +t, e = +e, i = +i, a = +a, h2 = +h2;
    var y = this._x1, m2 = this._y1, _ = i - t, r = a - e, o = y - t, l = m2 - e, x = o * o + l * l;
    if (h2 < 0)
      throw new Error("negative radius: " + h2);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = t) + "," + (this._y1 = e);
    else if (x > V)
      if (!(Math.abs(l * _ - r * o) > V) || !h2)
        this._ += "L" + (this._x1 = t) + "," + (this._y1 = e);
      else {
        var v = i - y, p = a - m2, b = _ * _ + r * r, M = v * v + p * p, T = Math.sqrt(b), N = Math.sqrt(x), C = h2 * Math.tan((rt - Math.acos((b + x - M) / (2 * T * N))) / 2), O = C / N, R = C / T;
        Math.abs(O - 1) > V && (this._ += "L" + (t + O * o) + "," + (e + O * l)), this._ += "A" + h2 + "," + h2 + ",0,0," + +(l * v > o * p) + "," + (this._x1 = t + R * _) + "," + (this._y1 = e + R * r);
      }
  },
  arc: function(t, e, i, a, h2, y) {
    t = +t, e = +e, i = +i, y = !!y;
    var m2 = i * Math.cos(a), _ = i * Math.sin(a), r = t + m2, o = e + _, l = 1 ^ y, x = y ? a - h2 : h2 - a;
    if (i < 0)
      throw new Error("negative radius: " + i);
    this._x1 === null ? this._ += "M" + r + "," + o : (Math.abs(this._x1 - r) > V || Math.abs(this._y1 - o) > V) && (this._ += "L" + r + "," + o), i && (x < 0 && (x = x % st + st), x > Rt ? this._ += "A" + i + "," + i + ",0,1," + l + "," + (t - m2) + "," + (e - _) + "A" + i + "," + i + ",0,1," + l + "," + (this._x1 = r) + "," + (this._y1 = o) : x > V && (this._ += "A" + i + "," + i + ",0," + +(x >= rt) + "," + l + "," + (this._x1 = t + i * Math.cos(h2)) + "," + (this._y1 = e + i * Math.sin(h2))));
  },
  rect: function(t, e, i, a) {
    this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e) + "h" + +i + "v" + +a + "h" + -i + "Z";
  },
  toString: function() {
    return this._;
  }
};
function yt(t) {
  return function() {
    return t;
  };
}
function Ft(t) {
  return t[0];
}
function Vt(t) {
  return t[1];
}
var Wt = Array.prototype.slice;
function Ut(t) {
  return t.source;
}
function Gt(t) {
  return t.target;
}
function Yt(t) {
  var e = Ut, i = Gt, a = Ft, h2 = Vt, y = null;
  function m2() {
    var _, r = Wt.call(arguments), o = e.apply(this, r), l = i.apply(this, r);
    if (y || (y = _ = kt()), t(y, +a.apply(this, (r[0] = o, r)), +h2.apply(this, r), +a.apply(this, (r[0] = l, r)), +h2.apply(this, r)), _)
      return y = null, _ + "" || null;
  }
  return m2.source = function(_) {
    return arguments.length ? (e = _, m2) : e;
  }, m2.target = function(_) {
    return arguments.length ? (i = _, m2) : i;
  }, m2.x = function(_) {
    return arguments.length ? (a = typeof _ == "function" ? _ : yt(+_), m2) : a;
  }, m2.y = function(_) {
    return arguments.length ? (h2 = typeof _ == "function" ? _ : yt(+_), m2) : h2;
  }, m2.context = function(_) {
    return arguments.length ? (y = _ ?? null, m2) : y;
  }, m2;
}
function Ht(t, e, i, a, h2) {
  t.moveTo(e, i), t.bezierCurveTo(e = (e + a) / 2, i, e, h2, a, h2);
}
function Xt() {
  return Yt(Ht);
}
function qt(t) {
  return [t.source.x1, t.y0];
}
function Qt(t) {
  return [t.target.x0, t.y1];
}
function Kt() {
  return Xt().source(qt).target(Qt);
}
var at = function() {
  var t = /* @__PURE__ */ m(function(_, r, o, l) {
    for (o = o || {}, l = _.length; l--; o[_[l]] = r)
      ;
    return o;
  }, "o"), e = [1, 9], i = [1, 10], a = [1, 5, 10, 12], h2 = {
    trace: /* @__PURE__ */ m(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, SANKEY: 4, NEWLINE: 5, csv: 6, opt_eof: 7, record: 8, csv_tail: 9, EOF: 10, "field[source]": 11, COMMA: 12, "field[target]": 13, "field[value]": 14, field: 15, escaped: 16, non_escaped: 17, DQUOTE: 18, ESCAPED_TEXT: 19, NON_ESCAPED_TEXT: 20, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "SANKEY", 5: "NEWLINE", 10: "EOF", 11: "field[source]", 12: "COMMA", 13: "field[target]", 14: "field[value]", 18: "DQUOTE", 19: "ESCAPED_TEXT", 20: "NON_ESCAPED_TEXT" },
    productions_: [0, [3, 4], [6, 2], [9, 2], [9, 0], [7, 1], [7, 0], [8, 5], [15, 1], [15, 1], [16, 3], [17, 1]],
    performAction: /* @__PURE__ */ m(function(r, o, l, x, v, p, b) {
      var M = p.length - 1;
      switch (v) {
        case 7:
          const T = x.findOrCreateNode(p[M - 4].trim().replaceAll('""', '"')), N = x.findOrCreateNode(p[M - 2].trim().replaceAll('""', '"')), C = parseFloat(p[M].trim());
          x.addLink(T, N, C);
          break;
        case 8:
        case 9:
        case 11:
          this.$ = p[M];
          break;
        case 10:
          this.$ = p[M - 1];
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3] }, { 6: 4, 8: 5, 15: 6, 16: 7, 17: 8, 18: e, 20: i }, { 1: [2, 6], 7: 11, 10: [1, 12] }, t(i, [2, 4], { 9: 13, 5: [1, 14] }), { 12: [1, 15] }, t(a, [2, 8]), t(a, [2, 9]), { 19: [1, 16] }, t(a, [2, 11]), { 1: [2, 1] }, { 1: [2, 5] }, t(i, [2, 2]), { 6: 17, 8: 5, 15: 6, 16: 7, 17: 8, 18: e, 20: i }, { 15: 18, 16: 7, 17: 8, 18: e, 20: i }, { 18: [1, 19] }, t(i, [2, 3]), { 12: [1, 20] }, t(a, [2, 10]), { 15: 21, 16: 7, 17: 8, 18: e, 20: i }, t([1, 5, 10], [2, 7])],
    defaultActions: { 11: [2, 1], 12: [2, 5] },
    parseError: /* @__PURE__ */ m(function(r, o) {
      if (o.recoverable)
        this.trace(r);
      else {
        var l = new Error(r);
        throw l.hash = o, l;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m(function(r) {
      var o = this, l = [0], x = [], v = [null], p = [], b = this.table, M = "", T = 0, N = 0, C = 2, O = 1, R = p.slice.call(arguments, 1), S = Object.create(this.lexer), P = { yy: {} };
      for (var z in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, z) && (P.yy[z] = this.yy[z]);
      S.setInput(r, P.yy), P.yy.lexer = S, P.yy.parser = this, typeof S.yylloc > "u" && (S.yylloc = {});
      var D = S.yylloc;
      p.push(D);
      var $ = S.options && S.options.ranges;
      typeof P.yy.parseError == "function" ? this.parseError = P.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function d(L) {
        l.length = l.length - 2 * L, v.length = v.length - L, p.length = p.length - L;
      }
      m(d, "popStack");
      function E() {
        var L;
        return L = x.pop() || S.lex() || O, typeof L != "number" && (L instanceof Array && (x = L, L = x.pop()), L = o.symbols_[L] || L), L;
      }
      m(E, "lex");
      for (var A, j, I, n, f = {}, u, c, s, k; ; ) {
        if (j = l[l.length - 1], this.defaultActions[j] ? I = this.defaultActions[j] : ((A === null || typeof A > "u") && (A = E()), I = b[j] && b[j][A]), typeof I > "u" || !I.length || !I[0]) {
          var w = "";
          k = [];
          for (u in b[j])
            this.terminals_[u] && u > C && k.push("'" + this.terminals_[u] + "'");
          S.showPosition ? w = "Parse error on line " + (T + 1) + `:
` + S.showPosition() + `
Expecting ` + k.join(", ") + ", got '" + (this.terminals_[A] || A) + "'" : w = "Parse error on line " + (T + 1) + ": Unexpected " + (A == O ? "end of input" : "'" + (this.terminals_[A] || A) + "'"), this.parseError(w, {
            text: S.match,
            token: this.terminals_[A] || A,
            line: S.yylineno,
            loc: D,
            expected: k
          });
        }
        if (I[0] instanceof Array && I.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + j + ", token: " + A);
        switch (I[0]) {
          case 1:
            l.push(A), v.push(S.yytext), p.push(S.yylloc), l.push(I[1]), A = null, N = S.yyleng, M = S.yytext, T = S.yylineno, D = S.yylloc;
            break;
          case 2:
            if (c = this.productions_[I[1]][1], f.$ = v[v.length - c], f._$ = {
              first_line: p[p.length - (c || 1)].first_line,
              last_line: p[p.length - 1].last_line,
              first_column: p[p.length - (c || 1)].first_column,
              last_column: p[p.length - 1].last_column
            }, $ && (f._$.range = [
              p[p.length - (c || 1)].range[0],
              p[p.length - 1].range[1]
            ]), n = this.performAction.apply(f, [
              M,
              N,
              T,
              P.yy,
              I[1],
              v,
              p
            ].concat(R)), typeof n < "u")
              return n;
            c && (l = l.slice(0, -1 * c * 2), v = v.slice(0, -1 * c), p = p.slice(0, -1 * c)), l.push(this.productions_[I[1]][0]), v.push(f.$), p.push(f._$), s = b[l[l.length - 2]][l[l.length - 1]], l.push(s);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, y = /* @__PURE__ */ function() {
    var _ = {
      EOF: 1,
      parseError: /* @__PURE__ */ m(function(o, l) {
        if (this.yy.parser)
          this.yy.parser.parseError(o, l);
        else
          throw new Error(o);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m(function(r, o) {
        return this.yy = o || this.yy || {}, this._input = r, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m(function() {
        var r = this._input[0];
        this.yytext += r, this.yyleng++, this.offset++, this.match += r, this.matched += r;
        var o = r.match(/(?:\r\n?|\n).*/g);
        return o ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), r;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m(function(r) {
        var o = r.length, l = r.split(/(?:\r\n?|\n)/g);
        this._input = r + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - o), this.offset -= o;
        var x = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), l.length - 1 && (this.yylineno -= l.length - 1);
        var v = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: l ? (l.length === x.length ? this.yylloc.first_column : 0) + x[x.length - l.length].length - l[0].length : this.yylloc.first_column - o
        }, this.options.ranges && (this.yylloc.range = [v[0], v[0] + this.yyleng - o]), this.yyleng = this.yytext.length, this;
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
      less: /* @__PURE__ */ m(function(r) {
        this.unput(this.match.slice(r));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m(function() {
        var r = this.matched.substr(0, this.matched.length - this.match.length);
        return (r.length > 20 ? "..." : "") + r.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m(function() {
        var r = this.match;
        return r.length < 20 && (r += this._input.substr(0, 20 - r.length)), (r.substr(0, 20) + (r.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m(function() {
        var r = this.pastInput(), o = new Array(r.length + 1).join("-");
        return r + this.upcomingInput() + `
` + o + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m(function(r, o) {
        var l, x, v;
        if (this.options.backtrack_lexer && (v = {
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
        }, this.options.ranges && (v.yylloc.range = this.yylloc.range.slice(0))), x = r[0].match(/(?:\r\n?|\n).*/g), x && (this.yylineno += x.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: x ? x[x.length - 1].length - x[x.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + r[0].length
        }, this.yytext += r[0], this.match += r[0], this.matches = r, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(r[0].length), this.matched += r[0], l = this.performAction.call(this, this.yy, this, o, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), l)
          return l;
        if (this._backtrack) {
          for (var p in v)
            this[p] = v[p];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var r, o, l, x;
        this._more || (this.yytext = "", this.match = "");
        for (var v = this._currentRules(), p = 0; p < v.length; p++)
          if (l = this._input.match(this.rules[v[p]]), l && (!o || l[0].length > o[0].length)) {
            if (o = l, x = p, this.options.backtrack_lexer) {
              if (r = this.test_match(l, v[p]), r !== false)
                return r;
              if (this._backtrack) {
                o = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return o ? (r = this.test_match(o, v[x]), r !== false ? r : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ m(function() {
        var o = this.next();
        return o || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ m(function(o) {
        this.conditionStack.push(o);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ m(function() {
        var o = this.conditionStack.length - 1;
        return o > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ m(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ m(function(o) {
        return o = this.conditionStack.length - 1 - Math.abs(o || 0), o >= 0 ? this.conditionStack[o] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ m(function(o) {
        this.begin(o);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ m(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: /* @__PURE__ */ m(function(o, l, x, v) {
        switch (x) {
          case 0:
            return this.pushState("csv"), 4;
          case 1:
            return this.pushState("csv"), 4;
          case 2:
            return 10;
          case 3:
            return 5;
          case 4:
            return 12;
          case 5:
            return this.pushState("escaped_text"), 18;
          case 6:
            return 20;
          case 7:
            return this.popState("escaped_text"), 18;
          case 8:
            return 19;
        }
      }, "anonymous"),
      rules: [/^(?:sankey-beta\b)/i, /^(?:sankey\b)/i, /^(?:$)/i, /^(?:((\u000D\u000A)|(\u000A)))/i, /^(?:(\u002C))/i, /^(?:(\u0022))/i, /^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/i, /^(?:(\u0022)(?!(\u0022)))/i, /^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/i],
      conditions: { csv: { rules: [2, 3, 4, 5, 6, 7, 8], inclusive: false }, escaped_text: { rules: [7, 8], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8], inclusive: true } }
    };
    return _;
  }();
  h2.lexer = y;
  function m$1() {
    this.yy = {};
  }
  return m(m$1, "Parser"), m$1.prototype = h2, h2.Parser = m$1, new m$1();
}();
at.parser = at;
var K = at, J = [], tt = [], Z = /* @__PURE__ */ new Map(), Zt = /* @__PURE__ */ m(() => {
  J = [], tt = [], Z = /* @__PURE__ */ new Map(), m5();
}, "clear"), Y, Jt = (Y = class {
  constructor(e, i, a = 0) {
    this.source = e, this.target = i, this.value = a;
  }
}, m(Y, "SankeyLink"), Y), te = /* @__PURE__ */ m((t, e, i) => {
  J.push(new Jt(t, e, i));
}, "addLink"), H, ee = (H = class {
  constructor(e) {
    this.ID = e;
  }
}, m(H, "SankeyNode"), H), ne = /* @__PURE__ */ m((t) => {
  t = Ii.sanitizeText(t, yt$1());
  let e = Z.get(t);
  return e === void 0 && (e = new ee(t), Z.set(t, e), tt.push(e)), e;
}, "findOrCreateNode"), ie = /* @__PURE__ */ m(() => tt, "getNodes"), re = /* @__PURE__ */ m(() => J, "getLinks"), se = /* @__PURE__ */ m(() => ({
  nodes: tt.map((t) => ({ id: t.ID })),
  links: J.map((t) => ({
    source: t.source.ID,
    target: t.target.ID,
    value: t.value
  }))
}), "getGraph"), oe = {
  nodesMap: Z,
  getConfig: /* @__PURE__ */ m(() => yt$1().sankey, "getConfig"),
  getNodes: ie,
  getLinks: re,
  getGraph: se,
  addLink: te,
  findOrCreateNode: ne,
  getAccTitle: x5,
  setAccTitle: b5,
  getAccDescription: w5,
  setAccDescription: y5,
  getDiagramTitle: _5,
  setDiagramTitle: k5,
  clear: Zt
}, B, dt = (B = class {
  static next(e) {
    return new B(e + ++B.count);
  }
  constructor(e) {
    this.id = e, this.href = `#${e}`;
  }
  toString() {
    return "url(" + this.href + ")";
  }
}, m(B, "Uid"), B.count = 0, B), ae = {
  left: Ct,
  right: Ot,
  center: Dt,
  justify: mt
}, le = /* @__PURE__ */ m(function(t, e, i, a) {
  const { securityLevel: h$1, sankey: y } = yt$1(), m$1 = hI.sankey;
  let _;
  h$1 === "sandbox" && (_ = gt$1("#i" + e));
  const r = h$1 === "sandbox" ? gt$1(_.nodes()[0].contentDocument.body) : gt$1("body"), o = h$1 === "sandbox" ? r.select(`[id="${e}"]`) : gt$1(`[id="${e}"]`), l = (y == null ? void 0 : y.width) ?? m$1.width, x = (y == null ? void 0 : y.height) ?? m$1.width, v = (y == null ? void 0 : y.useMaxWidth) ?? m$1.useMaxWidth, p = (y == null ? void 0 : y.nodeAlignment) ?? m$1.nodeAlignment, b = (y == null ? void 0 : y.prefix) ?? m$1.prefix, M = (y == null ? void 0 : y.suffix) ?? m$1.suffix, T = (y == null ? void 0 : y.showValues) ?? m$1.showValues, N = a.db.getGraph(), C = ae[p], O = 10;
  Bt().nodeId((d) => d.id).nodeWidth(O).nodePadding(10 + (T ? 15 : 0)).nodeAlign(C).extent([
    [0, 0],
    [l, x]
  ])(N);
  const S = h(It);
  o.append("g").attr("class", "nodes").selectAll(".node").data(N.nodes).join("g").attr("class", "node").attr("id", (d) => (d.uid = dt.next("node-")).id).attr("transform", function(d) {
    return "translate(" + d.x0 + "," + d.y0 + ")";
  }).attr("x", (d) => d.x0).attr("y", (d) => d.y0).append("rect").attr("height", (d) => d.y1 - d.y0).attr("width", (d) => d.x1 - d.x0).attr("fill", (d) => S(d.id));
  const P = /* @__PURE__ */ m(({ id: d, value: E }) => T ? `${d}
${b}${Math.round(E * 100) / 100}${M}` : d, "getText");
  o.append("g").attr("class", "node-labels").attr("font-size", 14).selectAll("text").data(N.nodes).join("text").attr("x", (d) => d.x0 < l / 2 ? d.x1 + 6 : d.x0 - 6).attr("y", (d) => (d.y1 + d.y0) / 2).attr("dy", `${T ? "0" : "0.35"}em`).attr("text-anchor", (d) => d.x0 < l / 2 ? "start" : "end").text(P);
  const z = o.append("g").attr("class", "links").attr("fill", "none").attr("stroke-opacity", 0.5).selectAll(".link").data(N.links).join("g").attr("class", "link").style("mix-blend-mode", "multiply"), D = (y == null ? void 0 : y.linkColor) ?? "gradient";
  if (D === "gradient") {
    const d = z.append("linearGradient").attr("id", (E) => (E.uid = dt.next("linearGradient-")).id).attr("gradientUnits", "userSpaceOnUse").attr("x1", (E) => E.source.x1).attr("x2", (E) => E.target.x0);
    d.append("stop").attr("offset", "0%").attr("stop-color", (E) => S(E.source.id)), d.append("stop").attr("offset", "100%").attr("stop-color", (E) => S(E.target.id));
  }
  let $;
  switch (D) {
    case "gradient":
      $ = /* @__PURE__ */ m((d) => d.uid, "coloring");
      break;
    case "source":
      $ = /* @__PURE__ */ m((d) => S(d.source.id), "coloring");
      break;
    case "target":
      $ = /* @__PURE__ */ m((d) => S(d.target.id), "coloring");
      break;
    default:
      $ = D;
  }
  z.append("path").attr("d", Kt()).attr("stroke", $).attr("stroke-width", (d) => Math.max(1, d.width)), d5(void 0, o, 0, v);
}, "draw"), ce = {
  draw: le
}, ue = /* @__PURE__ */ m((t) => t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g, "").replaceAll(/([\n\r])+/g, `
`).trim(), "prepareTextForParsing"), he = /* @__PURE__ */ m((t) => `.label {
      font-family: ${t.fontFamily};
    }`, "getStyles"), fe = he, pe = K.parse.bind(K);
K.parse = (t) => pe(ue(t));
var Bn = {
  styles: fe,
  parser: K,
  db: oe,
  renderer: ce
};
export {
  Bn as diagram
};
