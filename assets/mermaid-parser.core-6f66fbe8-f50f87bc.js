import { _ as __vitePreload } from "./monaco-45e206c0.js";
import { bS as CL, bT as ss$1, bU as ls$1, bV as K9, bf as Z9, b3 as kL, bL as l9, bW as xd$1, b9 as j9, bM as Zd$1, b8 as Ao$1, bX as Jr$1, bK as Jc$1, b6 as _L, bY as ia$1, bZ as Pi$1, b7 as $m$1, bc as tu$1 } from "./app-33e0c163.js";
import { O as O$1, c as cr$1, b as bn$1, E, M as Mt$1, D as Dt$1, k as kn$1, e as Ot$1, S as Sn$1, F as Ft$1, V as Vn$1, W as Wn$1, m as mt$1, L as Ln$1, N as Nt$1, f as _r$1, g as Fe, R as Rt$1, Z as Z$2, T as Tn$1, I as It$1 } from "./_baseUniq-cfe137aa-75cabb2d.js";
import { u as un$1, o as on$1, x as xn$1, Z as Z$1, v as vn$1, g as gn$1, h as hn$1, I as In$1, m as mn$1 } from "./_basePickBy-9e57dae2-21bbebf4.js";
import { a } from "./clone-66b7ef27-0fd17639.js";
var xc = Object.defineProperty;
var Sc = (n, e, t) => e in n ? xc(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
var Ze = (n, e, t) => (Sc(n, typeof e != "symbol" ? e + "" : e, t), t);
var Wc = Object.prototype, Hc = Wc.hasOwnProperty, jc = CL(function(n, e) {
  if (ss$1(e) || ls$1(e)) {
    K9(e, O$1(e), n);
    return;
  }
  for (var t in e)
    Hc.call(e, t) && Z9(n, t, e[t]);
});
const $e = jc;
function Fl(n, e, t) {
  var r = -1, i = n.length;
  e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
  for (var s = Array(i); ++r < i; )
    s[r] = n[r + e];
  return s;
}
function Zn(n) {
  for (var e = -1, t = n == null ? 0 : n.length, r = 0, i = []; ++e < t; ) {
    var s = n[e];
    s && (i[r++] = s);
  }
  return i;
}
function zc(n, e, t, r) {
  for (var i = -1, s = n == null ? 0 : n.length; ++i < s; ) {
    var a2 = n[i];
    e(r, a2, t(a2), n);
  }
  return r;
}
function qc(n, e, t, r) {
  return Z$2(n, function(i, s, a2) {
    e(r, i, t(i), a2);
  }), r;
}
function Yc(n, e) {
  return function(t, r) {
    var i = Ao$1(t) ? zc : qc, s = e ? e() : {};
    return i(t, n, Ln$1(r), s);
  };
}
var Xc = 200;
function Jc(n, e, t, r) {
  var i = -1, s = kn$1, a2 = true, o = n.length, l = [], u = e.length;
  if (!o)
    return l;
  t && (e = bn$1(e, j9(t))), r ? (s = Ot$1, a2 = false) : e.length >= Xc && (s = Sn$1, a2 = false, e = new E(e));
  e:
    for (; ++i < o; ) {
      var c = n[i], d = t == null ? c : t(c);
      if (c = r || c !== 0 ? c : 0, a2 && d === d) {
        for (var h = u; h--; )
          if (e[h] === d)
            continue e;
        l.push(c);
      } else
        s(e, d, r) || l.push(c);
    }
  return l;
}
var Qc = kL(function(n, e) {
  return l9(n) ? Jc(n, cr$1(e, 1, l9, true)) : [];
});
const mi = Qc;
function J(n, e, t) {
  var r = n == null ? 0 : n.length;
  return r ? (e = t || e === void 0 ? 1 : Z$1(e), Fl(n, e < 0 ? 0 : e, r)) : [];
}
function Ln(n, e, t) {
  var r = n == null ? 0 : n.length;
  return r ? (e = t || e === void 0 ? 1 : Z$1(e), e = r - e, Fl(n, 0, e < 0 ? 0 : e)) : [];
}
function Zc(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (!e(n[t], t, n))
      return false;
  return true;
}
function ed(n, e) {
  var t = true;
  return Z$2(n, function(r, i, s) {
    return t = !!e(r, i, s), t;
  }), t;
}
function Oe(n, e, t) {
  var r = Ao$1(n) ? Zc : ed;
  return t && _L(n, e, t) && (e = void 0), r(n, Ln$1(e));
}
function Pe(n) {
  return n && n.length ? n[0] : void 0;
}
function Ee(n, e) {
  return cr$1(on$1(n, e), 1);
}
var td = Object.prototype, nd = td.hasOwnProperty, rd = Yc(function(n, e, t) {
  nd.call(n, t) ? n[t].push(e) : tu$1(n, t, [e]);
});
const id = rd;
var sd = "[object String]";
function he(n) {
  return typeof n == "string" || !Ao$1(n) && ia$1(n) && Pi$1(n) == sd;
}
var ad = Math.max;
function de(n, e, t, r) {
  n = ls$1(n) ? n : Ft$1(n), t = t && !r ? Z$1(t) : 0;
  var i = n.length;
  return t < 0 && (t = ad(i + t, 0)), he(n) ? t <= i && n.indexOf(e, t) > -1 : !!i && Vn$1(n, e, t) > -1;
}
var od = Math.max;
function Sa(n, e, t) {
  var r = n == null ? 0 : n.length;
  if (!r)
    return -1;
  var i = t == null ? 0 : Z$1(t);
  return i < 0 && (i = od(r + i, 0)), Vn$1(n, e, i);
}
var ld = "[object RegExp]";
function ud(n) {
  return ia$1(n) && Pi$1(n) == ld;
}
var Ia = xd$1 && xd$1.isRegExp, cd = Ia ? j9(Ia) : ud;
const Xe = cd;
var dd = "Expected a function";
function fd(n) {
  if (typeof n != "function")
    throw new TypeError(dd);
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !n.call(this);
      case 1:
        return !n.call(this, e[0]);
      case 2:
        return !n.call(this, e[0], e[1]);
      case 3:
        return !n.call(this, e[0], e[1], e[2]);
    }
    return !n.apply(this, e);
  };
}
function Me(n, e) {
  if (n == null)
    return {};
  var t = bn$1(_r$1(n), function(r) {
    return [r];
  });
  return e = Ln$1(e), In$1(n, t, function(r, i) {
    return e(r, i[0]);
  });
}
function gi(n, e) {
  var t = Ao$1(n) ? Tn$1 : It$1;
  return t(n, fd(Ln$1(e)));
}
function hd(n, e) {
  var t;
  return Z$2(n, function(r, i, s) {
    return t = e(r, i, s), !t;
  }), !!t;
}
function Gl(n, e, t) {
  var r = Ao$1(n) ? Fe : hd;
  return t && _L(n, e, t) && (e = void 0), r(n, Ln$1(e));
}
function Xs(n) {
  return n && n.length ? Nt$1(n) : [];
}
function pd(n, e) {
  return n && n.length ? Nt$1(n, Ln$1(e)) : [];
}
function ae(n) {
  return typeof n == "object" && n !== null && typeof n.$type == "string";
}
function Ue(n) {
  return typeof n == "object" && n !== null && typeof n.$refText == "string";
}
function md(n) {
  return typeof n == "object" && n !== null && typeof n.name == "string" && typeof n.type == "string" && typeof n.path == "string";
}
function Cr(n) {
  return typeof n == "object" && n !== null && ae(n.container) && Ue(n.reference) && typeof n.message == "string";
}
class Ul {
  constructor() {
    this.subtypes = {}, this.allSubtypes = {};
  }
  isInstance(e, t) {
    return ae(e) && this.isSubtype(e.$type, t);
  }
  isSubtype(e, t) {
    if (e === t)
      return true;
    let r = this.subtypes[e];
    r || (r = this.subtypes[e] = {});
    const i = r[t];
    if (i !== void 0)
      return i;
    {
      const s = this.computeIsSubtype(e, t);
      return r[t] = s, s;
    }
  }
  getAllSubTypes(e) {
    const t = this.allSubtypes[e];
    if (t)
      return t;
    {
      const r = this.getAllTypes(), i = [];
      for (const s of r)
        this.isSubtype(s, e) && i.push(s);
      return this.allSubtypes[e] = i, i;
    }
  }
}
function _n(n) {
  return typeof n == "object" && n !== null && Array.isArray(n.content);
}
function Bl(n) {
  return typeof n == "object" && n !== null && typeof n.tokenType == "object";
}
function Vl(n) {
  return _n(n) && typeof n.fullText == "string";
}
class Q {
  constructor(e, t) {
    this.startFn = e, this.nextFn = t;
  }
  iterator() {
    const e = {
      state: this.startFn(),
      next: () => this.nextFn(e.state),
      [Symbol.iterator]: () => e
    };
    return e;
  }
  [Symbol.iterator]() {
    return this.iterator();
  }
  isEmpty() {
    return !!this.iterator().next().done;
  }
  count() {
    const e = this.iterator();
    let t = 0, r = e.next();
    for (; !r.done; )
      t++, r = e.next();
    return t;
  }
  toArray() {
    const e = [], t = this.iterator();
    let r;
    do
      r = t.next(), r.value !== void 0 && e.push(r.value);
    while (!r.done);
    return e;
  }
  toSet() {
    return new Set(this);
  }
  toMap(e, t) {
    const r = this.map((i) => [
      e ? e(i) : i,
      t ? t(i) : i
    ]);
    return new Map(r);
  }
  toString() {
    return this.join();
  }
  concat(e) {
    return new Q(() => ({ first: this.startFn(), firstDone: false, iterator: e[Symbol.iterator]() }), (t) => {
      let r;
      if (!t.firstDone) {
        do
          if (r = this.nextFn(t.first), !r.done)
            return r;
        while (!r.done);
        t.firstDone = true;
      }
      do
        if (r = t.iterator.next(), !r.done)
          return r;
      while (!r.done);
      return ve;
    });
  }
  join(e = ",") {
    const t = this.iterator();
    let r = "", i, s = false;
    do
      i = t.next(), i.done || (s && (r += e), r += gd(i.value)), s = true;
    while (!i.done);
    return r;
  }
  indexOf(e, t = 0) {
    const r = this.iterator();
    let i = 0, s = r.next();
    for (; !s.done; ) {
      if (i >= t && s.value === e)
        return i;
      s = r.next(), i++;
    }
    return -1;
  }
  every(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (!e(r.value))
        return false;
      r = t.next();
    }
    return true;
  }
  some(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (e(r.value))
        return true;
      r = t.next();
    }
    return false;
  }
  forEach(e) {
    const t = this.iterator();
    let r = 0, i = t.next();
    for (; !i.done; )
      e(i.value, r), i = t.next(), r++;
  }
  map(e) {
    return new Q(this.startFn, (t) => {
      const { done: r, value: i } = this.nextFn(t);
      return r ? ve : { done: false, value: e(i) };
    });
  }
  filter(e) {
    return new Q(this.startFn, (t) => {
      let r;
      do
        if (r = this.nextFn(t), !r.done && e(r.value))
          return r;
      while (!r.done);
      return ve;
    });
  }
  nonNullable() {
    return this.filter((e) => e != null);
  }
  reduce(e, t) {
    const r = this.iterator();
    let i = t, s = r.next();
    for (; !s.done; )
      i === void 0 ? i = s.value : i = e(i, s.value), s = r.next();
    return i;
  }
  reduceRight(e, t) {
    return this.recursiveReduce(this.iterator(), e, t);
  }
  recursiveReduce(e, t, r) {
    const i = e.next();
    if (i.done)
      return r;
    const s = this.recursiveReduce(e, t, r);
    return s === void 0 ? i.value : t(s, i.value);
  }
  find(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (e(r.value))
        return r.value;
      r = t.next();
    }
  }
  findIndex(e) {
    const t = this.iterator();
    let r = 0, i = t.next();
    for (; !i.done; ) {
      if (e(i.value))
        return r;
      i = t.next(), r++;
    }
    return -1;
  }
  includes(e) {
    const t = this.iterator();
    let r = t.next();
    for (; !r.done; ) {
      if (r.value === e)
        return true;
      r = t.next();
    }
    return false;
  }
  flatMap(e) {
    return new Q(() => ({ this: this.startFn() }), (t) => {
      do {
        if (t.iterator) {
          const s = t.iterator.next();
          if (s.done)
            t.iterator = void 0;
          else
            return s;
        }
        const { done: r, value: i } = this.nextFn(t.this);
        if (!r) {
          const s = e(i);
          if (Kr(s))
            t.iterator = s[Symbol.iterator]();
          else
            return { done: false, value: s };
        }
      } while (t.iterator);
      return ve;
    });
  }
  flat(e) {
    if (e === void 0 && (e = 1), e <= 0)
      return this;
    const t = e > 1 ? this.flat(e - 1) : this;
    return new Q(() => ({ this: t.startFn() }), (r) => {
      do {
        if (r.iterator) {
          const a2 = r.iterator.next();
          if (a2.done)
            r.iterator = void 0;
          else
            return a2;
        }
        const { done: i, value: s } = t.nextFn(r.this);
        if (!i)
          if (Kr(s))
            r.iterator = s[Symbol.iterator]();
          else
            return { done: false, value: s };
      } while (r.iterator);
      return ve;
    });
  }
  head() {
    const t = this.iterator().next();
    if (!t.done)
      return t.value;
  }
  tail(e = 1) {
    return new Q(() => {
      const t = this.startFn();
      for (let r = 0; r < e; r++)
        if (this.nextFn(t).done)
          return t;
      return t;
    }, this.nextFn);
  }
  limit(e) {
    return new Q(() => ({ size: 0, state: this.startFn() }), (t) => (t.size++, t.size > e ? ve : this.nextFn(t.state)));
  }
  distinct(e) {
    return new Q(() => ({ set: /* @__PURE__ */ new Set(), internalState: this.startFn() }), (t) => {
      let r;
      do
        if (r = this.nextFn(t.internalState), !r.done) {
          const i = e ? e(r.value) : r.value;
          if (!t.set.has(i))
            return t.set.add(i), r;
        }
      while (!r.done);
      return ve;
    });
  }
  exclude(e, t) {
    const r = /* @__PURE__ */ new Set();
    for (const i of e) {
      const s = t ? t(i) : i;
      r.add(s);
    }
    return this.filter((i) => {
      const s = t ? t(i) : i;
      return !r.has(s);
    });
  }
}
function gd(n) {
  return typeof n == "string" ? n : typeof n > "u" ? "undefined" : typeof n.toString == "function" ? n.toString() : Object.prototype.toString.call(n);
}
function Kr(n) {
  return !!n && typeof n[Symbol.iterator] == "function";
}
const yd = new Q(() => {
}, () => ve), ve = Object.freeze({ done: true, value: void 0 });
function Z(...n) {
  if (n.length === 1) {
    const e = n[0];
    if (e instanceof Q)
      return e;
    if (Kr(e))
      return new Q(() => e[Symbol.iterator](), (t) => t.next());
    if (typeof e.length == "number")
      return new Q(() => ({ index: 0 }), (t) => t.index < e.length ? { done: false, value: e[t.index++] } : ve);
  }
  return n.length > 1 ? new Q(() => ({ collIndex: 0, arrIndex: 0 }), (e) => {
    do {
      if (e.iterator) {
        const t = e.iterator.next();
        if (!t.done)
          return t;
        e.iterator = void 0;
      }
      if (e.array) {
        if (e.arrIndex < e.array.length)
          return { done: false, value: e.array[e.arrIndex++] };
        e.array = void 0, e.arrIndex = 0;
      }
      if (e.collIndex < n.length) {
        const t = n[e.collIndex++];
        Kr(t) ? e.iterator = t[Symbol.iterator]() : t && typeof t.length == "number" && (e.array = t);
      }
    } while (e.iterator || e.array || e.collIndex < n.length);
    return ve;
  }) : yd;
}
class Wr extends Q {
  constructor(e, t, r) {
    super(() => ({
      iterators: r != null && r.includeRoot ? [[e][Symbol.iterator]()] : [t(e)[Symbol.iterator]()],
      pruned: false
    }), (i) => {
      for (i.pruned && (i.iterators.pop(), i.pruned = false); i.iterators.length > 0; ) {
        const a2 = i.iterators[i.iterators.length - 1].next();
        if (a2.done)
          i.iterators.pop();
        else
          return i.iterators.push(t(a2.value)[Symbol.iterator]()), a2;
      }
      return ve;
    });
  }
  iterator() {
    const e = {
      state: this.startFn(),
      next: () => this.nextFn(e.state),
      prune: () => {
        e.state.pruned = true;
      },
      [Symbol.iterator]: () => e
    };
    return e;
  }
}
var ls;
(function(n) {
  function e(s) {
    return s.reduce((a2, o) => a2 + o, 0);
  }
  n.sum = e;
  function t(s) {
    return s.reduce((a2, o) => a2 * o, 0);
  }
  n.product = t;
  function r(s) {
    return s.reduce((a2, o) => Math.min(a2, o));
  }
  n.min = r;
  function i(s) {
    return s.reduce((a2, o) => Math.max(a2, o));
  }
  n.max = i;
})(ls || (ls = {}));
function us(n) {
  return new Wr(n, (e) => _n(e) ? e.content : [], { includeRoot: true });
}
function Td(n, e) {
  for (; n.container; )
    if (n = n.container, n === e)
      return true;
  return false;
}
function cs(n) {
  return {
    start: {
      character: n.startColumn - 1,
      line: n.startLine - 1
    },
    end: {
      character: n.endColumn,
      // endColumn uses the correct index
      line: n.endLine - 1
    }
  };
}
function Hr(n) {
  if (!n)
    return;
  const { offset: e, end: t, range: r } = n;
  return {
    range: r,
    offset: e,
    end: t,
    length: t - e
  };
}
var je;
(function(n) {
  n[n.Before = 0] = "Before", n[n.After = 1] = "After", n[n.OverlapFront = 2] = "OverlapFront", n[n.OverlapBack = 3] = "OverlapBack", n[n.Inside = 4] = "Inside", n[n.Outside = 5] = "Outside";
})(je || (je = {}));
function Rd(n, e) {
  if (n.end.line < e.start.line || n.end.line === e.start.line && n.end.character <= e.start.character)
    return je.Before;
  if (n.start.line > e.end.line || n.start.line === e.end.line && n.start.character >= e.end.character)
    return je.After;
  const t = n.start.line > e.start.line || n.start.line === e.start.line && n.start.character >= e.start.character, r = n.end.line < e.end.line || n.end.line === e.end.line && n.end.character <= e.end.character;
  return t && r ? je.Inside : t ? je.OverlapBack : r ? je.OverlapFront : je.Outside;
}
function vd(n, e) {
  return Rd(n, e) > je.After;
}
const Ad = /^[\w\p{L}]$/u;
function Ed(n, e) {
  if (n) {
    const t = $d(n, true);
    if (t && Ca(t, e))
      return t;
    if (Vl(n)) {
      const r = n.content.findIndex((i) => !i.hidden);
      for (let i = r - 1; i >= 0; i--) {
        const s = n.content[i];
        if (Ca(s, e))
          return s;
      }
    }
  }
}
function Ca(n, e) {
  return Bl(n) && e.includes(n.tokenType.name);
}
function $d(n, e = true) {
  for (; n.container; ) {
    const t = n.container;
    let r = t.content.indexOf(n);
    for (; r > 0; ) {
      r--;
      const i = t.content[r];
      if (e || !i.hidden)
        return i;
    }
    n = t;
  }
}
class Kl extends Error {
  constructor(e, t) {
    super(e ? `${t} at ${e.range.start.line}:${e.range.start.character}` : t);
  }
}
function er(n) {
  throw new Error("Error! The input value was not handled.");
}
const or = "AbstractRule", lr = "AbstractType", Oi = "Condition", Na = "TypeDefinition", Pi = "ValueLiteral", zt = "AbstractElement";
function kd(n) {
  return M.isInstance(n, zt);
}
const ur = "ArrayLiteral", cr = "ArrayType", qt = "BooleanLiteral";
function xd(n) {
  return M.isInstance(n, qt);
}
const Yt = "Conjunction";
function Sd(n) {
  return M.isInstance(n, Yt);
}
const Xt = "Disjunction";
function Id(n) {
  return M.isInstance(n, Xt);
}
const dr = "Grammar", Mi = "GrammarImport", Jt = "InferredType";
function Wl(n) {
  return M.isInstance(n, Jt);
}
const Qt = "Interface";
function Hl(n) {
  return M.isInstance(n, Qt);
}
const Di = "NamedArgument", Zt = "Negation";
function Cd(n) {
  return M.isInstance(n, Zt);
}
const fr = "NumberLiteral", hr = "Parameter", en = "ParameterReference";
function Nd(n) {
  return M.isInstance(n, en);
}
const tn = "ParserRule";
function we(n) {
  return M.isInstance(n, tn);
}
const pr = "ReferenceType", Nr = "ReturnType";
function wd(n) {
  return M.isInstance(n, Nr);
}
const nn = "SimpleType";
function Ld(n) {
  return M.isInstance(n, nn);
}
const mr = "StringLiteral", It = "TerminalRule";
function At(n) {
  return M.isInstance(n, It);
}
const rn = "Type";
function jl(n) {
  return M.isInstance(n, rn);
}
const Fi = "TypeAttribute", gr = "UnionType", sn = "Action";
function yi(n) {
  return M.isInstance(n, sn);
}
const an = "Alternatives";
function zl(n) {
  return M.isInstance(n, an);
}
const on = "Assignment";
function pt(n) {
  return M.isInstance(n, on);
}
const ln = "CharacterRange";
function _d(n) {
  return M.isInstance(n, ln);
}
const un = "CrossReference";
function Js(n) {
  return M.isInstance(n, un);
}
const cn = "EndOfFile";
function bd(n) {
  return M.isInstance(n, cn);
}
const dn = "Group";
function Qs(n) {
  return M.isInstance(n, dn);
}
const fn = "Keyword";
function mt(n) {
  return M.isInstance(n, fn);
}
const hn = "NegatedToken";
function Od(n) {
  return M.isInstance(n, hn);
}
const pn = "RegexToken";
function Pd(n) {
  return M.isInstance(n, pn);
}
const mn = "RuleCall";
function gt(n) {
  return M.isInstance(n, mn);
}
const gn = "TerminalAlternatives";
function Md(n) {
  return M.isInstance(n, gn);
}
const yn = "TerminalGroup";
function Dd(n) {
  return M.isInstance(n, yn);
}
const Tn = "TerminalRuleCall";
function ql(n) {
  return M.isInstance(n, Tn);
}
const Rn = "UnorderedGroup";
function Yl(n) {
  return M.isInstance(n, Rn);
}
const vn = "UntilToken";
function Fd(n) {
  return M.isInstance(n, vn);
}
const An = "Wildcard";
function Gd(n) {
  return M.isInstance(n, An);
}
class Xl extends Ul {
  getAllTypes() {
    return [zt, or, lr, sn, an, ur, cr, on, qt, ln, Oi, Yt, un, Xt, cn, dr, Mi, dn, Jt, Qt, fn, Di, hn, Zt, fr, hr, en, tn, pr, pn, Nr, mn, nn, mr, gn, yn, It, Tn, rn, Fi, Na, gr, Rn, vn, Pi, An];
  }
  computeIsSubtype(e, t) {
    switch (e) {
      case sn:
      case an:
      case on:
      case ln:
      case un:
      case cn:
      case dn:
      case fn:
      case hn:
      case pn:
      case mn:
      case gn:
      case yn:
      case Tn:
      case Rn:
      case vn:
      case An:
        return this.isSubtype(zt, t);
      case ur:
      case fr:
      case mr:
        return this.isSubtype(Pi, t);
      case cr:
      case pr:
      case nn:
      case gr:
        return this.isSubtype(Na, t);
      case qt:
        return this.isSubtype(Oi, t) || this.isSubtype(Pi, t);
      case Yt:
      case Xt:
      case Zt:
      case en:
        return this.isSubtype(Oi, t);
      case Jt:
      case Qt:
      case rn:
        return this.isSubtype(lr, t);
      case tn:
        return this.isSubtype(or, t) || this.isSubtype(lr, t);
      case It:
        return this.isSubtype(or, t);
      default:
        return false;
    }
  }
  getReferenceType(e) {
    const t = `${e.container.$type}:${e.property}`;
    switch (t) {
      case "Action:type":
      case "CrossReference:type":
      case "Interface:superTypes":
      case "ParserRule:returnType":
      case "SimpleType:typeRef":
        return lr;
      case "Grammar:hiddenTokens":
      case "ParserRule:hiddenTokens":
      case "RuleCall:rule":
        return or;
      case "Grammar:usedGrammars":
        return dr;
      case "NamedArgument:parameter":
      case "ParameterReference:parameter":
        return hr;
      case "TerminalRuleCall:rule":
        return It;
      default:
        throw new Error(`${t} is not a valid reference id.`);
    }
  }
  getTypeMetaData(e) {
    switch (e) {
      case zt:
        return {
          name: zt,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" }
          ]
        };
      case ur:
        return {
          name: ur,
          properties: [
            { name: "elements", defaultValue: [] }
          ]
        };
      case cr:
        return {
          name: cr,
          properties: [
            { name: "elementType" }
          ]
        };
      case qt:
        return {
          name: qt,
          properties: [
            { name: "true", defaultValue: false }
          ]
        };
      case Yt:
        return {
          name: Yt,
          properties: [
            { name: "left" },
            { name: "right" }
          ]
        };
      case Xt:
        return {
          name: Xt,
          properties: [
            { name: "left" },
            { name: "right" }
          ]
        };
      case dr:
        return {
          name: dr,
          properties: [
            { name: "definesHiddenTokens", defaultValue: false },
            { name: "hiddenTokens", defaultValue: [] },
            { name: "imports", defaultValue: [] },
            { name: "interfaces", defaultValue: [] },
            { name: "isDeclared", defaultValue: false },
            { name: "name" },
            { name: "rules", defaultValue: [] },
            { name: "types", defaultValue: [] },
            { name: "usedGrammars", defaultValue: [] }
          ]
        };
      case Mi:
        return {
          name: Mi,
          properties: [
            { name: "path" }
          ]
        };
      case Jt:
        return {
          name: Jt,
          properties: [
            { name: "name" }
          ]
        };
      case Qt:
        return {
          name: Qt,
          properties: [
            { name: "attributes", defaultValue: [] },
            { name: "name" },
            { name: "superTypes", defaultValue: [] }
          ]
        };
      case Di:
        return {
          name: Di,
          properties: [
            { name: "calledByName", defaultValue: false },
            { name: "parameter" },
            { name: "value" }
          ]
        };
      case Zt:
        return {
          name: Zt,
          properties: [
            { name: "value" }
          ]
        };
      case fr:
        return {
          name: fr,
          properties: [
            { name: "value" }
          ]
        };
      case hr:
        return {
          name: hr,
          properties: [
            { name: "name" }
          ]
        };
      case en:
        return {
          name: en,
          properties: [
            { name: "parameter" }
          ]
        };
      case tn:
        return {
          name: tn,
          properties: [
            { name: "dataType" },
            { name: "definesHiddenTokens", defaultValue: false },
            { name: "definition" },
            { name: "entry", defaultValue: false },
            { name: "fragment", defaultValue: false },
            { name: "hiddenTokens", defaultValue: [] },
            { name: "inferredType" },
            { name: "name" },
            { name: "parameters", defaultValue: [] },
            { name: "returnType" },
            { name: "wildcard", defaultValue: false }
          ]
        };
      case pr:
        return {
          name: pr,
          properties: [
            { name: "referenceType" }
          ]
        };
      case Nr:
        return {
          name: Nr,
          properties: [
            { name: "name" }
          ]
        };
      case nn:
        return {
          name: nn,
          properties: [
            { name: "primitiveType" },
            { name: "stringType" },
            { name: "typeRef" }
          ]
        };
      case mr:
        return {
          name: mr,
          properties: [
            { name: "value" }
          ]
        };
      case It:
        return {
          name: It,
          properties: [
            { name: "definition" },
            { name: "fragment", defaultValue: false },
            { name: "hidden", defaultValue: false },
            { name: "name" },
            { name: "type" }
          ]
        };
      case rn:
        return {
          name: rn,
          properties: [
            { name: "name" },
            { name: "type" }
          ]
        };
      case Fi:
        return {
          name: Fi,
          properties: [
            { name: "defaultValue" },
            { name: "isOptional", defaultValue: false },
            { name: "name" },
            { name: "type" }
          ]
        };
      case gr:
        return {
          name: gr,
          properties: [
            { name: "types", defaultValue: [] }
          ]
        };
      case sn:
        return {
          name: sn,
          properties: [
            { name: "cardinality" },
            { name: "feature" },
            { name: "inferredType" },
            { name: "lookahead" },
            { name: "operator" },
            { name: "type" }
          ]
        };
      case an:
        return {
          name: an,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case on:
        return {
          name: on,
          properties: [
            { name: "cardinality" },
            { name: "feature" },
            { name: "lookahead" },
            { name: "operator" },
            { name: "terminal" }
          ]
        };
      case ln:
        return {
          name: ln,
          properties: [
            { name: "cardinality" },
            { name: "left" },
            { name: "lookahead" },
            { name: "right" }
          ]
        };
      case un:
        return {
          name: un,
          properties: [
            { name: "cardinality" },
            { name: "deprecatedSyntax", defaultValue: false },
            { name: "lookahead" },
            { name: "terminal" },
            { name: "type" }
          ]
        };
      case cn:
        return {
          name: cn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" }
          ]
        };
      case dn:
        return {
          name: dn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "guardCondition" },
            { name: "lookahead" }
          ]
        };
      case fn:
        return {
          name: fn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "value" }
          ]
        };
      case hn:
        return {
          name: hn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "terminal" }
          ]
        };
      case pn:
        return {
          name: pn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "regex" }
          ]
        };
      case mn:
        return {
          name: mn,
          properties: [
            { name: "arguments", defaultValue: [] },
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "rule" }
          ]
        };
      case gn:
        return {
          name: gn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case yn:
        return {
          name: yn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case Tn:
        return {
          name: Tn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "rule" }
          ]
        };
      case Rn:
        return {
          name: Rn,
          properties: [
            { name: "cardinality" },
            { name: "elements", defaultValue: [] },
            { name: "lookahead" }
          ]
        };
      case vn:
        return {
          name: vn,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" },
            { name: "terminal" }
          ]
        };
      case An:
        return {
          name: An,
          properties: [
            { name: "cardinality" },
            { name: "lookahead" }
          ]
        };
      default:
        return {
          name: e,
          properties: []
        };
    }
  }
}
const M = new Xl();
function Ud(n) {
  for (const [e, t] of Object.entries(n))
    e.startsWith("$") || (Array.isArray(t) ? t.forEach((r, i) => {
      ae(r) && (r.$container = n, r.$containerProperty = e, r.$containerIndex = i);
    }) : ae(t) && (t.$container = n, t.$containerProperty = e));
}
function Ti(n, e) {
  let t = n;
  for (; t; ) {
    if (e(t))
      return t;
    t = t.$container;
  }
}
function et(n) {
  const t = ds(n).$document;
  if (!t)
    throw new Error("AST node has no document.");
  return t;
}
function ds(n) {
  for (; n.$container; )
    n = n.$container;
  return n;
}
function Zs(n, e) {
  if (!n)
    throw new Error("Node must be an AstNode.");
  const t = e == null ? void 0 : e.range;
  return new Q(() => ({
    keys: Object.keys(n),
    keyIndex: 0,
    arrayIndex: 0
  }), (r) => {
    for (; r.keyIndex < r.keys.length; ) {
      const i = r.keys[r.keyIndex];
      if (!i.startsWith("$")) {
        const s = n[i];
        if (ae(s)) {
          if (r.keyIndex++, fs(s, t))
            return { done: false, value: s };
        } else if (Array.isArray(s)) {
          for (; r.arrayIndex < s.length; ) {
            const a2 = r.arrayIndex++, o = s[a2];
            if (ae(o) && fs(o, t))
              return { done: false, value: o };
          }
          r.arrayIndex = 0;
        }
      }
      r.keyIndex++;
    }
    return ve;
  });
}
function tr(n, e) {
  if (!n)
    throw new Error("Root node must be an AstNode.");
  return new Wr(n, (t) => Zs(t, e));
}
function Nt(n, e) {
  if (n) {
    if (e != null && e.range && !fs(n, e.range))
      return new Wr(n, () => []);
  } else
    throw new Error("Root node must be an AstNode.");
  return new Wr(n, (t) => Zs(t, e), { includeRoot: true });
}
function fs(n, e) {
  var t;
  if (!e)
    return true;
  const r = (t = n.$cstNode) === null || t === void 0 ? void 0 : t.range;
  return r ? vd(r, e) : false;
}
function Jl(n) {
  return new Q(() => ({
    keys: Object.keys(n),
    keyIndex: 0,
    arrayIndex: 0
  }), (e) => {
    for (; e.keyIndex < e.keys.length; ) {
      const t = e.keys[e.keyIndex];
      if (!t.startsWith("$")) {
        const r = n[t];
        if (Ue(r))
          return e.keyIndex++, { done: false, value: { reference: r, container: n, property: t } };
        if (Array.isArray(r)) {
          for (; e.arrayIndex < r.length; ) {
            const i = e.arrayIndex++, s = r[i];
            if (Ue(s))
              return { done: false, value: { reference: s, container: n, property: t, index: i } };
          }
          e.arrayIndex = 0;
        }
      }
      e.keyIndex++;
    }
    return ve;
  });
}
function Bd(n, e) {
  const t = n.getTypeMetaData(e.$type), r = e;
  for (const i of t.properties)
    i.defaultValue !== void 0 && r[i.name] === void 0 && (r[i.name] = Ql(i.defaultValue));
}
function Ql(n) {
  return Array.isArray(n) ? [...n.map(Ql)] : n;
}
function w(n) {
  return n.charCodeAt(0);
}
function Gi(n, e) {
  Array.isArray(n) ? n.forEach(function(t) {
    e.push(t);
  }) : e.push(n);
}
function Wt(n, e) {
  if (n[e] === true)
    throw "duplicate flag " + e;
  n[e], n[e] = true;
}
function St(n) {
  if (n === void 0)
    throw Error("Internal Error - Should never get here!");
  return true;
}
function Vd() {
  throw Error("Internal Error - Should never get here!");
}
function wa(n) {
  return n.type === "Character";
}
const jr = [];
for (let n = w("0"); n <= w("9"); n++)
  jr.push(n);
const zr = [w("_")].concat(jr);
for (let n = w("a"); n <= w("z"); n++)
  zr.push(n);
for (let n = w("A"); n <= w("Z"); n++)
  zr.push(n);
const La = [
  w(" "),
  w("\f"),
  w(`
`),
  w("\r"),
  w("	"),
  w("\v"),
  w("	"),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w(" "),
  w("\u2028"),
  w("\u2029"),
  w(" "),
  w(" "),
  w("　"),
  w("\uFEFF")
], Kd = /[0-9a-fA-F]/, yr = /[0-9]/, Wd = /[1-9]/;
class Zl {
  constructor() {
    this.idx = 0, this.input = "", this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(e) {
    this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
  }
  pattern(e) {
    this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
    const t = this.disjunction();
    this.consumeChar("/");
    const r = {
      type: "Flags",
      loc: { begin: this.idx, end: e.length },
      window: false,
      ignoreCase: false,
      multiLine: false,
      unicode: false,
      sticky: false
    };
    for (; this.isRegExpFlag(); )
      switch (this.popChar()) {
        case "g":
          Wt(r, "window");
          break;
        case "i":
          Wt(r, "ignoreCase");
          break;
        case "m":
          Wt(r, "multiLine");
          break;
        case "u":
          Wt(r, "unicode");
          break;
        case "y":
          Wt(r, "sticky");
          break;
      }
    if (this.idx !== this.input.length)
      throw Error("Redundant input: " + this.input.substring(this.idx));
    return {
      type: "Pattern",
      flags: r,
      value: t,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const e = [], t = this.idx;
    for (e.push(this.alternative()); this.peekChar() === "|"; )
      this.consumeChar("|"), e.push(this.alternative());
    return { type: "Disjunction", value: e, loc: this.loc(t) };
  }
  alternative() {
    const e = [], t = this.idx;
    for (; this.isTerm(); )
      e.push(this.term());
    return { type: "Alternative", value: e, loc: this.loc(t) };
  }
  term() {
    return this.isAssertion() ? this.assertion() : this.atom();
  }
  assertion() {
    const e = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(e)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(e) };
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(e)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(e)
            };
        }
        throw Error("Invalid Assertion Escape");
      case "(":
        this.consumeChar("?");
        let t;
        switch (this.popChar()) {
          case "=":
            t = "Lookahead";
            break;
          case "!":
            t = "NegativeLookahead";
            break;
        }
        St(t);
        const r = this.disjunction();
        return this.consumeChar(")"), {
          type: t,
          value: r,
          loc: this.loc(e)
        };
    }
    return Vd();
  }
  quantifier(e = false) {
    let t;
    const r = this.idx;
    switch (this.popChar()) {
      case "*":
        t = {
          atLeast: 0,
          atMost: 1 / 0
        };
        break;
      case "+":
        t = {
          atLeast: 1,
          atMost: 1 / 0
        };
        break;
      case "?":
        t = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const i = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            t = {
              atLeast: i,
              atMost: i
            };
            break;
          case ",":
            let s;
            this.isDigit() ? (s = this.integerIncludingZero(), t = {
              atLeast: i,
              atMost: s
            }) : t = {
              atLeast: i,
              atMost: 1 / 0
            }, this.consumeChar("}");
            break;
        }
        if (e === true && t === void 0)
          return;
        St(t);
        break;
    }
    if (!(e === true && t === void 0) && St(t))
      return this.peekChar(0) === "?" ? (this.consumeChar("?"), t.greedy = false) : t.greedy = true, t.type = "Quantifier", t.loc = this.loc(r), t;
  }
  atom() {
    let e;
    const t = this.idx;
    switch (this.peekChar()) {
      case ".":
        e = this.dotAll();
        break;
      case "\\":
        e = this.atomEscape();
        break;
      case "[":
        e = this.characterClass();
        break;
      case "(":
        e = this.group();
        break;
    }
    if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), St(e))
      return e.loc = this.loc(t), this.isQuantifier() && (e.quantifier = this.quantifier()), e;
  }
  dotAll() {
    return this.consumeChar("."), {
      type: "Set",
      complement: true,
      value: [w(`
`), w("\r"), w("\u2028"), w("\u2029")]
    };
  }
  atomEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    return { type: "GroupBackReference", value: this.positiveInteger() };
  }
  characterClassEscape() {
    let e, t = false;
    switch (this.popChar()) {
      case "d":
        e = jr;
        break;
      case "D":
        e = jr, t = true;
        break;
      case "s":
        e = La;
        break;
      case "S":
        e = La, t = true;
        break;
      case "w":
        e = zr;
        break;
      case "W":
        e = zr, t = true;
        break;
    }
    if (St(e))
      return { type: "Set", value: e, complement: t };
  }
  controlEscapeAtom() {
    let e;
    switch (this.popChar()) {
      case "f":
        e = w("\f");
        break;
      case "n":
        e = w(`
`);
        break;
      case "r":
        e = w("\r");
        break;
      case "t":
        e = w("	");
        break;
      case "v":
        e = w("\v");
        break;
    }
    if (St(e))
      return { type: "Character", value: e };
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const e = this.popChar();
    if (/[a-zA-Z]/.test(e) === false)
      throw Error("Invalid ");
    return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
  }
  nulCharacterAtom() {
    return this.consumeChar("0"), { type: "Character", value: w("\0") };
  }
  hexEscapeSequenceAtom() {
    return this.consumeChar("x"), this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    return this.consumeChar("u"), this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const e = this.popChar();
    return { type: "Character", value: w(e) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
      case "\\":
      case "]":
        throw Error("TBD");
      default:
        const e = this.popChar();
        return { type: "Character", value: w(e) };
    }
  }
  characterClass() {
    const e = [];
    let t = false;
    for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), t = true); this.isClassAtom(); ) {
      const r = this.classAtom();
      if (r.type, wa(r) && this.isRangeDash()) {
        this.consumeChar("-");
        const i = this.classAtom();
        if (i.type, wa(i)) {
          if (i.value < r.value)
            throw Error("Range out of order in character class");
          e.push({ from: r.value, to: i.value });
        } else
          Gi(r.value, e), e.push(w("-")), Gi(i.value, e);
      } else
        Gi(r.value, e);
    }
    return this.consumeChar("]"), { type: "Set", complement: t, value: e };
  }
  classAtom() {
    switch (this.peekChar()) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "b":
        return this.consumeChar("b"), { type: "Character", value: w("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let e = true;
    switch (this.consumeChar("("), this.peekChar(0)) {
      case "?":
        this.consumeChar("?"), this.consumeChar(":"), e = false;
        break;
      default:
        this.groupIdx++;
        break;
    }
    const t = this.disjunction();
    this.consumeChar(")");
    const r = {
      type: "Group",
      capturing: e,
      value: t
    };
    return e && (r.idx = this.groupIdx), r;
  }
  positiveInteger() {
    let e = this.popChar();
    if (Wd.test(e) === false)
      throw Error("Expecting a positive integer");
    for (; yr.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (yr.test(e) === false)
      throw Error("Expecting an integer");
    for (; yr.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  patternCharacter() {
    const e = this.popChar();
    switch (e) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: w(e) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return true;
      default:
        return false;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return yr.test(this.peekChar(0));
  }
  isClassAtom(e = 0) {
    switch (this.peekChar(e)) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter())
      return true;
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      case "[":
      case "(":
        return true;
      default:
        return false;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return true;
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return true;
          default:
            return false;
        }
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
      default:
        return false;
    }
  }
  isQuantifier() {
    const e = this.saveState();
    try {
      return this.quantifier(true) !== void 0;
    } catch {
      return false;
    } finally {
      this.restoreState(e);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  parseHexDigits(e) {
    let t = "";
    for (let i = 0; i < e; i++) {
      const s = this.popChar();
      if (Kd.test(s) === false)
        throw Error("Expecting a HexDecimal digits");
      t += s;
    }
    return { type: "Character", value: parseInt(t, 16) };
  }
  peekChar(e = 0) {
    return this.input[this.idx + e];
  }
  popChar() {
    const e = this.peekChar(0);
    return this.consumeChar(void 0), e;
  }
  consumeChar(e) {
    if (e !== void 0 && this.input[this.idx] !== e)
      throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    if (this.idx >= this.input.length)
      throw Error("Unexpected end of input");
    this.idx++;
  }
  loc(e) {
    return { begin: e, end: this.idx };
  }
}
class Ri {
  visitChildren(e) {
    for (const t in e) {
      const r = e[t];
      e.hasOwnProperty(t) && (r.type !== void 0 ? this.visit(r) : Array.isArray(r) && r.forEach((i) => {
        this.visit(i);
      }, this));
    }
  }
  visit(e) {
    switch (e.type) {
      case "Pattern":
        this.visitPattern(e);
        break;
      case "Flags":
        this.visitFlags(e);
        break;
      case "Disjunction":
        this.visitDisjunction(e);
        break;
      case "Alternative":
        this.visitAlternative(e);
        break;
      case "StartAnchor":
        this.visitStartAnchor(e);
        break;
      case "EndAnchor":
        this.visitEndAnchor(e);
        break;
      case "WordBoundary":
        this.visitWordBoundary(e);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(e);
        break;
      case "Lookahead":
        this.visitLookahead(e);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(e);
        break;
      case "Character":
        this.visitCharacter(e);
        break;
      case "Set":
        this.visitSet(e);
        break;
      case "Group":
        this.visitGroup(e);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(e);
        break;
      case "Quantifier":
        this.visitQuantifier(e);
        break;
    }
    this.visitChildren(e);
  }
  visitPattern(e) {
  }
  visitFlags(e) {
  }
  visitDisjunction(e) {
  }
  visitAlternative(e) {
  }
  // Assertion
  visitStartAnchor(e) {
  }
  visitEndAnchor(e) {
  }
  visitWordBoundary(e) {
  }
  visitNonWordBoundary(e) {
  }
  visitLookahead(e) {
  }
  visitNegativeLookahead(e) {
  }
  // atoms
  visitCharacter(e) {
  }
  visitSet(e) {
  }
  visitGroup(e) {
  }
  visitGroupBackReference(e) {
  }
  visitQuantifier(e) {
  }
}
const Hd = /\r?\n/gm, jd = new Zl();
class zd extends Ri {
  constructor() {
    super(...arguments), this.isStarting = true, this.endRegexpStack = [], this.multiline = false;
  }
  get endRegex() {
    return this.endRegexpStack.join("");
  }
  reset(e) {
    this.multiline = false, this.regex = e, this.startRegexp = "", this.isStarting = true, this.endRegexpStack = [];
  }
  visitGroup(e) {
    e.quantifier && (this.isStarting = false, this.endRegexpStack = []);
  }
  visitCharacter(e) {
    const t = String.fromCharCode(e.value);
    if (!this.multiline && t === `
` && (this.multiline = true), e.quantifier)
      this.isStarting = false, this.endRegexpStack = [];
    else {
      const r = vi(t);
      this.endRegexpStack.push(r), this.isStarting && (this.startRegexp += r);
    }
  }
  visitSet(e) {
    if (!this.multiline) {
      const t = this.regex.substring(e.loc.begin, e.loc.end), r = new RegExp(t);
      this.multiline = !!`
`.match(r);
    }
    if (e.quantifier)
      this.isStarting = false, this.endRegexpStack = [];
    else {
      const t = this.regex.substring(e.loc.begin, e.loc.end);
      this.endRegexpStack.push(t), this.isStarting && (this.startRegexp += t);
    }
  }
  visitChildren(e) {
    e.type === "Group" && e.quantifier || super.visitChildren(e);
  }
}
const Ui = new zd();
function qd(n) {
  try {
    return typeof n == "string" && (n = new RegExp(n)), n = n.toString(), Ui.reset(n), Ui.visit(jd.pattern(n)), Ui.multiline;
  } catch {
    return false;
  }
}
const Yd = `\f
\r	\v              \u2028\u2029  　\uFEFF`.split("");
function hs(n) {
  const e = typeof n == "string" ? new RegExp(n) : n;
  return Yd.some((t) => e.test(t));
}
function vi(n) {
  return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Xd(n) {
  return Array.prototype.map.call(n, (e) => /\w/.test(e) ? `[${e.toLowerCase()}${e.toUpperCase()}]` : vi(e)).join("");
}
function Jd(n, e) {
  const t = Qd(n), r = e.match(t);
  return !!r && r[0].length > 0;
}
function Qd(n) {
  typeof n == "string" && (n = new RegExp(n));
  const e = n, t = n.source;
  let r = 0;
  function i() {
    let s = "", a2;
    function o(u) {
      s += t.substr(r, u), r += u;
    }
    function l(u) {
      s += "(?:" + t.substr(r, u) + "|$)", r += u;
    }
    for (; r < t.length; )
      switch (t[r]) {
        case "\\":
          switch (t[r + 1]) {
            case "c":
              l(3);
              break;
            case "x":
              l(4);
              break;
            case "u":
              e.unicode ? t[r + 2] === "{" ? l(t.indexOf("}", r) - r + 1) : l(6) : l(2);
              break;
            case "p":
            case "P":
              e.unicode ? l(t.indexOf("}", r) - r + 1) : l(2);
              break;
            case "k":
              l(t.indexOf(">", r) - r + 1);
              break;
            default:
              l(2);
              break;
          }
          break;
        case "[":
          a2 = /\[(?:\\.|.)*?\]/g, a2.lastIndex = r, a2 = a2.exec(t) || [], l(a2[0].length);
          break;
        case "|":
        case "^":
        case "$":
        case "*":
        case "+":
        case "?":
          o(1);
          break;
        case "{":
          a2 = /\{\d+,?\d*\}/g, a2.lastIndex = r, a2 = a2.exec(t), a2 ? o(a2[0].length) : l(1);
          break;
        case "(":
          if (t[r + 1] === "?")
            switch (t[r + 2]) {
              case ":":
                s += "(?:", r += 3, s += i() + "|$)";
                break;
              case "=":
                s += "(?=", r += 3, s += i() + ")";
                break;
              case "!":
                a2 = r, r += 3, i(), s += t.substr(a2, r - a2);
                break;
              case "<":
                switch (t[r + 3]) {
                  case "=":
                  case "!":
                    a2 = r, r += 4, i(), s += t.substr(a2, r - a2);
                    break;
                  default:
                    o(t.indexOf(">", r) - r + 1), s += i() + "|$)";
                    break;
                }
                break;
            }
          else
            o(1), s += i() + "|$)";
          break;
        case ")":
          return ++r, s;
        default:
          l(1);
          break;
      }
    return s;
  }
  return new RegExp(i(), n.flags);
}
function Zd(n) {
  return n.rules.find((e) => we(e) && e.entry);
}
function ef(n) {
  return n.rules.filter((e) => At(e) && e.hidden);
}
function eu(n, e) {
  const t = /* @__PURE__ */ new Set(), r = Zd(n);
  if (!r)
    return new Set(n.rules);
  const i = [r].concat(ef(n));
  for (const a2 of i)
    tu(a2, t, e);
  const s = /* @__PURE__ */ new Set();
  for (const a2 of n.rules)
    (t.has(a2.name) || At(a2) && a2.hidden) && s.add(a2);
  return s;
}
function tu(n, e, t) {
  e.add(n.name), tr(n).forEach((r) => {
    if (gt(r) || t && ql(r)) {
      const i = r.rule.ref;
      i && !e.has(i.name) && tu(i, e, t);
    }
  });
}
function tf(n) {
  if (n.terminal)
    return n.terminal;
  if (n.type.ref) {
    const e = ru(n.type.ref);
    return e == null ? void 0 : e.terminal;
  }
}
function nf(n) {
  return n.hidden && !hs(ra(n));
}
function rf(n, e) {
  return !n || !e ? [] : ea(n, e, n.astNode, true);
}
function nu(n, e, t) {
  if (!n || !e)
    return;
  const r = ea(n, e, n.astNode, true);
  if (r.length !== 0)
    return t !== void 0 ? t = Math.max(0, Math.min(t, r.length - 1)) : t = 0, r[t];
}
function ea(n, e, t, r) {
  if (!r) {
    const i = Ti(n.grammarSource, pt);
    if (i && i.feature === e)
      return [n];
  }
  return _n(n) && n.astNode === t ? n.content.flatMap((i) => ea(i, e, t, false)) : [];
}
function sf(n, e, t) {
  if (!n)
    return;
  const r = af(n, e, n == null ? void 0 : n.astNode);
  if (r.length !== 0)
    return t !== void 0 ? t = Math.max(0, Math.min(t, r.length - 1)) : t = 0, r[t];
}
function af(n, e, t) {
  if (n.astNode !== t)
    return [];
  if (mt(n.grammarSource) && n.grammarSource.value === e)
    return [n];
  const r = us(n).iterator();
  let i;
  const s = [];
  do
    if (i = r.next(), !i.done) {
      const a2 = i.value;
      a2.astNode === t ? mt(a2.grammarSource) && a2.grammarSource.value === e && s.push(a2) : r.prune();
    }
  while (!i.done);
  return s;
}
function of(n) {
  var e;
  const t = n.astNode;
  for (; t === ((e = n.container) === null || e === void 0 ? void 0 : e.astNode); ) {
    const r = Ti(n.grammarSource, pt);
    if (r)
      return r;
    n = n.container;
  }
}
function ru(n) {
  let e = n;
  return Wl(e) && (yi(e.$container) ? e = e.$container.$container : we(e.$container) ? e = e.$container : er(e.$container)), iu(n, e, /* @__PURE__ */ new Map());
}
function iu(n, e, t) {
  var r;
  function i(s, a2) {
    let o;
    return Ti(s, pt) || (o = iu(a2, a2, t)), t.set(n, o), o;
  }
  if (t.has(n))
    return t.get(n);
  t.set(n, void 0);
  for (const s of tr(e)) {
    if (pt(s) && s.feature.toLowerCase() === "name")
      return t.set(n, s), s;
    if (gt(s) && we(s.rule.ref))
      return i(s, s.rule.ref);
    if (Ld(s) && (!((r = s.typeRef) === null || r === void 0) && r.ref))
      return i(s, s.typeRef.ref);
  }
}
function su(n) {
  return au(n, /* @__PURE__ */ new Set());
}
function au(n, e) {
  if (e.has(n))
    return true;
  e.add(n);
  for (const t of tr(n))
    if (gt(t)) {
      if (!t.rule.ref || we(t.rule.ref) && !au(t.rule.ref, e))
        return false;
    } else {
      if (pt(t))
        return false;
      if (yi(t))
        return false;
    }
  return !!n.definition;
}
function ta(n) {
  if (n.inferredType)
    return n.inferredType.name;
  if (n.dataType)
    return n.dataType;
  if (n.returnType) {
    const e = n.returnType.ref;
    if (e) {
      if (we(e))
        return e.name;
      if (Hl(e) || jl(e))
        return e.name;
    }
  }
}
function na(n) {
  var e;
  if (we(n))
    return su(n) ? n.name : (e = ta(n)) !== null && e !== void 0 ? e : n.name;
  if (Hl(n) || jl(n) || wd(n))
    return n.name;
  if (yi(n)) {
    const t = lf(n);
    if (t)
      return t;
  } else if (Wl(n))
    return n.name;
  throw new Error("Cannot get name of Unknown Type");
}
function lf(n) {
  var e;
  if (n.inferredType)
    return n.inferredType.name;
  if (!((e = n.type) === null || e === void 0) && e.ref)
    return na(n.type.ref);
}
function uf(n) {
  var e, t, r;
  return At(n) ? (t = (e = n.type) === null || e === void 0 ? void 0 : e.name) !== null && t !== void 0 ? t : "string" : (r = ta(n)) !== null && r !== void 0 ? r : n.name;
}
function ra(n) {
  const e = {
    s: false,
    i: false,
    u: false
  }, t = Ut(n.definition, e), r = Object.entries(e).filter(([, i]) => i).map(([i]) => i).join("");
  return new RegExp(t, r);
}
const ia = /[\s\S]/.source;
function Ut(n, e) {
  if (Md(n))
    return cf(n);
  if (Dd(n))
    return df(n);
  if (_d(n))
    return pf(n);
  if (ql(n)) {
    const t = n.rule.ref;
    if (!t)
      throw new Error("Missing rule reference.");
    return qe(Ut(t.definition), {
      cardinality: n.cardinality,
      lookahead: n.lookahead
    });
  } else {
    if (Od(n))
      return hf(n);
    if (Fd(n))
      return ff(n);
    if (Pd(n)) {
      const t = n.regex.lastIndexOf("/"), r = n.regex.substring(1, t), i = n.regex.substring(t + 1);
      return e && (e.i = i.includes("i"), e.s = i.includes("s"), e.u = i.includes("u")), qe(r, {
        cardinality: n.cardinality,
        lookahead: n.lookahead,
        wrap: false
      });
    } else {
      if (Gd(n))
        return qe(ia, {
          cardinality: n.cardinality,
          lookahead: n.lookahead
        });
      throw new Error(`Invalid terminal element: ${n == null ? void 0 : n.$type}`);
    }
  }
}
function cf(n) {
  return qe(n.elements.map((e) => Ut(e)).join("|"), {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function df(n) {
  return qe(n.elements.map((e) => Ut(e)).join(""), {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function ff(n) {
  return qe(`${ia}*?${Ut(n.terminal)}`, {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function hf(n) {
  return qe(`(?!${Ut(n.terminal)})${ia}*?`, {
    cardinality: n.cardinality,
    lookahead: n.lookahead
  });
}
function pf(n) {
  return n.right ? qe(`[${Bi(n.left)}-${Bi(n.right)}]`, {
    cardinality: n.cardinality,
    lookahead: n.lookahead,
    wrap: false
  }) : qe(Bi(n.left), {
    cardinality: n.cardinality,
    lookahead: n.lookahead,
    wrap: false
  });
}
function Bi(n) {
  return vi(n.value);
}
function qe(n, e) {
  var t;
  return (e.wrap !== false || e.lookahead) && (n = `(${(t = e.lookahead) !== null && t !== void 0 ? t : ""}${n})`), e.cardinality ? `${n}${e.cardinality}` : n;
}
function mf(n) {
  const e = [], t = n.Grammar;
  for (const r of t.rules)
    At(r) && nf(r) && qd(ra(r)) && e.push(r.name);
  return {
    multilineCommentRules: e,
    nameRegexp: Ad
  };
}
function ps(n) {
  console && console.error && console.error(`Error: ${n}`);
}
function ou(n) {
  console && console.warn && console.warn(`Warning: ${n}`);
}
function lu(n) {
  const e = (/* @__PURE__ */ new Date()).getTime(), t = n();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: t };
}
function uu(n) {
  function e() {
  }
  e.prototype = n;
  const t = new e();
  function r() {
    return typeof t.bar;
  }
  return r(), r(), n;
}
function gf(n) {
  return yf(n) ? n.LABEL : n.name;
}
function yf(n) {
  return he(n.LABEL) && n.LABEL !== "";
}
class Be {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    this._definition = e;
  }
  accept(e) {
    e.visit(this), Mt$1(this.definition, (t) => {
      t.accept(e);
    });
  }
}
class ue extends Be {
  constructor(e) {
    super([]), this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
  set definition(e) {
  }
  get definition() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }
  accept(e) {
    e.visit(this);
  }
}
class Bt extends Be {
  constructor(e) {
    super(e.definition), this.orgText = "", $e(this, Me(e, (t) => t !== void 0));
  }
}
class pe extends Be {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = false, $e(this, Me(e, (t) => t !== void 0));
  }
}
let te = class extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
};
class xe extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
}
class Se extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
}
class W extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
}
class me extends Be {
  constructor(e) {
    super(e.definition), this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
}
class ge extends Be {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = false, this.hasPredicates = false, $e(this, Me(e, (t) => t !== void 0));
  }
}
class G {
  constructor(e) {
    this.idx = 1, $e(this, Me(e, (t) => t !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}
function Tf(n) {
  return on$1(n, wr);
}
function wr(n) {
  function e(t) {
    return on$1(t, wr);
  }
  if (n instanceof ue) {
    const t = {
      type: "NonTerminal",
      name: n.nonTerminalName,
      idx: n.idx
    };
    return he(n.label) && (t.label = n.label), t;
  } else {
    if (n instanceof pe)
      return {
        type: "Alternative",
        definition: e(n.definition)
      };
    if (n instanceof te)
      return {
        type: "Option",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof xe)
      return {
        type: "RepetitionMandatory",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof Se)
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: n.idx,
        separator: wr(new G({ terminalType: n.separator })),
        definition: e(n.definition)
      };
    if (n instanceof me)
      return {
        type: "RepetitionWithSeparator",
        idx: n.idx,
        separator: wr(new G({ terminalType: n.separator })),
        definition: e(n.definition)
      };
    if (n instanceof W)
      return {
        type: "Repetition",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof ge)
      return {
        type: "Alternation",
        idx: n.idx,
        definition: e(n.definition)
      };
    if (n instanceof G) {
      const t = {
        type: "Terminal",
        name: n.terminalType.name,
        label: gf(n.terminalType),
        idx: n.idx
      };
      he(n.label) && (t.terminalLabel = n.label);
      const r = n.terminalType.PATTERN;
      return n.terminalType.PATTERN && (t.pattern = Xe(r) ? r.source : r), t;
    } else {
      if (n instanceof Bt)
        return {
          type: "Rule",
          name: n.name,
          orgText: n.orgText,
          definition: e(n.definition)
        };
      throw Error("non exhaustive match");
    }
  }
}
class Vt {
  visit(e) {
    const t = e;
    switch (t.constructor) {
      case ue:
        return this.visitNonTerminal(t);
      case pe:
        return this.visitAlternative(t);
      case te:
        return this.visitOption(t);
      case xe:
        return this.visitRepetitionMandatory(t);
      case Se:
        return this.visitRepetitionMandatoryWithSeparator(t);
      case me:
        return this.visitRepetitionWithSeparator(t);
      case W:
        return this.visitRepetition(t);
      case ge:
        return this.visitAlternation(t);
      case G:
        return this.visitTerminal(t);
      case Bt:
        return this.visitRule(t);
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(e) {
  }
  /* c8 ignore next */
  visitAlternative(e) {
  }
  /* c8 ignore next */
  visitOption(e) {
  }
  /* c8 ignore next */
  visitRepetition(e) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(e) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(e) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(e) {
  }
  /* c8 ignore next */
  visitAlternation(e) {
  }
  /* c8 ignore next */
  visitTerminal(e) {
  }
  /* c8 ignore next */
  visitRule(e) {
  }
}
function Rf(n) {
  return n instanceof pe || n instanceof te || n instanceof W || n instanceof xe || n instanceof Se || n instanceof me || n instanceof G || n instanceof Bt;
}
function qr(n, e = []) {
  return n instanceof te || n instanceof W || n instanceof me ? true : n instanceof ge ? Gl(n.definition, (r) => qr(r, e)) : n instanceof ue && de(e, n) ? false : n instanceof Be ? (n instanceof ue && e.push(n), Oe(n.definition, (r) => qr(r, e))) : false;
}
function vf(n) {
  return n instanceof ge;
}
function Ge(n) {
  if (n instanceof ue)
    return "SUBRULE";
  if (n instanceof te)
    return "OPTION";
  if (n instanceof ge)
    return "OR";
  if (n instanceof xe)
    return "AT_LEAST_ONE";
  if (n instanceof Se)
    return "AT_LEAST_ONE_SEP";
  if (n instanceof me)
    return "MANY_SEP";
  if (n instanceof W)
    return "MANY";
  if (n instanceof G)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class Ai {
  walk(e, t = []) {
    Mt$1(e.definition, (r, i) => {
      const s = J(e.definition, i + 1);
      if (r instanceof ue)
        this.walkProdRef(r, s, t);
      else if (r instanceof G)
        this.walkTerminal(r, s, t);
      else if (r instanceof pe)
        this.walkFlat(r, s, t);
      else if (r instanceof te)
        this.walkOption(r, s, t);
      else if (r instanceof xe)
        this.walkAtLeastOne(r, s, t);
      else if (r instanceof Se)
        this.walkAtLeastOneSep(r, s, t);
      else if (r instanceof me)
        this.walkManySep(r, s, t);
      else if (r instanceof W)
        this.walkMany(r, s, t);
      else if (r instanceof ge)
        this.walkOr(r, s, t);
      else
        throw Error("non exhaustive match");
    });
  }
  walkTerminal(e, t, r) {
  }
  walkProdRef(e, t, r) {
  }
  walkFlat(e, t, r) {
    const i = t.concat(r);
    this.walk(e, i);
  }
  walkOption(e, t, r) {
    const i = t.concat(r);
    this.walk(e, i);
  }
  walkAtLeastOne(e, t, r) {
    const i = [
      new te({ definition: e.definition })
    ].concat(t, r);
    this.walk(e, i);
  }
  walkAtLeastOneSep(e, t, r) {
    const i = _a(e, t, r);
    this.walk(e, i);
  }
  walkMany(e, t, r) {
    const i = [
      new te({ definition: e.definition })
    ].concat(t, r);
    this.walk(e, i);
  }
  walkManySep(e, t, r) {
    const i = _a(e, t, r);
    this.walk(e, i);
  }
  walkOr(e, t, r) {
    const i = t.concat(r);
    Mt$1(e.definition, (s) => {
      const a2 = new pe({ definition: [s] });
      this.walk(a2, i);
    });
  }
}
function _a(n, e, t) {
  return [
    new te({
      definition: [
        new G({ terminalType: n.separator })
      ].concat(n.definition)
    })
  ].concat(e, t);
}
function nr(n) {
  if (n instanceof ue)
    return nr(n.referencedRule);
  if (n instanceof G)
    return $f(n);
  if (Rf(n))
    return Af(n);
  if (vf(n))
    return Ef(n);
  throw Error("non exhaustive match");
}
function Af(n) {
  let e = [];
  const t = n.definition;
  let r = 0, i = t.length > r, s, a2 = true;
  for (; i && a2; )
    s = t[r], a2 = qr(s), e = e.concat(nr(s)), r = r + 1, i = t.length > r;
  return Xs(e);
}
function Ef(n) {
  const e = on$1(n.definition, (t) => nr(t));
  return Xs(un$1(e));
}
function $f(n) {
  return [n.terminalType];
}
const cu = "_~IN~_";
class kf extends Ai {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, t, r) {
  }
  walkProdRef(e, t, r) {
    const i = Sf(e.referencedRule, e.idx) + this.topProd.name, s = t.concat(r), a2 = new pe({ definition: s }), o = nr(a2);
    this.follows[i] = o;
  }
}
function xf(n) {
  const e = {};
  return Mt$1(n, (t) => {
    const r = new kf(t).startWalking();
    $e(e, r);
  }), e;
}
function Sf(n, e) {
  return n.name + e + cu;
}
let Lr = {};
const If = new Zl();
function Ei(n) {
  const e = n.toString();
  if (Lr.hasOwnProperty(e))
    return Lr[e];
  {
    const t = If.pattern(e);
    return Lr[e] = t, t;
  }
}
function Cf() {
  Lr = {};
}
const du = "Complement Sets are not supported for first char optimization", Yr = `Unable to use "first char" lexer optimizations:
`;
function Nf(n, e = false) {
  try {
    const t = Ei(n);
    return ms(t.value, {}, t.flags.ignoreCase);
  } catch (t) {
    if (t.message === du)
      e && ou(`${Yr}	Unable to optimize: < ${n.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), ps(`${Yr}
	Failed parsing: < ${n.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function ms(n, e, t) {
  switch (n.type) {
    case "Disjunction":
      for (let i = 0; i < n.value.length; i++)
        ms(n.value[i], e, t);
      break;
    case "Alternative":
      const r = n.value;
      for (let i = 0; i < r.length; i++) {
        const s = r[i];
        switch (s.type) {
          case "EndAnchor":
          case "GroupBackReference":
          case "Lookahead":
          case "NegativeLookahead":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const a2 = s;
        switch (a2.type) {
          case "Character":
            Tr(a2.value, e, t);
            break;
          case "Set":
            if (a2.complement === true)
              throw Error(du);
            Mt$1(a2.value, (l) => {
              if (typeof l == "number")
                Tr(l, e, t);
              else {
                const u = l;
                if (t === true)
                  for (let c = u.from; c <= u.to; c++)
                    Tr(c, e, t);
                else {
                  for (let c = u.from; c <= u.to && c < $n; c++)
                    Tr(c, e, t);
                  if (u.to >= $n) {
                    const c = u.from >= $n ? u.from : $n, d = u.to, h = tt(c), f = tt(d);
                    for (let m = h; m <= f; m++)
                      e[m] = m;
                  }
                }
              }
            });
            break;
          case "Group":
            ms(a2.value, e, t);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const o = a2.quantifier !== void 0 && a2.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a2.type === "Group" && gs(a2) === false || // If this term is not a group it may only be optional if it has an optional quantifier
          a2.type !== "Group" && o === false
        )
          break;
      }
      break;
    default:
      throw Error("non exhaustive match!");
  }
  return Ft$1(e);
}
function Tr(n, e, t) {
  const r = tt(n);
  e[r] = r, t === true && wf(n, e);
}
function wf(n, e) {
  const t = String.fromCharCode(n), r = t.toUpperCase();
  if (r !== t) {
    const i = tt(r.charCodeAt(0));
    e[i] = i;
  } else {
    const i = t.toLowerCase();
    if (i !== t) {
      const s = tt(i.charCodeAt(0));
      e[s] = s;
    }
  }
}
function ba(n, e) {
  return vn$1(n.value, (t) => {
    if (typeof t == "number")
      return de(e, t);
    {
      const r = t;
      return vn$1(e, (i) => r.from <= i && i <= r.to) !== void 0;
    }
  });
}
function gs(n) {
  const e = n.quantifier;
  return e && e.atLeast === 0 ? true : n.value ? Ao$1(n.value) ? Oe(n.value, gs) : gs(n.value) : false;
}
class Lf extends Ri {
  constructor(e) {
    super(), this.targetCharCodes = e, this.found = false;
  }
  visitChildren(e) {
    if (this.found !== true) {
      switch (e.type) {
        case "Lookahead":
          this.visitLookahead(e);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          return;
      }
      super.visitChildren(e);
    }
  }
  visitCharacter(e) {
    de(this.targetCharCodes, e.value) && (this.found = true);
  }
  visitSet(e) {
    e.complement ? ba(e, this.targetCharCodes) === void 0 && (this.found = true) : ba(e, this.targetCharCodes) !== void 0 && (this.found = true);
  }
}
function sa(n, e) {
  if (e instanceof RegExp) {
    const t = Ei(e), r = new Lf(n);
    return r.visit(t), r.found;
  } else
    return vn$1(e, (t) => de(n, t.charCodeAt(0))) !== void 0;
}
const yt = "PATTERN", En = "defaultMode", Rr = "modes";
let fu = typeof new RegExp("(?:)").sticky == "boolean";
function _f(n, e) {
  e = hn$1(e, {
    useSticky: fu,
    debug: false,
    safeMode: false,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (E2, R) => R()
  });
  const t = e.tracer;
  t("initCharCodeToOptimizedIndexMap", () => {
    th();
  });
  let r;
  t("Reject Lexer.NA", () => {
    r = gi(n, (E2) => E2[yt] === fe.NA);
  });
  let i = false, s;
  t("Transform Patterns", () => {
    i = false, s = on$1(r, (E2) => {
      const R = E2[yt];
      if (Xe(R)) {
        const I = R.source;
        return I.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        I !== "^" && I !== "$" && I !== "." && !R.ignoreCase ? I : I.length === 2 && I[0] === "\\" && // not a meta character
        !de([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], I[1]) ? I[1] : e.useSticky ? Pa(R) : Oa(R);
      } else {
        if (Jc$1(R))
          return i = true, { exec: R };
        if (typeof R == "object")
          return i = true, R;
        if (typeof R == "string") {
          if (R.length === 1)
            return R;
          {
            const I = R.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), F = new RegExp(I);
            return e.useSticky ? Pa(F) : Oa(F);
          }
        } else
          throw Error("non exhaustive match");
      }
    });
  });
  let a2, o, l, u, c;
  t("misc mapping", () => {
    a2 = on$1(r, (E2) => E2.tokenTypeIdx), o = on$1(r, (E2) => {
      const R = E2.GROUP;
      if (R !== fe.SKIPPED) {
        if (he(R))
          return R;
        if (Dt$1(R))
          return false;
        throw Error("non exhaustive match");
      }
    }), l = on$1(r, (E2) => {
      const R = E2.LONGER_ALT;
      if (R)
        return Ao$1(R) ? on$1(R, (F) => Sa(r, F)) : [Sa(r, R)];
    }), u = on$1(r, (E2) => E2.PUSH_MODE), c = on$1(r, (E2) => xn$1(E2, "POP_MODE"));
  });
  let d;
  t("Line Terminator Handling", () => {
    const E2 = mu(e.lineTerminatorCharacters);
    d = on$1(r, (R) => false), e.positionTracking !== "onlyOffset" && (d = on$1(r, (R) => xn$1(R, "LINE_BREAKS") ? !!R.LINE_BREAKS : pu(R, E2) === false && sa(E2, R.PATTERN)));
  });
  let h, f, m, g;
  t("Misc Mapping #2", () => {
    h = on$1(r, hu), f = on$1(s, Qf), m = mt$1(r, (E2, R) => {
      const I = R.GROUP;
      return he(I) && I !== fe.SKIPPED && (E2[I] = []), E2;
    }, {}), g = on$1(s, (E2, R) => ({
      pattern: s[R],
      longerAlt: l[R],
      canLineTerminator: d[R],
      isCustom: h[R],
      short: f[R],
      group: o[R],
      push: u[R],
      pop: c[R],
      tokenTypeIdx: a2[R],
      tokenType: r[R]
    }));
  });
  let A = true, y = [];
  return e.safeMode || t("First Char Optimization", () => {
    y = mt$1(r, (E2, R, I) => {
      if (typeof R.PATTERN == "string") {
        const F = R.PATTERN.charCodeAt(0), re = tt(F);
        Vi(E2, re, g[I]);
      } else if (Ao$1(R.START_CHARS_HINT)) {
        let F;
        Mt$1(R.START_CHARS_HINT, (re) => {
          const Le = typeof re == "string" ? re.charCodeAt(0) : re, ye = tt(Le);
          F !== ye && (F = ye, Vi(E2, ye, g[I]));
        });
      } else if (Xe(R.PATTERN))
        if (R.PATTERN.unicode)
          A = false, e.ensureOptimizations && ps(`${Yr}	Unable to analyze < ${R.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const F = Nf(R.PATTERN, e.ensureOptimizations);
          Zd$1(F) && (A = false), Mt$1(F, (re) => {
            Vi(E2, re, g[I]);
          });
        }
      else
        e.ensureOptimizations && ps(`${Yr}	TokenType: <${R.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), A = false;
      return E2;
    }, []);
  }), {
    emptyGroups: m,
    patternIdxToConfig: g,
    charCodeToPatternIdxToConfig: y,
    hasCustom: i,
    canBeOptimized: A
  };
}
function bf(n, e) {
  let t = [];
  const r = Pf(n);
  t = t.concat(r.errors);
  const i = Mf(r.valid), s = i.valid;
  return t = t.concat(i.errors), t = t.concat(Of(s)), t = t.concat(Wf(s)), t = t.concat(Hf(s, e)), t = t.concat(jf(s)), t;
}
function Of(n) {
  let e = [];
  const t = Rt$1(n, (r) => Xe(r[yt]));
  return e = e.concat(Ff(t)), e = e.concat(Bf(t)), e = e.concat(Vf(t)), e = e.concat(Kf(t)), e = e.concat(Gf(t)), e;
}
function Pf(n) {
  const e = Rt$1(n, (i) => !xn$1(i, yt)), t = on$1(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: H.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = mi(n, e);
  return { errors: t, valid: r };
}
function Mf(n) {
  const e = Rt$1(n, (i) => {
    const s = i[yt];
    return !Xe(s) && !Jc$1(s) && !xn$1(s, "exec") && !he(s);
  }), t = on$1(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: H.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = mi(n, e);
  return { errors: t, valid: r };
}
const Df = /[^\\][$]/;
function Ff(n) {
  class e extends Ri {
    constructor() {
      super(...arguments), this.found = false;
    }
    visitEndAnchor(s) {
      this.found = true;
    }
  }
  const t = Rt$1(n, (i) => {
    const s = i.PATTERN;
    try {
      const a2 = Ei(s), o = new e();
      return o.visit(a2), o.found;
    } catch {
      return Df.test(s.source);
    }
  });
  return on$1(t, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: H.EOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function Gf(n) {
  const e = Rt$1(n, (r) => r.PATTERN.test(""));
  return on$1(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
    type: H.EMPTY_MATCH_PATTERN,
    tokenTypes: [r]
  }));
}
const Uf = /[^\\[][\^]|^\^/;
function Bf(n) {
  class e extends Ri {
    constructor() {
      super(...arguments), this.found = false;
    }
    visitStartAnchor(s) {
      this.found = true;
    }
  }
  const t = Rt$1(n, (i) => {
    const s = i.PATTERN;
    try {
      const a2 = Ei(s), o = new e();
      return o.visit(a2), o.found;
    } catch {
      return Uf.test(s.source);
    }
  });
  return on$1(t, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: H.SOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function Vf(n) {
  const e = Rt$1(n, (r) => {
    const i = r[yt];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return on$1(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain window('g') or multiline('m')",
    type: H.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [r]
  }));
}
function Kf(n) {
  const e = [];
  let t = on$1(n, (s) => mt$1(n, (a2, o) => (s.PATTERN.source === o.PATTERN.source && !de(e, o) && o.PATTERN !== fe.NA && (e.push(o), a2.push(o)), a2), []));
  t = Zn(t);
  const r = Rt$1(t, (s) => s.length > 1);
  return on$1(r, (s) => {
    const a2 = on$1(s, (l) => l.name);
    return {
      message: `The same RegExp pattern ->${Pe(s).PATTERN}<-has been used in all of the following Token Types: ${a2.join(", ")} <-`,
      type: H.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: s
    };
  });
}
function Wf(n) {
  const e = Rt$1(n, (r) => {
    if (!xn$1(r, "GROUP"))
      return false;
    const i = r.GROUP;
    return i !== fe.SKIPPED && i !== fe.NA && !he(i);
  });
  return on$1(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: H.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [r]
  }));
}
function Hf(n, e) {
  const t = Rt$1(n, (i) => i.PUSH_MODE !== void 0 && !de(e, i.PUSH_MODE));
  return on$1(t, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: H.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i]
  }));
}
function jf(n) {
  const e = [], t = mt$1(n, (r, i, s) => {
    const a2 = i.PATTERN;
    return a2 === fe.NA || (he(a2) ? r.push({ str: a2, idx: s, tokenType: i }) : Xe(a2) && qf(a2) && r.push({ str: a2.source, idx: s, tokenType: i })), r;
  }, []);
  return Mt$1(n, (r, i) => {
    Mt$1(t, ({ str: s, idx: a2, tokenType: o }) => {
      if (i < a2 && zf(s, r.PATTERN)) {
        const l = `Token: ->${o.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({
          message: l,
          type: H.UNREACHABLE_PATTERN,
          tokenTypes: [r, o]
        });
      }
    });
  }), e;
}
function zf(n, e) {
  if (Xe(e)) {
    const t = e.exec(n);
    return t !== null && t.index === 0;
  } else {
    if (Jc$1(e))
      return e(n, 0, [], {});
    if (xn$1(e, "exec"))
      return e.exec(n, 0, [], {});
    if (typeof e == "string")
      return e === n;
    throw Error("non exhaustive match");
  }
}
function qf(n) {
  return vn$1([
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ], (t) => n.source.indexOf(t) !== -1) === void 0;
}
function Oa(n) {
  const e = n.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${n.source})`, e);
}
function Pa(n) {
  const e = n.ignoreCase ? "iy" : "y";
  return new RegExp(`${n.source}`, e);
}
function Yf(n, e, t) {
  const r = [];
  return xn$1(n, En) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + En + `> property in its definition
`,
    type: H.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), xn$1(n, Rr) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Rr + `> property in its definition
`,
    type: H.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), xn$1(n, Rr) && xn$1(n, En) && !xn$1(n.modes, n.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${En}: <${n.defaultMode}>which does not exist
`,
    type: H.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), xn$1(n, Rr) && Mt$1(n.modes, (i, s) => {
    Mt$1(i, (a2, o) => {
      if (Dt$1(a2))
        r.push({
          message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${s}> at index: <${o}>
`,
          type: H.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
        });
      else if (xn$1(a2, "LONGER_ALT")) {
        const l = Ao$1(a2.LONGER_ALT) ? a2.LONGER_ALT : [a2.LONGER_ALT];
        Mt$1(l, (u) => {
          !Dt$1(u) && !de(i, u) && r.push({
            message: `A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${a2.name}> outside of mode <${s}>
`,
            type: H.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
          });
        });
      }
    });
  }), r;
}
function Xf(n, e, t) {
  const r = [];
  let i = false;
  const s = Zn(un$1(Ft$1(n.modes))), a2 = gi(s, (l) => l[yt] === fe.NA), o = mu(t);
  return e && Mt$1(a2, (l) => {
    const u = pu(l, o);
    if (u !== false) {
      const d = {
        message: eh(l, u),
        type: u.issue,
        tokenType: l
      };
      r.push(d);
    } else
      xn$1(l, "LINE_BREAKS") ? l.LINE_BREAKS === true && (i = true) : sa(o, l.PATTERN) && (i = true);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: H.NO_LINE_BREAKS_FLAGS
  }), r;
}
function Jf(n) {
  const e = {}, t = O$1(n);
  return Mt$1(t, (r) => {
    const i = n[r];
    if (Ao$1(i))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function hu(n) {
  const e = n.PATTERN;
  if (Xe(e))
    return false;
  if (Jc$1(e))
    return true;
  if (xn$1(e, "exec"))
    return true;
  if (he(e))
    return false;
  throw Error("non exhaustive match");
}
function Qf(n) {
  return he(n) && n.length === 1 ? n.charCodeAt(0) : false;
}
const Zf = {
  // implements /\n|\r\n?/g.test
  test: function(n) {
    const e = n.length;
    for (let t = this.lastIndex; t < e; t++) {
      const r = n.charCodeAt(t);
      if (r === 10)
        return this.lastIndex = t + 1, true;
      if (r === 13)
        return n.charCodeAt(t + 1) === 10 ? this.lastIndex = t + 2 : this.lastIndex = t + 1, true;
    }
    return false;
  },
  lastIndex: 0
};
function pu(n, e) {
  if (xn$1(n, "LINE_BREAKS"))
    return false;
  if (Xe(n.PATTERN)) {
    try {
      sa(e, n.PATTERN);
    } catch (t) {
      return {
        issue: H.IDENTIFY_TERMINATOR,
        errMsg: t.message
      };
    }
    return false;
  } else {
    if (he(n.PATTERN))
      return false;
    if (hu(n))
      return { issue: H.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function eh(n, e) {
  if (e.issue === H.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${n.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === H.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${n.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
function mu(n) {
  return on$1(n, (t) => he(t) ? t.charCodeAt(0) : t);
}
function Vi(n, e, t) {
  n[e] === void 0 ? n[e] = [t] : n[e].push(t);
}
const $n = 256;
let _r = [];
function tt(n) {
  return n < $n ? n : _r[n];
}
function th() {
  if (Zd$1(_r)) {
    _r = new Array(65536);
    for (let n = 0; n < 65536; n++)
      _r[n] = n > 255 ? 255 + ~~(n / 255) : n;
  }
}
function rr(n, e) {
  const t = n.tokenTypeIdx;
  return t === e.tokenTypeIdx ? true : e.isParent === true && e.categoryMatchesMap[t] === true;
}
function Xr(n, e) {
  return n.tokenTypeIdx === e.tokenTypeIdx;
}
let Ma = 1;
const gu = {};
function ir(n) {
  const e = nh(n);
  rh(e), sh(e), ih(e), Mt$1(e, (t) => {
    t.isParent = t.categoryMatches.length > 0;
  });
}
function nh(n) {
  let e = a(n), t = n, r = true;
  for (; r; ) {
    t = Zn(un$1(on$1(t, (s) => s.CATEGORIES)));
    const i = mi(t, e);
    e = e.concat(i), Zd$1(i) ? r = false : t = i;
  }
  return e;
}
function rh(n) {
  Mt$1(n, (e) => {
    Tu(e) || (gu[Ma] = e, e.tokenTypeIdx = Ma++), Da(e) && !Ao$1(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), Da(e) || (e.CATEGORIES = []), ah(e) || (e.categoryMatches = []), oh(e) || (e.categoryMatchesMap = {});
  });
}
function ih(n) {
  Mt$1(n, (e) => {
    e.categoryMatches = [], Mt$1(e.categoryMatchesMap, (t, r) => {
      e.categoryMatches.push(gu[r].tokenTypeIdx);
    });
  });
}
function sh(n) {
  Mt$1(n, (e) => {
    yu([], e);
  });
}
function yu(n, e) {
  Mt$1(n, (t) => {
    e.categoryMatchesMap[t.tokenTypeIdx] = true;
  }), Mt$1(e.CATEGORIES, (t) => {
    const r = n.concat(e);
    de(r, t) || yu(r, t);
  });
}
function Tu(n) {
  return xn$1(n, "tokenTypeIdx");
}
function Da(n) {
  return xn$1(n, "CATEGORIES");
}
function ah(n) {
  return xn$1(n, "categoryMatches");
}
function oh(n) {
  return xn$1(n, "categoryMatchesMap");
}
function lh(n) {
  return xn$1(n, "tokenTypeIdx");
}
const ys = {
  buildUnableToPopLexerModeMessage(n) {
    return `Unable to pop Lexer Mode after encountering Token ->${n.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(n, e, t, r, i) {
    return `unexpected character: ->${n.charAt(e)}<- at offset: ${e}, skipped ${t} characters.`;
  }
};
var H;
(function(n) {
  n[n.MISSING_PATTERN = 0] = "MISSING_PATTERN", n[n.INVALID_PATTERN = 1] = "INVALID_PATTERN", n[n.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", n[n.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", n[n.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", n[n.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", n[n.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", n[n.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", n[n.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", n[n.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", n[n.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", n[n.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", n[n.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", n[n.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", n[n.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", n[n.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", n[n.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", n[n.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(H || (H = {}));
const kn = {
  deferDefinitionErrorsHandling: false,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: false,
  safeMode: false,
  errorMessageProvider: ys,
  traceInitPerf: false,
  skipValidations: false,
  recoveryEnabled: true
};
Object.freeze(kn);
class fe {
  constructor(e, t = kn) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = true, this.trackEndLines = true, this.hasCustom = false, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, s) => {
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        const a2 = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${a2}--> <${i}>`);
        const { time: o, value: l } = lu(s), u = o > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${a2}<-- <${i}> time: ${o}ms`), this.traceInitIndent--, l;
      } else
        return s();
    }, typeof t == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = $e({}, kn, t);
    const r = this.config.traceInitPerf;
    r === true ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = true) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = true), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, s = true;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === kn.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = Zf;
        else if (this.config.lineTerminatorCharacters === kn.lineTerminatorCharacters)
          throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (t.safeMode && t.ensureOptimizations)
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), Ao$1(e) ? i = {
          modes: { defaultMode: a(e) },
          defaultMode: En
        } : (s = false, i = a(e));
      }), this.config.skipValidations === false && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Yf(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Xf(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, Mt$1(i.modes, (o, l) => {
        i.modes[l] = gi(o, (u) => Dt$1(u));
      });
      const a$1 = O$1(i.modes);
      if (Mt$1(i.modes, (o, l) => {
        this.TRACE_INIT(`Mode: <${l}> processing`, () => {
          if (this.modes.push(l), this.config.skipValidations === false && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(bf(o, a$1));
          }), Zd$1(this.lexerDefinitionErrors)) {
            ir(o);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = _f(o, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: t.positionTracking,
                ensureOptimizations: t.ensureOptimizations,
                safeMode: t.safeMode,
                tracer: this.TRACE_INIT
              });
            }), this.patternIdxToConfig[l] = u.patternIdxToConfig, this.charCodeToPatternIdxToConfig[l] = u.charCodeToPatternIdxToConfig, this.emptyGroups = $e({}, this.emptyGroups, u.emptyGroups), this.hasCustom = u.hasCustom || this.hasCustom, this.canModeBeOptimized[l] = u.canBeOptimized;
          }
        });
      }), this.defaultMode = i.defaultMode, !Zd$1(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const l = on$1(this.lexerDefinitionErrors, (u) => u.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + l);
      }
      Mt$1(this.lexerDefinitionWarning, (o) => {
        ou(o.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (fu ? (this.chopInput = $m$1, this.match = this.matchWithTest) : (this.updateLastIndex = Wn$1, this.match = this.matchWithExec), s && (this.handleModes = Wn$1), this.trackStartLines === false && (this.computeNewColumn = $m$1), this.trackEndLines === false && (this.updateTokenEndLineColumnLocation = Wn$1), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const o = mt$1(this.canModeBeOptimized, (l, u, c) => (u === false && l.push(c), l), []);
        if (t.ensureOptimizations && !Zd$1(o))
          throw Error(`Lexer Modes: < ${o.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        Cf();
      }), this.TRACE_INIT("toFastProperties", () => {
        uu(this);
      });
    });
  }
  tokenize(e, t = this.defaultMode) {
    if (!Zd$1(this.lexerDefinitionErrors)) {
      const i = on$1(this.lexerDefinitionErrors, (s) => s.message).join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + i);
    }
    return this.tokenizeInternal(e, t);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(e, t) {
    let r, i, s, a2, o, l, u, c, d, h, f, m, g, A, y;
    const E2 = e, R = E2.length;
    let I = 0, F = 0;
    const re = this.hasCustom ? 0 : Math.floor(e.length / 10), Le = new Array(re), ye = [];
    let Fe2 = this.trackStartLines ? 1 : void 0, Ie = this.trackStartLines ? 1 : void 0;
    const k = Jf(this.emptyGroups), T = this.trackStartLines, $ = this.config.lineTerminatorsPattern;
    let S = 0, b = [], _ = [];
    const L = [], Te = [];
    Object.freeze(Te);
    let q;
    function K() {
      return b;
    }
    function dt(ie) {
      const Ce = tt(ie), xt = _[Ce];
      return xt === void 0 ? Te : xt;
    }
    const kc = (ie) => {
      if (L.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      ie.tokenType.PUSH_MODE === void 0) {
        const Ce = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(ie);
        ye.push({
          offset: ie.startOffset,
          line: ie.startLine,
          column: ie.startColumn,
          length: ie.image.length,
          message: Ce
        });
      } else {
        L.pop();
        const Ce = gn$1(L);
        b = this.patternIdxToConfig[Ce], _ = this.charCodeToPatternIdxToConfig[Ce], S = b.length;
        const xt = this.canModeBeOptimized[Ce] && this.config.safeMode === false;
        _ && xt ? q = dt : q = K;
      }
    };
    function va(ie) {
      L.push(ie), _ = this.charCodeToPatternIdxToConfig[ie], b = this.patternIdxToConfig[ie], S = b.length, S = b.length;
      const Ce = this.canModeBeOptimized[ie] && this.config.safeMode === false;
      _ && Ce ? q = dt : q = K;
    }
    va.call(this, t);
    let _e;
    const Aa = this.config.recoveryEnabled;
    for (; I < R; ) {
      l = null;
      const ie = E2.charCodeAt(I), Ce = q(ie), xt = Ce.length;
      for (r = 0; r < xt; r++) {
        _e = Ce[r];
        const Re = _e.pattern;
        u = null;
        const Ve = _e.short;
        if (Ve !== false ? ie === Ve && (l = Re) : _e.isCustom === true ? (y = Re.exec(E2, I, Le, k), y !== null ? (l = y[0], y.payload !== void 0 && (u = y.payload)) : l = null) : (this.updateLastIndex(Re, I), l = this.match(Re, e, I)), l !== null) {
          if (o = _e.longerAlt, o !== void 0) {
            const Qe = o.length;
            for (s = 0; s < Qe; s++) {
              const Ke = b[o[s]], ft = Ke.pattern;
              if (c = null, Ke.isCustom === true ? (y = ft.exec(E2, I, Le, k), y !== null ? (a2 = y[0], y.payload !== void 0 && (c = y.payload)) : a2 = null) : (this.updateLastIndex(ft, I), a2 = this.match(ft, e, I)), a2 && a2.length > l.length) {
                l = a2, u = c, _e = Ke;
                break;
              }
            }
          }
          break;
        }
      }
      if (l !== null) {
        if (d = l.length, h = _e.group, h !== void 0 && (f = _e.tokenTypeIdx, m = this.createTokenInstance(l, I, f, _e.tokenType, Fe2, Ie, d), this.handlePayload(m, u), h === false ? F = this.addToken(Le, F, m) : k[h].push(m)), e = this.chopInput(e, d), I = I + d, Ie = this.computeNewColumn(Ie, d), T === true && _e.canLineTerminator === true) {
          let Re = 0, Ve, Qe;
          $.lastIndex = 0;
          do
            Ve = $.test(l), Ve === true && (Qe = $.lastIndex - 1, Re++);
          while (Ve === true);
          Re !== 0 && (Fe2 = Fe2 + Re, Ie = d - Qe, this.updateTokenEndLineColumnLocation(m, h, Qe, Re, Fe2, Ie, d));
        }
        this.handleModes(_e, kc, va, m);
      } else {
        const Re = I, Ve = Fe2, Qe = Ie;
        let Ke = Aa === false;
        for (; Ke === false && I < R; )
          for (e = this.chopInput(e, 1), I++, i = 0; i < S; i++) {
            const ft = b[i], bi = ft.pattern, Ea = ft.short;
            if (Ea !== false ? E2.charCodeAt(I) === Ea && (Ke = true) : ft.isCustom === true ? Ke = bi.exec(E2, I, Le, k) !== null : (this.updateLastIndex(bi, I), Ke = bi.exec(e) !== null), Ke === true)
              break;
          }
        if (g = I - Re, Ie = this.computeNewColumn(Ie, g), A = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(E2, Re, g, Ve, Qe), ye.push({
          offset: Re,
          line: Ve,
          column: Qe,
          length: g,
          message: A
        }), Aa === false)
          break;
      }
    }
    return this.hasCustom || (Le.length = F), {
      tokens: Le,
      groups: k,
      errors: ye
    };
  }
  handleModes(e, t, r, i) {
    if (e.pop === true) {
      const s = e.push;
      t(i), s !== void 0 && r.call(this, s);
    } else
      e.push !== void 0 && r.call(this, e.push);
  }
  chopInput(e, t) {
    return e.substring(t);
  }
  updateLastIndex(e, t) {
    e.lastIndex = t;
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(e, t, r, i, s, a2, o) {
    let l, u;
    t !== void 0 && (l = r === o - 1, u = l ? -1 : 0, i === 1 && l === true || (e.endLine = s + u, e.endColumn = a2 - 1 + -u));
  }
  computeNewColumn(e, t) {
    return e + t;
  }
  createOffsetOnlyToken(e, t, r, i) {
    return {
      image: e,
      startOffset: t,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createStartOnlyToken(e, t, r, i, s, a2) {
    return {
      image: e,
      startOffset: t,
      startLine: s,
      startColumn: a2,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createFullToken(e, t, r, i, s, a2, o) {
    return {
      image: e,
      startOffset: t,
      endOffset: t + o - 1,
      startLine: s,
      endLine: s,
      startColumn: a2,
      endColumn: a2 + o - 1,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  addTokenUsingPush(e, t, r) {
    return e.push(r), t;
  }
  addTokenUsingMemberAccess(e, t, r) {
    return e[t] = r, t++, t;
  }
  handlePayloadNoCustom(e, t) {
  }
  handlePayloadWithCustom(e, t) {
    t !== null && (e.payload = t);
  }
  matchWithTest(e, t, r) {
    return e.test(t) === true ? t.substring(r, e.lastIndex) : null;
  }
  matchWithExec(e, t) {
    const r = e.exec(t);
    return r !== null ? r[0] : null;
  }
}
fe.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
fe.NA = /NOT_APPLICABLE/;
function wt(n) {
  return Ru(n) ? n.LABEL : n.name;
}
function Ru(n) {
  return he(n.LABEL) && n.LABEL !== "";
}
const uh = "parent", Fa = "categories", Ga = "label", Ua = "group", Ba = "push_mode", Va = "pop_mode", Ka = "longer_alt", Wa = "line_breaks", Ha = "start_chars_hint";
function vu(n) {
  return ch(n);
}
function ch(n) {
  const e = n.pattern, t = {};
  if (t.name = n.name, Dt$1(e) || (t.PATTERN = e), xn$1(n, uh))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return xn$1(n, Fa) && (t.CATEGORIES = n[Fa]), ir([t]), xn$1(n, Ga) && (t.LABEL = n[Ga]), xn$1(n, Ua) && (t.GROUP = n[Ua]), xn$1(n, Va) && (t.POP_MODE = n[Va]), xn$1(n, Ba) && (t.PUSH_MODE = n[Ba]), xn$1(n, Ka) && (t.LONGER_ALT = n[Ka]), xn$1(n, Wa) && (t.LINE_BREAKS = n[Wa]), xn$1(n, Ha) && (t.START_CHARS_HINT = n[Ha]), t;
}
const nt = vu({ name: "EOF", pattern: fe.NA });
ir([nt]);
function aa(n, e, t, r, i, s, a2, o) {
  return {
    image: e,
    startOffset: t,
    endOffset: r,
    startLine: i,
    endLine: s,
    startColumn: a2,
    endColumn: o,
    tokenTypeIdx: n.tokenTypeIdx,
    tokenType: n
  };
}
function Au(n, e) {
  return rr(n, e);
}
const Ct = {
  buildMismatchTokenMessage({ expected: n, actual: e, previous: t, ruleName: r }) {
    return `Expecting ${Ru(n) ? `--> ${wt(n)} <--` : `token of type --> ${n.name} <--`} but found --> '${e.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: n, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + n.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: n, actual: e, previous: t, customUserDescription: r, ruleName: i }) {
    const s = "Expecting: ", o = `
but found: '` + Pe(e).image + "'";
    if (r)
      return s + r + o;
    {
      const l = mt$1(n, (h, f) => h.concat(f), []), u = on$1(l, (h) => `[${on$1(h, (f) => wt(f)).join(", ")}]`), d = `one of these possible Token sequences:
${on$1(u, (h, f) => `  ${f + 1}. ${h}`).join(`
`)}`;
      return s + d + o;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: n, actual: e, customUserDescription: t, ruleName: r }) {
    const i = "Expecting: ", a2 = `
but found: '` + Pe(e).image + "'";
    if (t)
      return i + t + a2;
    {
      const l = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${on$1(n, (u) => `[${on$1(u, (c) => wt(c)).join(",")}]`).join(" ,")}>`;
      return i + l + a2;
    }
  }
};
Object.freeze(Ct);
const dh = {
  buildRuleNotFoundError(n, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + n.name + "<-";
  }
}, ht = {
  buildDuplicateFoundError(n, e) {
    function t(c) {
      return c instanceof G ? c.terminalType.name : c instanceof ue ? c.nonTerminalName : "";
    }
    const r = n.name, i = Pe(e), s = i.idx, a2 = Ge(i), o = t(i), l = s > 0;
    let u = `->${a2}${l ? s : ""}<- ${o ? `with argument: ->${o}<-` : ""}
                  appears more than once (${e.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return u = u.replace(/[ \t]+/g, " "), u = u.replace(/\s\s+/g, `
`), u;
  },
  buildNamespaceConflictError(n) {
    return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${n.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  },
  buildAlternationPrefixAmbiguityError(n) {
    const e = on$1(n.prefixPath, (i) => wt(i)).join(", "), t = n.alternation.idx === 0 ? "" : n.alternation.idx;
    return `Ambiguous alternatives: <${n.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${t}> inside <${n.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  },
  buildAlternationAmbiguityError(n) {
    const e = on$1(n.prefixPath, (i) => wt(i)).join(", "), t = n.alternation.idx === 0 ? "" : n.alternation.idx;
    let r = `Ambiguous Alternatives Detected: <${n.ambiguityIndices.join(" ,")}> in <OR${t}> inside <${n.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
    return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  },
  buildEmptyRepetitionError(n) {
    let e = Ge(n.repetition);
    return n.repetition.idx !== 0 && (e += n.repetition.idx), `The repetition <${e}> within Rule <${n.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(n) {
    return "deprecated";
  },
  buildEmptyAlternationError(n) {
    return `Ambiguous empty alternative: <${n.emptyChoiceIdx + 1}> in <OR${n.alternation.idx}> inside <${n.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
  },
  buildTooManyAlternativesError(n) {
    return `An Alternation cannot have more than 256 alternatives:
<OR${n.alternation.idx}> inside <${n.topLevelRule.name}> Rule.
 has ${n.alternation.definition.length + 1} alternatives.`;
  },
  buildLeftRecursionError(n) {
    const e = n.topLevelRule.name, t = on$1(n.leftRecursionPath, (s) => s.name), r = `${e} --> ${t.concat([e]).join(" --> ")}`;
    return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${r}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildInvalidRuleNameError(n) {
    return "deprecated";
  },
  buildDuplicateRuleNameError(n) {
    let e;
    return n.topLevelRule instanceof Bt ? e = n.topLevelRule.name : e = n.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${n.grammarName}<-`;
  }
};
function fh(n, e) {
  const t = new hh(n, e);
  return t.resolveRefs(), t.errors;
}
class hh extends Vt {
  constructor(e, t) {
    super(), this.nameToTopRule = e, this.errMsgProvider = t, this.errors = [];
  }
  resolveRefs() {
    Mt$1(Ft$1(this.nameToTopRule), (e) => {
      this.currTopLevel = e, e.accept(this);
    });
  }
  visitNonTerminal(e) {
    const t = this.nameToTopRule[e.nonTerminalName];
    if (t)
      e.referencedRule = t;
    else {
      const r = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
      this.errors.push({
        message: r,
        type: ce.UNRESOLVED_SUBRULE_REF,
        ruleName: this.currTopLevel.name,
        unresolvedRefName: e.nonTerminalName
      });
    }
  }
}
class ph extends Ai {
  constructor(e, t) {
    super(), this.topProd = e, this.path = t, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = false, this.isAtEndOfPath = false;
  }
  startWalking() {
    if (this.found = false, this.path.ruleStack[0] !== this.topProd.name)
      throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = a(this.path.ruleStack).reverse(), this.occurrenceStack = a(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }
  walk(e, t = []) {
    this.found || super.walk(e, t);
  }
  walkProdRef(e, t, r) {
    if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
      const i = t.concat(r);
      this.updateExpectedNext(), this.walk(e.referencedRule, i);
    }
  }
  updateExpectedNext() {
    Zd$1(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = true) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }
}
class mh extends ph {
  constructor(e, t) {
    super(e, t), this.path = t, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, t, r) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      const i = t.concat(r), s = new pe({ definition: i });
      this.possibleTokTypes = nr(s), this.found = true;
    }
  }
}
class $i extends Ai {
  constructor(e, t) {
    super(), this.topRule = e, this.occurrence = t, this.result = {
      token: void 0,
      occurrence: void 0,
      isEndOfRule: void 0
    };
  }
  startWalking() {
    return this.walk(this.topRule), this.result;
  }
}
class gh extends $i {
  walkMany(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, t, r);
  }
}
class ja extends $i {
  walkManySep(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, t, r);
  }
}
class yh extends $i {
  walkAtLeastOne(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, t, r);
  }
}
class za extends $i {
  walkAtLeastOneSep(e, t, r) {
    if (e.idx === this.occurrence) {
      const i = Pe(t.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof G && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, t, r);
  }
}
function Ts(n, e, t = []) {
  t = a(t);
  let r = [], i = 0;
  function s(o) {
    return o.concat(J(n, i + 1));
  }
  function a$1(o) {
    const l = Ts(s(o), e, t);
    return r.concat(l);
  }
  for (; t.length < e && i < n.length; ) {
    const o = n[i];
    if (o instanceof pe)
      return a$1(o.definition);
    if (o instanceof ue)
      return a$1(o.definition);
    if (o instanceof te)
      r = a$1(o.definition);
    else if (o instanceof xe) {
      const l = o.definition.concat([
        new W({
          definition: o.definition
        })
      ]);
      return a$1(l);
    } else if (o instanceof Se) {
      const l = [
        new pe({ definition: o.definition }),
        new W({
          definition: [new G({ terminalType: o.separator })].concat(o.definition)
        })
      ];
      return a$1(l);
    } else if (o instanceof me) {
      const l = o.definition.concat([
        new W({
          definition: [new G({ terminalType: o.separator })].concat(o.definition)
        })
      ]);
      r = a$1(l);
    } else if (o instanceof W) {
      const l = o.definition.concat([
        new W({
          definition: o.definition
        })
      ]);
      r = a$1(l);
    } else {
      if (o instanceof ge)
        return Mt$1(o.definition, (l) => {
          Zd$1(l.definition) === false && (r = a$1(l.definition));
        }), r;
      if (o instanceof G)
        t.push(o.terminalType);
      else
        throw Error("non exhaustive match");
    }
    i++;
  }
  return r.push({
    partialPath: t,
    suffixDef: J(n, i)
  }), r;
}
function Eu(n, e, t, r) {
  const i = "EXIT_NONE_TERMINAL", s = [i], a$1 = "EXIT_ALTERNATIVE";
  let o = false;
  const l = e.length, u = l - r - 1, c = [], d = [];
  for (d.push({
    idx: -1,
    def: n,
    ruleStack: [],
    occurrenceStack: []
  }); !Zd$1(d); ) {
    const h = d.pop();
    if (h === a$1) {
      o && gn$1(d).idx <= u && d.pop();
      continue;
    }
    const f = h.def, m = h.idx, g = h.ruleStack, A = h.occurrenceStack;
    if (Zd$1(f))
      continue;
    const y = f[0];
    if (y === i) {
      const E2 = {
        idx: m,
        def: J(f),
        ruleStack: Ln(g),
        occurrenceStack: Ln(A)
      };
      d.push(E2);
    } else if (y instanceof G)
      if (m < l - 1) {
        const E2 = m + 1, R = e[E2];
        if (t(R, y.terminalType)) {
          const I = {
            idx: E2,
            def: J(f),
            ruleStack: g,
            occurrenceStack: A
          };
          d.push(I);
        }
      } else if (m === l - 1)
        c.push({
          nextTokenType: y.terminalType,
          nextTokenOccurrence: y.idx,
          ruleStack: g,
          occurrenceStack: A
        }), o = true;
      else
        throw Error("non exhaustive match");
    else if (y instanceof ue) {
      const E2 = a(g);
      E2.push(y.nonTerminalName);
      const R = a(A);
      R.push(y.idx);
      const I = {
        idx: m,
        def: y.definition.concat(s, J(f)),
        ruleStack: E2,
        occurrenceStack: R
      };
      d.push(I);
    } else if (y instanceof te) {
      const E2 = {
        idx: m,
        def: J(f),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(E2), d.push(a$1);
      const R = {
        idx: m,
        def: y.definition.concat(J(f)),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(R);
    } else if (y instanceof xe) {
      const E2 = new W({
        definition: y.definition,
        idx: y.idx
      }), R = y.definition.concat([E2], J(f)), I = {
        idx: m,
        def: R,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(I);
    } else if (y instanceof Se) {
      const E2 = new G({
        terminalType: y.separator
      }), R = new W({
        definition: [E2].concat(y.definition),
        idx: y.idx
      }), I = y.definition.concat([R], J(f)), F = {
        idx: m,
        def: I,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(F);
    } else if (y instanceof me) {
      const E2 = {
        idx: m,
        def: J(f),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(E2), d.push(a$1);
      const R = new G({
        terminalType: y.separator
      }), I = new W({
        definition: [R].concat(y.definition),
        idx: y.idx
      }), F = y.definition.concat([I], J(f)), re = {
        idx: m,
        def: F,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(re);
    } else if (y instanceof W) {
      const E2 = {
        idx: m,
        def: J(f),
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(E2), d.push(a$1);
      const R = new W({
        definition: y.definition,
        idx: y.idx
      }), I = y.definition.concat([R], J(f)), F = {
        idx: m,
        def: I,
        ruleStack: g,
        occurrenceStack: A
      };
      d.push(F);
    } else if (y instanceof ge)
      for (let E2 = y.definition.length - 1; E2 >= 0; E2--) {
        const R = y.definition[E2], I = {
          idx: m,
          def: R.definition.concat(J(f)),
          ruleStack: g,
          occurrenceStack: A
        };
        d.push(I), d.push(a$1);
      }
    else if (y instanceof pe)
      d.push({
        idx: m,
        def: y.definition.concat(J(f)),
        ruleStack: g,
        occurrenceStack: A
      });
    else if (y instanceof Bt)
      d.push(Th(y, m, g, A));
    else
      throw Error("non exhaustive match");
  }
  return c;
}
function Th(n, e, t, r) {
  const i = a(t);
  i.push(n.name);
  const s = a(r);
  return s.push(1), {
    idx: e,
    def: n.definition,
    ruleStack: i,
    occurrenceStack: s
  };
}
var B;
(function(n) {
  n[n.OPTION = 0] = "OPTION", n[n.REPETITION = 1] = "REPETITION", n[n.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", n[n.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", n[n.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", n[n.ALTERNATION = 5] = "ALTERNATION";
})(B || (B = {}));
function oa(n) {
  if (n instanceof te || n === "Option")
    return B.OPTION;
  if (n instanceof W || n === "Repetition")
    return B.REPETITION;
  if (n instanceof xe || n === "RepetitionMandatory")
    return B.REPETITION_MANDATORY;
  if (n instanceof Se || n === "RepetitionMandatoryWithSeparator")
    return B.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (n instanceof me || n === "RepetitionWithSeparator")
    return B.REPETITION_WITH_SEPARATOR;
  if (n instanceof ge || n === "Alternation")
    return B.ALTERNATION;
  throw Error("non exhaustive match");
}
function qa(n) {
  const { occurrence: e, rule: t, prodType: r, maxLookahead: i } = n, s = oa(r);
  return s === B.ALTERNATION ? ki(e, t, i) : xi(e, t, s, i);
}
function Rh(n, e, t, r, i, s) {
  const a2 = ki(n, e, t), o = xu(a2) ? Xr : rr;
  return s(a2, r, o, i);
}
function vh(n, e, t, r, i, s) {
  const a2 = xi(n, e, i, t), o = xu(a2) ? Xr : rr;
  return s(a2[0], o, r);
}
function Ah(n, e, t, r) {
  const i = n.length, s = Oe(n, (a2) => Oe(a2, (o) => o.length === 1));
  if (e)
    return function(a2) {
      const o = on$1(a2, (l) => l.GATE);
      for (let l = 0; l < i; l++) {
        const u = n[l], c = u.length, d = o[l];
        if (!(d !== void 0 && d.call(this) === false))
          e:
            for (let h = 0; h < c; h++) {
              const f = u[h], m = f.length;
              for (let g = 0; g < m; g++) {
                const A = this.LA(g + 1);
                if (t(A, f[g]) === false)
                  continue e;
              }
              return l;
            }
      }
    };
  if (s && !r) {
    const a2 = on$1(n, (l) => un$1(l)), o = mt$1(a2, (l, u, c) => (Mt$1(u, (d) => {
      xn$1(l, d.tokenTypeIdx) || (l[d.tokenTypeIdx] = c), Mt$1(d.categoryMatches, (h) => {
        xn$1(l, h) || (l[h] = c);
      });
    }), l), {});
    return function() {
      const l = this.LA(1);
      return o[l.tokenTypeIdx];
    };
  } else
    return function() {
      for (let a2 = 0; a2 < i; a2++) {
        const o = n[a2], l = o.length;
        e:
          for (let u = 0; u < l; u++) {
            const c = o[u], d = c.length;
            for (let h = 0; h < d; h++) {
              const f = this.LA(h + 1);
              if (t(f, c[h]) === false)
                continue e;
            }
            return a2;
          }
      }
    };
}
function Eh(n, e, t) {
  const r = Oe(n, (s) => s.length === 1), i = n.length;
  if (r && !t) {
    const s = un$1(n);
    if (s.length === 1 && Zd$1(s[0].categoryMatches)) {
      const o = s[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === o;
      };
    } else {
      const a2 = mt$1(s, (o, l, u) => (o[l.tokenTypeIdx] = true, Mt$1(l.categoryMatches, (c) => {
        o[c] = true;
      }), o), []);
      return function() {
        const o = this.LA(1);
        return a2[o.tokenTypeIdx] === true;
      };
    }
  } else
    return function() {
      e:
        for (let s = 0; s < i; s++) {
          const a2 = n[s], o = a2.length;
          for (let l = 0; l < o; l++) {
            const u = this.LA(l + 1);
            if (e(u, a2[l]) === false)
              continue e;
          }
          return true;
        }
      return false;
    };
}
class $h extends Ai {
  constructor(e, t, r) {
    super(), this.topProd = e, this.targetOccurrence = t, this.targetProdType = r;
  }
  startWalking() {
    return this.walk(this.topProd), this.restDef;
  }
  checkIsTarget(e, t, r, i) {
    return e.idx === this.targetOccurrence && this.targetProdType === t ? (this.restDef = r.concat(i), true) : false;
  }
  walkOption(e, t, r) {
    this.checkIsTarget(e, B.OPTION, t, r) || super.walkOption(e, t, r);
  }
  walkAtLeastOne(e, t, r) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY, t, r) || super.walkOption(e, t, r);
  }
  walkAtLeastOneSep(e, t, r) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY_WITH_SEPARATOR, t, r) || super.walkOption(e, t, r);
  }
  walkMany(e, t, r) {
    this.checkIsTarget(e, B.REPETITION, t, r) || super.walkOption(e, t, r);
  }
  walkManySep(e, t, r) {
    this.checkIsTarget(e, B.REPETITION_WITH_SEPARATOR, t, r) || super.walkOption(e, t, r);
  }
}
class $u extends Vt {
  constructor(e, t, r) {
    super(), this.targetOccurrence = e, this.targetProdType = t, this.targetRef = r, this.result = [];
  }
  checkIsTarget(e, t) {
    e.idx === this.targetOccurrence && this.targetProdType === t && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, B.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, B.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, B.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, B.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, B.ALTERNATION);
  }
}
function Ya(n) {
  const e = new Array(n);
  for (let t = 0; t < n; t++)
    e[t] = [];
  return e;
}
function Ki(n) {
  let e = [""];
  for (let t = 0; t < n.length; t++) {
    const r = n[t], i = [];
    for (let s = 0; s < e.length; s++) {
      const a2 = e[s];
      i.push(a2 + "_" + r.tokenTypeIdx);
      for (let o = 0; o < r.categoryMatches.length; o++) {
        const l = "_" + r.categoryMatches[o];
        i.push(a2 + l);
      }
    }
    e = i;
  }
  return e;
}
function kh(n, e, t) {
  for (let r = 0; r < n.length; r++) {
    if (r === t)
      continue;
    const i = n[r];
    for (let s = 0; s < e.length; s++) {
      const a2 = e[s];
      if (i[a2] === true)
        return false;
    }
  }
  return true;
}
function ku(n, e) {
  const t = on$1(n, (a2) => Ts([a2], 1)), r = Ya(t.length), i = on$1(t, (a2) => {
    const o = {};
    return Mt$1(a2, (l) => {
      const u = Ki(l.partialPath);
      Mt$1(u, (c) => {
        o[c] = true;
      });
    }), o;
  });
  let s = t;
  for (let a2 = 1; a2 <= e; a2++) {
    const o = s;
    s = Ya(o.length);
    for (let l = 0; l < o.length; l++) {
      const u = o[l];
      for (let c = 0; c < u.length; c++) {
        const d = u[c].partialPath, h = u[c].suffixDef, f = Ki(d);
        if (kh(i, f, l) || Zd$1(h) || d.length === e) {
          const g = r[l];
          if (Rs(g, d) === false) {
            g.push(d);
            for (let A = 0; A < f.length; A++) {
              const y = f[A];
              i[l][y] = true;
            }
          }
        } else {
          const g = Ts(h, a2 + 1, d);
          s[l] = s[l].concat(g), Mt$1(g, (A) => {
            const y = Ki(A.partialPath);
            Mt$1(y, (E2) => {
              i[l][E2] = true;
            });
          });
        }
      }
    }
  }
  return r;
}
function ki(n, e, t, r) {
  const i = new $u(n, B.ALTERNATION, r);
  return e.accept(i), ku(i.result, t);
}
function xi(n, e, t, r) {
  const i = new $u(n, t);
  e.accept(i);
  const s = i.result, o = new $h(e, n, t).startWalking(), l = new pe({ definition: s }), u = new pe({ definition: o });
  return ku([l, u], r);
}
function Rs(n, e) {
  e:
    for (let t = 0; t < n.length; t++) {
      const r = n[t];
      if (r.length === e.length) {
        for (let i = 0; i < r.length; i++) {
          const s = e[i], a2 = r[i];
          if ((s === a2 || a2.categoryMatchesMap[s.tokenTypeIdx] !== void 0) === false)
            continue e;
        }
        return true;
      }
    }
  return false;
}
function xh(n, e) {
  return n.length < e.length && Oe(n, (t, r) => {
    const i = e[r];
    return t === i || i.categoryMatchesMap[t.tokenTypeIdx];
  });
}
function xu(n) {
  return Oe(n, (e) => Oe(e, (t) => Oe(t, (r) => Zd$1(r.categoryMatches))));
}
function Sh(n) {
  const e = n.lookaheadStrategy.validate({
    rules: n.rules,
    tokenTypes: n.tokenTypes,
    grammarName: n.grammarName
  });
  return on$1(e, (t) => Object.assign({ type: ce.CUSTOM_LOOKAHEAD_VALIDATION }, t));
}
function Ih(n, e, t, r) {
  const i = Ee(n, (l) => Ch(l, t)), s = Uh(n, e, t), a2 = Ee(n, (l) => Mh(l, t)), o = Ee(n, (l) => Lh(l, n, r, t));
  return i.concat(s, a2, o);
}
function Ch(n, e) {
  const t = new wh();
  n.accept(t);
  const r = t.allProductions, i = id(r, Nh), s = Me(i, (o) => o.length > 1);
  return on$1(Ft$1(s), (o) => {
    const l = Pe(o), u = e.buildDuplicateFoundError(n, o), c = Ge(l), d = {
      message: u,
      type: ce.DUPLICATE_PRODUCTIONS,
      ruleName: n.name,
      dslName: c,
      occurrence: l.idx
    }, h = Su(l);
    return h && (d.parameter = h), d;
  });
}
function Nh(n) {
  return `${Ge(n)}_#_${n.idx}_#_${Su(n)}`;
}
function Su(n) {
  return n instanceof G ? n.terminalType.name : n instanceof ue ? n.nonTerminalName : "";
}
class wh extends Vt {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitNonTerminal(e) {
    this.allProductions.push(e);
  }
  visitOption(e) {
    this.allProductions.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
  visitAlternation(e) {
    this.allProductions.push(e);
  }
  visitTerminal(e) {
    this.allProductions.push(e);
  }
}
function Lh(n, e, t, r) {
  const i = [];
  if (mt$1(e, (a2, o) => o.name === n.name ? a2 + 1 : a2, 0) > 1) {
    const a2 = r.buildDuplicateRuleNameError({
      topLevelRule: n,
      grammarName: t
    });
    i.push({
      message: a2,
      type: ce.DUPLICATE_RULE_NAME,
      ruleName: n.name
    });
  }
  return i;
}
function _h(n, e, t) {
  const r = [];
  let i;
  return de(e, n) || (i = `Invalid rule override, rule: ->${n}<- cannot be overridden in the grammar: ->${t}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: ce.INVALID_RULE_OVERRIDE,
    ruleName: n
  })), r;
}
function Iu(n, e, t, r = []) {
  const i = [], s = br(e.definition);
  if (Zd$1(s))
    return [];
  {
    const a$1 = n.name;
    de(s, n) && i.push({
      message: t.buildLeftRecursionError({
        topLevelRule: n,
        leftRecursionPath: r
      }),
      type: ce.LEFT_RECURSION,
      ruleName: a$1
    });
    const l = mi(s, r.concat([n])), u = Ee(l, (c) => {
      const d = a(r);
      return d.push(c), Iu(n, c, t, d);
    });
    return i.concat(u);
  }
}
function br(n) {
  let e = [];
  if (Zd$1(n))
    return e;
  const t = Pe(n);
  if (t instanceof ue)
    e.push(t.referencedRule);
  else if (t instanceof pe || t instanceof te || t instanceof xe || t instanceof Se || t instanceof me || t instanceof W)
    e = e.concat(br(t.definition));
  else if (t instanceof ge)
    e = un$1(on$1(t.definition, (s) => br(s.definition)));
  else if (!(t instanceof G))
    throw Error("non exhaustive match");
  const r = qr(t), i = n.length > 1;
  if (r && i) {
    const s = J(n);
    return e.concat(br(s));
  } else
    return e;
}
class la extends Vt {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}
function bh(n, e) {
  const t = new la();
  n.accept(t);
  const r = t.alternations;
  return Ee(r, (s) => {
    const a2 = Ln(s.definition);
    return Ee(a2, (o, l) => {
      const u = Eu([o], [], rr, 1);
      return Zd$1(u) ? [
        {
          message: e.buildEmptyAlternationError({
            topLevelRule: n,
            alternation: s,
            emptyChoiceIdx: l
          }),
          type: ce.NONE_LAST_EMPTY_ALT,
          ruleName: n.name,
          occurrence: s.idx,
          alternative: l + 1
        }
      ] : [];
    });
  });
}
function Oh(n, e, t) {
  const r = new la();
  n.accept(r);
  let i = r.alternations;
  return i = gi(i, (a2) => a2.ignoreAmbiguities === true), Ee(i, (a2) => {
    const o = a2.idx, l = a2.maxLookahead || e, u = ki(o, n, l, a2), c = Fh(u, a2, n, t), d = Gh(u, a2, n, t);
    return c.concat(d);
  });
}
class Ph extends Vt {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
}
function Mh(n, e) {
  const t = new la();
  n.accept(t);
  const r = t.alternations;
  return Ee(r, (s) => s.definition.length > 255 ? [
    {
      message: e.buildTooManyAlternativesError({
        topLevelRule: n,
        alternation: s
      }),
      type: ce.TOO_MANY_ALTS,
      ruleName: n.name,
      occurrence: s.idx
    }
  ] : []);
}
function Dh(n, e, t) {
  const r = [];
  return Mt$1(n, (i) => {
    const s = new Ph();
    i.accept(s);
    const a2 = s.allProductions;
    Mt$1(a2, (o) => {
      const l = oa(o), u = o.maxLookahead || e, c = o.idx, h = xi(c, i, l, u)[0];
      if (Zd$1(un$1(h))) {
        const f = t.buildEmptyRepetitionError({
          topLevelRule: i,
          repetition: o
        });
        r.push({
          message: f,
          type: ce.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: i.name
        });
      }
    });
  }), r;
}
function Fh(n, e, t, r) {
  const i = [], s = mt$1(n, (o, l, u) => (e.definition[u].ignoreAmbiguities === true || Mt$1(l, (c) => {
    const d = [u];
    Mt$1(n, (h, f) => {
      u !== f && Rs(h, c) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[f].ignoreAmbiguities !== true && d.push(f);
    }), d.length > 1 && !Rs(i, c) && (i.push(c), o.push({
      alts: d,
      path: c
    }));
  }), o), []);
  return on$1(s, (o) => {
    const l = on$1(o.alts, (c) => c + 1);
    return {
      message: r.buildAlternationAmbiguityError({
        topLevelRule: t,
        alternation: e,
        ambiguityIndices: l,
        prefixPath: o.path
      }),
      type: ce.AMBIGUOUS_ALTS,
      ruleName: t.name,
      occurrence: e.idx,
      alternatives: o.alts
    };
  });
}
function Gh(n, e, t, r) {
  const i = mt$1(n, (a2, o, l) => {
    const u = on$1(o, (c) => ({ idx: l, path: c }));
    return a2.concat(u);
  }, []);
  return Zn(Ee(i, (a2) => {
    if (e.definition[a2.idx].ignoreAmbiguities === true)
      return [];
    const l = a2.idx, u = a2.path, c = Rt$1(i, (h) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[h.idx].ignoreAmbiguities !== true && h.idx < l && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      xh(h.path, u)
    ));
    return on$1(c, (h) => {
      const f = [h.idx + 1, l + 1], m = e.idx === 0 ? "" : e.idx;
      return {
        message: r.buildAlternationPrefixAmbiguityError({
          topLevelRule: t,
          alternation: e,
          ambiguityIndices: f,
          prefixPath: h.path
        }),
        type: ce.AMBIGUOUS_PREFIX_ALTS,
        ruleName: t.name,
        occurrence: m,
        alternatives: f
      };
    });
  }));
}
function Uh(n, e, t) {
  const r = [], i = on$1(e, (s) => s.name);
  return Mt$1(n, (s) => {
    const a2 = s.name;
    if (de(i, a2)) {
      const o = t.buildNamespaceConflictError(s);
      r.push({
        message: o,
        type: ce.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: a2
      });
    }
  }), r;
}
function Bh(n) {
  const e = hn$1(n, {
    errMsgProvider: dh
  }), t = {};
  return Mt$1(n.rules, (r) => {
    t[r.name] = r;
  }), fh(t, e.errMsgProvider);
}
function Vh(n) {
  return n = hn$1(n, {
    errMsgProvider: ht
  }), Ih(n.rules, n.tokenTypes, n.errMsgProvider, n.grammarName);
}
const Cu = "MismatchedTokenException", Nu = "NoViableAltException", wu = "EarlyExitException", Lu = "NotAllInputParsedException", _u = [
  Cu,
  Nu,
  wu,
  Lu
];
Object.freeze(_u);
function Jr(n) {
  return de(_u, n.name);
}
class Si extends Error {
  constructor(e, t) {
    super(e), this.token = t, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class bu extends Si {
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = Cu;
  }
}
class Kh extends Si {
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = Nu;
  }
}
class Wh extends Si {
  constructor(e, t) {
    super(e, t), this.name = Lu;
  }
}
class Hh extends Si {
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = wu;
  }
}
const Wi = {}, Ou = "InRuleRecoveryException";
class jh extends Error {
  constructor(e) {
    super(e), this.name = Ou;
  }
}
class zh {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = xn$1(e, "recoveryEnabled") ? e.recoveryEnabled : Je.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = qh);
  }
  getTokenToInsert(e) {
    const t = aa(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
    return t.isInsertedInRecovery = true, t;
  }
  canTokenTypeBeInsertedInRecovery(e) {
    return true;
  }
  canTokenTypeBeDeletedInRecovery(e) {
    return true;
  }
  tryInRepetitionRecovery(e, t, r, i) {
    const s = this.findReSyncTokenType(), a2 = this.exportLexerState(), o = [];
    let l = false;
    const u = this.LA(1);
    let c = this.LA(1);
    const d = () => {
      const h = this.LA(0), f = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: i,
        actual: u,
        previous: h,
        ruleName: this.getCurrRuleFullName()
      }), m = new bu(f, u, this.LA(0));
      m.resyncedTokens = Ln(o), this.SAVE_ERROR(m);
    };
    for (; !l; )
      if (this.tokenMatcher(c, i)) {
        d();
        return;
      } else if (r.call(this)) {
        d(), e.apply(this, t);
        return;
      } else
        this.tokenMatcher(c, s) ? l = true : (c = this.SKIP_TOKEN(), this.addToResyncTokens(c, o));
    this.importLexerState(a2);
  }
  shouldInRepetitionRecoveryBeTried(e, t, r) {
    return !(r === false || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, t)));
  }
  // Error Recovery functionality
  getFollowsForInRuleRecovery(e, t) {
    const r = this.getCurrentGrammarPath(e, t);
    return this.getNextPossibleTokenTypes(r);
  }
  tryInRuleRecovery(e, t) {
    if (this.canRecoverWithSingleTokenInsertion(e, t))
      return this.getTokenToInsert(e);
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      const r = this.SKIP_TOKEN();
      return this.consumeToken(), r;
    }
    throw new jh("sad sad panda");
  }
  canPerformInRuleRecovery(e, t) {
    return this.canRecoverWithSingleTokenInsertion(e, t) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, t) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || Zd$1(t))
      return false;
    const r = this.LA(1);
    return vn$1(t, (s) => this.tokenMatcher(r, s)) !== void 0;
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : false;
  }
  isInCurrentRuleReSyncSet(e) {
    const t = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(t);
    return de(r, e);
  }
  findReSyncTokenType() {
    const e = this.flattenFollowSet();
    let t = this.LA(1), r = 2;
    for (; ; ) {
      const i = vn$1(e, (s) => Au(t, s));
      if (i !== void 0)
        return i;
      t = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1)
      return Wi;
    const e = this.getLastExplicitRuleShortName(), t = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: t,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, t = this.RULE_OCCURRENCE_STACK;
    return on$1(e, (r, i) => i === 0 ? Wi : {
      ruleName: this.shortRuleNameToFullName(r),
      idxInCallingRule: t[i],
      inRule: this.shortRuleNameToFullName(e[i - 1])
    });
  }
  flattenFollowSet() {
    const e = on$1(this.buildFullFollowKeyStack(), (t) => this.getFollowSetFromFollowKey(t));
    return un$1(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === Wi)
      return [nt];
    const t = e.ruleName + e.idxInCallingRule + cu + e.inRule;
    return this.resyncFollows[t];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(e, t) {
    return this.tokenMatcher(e, nt) || t.push(e), t;
  }
  reSyncTo(e) {
    const t = [];
    let r = this.LA(1);
    for (; this.tokenMatcher(r, e) === false; )
      r = this.SKIP_TOKEN(), this.addToResyncTokens(r, t);
    return Ln(t);
  }
  attemptInRepetitionRecovery(e, t, r, i, s, a2, o) {
  }
  getCurrentGrammarPath(e, t) {
    const r = this.getHumanReadableRuleStack(), i = a(this.RULE_OCCURRENCE_STACK);
    return {
      ruleStack: r,
      occurrenceStack: i,
      lastTok: e,
      lastTokOccurrence: t
    };
  }
  getHumanReadableRuleStack() {
    return on$1(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
  }
}
function qh(n, e, t, r, i, s, a2) {
  const o = this.getKeyForAutomaticLookahead(r, i);
  let l = this.firstAfterRepMap[o];
  if (l === void 0) {
    const h = this.getCurrRuleFullName(), f = this.getGAstProductions()[h];
    l = new s(f, i).startWalking(), this.firstAfterRepMap[o] = l;
  }
  let u = l.token, c = l.occurrence;
  const d = l.isEndOfRule;
  this.RULE_STACK.length === 1 && d && u === void 0 && (u = nt, c = 1), !(u === void 0 || c === void 0) && this.shouldInRepetitionRecoveryBeTried(u, c, a2) && this.tryInRepetitionRecovery(n, e, t, u);
}
const Yh = 4, st = 8, Pu = 1 << st, Mu = 2 << st, vs = 3 << st, As = 4 << st, Es = 5 << st, Or = 6 << st;
function Hi(n, e, t) {
  return t | e | n;
}
class ua {
  constructor(e) {
    var t;
    this.maxLookahead = (t = e == null ? void 0 : e.maxLookahead) !== null && t !== void 0 ? t : Je.maxLookahead;
  }
  validate(e) {
    const t = this.validateNoLeftRecursion(e.rules);
    if (Zd$1(t)) {
      const r = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), s = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
      return [
        ...t,
        ...r,
        ...i,
        ...s
      ];
    }
    return t;
  }
  validateNoLeftRecursion(e) {
    return Ee(e, (t) => Iu(t, t, ht));
  }
  validateEmptyOrAlternatives(e) {
    return Ee(e, (t) => bh(t, ht));
  }
  validateAmbiguousAlternationAlternatives(e, t) {
    return Ee(e, (r) => Oh(r, t, ht));
  }
  validateSomeNonEmptyLookaheadPath(e, t) {
    return Dh(e, t, ht);
  }
  buildLookaheadForAlternation(e) {
    return Rh(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Ah);
  }
  buildLookaheadForOptional(e) {
    return vh(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, oa(e.prodType), Eh);
  }
}
class Xh {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = xn$1(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Je.dynamicTokensEnabled, this.maxLookahead = xn$1(e, "maxLookahead") ? e.maxLookahead : Je.maxLookahead, this.lookaheadStrategy = xn$1(e, "lookaheadStrategy") ? e.lookaheadStrategy : new ua({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    Mt$1(e, (t) => {
      this.TRACE_INIT(`${t.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: s, repetitionMandatory: a2, repetitionMandatoryWithSeparator: o, repetitionWithSeparator: l } = Qh(t);
        Mt$1(r, (u) => {
          const c = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${Ge(u)}${c}`, () => {
            const d = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: t,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), h = Hi(this.fullRuleNameToShort[t.name], Pu, u.idx);
            this.setLaFuncCache(h, d);
          });
        }), Mt$1(i, (u) => {
          this.computeLookaheadFunc(t, u.idx, vs, "Repetition", u.maxLookahead, Ge(u));
        }), Mt$1(s, (u) => {
          this.computeLookaheadFunc(t, u.idx, Mu, "Option", u.maxLookahead, Ge(u));
        }), Mt$1(a2, (u) => {
          this.computeLookaheadFunc(t, u.idx, As, "RepetitionMandatory", u.maxLookahead, Ge(u));
        }), Mt$1(o, (u) => {
          this.computeLookaheadFunc(t, u.idx, Or, "RepetitionMandatoryWithSeparator", u.maxLookahead, Ge(u));
        }), Mt$1(l, (u) => {
          this.computeLookaheadFunc(t, u.idx, Es, "RepetitionWithSeparator", u.maxLookahead, Ge(u));
        });
      });
    });
  }
  computeLookaheadFunc(e, t, r, i, s, a2) {
    this.TRACE_INIT(`${a2}${t === 0 ? "" : t}`, () => {
      const o = this.lookaheadStrategy.buildLookaheadForOptional({
        prodOccurrence: t,
        rule: e,
        maxLookahead: s || this.maxLookahead,
        dynamicTokensEnabled: this.dynamicTokensEnabled,
        prodType: i
      }), l = Hi(this.fullRuleNameToShort[e.name], r, t);
      this.setLaFuncCache(l, o);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, t) {
    const r = this.getLastExplicitRuleShortName();
    return Hi(r, e, t);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, t) {
    this.lookAheadFuncsCache.set(e, t);
  }
}
class Jh extends Vt {
  constructor() {
    super(...arguments), this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  visitOption(e) {
    this.dslMethods.option.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.dslMethods.repetitionWithSeparator.push(e);
  }
  visitRepetitionMandatory(e) {
    this.dslMethods.repetitionMandatory.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(e);
  }
  visitRepetition(e) {
    this.dslMethods.repetition.push(e);
  }
  visitAlternation(e) {
    this.dslMethods.alternation.push(e);
  }
}
const vr = new Jh();
function Qh(n) {
  vr.reset(), n.accept(vr);
  const e = vr.dslMethods;
  return vr.reset(), e;
}
function Xa(n, e) {
  isNaN(n.startOffset) === true ? (n.startOffset = e.startOffset, n.endOffset = e.endOffset) : n.endOffset < e.endOffset && (n.endOffset = e.endOffset);
}
function Ja(n, e) {
  isNaN(n.startOffset) === true ? (n.startOffset = e.startOffset, n.startColumn = e.startColumn, n.startLine = e.startLine, n.endOffset = e.endOffset, n.endColumn = e.endColumn, n.endLine = e.endLine) : n.endOffset < e.endOffset && (n.endOffset = e.endOffset, n.endColumn = e.endColumn, n.endLine = e.endLine);
}
function Zh(n, e, t) {
  n.children[t] === void 0 ? n.children[t] = [e] : n.children[t].push(e);
}
function ep(n, e, t) {
  n.children[e] === void 0 ? n.children[e] = [t] : n.children[e].push(t);
}
const tp = "name";
function Du(n, e) {
  Object.defineProperty(n, tp, {
    enumerable: false,
    configurable: true,
    writable: false,
    value: e
  });
}
function np(n, e) {
  const t = O$1(n), r = t.length;
  for (let i = 0; i < r; i++) {
    const s = t[i], a2 = n[s], o = a2.length;
    for (let l = 0; l < o; l++) {
      const u = a2[l];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function rp(n, e) {
  const t = function() {
  };
  Du(t, n + "BaseSemantics");
  const r = {
    visit: function(i, s) {
      if (Ao$1(i) && (i = i[0]), !Dt$1(i))
        return this[i.name](i.children, s);
    },
    validateVisitor: function() {
      const i = sp(this, e);
      if (!Zd$1(i)) {
        const s = on$1(i, (a2) => a2.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${s.join(`

`).replace(/\n/g, `
	`)}`);
      }
    }
  };
  return t.prototype = r, t.prototype.constructor = t, t._RULE_NAMES = e, t;
}
function ip(n, e, t) {
  const r = function() {
  };
  Du(r, n + "BaseSemanticsWithDefaults");
  const i = Object.create(t.prototype);
  return Mt$1(e, (s) => {
    i[s] = np;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var $s;
(function(n) {
  n[n.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", n[n.MISSING_METHOD = 1] = "MISSING_METHOD";
})($s || ($s = {}));
function sp(n, e) {
  return ap(n, e);
}
function ap(n, e) {
  const t = Rt$1(e, (i) => Jc$1(n[i]) === false), r = on$1(t, (i) => ({
    msg: `Missing visitor method: <${i}> on ${n.constructor.name} CST Visitor.`,
    type: $s.MISSING_METHOD,
    methodName: i
  }));
  return Zn(r);
}
class op {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = xn$1(e, "nodeLocationTracking") ? e.nodeLocationTracking : Je.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = Wn$1, this.cstFinallyStateUpdate = Wn$1, this.cstPostTerminal = Wn$1, this.cstPostNonTerminal = Wn$1, this.cstPostRule = Wn$1;
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Ja, this.setNodeLocationFromNode = Ja, this.cstPostRule = Wn$1, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = Wn$1, this.setNodeLocationFromNode = Wn$1, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Xa, this.setNodeLocationFromNode = Xa, this.cstPostRule = Wn$1, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = Wn$1, this.setNodeLocationFromNode = Wn$1, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking))
      this.setNodeLocationFromToken = Wn$1, this.setNodeLocationFromNode = Wn$1, this.cstPostRule = Wn$1, this.setInitialNodeLocation = Wn$1;
    else
      throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
  }
  setInitialNodeLocationOnlyOffsetRecovery(e) {
    e.location = {
      startOffset: NaN,
      endOffset: NaN
    };
  }
  setInitialNodeLocationOnlyOffsetRegular(e) {
    e.location = {
      // without error recovery the starting Location of a new CstNode is guaranteed
      // To be the next Token's startOffset (for valid inputs).
      // For invalid inputs there won't be any CSTOutput so this potential
      // inaccuracy does not matter
      startOffset: this.LA(1).startOffset,
      endOffset: NaN
    };
  }
  setInitialNodeLocationFullRecovery(e) {
    e.location = {
      startOffset: NaN,
      startLine: NaN,
      startColumn: NaN,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
  setInitialNodeLocationFullRegular(e) {
    const t = this.LA(1);
    e.location = {
      startOffset: t.startOffset,
      startLine: t.startLine,
      startColumn: t.startColumn,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  cstInvocationStateUpdate(e) {
    const t = {
      name: e,
      children: /* @__PURE__ */ Object.create(null)
    };
    this.setInitialNodeLocation(t), this.CST_STACK.push(t);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(e) {
    const t = this.LA(0), r = e.location;
    r.startOffset <= t.startOffset ? (r.endOffset = t.endOffset, r.endLine = t.endLine, r.endColumn = t.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
  }
  cstPostRuleOnlyOffset(e) {
    const t = this.LA(0), r = e.location;
    r.startOffset <= t.startOffset ? r.endOffset = t.endOffset : r.startOffset = NaN;
  }
  cstPostTerminal(e, t) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    Zh(r, t, e), this.setNodeLocationFromToken(r.location, t);
  }
  cstPostNonTerminal(e, t) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    ep(r, t, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (Dt$1(this.baseCstVisitorConstructor)) {
      const e = rp(this.className, O$1(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (Dt$1(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = ip(this.className, O$1(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getLastExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 1];
  }
  getPreviousExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 2];
  }
  getLastExplicitRuleOccurrenceIndex() {
    const e = this.RULE_OCCURRENCE_STACK;
    return e[e.length - 1];
  }
}
class lp {
  initLexerAdapter() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }
  set input(e) {
    if (this.selfAnalysisDone !== true)
      throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }
  get input() {
    return this.tokVector;
  }
  // skips a token and returns the next token
  SKIP_TOKEN() {
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : Zr;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(e) {
    const t = this.currIdx + e;
    return t < 0 || this.tokVectorLength <= t ? Zr : this.tokVector[t];
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(e) {
    this.currIdx = e;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVector.length - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
}
class up {
  ACTION(e) {
    return e.call(this);
  }
  consume(e, t, r) {
    return this.consumeInternal(t, e, r);
  }
  subrule(e, t, r) {
    return this.subruleInternal(t, e, r);
  }
  option(e, t) {
    return this.optionInternal(t, e);
  }
  or(e, t) {
    return this.orInternal(t, e);
  }
  many(e, t) {
    return this.manyInternal(e, t);
  }
  atLeastOne(e, t) {
    return this.atLeastOneInternal(e, t);
  }
  CONSUME(e, t) {
    return this.consumeInternal(e, 0, t);
  }
  CONSUME1(e, t) {
    return this.consumeInternal(e, 1, t);
  }
  CONSUME2(e, t) {
    return this.consumeInternal(e, 2, t);
  }
  CONSUME3(e, t) {
    return this.consumeInternal(e, 3, t);
  }
  CONSUME4(e, t) {
    return this.consumeInternal(e, 4, t);
  }
  CONSUME5(e, t) {
    return this.consumeInternal(e, 5, t);
  }
  CONSUME6(e, t) {
    return this.consumeInternal(e, 6, t);
  }
  CONSUME7(e, t) {
    return this.consumeInternal(e, 7, t);
  }
  CONSUME8(e, t) {
    return this.consumeInternal(e, 8, t);
  }
  CONSUME9(e, t) {
    return this.consumeInternal(e, 9, t);
  }
  SUBRULE(e, t) {
    return this.subruleInternal(e, 0, t);
  }
  SUBRULE1(e, t) {
    return this.subruleInternal(e, 1, t);
  }
  SUBRULE2(e, t) {
    return this.subruleInternal(e, 2, t);
  }
  SUBRULE3(e, t) {
    return this.subruleInternal(e, 3, t);
  }
  SUBRULE4(e, t) {
    return this.subruleInternal(e, 4, t);
  }
  SUBRULE5(e, t) {
    return this.subruleInternal(e, 5, t);
  }
  SUBRULE6(e, t) {
    return this.subruleInternal(e, 6, t);
  }
  SUBRULE7(e, t) {
    return this.subruleInternal(e, 7, t);
  }
  SUBRULE8(e, t) {
    return this.subruleInternal(e, 8, t);
  }
  SUBRULE9(e, t) {
    return this.subruleInternal(e, 9, t);
  }
  OPTION(e) {
    return this.optionInternal(e, 0);
  }
  OPTION1(e) {
    return this.optionInternal(e, 1);
  }
  OPTION2(e) {
    return this.optionInternal(e, 2);
  }
  OPTION3(e) {
    return this.optionInternal(e, 3);
  }
  OPTION4(e) {
    return this.optionInternal(e, 4);
  }
  OPTION5(e) {
    return this.optionInternal(e, 5);
  }
  OPTION6(e) {
    return this.optionInternal(e, 6);
  }
  OPTION7(e) {
    return this.optionInternal(e, 7);
  }
  OPTION8(e) {
    return this.optionInternal(e, 8);
  }
  OPTION9(e) {
    return this.optionInternal(e, 9);
  }
  OR(e) {
    return this.orInternal(e, 0);
  }
  OR1(e) {
    return this.orInternal(e, 1);
  }
  OR2(e) {
    return this.orInternal(e, 2);
  }
  OR3(e) {
    return this.orInternal(e, 3);
  }
  OR4(e) {
    return this.orInternal(e, 4);
  }
  OR5(e) {
    return this.orInternal(e, 5);
  }
  OR6(e) {
    return this.orInternal(e, 6);
  }
  OR7(e) {
    return this.orInternal(e, 7);
  }
  OR8(e) {
    return this.orInternal(e, 8);
  }
  OR9(e) {
    return this.orInternal(e, 9);
  }
  MANY(e) {
    this.manyInternal(0, e);
  }
  MANY1(e) {
    this.manyInternal(1, e);
  }
  MANY2(e) {
    this.manyInternal(2, e);
  }
  MANY3(e) {
    this.manyInternal(3, e);
  }
  MANY4(e) {
    this.manyInternal(4, e);
  }
  MANY5(e) {
    this.manyInternal(5, e);
  }
  MANY6(e) {
    this.manyInternal(6, e);
  }
  MANY7(e) {
    this.manyInternal(7, e);
  }
  MANY8(e) {
    this.manyInternal(8, e);
  }
  MANY9(e) {
    this.manyInternal(9, e);
  }
  MANY_SEP(e) {
    this.manySepFirstInternal(0, e);
  }
  MANY_SEP1(e) {
    this.manySepFirstInternal(1, e);
  }
  MANY_SEP2(e) {
    this.manySepFirstInternal(2, e);
  }
  MANY_SEP3(e) {
    this.manySepFirstInternal(3, e);
  }
  MANY_SEP4(e) {
    this.manySepFirstInternal(4, e);
  }
  MANY_SEP5(e) {
    this.manySepFirstInternal(5, e);
  }
  MANY_SEP6(e) {
    this.manySepFirstInternal(6, e);
  }
  MANY_SEP7(e) {
    this.manySepFirstInternal(7, e);
  }
  MANY_SEP8(e) {
    this.manySepFirstInternal(8, e);
  }
  MANY_SEP9(e) {
    this.manySepFirstInternal(9, e);
  }
  AT_LEAST_ONE(e) {
    this.atLeastOneInternal(0, e);
  }
  AT_LEAST_ONE1(e) {
    return this.atLeastOneInternal(1, e);
  }
  AT_LEAST_ONE2(e) {
    this.atLeastOneInternal(2, e);
  }
  AT_LEAST_ONE3(e) {
    this.atLeastOneInternal(3, e);
  }
  AT_LEAST_ONE4(e) {
    this.atLeastOneInternal(4, e);
  }
  AT_LEAST_ONE5(e) {
    this.atLeastOneInternal(5, e);
  }
  AT_LEAST_ONE6(e) {
    this.atLeastOneInternal(6, e);
  }
  AT_LEAST_ONE7(e) {
    this.atLeastOneInternal(7, e);
  }
  AT_LEAST_ONE8(e) {
    this.atLeastOneInternal(8, e);
  }
  AT_LEAST_ONE9(e) {
    this.atLeastOneInternal(9, e);
  }
  AT_LEAST_ONE_SEP(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }
  AT_LEAST_ONE_SEP1(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }
  AT_LEAST_ONE_SEP2(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }
  AT_LEAST_ONE_SEP3(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }
  AT_LEAST_ONE_SEP4(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }
  AT_LEAST_ONE_SEP5(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }
  AT_LEAST_ONE_SEP6(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }
  AT_LEAST_ONE_SEP7(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }
  AT_LEAST_ONE_SEP8(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }
  AT_LEAST_ONE_SEP9(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }
  RULE(e, t, r = ei) {
    if (de(this.definedRulesNames, e)) {
      const a2 = {
        message: ht.buildDuplicateRuleNameError({
          topLevelRule: e,
          grammarName: this.className
        }),
        type: ce.DUPLICATE_RULE_NAME,
        ruleName: e
      };
      this.definitionErrors.push(a2);
    }
    this.definedRulesNames.push(e);
    const i = this.defineRule(e, t, r);
    return this[e] = i, i;
  }
  OVERRIDE_RULE(e, t, r = ei) {
    const i = _h(e, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(i);
    const s = this.defineRule(e, t, r);
    return this[e] = s, s;
  }
  BACKTRACK(e, t) {
    return function() {
      this.isBackTrackingStack.push(1);
      const r = this.saveRecogState();
      try {
        return e.apply(this, t), true;
      } catch (i) {
        if (Jr(i))
          return false;
        throw i;
      } finally {
        this.reloadRecogState(r), this.isBackTrackingStack.pop();
      }
    };
  }
  // GAST export APIs
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return Tf(Ft$1(this.gastProductionsCache));
  }
}
class cp {
  initRecognizerEngine(e, t) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = Xr, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, xn$1(t, "serializedGrammar"))
      throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (Ao$1(e)) {
      if (Zd$1(e))
        throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number")
        throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (Ao$1(e))
      this.tokensMap = mt$1(e, (s, a2) => (s[a2.name] = a2, s), {});
    else if (xn$1(e, "modes") && Oe(un$1(Ft$1(e.modes)), lh)) {
      const s = un$1(Ft$1(e.modes)), a2 = Xs(s);
      this.tokensMap = mt$1(a2, (o, l) => (o[l.name] = l, o), {});
    } else if (Jr$1(e))
      this.tokensMap = a(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = nt;
    const r = xn$1(e, "modes") ? un$1(Ft$1(e.modes)) : Ft$1(e), i = Oe(r, (s) => Zd$1(s.categoryMatches));
    this.tokenMatcher = i ? Xr : rr, ir(Ft$1(this.tokensMap));
  }
  defineRule(e, t, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = xn$1(r, "resyncEnabled") ? r.resyncEnabled : ei.resyncEnabled, s = xn$1(r, "recoveryValueFunc") ? r.recoveryValueFunc : ei.recoveryValueFunc, a2 = this.ruleShortNameIdx << Yh + st;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[a2] = e, this.fullRuleNameToShort[e] = a2;
    let o;
    return this.outputCst === true ? o = function(...c) {
      try {
        this.ruleInvocationStateUpdate(a2, e, this.subruleIdx), t.apply(this, c);
        const d = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(d), d;
      } catch (d) {
        return this.invokeRuleCatch(d, i, s);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    } : o = function(...c) {
      try {
        return this.ruleInvocationStateUpdate(a2, e, this.subruleIdx), t.apply(this, c);
      } catch (d) {
        return this.invokeRuleCatch(d, i, s);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, Object.assign(o, { ruleName: e, originalGrammarAction: t });
  }
  invokeRuleCatch(e, t, r) {
    const i = this.RULE_STACK.length === 1, s = t && !this.isBackTracking() && this.recoveryEnabled;
    if (Jr(e)) {
      const a2 = e;
      if (s) {
        const o = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(o))
          if (a2.resyncedTokens = this.reSyncTo(o), this.outputCst) {
            const l = this.CST_STACK[this.CST_STACK.length - 1];
            return l.recoveredNode = true, l;
          } else
            return r(e);
        else {
          if (this.outputCst) {
            const l = this.CST_STACK[this.CST_STACK.length - 1];
            l.recoveredNode = true, a2.partialCstResult = l;
          }
          throw a2;
        }
      } else {
        if (i)
          return this.moveToTerminatedState(), r(e);
        throw a2;
      }
    } else
      throw e;
  }
  // Implementation of parsing DSL
  optionInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Mu, t);
    return this.optionInternalLogic(e, t, r);
  }
  optionInternalLogic(e, t, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof e != "function") {
      s = e.DEF;
      const a2 = e.GATE;
      if (a2 !== void 0) {
        const o = i;
        i = () => a2.call(this) && o.call(this);
      }
    } else
      s = e;
    if (i.call(this) === true)
      return s.call(this);
  }
  atLeastOneInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(As, e);
    return this.atLeastOneInternalLogic(e, t, r);
  }
  atLeastOneInternalLogic(e, t, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof t != "function") {
      s = t.DEF;
      const a2 = t.GATE;
      if (a2 !== void 0) {
        const o = i;
        i = () => a2.call(this) && o.call(this);
      }
    } else
      s = t;
    if (i.call(this) === true) {
      let a2 = this.doSingleRepetition(s);
      for (; i.call(this) === true && a2 === true; )
        a2 = this.doSingleRepetition(s);
    } else
      throw this.raiseEarlyExitException(e, B.REPETITION_MANDATORY, t.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, t], i, As, e, yh);
  }
  atLeastOneSepFirstInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Or, e);
    this.atLeastOneSepFirstInternalLogic(e, t, r);
  }
  atLeastOneSepFirstInternalLogic(e, t, r) {
    const i = t.DEF, s = t.SEP;
    if (this.getLaFuncFromCache(r).call(this) === true) {
      i.call(this);
      const o = () => this.tokenMatcher(this.LA(1), s);
      for (; this.tokenMatcher(this.LA(1), s) === true; )
        this.CONSUME(s), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        s,
        o,
        i,
        za
      ], o, Or, e, za);
    } else
      throw this.raiseEarlyExitException(e, B.REPETITION_MANDATORY_WITH_SEPARATOR, t.ERR_MSG);
  }
  manyInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(vs, e);
    return this.manyInternalLogic(e, t, r);
  }
  manyInternalLogic(e, t, r) {
    let i = this.getLaFuncFromCache(r), s;
    if (typeof t != "function") {
      s = t.DEF;
      const o = t.GATE;
      if (o !== void 0) {
        const l = i;
        i = () => o.call(this) && l.call(this);
      }
    } else
      s = t;
    let a2 = true;
    for (; i.call(this) === true && a2 === true; )
      a2 = this.doSingleRepetition(s);
    this.attemptInRepetitionRecovery(
      this.manyInternal,
      [e, t],
      i,
      vs,
      e,
      gh,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      a2
    );
  }
  manySepFirstInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Es, e);
    this.manySepFirstInternalLogic(e, t, r);
  }
  manySepFirstInternalLogic(e, t, r) {
    const i = t.DEF, s = t.SEP;
    if (this.getLaFuncFromCache(r).call(this) === true) {
      i.call(this);
      const o = () => this.tokenMatcher(this.LA(1), s);
      for (; this.tokenMatcher(this.LA(1), s) === true; )
        this.CONSUME(s), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        s,
        o,
        i,
        ja
      ], o, Es, e, ja);
    }
  }
  repetitionSepSecondInternal(e, t, r, i, s) {
    for (; r(); )
      this.CONSUME(t), i.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
      e,
      t,
      r,
      i,
      s
    ], r, Or, e, s);
  }
  doSingleRepetition(e) {
    const t = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > t;
  }
  orInternal(e, t) {
    const r = this.getKeyForAutomaticLookahead(Pu, t), i = Ao$1(e) ? e : e.DEF, a2 = this.getLaFuncFromCache(r).call(this, i);
    if (a2 !== void 0)
      return i[a2].ALT.call(this);
    this.raiseNoAltException(t, e.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
      const e = this.LA(1), t = this.errorMessageProvider.buildNotAllInputParsedMessage({
        firstRedundant: e,
        ruleName: this.getCurrRuleFullName()
      });
      this.SAVE_ERROR(new Wh(t, e));
    }
  }
  subruleInternal(e, t, r) {
    let i;
    try {
      const s = r !== void 0 ? r.ARGS : void 0;
      return this.subruleIdx = t, i = e.apply(this, s), this.cstPostNonTerminal(i, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), i;
    } catch (s) {
      throw this.subruleInternalError(s, r, e.ruleName);
    }
  }
  subruleInternalError(e, t, r) {
    throw Jr(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, t !== void 0 && t.LABEL !== void 0 ? t.LABEL : r), delete e.partialCstResult), e;
  }
  consumeInternal(e, t, r) {
    let i;
    try {
      const s = this.LA(1);
      this.tokenMatcher(s, e) === true ? (this.consumeToken(), i = s) : this.consumeInternalError(e, s, r);
    } catch (s) {
      i = this.consumeInternalRecovery(e, t, s);
    }
    return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, i), i;
  }
  consumeInternalError(e, t, r) {
    let i;
    const s = this.LA(0);
    throw r !== void 0 && r.ERR_MSG ? i = r.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({
      expected: e,
      actual: t,
      previous: s,
      ruleName: this.getCurrRuleFullName()
    }), this.SAVE_ERROR(new bu(i, t, s));
  }
  consumeInternalRecovery(e, t, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const i = this.getFollowsForInRuleRecovery(e, t);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (s) {
        throw s.name === Ou ? r : s;
      }
    } else
      throw r;
  }
  saveRecogState() {
    const e = this.errors, t = a(this.RULE_STACK);
    return {
      errors: e,
      lexerState: this.exportLexerState(),
      RULE_STACK: t,
      CST_STACK: this.CST_STACK
    };
  }
  reloadRecogState(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
  }
  ruleInvocationStateUpdate(e, t, r) {
    this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(t);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    const e = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[e];
  }
  shortRuleNameToFullName(e) {
    return this.shortRuleNameToFull[e];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), nt);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }
}
class dp {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = xn$1(e, "errorMessageProvider") ? e.errorMessageProvider : Je.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (Jr(e))
      return e.context = {
        ruleStack: this.getHumanReadableRuleStack(),
        ruleOccurrenceStack: a(this.RULE_OCCURRENCE_STACK)
      }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }
  get errors() {
    return a(this._errors);
  }
  set errors(e) {
    this._errors = e;
  }
  // TODO: consider caching the error message computed information
  raiseEarlyExitException(e, t, r) {
    const i = this.getCurrRuleFullName(), s = this.getGAstProductions()[i], o = xi(e, s, t, this.maxLookahead)[0], l = [];
    for (let c = 1; c <= this.maxLookahead; c++)
      l.push(this.LA(c));
    const u = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: o,
      actual: l,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: i
    });
    throw this.SAVE_ERROR(new Hh(u, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(e, t) {
    const r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], s = ki(e, i, this.maxLookahead), a2 = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      a2.push(this.LA(u));
    const o = this.LA(0), l = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: s,
      actual: a2,
      previous: o,
      customUserDescription: t,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new Kh(l, this.LA(1), o));
  }
}
class fp {
  initContentAssist() {
  }
  computeContentAssist(e, t) {
    const r = this.gastProductionsCache[e];
    if (Dt$1(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return Eu([r], t, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const t = Pe(e.ruleStack), i = this.getGAstProductions()[t];
    return new mh(i, e).startWalking();
  }
}
const Ii = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(Ii);
const Qa = true, Za = Math.pow(2, st) - 1, Fu = vu({ name: "RECORDING_PHASE_TOKEN", pattern: fe.NA });
ir([Fu]);
const Gu = aa(
  Fu,
  `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(Gu);
const hp = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class pp {
  initGastRecorder(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = false;
  }
  enableRecording() {
    this.RECORDING_PHASE = true, this.TRACE_INIT("Enable Recording", () => {
      for (let e = 0; e < 10; e++) {
        const t = e > 0 ? e : "";
        this[`CONSUME${t}`] = function(r, i) {
          return this.consumeInternalRecord(r, e, i);
        }, this[`SUBRULE${t}`] = function(r, i) {
          return this.subruleInternalRecord(r, e, i);
        }, this[`OPTION${t}`] = function(r) {
          return this.optionInternalRecord(r, e);
        }, this[`OR${t}`] = function(r) {
          return this.orInternalRecord(r, e);
        }, this[`MANY${t}`] = function(r) {
          this.manyInternalRecord(e, r);
        }, this[`MANY_SEP${t}`] = function(r) {
          this.manySepFirstInternalRecord(e, r);
        }, this[`AT_LEAST_ONE${t}`] = function(r) {
          this.atLeastOneInternalRecord(e, r);
        }, this[`AT_LEAST_ONE_SEP${t}`] = function(r) {
          this.atLeastOneSepFirstInternalRecord(e, r);
        };
      }
      this.consume = function(e, t, r) {
        return this.consumeInternalRecord(t, e, r);
      }, this.subrule = function(e, t, r) {
        return this.subruleInternalRecord(t, e, r);
      }, this.option = function(e, t) {
        return this.optionInternalRecord(t, e);
      }, this.or = function(e, t) {
        return this.orInternalRecord(t, e);
      }, this.many = function(e, t) {
        this.manyInternalRecord(e, t);
      }, this.atLeastOne = function(e, t) {
        this.atLeastOneInternalRecord(e, t);
      }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = false, this.TRACE_INIT("Deleting Recording methods", () => {
      const e = this;
      for (let t = 0; t < 10; t++) {
        const r = t > 0 ? t : "";
        delete e[`CONSUME${r}`], delete e[`SUBRULE${r}`], delete e[`OPTION${r}`], delete e[`OR${r}`], delete e[`MANY${r}`], delete e[`MANY_SEP${r}`], delete e[`AT_LEAST_ONE${r}`], delete e[`AT_LEAST_ONE_SEP${r}`];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }
  //   Parser methods are called inside an ACTION?
  //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
  // @ts-expect-error -- noop place holder
  ACTION_RECORD(e) {
  }
  // Executing backtracking logic will break our recording logic assumptions
  BACKTRACK_RECORD(e, t) {
    return () => true;
  }
  // LA is part of the official API and may be used for custom lookahead logic
  // by end users who may forget to wrap it in ACTION or inside a GATE
  LA_RECORD(e) {
    return Zr;
  }
  topLevelRuleRecord(e, t) {
    try {
      const r = new Bt({ definition: [], name: e });
      return r.name = e, this.recordingProdStack.push(r), t.call(this), this.recordingProdStack.pop(), r;
    } catch (r) {
      if (r.KNOWN_RECORDER_ERROR !== true)
        try {
          r.message = r.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
        } catch {
          throw r;
        }
      throw r;
    }
  }
  // Implementation of parsing DSL
  optionInternalRecord(e, t) {
    return Ht.call(this, te, e, t);
  }
  atLeastOneInternalRecord(e, t) {
    Ht.call(this, xe, t, e);
  }
  atLeastOneSepFirstInternalRecord(e, t) {
    Ht.call(this, Se, t, e, Qa);
  }
  manyInternalRecord(e, t) {
    Ht.call(this, W, t, e);
  }
  manySepFirstInternalRecord(e, t) {
    Ht.call(this, me, t, e, Qa);
  }
  orInternalRecord(e, t) {
    return mp.call(this, e, t);
  }
  subruleInternalRecord(e, t, r) {
    if (Qr(t), !e || xn$1(e, "ruleName") === false) {
      const o = new Error(`<SUBRULE${eo(t)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw o.KNOWN_RECORDER_ERROR = true, o;
    }
    const i = gn$1(this.recordingProdStack), s = e.ruleName, a2 = new ue({
      idx: t,
      nonTerminalName: s,
      label: r == null ? void 0 : r.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return i.definition.push(a2), this.outputCst ? hp : Ii;
  }
  consumeInternalRecord(e, t, r) {
    if (Qr(t), !Tu(e)) {
      const a2 = new Error(`<CONSUME${eo(t)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a2.KNOWN_RECORDER_ERROR = true, a2;
    }
    const i = gn$1(this.recordingProdStack), s = new G({
      idx: t,
      terminalType: e,
      label: r == null ? void 0 : r.LABEL
    });
    return i.definition.push(s), Gu;
  }
}
function Ht(n, e, t, r = false) {
  Qr(t);
  const i = gn$1(this.recordingProdStack), s = Jc$1(e) ? e : e.DEF, a2 = new n({ definition: [], idx: t });
  return r && (a2.separator = e.SEP), xn$1(e, "MAX_LOOKAHEAD") && (a2.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a2), s.call(this), i.definition.push(a2), this.recordingProdStack.pop(), Ii;
}
function mp(n, e) {
  Qr(e);
  const t = gn$1(this.recordingProdStack), r = Ao$1(n) === false, i = r === false ? n : n.DEF, s = new ge({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && n.IGNORE_AMBIGUITIES === true
  });
  xn$1(n, "MAX_LOOKAHEAD") && (s.maxLookahead = n.MAX_LOOKAHEAD);
  const a2 = Gl(i, (o) => Jc$1(o.GATE));
  return s.hasPredicates = a2, t.definition.push(s), Mt$1(i, (o) => {
    const l = new pe({ definition: [] });
    s.definition.push(l), xn$1(o, "IGNORE_AMBIGUITIES") ? l.ignoreAmbiguities = o.IGNORE_AMBIGUITIES : xn$1(o, "GATE") && (l.ignoreAmbiguities = true), this.recordingProdStack.push(l), o.ALT.call(this), this.recordingProdStack.pop();
  }), Ii;
}
function eo(n) {
  return n === 0 ? "" : `${n}`;
}
function Qr(n) {
  if (n < 0 || n > Za) {
    const e = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${n}>
	Idx value must be a none negative value smaller than ${Za + 1}`
    );
    throw e.KNOWN_RECORDER_ERROR = true, e;
  }
}
class gp {
  initPerformanceTracer(e) {
    if (xn$1(e, "traceInitPerf")) {
      const t = e.traceInitPerf, r = typeof t == "number";
      this.traceInitMaxIdent = r ? t : 1 / 0, this.traceInitPerf = r ? t > 0 : t;
    } else
      this.traceInitMaxIdent = 0, this.traceInitPerf = Je.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, t) {
    if (this.traceInitPerf === true) {
      this.traceInitIndent++;
      const r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
      const { time: i, value: s } = lu(t), a2 = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && a2(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, s;
    } else
      return t();
  }
}
function yp(n, e) {
  e.forEach((t) => {
    const r = t.prototype;
    Object.getOwnPropertyNames(r).forEach((i) => {
      if (i === "constructor")
        return;
      const s = Object.getOwnPropertyDescriptor(r, i);
      s && (s.get || s.set) ? Object.defineProperty(n.prototype, i, s) : n.prototype[i] = t.prototype[i];
    });
  });
}
const Zr = aa(nt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(Zr);
const Je = Object.freeze({
  recoveryEnabled: false,
  maxLookahead: 3,
  dynamicTokensEnabled: false,
  outputCst: true,
  errorMessageProvider: Ct,
  nodeLocationTracking: "none",
  traceInitPerf: false,
  skipValidations: false
}), ei = Object.freeze({
  recoveryValueFunc: () => {
  },
  resyncEnabled: true
});
var ce;
(function(n) {
  n[n.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", n[n.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", n[n.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", n[n.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", n[n.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", n[n.LEFT_RECURSION = 5] = "LEFT_RECURSION", n[n.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", n[n.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", n[n.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", n[n.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", n[n.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", n[n.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", n[n.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", n[n.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(ce || (ce = {}));
function to(n = void 0) {
  return function() {
    return n;
  };
}
class sr {
  /**
   *  @deprecated use the **instance** method with the same name instead
   */
  static performSelfAnalysis(e) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let e;
      this.selfAnalysisDone = true;
      const t = this.className;
      this.TRACE_INIT("toFastProps", () => {
        uu(this);
      }), this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording(), Mt$1(this.definedRulesNames, (i) => {
            const a2 = this[i].originalGrammarAction;
            let o;
            this.TRACE_INIT(`${i} Rule`, () => {
              o = this.topLevelRuleRecord(i, a2);
            }), this.gastProductionsCache[i] = o;
          });
        } finally {
          this.disableRecording();
        }
      });
      let r = [];
      if (this.TRACE_INIT("Grammar Resolving", () => {
        r = Bh({
          rules: Ft$1(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (Zd$1(r) && this.skipValidations === false) {
          const i = Vh({
            rules: Ft$1(this.gastProductionsCache),
            tokenTypes: Ft$1(this.tokensMap),
            errMsgProvider: ht,
            grammarName: t
          }), s = Sh({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: Ft$1(this.gastProductionsCache),
            tokenTypes: Ft$1(this.tokensMap),
            grammarName: t
          });
          this.definitionErrors = this.definitionErrors.concat(i, s);
        }
      }), Zd$1(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = xf(Ft$1(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, s;
        (s = (i = this.lookaheadStrategy).initialize) === null || s === void 0 || s.call(i, {
          rules: Ft$1(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(Ft$1(this.gastProductionsCache));
      })), !sr.DEFER_DEFINITION_ERRORS_HANDLING && !Zd$1(this.definitionErrors))
        throw e = on$1(this.definitionErrors, (i) => i.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`);
    });
  }
  constructor(e, t) {
    this.definitionErrors = [], this.selfAnalysisDone = false;
    const r = this;
    if (r.initErrorHandler(t), r.initLexerAdapter(), r.initLooksAhead(t), r.initRecognizerEngine(e, t), r.initRecoverable(t), r.initTreeBuilder(t), r.initContentAssist(), r.initGastRecorder(t), r.initPerformanceTracer(t), xn$1(t, "ignoredIssues"))
      throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = xn$1(t, "skipValidations") ? t.skipValidations : Je.skipValidations;
  }
}
sr.DEFER_DEFINITION_ERRORS_HANDLING = false;
yp(sr, [
  zh,
  Xh,
  op,
  lp,
  cp,
  up,
  dp,
  fp,
  pp,
  gp
]);
class Tp extends sr {
  constructor(e, t = Je) {
    const r = a(t);
    r.outputCst = false, super(e, r);
  }
}
function Ot(n, e, t) {
  return `${n.name}_${e}_${t}`;
}
const rt = 1, Rp = 2, Uu = 4, Bu = 5, ar = 7, vp = 8, Ap = 9, Ep = 10, $p = 11, Vu = 12;
class ca {
  constructor(e) {
    this.target = e;
  }
  isEpsilon() {
    return false;
  }
}
class da extends ca {
  constructor(e, t) {
    super(e), this.tokenType = t;
  }
}
class Ku extends ca {
  constructor(e) {
    super(e);
  }
  isEpsilon() {
    return true;
  }
}
class fa extends ca {
  constructor(e, t, r) {
    super(e), this.rule = t, this.followState = r;
  }
  isEpsilon() {
    return true;
  }
}
function kp(n) {
  const e = {
    decisionMap: {},
    decisionStates: [],
    ruleToStartState: /* @__PURE__ */ new Map(),
    ruleToStopState: /* @__PURE__ */ new Map(),
    states: []
  };
  xp(e, n);
  const t = n.length;
  for (let r = 0; r < t; r++) {
    const i = n[r], s = Et(e, i, i);
    s !== void 0 && Mp(e, i, s);
  }
  return e;
}
function xp(n, e) {
  const t = e.length;
  for (let r = 0; r < t; r++) {
    const i = e[r], s = X(n, i, void 0, {
      type: Rp
    }), a2 = X(n, i, void 0, {
      type: ar
    });
    s.stop = a2, n.ruleToStartState.set(i, s), n.ruleToStopState.set(i, a2);
  }
}
function Wu(n, e, t) {
  return t instanceof G ? ha(n, e, t.terminalType, t) : t instanceof ue ? Pp(n, e, t) : t instanceof ge ? wp(n, e, t) : t instanceof te ? Lp(n, e, t) : t instanceof W ? Sp(n, e, t) : t instanceof me ? Ip(n, e, t) : t instanceof xe ? Cp(n, e, t) : t instanceof Se ? Np(n, e, t) : Et(n, e, t);
}
function Sp(n, e, t) {
  const r = X(n, e, t, {
    type: Bu
  });
  at(n, r);
  const i = Kt(n, e, r, t, Et(n, e, t));
  return ju(n, e, t, i);
}
function Ip(n, e, t) {
  const r = X(n, e, t, {
    type: Bu
  });
  at(n, r);
  const i = Kt(n, e, r, t, Et(n, e, t)), s = ha(n, e, t.separator, t);
  return ju(n, e, t, i, s);
}
function Cp(n, e, t) {
  const r = X(n, e, t, {
    type: Uu
  });
  at(n, r);
  const i = Kt(n, e, r, t, Et(n, e, t));
  return Hu(n, e, t, i);
}
function Np(n, e, t) {
  const r = X(n, e, t, {
    type: Uu
  });
  at(n, r);
  const i = Kt(n, e, r, t, Et(n, e, t)), s = ha(n, e, t.separator, t);
  return Hu(n, e, t, i, s);
}
function wp(n, e, t) {
  const r = X(n, e, t, {
    type: rt
  });
  at(n, r);
  const i = on$1(t.definition, (a2) => Wu(n, e, a2));
  return Kt(n, e, r, t, ...i);
}
function Lp(n, e, t) {
  const r = X(n, e, t, {
    type: rt
  });
  at(n, r);
  const i = Kt(n, e, r, t, Et(n, e, t));
  return _p(n, e, t, i);
}
function Et(n, e, t) {
  const r = Rt$1(on$1(t.definition, (i) => Wu(n, e, i)), (i) => i !== void 0);
  return r.length === 1 ? r[0] : r.length === 0 ? void 0 : Op(n, r);
}
function Hu(n, e, t, r, i) {
  const s = r.left, a2 = r.right, o = X(n, e, t, {
    type: $p
  });
  at(n, o);
  const l = X(n, e, t, {
    type: Vu
  });
  return s.loopback = o, l.loopback = o, n.decisionMap[Ot(e, i ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", t.idx)] = o, j(a2, o), i === void 0 ? (j(o, s), j(o, l)) : (j(o, l), j(o, i.left), j(i.right, s)), {
    left: s,
    right: l
  };
}
function ju(n, e, t, r, i) {
  const s = r.left, a2 = r.right, o = X(n, e, t, {
    type: Ep
  });
  at(n, o);
  const l = X(n, e, t, {
    type: Vu
  }), u = X(n, e, t, {
    type: Ap
  });
  return o.loopback = u, l.loopback = u, j(o, s), j(o, l), j(a2, u), i !== void 0 ? (j(u, l), j(u, i.left), j(i.right, s)) : j(u, o), n.decisionMap[Ot(e, i ? "RepetitionWithSeparator" : "Repetition", t.idx)] = o, {
    left: o,
    right: l
  };
}
function _p(n, e, t, r) {
  const i = r.left, s = r.right;
  return j(i, s), n.decisionMap[Ot(e, "Option", t.idx)] = i, r;
}
function at(n, e) {
  return n.decisionStates.push(e), e.decision = n.decisionStates.length - 1, e.decision;
}
function Kt(n, e, t, r, ...i) {
  const s = X(n, e, r, {
    type: vp,
    start: t
  });
  t.end = s;
  for (const o of i)
    o !== void 0 ? (j(t, o.left), j(o.right, s)) : j(t, s);
  const a2 = {
    left: t,
    right: s
  };
  return n.decisionMap[Ot(e, bp(r), r.idx)] = t, a2;
}
function bp(n) {
  if (n instanceof ge)
    return "Alternation";
  if (n instanceof te)
    return "Option";
  if (n instanceof W)
    return "Repetition";
  if (n instanceof me)
    return "RepetitionWithSeparator";
  if (n instanceof xe)
    return "RepetitionMandatory";
  if (n instanceof Se)
    return "RepetitionMandatoryWithSeparator";
  throw new Error("Invalid production type encountered");
}
function Op(n, e) {
  const t = e.length;
  for (let s = 0; s < t - 1; s++) {
    const a2 = e[s];
    let o;
    a2.left.transitions.length === 1 && (o = a2.left.transitions[0]);
    const l = o instanceof fa, u = o, c = e[s + 1].left;
    a2.left.type === rt && a2.right.type === rt && o !== void 0 && (l && u.followState === a2.right || o.target === a2.right) ? (l ? u.followState = c : o.target = c, Dp(n, a2.right)) : j(a2.right, c);
  }
  const r = e[0], i = e[t - 1];
  return {
    left: r.left,
    right: i.right
  };
}
function ha(n, e, t, r) {
  const i = X(n, e, r, {
    type: rt
  }), s = X(n, e, r, {
    type: rt
  });
  return pa(i, new da(s, t)), {
    left: i,
    right: s
  };
}
function Pp(n, e, t) {
  const r = t.referencedRule, i = n.ruleToStartState.get(r), s = X(n, e, t, {
    type: rt
  }), a2 = X(n, e, t, {
    type: rt
  }), o = new fa(i, r, a2);
  return pa(s, o), {
    left: s,
    right: a2
  };
}
function Mp(n, e, t) {
  const r = n.ruleToStartState.get(e);
  j(r, t.left);
  const i = n.ruleToStopState.get(e);
  return j(t.right, i), {
    left: r,
    right: i
  };
}
function j(n, e) {
  const t = new Ku(e);
  pa(n, t);
}
function X(n, e, t, r) {
  const i = Object.assign({
    atn: n,
    production: t,
    epsilonOnlyTransitions: false,
    rule: e,
    transitions: [],
    nextTokenWithinRule: [],
    stateNumber: n.states.length
  }, r);
  return n.states.push(i), i;
}
function pa(n, e) {
  n.transitions.length === 0 && (n.epsilonOnlyTransitions = e.isEpsilon()), n.transitions.push(e);
}
function Dp(n, e) {
  n.states.splice(n.states.indexOf(e), 1);
}
const ti = {};
class ks {
  constructor() {
    this.map = {}, this.configs = [];
  }
  get size() {
    return this.configs.length;
  }
  finalize() {
    this.map = {};
  }
  add(e) {
    const t = zu(e);
    t in this.map || (this.map[t] = this.configs.length, this.configs.push(e));
  }
  get elements() {
    return this.configs;
  }
  get alts() {
    return on$1(this.configs, (e) => e.alt);
  }
  get key() {
    let e = "";
    for (const t in this.map)
      e += t + ":";
    return e;
  }
}
function zu(n, e = true) {
  return `${e ? `a${n.alt}` : ""}s${n.state.stateNumber}:${n.stack.map((t) => t.stateNumber.toString()).join("_")}`;
}
function Fp(n, e) {
  const t = {};
  return (r) => {
    const i = r.toString();
    let s = t[i];
    return s !== void 0 || (s = {
      atnStartState: n,
      decision: e,
      states: {}
    }, t[i] = s), s;
  };
}
class qu {
  constructor() {
    this.predicates = [];
  }
  is(e) {
    return e >= this.predicates.length || this.predicates[e];
  }
  set(e, t) {
    this.predicates[e] = t;
  }
  toString() {
    let e = "";
    const t = this.predicates.length;
    for (let r = 0; r < t; r++)
      e += this.predicates[r] === true ? "1" : "0";
    return e;
  }
}
const no = new qu();
class Gp extends ua {
  constructor(e) {
    var t;
    super(), this.logging = (t = e == null ? void 0 : e.logging) !== null && t !== void 0 ? t : (r) => console.log(r);
  }
  initialize(e) {
    this.atn = kp(e.rules), this.dfas = Up(this.atn);
  }
  validateAmbiguousAlternationAlternatives() {
    return [];
  }
  validateEmptyOrAlternatives() {
    return [];
  }
  buildLookaheadForAlternation(e) {
    const { prodOccurrence: t, rule: r, hasPredicates: i, dynamicTokensEnabled: s } = e, a2 = this.dfas, o = this.logging, l = Ot(r, "Alternation", t), c = this.atn.decisionMap[l].decision, d = on$1(qa({
      maxLookahead: 1,
      occurrence: t,
      prodType: "Alternation",
      rule: r
    }), (h) => on$1(h, (f) => f[0]));
    if (ro(d, false) && !s) {
      const h = mt$1(d, (f, m, g) => (Mt$1(m, (A) => {
        A && (f[A.tokenTypeIdx] = g, Mt$1(A.categoryMatches, (y) => {
          f[y] = g;
        }));
      }), f), {});
      return i ? function(f) {
        var m;
        const g = this.LA(1), A = h[g.tokenTypeIdx];
        if (f !== void 0 && A !== void 0) {
          const y = (m = f[A]) === null || m === void 0 ? void 0 : m.GATE;
          if (y !== void 0 && y.call(this) === false)
            return;
        }
        return A;
      } : function() {
        const f = this.LA(1);
        return h[f.tokenTypeIdx];
      };
    } else
      return i ? function(h) {
        const f = new qu(), m = h === void 0 ? 0 : h.length;
        for (let A = 0; A < m; A++) {
          const y = h == null ? void 0 : h[A].GATE;
          f.set(A, y === void 0 || y.call(this));
        }
        const g = ji.call(this, a2, c, f, o);
        return typeof g == "number" ? g : void 0;
      } : function() {
        const h = ji.call(this, a2, c, no, o);
        return typeof h == "number" ? h : void 0;
      };
  }
  buildLookaheadForOptional(e) {
    const { prodOccurrence: t, rule: r, prodType: i, dynamicTokensEnabled: s } = e, a2 = this.dfas, o = this.logging, l = Ot(r, i, t), c = this.atn.decisionMap[l].decision, d = on$1(qa({
      maxLookahead: 1,
      occurrence: t,
      prodType: i,
      rule: r
    }), (h) => on$1(h, (f) => f[0]));
    if (ro(d) && d[0][0] && !s) {
      const h = d[0], f = un$1(h);
      if (f.length === 1 && Zd$1(f[0].categoryMatches)) {
        const g = f[0].tokenTypeIdx;
        return function() {
          return this.LA(1).tokenTypeIdx === g;
        };
      } else {
        const m = mt$1(f, (g, A) => (A !== void 0 && (g[A.tokenTypeIdx] = true, Mt$1(A.categoryMatches, (y) => {
          g[y] = true;
        })), g), {});
        return function() {
          const g = this.LA(1);
          return m[g.tokenTypeIdx] === true;
        };
      }
    }
    return function() {
      const h = ji.call(this, a2, c, no, o);
      return typeof h == "object" ? false : h === 0;
    };
  }
}
function ro(n, e = true) {
  const t = /* @__PURE__ */ new Set();
  for (const r of n) {
    const i = /* @__PURE__ */ new Set();
    for (const s of r) {
      if (s === void 0) {
        if (e)
          break;
        return false;
      }
      const a2 = [s.tokenTypeIdx].concat(s.categoryMatches);
      for (const o of a2)
        if (t.has(o)) {
          if (!i.has(o))
            return false;
        } else
          t.add(o), i.add(o);
    }
  }
  return true;
}
function Up(n) {
  const e = n.decisionStates.length, t = Array(e);
  for (let r = 0; r < e; r++)
    t[r] = Fp(n.decisionStates[r], r);
  return t;
}
function ji(n, e, t, r) {
  const i = n[e](t);
  let s = i.start;
  if (s === void 0) {
    const o = Jp(i.atnStartState);
    s = Xu(i, Yu(o)), i.start = s;
  }
  return Bp.apply(this, [i, s, t, r]);
}
function Bp(n, e, t, r) {
  let i = e, s = 1;
  const a2 = [];
  let o = this.LA(s++);
  for (; ; ) {
    let l = zp(i, o);
    if (l === void 0 && (l = Vp.apply(this, [n, i, o, s, t, r])), l === ti)
      return jp(a2, i, o);
    if (l.isAcceptState === true)
      return l.prediction;
    i = l, a2.push(o), o = this.LA(s++);
  }
}
function Vp(n, e, t, r, i, s) {
  const a2 = qp(e.configs, t, i);
  if (a2.size === 0)
    return io(n, e, t, ti), ti;
  let o = Yu(a2);
  const l = Xp(a2, i);
  if (l !== void 0)
    o.isAcceptState = true, o.prediction = l, o.configs.uniqueAlt = l;
  else if (tm(a2)) {
    const u = mn$1(a2.alts);
    o.isAcceptState = true, o.prediction = u, o.configs.uniqueAlt = u, Kp.apply(this, [n, r, a2.alts, s]);
  }
  return o = io(n, e, t, o), o;
}
function Kp(n, e, t, r) {
  const i = [];
  for (let u = 1; u <= e; u++)
    i.push(this.LA(u).tokenType);
  const s = n.atnStartState, a2 = s.rule, o = s.production, l = Wp({
    topLevelRule: a2,
    ambiguityIndices: t,
    production: o,
    prefixPath: i
  });
  r(l);
}
function Wp(n) {
  const e = on$1(n.prefixPath, (i) => wt(i)).join(", "), t = n.production.idx === 0 ? "" : n.production.idx;
  let r = `Ambiguous Alternatives Detected: <${n.ambiguityIndices.join(", ")}> in <${Hp(n.production)}${t}> inside <${n.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
  return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
}
function Hp(n) {
  if (n instanceof ue)
    return "SUBRULE";
  if (n instanceof te)
    return "OPTION";
  if (n instanceof ge)
    return "OR";
  if (n instanceof xe)
    return "AT_LEAST_ONE";
  if (n instanceof Se)
    return "AT_LEAST_ONE_SEP";
  if (n instanceof me)
    return "MANY_SEP";
  if (n instanceof W)
    return "MANY";
  if (n instanceof G)
    return "CONSUME";
  throw Error("non exhaustive match");
}
function jp(n, e, t) {
  const r = Ee(e.configs.elements, (s) => s.state.transitions), i = pd(r.filter((s) => s instanceof da).map((s) => s.tokenType), (s) => s.tokenTypeIdx);
  return {
    actualToken: t,
    possibleTokenTypes: i,
    tokenPath: n
  };
}
function zp(n, e) {
  return n.edges[e.tokenTypeIdx];
}
function qp(n, e, t) {
  const r = new ks(), i = [];
  for (const a2 of n.elements) {
    if (t.is(a2.alt) === false)
      continue;
    if (a2.state.type === ar) {
      i.push(a2);
      continue;
    }
    const o = a2.state.transitions.length;
    for (let l = 0; l < o; l++) {
      const u = a2.state.transitions[l], c = Yp(u, e);
      c !== void 0 && r.add({
        state: c,
        alt: a2.alt,
        stack: a2.stack
      });
    }
  }
  let s;
  if (i.length === 0 && r.size === 1 && (s = r), s === void 0) {
    s = new ks();
    for (const a2 of r.elements)
      ni(a2, s);
  }
  if (i.length > 0 && !Zp(s))
    for (const a2 of i)
      s.add(a2);
  return s;
}
function Yp(n, e) {
  if (n instanceof da && Au(e, n.tokenType))
    return n.target;
}
function Xp(n, e) {
  let t;
  for (const r of n.elements)
    if (e.is(r.alt) === true) {
      if (t === void 0)
        t = r.alt;
      else if (t !== r.alt)
        return;
    }
  return t;
}
function Yu(n) {
  return {
    configs: n,
    edges: {},
    isAcceptState: false,
    prediction: -1
  };
}
function io(n, e, t, r) {
  return r = Xu(n, r), e.edges[t.tokenTypeIdx] = r, r;
}
function Xu(n, e) {
  if (e === ti)
    return e;
  const t = e.configs.key, r = n.states[t];
  return r !== void 0 ? r : (e.configs.finalize(), n.states[t] = e, e);
}
function Jp(n) {
  const e = new ks(), t = n.transitions.length;
  for (let r = 0; r < t; r++) {
    const s = {
      state: n.transitions[r].target,
      alt: r,
      stack: []
    };
    ni(s, e);
  }
  return e;
}
function ni(n, e) {
  const t = n.state;
  if (t.type === ar) {
    if (n.stack.length > 0) {
      const i = [...n.stack], a2 = {
        state: i.pop(),
        alt: n.alt,
        stack: i
      };
      ni(a2, e);
    } else
      e.add(n);
    return;
  }
  t.epsilonOnlyTransitions || e.add(n);
  const r = t.transitions.length;
  for (let i = 0; i < r; i++) {
    const s = t.transitions[i], a2 = Qp(n, s);
    a2 !== void 0 && ni(a2, e);
  }
}
function Qp(n, e) {
  if (e instanceof Ku)
    return {
      state: e.target,
      alt: n.alt,
      stack: n.stack
    };
  if (e instanceof fa) {
    const t = [...n.stack, e.followState];
    return {
      state: e.target,
      alt: n.alt,
      stack: t
    };
  }
}
function Zp(n) {
  for (const e of n.elements)
    if (e.state.type === ar)
      return true;
  return false;
}
function em(n) {
  for (const e of n.elements)
    if (e.state.type !== ar)
      return false;
  return true;
}
function tm(n) {
  if (em(n))
    return true;
  const e = nm(n.elements);
  return rm(e) && !im(e);
}
function nm(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) {
    const r = zu(t, false);
    let i = e.get(r);
    i === void 0 && (i = {}, e.set(r, i)), i[t.alt] = true;
  }
  return e;
}
function rm(n) {
  for (const e of Array.from(n.values()))
    if (Object.keys(e).length > 1)
      return true;
  return false;
}
function im(n) {
  for (const e of Array.from(n.values()))
    if (Object.keys(e).length === 1)
      return true;
  return false;
}
var so;
(function(n) {
  function e(t) {
    return typeof t == "string";
  }
  n.is = e;
})(so || (so = {}));
var xs;
(function(n) {
  function e(t) {
    return typeof t == "string";
  }
  n.is = e;
})(xs || (xs = {}));
var ao;
(function(n) {
  n.MIN_VALUE = -2147483648, n.MAX_VALUE = 2147483647;
  function e(t) {
    return typeof t == "number" && n.MIN_VALUE <= t && t <= n.MAX_VALUE;
  }
  n.is = e;
})(ao || (ao = {}));
var ri;
(function(n) {
  n.MIN_VALUE = 0, n.MAX_VALUE = 2147483647;
  function e(t) {
    return typeof t == "number" && n.MIN_VALUE <= t && t <= n.MAX_VALUE;
  }
  n.is = e;
})(ri || (ri = {}));
var P;
(function(n) {
  function e(r, i) {
    return r === Number.MAX_VALUE && (r = ri.MAX_VALUE), i === Number.MAX_VALUE && (i = ri.MAX_VALUE), { line: r, character: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && p.uinteger(i.line) && p.uinteger(i.character);
  }
  n.is = t;
})(P || (P = {}));
var O;
(function(n) {
  function e(r, i, s, a2) {
    if (p.uinteger(r) && p.uinteger(i) && p.uinteger(s) && p.uinteger(a2))
      return { start: P.create(r, i), end: P.create(s, a2) };
    if (P.is(r) && P.is(i))
      return { start: r, end: i };
    throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${a2}]`);
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && P.is(i.start) && P.is(i.end);
  }
  n.is = t;
})(O || (O = {}));
var ii;
(function(n) {
  function e(r, i) {
    return { uri: r, range: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && O.is(i.range) && (p.string(i.uri) || p.undefined(i.uri));
  }
  n.is = t;
})(ii || (ii = {}));
var oo;
(function(n) {
  function e(r, i, s, a2) {
    return { targetUri: r, targetRange: i, targetSelectionRange: s, originSelectionRange: a2 };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && O.is(i.targetRange) && p.string(i.targetUri) && O.is(i.targetSelectionRange) && (O.is(i.originSelectionRange) || p.undefined(i.originSelectionRange));
  }
  n.is = t;
})(oo || (oo = {}));
var Ss;
(function(n) {
  function e(r, i, s, a2) {
    return {
      red: r,
      green: i,
      blue: s,
      alpha: a2
    };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.numberRange(i.red, 0, 1) && p.numberRange(i.green, 0, 1) && p.numberRange(i.blue, 0, 1) && p.numberRange(i.alpha, 0, 1);
  }
  n.is = t;
})(Ss || (Ss = {}));
var lo;
(function(n) {
  function e(r, i) {
    return {
      range: r,
      color: i
    };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && O.is(i.range) && Ss.is(i.color);
  }
  n.is = t;
})(lo || (lo = {}));
var uo;
(function(n) {
  function e(r, i, s) {
    return {
      label: r,
      textEdit: i,
      additionalTextEdits: s
    };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.string(i.label) && (p.undefined(i.textEdit) || Mt.is(i)) && (p.undefined(i.additionalTextEdits) || p.typedArray(i.additionalTextEdits, Mt.is));
  }
  n.is = t;
})(uo || (uo = {}));
var co;
(function(n) {
  n.Comment = "comment", n.Imports = "imports", n.Region = "region";
})(co || (co = {}));
var fo;
(function(n) {
  function e(r, i, s, a2, o, l) {
    const u = {
      startLine: r,
      endLine: i
    };
    return p.defined(s) && (u.startCharacter = s), p.defined(a2) && (u.endCharacter = a2), p.defined(o) && (u.kind = o), p.defined(l) && (u.collapsedText = l), u;
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.uinteger(i.startLine) && p.uinteger(i.startLine) && (p.undefined(i.startCharacter) || p.uinteger(i.startCharacter)) && (p.undefined(i.endCharacter) || p.uinteger(i.endCharacter)) && (p.undefined(i.kind) || p.string(i.kind));
  }
  n.is = t;
})(fo || (fo = {}));
var Is;
(function(n) {
  function e(r, i) {
    return {
      location: r,
      message: i
    };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && ii.is(i.location) && p.string(i.message);
  }
  n.is = t;
})(Is || (Is = {}));
var ho;
(function(n) {
  n.Error = 1, n.Warning = 2, n.Information = 3, n.Hint = 4;
})(ho || (ho = {}));
var po;
(function(n) {
  n.Unnecessary = 1, n.Deprecated = 2;
})(po || (po = {}));
var mo;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(r) && p.string(r.href);
  }
  n.is = e;
})(mo || (mo = {}));
var si;
(function(n) {
  function e(r, i, s, a2, o, l) {
    let u = { range: r, message: i };
    return p.defined(s) && (u.severity = s), p.defined(a2) && (u.code = a2), p.defined(o) && (u.source = o), p.defined(l) && (u.relatedInformation = l), u;
  }
  n.create = e;
  function t(r) {
    var i;
    let s = r;
    return p.defined(s) && O.is(s.range) && p.string(s.message) && (p.number(s.severity) || p.undefined(s.severity)) && (p.integer(s.code) || p.string(s.code) || p.undefined(s.code)) && (p.undefined(s.codeDescription) || p.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (p.string(s.source) || p.undefined(s.source)) && (p.undefined(s.relatedInformation) || p.typedArray(s.relatedInformation, Is.is));
  }
  n.is = t;
})(si || (si = {}));
var Pt;
(function(n) {
  function e(r, i, ...s) {
    let a2 = { title: r, command: i };
    return p.defined(s) && s.length > 0 && (a2.arguments = s), a2;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.title) && p.string(i.command);
  }
  n.is = t;
})(Pt || (Pt = {}));
var Mt;
(function(n) {
  function e(s, a2) {
    return { range: s, newText: a2 };
  }
  n.replace = e;
  function t(s, a2) {
    return { range: { start: s, end: s }, newText: a2 };
  }
  n.insert = t;
  function r(s) {
    return { range: s, newText: "" };
  }
  n.del = r;
  function i(s) {
    const a2 = s;
    return p.objectLiteral(a2) && p.string(a2.newText) && O.is(a2.range);
  }
  n.is = i;
})(Mt || (Mt = {}));
var Cs;
(function(n) {
  function e(r, i, s) {
    const a2 = { label: r };
    return i !== void 0 && (a2.needsConfirmation = i), s !== void 0 && (a2.description = s), a2;
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && p.string(i.label) && (p.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (p.string(i.description) || i.description === void 0);
  }
  n.is = t;
})(Cs || (Cs = {}));
var Dt;
(function(n) {
  function e(t) {
    const r = t;
    return p.string(r);
  }
  n.is = e;
})(Dt || (Dt = {}));
var go;
(function(n) {
  function e(s, a2, o) {
    return { range: s, newText: a2, annotationId: o };
  }
  n.replace = e;
  function t(s, a2, o) {
    return { range: { start: s, end: s }, newText: a2, annotationId: o };
  }
  n.insert = t;
  function r(s, a2) {
    return { range: s, newText: "", annotationId: a2 };
  }
  n.del = r;
  function i(s) {
    const a2 = s;
    return Mt.is(a2) && (Cs.is(a2.annotationId) || Dt.is(a2.annotationId));
  }
  n.is = i;
})(go || (go = {}));
var Ns;
(function(n) {
  function e(r, i) {
    return { textDocument: r, edits: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && Os.is(i.textDocument) && Array.isArray(i.edits);
  }
  n.is = t;
})(Ns || (Ns = {}));
var ws;
(function(n) {
  function e(r, i, s) {
    let a2 = {
      kind: "create",
      uri: r
    };
    return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (a2.options = i), s !== void 0 && (a2.annotationId = s), a2;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && i.kind === "create" && p.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || p.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || p.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Dt.is(i.annotationId));
  }
  n.is = t;
})(ws || (ws = {}));
var Ls;
(function(n) {
  function e(r, i, s, a2) {
    let o = {
      kind: "rename",
      oldUri: r,
      newUri: i
    };
    return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (o.options = s), a2 !== void 0 && (o.annotationId = a2), o;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && i.kind === "rename" && p.string(i.oldUri) && p.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || p.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || p.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Dt.is(i.annotationId));
  }
  n.is = t;
})(Ls || (Ls = {}));
var _s;
(function(n) {
  function e(r, i, s) {
    let a2 = {
      kind: "delete",
      uri: r
    };
    return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (a2.options = i), s !== void 0 && (a2.annotationId = s), a2;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && i.kind === "delete" && p.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || p.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || p.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || Dt.is(i.annotationId));
  }
  n.is = t;
})(_s || (_s = {}));
var bs;
(function(n) {
  function e(t) {
    let r = t;
    return r && (r.changes !== void 0 || r.documentChanges !== void 0) && (r.documentChanges === void 0 || r.documentChanges.every((i) => p.string(i.kind) ? ws.is(i) || Ls.is(i) || _s.is(i) : Ns.is(i)));
  }
  n.is = e;
})(bs || (bs = {}));
var yo;
(function(n) {
  function e(r) {
    return { uri: r };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri);
  }
  n.is = t;
})(yo || (yo = {}));
var To;
(function(n) {
  function e(r, i) {
    return { uri: r, version: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri) && p.integer(i.version);
  }
  n.is = t;
})(To || (To = {}));
var Os;
(function(n) {
  function e(r, i) {
    return { uri: r, version: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri) && (i.version === null || p.integer(i.version));
  }
  n.is = t;
})(Os || (Os = {}));
var Ro;
(function(n) {
  function e(r, i, s, a2) {
    return { uri: r, languageId: i, version: s, text: a2 };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.string(i.uri) && p.string(i.languageId) && p.integer(i.version) && p.string(i.text);
  }
  n.is = t;
})(Ro || (Ro = {}));
var Ps;
(function(n) {
  n.PlainText = "plaintext", n.Markdown = "markdown";
  function e(t) {
    const r = t;
    return r === n.PlainText || r === n.Markdown;
  }
  n.is = e;
})(Ps || (Ps = {}));
var bn;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(t) && Ps.is(r.kind) && p.string(r.value);
  }
  n.is = e;
})(bn || (bn = {}));
var vo;
(function(n) {
  n.Text = 1, n.Method = 2, n.Function = 3, n.Constructor = 4, n.Field = 5, n.Variable = 6, n.Class = 7, n.Interface = 8, n.Module = 9, n.Property = 10, n.Unit = 11, n.Value = 12, n.Enum = 13, n.Keyword = 14, n.Snippet = 15, n.Color = 16, n.File = 17, n.Reference = 18, n.Folder = 19, n.EnumMember = 20, n.Constant = 21, n.Struct = 22, n.Event = 23, n.Operator = 24, n.TypeParameter = 25;
})(vo || (vo = {}));
var Ao;
(function(n) {
  n.PlainText = 1, n.Snippet = 2;
})(Ao || (Ao = {}));
var Eo;
(function(n) {
  n.Deprecated = 1;
})(Eo || (Eo = {}));
var $o;
(function(n) {
  function e(r, i, s) {
    return { newText: r, insert: i, replace: s };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i && p.string(i.newText) && O.is(i.insert) && O.is(i.replace);
  }
  n.is = t;
})($o || ($o = {}));
var ko;
(function(n) {
  n.asIs = 1, n.adjustIndentation = 2;
})(ko || (ko = {}));
var xo;
(function(n) {
  function e(t) {
    const r = t;
    return r && (p.string(r.detail) || r.detail === void 0) && (p.string(r.description) || r.description === void 0);
  }
  n.is = e;
})(xo || (xo = {}));
var So;
(function(n) {
  function e(t) {
    return { label: t };
  }
  n.create = e;
})(So || (So = {}));
var Io;
(function(n) {
  function e(t, r) {
    return { items: t || [], isIncomplete: !!r };
  }
  n.create = e;
})(Io || (Io = {}));
var ai;
(function(n) {
  function e(r) {
    return r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  n.fromPlainText = e;
  function t(r) {
    const i = r;
    return p.string(i) || p.objectLiteral(i) && p.string(i.language) && p.string(i.value);
  }
  n.is = t;
})(ai || (ai = {}));
var Co;
(function(n) {
  function e(t) {
    let r = t;
    return !!r && p.objectLiteral(r) && (bn.is(r.contents) || ai.is(r.contents) || p.typedArray(r.contents, ai.is)) && (t.range === void 0 || O.is(t.range));
  }
  n.is = e;
})(Co || (Co = {}));
var No;
(function(n) {
  function e(t, r) {
    return r ? { label: t, documentation: r } : { label: t };
  }
  n.create = e;
})(No || (No = {}));
var wo;
(function(n) {
  function e(t, r, ...i) {
    let s = { label: t };
    return p.defined(r) && (s.documentation = r), p.defined(i) ? s.parameters = i : s.parameters = [], s;
  }
  n.create = e;
})(wo || (wo = {}));
var Lo;
(function(n) {
  n.Text = 1, n.Read = 2, n.Write = 3;
})(Lo || (Lo = {}));
var _o;
(function(n) {
  function e(t, r) {
    let i = { range: t };
    return p.number(r) && (i.kind = r), i;
  }
  n.create = e;
})(_o || (_o = {}));
var bo;
(function(n) {
  n.File = 1, n.Module = 2, n.Namespace = 3, n.Package = 4, n.Class = 5, n.Method = 6, n.Property = 7, n.Field = 8, n.Constructor = 9, n.Enum = 10, n.Interface = 11, n.Function = 12, n.Variable = 13, n.Constant = 14, n.String = 15, n.Number = 16, n.Boolean = 17, n.Array = 18, n.Object = 19, n.Key = 20, n.Null = 21, n.EnumMember = 22, n.Struct = 23, n.Event = 24, n.Operator = 25, n.TypeParameter = 26;
})(bo || (bo = {}));
var Oo;
(function(n) {
  n.Deprecated = 1;
})(Oo || (Oo = {}));
var Po;
(function(n) {
  function e(t, r, i, s, a2) {
    let o = {
      name: t,
      kind: r,
      location: { uri: s, range: i }
    };
    return a2 && (o.containerName = a2), o;
  }
  n.create = e;
})(Po || (Po = {}));
var Mo;
(function(n) {
  function e(t, r, i, s) {
    return s !== void 0 ? { name: t, kind: r, location: { uri: i, range: s } } : { name: t, kind: r, location: { uri: i } };
  }
  n.create = e;
})(Mo || (Mo = {}));
var Do;
(function(n) {
  function e(r, i, s, a2, o, l) {
    let u = {
      name: r,
      detail: i,
      kind: s,
      range: a2,
      selectionRange: o
    };
    return l !== void 0 && (u.children = l), u;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && p.string(i.name) && p.number(i.kind) && O.is(i.range) && O.is(i.selectionRange) && (i.detail === void 0 || p.string(i.detail)) && (i.deprecated === void 0 || p.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
  }
  n.is = t;
})(Do || (Do = {}));
var Fo;
(function(n) {
  n.Empty = "", n.QuickFix = "quickfix", n.Refactor = "refactor", n.RefactorExtract = "refactor.extract", n.RefactorInline = "refactor.inline", n.RefactorRewrite = "refactor.rewrite", n.Source = "source", n.SourceOrganizeImports = "source.organizeImports", n.SourceFixAll = "source.fixAll";
})(Fo || (Fo = {}));
var oi;
(function(n) {
  n.Invoked = 1, n.Automatic = 2;
})(oi || (oi = {}));
var Go;
(function(n) {
  function e(r, i, s) {
    let a2 = { diagnostics: r };
    return i != null && (a2.only = i), s != null && (a2.triggerKind = s), a2;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.typedArray(i.diagnostics, si.is) && (i.only === void 0 || p.typedArray(i.only, p.string)) && (i.triggerKind === void 0 || i.triggerKind === oi.Invoked || i.triggerKind === oi.Automatic);
  }
  n.is = t;
})(Go || (Go = {}));
var Uo;
(function(n) {
  function e(r, i, s) {
    let a2 = { title: r }, o = true;
    return typeof i == "string" ? (o = false, a2.kind = i) : Pt.is(i) ? a2.command = i : a2.edit = i, o && s !== void 0 && (a2.kind = s), a2;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return i && p.string(i.title) && (i.diagnostics === void 0 || p.typedArray(i.diagnostics, si.is)) && (i.kind === void 0 || p.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || Pt.is(i.command)) && (i.isPreferred === void 0 || p.boolean(i.isPreferred)) && (i.edit === void 0 || bs.is(i.edit));
  }
  n.is = t;
})(Uo || (Uo = {}));
var Bo;
(function(n) {
  function e(r, i) {
    let s = { range: r };
    return p.defined(i) && (s.data = i), s;
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && O.is(i.range) && (p.undefined(i.command) || Pt.is(i.command));
  }
  n.is = t;
})(Bo || (Bo = {}));
var Vo;
(function(n) {
  function e(r, i) {
    return { tabSize: r, insertSpaces: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && p.uinteger(i.tabSize) && p.boolean(i.insertSpaces);
  }
  n.is = t;
})(Vo || (Vo = {}));
var Ko;
(function(n) {
  function e(r, i, s) {
    return { range: r, target: i, data: s };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.defined(i) && O.is(i.range) && (p.undefined(i.target) || p.string(i.target));
  }
  n.is = t;
})(Ko || (Ko = {}));
var Wo;
(function(n) {
  function e(r, i) {
    return { range: r, parent: i };
  }
  n.create = e;
  function t(r) {
    let i = r;
    return p.objectLiteral(i) && O.is(i.range) && (i.parent === void 0 || n.is(i.parent));
  }
  n.is = t;
})(Wo || (Wo = {}));
var Ho;
(function(n) {
  n.namespace = "namespace", n.type = "type", n.class = "class", n.enum = "enum", n.interface = "interface", n.struct = "struct", n.typeParameter = "typeParameter", n.parameter = "parameter", n.variable = "variable", n.property = "property", n.enumMember = "enumMember", n.event = "event", n.function = "function", n.method = "method", n.macro = "macro", n.keyword = "keyword", n.modifier = "modifier", n.comment = "comment", n.string = "string", n.number = "number", n.regexp = "regexp", n.operator = "operator", n.decorator = "decorator";
})(Ho || (Ho = {}));
var jo;
(function(n) {
  n.declaration = "declaration", n.definition = "definition", n.readonly = "readonly", n.static = "static", n.deprecated = "deprecated", n.abstract = "abstract", n.async = "async", n.modification = "modification", n.documentation = "documentation", n.defaultLibrary = "defaultLibrary";
})(jo || (jo = {}));
var zo;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(r) && (r.resultId === void 0 || typeof r.resultId == "string") && Array.isArray(r.data) && (r.data.length === 0 || typeof r.data[0] == "number");
  }
  n.is = e;
})(zo || (zo = {}));
var qo;
(function(n) {
  function e(r, i) {
    return { range: r, text: i };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i != null && O.is(i.range) && p.string(i.text);
  }
  n.is = t;
})(qo || (qo = {}));
var Yo;
(function(n) {
  function e(r, i, s) {
    return { range: r, variableName: i, caseSensitiveLookup: s };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i != null && O.is(i.range) && p.boolean(i.caseSensitiveLookup) && (p.string(i.variableName) || i.variableName === void 0);
  }
  n.is = t;
})(Yo || (Yo = {}));
var Xo;
(function(n) {
  function e(r, i) {
    return { range: r, expression: i };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return i != null && O.is(i.range) && (p.string(i.expression) || i.expression === void 0);
  }
  n.is = t;
})(Xo || (Xo = {}));
var Jo;
(function(n) {
  function e(r, i) {
    return { frameId: r, stoppedLocation: i };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.defined(i) && O.is(r.stoppedLocation);
  }
  n.is = t;
})(Jo || (Jo = {}));
var Ms;
(function(n) {
  n.Type = 1, n.Parameter = 2;
  function e(t) {
    return t === 1 || t === 2;
  }
  n.is = e;
})(Ms || (Ms = {}));
var Ds;
(function(n) {
  function e(r) {
    return { value: r };
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && (i.tooltip === void 0 || p.string(i.tooltip) || bn.is(i.tooltip)) && (i.location === void 0 || ii.is(i.location)) && (i.command === void 0 || Pt.is(i.command));
  }
  n.is = t;
})(Ds || (Ds = {}));
var Qo;
(function(n) {
  function e(r, i, s) {
    const a2 = { position: r, label: i };
    return s !== void 0 && (a2.kind = s), a2;
  }
  n.create = e;
  function t(r) {
    const i = r;
    return p.objectLiteral(i) && P.is(i.position) && (p.string(i.label) || p.typedArray(i.label, Ds.is)) && (i.kind === void 0 || Ms.is(i.kind)) && i.textEdits === void 0 || p.typedArray(i.textEdits, Mt.is) && (i.tooltip === void 0 || p.string(i.tooltip) || bn.is(i.tooltip)) && (i.paddingLeft === void 0 || p.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || p.boolean(i.paddingRight));
  }
  n.is = t;
})(Qo || (Qo = {}));
var Zo;
(function(n) {
  function e(t) {
    return { kind: "snippet", value: t };
  }
  n.createSnippet = e;
})(Zo || (Zo = {}));
var el;
(function(n) {
  function e(t, r, i, s) {
    return { insertText: t, filterText: r, range: i, command: s };
  }
  n.create = e;
})(el || (el = {}));
var tl;
(function(n) {
  function e(t) {
    return { items: t };
  }
  n.create = e;
})(tl || (tl = {}));
var nl;
(function(n) {
  n.Invoked = 0, n.Automatic = 1;
})(nl || (nl = {}));
var rl;
(function(n) {
  function e(t, r) {
    return { range: t, text: r };
  }
  n.create = e;
})(rl || (rl = {}));
var il;
(function(n) {
  function e(t, r) {
    return { triggerKind: t, selectedCompletionInfo: r };
  }
  n.create = e;
})(il || (il = {}));
var sl;
(function(n) {
  function e(t) {
    const r = t;
    return p.objectLiteral(r) && xs.is(r.uri) && p.string(r.name);
  }
  n.is = e;
})(sl || (sl = {}));
var al;
(function(n) {
  function e(s, a2, o, l) {
    return new sm(s, a2, o, l);
  }
  n.create = e;
  function t(s) {
    let a2 = s;
    return !!(p.defined(a2) && p.string(a2.uri) && (p.undefined(a2.languageId) || p.string(a2.languageId)) && p.uinteger(a2.lineCount) && p.func(a2.getText) && p.func(a2.positionAt) && p.func(a2.offsetAt));
  }
  n.is = t;
  function r(s, a2) {
    let o = s.getText(), l = i(a2, (c, d) => {
      let h = c.range.start.line - d.range.start.line;
      return h === 0 ? c.range.start.character - d.range.start.character : h;
    }), u = o.length;
    for (let c = l.length - 1; c >= 0; c--) {
      let d = l[c], h = s.offsetAt(d.range.start), f = s.offsetAt(d.range.end);
      if (f <= u)
        o = o.substring(0, h) + d.newText + o.substring(f, o.length);
      else
        throw new Error("Overlapping edit");
      u = h;
    }
    return o;
  }
  n.applyEdits = r;
  function i(s, a2) {
    if (s.length <= 1)
      return s;
    const o = s.length / 2 | 0, l = s.slice(0, o), u = s.slice(o);
    i(l, a2), i(u, a2);
    let c = 0, d = 0, h = 0;
    for (; c < l.length && d < u.length; )
      a2(l[c], u[d]) <= 0 ? s[h++] = l[c++] : s[h++] = u[d++];
    for (; c < l.length; )
      s[h++] = l[c++];
    for (; d < u.length; )
      s[h++] = u[d++];
    return s;
  }
})(al || (al = {}));
let sm = class {
  constructor(e, t, r, i) {
    this._uri = e, this._languageId = t, this._version = r, this._content = i, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      let t = this.offsetAt(e.start), r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  }
  update(e, t) {
    this._content = e.text, this._version = t, this._lineOffsets = void 0;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      let e = [], t = this._content, r = true;
      for (let i = 0; i < t.length; i++) {
        r && (e.push(i), r = false);
        let s = t.charAt(i);
        r = s === "\r" || s === `
`, s === "\r" && i + 1 < t.length && t.charAt(i + 1) === `
` && i++;
      }
      r && t.length > 0 && e.push(t.length), this._lineOffsets = e;
    }
    return this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    let t = this.getLineOffsets(), r = 0, i = t.length;
    if (i === 0)
      return P.create(0, e);
    for (; r < i; ) {
      let a2 = Math.floor((r + i) / 2);
      t[a2] > e ? i = a2 : r = a2 + 1;
    }
    let s = r - 1;
    return P.create(s, e - t[s]);
  }
  offsetAt(e) {
    let t = this.getLineOffsets();
    if (e.line >= t.length)
      return this._content.length;
    if (e.line < 0)
      return 0;
    let r = t[e.line], i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(r + e.character, i), r);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
};
var p;
(function(n) {
  const e = Object.prototype.toString;
  function t(f) {
    return typeof f < "u";
  }
  n.defined = t;
  function r(f) {
    return typeof f > "u";
  }
  n.undefined = r;
  function i(f) {
    return f === true || f === false;
  }
  n.boolean = i;
  function s(f) {
    return e.call(f) === "[object String]";
  }
  n.string = s;
  function a2(f) {
    return e.call(f) === "[object Number]";
  }
  n.number = a2;
  function o(f, m, g) {
    return e.call(f) === "[object Number]" && m <= f && f <= g;
  }
  n.numberRange = o;
  function l(f) {
    return e.call(f) === "[object Number]" && -2147483648 <= f && f <= 2147483647;
  }
  n.integer = l;
  function u(f) {
    return e.call(f) === "[object Number]" && 0 <= f && f <= 2147483647;
  }
  n.uinteger = u;
  function c(f) {
    return e.call(f) === "[object Function]";
  }
  n.func = c;
  function d(f) {
    return f !== null && typeof f == "object";
  }
  n.objectLiteral = d;
  function h(f, m) {
    return Array.isArray(f) && f.every(m);
  }
  n.typedArray = h;
})(p || (p = {}));
class am {
  constructor() {
    this.nodeStack = [];
  }
  get current() {
    var e;
    return (e = this.nodeStack[this.nodeStack.length - 1]) !== null && e !== void 0 ? e : this.rootNode;
  }
  buildRootNode(e) {
    return this.rootNode = new Qu(e), this.rootNode.root = this.rootNode, this.nodeStack = [this.rootNode], this.rootNode;
  }
  buildCompositeNode(e) {
    const t = new ma();
    return t.grammarSource = e, t.root = this.rootNode, this.current.content.push(t), this.nodeStack.push(t), t;
  }
  buildLeafNode(e, t) {
    const r = new Fs(e.startOffset, e.image.length, cs(e), e.tokenType, !t);
    return r.grammarSource = t, r.root = this.rootNode, this.current.content.push(r), r;
  }
  removeNode(e) {
    const t = e.container;
    if (t) {
      const r = t.content.indexOf(e);
      r >= 0 && t.content.splice(r, 1);
    }
  }
  addHiddenNodes(e) {
    const t = [];
    for (const s of e) {
      const a2 = new Fs(s.startOffset, s.image.length, cs(s), s.tokenType, true);
      a2.root = this.rootNode, t.push(a2);
    }
    let r = this.current, i = false;
    if (r.content.length > 0) {
      r.content.push(...t);
      return;
    }
    for (; r.container; ) {
      const s = r.container.content.indexOf(r);
      if (s > 0) {
        r.container.content.splice(s, 0, ...t), i = true;
        break;
      }
      r = r.container;
    }
    i || this.rootNode.content.unshift(...t);
  }
  construct(e) {
    const t = this.current;
    typeof e.$type == "string" && (this.current.astNode = e), e.$cstNode = t;
    const r = this.nodeStack.pop();
    (r == null ? void 0 : r.content.length) === 0 && this.removeNode(r);
  }
}
class Ju {
  /** @deprecated use `container` instead. */
  get parent() {
    return this.container;
  }
  /** @deprecated use `grammarSource` instead. */
  get feature() {
    return this.grammarSource;
  }
  get hidden() {
    return false;
  }
  get astNode() {
    var e, t;
    const r = typeof ((e = this._astNode) === null || e === void 0 ? void 0 : e.$type) == "string" ? this._astNode : (t = this.container) === null || t === void 0 ? void 0 : t.astNode;
    if (!r)
      throw new Error("This node has no associated AST element");
    return r;
  }
  set astNode(e) {
    this._astNode = e;
  }
  /** @deprecated use `astNode` instead. */
  get element() {
    return this.astNode;
  }
  get text() {
    return this.root.fullText.substring(this.offset, this.end);
  }
}
class Fs extends Ju {
  get offset() {
    return this._offset;
  }
  get length() {
    return this._length;
  }
  get end() {
    return this._offset + this._length;
  }
  get hidden() {
    return this._hidden;
  }
  get tokenType() {
    return this._tokenType;
  }
  get range() {
    return this._range;
  }
  constructor(e, t, r, i, s = false) {
    super(), this._hidden = s, this._offset = e, this._tokenType = i, this._length = t, this._range = r;
  }
}
class ma extends Ju {
  constructor() {
    super(...arguments), this.content = new ga(this);
  }
  /** @deprecated use `content` instead. */
  get children() {
    return this.content;
  }
  get offset() {
    var e, t;
    return (t = (e = this.firstNonHiddenNode) === null || e === void 0 ? void 0 : e.offset) !== null && t !== void 0 ? t : 0;
  }
  get length() {
    return this.end - this.offset;
  }
  get end() {
    var e, t;
    return (t = (e = this.lastNonHiddenNode) === null || e === void 0 ? void 0 : e.end) !== null && t !== void 0 ? t : 0;
  }
  get range() {
    const e = this.firstNonHiddenNode, t = this.lastNonHiddenNode;
    if (e && t) {
      if (this._rangeCache === void 0) {
        const { range: r } = e, { range: i } = t;
        this._rangeCache = { start: r.start, end: i.end.line < r.start.line ? r.start : i.end };
      }
      return this._rangeCache;
    } else
      return { start: P.create(0, 0), end: P.create(0, 0) };
  }
  get firstNonHiddenNode() {
    for (const e of this.content)
      if (!e.hidden)
        return e;
    return this.content[0];
  }
  get lastNonHiddenNode() {
    for (let e = this.content.length - 1; e >= 0; e--) {
      const t = this.content[e];
      if (!t.hidden)
        return t;
    }
    return this.content[this.content.length - 1];
  }
}
class ga extends Array {
  constructor(e) {
    super(), this.parent = e, Object.setPrototypeOf(this, ga.prototype);
  }
  push(...e) {
    return this.addParents(e), super.push(...e);
  }
  unshift(...e) {
    return this.addParents(e), super.unshift(...e);
  }
  splice(e, t, ...r) {
    return this.addParents(r), super.splice(e, t, ...r);
  }
  addParents(e) {
    for (const t of e)
      t.container = this.parent;
  }
}
class Qu extends ma {
  get text() {
    return this._text.substring(this.offset, this.end);
  }
  get fullText() {
    return this._text;
  }
  constructor(e) {
    super(), this._text = "", this._text = e ?? "";
  }
}
const Gs = Symbol("Datatype");
function zi(n) {
  return n.$type === Gs;
}
const ol = "​", Zu = (n) => n.endsWith(ol) ? n : n + ol;
class ec {
  constructor(e) {
    this._unorderedGroups = /* @__PURE__ */ new Map(), this.allRules = /* @__PURE__ */ new Map(), this.lexer = e.parser.Lexer;
    const t = this.lexer.definition, r = e.LanguageMetaData.mode === "production";
    this.wrapper = new dm(t, Object.assign(Object.assign({}, e.parser.ParserConfig), { skipValidations: r, errorMessageProvider: e.parser.ParserErrorMessageProvider }));
  }
  alternatives(e, t) {
    this.wrapper.wrapOr(e, t);
  }
  optional(e, t) {
    this.wrapper.wrapOption(e, t);
  }
  many(e, t) {
    this.wrapper.wrapMany(e, t);
  }
  atLeastOne(e, t) {
    this.wrapper.wrapAtLeastOne(e, t);
  }
  getRule(e) {
    return this.allRules.get(e);
  }
  isRecording() {
    return this.wrapper.IS_RECORDING;
  }
  get unorderedGroups() {
    return this._unorderedGroups;
  }
  getRuleStack() {
    return this.wrapper.RULE_STACK;
  }
  finalize() {
    this.wrapper.wrapSelfAnalysis();
  }
}
class om extends ec {
  get current() {
    return this.stack[this.stack.length - 1];
  }
  constructor(e) {
    super(e), this.nodeBuilder = new am(), this.stack = [], this.assignmentMap = /* @__PURE__ */ new Map(), this.linker = e.references.Linker, this.converter = e.parser.ValueConverter, this.astReflection = e.shared.AstReflection;
  }
  rule(e, t) {
    const r = this.computeRuleType(e), i = this.wrapper.DEFINE_RULE(Zu(e.name), this.startImplementation(r, t).bind(this));
    return this.allRules.set(e.name, i), e.entry && (this.mainRule = i), i;
  }
  computeRuleType(e) {
    if (!e.fragment) {
      if (su(e))
        return Gs;
      {
        const t = ta(e);
        return t ?? e.name;
      }
    }
  }
  parse(e, t = {}) {
    this.nodeBuilder.buildRootNode(e);
    const r = this.lexerResult = this.lexer.tokenize(e);
    this.wrapper.input = r.tokens;
    const i = t.rule ? this.allRules.get(t.rule) : this.mainRule;
    if (!i)
      throw new Error(t.rule ? `No rule found with name '${t.rule}'` : "No main rule available.");
    const s = i.call(this.wrapper, {});
    return this.nodeBuilder.addHiddenNodes(r.hidden), this.unorderedGroups.clear(), this.lexerResult = void 0, {
      value: s,
      lexerErrors: r.errors,
      lexerReport: r.report,
      parserErrors: this.wrapper.errors
    };
  }
  startImplementation(e, t) {
    return (r) => {
      const i = !this.isRecording() && e !== void 0;
      if (i) {
        const a2 = { $type: e };
        this.stack.push(a2), e === Gs && (a2.value = "");
      }
      let s;
      try {
        s = t(r);
      } catch {
        s = void 0;
      }
      return s === void 0 && i && (s = this.construct()), s;
    };
  }
  extractHiddenTokens(e) {
    const t = this.lexerResult.hidden;
    if (!t.length)
      return [];
    const r = e.startOffset;
    for (let i = 0; i < t.length; i++)
      if (t[i].startOffset > r)
        return t.splice(0, i);
    return t.splice(0, t.length);
  }
  consume(e, t, r) {
    const i = this.wrapper.wrapConsume(e, t);
    if (!this.isRecording() && this.isValidToken(i)) {
      const s = this.extractHiddenTokens(i);
      this.nodeBuilder.addHiddenNodes(s);
      const a2 = this.nodeBuilder.buildLeafNode(i, r), { assignment: o, isCrossRef: l } = this.getAssignment(r), u = this.current;
      if (o) {
        const c = mt(r) ? i.image : this.converter.convert(i.image, a2);
        this.assign(o.operator, o.feature, c, a2, l);
      } else if (zi(u)) {
        let c = i.image;
        mt(r) || (c = this.converter.convert(c, a2).toString()), u.value += c;
      }
    }
  }
  /**
   * Most consumed parser tokens are valid. However there are two cases in which they are not valid:
   *
   * 1. They were inserted during error recovery by the parser. These tokens don't really exist and should not be further processed
   * 2. They contain invalid token ranges. This might include the special EOF token, or other tokens produced by invalid token builders.
   */
  isValidToken(e) {
    return !e.isInsertedInRecovery && !isNaN(e.startOffset) && typeof e.endOffset == "number" && !isNaN(e.endOffset);
  }
  subrule(e, t, r, i, s) {
    let a2;
    !this.isRecording() && !r && (a2 = this.nodeBuilder.buildCompositeNode(i));
    const o = this.wrapper.wrapSubrule(e, t, s);
    !this.isRecording() && a2 && a2.length > 0 && this.performSubruleAssignment(o, i, a2);
  }
  performSubruleAssignment(e, t, r) {
    const { assignment: i, isCrossRef: s } = this.getAssignment(t);
    if (i)
      this.assign(i.operator, i.feature, e, r, s);
    else if (!i) {
      const a2 = this.current;
      if (zi(a2))
        a2.value += e.toString();
      else if (typeof e == "object" && e) {
        const l = this.assignWithoutOverride(e, a2);
        this.stack.pop(), this.stack.push(l);
      }
    }
  }
  action(e, t) {
    if (!this.isRecording()) {
      let r = this.current;
      if (t.feature && t.operator) {
        r = this.construct(), this.nodeBuilder.removeNode(r.$cstNode), this.nodeBuilder.buildCompositeNode(t).content.push(r.$cstNode);
        const s = { $type: e };
        this.stack.push(s), this.assign(t.operator, t.feature, r, r.$cstNode, false);
      } else
        r.$type = e;
    }
  }
  construct() {
    if (this.isRecording())
      return;
    const e = this.current;
    return Ud(e), this.nodeBuilder.construct(e), this.stack.pop(), zi(e) ? this.converter.convert(e.value, e.$cstNode) : (Bd(this.astReflection, e), e);
  }
  getAssignment(e) {
    if (!this.assignmentMap.has(e)) {
      const t = Ti(e, pt);
      this.assignmentMap.set(e, {
        assignment: t,
        isCrossRef: t ? Js(t.terminal) : false
      });
    }
    return this.assignmentMap.get(e);
  }
  assign(e, t, r, i, s) {
    const a2 = this.current;
    let o;
    switch (s && typeof r == "string" ? o = this.linker.buildReference(a2, t, i, r) : o = r, e) {
      case "=": {
        a2[t] = o;
        break;
      }
      case "?=": {
        a2[t] = true;
        break;
      }
      case "+=":
        Array.isArray(a2[t]) || (a2[t] = []), a2[t].push(o);
    }
  }
  assignWithoutOverride(e, t) {
    for (const [i, s] of Object.entries(t)) {
      const a2 = e[i];
      a2 === void 0 ? e[i] = s : Array.isArray(a2) && Array.isArray(s) && (s.push(...a2), e[i] = s);
    }
    const r = e.$cstNode;
    return r && (r.astNode = void 0, e.$cstNode = void 0), e;
  }
  get definitionErrors() {
    return this.wrapper.definitionErrors;
  }
}
class lm {
  buildMismatchTokenMessage(e) {
    return Ct.buildMismatchTokenMessage(e);
  }
  buildNotAllInputParsedMessage(e) {
    return Ct.buildNotAllInputParsedMessage(e);
  }
  buildNoViableAltMessage(e) {
    return Ct.buildNoViableAltMessage(e);
  }
  buildEarlyExitMessage(e) {
    return Ct.buildEarlyExitMessage(e);
  }
}
class tc extends lm {
  buildMismatchTokenMessage({ expected: e, actual: t }) {
    return `Expecting ${e.LABEL ? "`" + e.LABEL + "`" : e.name.endsWith(":KW") ? `keyword '${e.name.substring(0, e.name.length - 3)}'` : `token of type '${e.name}'`} but found \`${t.image}\`.`;
  }
  buildNotAllInputParsedMessage({ firstRedundant: e }) {
    return `Expecting end of file but found \`${e.image}\`.`;
  }
}
class um extends ec {
  constructor() {
    super(...arguments), this.tokens = [], this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  action() {
  }
  construct() {
  }
  parse(e) {
    this.resetState();
    const t = this.lexer.tokenize(e, { mode: "partial" });
    return this.tokens = t.tokens, this.wrapper.input = [...this.tokens], this.mainRule.call(this.wrapper, {}), this.unorderedGroups.clear(), {
      tokens: this.tokens,
      elementStack: [...this.lastElementStack],
      tokenIndex: this.nextTokenIndex
    };
  }
  rule(e, t) {
    const r = this.wrapper.DEFINE_RULE(Zu(e.name), this.startImplementation(t).bind(this));
    return this.allRules.set(e.name, r), e.entry && (this.mainRule = r), r;
  }
  resetState() {
    this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  startImplementation(e) {
    return (t) => {
      const r = this.keepStackSize();
      try {
        e(t);
      } finally {
        this.resetStackSize(r);
      }
    };
  }
  removeUnexpectedElements() {
    this.elementStack.splice(this.stackSize);
  }
  keepStackSize() {
    const e = this.elementStack.length;
    return this.stackSize = e, e;
  }
  resetStackSize(e) {
    this.removeUnexpectedElements(), this.stackSize = e;
  }
  consume(e, t, r) {
    this.wrapper.wrapConsume(e, t), this.isRecording() || (this.lastElementStack = [...this.elementStack, r], this.nextTokenIndex = this.currIdx + 1);
  }
  subrule(e, t, r, i, s) {
    this.before(i), this.wrapper.wrapSubrule(e, t, s), this.after(i);
  }
  before(e) {
    this.isRecording() || this.elementStack.push(e);
  }
  after(e) {
    if (!this.isRecording()) {
      const t = this.elementStack.lastIndexOf(e);
      t >= 0 && this.elementStack.splice(t);
    }
  }
  get currIdx() {
    return this.wrapper.currIdx;
  }
}
const cm = {
  recoveryEnabled: true,
  nodeLocationTracking: "full",
  skipValidations: true,
  errorMessageProvider: new tc()
};
class dm extends Tp {
  constructor(e, t) {
    const r = t && "maxLookahead" in t;
    super(e, Object.assign(Object.assign(Object.assign({}, cm), { lookaheadStrategy: r ? new ua({ maxLookahead: t.maxLookahead }) : new Gp({
      // If validations are skipped, don't log the lookahead warnings
      logging: t.skipValidations ? () => {
      } : void 0
    }) }), t));
  }
  get IS_RECORDING() {
    return this.RECORDING_PHASE;
  }
  DEFINE_RULE(e, t) {
    return this.RULE(e, t);
  }
  wrapSelfAnalysis() {
    this.performSelfAnalysis();
  }
  wrapConsume(e, t) {
    return this.consume(e, t);
  }
  wrapSubrule(e, t, r) {
    return this.subrule(e, t, {
      ARGS: [r]
    });
  }
  wrapOr(e, t) {
    this.or(e, t);
  }
  wrapOption(e, t) {
    this.option(e, t);
  }
  wrapMany(e, t) {
    this.many(e, t);
  }
  wrapAtLeastOne(e, t) {
    this.atLeastOne(e, t);
  }
}
function nc(n, e, t) {
  return fm({
    parser: e,
    tokens: t,
    ruleNames: /* @__PURE__ */ new Map()
  }, n), e;
}
function fm(n, e) {
  const t = eu(e, false), r = Z(e.rules).filter(we).filter((i) => t.has(i));
  for (const i of r) {
    const s = Object.assign(Object.assign({}, n), { consume: 1, optional: 1, subrule: 1, many: 1, or: 1 });
    n.parser.rule(i, Tt(s, i.definition));
  }
}
function Tt(n, e, t = false) {
  let r;
  if (mt(e))
    r = Rm(n, e);
  else if (yi(e))
    r = hm(n, e);
  else if (pt(e))
    r = Tt(n, e.terminal);
  else if (Js(e))
    r = rc(n, e);
  else if (gt(e))
    r = pm(n, e);
  else if (zl(e))
    r = gm(n, e);
  else if (Yl(e))
    r = ym(n, e);
  else if (Qs(e))
    r = Tm(n, e);
  else if (bd(e)) {
    const i = n.consume++;
    r = () => n.parser.consume(i, nt, e);
  } else
    throw new Kl(e.$cstNode, `Unexpected element type: ${e.$type}`);
  return ic(n, t ? void 0 : li(e), r, e.cardinality);
}
function hm(n, e) {
  const t = na(e);
  return () => n.parser.action(t, e);
}
function pm(n, e) {
  const t = e.rule.ref;
  if (we(t)) {
    const r = n.subrule++, i = t.fragment, s = e.arguments.length > 0 ? mm(t, e.arguments) : () => ({});
    return (a2) => n.parser.subrule(r, sc(n, t), i, e, s(a2));
  } else if (At(t)) {
    const r = n.consume++, i = Us(n, t.name);
    return () => n.parser.consume(r, i, e);
  } else if (t)
    er();
  else
    throw new Kl(e.$cstNode, `Undefined rule: ${e.rule.$refText}`);
}
function mm(n, e) {
  const t = e.map((r) => ze(r.value));
  return (r) => {
    const i = {};
    for (let s = 0; s < t.length; s++) {
      const a2 = n.parameters[s], o = t[s];
      i[a2.name] = o(r);
    }
    return i;
  };
}
function ze(n) {
  if (Id(n)) {
    const e = ze(n.left), t = ze(n.right);
    return (r) => e(r) || t(r);
  } else if (Sd(n)) {
    const e = ze(n.left), t = ze(n.right);
    return (r) => e(r) && t(r);
  } else if (Cd(n)) {
    const e = ze(n.value);
    return (t) => !e(t);
  } else if (Nd(n)) {
    const e = n.parameter.ref.name;
    return (t) => t !== void 0 && t[e] === true;
  } else if (xd(n)) {
    const e = !!n.true;
    return () => e;
  }
  er();
}
function gm(n, e) {
  if (e.elements.length === 1)
    return Tt(n, e.elements[0]);
  {
    const t = [];
    for (const i of e.elements) {
      const s = {
        // Since we handle the guard condition in the alternative already
        // We can ignore the group guard condition inside
        ALT: Tt(n, i, true)
      }, a2 = li(i);
      a2 && (s.GATE = ze(a2)), t.push(s);
    }
    const r = n.or++;
    return (i) => n.parser.alternatives(r, t.map((s) => {
      const a2 = {
        ALT: () => s.ALT(i)
      }, o = s.GATE;
      return o && (a2.GATE = () => o(i)), a2;
    }));
  }
}
function ym(n, e) {
  if (e.elements.length === 1)
    return Tt(n, e.elements[0]);
  const t = [];
  for (const o of e.elements) {
    const l = {
      // Since we handle the guard condition in the alternative already
      // We can ignore the group guard condition inside
      ALT: Tt(n, o, true)
    }, u = li(o);
    u && (l.GATE = ze(u)), t.push(l);
  }
  const r = n.or++, i = (o, l) => {
    const u = l.getRuleStack().join("-");
    return `uGroup_${o}_${u}`;
  }, s = (o) => n.parser.alternatives(r, t.map((l, u) => {
    const c = { ALT: () => true }, d = n.parser;
    c.ALT = () => {
      if (l.ALT(o), !d.isRecording()) {
        const f = i(r, d);
        d.unorderedGroups.get(f) || d.unorderedGroups.set(f, []);
        const m = d.unorderedGroups.get(f);
        typeof (m == null ? void 0 : m[u]) > "u" && (m[u] = true);
      }
    };
    const h = l.GATE;
    return h ? c.GATE = () => h(o) : c.GATE = () => {
      const f = d.unorderedGroups.get(i(r, d));
      return !(f != null && f[u]);
    }, c;
  })), a2 = ic(n, li(e), s, "*");
  return (o) => {
    a2(o), n.parser.isRecording() || n.parser.unorderedGroups.delete(i(r, n.parser));
  };
}
function Tm(n, e) {
  const t = e.elements.map((r) => Tt(n, r));
  return (r) => t.forEach((i) => i(r));
}
function li(n) {
  if (Qs(n))
    return n.guardCondition;
}
function rc(n, e, t = e.terminal) {
  if (t)
    if (gt(t) && we(t.rule.ref)) {
      const r = t.rule.ref, i = n.subrule++;
      return (s) => n.parser.subrule(i, sc(n, r), false, e, s);
    } else if (gt(t) && At(t.rule.ref)) {
      const r = n.consume++, i = Us(n, t.rule.ref.name);
      return () => n.parser.consume(r, i, e);
    } else if (mt(t)) {
      const r = n.consume++, i = Us(n, t.value);
      return () => n.parser.consume(r, i, e);
    } else
      throw new Error("Could not build cross reference parser");
  else {
    if (!e.type.ref)
      throw new Error("Could not resolve reference to type: " + e.type.$refText);
    const r = ru(e.type.ref), i = r == null ? void 0 : r.terminal;
    if (!i)
      throw new Error("Could not find name assignment for type: " + na(e.type.ref));
    return rc(n, e, i);
  }
}
function Rm(n, e) {
  const t = n.consume++, r = n.tokens[e.value];
  if (!r)
    throw new Error("Could not find token for keyword: " + e.value);
  return () => n.parser.consume(t, r, e);
}
function ic(n, e, t, r) {
  const i = e && ze(e);
  if (!r)
    if (i) {
      const s = n.or++;
      return (a2) => n.parser.alternatives(s, [
        {
          ALT: () => t(a2),
          GATE: () => i(a2)
        },
        {
          ALT: to(),
          GATE: () => !i(a2)
        }
      ]);
    } else
      return t;
  if (r === "*") {
    const s = n.many++;
    return (a2) => n.parser.many(s, {
      DEF: () => t(a2),
      GATE: i ? () => i(a2) : void 0
    });
  } else if (r === "+") {
    const s = n.many++;
    if (i) {
      const a2 = n.or++;
      return (o) => n.parser.alternatives(a2, [
        {
          ALT: () => n.parser.atLeastOne(s, {
            DEF: () => t(o)
          }),
          GATE: () => i(o)
        },
        {
          ALT: to(),
          GATE: () => !i(o)
        }
      ]);
    } else
      return (a2) => n.parser.atLeastOne(s, {
        DEF: () => t(a2)
      });
  } else if (r === "?") {
    const s = n.optional++;
    return (a2) => n.parser.optional(s, {
      DEF: () => t(a2),
      GATE: i ? () => i(a2) : void 0
    });
  } else
    er();
}
function sc(n, e) {
  const t = vm(n, e), r = n.parser.getRule(t);
  if (!r)
    throw new Error(`Rule "${t}" not found."`);
  return r;
}
function vm(n, e) {
  if (we(e))
    return e.name;
  if (n.ruleNames.has(e))
    return n.ruleNames.get(e);
  {
    let t = e, r = t.$container, i = e.$type;
    for (; !we(r); )
      (Qs(r) || zl(r) || Yl(r)) && (i = r.elements.indexOf(t).toString() + ":" + i), t = r, r = r.$container;
    return i = r.name + ":" + i, n.ruleNames.set(e, i), i;
  }
}
function Us(n, e) {
  const t = n.tokens[e];
  if (!t)
    throw new Error(`Token "${e}" not found."`);
  return t;
}
function Am(n) {
  const e = n.Grammar, t = n.parser.Lexer, r = new um(n);
  return nc(e, r, t.definition), r.finalize(), r;
}
function Em(n) {
  const e = $m(n);
  return e.finalize(), e;
}
function $m(n) {
  const e = n.Grammar, t = n.parser.Lexer, r = new om(n);
  return nc(e, r, t.definition);
}
class ac {
  constructor() {
    this.diagnostics = [];
  }
  buildTokens(e, t) {
    const r = Z(eu(e, false)), i = this.buildTerminalTokens(r), s = this.buildKeywordTokens(r, i, t);
    return i.forEach((a2) => {
      const o = a2.PATTERN;
      typeof o == "object" && o && "test" in o && hs(o) ? s.unshift(a2) : s.push(a2);
    }), s;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flushLexingReport(e) {
    return { diagnostics: this.popDiagnostics() };
  }
  popDiagnostics() {
    const e = [...this.diagnostics];
    return this.diagnostics = [], e;
  }
  buildTerminalTokens(e) {
    return e.filter(At).filter((t) => !t.fragment).map((t) => this.buildTerminalToken(t)).toArray();
  }
  buildTerminalToken(e) {
    const t = ra(e), r = this.requiresCustomPattern(t) ? this.regexPatternFunction(t) : t, i = {
      name: e.name,
      PATTERN: r
    };
    return typeof r == "function" && (i.LINE_BREAKS = true), e.hidden && (i.GROUP = hs(t) ? fe.SKIPPED : "hidden"), i;
  }
  requiresCustomPattern(e) {
    return e.flags.includes("u") || e.flags.includes("s") ? true : !!(e.source.includes("?<=") || e.source.includes("?<!"));
  }
  regexPatternFunction(e) {
    const t = new RegExp(e, e.flags + "y");
    return (r, i) => (t.lastIndex = i, t.exec(r));
  }
  buildKeywordTokens(e, t, r) {
    return e.filter(we).flatMap((i) => tr(i).filter(mt)).distinct((i) => i.value).toArray().sort((i, s) => s.value.length - i.value.length).map((i) => this.buildKeywordToken(i, t, !!(r != null && r.caseInsensitive)));
  }
  buildKeywordToken(e, t, r) {
    const i = this.buildKeywordPattern(e, r), s = {
      name: e.value,
      PATTERN: i,
      LONGER_ALT: this.findLongerAlt(e, t)
    };
    return typeof i == "function" && (s.LINE_BREAKS = true), s;
  }
  buildKeywordPattern(e, t) {
    return t ? new RegExp(Xd(e.value)) : e.value;
  }
  findLongerAlt(e, t) {
    return t.reduce((r, i) => {
      const s = i == null ? void 0 : i.PATTERN;
      return s != null && s.source && Jd("^" + s.source + "$", e.value) && r.push(i), r;
    }, []);
  }
}
class oc {
  convert(e, t) {
    let r = t.grammarSource;
    if (Js(r) && (r = tf(r)), gt(r)) {
      const i = r.rule.ref;
      if (!i)
        throw new Error("This cst node was not parsed by a rule.");
      return this.runConverter(i, e, t);
    }
    return e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runConverter(e, t, r) {
    var i;
    switch (e.name.toUpperCase()) {
      case "INT":
        return We.convertInt(t);
      case "STRING":
        return We.convertString(t);
      case "ID":
        return We.convertID(t);
    }
    switch ((i = uf(e)) === null || i === void 0 ? void 0 : i.toLowerCase()) {
      case "number":
        return We.convertNumber(t);
      case "boolean":
        return We.convertBoolean(t);
      case "bigint":
        return We.convertBigint(t);
      case "date":
        return We.convertDate(t);
      default:
        return t;
    }
  }
}
var We;
(function(n) {
  function e(u) {
    let c = "";
    for (let d = 1; d < u.length - 1; d++) {
      const h = u.charAt(d);
      if (h === "\\") {
        const f = u.charAt(++d);
        c += t(f);
      } else
        c += h;
    }
    return c;
  }
  n.convertString = e;
  function t(u) {
    switch (u) {
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return `
`;
      case "r":
        return "\r";
      case "t":
        return "	";
      case "v":
        return "\v";
      case "0":
        return "\0";
      default:
        return u;
    }
  }
  function r(u) {
    return u.charAt(0) === "^" ? u.substring(1) : u;
  }
  n.convertID = r;
  function i(u) {
    return parseInt(u);
  }
  n.convertInt = i;
  function s(u) {
    return BigInt(u);
  }
  n.convertBigint = s;
  function a2(u) {
    return new Date(u);
  }
  n.convertDate = a2;
  function o(u) {
    return Number(u);
  }
  n.convertNumber = o;
  function l(u) {
    return u.toLowerCase() === "true";
  }
  n.convertBoolean = l;
})(We || (We = {}));
var On = {}, Ci = {};
Object.defineProperty(Ci, "__esModule", { value: true });
let Bs;
function Vs() {
  if (Bs === void 0)
    throw new Error("No runtime abstraction layer installed");
  return Bs;
}
(function(n) {
  function e(t) {
    if (t === void 0)
      throw new Error("No runtime abstraction layer provided");
    Bs = t;
  }
  n.install = e;
})(Vs || (Vs = {}));
Ci.default = Vs;
var se = {};
Object.defineProperty(se, "__esModule", { value: true });
se.stringArray = se.array = se.func = se.error = se.number = se.string = se.boolean = void 0;
function km(n) {
  return n === true || n === false;
}
se.boolean = km;
function lc(n) {
  return typeof n == "string" || n instanceof String;
}
se.string = lc;
function xm(n) {
  return typeof n == "number" || n instanceof Number;
}
se.number = xm;
function Sm(n) {
  return n instanceof Error;
}
se.error = Sm;
function Im(n) {
  return typeof n == "function";
}
se.func = Im;
function uc(n) {
  return Array.isArray(n);
}
se.array = uc;
function Cm(n) {
  return uc(n) && n.every((e) => lc(e));
}
se.stringArray = Cm;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: true });
var cc = Ft.Emitter = Ft.Event = void 0;
const Nm = Ci;
var ll;
(function(n) {
  const e = { dispose() {
  } };
  n.None = function() {
    return e;
  };
})(ll || (Ft.Event = ll = {}));
class wm {
  add(e, t = null, r) {
    this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(t), Array.isArray(r) && r.push({ dispose: () => this.remove(e, t) });
  }
  remove(e, t = null) {
    if (!this._callbacks)
      return;
    let r = false;
    for (let i = 0, s = this._callbacks.length; i < s; i++)
      if (this._callbacks[i] === e)
        if (this._contexts[i] === t) {
          this._callbacks.splice(i, 1), this._contexts.splice(i, 1);
          return;
        } else
          r = true;
    if (r)
      throw new Error("When adding a listener with a context, you should remove it with the same context");
  }
  invoke(...e) {
    if (!this._callbacks)
      return [];
    const t = [], r = this._callbacks.slice(0), i = this._contexts.slice(0);
    for (let s = 0, a2 = r.length; s < a2; s++)
      try {
        t.push(r[s].apply(i[s], e));
      } catch (o) {
        (0, Nm.default)().console.error(o);
      }
    return t;
  }
  isEmpty() {
    return !this._callbacks || this._callbacks.length === 0;
  }
  dispose() {
    this._callbacks = void 0, this._contexts = void 0;
  }
}
class Ni {
  constructor(e) {
    this._options = e;
  }
  /**
   * For the public to allow to subscribe
   * to events from this Emitter
   */
  get event() {
    return this._event || (this._event = (e, t, r) => {
      this._callbacks || (this._callbacks = new wm()), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(e, t);
      const i = {
        dispose: () => {
          this._callbacks && (this._callbacks.remove(e, t), i.dispose = Ni._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this));
        }
      };
      return Array.isArray(r) && r.push(i), i;
    }), this._event;
  }
  /**
   * To be kept private to fire an event to
   * subscribers
   */
  fire(e) {
    this._callbacks && this._callbacks.invoke.call(this._callbacks, e);
  }
  dispose() {
    this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0);
  }
}
cc = Ft.Emitter = Ni;
Ni._noop = function() {
};
var V;
Object.defineProperty(On, "__esModule", { value: true });
var ya = On.CancellationTokenSource = V = On.CancellationToken = void 0;
const Lm = Ci, _m = se, Ks = Ft;
var ui;
(function(n) {
  n.None = Object.freeze({
    isCancellationRequested: false,
    onCancellationRequested: Ks.Event.None
  }), n.Cancelled = Object.freeze({
    isCancellationRequested: true,
    onCancellationRequested: Ks.Event.None
  });
  function e(t) {
    const r = t;
    return r && (r === n.None || r === n.Cancelled || _m.boolean(r.isCancellationRequested) && !!r.onCancellationRequested);
  }
  n.is = e;
})(ui || (V = On.CancellationToken = ui = {}));
const bm = Object.freeze(function(n, e) {
  const t = (0, Lm.default)().timer.setTimeout(n.bind(e), 0);
  return { dispose() {
    t.dispose();
  } };
});
class ul {
  constructor() {
    this._isCancelled = false;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? bm : (this._emitter || (this._emitter = new Ks.Emitter()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = void 0);
  }
}
class Om {
  get token() {
    return this._token || (this._token = new ul()), this._token;
  }
  cancel() {
    this._token ? this._token.cancel() : this._token = ui.Cancelled;
  }
  dispose() {
    this._token ? this._token instanceof ul && this._token.dispose() : this._token = ui.None;
  }
}
ya = On.CancellationTokenSource = Om;
function Pm() {
  return new Promise((n) => {
    typeof setImmediate > "u" ? setTimeout(n, 0) : setImmediate(n);
  });
}
let Pr = 0, Mm = 10;
function Dm() {
  return Pr = performance.now(), new ya();
}
const ci = Symbol("OperationCancelled");
function wi(n) {
  return n === ci;
}
async function Ae(n) {
  if (n === V.None)
    return;
  const e = performance.now();
  if (e - Pr >= Mm && (Pr = e, await Pm(), Pr = performance.now()), n.isCancellationRequested)
    throw ci;
}
class Ta {
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = (r) => (e(r), this), this.reject = (r) => (t(r), this);
    });
  }
}
class Pn {
  constructor(e, t, r, i) {
    this._uri = e, this._languageId = t, this._version = r, this._content = i, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      const t = this.offsetAt(e.start), r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  }
  update(e, t) {
    for (const r of e)
      if (Pn.isIncremental(r)) {
        const i = fc(r.range), s = this.offsetAt(i.start), a2 = this.offsetAt(i.end);
        this._content = this._content.substring(0, s) + r.text + this._content.substring(a2, this._content.length);
        const o = Math.max(i.start.line, 0), l = Math.max(i.end.line, 0);
        let u = this._lineOffsets;
        const c = cl(r.text, false, s);
        if (l - o === c.length)
          for (let h = 0, f = c.length; h < f; h++)
            u[h + o + 1] = c[h];
        else
          c.length < 1e4 ? u.splice(o + 1, l - o, ...c) : this._lineOffsets = u = u.slice(0, o + 1).concat(c, u.slice(l + 1));
        const d = r.text.length - (a2 - s);
        if (d !== 0)
          for (let h = o + 1 + c.length, f = u.length; h < f; h++)
            u[h] = u[h] + d;
      } else if (Pn.isFull(r))
        this._content = r.text, this._lineOffsets = void 0;
      else
        throw new Error("Unknown change event received");
    this._version = t;
  }
  getLineOffsets() {
    return this._lineOffsets === void 0 && (this._lineOffsets = cl(this._content, true)), this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    const t = this.getLineOffsets();
    let r = 0, i = t.length;
    if (i === 0)
      return { line: 0, character: e };
    for (; r < i; ) {
      const a2 = Math.floor((r + i) / 2);
      t[a2] > e ? i = a2 : r = a2 + 1;
    }
    const s = r - 1;
    return e = this.ensureBeforeEOL(e, t[s]), { line: s, character: e - t[s] };
  }
  offsetAt(e) {
    const t = this.getLineOffsets();
    if (e.line >= t.length)
      return this._content.length;
    if (e.line < 0)
      return 0;
    const r = t[e.line];
    if (e.character <= 0)
      return r;
    const i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length, s = Math.min(r + e.character, i);
    return this.ensureBeforeEOL(s, r);
  }
  ensureBeforeEOL(e, t) {
    for (; e > t && dc(this._content.charCodeAt(e - 1)); )
      e--;
    return e;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(e) {
    const t = e;
    return t != null && typeof t.text == "string" && t.range !== void 0 && (t.rangeLength === void 0 || typeof t.rangeLength == "number");
  }
  static isFull(e) {
    const t = e;
    return t != null && typeof t.text == "string" && t.range === void 0 && t.rangeLength === void 0;
  }
}
var Ws;
(function(n) {
  function e(i, s, a2, o) {
    return new Pn(i, s, a2, o);
  }
  n.create = e;
  function t(i, s, a2) {
    if (i instanceof Pn)
      return i.update(s, a2), i;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  n.update = t;
  function r(i, s) {
    const a2 = i.getText(), o = Hs(s.map(Fm), (c, d) => {
      const h = c.range.start.line - d.range.start.line;
      return h === 0 ? c.range.start.character - d.range.start.character : h;
    });
    let l = 0;
    const u = [];
    for (const c of o) {
      const d = i.offsetAt(c.range.start);
      if (d < l)
        throw new Error("Overlapping edit");
      d > l && u.push(a2.substring(l, d)), c.newText.length && u.push(c.newText), l = i.offsetAt(c.range.end);
    }
    return u.push(a2.substr(l)), u.join("");
  }
  n.applyEdits = r;
})(Ws || (Ws = {}));
function Hs(n, e) {
  if (n.length <= 1)
    return n;
  const t = n.length / 2 | 0, r = n.slice(0, t), i = n.slice(t);
  Hs(r, e), Hs(i, e);
  let s = 0, a2 = 0, o = 0;
  for (; s < r.length && a2 < i.length; )
    e(r[s], i[a2]) <= 0 ? n[o++] = r[s++] : n[o++] = i[a2++];
  for (; s < r.length; )
    n[o++] = r[s++];
  for (; a2 < i.length; )
    n[o++] = i[a2++];
  return n;
}
function cl(n, e, t = 0) {
  const r = e ? [t] : [];
  for (let i = 0; i < n.length; i++) {
    const s = n.charCodeAt(i);
    dc(s) && (s === 13 && i + 1 < n.length && n.charCodeAt(i + 1) === 10 && i++, r.push(t + i + 1));
  }
  return r;
}
function dc(n) {
  return n === 13 || n === 10;
}
function fc(n) {
  const e = n.start, t = n.end;
  return e.line > t.line || e.line === t.line && e.character > t.character ? { start: t, end: e } : n;
}
function Fm(n) {
  const e = fc(n.range);
  return e !== n.range ? { newText: n.newText, range: e } : n;
}
var hc;
(() => {
  var n = { 470: (i) => {
    function s(l) {
      if (typeof l != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(l));
    }
    function a2(l, u) {
      for (var c, d = "", h = 0, f = -1, m = 0, g = 0; g <= l.length; ++g) {
        if (g < l.length)
          c = l.charCodeAt(g);
        else {
          if (c === 47)
            break;
          c = 47;
        }
        if (c === 47) {
          if (!(f === g - 1 || m === 1))
            if (f !== g - 1 && m === 2) {
              if (d.length < 2 || h !== 2 || d.charCodeAt(d.length - 1) !== 46 || d.charCodeAt(d.length - 2) !== 46) {
                if (d.length > 2) {
                  var A = d.lastIndexOf("/");
                  if (A !== d.length - 1) {
                    A === -1 ? (d = "", h = 0) : h = (d = d.slice(0, A)).length - 1 - d.lastIndexOf("/"), f = g, m = 0;
                    continue;
                  }
                } else if (d.length === 2 || d.length === 1) {
                  d = "", h = 0, f = g, m = 0;
                  continue;
                }
              }
              u && (d.length > 0 ? d += "/.." : d = "..", h = 2);
            } else
              d.length > 0 ? d += "/" + l.slice(f + 1, g) : d = l.slice(f + 1, g), h = g - f - 1;
          f = g, m = 0;
        } else
          c === 46 && m !== -1 ? ++m : m = -1;
      }
      return d;
    }
    var o = { resolve: function() {
      for (var l, u = "", c = false, d = arguments.length - 1; d >= -1 && !c; d--) {
        var h;
        d >= 0 ? h = arguments[d] : (l === void 0 && (l = process.cwd()), h = l), s(h), h.length !== 0 && (u = h + "/" + u, c = h.charCodeAt(0) === 47);
      }
      return u = a2(u, !c), c ? u.length > 0 ? "/" + u : "/" : u.length > 0 ? u : ".";
    }, normalize: function(l) {
      if (s(l), l.length === 0)
        return ".";
      var u = l.charCodeAt(0) === 47, c = l.charCodeAt(l.length - 1) === 47;
      return (l = a2(l, !u)).length !== 0 || u || (l = "."), l.length > 0 && c && (l += "/"), u ? "/" + l : l;
    }, isAbsolute: function(l) {
      return s(l), l.length > 0 && l.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var l, u = 0; u < arguments.length; ++u) {
        var c = arguments[u];
        s(c), c.length > 0 && (l === void 0 ? l = c : l += "/" + c);
      }
      return l === void 0 ? "." : o.normalize(l);
    }, relative: function(l, u) {
      if (s(l), s(u), l === u || (l = o.resolve(l)) === (u = o.resolve(u)))
        return "";
      for (var c = 1; c < l.length && l.charCodeAt(c) === 47; ++c)
        ;
      for (var d = l.length, h = d - c, f = 1; f < u.length && u.charCodeAt(f) === 47; ++f)
        ;
      for (var m = u.length - f, g = h < m ? h : m, A = -1, y = 0; y <= g; ++y) {
        if (y === g) {
          if (m > g) {
            if (u.charCodeAt(f + y) === 47)
              return u.slice(f + y + 1);
            if (y === 0)
              return u.slice(f + y);
          } else
            h > g && (l.charCodeAt(c + y) === 47 ? A = y : y === 0 && (A = 0));
          break;
        }
        var E2 = l.charCodeAt(c + y);
        if (E2 !== u.charCodeAt(f + y))
          break;
        E2 === 47 && (A = y);
      }
      var R = "";
      for (y = c + A + 1; y <= d; ++y)
        y !== d && l.charCodeAt(y) !== 47 || (R.length === 0 ? R += ".." : R += "/..");
      return R.length > 0 ? R + u.slice(f + A) : (f += A, u.charCodeAt(f) === 47 && ++f, u.slice(f));
    }, _makeLong: function(l) {
      return l;
    }, dirname: function(l) {
      if (s(l), l.length === 0)
        return ".";
      for (var u = l.charCodeAt(0), c = u === 47, d = -1, h = true, f = l.length - 1; f >= 1; --f)
        if ((u = l.charCodeAt(f)) === 47) {
          if (!h) {
            d = f;
            break;
          }
        } else
          h = false;
      return d === -1 ? c ? "/" : "." : c && d === 1 ? "//" : l.slice(0, d);
    }, basename: function(l, u) {
      if (u !== void 0 && typeof u != "string")
        throw new TypeError('"ext" argument must be a string');
      s(l);
      var c, d = 0, h = -1, f = true;
      if (u !== void 0 && u.length > 0 && u.length <= l.length) {
        if (u.length === l.length && u === l)
          return "";
        var m = u.length - 1, g = -1;
        for (c = l.length - 1; c >= 0; --c) {
          var A = l.charCodeAt(c);
          if (A === 47) {
            if (!f) {
              d = c + 1;
              break;
            }
          } else
            g === -1 && (f = false, g = c + 1), m >= 0 && (A === u.charCodeAt(m) ? --m == -1 && (h = c) : (m = -1, h = g));
        }
        return d === h ? h = g : h === -1 && (h = l.length), l.slice(d, h);
      }
      for (c = l.length - 1; c >= 0; --c)
        if (l.charCodeAt(c) === 47) {
          if (!f) {
            d = c + 1;
            break;
          }
        } else
          h === -1 && (f = false, h = c + 1);
      return h === -1 ? "" : l.slice(d, h);
    }, extname: function(l) {
      s(l);
      for (var u = -1, c = 0, d = -1, h = true, f = 0, m = l.length - 1; m >= 0; --m) {
        var g = l.charCodeAt(m);
        if (g !== 47)
          d === -1 && (h = false, d = m + 1), g === 46 ? u === -1 ? u = m : f !== 1 && (f = 1) : u !== -1 && (f = -1);
        else if (!h) {
          c = m + 1;
          break;
        }
      }
      return u === -1 || d === -1 || f === 0 || f === 1 && u === d - 1 && u === c + 1 ? "" : l.slice(u, d);
    }, format: function(l) {
      if (l === null || typeof l != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof l);
      return function(u, c) {
        var d = c.dir || c.root, h = c.base || (c.name || "") + (c.ext || "");
        return d ? d === c.root ? d + h : d + "/" + h : h;
      }(0, l);
    }, parse: function(l) {
      s(l);
      var u = { root: "", dir: "", base: "", ext: "", name: "" };
      if (l.length === 0)
        return u;
      var c, d = l.charCodeAt(0), h = d === 47;
      h ? (u.root = "/", c = 1) : c = 0;
      for (var f = -1, m = 0, g = -1, A = true, y = l.length - 1, E2 = 0; y >= c; --y)
        if ((d = l.charCodeAt(y)) !== 47)
          g === -1 && (A = false, g = y + 1), d === 46 ? f === -1 ? f = y : E2 !== 1 && (E2 = 1) : f !== -1 && (E2 = -1);
        else if (!A) {
          m = y + 1;
          break;
        }
      return f === -1 || g === -1 || E2 === 0 || E2 === 1 && f === g - 1 && f === m + 1 ? g !== -1 && (u.base = u.name = m === 0 && h ? l.slice(1, g) : l.slice(m, g)) : (m === 0 && h ? (u.name = l.slice(1, f), u.base = l.slice(1, g)) : (u.name = l.slice(m, f), u.base = l.slice(m, g)), u.ext = l.slice(f, g)), m > 0 ? u.dir = l.slice(0, m - 1) : h && (u.dir = "/"), u;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    o.posix = o, i.exports = o;
  } }, e = {};
  function t(i) {
    var s = e[i];
    if (s !== void 0)
      return s.exports;
    var a2 = e[i] = { exports: {} };
    return n[i](a2, a2.exports, t), a2.exports;
  }
  t.d = (i, s) => {
    for (var a2 in s)
      t.o(s, a2) && !t.o(i, a2) && Object.defineProperty(i, a2, { enumerable: true, get: s[a2] });
  }, t.o = (i, s) => Object.prototype.hasOwnProperty.call(i, s), t.r = (i) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: true });
  };
  var r = {};
  (() => {
    let i;
    t.r(r), t.d(r, { URI: () => h, Utils: () => Ie }), typeof process == "object" ? i = process.platform === "win32" : typeof navigator == "object" && (i = navigator.userAgent.indexOf("Windows") >= 0);
    const s = /^\w[\w\d+.-]*$/, a2 = /^\//, o = /^\/\//;
    function l(k, T) {
      if (!k.scheme && T)
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${k.authority}", path: "${k.path}", query: "${k.query}", fragment: "${k.fragment}"}`);
      if (k.scheme && !s.test(k.scheme))
        throw new Error("[UriError]: Scheme contains illegal characters.");
      if (k.path) {
        if (k.authority) {
          if (!a2.test(k.path))
            throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (o.test(k.path))
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const u = "", c = "/", d = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class h {
      constructor(T, $, S, b, _, L = false) {
        Ze(this, "scheme");
        Ze(this, "authority");
        Ze(this, "path");
        Ze(this, "query");
        Ze(this, "fragment");
        typeof T == "object" ? (this.scheme = T.scheme || u, this.authority = T.authority || u, this.path = T.path || u, this.query = T.query || u, this.fragment = T.fragment || u) : (this.scheme = function(Te, q) {
          return Te || q ? Te : "file";
        }(T, L), this.authority = $ || u, this.path = function(Te, q) {
          switch (Te) {
            case "https":
            case "http":
            case "file":
              q ? q[0] !== c && (q = c + q) : q = c;
          }
          return q;
        }(this.scheme, S || u), this.query = b || u, this.fragment = _ || u, l(this, L));
      }
      static isUri(T) {
        return T instanceof h || !!T && typeof T.authority == "string" && typeof T.fragment == "string" && typeof T.path == "string" && typeof T.query == "string" && typeof T.scheme == "string" && typeof T.fsPath == "string" && typeof T.with == "function" && typeof T.toString == "function";
      }
      get fsPath() {
        return E2(this, false);
      }
      with(T) {
        if (!T)
          return this;
        let { scheme: $, authority: S, path: b, query: _, fragment: L } = T;
        return $ === void 0 ? $ = this.scheme : $ === null && ($ = u), S === void 0 ? S = this.authority : S === null && (S = u), b === void 0 ? b = this.path : b === null && (b = u), _ === void 0 ? _ = this.query : _ === null && (_ = u), L === void 0 ? L = this.fragment : L === null && (L = u), $ === this.scheme && S === this.authority && b === this.path && _ === this.query && L === this.fragment ? this : new m($, S, b, _, L);
      }
      static parse(T, $ = false) {
        const S = d.exec(T);
        return S ? new m(S[2] || u, re(S[4] || u), re(S[5] || u), re(S[7] || u), re(S[9] || u), $) : new m(u, u, u, u, u);
      }
      static file(T) {
        let $ = u;
        if (i && (T = T.replace(/\\/g, c)), T[0] === c && T[1] === c) {
          const S = T.indexOf(c, 2);
          S === -1 ? ($ = T.substring(2), T = c) : ($ = T.substring(2, S), T = T.substring(S) || c);
        }
        return new m("file", $, T, u, u);
      }
      static from(T) {
        const $ = new m(T.scheme, T.authority, T.path, T.query, T.fragment);
        return l($, true), $;
      }
      toString(T = false) {
        return R(this, T);
      }
      toJSON() {
        return this;
      }
      static revive(T) {
        if (T) {
          if (T instanceof h)
            return T;
          {
            const $ = new m(T);
            return $._formatted = T.external, $._fsPath = T._sep === f ? T.fsPath : null, $;
          }
        }
        return T;
      }
    }
    const f = i ? 1 : void 0;
    class m extends h {
      constructor() {
        super(...arguments);
        Ze(this, "_formatted", null);
        Ze(this, "_fsPath", null);
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = E2(this, false)), this._fsPath;
      }
      toString($ = false) {
        return $ ? R(this, true) : (this._formatted || (this._formatted = R(this, false)), this._formatted);
      }
      toJSON() {
        const $ = { $mid: 1 };
        return this._fsPath && ($.fsPath = this._fsPath, $._sep = f), this._formatted && ($.external = this._formatted), this.path && ($.path = this.path), this.scheme && ($.scheme = this.scheme), this.authority && ($.authority = this.authority), this.query && ($.query = this.query), this.fragment && ($.fragment = this.fragment), $;
      }
    }
    const g = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function A(k, T, $) {
      let S, b = -1;
      for (let _ = 0; _ < k.length; _++) {
        const L = k.charCodeAt(_);
        if (L >= 97 && L <= 122 || L >= 65 && L <= 90 || L >= 48 && L <= 57 || L === 45 || L === 46 || L === 95 || L === 126 || T && L === 47 || $ && L === 91 || $ && L === 93 || $ && L === 58)
          b !== -1 && (S += encodeURIComponent(k.substring(b, _)), b = -1), S !== void 0 && (S += k.charAt(_));
        else {
          S === void 0 && (S = k.substr(0, _));
          const Te = g[L];
          Te !== void 0 ? (b !== -1 && (S += encodeURIComponent(k.substring(b, _)), b = -1), S += Te) : b === -1 && (b = _);
        }
      }
      return b !== -1 && (S += encodeURIComponent(k.substring(b))), S !== void 0 ? S : k;
    }
    function y(k) {
      let T;
      for (let $ = 0; $ < k.length; $++) {
        const S = k.charCodeAt($);
        S === 35 || S === 63 ? (T === void 0 && (T = k.substr(0, $)), T += g[S]) : T !== void 0 && (T += k[$]);
      }
      return T !== void 0 ? T : k;
    }
    function E2(k, T) {
      let $;
      return $ = k.authority && k.path.length > 1 && k.scheme === "file" ? `//${k.authority}${k.path}` : k.path.charCodeAt(0) === 47 && (k.path.charCodeAt(1) >= 65 && k.path.charCodeAt(1) <= 90 || k.path.charCodeAt(1) >= 97 && k.path.charCodeAt(1) <= 122) && k.path.charCodeAt(2) === 58 ? T ? k.path.substr(1) : k.path[1].toLowerCase() + k.path.substr(2) : k.path, i && ($ = $.replace(/\//g, "\\")), $;
    }
    function R(k, T) {
      const $ = T ? y : A;
      let S = "", { scheme: b, authority: _, path: L, query: Te, fragment: q } = k;
      if (b && (S += b, S += ":"), (_ || b === "file") && (S += c, S += c), _) {
        let K = _.indexOf("@");
        if (K !== -1) {
          const dt = _.substr(0, K);
          _ = _.substr(K + 1), K = dt.lastIndexOf(":"), K === -1 ? S += $(dt, false, false) : (S += $(dt.substr(0, K), false, false), S += ":", S += $(dt.substr(K + 1), false, true)), S += "@";
        }
        _ = _.toLowerCase(), K = _.lastIndexOf(":"), K === -1 ? S += $(_, false, true) : (S += $(_.substr(0, K), false, true), S += _.substr(K));
      }
      if (L) {
        if (L.length >= 3 && L.charCodeAt(0) === 47 && L.charCodeAt(2) === 58) {
          const K = L.charCodeAt(1);
          K >= 65 && K <= 90 && (L = `/${String.fromCharCode(K + 32)}:${L.substr(3)}`);
        } else if (L.length >= 2 && L.charCodeAt(1) === 58) {
          const K = L.charCodeAt(0);
          K >= 65 && K <= 90 && (L = `${String.fromCharCode(K + 32)}:${L.substr(2)}`);
        }
        S += $(L, true, false);
      }
      return Te && (S += "?", S += $(Te, false, false)), q && (S += "#", S += T ? q : A(q, false, false)), S;
    }
    function I(k) {
      try {
        return decodeURIComponent(k);
      } catch {
        return k.length > 3 ? k.substr(0, 3) + I(k.substr(3)) : k;
      }
    }
    const F = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function re(k) {
      return k.match(F) ? k.replace(F, (T) => I(T)) : k;
    }
    var Le = t(470);
    const ye = Le.posix || Le, Fe2 = "/";
    var Ie;
    (function(k) {
      k.joinPath = function(T, ...$) {
        return T.with({ path: ye.join(T.path, ...$) });
      }, k.resolvePath = function(T, ...$) {
        let S = T.path, b = false;
        S[0] !== Fe2 && (S = Fe2 + S, b = true);
        let _ = ye.resolve(S, ...$);
        return b && _[0] === Fe2 && !T.authority && (_ = _.substring(1)), T.with({ path: _ });
      }, k.dirname = function(T) {
        if (T.path.length === 0 || T.path === Fe2)
          return T;
        let $ = ye.dirname(T.path);
        return $.length === 1 && $.charCodeAt(0) === 46 && ($ = ""), T.with({ path: $ });
      }, k.basename = function(T) {
        return ye.basename(T.path);
      }, k.extname = function(T) {
        return ye.extname(T.path);
      };
    })(Ie || (Ie = {}));
  })(), hc = r;
})();
const { URI: Rt, Utils: jt } = hc;
var it;
(function(n) {
  n.basename = jt.basename, n.dirname = jt.dirname, n.extname = jt.extname, n.joinPath = jt.joinPath, n.resolvePath = jt.resolvePath;
  function e(i, s) {
    return (i == null ? void 0 : i.toString()) === (s == null ? void 0 : s.toString());
  }
  n.equals = e;
  function t(i, s) {
    const a2 = typeof i == "string" ? i : i.path, o = typeof s == "string" ? s : s.path, l = a2.split("/").filter((f) => f.length > 0), u = o.split("/").filter((f) => f.length > 0);
    let c = 0;
    for (; c < l.length && l[c] === u[c]; c++)
      ;
    const d = "../".repeat(l.length - c), h = u.slice(c).join("/");
    return d + h;
  }
  n.relative = t;
  function r(i) {
    return Rt.parse(i.toString()).toString();
  }
  n.normalize = r;
})(it || (it = {}));
var U;
(function(n) {
  n[n.Changed = 0] = "Changed", n[n.Parsed = 1] = "Parsed", n[n.IndexedContent = 2] = "IndexedContent", n[n.ComputedScopes = 3] = "ComputedScopes", n[n.Linked = 4] = "Linked", n[n.IndexedReferences = 5] = "IndexedReferences", n[n.Validated = 6] = "Validated";
})(U || (U = {}));
class Gm {
  constructor(e) {
    this.serviceRegistry = e.ServiceRegistry, this.textDocuments = e.workspace.TextDocuments, this.fileSystemProvider = e.workspace.FileSystemProvider;
  }
  async fromUri(e, t = V.None) {
    const r = await this.fileSystemProvider.readFile(e);
    return this.createAsync(e, r, t);
  }
  fromTextDocument(e, t, r) {
    return t = t ?? Rt.parse(e.uri), V.is(r) ? this.createAsync(t, e, r) : this.create(t, e, r);
  }
  fromString(e, t, r) {
    return V.is(r) ? this.createAsync(t, e, r) : this.create(t, e, r);
  }
  fromModel(e, t) {
    return this.create(t, { $model: e });
  }
  create(e, t, r) {
    if (typeof t == "string") {
      const i = this.parse(e, t, r);
      return this.createLangiumDocument(i, e, void 0, t);
    } else if ("$model" in t) {
      const i = { value: t.$model, parserErrors: [], lexerErrors: [] };
      return this.createLangiumDocument(i, e);
    } else {
      const i = this.parse(e, t.getText(), r);
      return this.createLangiumDocument(i, e, t);
    }
  }
  async createAsync(e, t, r) {
    if (typeof t == "string") {
      const i = await this.parseAsync(e, t, r);
      return this.createLangiumDocument(i, e, void 0, t);
    } else {
      const i = await this.parseAsync(e, t.getText(), r);
      return this.createLangiumDocument(i, e, t);
    }
  }
  /**
   * Create a LangiumDocument from a given parse result.
   *
   * A TextDocument is created on demand if it is not provided as argument here. Usually this
   * should not be necessary because the main purpose of the TextDocument is to convert between
   * text ranges and offsets, which is done solely in LSP request handling.
   *
   * With the introduction of {@link update} below this method is supposed to be mainly called
   * during workspace initialization and on addition/recognition of new files, while changes in
   * existing documents are processed via {@link update}.
   */
  createLangiumDocument(e, t, r, i) {
    let s;
    if (r)
      s = {
        parseResult: e,
        uri: t,
        state: U.Parsed,
        references: [],
        textDocument: r
      };
    else {
      const a2 = this.createTextDocumentGetter(t, i);
      s = {
        parseResult: e,
        uri: t,
        state: U.Parsed,
        references: [],
        get textDocument() {
          return a2();
        }
      };
    }
    return e.value.$document = s, s;
  }
  async update(e, t) {
    var r, i;
    const s = (r = e.parseResult.value.$cstNode) === null || r === void 0 ? void 0 : r.root.fullText, a2 = (i = this.textDocuments) === null || i === void 0 ? void 0 : i.get(e.uri.toString()), o = a2 ? a2.getText() : await this.fileSystemProvider.readFile(e.uri);
    if (a2)
      Object.defineProperty(e, "textDocument", {
        value: a2
      });
    else {
      const l = this.createTextDocumentGetter(e.uri, o);
      Object.defineProperty(e, "textDocument", {
        get: l
      });
    }
    return s !== o && (e.parseResult = await this.parseAsync(e.uri, o, t), e.parseResult.value.$document = e), e.state = U.Parsed, e;
  }
  parse(e, t, r) {
    return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(t, r);
  }
  parseAsync(e, t, r) {
    return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(t, r);
  }
  createTextDocumentGetter(e, t) {
    const r = this.serviceRegistry;
    let i;
    return () => i ?? (i = Ws.create(e.toString(), r.getServices(e).LanguageMetaData.languageId, 0, t ?? ""));
  }
}
class Um {
  constructor(e) {
    this.documentMap = /* @__PURE__ */ new Map(), this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.serviceRegistry = e.ServiceRegistry;
  }
  get all() {
    return Z(this.documentMap.values());
  }
  addDocument(e) {
    const t = e.uri.toString();
    if (this.documentMap.has(t))
      throw new Error(`A document with the URI '${t}' is already present.`);
    this.documentMap.set(t, e);
  }
  getDocument(e) {
    const t = e.toString();
    return this.documentMap.get(t);
  }
  async getOrCreateDocument(e, t) {
    let r = this.getDocument(e);
    return r || (r = await this.langiumDocumentFactory.fromUri(e, t), this.addDocument(r), r);
  }
  createDocument(e, t, r) {
    if (r)
      return this.langiumDocumentFactory.fromString(t, e, r).then((i) => (this.addDocument(i), i));
    {
      const i = this.langiumDocumentFactory.fromString(t, e);
      return this.addDocument(i), i;
    }
  }
  hasDocument(e) {
    return this.documentMap.has(e.toString());
  }
  invalidateDocument(e) {
    const t = e.toString(), r = this.documentMap.get(t);
    return r && (this.serviceRegistry.getServices(e).references.Linker.unlink(r), r.state = U.Changed, r.precomputedScopes = void 0, r.diagnostics = void 0), r;
  }
  deleteDocument(e) {
    const t = e.toString(), r = this.documentMap.get(t);
    return r && (r.state = U.Changed, this.documentMap.delete(t)), r;
  }
}
const qi = Symbol("ref_resolving");
class Bm {
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.langiumDocuments = () => e.shared.workspace.LangiumDocuments, this.scopeProvider = e.references.ScopeProvider, this.astNodeLocator = e.workspace.AstNodeLocator;
  }
  async link(e, t = V.None) {
    for (const r of Nt(e.parseResult.value))
      await Ae(t), Jl(r).forEach((i) => this.doLink(i, e));
  }
  doLink(e, t) {
    var r;
    const i = e.reference;
    if (i._ref === void 0) {
      i._ref = qi;
      try {
        const s = this.getCandidate(e);
        if (Cr(s))
          i._ref = s;
        else if (i._nodeDescription = s, this.langiumDocuments().hasDocument(s.documentUri)) {
          const a2 = this.loadAstNode(s);
          i._ref = a2 ?? this.createLinkingError(e, s);
        } else
          i._ref = void 0;
      } catch (s) {
        console.error(`An error occurred while resolving reference to '${i.$refText}':`, s);
        const a2 = (r = s.message) !== null && r !== void 0 ? r : String(s);
        i._ref = Object.assign(Object.assign({}, e), { message: `An error occurred while resolving reference to '${i.$refText}': ${a2}` });
      }
      t.references.push(i);
    }
  }
  unlink(e) {
    for (const t of e.references)
      delete t._ref, delete t._nodeDescription;
    e.references = [];
  }
  getCandidate(e) {
    const r = this.scopeProvider.getScope(e).getElement(e.reference.$refText);
    return r ?? this.createLinkingError(e);
  }
  buildReference(e, t, r, i) {
    const s = this, a2 = {
      $refNode: r,
      $refText: i,
      get ref() {
        var o;
        if (ae(this._ref))
          return this._ref;
        if (md(this._nodeDescription)) {
          const l = s.loadAstNode(this._nodeDescription);
          this._ref = l ?? s.createLinkingError({ reference: a2, container: e, property: t }, this._nodeDescription);
        } else if (this._ref === void 0) {
          this._ref = qi;
          const l = ds(e).$document, u = s.getLinkedNode({ reference: a2, container: e, property: t });
          if (u.error && l && l.state < U.ComputedScopes)
            return this._ref = void 0;
          this._ref = (o = u.node) !== null && o !== void 0 ? o : u.error, this._nodeDescription = u.descr, l == null || l.references.push(this);
        } else if (this._ref === qi)
          throw new Error(`Cyclic reference resolution detected: ${s.astNodeLocator.getAstNodePath(e)}/${t} (symbol '${i}')`);
        return ae(this._ref) ? this._ref : void 0;
      },
      get $nodeDescription() {
        return this._nodeDescription;
      },
      get error() {
        return Cr(this._ref) ? this._ref : void 0;
      }
    };
    return a2;
  }
  getLinkedNode(e) {
    var t;
    try {
      const r = this.getCandidate(e);
      if (Cr(r))
        return { error: r };
      const i = this.loadAstNode(r);
      return i ? { node: i, descr: r } : {
        descr: r,
        error: this.createLinkingError(e, r)
      };
    } catch (r) {
      console.error(`An error occurred while resolving reference to '${e.reference.$refText}':`, r);
      const i = (t = r.message) !== null && t !== void 0 ? t : String(r);
      return {
        error: Object.assign(Object.assign({}, e), { message: `An error occurred while resolving reference to '${e.reference.$refText}': ${i}` })
      };
    }
  }
  loadAstNode(e) {
    if (e.node)
      return e.node;
    const t = this.langiumDocuments().getDocument(e.documentUri);
    if (t)
      return this.astNodeLocator.getAstNode(t.parseResult.value, e.path);
  }
  createLinkingError(e, t) {
    const r = ds(e.container).$document;
    r && r.state < U.ComputedScopes && console.warn(`Attempted reference resolution before document reached ComputedScopes state (${r.uri}).`);
    const i = this.reflection.getReferenceType(e);
    return Object.assign(Object.assign({}, e), { message: `Could not resolve reference to ${i} named '${e.reference.$refText}'.`, targetDescription: t });
  }
}
function Vm(n) {
  return typeof n.name == "string";
}
class Km {
  getName(e) {
    if (Vm(e))
      return e.name;
  }
  getNameNode(e) {
    return nu(e.$cstNode, "name");
  }
}
class Wm {
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.index = e.shared.workspace.IndexManager, this.nodeLocator = e.workspace.AstNodeLocator;
  }
  findDeclaration(e) {
    if (e) {
      const t = of(e), r = e.astNode;
      if (t && r) {
        const i = r[t.feature];
        if (Ue(i))
          return i.ref;
        if (Array.isArray(i)) {
          for (const s of i)
            if (Ue(s) && s.$refNode && s.$refNode.offset <= e.offset && s.$refNode.end >= e.end)
              return s.ref;
        }
      }
      if (r) {
        const i = this.nameProvider.getNameNode(r);
        if (i && (i === e || Td(e, i)))
          return r;
      }
    }
  }
  findDeclarationNode(e) {
    const t = this.findDeclaration(e);
    if (t != null && t.$cstNode) {
      const r = this.nameProvider.getNameNode(t);
      return r ?? t.$cstNode;
    }
  }
  findReferences(e, t) {
    const r = [];
    if (t.includeDeclaration) {
      const s = this.getReferenceToSelf(e);
      s && r.push(s);
    }
    let i = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e));
    return t.documentUri && (i = i.filter((s) => it.equals(s.sourceUri, t.documentUri))), r.push(...i), Z(r);
  }
  getReferenceToSelf(e) {
    const t = this.nameProvider.getNameNode(e);
    if (t) {
      const r = et(e), i = this.nodeLocator.getAstNodePath(e);
      return {
        sourceUri: r.uri,
        sourcePath: i,
        targetUri: r.uri,
        targetPath: i,
        segment: Hr(t),
        local: true
      };
    }
  }
}
class di {
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), e)
      for (const [t, r] of e)
        this.add(t, r);
  }
  /**
   * The total number of values in the multimap.
   */
  get size() {
    return ls.sum(Z(this.map.values()).map((e) => e.length));
  }
  /**
   * Clear all entries in the multimap.
   */
  clear() {
    this.map.clear();
  }
  /**
   * Operates differently depending on whether a `value` is given:
   *  * With a value, this method deletes the specific key / value pair from the multimap.
   *  * Without a value, all values associated with the given key are deleted.
   *
   * @returns `true` if a value existed and has been removed, or `false` if the specified
   *     key / value does not exist.
   */
  delete(e, t) {
    if (t === void 0)
      return this.map.delete(e);
    {
      const r = this.map.get(e);
      if (r) {
        const i = r.indexOf(t);
        if (i >= 0)
          return r.length === 1 ? this.map.delete(e) : r.splice(i, 1), true;
      }
      return false;
    }
  }
  /**
   * Returns an array of all values associated with the given key. If no value exists,
   * an empty array is returned.
   *
   * _Note:_ The returned array is assumed not to be modified. Use the `set` method to add a
   * value and `delete` to remove a value from the multimap.
   */
  get(e) {
    var t;
    return (t = this.map.get(e)) !== null && t !== void 0 ? t : [];
  }
  /**
   * Operates differently depending on whether a `value` is given:
   *  * With a value, this method returns `true` if the specific key / value pair is present in the multimap.
   *  * Without a value, this method returns `true` if the given key is present in the multimap.
   */
  has(e, t) {
    if (t === void 0)
      return this.map.has(e);
    {
      const r = this.map.get(e);
      return r ? r.indexOf(t) >= 0 : false;
    }
  }
  /**
   * Add the given key / value pair to the multimap.
   */
  add(e, t) {
    return this.map.has(e) ? this.map.get(e).push(t) : this.map.set(e, [t]), this;
  }
  /**
   * Add the given set of key / value pairs to the multimap.
   */
  addAll(e, t) {
    return this.map.has(e) ? this.map.get(e).push(...t) : this.map.set(e, Array.from(t)), this;
  }
  /**
   * Invokes the given callback function for every key / value pair in the multimap.
   */
  forEach(e) {
    this.map.forEach((t, r) => t.forEach((i) => e(i, r, this)));
  }
  /**
   * Returns an iterator of key, value pairs for every entry in the map.
   */
  [Symbol.iterator]() {
    return this.entries().iterator();
  }
  /**
   * Returns a stream of key, value pairs for every entry in the map.
   */
  entries() {
    return Z(this.map.entries()).flatMap(([e, t]) => t.map((r) => [e, r]));
  }
  /**
   * Returns a stream of keys in the map.
   */
  keys() {
    return Z(this.map.keys());
  }
  /**
   * Returns a stream of values in the map.
   */
  values() {
    return Z(this.map.values()).flat();
  }
  /**
   * Returns a stream of key, value set pairs for every key in the map.
   */
  entriesGroupedByKey() {
    return Z(this.map.entries());
  }
}
class dl {
  get size() {
    return this.map.size;
  }
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), this.inverse = /* @__PURE__ */ new Map(), e)
      for (const [t, r] of e)
        this.set(t, r);
  }
  clear() {
    this.map.clear(), this.inverse.clear();
  }
  set(e, t) {
    return this.map.set(e, t), this.inverse.set(t, e), this;
  }
  get(e) {
    return this.map.get(e);
  }
  getKey(e) {
    return this.inverse.get(e);
  }
  delete(e) {
    const t = this.map.get(e);
    return t !== void 0 ? (this.map.delete(e), this.inverse.delete(t), true) : false;
  }
}
class Hm {
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider;
  }
  async computeExports(e, t = V.None) {
    return this.computeExportsForNode(e.parseResult.value, e, void 0, t);
  }
  /**
   * Creates {@link AstNodeDescription AstNodeDescriptions} for the given {@link AstNode parentNode} and its children.
   * The list of children to be considered is determined by the function parameter {@link children}.
   * By default only the direct children of {@link parentNode} are visited, nested nodes are not exported.
   *
   * @param parentNode AST node to be exported, i.e., of which an {@link AstNodeDescription} shall be added to the returned list.
   * @param document The document containing the AST node to be exported.
   * @param children A function called with {@link parentNode} as single argument and returning an {@link Iterable} supplying the children to be visited, which must be directly or transitively contained in {@link parentNode}.
   * @param cancelToken Indicates when to cancel the current operation.
   * @throws `OperationCancelled` if a user action occurs during execution.
   * @returns A list of {@link AstNodeDescription AstNodeDescriptions} to be published to index.
   */
  async computeExportsForNode(e, t, r = Zs, i = V.None) {
    const s = [];
    this.exportNode(e, s, t);
    for (const a2 of r(e))
      await Ae(i), this.exportNode(a2, s, t);
    return s;
  }
  /**
   * Add a single node to the list of exports if it has a name. Override this method to change how
   * symbols are exported, e.g. by modifying their exported name.
   */
  exportNode(e, t, r) {
    const i = this.nameProvider.getName(e);
    i && t.push(this.descriptions.createDescription(e, i, r));
  }
  async computeLocalScopes(e, t = V.None) {
    const r = e.parseResult.value, i = new di();
    for (const s of tr(r))
      await Ae(t), this.processNode(s, e, i);
    return i;
  }
  /**
   * Process a single node during scopes computation. The default implementation makes the node visible
   * in the subtree of its container (if the node has a name). Override this method to change this,
   * e.g. by increasing the visibility to a higher level in the AST.
   */
  processNode(e, t, r) {
    const i = e.$container;
    if (i) {
      const s = this.nameProvider.getName(e);
      s && r.add(i, this.descriptions.createDescription(e, s, t));
    }
  }
}
class fl {
  constructor(e, t, r) {
    var i;
    this.elements = e, this.outerScope = t, this.caseInsensitive = (i = r == null ? void 0 : r.caseInsensitive) !== null && i !== void 0 ? i : false;
  }
  getAllElements() {
    return this.outerScope ? this.elements.concat(this.outerScope.getAllElements()) : this.elements;
  }
  getElement(e) {
    const t = this.caseInsensitive ? this.elements.find((r) => r.name.toLowerCase() === e.toLowerCase()) : this.elements.find((r) => r.name === e);
    if (t)
      return t;
    if (this.outerScope)
      return this.outerScope.getElement(e);
  }
}
class jm {
  constructor(e, t, r) {
    var i;
    this.elements = /* @__PURE__ */ new Map(), this.caseInsensitive = (i = r == null ? void 0 : r.caseInsensitive) !== null && i !== void 0 ? i : false;
    for (const s of e) {
      const a2 = this.caseInsensitive ? s.name.toLowerCase() : s.name;
      this.elements.set(a2, s);
    }
    this.outerScope = t;
  }
  getElement(e) {
    const t = this.caseInsensitive ? e.toLowerCase() : e, r = this.elements.get(t);
    if (r)
      return r;
    if (this.outerScope)
      return this.outerScope.getElement(e);
  }
  getAllElements() {
    let e = Z(this.elements.values());
    return this.outerScope && (e = e.concat(this.outerScope.getAllElements())), e;
  }
}
class pc {
  constructor() {
    this.toDispose = [], this.isDisposed = false;
  }
  onDispose(e) {
    this.toDispose.push(e);
  }
  dispose() {
    this.throwIfDisposed(), this.clear(), this.isDisposed = true, this.toDispose.forEach((e) => e.dispose());
  }
  throwIfDisposed() {
    if (this.isDisposed)
      throw new Error("This cache has already been disposed");
  }
}
class zm extends pc {
  constructor() {
    super(...arguments), this.cache = /* @__PURE__ */ new Map();
  }
  has(e) {
    return this.throwIfDisposed(), this.cache.has(e);
  }
  set(e, t) {
    this.throwIfDisposed(), this.cache.set(e, t);
  }
  get(e, t) {
    if (this.throwIfDisposed(), this.cache.has(e))
      return this.cache.get(e);
    if (t) {
      const r = t();
      return this.cache.set(e, r), r;
    } else
      return;
  }
  delete(e) {
    return this.throwIfDisposed(), this.cache.delete(e);
  }
  clear() {
    this.throwIfDisposed(), this.cache.clear();
  }
}
class qm extends pc {
  constructor(e) {
    super(), this.cache = /* @__PURE__ */ new Map(), this.converter = e ?? ((t) => t);
  }
  has(e, t) {
    return this.throwIfDisposed(), this.cacheForContext(e).has(t);
  }
  set(e, t, r) {
    this.throwIfDisposed(), this.cacheForContext(e).set(t, r);
  }
  get(e, t, r) {
    this.throwIfDisposed();
    const i = this.cacheForContext(e);
    if (i.has(t))
      return i.get(t);
    if (r) {
      const s = r();
      return i.set(t, s), s;
    } else
      return;
  }
  delete(e, t) {
    return this.throwIfDisposed(), this.cacheForContext(e).delete(t);
  }
  clear(e) {
    if (this.throwIfDisposed(), e) {
      const t = this.converter(e);
      this.cache.delete(t);
    } else
      this.cache.clear();
  }
  cacheForContext(e) {
    const t = this.converter(e);
    let r = this.cache.get(t);
    return r || (r = /* @__PURE__ */ new Map(), this.cache.set(t, r)), r;
  }
}
class Ym extends zm {
  /**
   * Creates a new workspace cache.
   *
   * @param sharedServices Service container instance to hook into document lifecycle events.
   * @param state Optional document state on which the cache should evict.
   * If not provided, the cache will evict on `DocumentBuilder#onUpdate`.
   * *Deleted* documents are considered in both cases.
   */
  constructor(e, t) {
    super(), t ? (this.toDispose.push(e.workspace.DocumentBuilder.onBuildPhase(t, () => {
      this.clear();
    })), this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((r, i) => {
      i.length > 0 && this.clear();
    }))) : this.toDispose.push(e.workspace.DocumentBuilder.onUpdate(() => {
      this.clear();
    }));
  }
}
class Xm {
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider, this.indexManager = e.shared.workspace.IndexManager, this.globalScopeCache = new Ym(e.shared);
  }
  getScope(e) {
    const t = [], r = this.reflection.getReferenceType(e), i = et(e.container).precomputedScopes;
    if (i) {
      let a2 = e.container;
      do {
        const o = i.get(a2);
        o.length > 0 && t.push(Z(o).filter((l) => this.reflection.isSubtype(l.type, r))), a2 = a2.$container;
      } while (a2);
    }
    let s = this.getGlobalScope(r, e);
    for (let a2 = t.length - 1; a2 >= 0; a2--)
      s = this.createScope(t[a2], s);
    return s;
  }
  /**
   * Create a scope for the given collection of AST node descriptions.
   */
  createScope(e, t, r) {
    return new fl(Z(e), t, r);
  }
  /**
   * Create a scope for the given collection of AST nodes, which need to be transformed into respective
   * descriptions first. This is done using the `NameProvider` and `AstNodeDescriptionProvider` services.
   */
  createScopeForNodes(e, t, r) {
    const i = Z(e).map((s) => {
      const a2 = this.nameProvider.getName(s);
      if (a2)
        return this.descriptions.createDescription(s, a2);
    }).nonNullable();
    return new fl(i, t, r);
  }
  /**
   * Create a window scope filtered for the given reference type.
   */
  getGlobalScope(e, t) {
    return this.globalScopeCache.get(e, () => new jm(this.indexManager.allElements(e)));
  }
}
function Jm(n) {
  return typeof n.$comment == "string";
}
function hl(n) {
  return typeof n == "object" && !!n && ("$ref" in n || "$error" in n);
}
class Qm {
  constructor(e) {
    this.ignoreProperties = /* @__PURE__ */ new Set(["$container", "$containerProperty", "$containerIndex", "$document", "$cstNode"]), this.langiumDocuments = e.shared.workspace.LangiumDocuments, this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider, this.commentProvider = e.documentation.CommentProvider;
  }
  serialize(e, t) {
    const r = t ?? {}, i = t == null ? void 0 : t.replacer, s = (o, l) => this.replacer(o, l, r), a2 = i ? (o, l) => i(o, l, s) : s;
    try {
      return this.currentDocument = et(e), JSON.stringify(e, a2, t == null ? void 0 : t.space);
    } finally {
      this.currentDocument = void 0;
    }
  }
  deserialize(e, t) {
    const r = t ?? {}, i = JSON.parse(e);
    return this.linkNode(i, i, r), i;
  }
  replacer(e, t, { refText: r, sourceText: i, textRegions: s, comments: a2, uriConverter: o }) {
    var l, u, c, d;
    if (!this.ignoreProperties.has(e))
      if (Ue(t)) {
        const h = t.ref, f = r ? t.$refText : void 0;
        if (h) {
          const m = et(h);
          let g = "";
          this.currentDocument && this.currentDocument !== m && (o ? g = o(m.uri, t) : g = m.uri.toString());
          const A = this.astNodeLocator.getAstNodePath(h);
          return {
            $ref: `${g}#${A}`,
            $refText: f
          };
        } else
          return {
            $error: (u = (l = t.error) === null || l === void 0 ? void 0 : l.message) !== null && u !== void 0 ? u : "Could not resolve reference",
            $refText: f
          };
      } else if (ae(t)) {
        let h;
        if (s && (h = this.addAstNodeRegionWithAssignmentsTo(Object.assign({}, t)), (!e || t.$document) && (h != null && h.$textRegion) && (h.$textRegion.documentURI = (c = this.currentDocument) === null || c === void 0 ? void 0 : c.uri.toString())), i && !e && (h ?? (h = Object.assign({}, t)), h.$sourceText = (d = t.$cstNode) === null || d === void 0 ? void 0 : d.text), a2) {
          h ?? (h = Object.assign({}, t));
          const f = this.commentProvider.getComment(t);
          f && (h.$comment = f.replace(/\r/g, ""));
        }
        return h ?? t;
      } else
        return t;
  }
  addAstNodeRegionWithAssignmentsTo(e) {
    const t = (r) => ({
      offset: r.offset,
      end: r.end,
      length: r.length,
      range: r.range
    });
    if (e.$cstNode) {
      const r = e.$textRegion = t(e.$cstNode), i = r.assignments = {};
      return Object.keys(e).filter((s) => !s.startsWith("$")).forEach((s) => {
        const a2 = rf(e.$cstNode, s).map(t);
        a2.length !== 0 && (i[s] = a2);
      }), e;
    }
  }
  linkNode(e, t, r, i, s, a2) {
    for (const [l, u] of Object.entries(e))
      if (Array.isArray(u))
        for (let c = 0; c < u.length; c++) {
          const d = u[c];
          hl(d) ? u[c] = this.reviveReference(e, l, t, d, r) : ae(d) && this.linkNode(d, t, r, e, l, c);
        }
      else
        hl(u) ? e[l] = this.reviveReference(e, l, t, u, r) : ae(u) && this.linkNode(u, t, r, e, l);
    const o = e;
    o.$container = i, o.$containerProperty = s, o.$containerIndex = a2;
  }
  reviveReference(e, t, r, i, s) {
    let a2 = i.$refText, o = i.$error;
    if (i.$ref) {
      const l = this.getRefNode(r, i.$ref, s.uriConverter);
      if (ae(l))
        return a2 || (a2 = this.nameProvider.getName(l)), {
          $refText: a2 ?? "",
          ref: l
        };
      o = l;
    }
    if (o) {
      const l = {
        $refText: a2 ?? ""
      };
      return l.error = {
        container: e,
        property: t,
        message: o,
        reference: l
      }, l;
    } else
      return;
  }
  getRefNode(e, t, r) {
    try {
      const i = t.indexOf("#");
      if (i === 0) {
        const l = this.astNodeLocator.getAstNode(e, t.substring(1));
        return l || "Could not resolve path: " + t;
      }
      if (i < 0) {
        const l = r ? r(t) : Rt.parse(t), u = this.langiumDocuments.getDocument(l);
        return u ? u.parseResult.value : "Could not find document for URI: " + t;
      }
      const s = r ? r(t.substring(0, i)) : Rt.parse(t.substring(0, i)), a2 = this.langiumDocuments.getDocument(s);
      if (!a2)
        return "Could not find document for URI: " + t;
      if (i === t.length - 1)
        return a2.parseResult.value;
      const o = this.astNodeLocator.getAstNode(a2.parseResult.value, t.substring(i + 1));
      return o || "Could not resolve URI: " + t;
    } catch (i) {
      return String(i);
    }
  }
}
class Zm {
  /**
   * @deprecated Use the new `fileExtensionMap` (or `languageIdMap`) property instead.
   */
  get map() {
    return this.fileExtensionMap;
  }
  constructor(e) {
    this.languageIdMap = /* @__PURE__ */ new Map(), this.fileExtensionMap = /* @__PURE__ */ new Map(), this.textDocuments = e == null ? void 0 : e.workspace.TextDocuments;
  }
  register(e) {
    const t = e.LanguageMetaData;
    for (const r of t.fileExtensions)
      this.fileExtensionMap.has(r) && console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${t.languageId}'.`), this.fileExtensionMap.set(r, e);
    this.languageIdMap.set(t.languageId, e), this.languageIdMap.size === 1 ? this.singleton = e : this.singleton = void 0;
  }
  getServices(e) {
    var t, r;
    if (this.singleton !== void 0)
      return this.singleton;
    if (this.languageIdMap.size === 0)
      throw new Error("The service registry is empty. Use `register` to register the services of a language.");
    const i = (r = (t = this.textDocuments) === null || t === void 0 ? void 0 : t.get(e)) === null || r === void 0 ? void 0 : r.languageId;
    if (i !== void 0) {
      const o = this.languageIdMap.get(i);
      if (o)
        return o;
    }
    const s = it.extname(e), a2 = this.fileExtensionMap.get(s);
    if (!a2)
      throw i ? new Error(`The service registry contains no services for the extension '${s}' for language '${i}'.`) : new Error(`The service registry contains no services for the extension '${s}'.`);
    return a2;
  }
  hasServices(e) {
    try {
      return this.getServices(e), true;
    } catch {
      return false;
    }
  }
  get all() {
    return Array.from(this.languageIdMap.values());
  }
}
function xn(n) {
  return { code: n };
}
var fi;
(function(n) {
  n.all = ["fast", "slow", "built-in"];
})(fi || (fi = {}));
class eg {
  constructor(e) {
    this.entries = new di(), this.entriesBefore = [], this.entriesAfter = [], this.reflection = e.shared.AstReflection;
  }
  /**
   * Register a set of validation checks. Each value in the record can be either a single validation check (i.e. a function)
   * or an array of validation checks.
   *
   * @param checksRecord Set of validation checks to register.
   * @param category Optional category for the validation checks (defaults to `'fast'`).
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  register(e, t = this, r = "fast") {
    if (r === "built-in")
      throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");
    for (const [i, s] of Object.entries(e)) {
      const a2 = s;
      if (Array.isArray(a2))
        for (const o of a2) {
          const l = {
            check: this.wrapValidationException(o, t),
            category: r
          };
          this.addEntry(i, l);
        }
      else if (typeof a2 == "function") {
        const o = {
          check: this.wrapValidationException(a2, t),
          category: r
        };
        this.addEntry(i, o);
      } else
        er();
    }
  }
  wrapValidationException(e, t) {
    return async (r, i, s) => {
      await this.handleException(() => e.call(t, r, i, s), "An error occurred during validation", i, r);
    };
  }
  async handleException(e, t, r, i) {
    try {
      await e();
    } catch (s) {
      if (wi(s))
        throw s;
      console.error(`${t}:`, s), s instanceof Error && s.stack && console.error(s.stack);
      const a2 = s instanceof Error ? s.message : String(s);
      r("error", `${t}: ${a2}`, { node: i });
    }
  }
  addEntry(e, t) {
    if (e === "AstNode") {
      this.entries.add("AstNode", t);
      return;
    }
    for (const r of this.reflection.getAllSubTypes(e))
      this.entries.add(r, t);
  }
  getChecks(e, t) {
    let r = Z(this.entries.get(e)).concat(this.entries.get("AstNode"));
    return t && (r = r.filter((i) => t.includes(i.category))), r.map((i) => i.check);
  }
  /**
   * Register logic which will be executed once before validating all the nodes of an AST/Langium document.
   * This helps to prepare or initialize some information which are required or reusable for the following checks on the AstNodes.
   *
   * As an example, for validating unique fully-qualified names of nodes in the AST,
   * here the map for mapping names to nodes could be established.
   * During the usual checks on the nodes, they are put into this map with their name.
   *
   * Note that this approach makes validations stateful, which is relevant e.g. when cancelling the validation.
   * Therefore it is recommended to clear stored information
   * _before_ validating an AST to validate each AST unaffected from other ASTs
   * AND _after_ validating the AST to free memory by information which are no longer used.
   *
   * @param checkBefore a set-up function which will be called once before actually validating an AST
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  registerBeforeDocument(e, t = this) {
    this.entriesBefore.push(this.wrapPreparationException(e, "An error occurred during set-up of the validation", t));
  }
  /**
   * Register logic which will be executed once after validating all the nodes of an AST/Langium document.
   * This helps to finally evaluate information which are collected during the checks on the AstNodes.
   *
   * As an example, for validating unique fully-qualified names of nodes in the AST,
   * here the map with all the collected nodes and their names is checked
   * and validation hints are created for all nodes with the same name.
   *
   * Note that this approach makes validations stateful, which is relevant e.g. when cancelling the validation.
   * Therefore it is recommended to clear stored information
   * _before_ validating an AST to validate each AST unaffected from other ASTs
   * AND _after_ validating the AST to free memory by information which are no longer used.
   *
   * @param checkBefore a set-up function which will be called once before actually validating an AST
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  registerAfterDocument(e, t = this) {
    this.entriesAfter.push(this.wrapPreparationException(e, "An error occurred during tear-down of the validation", t));
  }
  wrapPreparationException(e, t, r) {
    return async (i, s, a2, o) => {
      await this.handleException(() => e.call(r, i, s, a2, o), t, s, i);
    };
  }
  get checksBefore() {
    return this.entriesBefore;
  }
  get checksAfter() {
    return this.entriesAfter;
  }
}
class tg {
  constructor(e) {
    this.validationRegistry = e.validation.ValidationRegistry, this.metadata = e.LanguageMetaData;
  }
  async validateDocument(e, t = {}, r = V.None) {
    const i = e.parseResult, s = [];
    if (await Ae(r), (!t.categories || t.categories.includes("built-in")) && (this.processLexingErrors(i, s, t), t.stopAfterLexingErrors && s.some((a2) => {
      var o;
      return ((o = a2.data) === null || o === void 0 ? void 0 : o.code) === be.LexingError;
    }) || (this.processParsingErrors(i, s, t), t.stopAfterParsingErrors && s.some((a2) => {
      var o;
      return ((o = a2.data) === null || o === void 0 ? void 0 : o.code) === be.ParsingError;
    })) || (this.processLinkingErrors(e, s, t), t.stopAfterLinkingErrors && s.some((a2) => {
      var o;
      return ((o = a2.data) === null || o === void 0 ? void 0 : o.code) === be.LinkingError;
    }))))
      return s;
    try {
      s.push(...await this.validateAst(i.value, t, r));
    } catch (a2) {
      if (wi(a2))
        throw a2;
      console.error("An error occurred during validation:", a2);
    }
    return await Ae(r), s;
  }
  processLexingErrors(e, t, r) {
    var i, s, a2;
    const o = [...e.lexerErrors, ...(s = (i = e.lexerReport) === null || i === void 0 ? void 0 : i.diagnostics) !== null && s !== void 0 ? s : []];
    for (const l of o) {
      const u = (a2 = l.severity) !== null && a2 !== void 0 ? a2 : "error", c = {
        severity: Yi(u),
        range: {
          start: {
            line: l.line - 1,
            character: l.column - 1
          },
          end: {
            line: l.line - 1,
            character: l.column + l.length - 1
          }
        },
        message: l.message,
        data: rg(u),
        source: this.getSource()
      };
      t.push(c);
    }
  }
  processParsingErrors(e, t, r) {
    for (const i of e.parserErrors) {
      let s;
      if (isNaN(i.token.startOffset)) {
        if ("previousToken" in i) {
          const a2 = i.previousToken;
          if (isNaN(a2.startOffset)) {
            const o = { line: 0, character: 0 };
            s = { start: o, end: o };
          } else {
            const o = { line: a2.endLine - 1, character: a2.endColumn };
            s = { start: o, end: o };
          }
        }
      } else
        s = cs(i.token);
      if (s) {
        const a2 = {
          severity: Yi("error"),
          range: s,
          message: i.message,
          data: xn(be.ParsingError),
          source: this.getSource()
        };
        t.push(a2);
      }
    }
  }
  processLinkingErrors(e, t, r) {
    for (const i of e.references) {
      const s = i.error;
      if (s) {
        const a2 = {
          node: s.container,
          property: s.property,
          index: s.index,
          data: {
            code: be.LinkingError,
            containerType: s.container.$type,
            property: s.property,
            refText: s.reference.$refText
          }
        };
        t.push(this.toDiagnostic("error", s.message, a2));
      }
    }
  }
  async validateAst(e, t, r = V.None) {
    const i = [], s = (a2, o, l) => {
      i.push(this.toDiagnostic(a2, o, l));
    };
    return await this.validateAstBefore(e, t, s, r), await this.validateAstNodes(e, t, s, r), await this.validateAstAfter(e, t, s, r), i;
  }
  async validateAstBefore(e, t, r, i = V.None) {
    var s;
    const a2 = this.validationRegistry.checksBefore;
    for (const o of a2)
      await Ae(i), await o(e, r, (s = t.categories) !== null && s !== void 0 ? s : [], i);
  }
  async validateAstNodes(e, t, r, i = V.None) {
    await Promise.all(Nt(e).map(async (s) => {
      await Ae(i);
      const a2 = this.validationRegistry.getChecks(s.$type, t.categories);
      for (const o of a2)
        await o(s, r, i);
    }));
  }
  async validateAstAfter(e, t, r, i = V.None) {
    var s;
    const a2 = this.validationRegistry.checksAfter;
    for (const o of a2)
      await Ae(i), await o(e, r, (s = t.categories) !== null && s !== void 0 ? s : [], i);
  }
  toDiagnostic(e, t, r) {
    return {
      message: t,
      range: ng(r),
      severity: Yi(e),
      code: r.code,
      codeDescription: r.codeDescription,
      tags: r.tags,
      relatedInformation: r.relatedInformation,
      data: r.data,
      source: this.getSource()
    };
  }
  getSource() {
    return this.metadata.languageId;
  }
}
function ng(n) {
  if (n.range)
    return n.range;
  let e;
  return typeof n.property == "string" ? e = nu(n.node.$cstNode, n.property, n.index) : typeof n.keyword == "string" && (e = sf(n.node.$cstNode, n.keyword, n.index)), e ?? (e = n.node.$cstNode), e ? e.range : {
    start: { line: 0, character: 0 },
    end: { line: 0, character: 0 }
  };
}
function Yi(n) {
  switch (n) {
    case "error":
      return 1;
    case "warning":
      return 2;
    case "info":
      return 3;
    case "hint":
      return 4;
    default:
      throw new Error("Invalid diagnostic severity: " + n);
  }
}
function rg(n) {
  switch (n) {
    case "error":
      return xn(be.LexingError);
    case "warning":
      return xn(be.LexingWarning);
    case "info":
      return xn(be.LexingInfo);
    case "hint":
      return xn(be.LexingHint);
    default:
      throw new Error("Invalid diagnostic severity: " + n);
  }
}
var be;
(function(n) {
  n.LexingError = "lexing-error", n.LexingWarning = "lexing-warning", n.LexingInfo = "lexing-info", n.LexingHint = "lexing-hint", n.ParsingError = "parsing-error", n.LinkingError = "linking-error";
})(be || (be = {}));
class ig {
  constructor(e) {
    this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider;
  }
  createDescription(e, t, r) {
    const i = r ?? et(e);
    t ?? (t = this.nameProvider.getName(e));
    const s = this.astNodeLocator.getAstNodePath(e);
    if (!t)
      throw new Error(`Node at path ${s} has no name.`);
    let a2;
    const o = () => {
      var l;
      return a2 ?? (a2 = Hr((l = this.nameProvider.getNameNode(e)) !== null && l !== void 0 ? l : e.$cstNode));
    };
    return {
      node: e,
      name: t,
      get nameSegment() {
        return o();
      },
      selectionSegment: Hr(e.$cstNode),
      type: e.$type,
      documentUri: i.uri,
      path: s
    };
  }
}
class sg {
  constructor(e) {
    this.nodeLocator = e.workspace.AstNodeLocator;
  }
  async createDescriptions(e, t = V.None) {
    const r = [], i = e.parseResult.value;
    for (const s of Nt(i))
      await Ae(t), Jl(s).filter((a2) => !Cr(a2)).forEach((a2) => {
        const o = this.createDescription(a2);
        o && r.push(o);
      });
    return r;
  }
  createDescription(e) {
    const t = e.reference.$nodeDescription, r = e.reference.$refNode;
    if (!t || !r)
      return;
    const i = et(e.container).uri;
    return {
      sourceUri: i,
      sourcePath: this.nodeLocator.getAstNodePath(e.container),
      targetUri: t.documentUri,
      targetPath: t.path,
      segment: Hr(r),
      local: it.equals(t.documentUri, i)
    };
  }
}
class ag {
  constructor() {
    this.segmentSeparator = "/", this.indexSeparator = "@";
  }
  getAstNodePath(e) {
    if (e.$container) {
      const t = this.getAstNodePath(e.$container), r = this.getPathSegment(e);
      return t + this.segmentSeparator + r;
    }
    return "";
  }
  getPathSegment({ $containerProperty: e, $containerIndex: t }) {
    if (!e)
      throw new Error("Missing '$containerProperty' in AST node.");
    return t !== void 0 ? e + this.indexSeparator + t : e;
  }
  getAstNode(e, t) {
    return t.split(this.segmentSeparator).reduce((i, s) => {
      if (!i || s.length === 0)
        return i;
      const a2 = s.indexOf(this.indexSeparator);
      if (a2 > 0) {
        const o = s.substring(0, a2), l = parseInt(s.substring(a2 + 1)), u = i[o];
        return u == null ? void 0 : u[l];
      }
      return i[s];
    }, e);
  }
}
class og {
  constructor(e) {
    this._ready = new Ta(), this.settings = {}, this.workspaceConfig = false, this.onConfigurationSectionUpdateEmitter = new cc(), this.serviceRegistry = e.ServiceRegistry;
  }
  get ready() {
    return this._ready.promise;
  }
  initialize(e) {
    var t, r;
    this.workspaceConfig = (r = (t = e.capabilities.workspace) === null || t === void 0 ? void 0 : t.configuration) !== null && r !== void 0 ? r : false;
  }
  async initialized(e) {
    if (this.workspaceConfig) {
      if (e.register) {
        const t = this.serviceRegistry.all;
        e.register({
          // Listen to configuration changes for all languages
          section: t.map((r) => this.toSectionName(r.LanguageMetaData.languageId))
        });
      }
      if (e.fetchConfiguration) {
        const t = this.serviceRegistry.all.map((i) => ({
          // Fetch the configuration changes for all languages
          section: this.toSectionName(i.LanguageMetaData.languageId)
        })), r = await e.fetchConfiguration(t);
        t.forEach((i, s) => {
          this.updateSectionConfiguration(i.section, r[s]);
        });
      }
    }
    this._ready.resolve();
  }
  /**
   *  Updates the cached configurations using the `change` notification parameters.
   *
   * @param change The parameters of a change configuration notification.
   * `settings` property of the change object could be expressed as `Record<string, Record<string, any>>`
   */
  updateConfiguration(e) {
    e.settings && Object.keys(e.settings).forEach((t) => {
      const r = e.settings[t];
      this.updateSectionConfiguration(t, r), this.onConfigurationSectionUpdateEmitter.fire({ section: t, configuration: r });
    });
  }
  updateSectionConfiguration(e, t) {
    this.settings[e] = t;
  }
  /**
  * Returns a configuration value stored for the given language.
  *
  * @param language The language id
  * @param configuration Configuration name
  */
  async getConfiguration(e, t) {
    await this.ready;
    const r = this.toSectionName(e);
    if (this.settings[r])
      return this.settings[r][t];
  }
  toSectionName(e) {
    return `${e}`;
  }
  get onConfigurationSectionUpdate() {
    return this.onConfigurationSectionUpdateEmitter.event;
  }
}
var wn;
(function(n) {
  function e(t) {
    return {
      dispose: async () => await t()
    };
  }
  n.create = e;
})(wn || (wn = {}));
class lg {
  constructor(e) {
    this.updateBuildOptions = {
      // Default: run only the built-in validation checks and those in the _fast_ category (includes those without category)
      validation: {
        categories: ["built-in", "fast"]
      }
    }, this.updateListeners = [], this.buildPhaseListeners = new di(), this.documentPhaseListeners = new di(), this.buildState = /* @__PURE__ */ new Map(), this.documentBuildWaiters = /* @__PURE__ */ new Map(), this.currentState = U.Changed, this.langiumDocuments = e.workspace.LangiumDocuments, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.textDocuments = e.workspace.TextDocuments, this.indexManager = e.workspace.IndexManager, this.serviceRegistry = e.ServiceRegistry;
  }
  async build(e, t = {}, r = V.None) {
    var i, s;
    for (const a2 of e) {
      const o = a2.uri.toString();
      if (a2.state === U.Validated) {
        if (typeof t.validation == "boolean" && t.validation)
          a2.state = U.IndexedReferences, a2.diagnostics = void 0, this.buildState.delete(o);
        else if (typeof t.validation == "object") {
          const l = this.buildState.get(o), u = (i = l == null ? void 0 : l.result) === null || i === void 0 ? void 0 : i.validationChecks;
          if (u) {
            const d = ((s = t.validation.categories) !== null && s !== void 0 ? s : fi.all).filter((h) => !u.includes(h));
            d.length > 0 && (this.buildState.set(o, {
              completed: false,
              options: {
                validation: Object.assign(Object.assign({}, t.validation), { categories: d })
              },
              result: l.result
            }), a2.state = U.IndexedReferences);
          }
        }
      } else
        this.buildState.delete(o);
    }
    this.currentState = U.Changed, await this.emitUpdate(e.map((a2) => a2.uri), []), await this.buildDocuments(e, t, r);
  }
  async update(e, t, r = V.None) {
    this.currentState = U.Changed;
    for (const a2 of t)
      this.langiumDocuments.deleteDocument(a2), this.buildState.delete(a2.toString()), this.indexManager.remove(a2);
    for (const a2 of e) {
      if (!this.langiumDocuments.invalidateDocument(a2)) {
        const l = this.langiumDocumentFactory.fromModel({ $type: "INVALID" }, a2);
        l.state = U.Changed, this.langiumDocuments.addDocument(l);
      }
      this.buildState.delete(a2.toString());
    }
    const i = Z(e).concat(t).map((a2) => a2.toString()).toSet();
    this.langiumDocuments.all.filter((a2) => !i.has(a2.uri.toString()) && this.shouldRelink(a2, i)).forEach((a2) => {
      this.serviceRegistry.getServices(a2.uri).references.Linker.unlink(a2), a2.state = Math.min(a2.state, U.ComputedScopes), a2.diagnostics = void 0;
    }), await this.emitUpdate(e, t), await Ae(r);
    const s = this.sortDocuments(this.langiumDocuments.all.filter((a2) => {
      var o;
      return a2.state < U.Linked || !(!((o = this.buildState.get(a2.uri.toString())) === null || o === void 0) && o.completed);
    }).toArray());
    await this.buildDocuments(s, this.updateBuildOptions, r);
  }
  async emitUpdate(e, t) {
    await Promise.all(this.updateListeners.map((r) => r(e, t)));
  }
  /**
   * Sort the given documents by priority. By default, documents with an open text document are prioritized.
   * This is useful to ensure that visible documents show their diagnostics before all other documents.
   *
   * This improves the responsiveness in large workspaces as users usually don't care about diagnostics
   * in files that are currently not opened in the editor.
   */
  sortDocuments(e) {
    let t = 0, r = e.length - 1;
    for (; t < r; ) {
      for (; t < e.length && this.hasTextDocument(e[t]); )
        t++;
      for (; r >= 0 && !this.hasTextDocument(e[r]); )
        r--;
      t < r && ([e[t], e[r]] = [e[r], e[t]]);
    }
    return e;
  }
  hasTextDocument(e) {
    var t;
    return !!(!((t = this.textDocuments) === null || t === void 0) && t.get(e.uri));
  }
  /**
   * Check whether the given document should be relinked after changes were found in the given URIs.
   */
  shouldRelink(e, t) {
    return e.references.some((r) => r.error !== void 0) ? true : this.indexManager.isAffected(e, t);
  }
  onUpdate(e) {
    return this.updateListeners.push(e), wn.create(() => {
      const t = this.updateListeners.indexOf(e);
      t >= 0 && this.updateListeners.splice(t, 1);
    });
  }
  /**
   * Build the given documents by stepping through all build phases. If a document's state indicates
   * that a certain build phase is already done, the phase is skipped for that document.
   *
   * @param documents The documents to build.
   * @param options the {@link BuildOptions} to use.
   * @param cancelToken A cancellation token that can be used to cancel the build.
   * @returns A promise that resolves when the build is done.
   */
  async buildDocuments(e, t, r) {
    this.prepareBuild(e, t), await this.runCancelable(e, U.Parsed, r, (s) => this.langiumDocumentFactory.update(s, r)), await this.runCancelable(e, U.IndexedContent, r, (s) => this.indexManager.updateContent(s, r)), await this.runCancelable(e, U.ComputedScopes, r, async (s) => {
      const a2 = this.serviceRegistry.getServices(s.uri).references.ScopeComputation;
      s.precomputedScopes = await a2.computeLocalScopes(s, r);
    }), await this.runCancelable(e, U.Linked, r, (s) => this.serviceRegistry.getServices(s.uri).references.Linker.link(s, r)), await this.runCancelable(e, U.IndexedReferences, r, (s) => this.indexManager.updateReferences(s, r));
    const i = e.filter((s) => this.shouldValidate(s));
    await this.runCancelable(i, U.Validated, r, (s) => this.validate(s, r));
    for (const s of e) {
      const a2 = this.buildState.get(s.uri.toString());
      a2 && (a2.completed = true);
    }
  }
  /**
   * Runs prior to beginning the build process to update the {@link DocumentBuildState} for each document
   *
   * @param documents collection of documents to be built
   * @param options the {@link BuildOptions} to use
   */
  prepareBuild(e, t) {
    for (const r of e) {
      const i = r.uri.toString(), s = this.buildState.get(i);
      (!s || s.completed) && this.buildState.set(i, {
        completed: false,
        options: t,
        result: s == null ? void 0 : s.result
      });
    }
  }
  /**
   * Runs a cancelable operation on a set of documents to bring them to a specified {@link DocumentState}.
   *
   * @param documents The array of documents to process.
   * @param targetState The target {@link DocumentState} to bring the documents to.
   * @param cancelToken A token that can be used to cancel the operation.
   * @param callback A function to be called for each document.
   * @returns A promise that resolves when all documents have been processed or the operation is canceled.
   * @throws Will throw `OperationCancelled` if the operation is canceled via a `CancellationToken`.
   */
  async runCancelable(e, t, r, i) {
    const s = e.filter((o) => o.state < t);
    for (const o of s)
      await Ae(r), await i(o), o.state = t, await this.notifyDocumentPhase(o, t, r);
    const a2 = e.filter((o) => o.state === t);
    await this.notifyBuildPhase(a2, t, r), this.currentState = t;
  }
  onBuildPhase(e, t) {
    return this.buildPhaseListeners.add(e, t), wn.create(() => {
      this.buildPhaseListeners.delete(e, t);
    });
  }
  onDocumentPhase(e, t) {
    return this.documentPhaseListeners.add(e, t), wn.create(() => {
      this.documentPhaseListeners.delete(e, t);
    });
  }
  waitUntil(e, t, r) {
    let i;
    if (t && "path" in t ? i = t : r = t, r ?? (r = V.None), i) {
      const s = this.langiumDocuments.getDocument(i);
      if (s && s.state > e)
        return Promise.resolve(i);
    }
    return this.currentState >= e ? Promise.resolve(void 0) : r.isCancellationRequested ? Promise.reject(ci) : new Promise((s, a2) => {
      const o = this.onBuildPhase(e, () => {
        if (o.dispose(), l.dispose(), i) {
          const u = this.langiumDocuments.getDocument(i);
          s(u == null ? void 0 : u.uri);
        } else
          s(void 0);
      }), l = r.onCancellationRequested(() => {
        o.dispose(), l.dispose(), a2(ci);
      });
    });
  }
  async notifyDocumentPhase(e, t, r) {
    const s = this.documentPhaseListeners.get(t).slice();
    for (const a2 of s)
      try {
        await a2(e, r);
      } catch (o) {
        if (!wi(o))
          throw o;
      }
  }
  async notifyBuildPhase(e, t, r) {
    if (e.length === 0)
      return;
    const s = this.buildPhaseListeners.get(t).slice();
    for (const a2 of s)
      await Ae(r), await a2(e, r);
  }
  /**
   * Determine whether the given document should be validated during a build. The default
   * implementation checks the `validation` property of the build options. If it's set to `true`
   * or a `ValidationOptions` object, the document is included in the validation phase.
   */
  shouldValidate(e) {
    return !!this.getBuildOptions(e).validation;
  }
  /**
   * Run validation checks on the given document and store the resulting diagnostics in the document.
   * If the document already contains diagnostics, the new ones are added to the list.
   */
  async validate(e, t) {
    var r, i;
    const s = this.serviceRegistry.getServices(e.uri).validation.DocumentValidator, a2 = this.getBuildOptions(e).validation, o = typeof a2 == "object" ? a2 : void 0, l = await s.validateDocument(e, o, t);
    e.diagnostics ? e.diagnostics.push(...l) : e.diagnostics = l;
    const u = this.buildState.get(e.uri.toString());
    if (u) {
      (r = u.result) !== null && r !== void 0 || (u.result = {});
      const c = (i = o == null ? void 0 : o.categories) !== null && i !== void 0 ? i : fi.all;
      u.result.validationChecks ? u.result.validationChecks.push(...c) : u.result.validationChecks = [...c];
    }
  }
  getBuildOptions(e) {
    var t, r;
    return (r = (t = this.buildState.get(e.uri.toString())) === null || t === void 0 ? void 0 : t.options) !== null && r !== void 0 ? r : {};
  }
}
class ug {
  constructor(e) {
    this.symbolIndex = /* @__PURE__ */ new Map(), this.symbolByTypeIndex = new qm(), this.referenceIndex = /* @__PURE__ */ new Map(), this.documents = e.workspace.LangiumDocuments, this.serviceRegistry = e.ServiceRegistry, this.astReflection = e.AstReflection;
  }
  findAllReferences(e, t) {
    const r = et(e).uri, i = [];
    return this.referenceIndex.forEach((s) => {
      s.forEach((a2) => {
        it.equals(a2.targetUri, r) && a2.targetPath === t && i.push(a2);
      });
    }), Z(i);
  }
  allElements(e, t) {
    let r = Z(this.symbolIndex.keys());
    return t && (r = r.filter((i) => !t || t.has(i))), r.map((i) => this.getFileDescriptions(i, e)).flat();
  }
  getFileDescriptions(e, t) {
    var r;
    return t ? this.symbolByTypeIndex.get(e, t, () => {
      var s;
      return ((s = this.symbolIndex.get(e)) !== null && s !== void 0 ? s : []).filter((o) => this.astReflection.isSubtype(o.type, t));
    }) : (r = this.symbolIndex.get(e)) !== null && r !== void 0 ? r : [];
  }
  remove(e) {
    const t = e.toString();
    this.symbolIndex.delete(t), this.symbolByTypeIndex.clear(t), this.referenceIndex.delete(t);
  }
  async updateContent(e, t = V.None) {
    const i = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e, t), s = e.uri.toString();
    this.symbolIndex.set(s, i), this.symbolByTypeIndex.clear(s);
  }
  async updateReferences(e, t = V.None) {
    const i = await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e, t);
    this.referenceIndex.set(e.uri.toString(), i);
  }
  isAffected(e, t) {
    const r = this.referenceIndex.get(e.uri.toString());
    return r ? r.some((i) => !i.local && t.has(i.targetUri.toString())) : false;
  }
}
class cg {
  constructor(e) {
    this.initialBuildOptions = {}, this._ready = new Ta(), this.serviceRegistry = e.ServiceRegistry, this.langiumDocuments = e.workspace.LangiumDocuments, this.documentBuilder = e.workspace.DocumentBuilder, this.fileSystemProvider = e.workspace.FileSystemProvider, this.mutex = e.workspace.WorkspaceLock;
  }
  get ready() {
    return this._ready.promise;
  }
  get workspaceFolders() {
    return this.folders;
  }
  initialize(e) {
    var t;
    this.folders = (t = e.workspaceFolders) !== null && t !== void 0 ? t : void 0;
  }
  initialized(e) {
    return this.mutex.write((t) => {
      var r;
      return this.initializeWorkspace((r = this.folders) !== null && r !== void 0 ? r : [], t);
    });
  }
  async initializeWorkspace(e, t = V.None) {
    const r = await this.performStartup(e);
    await Ae(t), await this.documentBuilder.build(r, this.initialBuildOptions, t);
  }
  /**
   * Performs the uninterruptable startup sequence of the workspace manager.
   * This methods loads all documents in the workspace and other documents and returns them.
   */
  async performStartup(e) {
    const t = this.serviceRegistry.all.flatMap((s) => s.LanguageMetaData.fileExtensions), r = [], i = (s) => {
      r.push(s), this.langiumDocuments.hasDocument(s.uri) || this.langiumDocuments.addDocument(s);
    };
    return await this.loadAdditionalDocuments(e, i), await Promise.all(e.map((s) => [s, this.getRootFolder(s)]).map(async (s) => this.traverseFolder(...s, t, i))), this._ready.resolve(), r;
  }
  /**
   * Load all additional documents that shall be visible in the context of the given workspace
   * folders and add them to the collector. This can be used to include built-in libraries of
   * your language, which can be either loaded from provided files or constructed in memory.
   */
  loadAdditionalDocuments(e, t) {
    return Promise.resolve();
  }
  /**
   * Determine the root folder of the source documents in the given workspace folder.
   * The default implementation returns the URI of the workspace folder, but you can override
   * this to return a subfolder like `src` instead.
   */
  getRootFolder(e) {
    return Rt.parse(e.uri);
  }
  /**
   * Traverse the file system folder identified by the given URI and its subfolders. All
   * contained files that match the file extensions are added to the collector.
   */
  async traverseFolder(e, t, r, i) {
    const s = await this.fileSystemProvider.readDirectory(t);
    await Promise.all(s.map(async (a2) => {
      if (this.includeEntry(e, a2, r)) {
        if (a2.isDirectory)
          await this.traverseFolder(e, a2.uri, r, i);
        else if (a2.isFile) {
          const o = await this.langiumDocuments.getOrCreateDocument(a2.uri);
          i(o);
        }
      }
    }));
  }
  /**
   * Determine whether the given folder entry shall be included while indexing the workspace.
   */
  includeEntry(e, t, r) {
    const i = it.basename(t.uri);
    if (i.startsWith("."))
      return false;
    if (t.isDirectory)
      return i !== "node_modules" && i !== "out";
    if (t.isFile) {
      const s = it.extname(t.uri);
      return r.includes(s);
    }
    return false;
  }
}
class dg {
  buildUnexpectedCharactersMessage(e, t, r, i, s) {
    return ys.buildUnexpectedCharactersMessage(e, t, r, i, s);
  }
  buildUnableToPopLexerModeMessage(e) {
    return ys.buildUnableToPopLexerModeMessage(e);
  }
}
const fg = { mode: "full" };
class hg {
  constructor(e) {
    this.errorMessageProvider = e.parser.LexerErrorMessageProvider, this.tokenBuilder = e.parser.TokenBuilder;
    const t = this.tokenBuilder.buildTokens(e.Grammar, {
      caseInsensitive: e.LanguageMetaData.caseInsensitive
    });
    this.tokenTypes = this.toTokenTypeDictionary(t);
    const r = pl(t) ? Object.values(t) : t, i = e.LanguageMetaData.mode === "production";
    this.chevrotainLexer = new fe(r, {
      positionTracking: "full",
      skipValidations: i,
      errorMessageProvider: this.errorMessageProvider
    });
  }
  get definition() {
    return this.tokenTypes;
  }
  tokenize(e, t = fg) {
    var r, i, s;
    const a2 = this.chevrotainLexer.tokenize(e);
    return {
      tokens: a2.tokens,
      errors: a2.errors,
      hidden: (r = a2.groups.hidden) !== null && r !== void 0 ? r : [],
      report: (s = (i = this.tokenBuilder).flushLexingReport) === null || s === void 0 ? void 0 : s.call(i, e)
    };
  }
  toTokenTypeDictionary(e) {
    if (pl(e))
      return e;
    const t = mc(e) ? Object.values(e.modes).flat() : e, r = {};
    return t.forEach((i) => r[i.name] = i), r;
  }
}
function pg(n) {
  return Array.isArray(n) && (n.length === 0 || "name" in n[0]);
}
function mc(n) {
  return n && "modes" in n && "defaultMode" in n;
}
function pl(n) {
  return !pg(n) && !mc(n);
}
function mg(n, e, t) {
  let r, i;
  typeof n == "string" ? (i = e, r = t) : (i = n.range.start, r = e), i || (i = P.create(0, 0));
  const s = gc(n), a2 = Ra(r), o = Tg({
    lines: s,
    position: i,
    options: a2
  });
  return $g({
    index: 0,
    tokens: o,
    position: i
  });
}
function gg(n, e) {
  const t = Ra(e), r = gc(n);
  if (r.length === 0)
    return false;
  const i = r[0], s = r[r.length - 1], a2 = t.start, o = t.end;
  return !!(a2 != null && a2.exec(i)) && !!(o != null && o.exec(s));
}
function gc(n) {
  let e = "";
  return typeof n == "string" ? e = n : e = n.text, e.split(Hd);
}
const ml = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy, yg = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;
function Tg(n) {
  var e, t, r;
  const i = [];
  let s = n.position.line, a2 = n.position.character;
  for (let o = 0; o < n.lines.length; o++) {
    const l = o === 0, u = o === n.lines.length - 1;
    let c = n.lines[o], d = 0;
    if (l && n.options.start) {
      const f = (e = n.options.start) === null || e === void 0 ? void 0 : e.exec(c);
      f && (d = f.index + f[0].length);
    } else {
      const f = (t = n.options.line) === null || t === void 0 ? void 0 : t.exec(c);
      f && (d = f.index + f[0].length);
    }
    if (u) {
      const f = (r = n.options.end) === null || r === void 0 ? void 0 : r.exec(c);
      f && (c = c.substring(0, f.index));
    }
    if (c = c.substring(0, Eg(c)), js(c, d) >= c.length) {
      if (i.length > 0) {
        const f = P.create(s, a2);
        i.push({
          type: "break",
          content: "",
          range: O.create(f, f)
        });
      }
    } else {
      ml.lastIndex = d;
      const f = ml.exec(c);
      if (f) {
        const m = f[0], g = f[1], A = P.create(s, a2 + d), y = P.create(s, a2 + d + m.length);
        i.push({
          type: "tag",
          content: g,
          range: O.create(A, y)
        }), d += m.length, d = js(c, d);
      }
      if (d < c.length) {
        const m = c.substring(d), g = Array.from(m.matchAll(yg));
        i.push(...Rg(g, m, s, a2 + d));
      }
    }
    s++, a2 = 0;
  }
  return i.length > 0 && i[i.length - 1].type === "break" ? i.slice(0, -1) : i;
}
function Rg(n, e, t, r) {
  const i = [];
  if (n.length === 0) {
    const s = P.create(t, r), a2 = P.create(t, r + e.length);
    i.push({
      type: "text",
      content: e,
      range: O.create(s, a2)
    });
  } else {
    let s = 0;
    for (const o of n) {
      const l = o.index, u = e.substring(s, l);
      u.length > 0 && i.push({
        type: "text",
        content: e.substring(s, l),
        range: O.create(P.create(t, s + r), P.create(t, l + r))
      });
      let c = u.length + 1;
      const d = o[1];
      if (i.push({
        type: "inline-tag",
        content: d,
        range: O.create(P.create(t, s + c + r), P.create(t, s + c + d.length + r))
      }), c += d.length, o.length === 4) {
        c += o[2].length;
        const h = o[3];
        i.push({
          type: "text",
          content: h,
          range: O.create(P.create(t, s + c + r), P.create(t, s + c + h.length + r))
        });
      } else
        i.push({
          type: "text",
          content: "",
          range: O.create(P.create(t, s + c + r), P.create(t, s + c + r))
        });
      s = l + o[0].length;
    }
    const a2 = e.substring(s);
    a2.length > 0 && i.push({
      type: "text",
      content: a2,
      range: O.create(P.create(t, s + r), P.create(t, s + r + a2.length))
    });
  }
  return i;
}
const vg = /\S/, Ag = /\s*$/;
function js(n, e) {
  const t = n.substring(e).match(vg);
  return t ? e + t.index : n.length;
}
function Eg(n) {
  const e = n.match(Ag);
  if (e && typeof e.index == "number")
    return e.index;
}
function $g(n) {
  var e, t, r, i;
  const s = P.create(n.position.line, n.position.character);
  if (n.tokens.length === 0)
    return new gl([], O.create(s, s));
  const a2 = [];
  for (; n.index < n.tokens.length; ) {
    const u = kg(n, a2[a2.length - 1]);
    u && a2.push(u);
  }
  const o = (t = (e = a2[0]) === null || e === void 0 ? void 0 : e.range.start) !== null && t !== void 0 ? t : s, l = (i = (r = a2[a2.length - 1]) === null || r === void 0 ? void 0 : r.range.end) !== null && i !== void 0 ? i : s;
  return new gl(a2, O.create(o, l));
}
function kg(n, e) {
  const t = n.tokens[n.index];
  if (t.type === "tag")
    return Tc(n, false);
  if (t.type === "text" || t.type === "inline-tag")
    return yc(n);
  xg(t, e), n.index++;
}
function xg(n, e) {
  if (e) {
    const t = new vc("", n.range);
    "inlines" in e ? e.inlines.push(t) : e.content.inlines.push(t);
  }
}
function yc(n) {
  let e = n.tokens[n.index];
  const t = e;
  let r = e;
  const i = [];
  for (; e && e.type !== "break" && e.type !== "tag"; )
    i.push(Sg(n)), r = e, e = n.tokens[n.index];
  return new zs(i, O.create(t.range.start, r.range.end));
}
function Sg(n) {
  return n.tokens[n.index].type === "inline-tag" ? Tc(n, true) : Rc(n);
}
function Tc(n, e) {
  const t = n.tokens[n.index++], r = t.content.substring(1), i = n.tokens[n.index];
  if ((i == null ? void 0 : i.type) === "text")
    if (e) {
      const s = Rc(n);
      return new Ji(r, new zs([s], s.range), e, O.create(t.range.start, s.range.end));
    } else {
      const s = yc(n);
      return new Ji(r, s, e, O.create(t.range.start, s.range.end));
    }
  else {
    const s = t.range;
    return new Ji(r, new zs([], s), e, s);
  }
}
function Rc(n) {
  const e = n.tokens[n.index++];
  return new vc(e.content, e.range);
}
function Ra(n) {
  if (!n)
    return Ra({
      start: "/**",
      end: "*/",
      line: "*"
    });
  const { start: e, end: t, line: r } = n;
  return {
    start: Xi(e, true),
    end: Xi(t, false),
    line: Xi(r, true)
  };
}
function Xi(n, e) {
  if (typeof n == "string" || typeof n == "object") {
    const t = typeof n == "string" ? vi(n) : n.source;
    return e ? new RegExp(`^\\s*${t}`) : new RegExp(`\\s*${t}\\s*$`);
  } else
    return n;
}
class gl {
  constructor(e, t) {
    this.elements = e, this.range = t;
  }
  getTag(e) {
    return this.getAllTags().find((t) => t.name === e);
  }
  getTags(e) {
    return this.getAllTags().filter((t) => t.name === e);
  }
  getAllTags() {
    return this.elements.filter((e) => "name" in e);
  }
  toString() {
    let e = "";
    for (const t of this.elements)
      if (e.length === 0)
        e = t.toString();
      else {
        const r = t.toString();
        e += yl(e) + r;
      }
    return e.trim();
  }
  toMarkdown(e) {
    let t = "";
    for (const r of this.elements)
      if (t.length === 0)
        t = r.toMarkdown(e);
      else {
        const i = r.toMarkdown(e);
        t += yl(t) + i;
      }
    return t.trim();
  }
}
class Ji {
  constructor(e, t, r, i) {
    this.name = e, this.content = t, this.inline = r, this.range = i;
  }
  toString() {
    let e = `@${this.name}`;
    const t = this.content.toString();
    return this.content.inlines.length === 1 ? e = `${e} ${t}` : this.content.inlines.length > 1 && (e = `${e}
${t}`), this.inline ? `{${e}}` : e;
  }
  toMarkdown(e) {
    var t, r;
    return (r = (t = e == null ? void 0 : e.renderTag) === null || t === void 0 ? void 0 : t.call(e, this)) !== null && r !== void 0 ? r : this.toMarkdownDefault(e);
  }
  toMarkdownDefault(e) {
    const t = this.content.toMarkdown(e);
    if (this.inline) {
      const s = Ig(this.name, t, e ?? {});
      if (typeof s == "string")
        return s;
    }
    let r = "";
    (e == null ? void 0 : e.tag) === "italic" || (e == null ? void 0 : e.tag) === void 0 ? r = "*" : (e == null ? void 0 : e.tag) === "bold" ? r = "**" : (e == null ? void 0 : e.tag) === "bold-italic" && (r = "***");
    let i = `${r}@${this.name}${r}`;
    return this.content.inlines.length === 1 ? i = `${i} — ${t}` : this.content.inlines.length > 1 && (i = `${i}
${t}`), this.inline ? `{${i}}` : i;
  }
}
function Ig(n, e, t) {
  var r, i;
  if (n === "linkplain" || n === "linkcode" || n === "link") {
    const s = e.indexOf(" ");
    let a2 = e;
    if (s > 0) {
      const l = js(e, s);
      a2 = e.substring(l), e = e.substring(0, s);
    }
    return (n === "linkcode" || n === "link" && t.link === "code") && (a2 = `\`${a2}\``), (i = (r = t.renderLink) === null || r === void 0 ? void 0 : r.call(t, e, a2)) !== null && i !== void 0 ? i : Cg(e, a2);
  }
}
function Cg(n, e) {
  try {
    return Rt.parse(n, true), `[${e}](${n})`;
  } catch {
    return n;
  }
}
class zs {
  constructor(e, t) {
    this.inlines = e, this.range = t;
  }
  toString() {
    let e = "";
    for (let t = 0; t < this.inlines.length; t++) {
      const r = this.inlines[t], i = this.inlines[t + 1];
      e += r.toString(), i && i.range.start.line > r.range.start.line && (e += `
`);
    }
    return e;
  }
  toMarkdown(e) {
    let t = "";
    for (let r = 0; r < this.inlines.length; r++) {
      const i = this.inlines[r], s = this.inlines[r + 1];
      t += i.toMarkdown(e), s && s.range.start.line > i.range.start.line && (t += `
`);
    }
    return t;
  }
}
class vc {
  constructor(e, t) {
    this.text = e, this.range = t;
  }
  toString() {
    return this.text;
  }
  toMarkdown() {
    return this.text;
  }
}
function yl(n) {
  return n.endsWith(`
`) ? `
` : `

`;
}
class Ng {
  constructor(e) {
    this.indexManager = e.shared.workspace.IndexManager, this.commentProvider = e.documentation.CommentProvider;
  }
  getDocumentation(e) {
    const t = this.commentProvider.getComment(e);
    if (t && gg(t))
      return mg(t).toMarkdown({
        renderLink: (i, s) => this.documentationLinkRenderer(e, i, s),
        renderTag: (i) => this.documentationTagRenderer(e, i)
      });
  }
  documentationLinkRenderer(e, t, r) {
    var i;
    const s = (i = this.findNameInPrecomputedScopes(e, t)) !== null && i !== void 0 ? i : this.findNameInGlobalScope(e, t);
    if (s && s.nameSegment) {
      const a2 = s.nameSegment.range.start.line + 1, o = s.nameSegment.range.start.character + 1, l = s.documentUri.with({ fragment: `L${a2},${o}` });
      return `[${r}](${l.toString()})`;
    } else
      return;
  }
  documentationTagRenderer(e, t) {
  }
  findNameInPrecomputedScopes(e, t) {
    const i = et(e).precomputedScopes;
    if (!i)
      return;
    let s = e;
    do {
      const o = i.get(s).find((l) => l.name === t);
      if (o)
        return o;
      s = s.$container;
    } while (s);
  }
  findNameInGlobalScope(e, t) {
    return this.indexManager.allElements().find((i) => i.name === t);
  }
}
class wg {
  constructor(e) {
    this.grammarConfig = () => e.parser.GrammarConfig;
  }
  getComment(e) {
    var t;
    return Jm(e) ? e.$comment : (t = Ed(e.$cstNode, this.grammarConfig().multilineCommentRules)) === null || t === void 0 ? void 0 : t.text;
  }
}
class Lg {
  constructor(e) {
    this.syncParser = e.parser.LangiumParser;
  }
  parse(e, t) {
    return Promise.resolve(this.syncParser.parse(e));
  }
}
class _g {
  constructor() {
    this.previousTokenSource = new ya(), this.writeQueue = [], this.readQueue = [], this.done = true;
  }
  write(e) {
    this.cancelWrite();
    const t = Dm();
    return this.previousTokenSource = t, this.enqueue(this.writeQueue, e, t.token);
  }
  read(e) {
    return this.enqueue(this.readQueue, e);
  }
  enqueue(e, t, r = V.None) {
    const i = new Ta(), s = {
      action: t,
      deferred: i,
      cancellationToken: r
    };
    return e.push(s), this.performNextOperation(), i.promise;
  }
  async performNextOperation() {
    if (!this.done)
      return;
    const e = [];
    if (this.writeQueue.length > 0)
      e.push(this.writeQueue.shift());
    else if (this.readQueue.length > 0)
      e.push(...this.readQueue.splice(0, this.readQueue.length));
    else
      return;
    this.done = false, await Promise.all(e.map(async ({ action: t, deferred: r, cancellationToken: i }) => {
      try {
        const s = await Promise.resolve().then(() => t(i));
        r.resolve(s);
      } catch (s) {
        wi(s) ? r.resolve(void 0) : r.reject(s);
      }
    })), this.done = true, this.performNextOperation();
  }
  cancelWrite() {
    this.previousTokenSource.cancel();
  }
}
class bg {
  constructor(e) {
    this.grammarElementIdMap = new dl(), this.tokenTypeIdMap = new dl(), this.grammar = e.Grammar, this.lexer = e.parser.Lexer, this.linker = e.references.Linker;
  }
  dehydrate(e) {
    return {
      lexerErrors: e.lexerErrors,
      lexerReport: e.lexerReport ? this.dehydrateLexerReport(e.lexerReport) : void 0,
      // We need to create shallow copies of the errors
      // The original errors inherit from the `Error` class, which is not transferable across worker threads
      parserErrors: e.parserErrors.map((t) => Object.assign(Object.assign({}, t), { message: t.message })),
      value: this.dehydrateAstNode(e.value, this.createDehyrationContext(e.value))
    };
  }
  dehydrateLexerReport(e) {
    return e;
  }
  createDehyrationContext(e) {
    const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const i of Nt(e))
      t.set(i, {});
    if (e.$cstNode)
      for (const i of us(e.$cstNode))
        r.set(i, {});
    return {
      astNodes: t,
      cstNodes: r
    };
  }
  dehydrateAstNode(e, t) {
    const r = t.astNodes.get(e);
    r.$type = e.$type, r.$containerIndex = e.$containerIndex, r.$containerProperty = e.$containerProperty, e.$cstNode !== void 0 && (r.$cstNode = this.dehydrateCstNode(e.$cstNode, t));
    for (const [i, s] of Object.entries(e))
      if (!i.startsWith("$"))
        if (Array.isArray(s)) {
          const a2 = [];
          r[i] = a2;
          for (const o of s)
            ae(o) ? a2.push(this.dehydrateAstNode(o, t)) : Ue(o) ? a2.push(this.dehydrateReference(o, t)) : a2.push(o);
        } else
          ae(s) ? r[i] = this.dehydrateAstNode(s, t) : Ue(s) ? r[i] = this.dehydrateReference(s, t) : s !== void 0 && (r[i] = s);
    return r;
  }
  dehydrateReference(e, t) {
    const r = {};
    return r.$refText = e.$refText, e.$refNode && (r.$refNode = t.cstNodes.get(e.$refNode)), r;
  }
  dehydrateCstNode(e, t) {
    const r = t.cstNodes.get(e);
    return Vl(e) ? r.fullText = e.fullText : r.grammarSource = this.getGrammarElementId(e.grammarSource), r.hidden = e.hidden, r.astNode = t.astNodes.get(e.astNode), _n(e) ? r.content = e.content.map((i) => this.dehydrateCstNode(i, t)) : Bl(e) && (r.tokenType = e.tokenType.name, r.offset = e.offset, r.length = e.length, r.startLine = e.range.start.line, r.startColumn = e.range.start.character, r.endLine = e.range.end.line, r.endColumn = e.range.end.character), r;
  }
  hydrate(e) {
    const t = e.value, r = this.createHydrationContext(t);
    return "$cstNode" in t && this.hydrateCstNode(t.$cstNode, r), {
      lexerErrors: e.lexerErrors,
      lexerReport: e.lexerReport,
      parserErrors: e.parserErrors,
      value: this.hydrateAstNode(t, r)
    };
  }
  createHydrationContext(e) {
    const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const s of Nt(e))
      t.set(s, {});
    let i;
    if (e.$cstNode)
      for (const s of us(e.$cstNode)) {
        let a2;
        "fullText" in s ? (a2 = new Qu(s.fullText), i = a2) : "content" in s ? a2 = new ma() : "tokenType" in s && (a2 = this.hydrateCstLeafNode(s)), a2 && (r.set(s, a2), a2.root = i);
      }
    return {
      astNodes: t,
      cstNodes: r
    };
  }
  hydrateAstNode(e, t) {
    const r = t.astNodes.get(e);
    r.$type = e.$type, r.$containerIndex = e.$containerIndex, r.$containerProperty = e.$containerProperty, e.$cstNode && (r.$cstNode = t.cstNodes.get(e.$cstNode));
    for (const [i, s] of Object.entries(e))
      if (!i.startsWith("$"))
        if (Array.isArray(s)) {
          const a2 = [];
          r[i] = a2;
          for (const o of s)
            ae(o) ? a2.push(this.setParent(this.hydrateAstNode(o, t), r)) : Ue(o) ? a2.push(this.hydrateReference(o, r, i, t)) : a2.push(o);
        } else
          ae(s) ? r[i] = this.setParent(this.hydrateAstNode(s, t), r) : Ue(s) ? r[i] = this.hydrateReference(s, r, i, t) : s !== void 0 && (r[i] = s);
    return r;
  }
  setParent(e, t) {
    return e.$container = t, e;
  }
  hydrateReference(e, t, r, i) {
    return this.linker.buildReference(t, r, i.cstNodes.get(e.$refNode), e.$refText);
  }
  hydrateCstNode(e, t, r = 0) {
    const i = t.cstNodes.get(e);
    if (typeof e.grammarSource == "number" && (i.grammarSource = this.getGrammarElement(e.grammarSource)), i.astNode = t.astNodes.get(e.astNode), _n(i))
      for (const s of e.content) {
        const a2 = this.hydrateCstNode(s, t, r++);
        i.content.push(a2);
      }
    return i;
  }
  hydrateCstLeafNode(e) {
    const t = this.getTokenType(e.tokenType), r = e.offset, i = e.length, s = e.startLine, a2 = e.startColumn, o = e.endLine, l = e.endColumn, u = e.hidden;
    return new Fs(r, i, {
      start: {
        line: s,
        character: a2
      },
      end: {
        line: o,
        character: l
      }
    }, t, u);
  }
  getTokenType(e) {
    return this.lexer.definition[e];
  }
  getGrammarElementId(e) {
    if (e)
      return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.get(e);
  }
  getGrammarElement(e) {
    return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.getKey(e);
  }
  createGrammarElementIdMap() {
    let e = 0;
    for (const t of Nt(this.grammar))
      kd(t) && this.grammarElementIdMap.set(t, e++);
  }
}
function ot(n) {
  return {
    documentation: {
      CommentProvider: (e) => new wg(e),
      DocumentationProvider: (e) => new Ng(e)
    },
    parser: {
      AsyncParser: (e) => new Lg(e),
      GrammarConfig: (e) => mf(e),
      LangiumParser: (e) => Em(e),
      CompletionParser: (e) => Am(e),
      ValueConverter: () => new oc(),
      TokenBuilder: () => new ac(),
      Lexer: (e) => new hg(e),
      ParserErrorMessageProvider: () => new tc(),
      LexerErrorMessageProvider: () => new dg()
    },
    workspace: {
      AstNodeLocator: () => new ag(),
      AstNodeDescriptionProvider: (e) => new ig(e),
      ReferenceDescriptionProvider: (e) => new sg(e)
    },
    references: {
      Linker: (e) => new Bm(e),
      NameProvider: () => new Km(),
      ScopeProvider: (e) => new Xm(e),
      ScopeComputation: (e) => new Hm(e),
      References: (e) => new Wm(e)
    },
    serializer: {
      Hydrator: (e) => new bg(e),
      JsonSerializer: (e) => new Qm(e)
    },
    validation: {
      DocumentValidator: (e) => new tg(e),
      ValidationRegistry: (e) => new eg(e)
    },
    shared: () => n.shared
  };
}
function lt(n) {
  return {
    ServiceRegistry: (e) => new Zm(e),
    workspace: {
      LangiumDocuments: (e) => new Um(e),
      LangiumDocumentFactory: (e) => new Gm(e),
      DocumentBuilder: (e) => new lg(e),
      IndexManager: (e) => new ug(e),
      WorkspaceManager: (e) => new cg(e),
      FileSystemProvider: (e) => n.fileSystemProvider(e),
      WorkspaceLock: () => new _g(),
      ConfigurationProvider: (e) => new og(e)
    }
  };
}
var Tl;
(function(n) {
  n.merge = (e, t) => hi(hi({}, e), t);
})(Tl || (Tl = {}));
function oe(n, e, t, r, i, s, a2, o, l) {
  const u = [n, e, t, r, i, s, a2, o, l].reduce(hi, {});
  return Ac(u);
}
const Og = Symbol("isProxy");
function Ac(n, e) {
  const t = new Proxy({}, {
    deleteProperty: () => false,
    set: () => {
      throw new Error("Cannot set property on injected service container");
    },
    get: (r, i) => i === Og ? true : vl(r, i, n, e || t),
    getOwnPropertyDescriptor: (r, i) => (vl(r, i, n, e || t), Object.getOwnPropertyDescriptor(r, i)),
    // used by for..in
    has: (r, i) => i in n,
    // used by ..in..
    ownKeys: () => [...Object.getOwnPropertyNames(n)]
    // used by for..in
  });
  return t;
}
const Rl = Symbol();
function vl(n, e, t, r) {
  if (e in n) {
    if (n[e] instanceof Error)
      throw new Error("Construction failure. Please make sure that your dependencies are constructable.", { cause: n[e] });
    if (n[e] === Rl)
      throw new Error('Cycle detected. Please make "' + String(e) + '" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies');
    return n[e];
  } else if (e in t) {
    const i = t[e];
    n[e] = Rl;
    try {
      n[e] = typeof i == "function" ? i(r) : Ac(i, r);
    } catch (s) {
      throw n[e] = s instanceof Error ? s : void 0, s;
    }
    return n[e];
  } else
    return;
}
function hi(n, e) {
  if (e) {
    for (const [t, r] of Object.entries(e))
      if (r !== void 0) {
        const i = n[t];
        i !== null && r !== null && typeof i == "object" && typeof r == "object" ? n[t] = hi(i, r) : n[t] = r;
      }
  }
  return n;
}
class Pg {
  readFile() {
    throw new Error("No file system is available.");
  }
  async readDirectory() {
    return [];
  }
}
const ut = {
  fileSystemProvider: () => new Pg()
}, Mg = {
  Grammar: () => {
  },
  LanguageMetaData: () => ({
    caseInsensitive: false,
    fileExtensions: [".langium"],
    languageId: "langium"
  })
}, Dg = {
  AstReflection: () => new Xl()
};
function Fg() {
  const n = oe(lt(ut), Dg), e = oe(ot({ shared: n }), Mg);
  return n.ServiceRegistry.register(e), e;
}
function $t(n) {
  var e;
  const t = Fg(), r = t.serializer.JsonSerializer.deserialize(n);
  return t.shared.workspace.LangiumDocumentFactory.fromModel(r, Rt.parse(`memory://${(e = r.name) !== null && e !== void 0 ? e : "grammar"}.langium`)), r;
}
var Gg = Object.defineProperty, v = (n, e) => Gg(n, "name", { value: e, configurable: true }), Al = "Statement", Mr = "Architecture";
function Ug(n) {
  return De.isInstance(n, Mr);
}
v(Ug, "isArchitecture");
var Ar = "Axis", Sn = "Branch";
function Bg(n) {
  return De.isInstance(n, Sn);
}
v(Bg, "isBranch");
var Er = "Checkout", $r = "CherryPicking", Qi = "ClassDefStatement", In = "Commit";
function Vg(n) {
  return De.isInstance(n, In);
}
v(Vg, "isCommit");
var Zi = "Curve", es = "Edge", ts = "Entry", Cn = "GitGraph";
function Kg(n) {
  return De.isInstance(n, Cn);
}
v(Kg, "isGitGraph");
var ns = "Group", Dr = "Info";
function Wg(n) {
  return De.isInstance(n, Dr);
}
v(Wg, "isInfo");
var kr = "Item", rs = "Junction", Nn = "Merge";
function Hg(n) {
  return De.isInstance(n, Nn);
}
v(Hg, "isMerge");
var is = "Option", Fr = "Packet";
function jg(n) {
  return De.isInstance(n, Fr);
}
v(jg, "isPacket");
var Gr = "PacketBlock";
function zg(n) {
  return De.isInstance(n, Gr);
}
v(zg, "isPacketBlock");
var Ur = "Pie";
function qg(n) {
  return De.isInstance(n, Ur);
}
v(qg, "isPie");
var Br = "PieSection";
function Yg(n) {
  return De.isInstance(n, Br);
}
v(Yg, "isPieSection");
var ss = "Radar", as = "Service", Vr = "Treemap";
function Xg(n) {
  return De.isInstance(n, Vr);
}
v(Xg, "isTreemap");
var os = "TreemapRow", xr = "Direction", Sr = "Leaf", Ir = "Section", Mn, Ec = (Mn = class extends Ul {
  getAllTypes() {
    return [Mr, Ar, Sn, Er, $r, Qi, In, Zi, xr, es, ts, Cn, ns, Dr, kr, rs, Sr, Nn, is, Fr, Gr, Ur, Br, ss, Ir, as, Al, Vr, os];
  }
  computeIsSubtype(e, t) {
    switch (e) {
      case Sn:
      case Er:
      case $r:
      case In:
      case Nn:
        return this.isSubtype(Al, t);
      case xr:
        return this.isSubtype(Cn, t);
      case Sr:
      case Ir:
        return this.isSubtype(kr, t);
      default:
        return false;
    }
  }
  getReferenceType(e) {
    const t = `${e.container.$type}:${e.property}`;
    switch (t) {
      case "Entry:axis":
        return Ar;
      default:
        throw new Error(`${t} is not a valid reference id.`);
    }
  }
  getTypeMetaData(e) {
    switch (e) {
      case Mr:
        return {
          name: Mr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "edges", defaultValue: [] },
            { name: "groups", defaultValue: [] },
            { name: "junctions", defaultValue: [] },
            { name: "services", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Ar:
        return {
          name: Ar,
          properties: [
            { name: "label" },
            { name: "name" }
          ]
        };
      case Sn:
        return {
          name: Sn,
          properties: [
            { name: "name" },
            { name: "order" }
          ]
        };
      case Er:
        return {
          name: Er,
          properties: [
            { name: "branch" }
          ]
        };
      case $r:
        return {
          name: $r,
          properties: [
            { name: "id" },
            { name: "parent" },
            { name: "tags", defaultValue: [] }
          ]
        };
      case Qi:
        return {
          name: Qi,
          properties: [
            { name: "className" },
            { name: "styleText" }
          ]
        };
      case In:
        return {
          name: In,
          properties: [
            { name: "id" },
            { name: "message" },
            { name: "tags", defaultValue: [] },
            { name: "type" }
          ]
        };
      case Zi:
        return {
          name: Zi,
          properties: [
            { name: "entries", defaultValue: [] },
            { name: "label" },
            { name: "name" }
          ]
        };
      case es:
        return {
          name: es,
          properties: [
            { name: "lhsDir" },
            { name: "lhsGroup", defaultValue: false },
            { name: "lhsId" },
            { name: "lhsInto", defaultValue: false },
            { name: "rhsDir" },
            { name: "rhsGroup", defaultValue: false },
            { name: "rhsId" },
            { name: "rhsInto", defaultValue: false },
            { name: "title" }
          ]
        };
      case ts:
        return {
          name: ts,
          properties: [
            { name: "axis" },
            { name: "value" }
          ]
        };
      case Cn:
        return {
          name: Cn,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "statements", defaultValue: [] },
            { name: "title" }
          ]
        };
      case ns:
        return {
          name: ns,
          properties: [
            { name: "icon" },
            { name: "id" },
            { name: "in" },
            { name: "title" }
          ]
        };
      case Dr:
        return {
          name: Dr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "title" }
          ]
        };
      case kr:
        return {
          name: kr,
          properties: [
            { name: "classSelector" },
            { name: "name" }
          ]
        };
      case rs:
        return {
          name: rs,
          properties: [
            { name: "id" },
            { name: "in" }
          ]
        };
      case Nn:
        return {
          name: Nn,
          properties: [
            { name: "branch" },
            { name: "id" },
            { name: "tags", defaultValue: [] },
            { name: "type" }
          ]
        };
      case is:
        return {
          name: is,
          properties: [
            { name: "name" },
            { name: "value", defaultValue: false }
          ]
        };
      case Fr:
        return {
          name: Fr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "blocks", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Gr:
        return {
          name: Gr,
          properties: [
            { name: "bits" },
            { name: "end" },
            { name: "label" },
            { name: "start" }
          ]
        };
      case Ur:
        return {
          name: Ur,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "sections", defaultValue: [] },
            { name: "showData", defaultValue: false },
            { name: "title" }
          ]
        };
      case Br:
        return {
          name: Br,
          properties: [
            { name: "label" },
            { name: "value" }
          ]
        };
      case ss:
        return {
          name: ss,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "axes", defaultValue: [] },
            { name: "curves", defaultValue: [] },
            { name: "options", defaultValue: [] },
            { name: "title" }
          ]
        };
      case as:
        return {
          name: as,
          properties: [
            { name: "icon" },
            { name: "iconText" },
            { name: "id" },
            { name: "in" },
            { name: "title" }
          ]
        };
      case Vr:
        return {
          name: Vr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "title" },
            { name: "TreemapRows", defaultValue: [] }
          ]
        };
      case os:
        return {
          name: os,
          properties: [
            { name: "indent" },
            { name: "item" }
          ]
        };
      case xr:
        return {
          name: xr,
          properties: [
            { name: "accDescr" },
            { name: "accTitle" },
            { name: "dir" },
            { name: "statements", defaultValue: [] },
            { name: "title" }
          ]
        };
      case Sr:
        return {
          name: Sr,
          properties: [
            { name: "classSelector" },
            { name: "name" },
            { name: "value" }
          ]
        };
      case Ir:
        return {
          name: Ir,
          properties: [
            { name: "classSelector" },
            { name: "name" }
          ]
        };
      default:
        return {
          name: e,
          properties: []
        };
    }
  }
}, v(Mn, "MermaidAstReflection"), Mn), De = new Ec(), El, Jg = /* @__PURE__ */ v(() => El ?? (El = $t(`{"$type":"Grammar","isDeclared":true,"name":"Info","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Info","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"info"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"showInfo"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[],"cardinality":"?"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@7"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "InfoGrammar"), $l, Qg = /* @__PURE__ */ v(() => $l ?? ($l = $t(`{"$type":"Grammar","isDeclared":true,"name":"Packet","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Packet","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"packet"},{"$type":"Keyword","value":"packet-beta"}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"blocks","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PacketBlock","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"start","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"end","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}],"cardinality":"?"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"+"},{"$type":"Assignment","feature":"bits","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "PacketGrammar"), kl, Zg = /* @__PURE__ */ v(() => kl ?? (kl = $t(`{"$type":"Grammar","isDeclared":true,"name":"Pie","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Pie","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"pie"},{"$type":"Assignment","feature":"showData","operator":"?=","terminal":{"$type":"Keyword","value":"showData"},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Assignment","feature":"sections","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PieSection","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"FLOAT_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/-?[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/-?(0|[1-9][0-9]*)(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@2"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@3"}}]},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@11"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@12"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "PieGrammar"), xl, ey = /* @__PURE__ */ v(() => xl ?? (xl = $t(`{"$type":"Grammar","isDeclared":true,"name":"Architecture","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Architecture","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"architecture-beta"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"groups","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"services","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"junctions","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Assignment","feature":"edges","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"LeftPort","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"lhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"RightPort","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Keyword","value":":"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Arrow","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Assignment","feature":"lhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"--"},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":"-"}]}]},{"$type":"Assignment","feature":"rhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"group"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Service","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"service"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"iconText","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}}],"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Junction","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"junction"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Edge","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"lhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"lhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Assignment","feature":"rhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"rhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ARROW_DIRECTION","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"L"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"R"}}]},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"T"}}]},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"B"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_GROUP","definition":{"$type":"RegexToken","regex":"/\\\\{group\\\\}/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_INTO","definition":{"$type":"RegexToken","regex":"/<|>/"},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@18"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@19"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false},{"$type":"TerminalRule","name":"ARCH_ICON","definition":{"$type":"RegexToken","regex":"/\\\\([\\\\w-:]+\\\\)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARCH_TITLE","definition":{"$type":"RegexToken","regex":"/\\\\[[\\\\w ]+\\\\]/"},"fragment":false,"hidden":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "ArchitectureGrammar"), Sl, ty = /* @__PURE__ */ v(() => Sl ?? (Sl = $t(`{"$type":"Grammar","isDeclared":true,"name":"GitGraph","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"GitGraph","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Keyword","value":":"}]},{"$type":"Keyword","value":"gitGraph:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Keyword","value":":"}]}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"Assignment","feature":"statements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Direction","definition":{"$type":"Assignment","feature":"dir","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"LR"},{"$type":"Keyword","value":"TB"},{"$type":"Keyword","value":"BT"}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Commit","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"commit"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"msg:","cardinality":"?"},{"$type":"Assignment","feature":"message","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Branch","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"branch"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"order:"},{"$type":"Assignment","feature":"order","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Merge","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"merge"},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Checkout","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"checkout"},{"$type":"Keyword","value":"switch"}]},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CherryPicking","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"cherry-pick"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"parent:"},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@14"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false},{"$type":"TerminalRule","name":"REFERENCE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\w([-\\\\./\\\\w]*[-\\\\w])?/"},"fragment":false,"hidden":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "GitGraphGrammar"), Il, ny = /* @__PURE__ */ v(() => Il ?? (Il = $t(`{"$type":"Grammar","isDeclared":true,"name":"Radar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Radar","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":"radar-beta:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":":"}]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Keyword","value":"axis"},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"curve"},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Label","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Axis","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Curve","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Entries","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"DetailedEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"axis","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@2"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Keyword","value":":","cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NumberEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Option","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"showLegend"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"ticks"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"max"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"min"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"graticule"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"GRATICULE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"circle"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"polygon"}}]},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@16"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"interfaces":[{"$type":"Interface","name":"Entry","attributes":[{"$type":"TypeAttribute","name":"axis","isOptional":true,"type":{"$type":"ReferenceType","referenceType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@2"}}}},{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}],"superTypes":[]}],"definesHiddenTokens":false,"hiddenTokens":[],"types":[],"usedGrammars":[]}`)), "RadarGrammar"), Cl, ry = /* @__PURE__ */ v(() => Cl ?? (Cl = $t(`{"$type":"Grammar","isDeclared":true,"name":"Treemap","rules":[{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"Treemap","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]},{"$type":"Assignment","feature":"TreemapRows","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"TREEMAP_KEYWORD","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap-beta"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"CLASS_DEF","definition":{"$type":"RegexToken","regex":"/classDef\\\\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\\\\s+([^;\\\\r\\\\n]*))?(?:;)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STYLE_SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":::"}},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":"}},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"COMMA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":","}},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false},{"$type":"ParserRule","name":"TreemapRow","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"item","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ClassDef","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Item","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Section","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Leaf","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID2","definition":{"$type":"RegexToken","regex":"/[a-zA-Z_][a-zA-Z0-9_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER2","definition":{"$type":"RegexToken","regex":"/[0-9_\\\\.\\\\,]+/"},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"MyNumber","dataType":"number","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"STRING2","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/"},"fragment":false,"hidden":false}],"interfaces":[{"$type":"Interface","name":"Item","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"classSelector","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]},{"$type":"Interface","name":"Section","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[]},{"$type":"Interface","name":"Leaf","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}]},{"$type":"Interface","name":"ClassDefStatement","attributes":[{"$type":"TypeAttribute","name":"className","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"styleText","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"Treemap","attributes":[{"$type":"TypeAttribute","name":"TreemapRows","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@14"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"types":[],"usedGrammars":[],"$comment":"/**\\n * Treemap grammar for Langium\\n * Converted from mindmap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treemap declaration.\\n */"}`)), "TreemapGrammar"), iy = {
  languageId: "info",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, sy = {
  languageId: "packet",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, ay = {
  languageId: "pie",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, oy = {
  languageId: "architecture",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, ly = {
  languageId: "gitGraph",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, uy = {
  languageId: "radar",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, cy = {
  languageId: "treemap",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: false,
  mode: "production"
}, kt = {
  AstReflection: /* @__PURE__ */ v(() => new Ec(), "AstReflection")
}, dy = {
  Grammar: /* @__PURE__ */ v(() => Jg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => iy, "LanguageMetaData"),
  parser: {}
}, fy = {
  Grammar: /* @__PURE__ */ v(() => Qg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => sy, "LanguageMetaData"),
  parser: {}
}, hy = {
  Grammar: /* @__PURE__ */ v(() => Zg(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => ay, "LanguageMetaData"),
  parser: {}
}, py = {
  Grammar: /* @__PURE__ */ v(() => ey(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => oy, "LanguageMetaData"),
  parser: {}
}, my = {
  Grammar: /* @__PURE__ */ v(() => ty(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => ly, "LanguageMetaData"),
  parser: {}
}, gy = {
  Grammar: /* @__PURE__ */ v(() => ny(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => uy, "LanguageMetaData"),
  parser: {}
}, yy = {
  Grammar: /* @__PURE__ */ v(() => ry(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ v(() => cy, "LanguageMetaData"),
  parser: {}
}, Ty = /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/, Ry = /accTitle[\t ]*:([^\n\r]*)/, vy = /title([\t ][^\n\r]*|)/, Ay = {
  ACC_DESCR: Ty,
  ACC_TITLE: Ry,
  TITLE: vy
}, Dn, Li = (Dn = class extends oc {
  runConverter(e, t, r) {
    let i = this.runCommonConverter(e, t, r);
    return i === void 0 && (i = this.runCustomConverter(e, t, r)), i === void 0 ? super.runConverter(e, t, r) : i;
  }
  runCommonConverter(e, t, r) {
    const i = Ay[e.name];
    if (i === void 0)
      return;
    const s = i.exec(t);
    if (s !== null) {
      if (s[1] !== void 0)
        return s[1].trim().replace(/[\t ]{2,}/gm, " ");
      if (s[2] !== void 0)
        return s[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, `
`);
    }
  }
}, v(Dn, "AbstractMermaidValueConverter"), Dn), Fn, _i = (Fn = class extends Li {
  runCustomConverter(e, t, r) {
  }
}, v(Fn, "CommonValueConverter"), Fn), Gn, ct = (Gn = class extends ac {
  constructor(e) {
    super(), this.keywords = new Set(e);
  }
  buildKeywordTokens(e, t, r) {
    const i = super.buildKeywordTokens(e, t, r);
    return i.forEach((s) => {
      this.keywords.has(s.name) && s.PATTERN !== void 0 && (s.PATTERN = new RegExp(s.PATTERN.toString() + "(?:(?=%%)|(?!\\S))"));
    }), i;
  }
}, v(Gn, "AbstractMermaidTokenBuilder"), Gn), Un;
Un = class extends ct {
}, v(Un, "CommonTokenBuilder");
var Bn, Ey = (Bn = class extends ct {
  constructor() {
    super(["gitGraph"]);
  }
}, v(Bn, "GitGraphTokenBuilder"), Bn), $y = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Ey(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new _i(), "ValueConverter")
  }
};
function ky(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    my,
    $y
  );
  return e.ServiceRegistry.register(t), { shared: e, GitGraph: t };
}
v(ky, "createGitGraphServices");
var Vn, xy = (Vn = class extends ct {
  constructor() {
    super(["info", "showInfo"]);
  }
}, v(Vn, "InfoTokenBuilder"), Vn), Sy = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new xy(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new _i(), "ValueConverter")
  }
};
function Iy(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    dy,
    Sy
  );
  return e.ServiceRegistry.register(t), { shared: e, Info: t };
}
v(Iy, "createInfoServices");
var Kn, Cy = (Kn = class extends ct {
  constructor() {
    super(["packet"]);
  }
}, v(Kn, "PacketTokenBuilder"), Kn), Ny = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Cy(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new _i(), "ValueConverter")
  }
};
function wy(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    fy,
    Ny
  );
  return e.ServiceRegistry.register(t), { shared: e, Packet: t };
}
v(wy, "createPacketServices");
var Wn, Ly = (Wn = class extends ct {
  constructor() {
    super(["pie", "showData"]);
  }
}, v(Wn, "PieTokenBuilder"), Wn), Hn, _y = (Hn = class extends Li {
  runCustomConverter(e, t, r) {
    if (e.name === "PIE_SECTION_LABEL")
      return t.replace(/"/g, "").trim();
  }
}, v(Hn, "PieValueConverter"), Hn), by = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Ly(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new _y(), "ValueConverter")
  }
};
function Oy(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    hy,
    by
  );
  return e.ServiceRegistry.register(t), { shared: e, Pie: t };
}
v(Oy, "createPieServices");
var jn, Py = (jn = class extends ct {
  constructor() {
    super(["architecture"]);
  }
}, v(jn, "ArchitectureTokenBuilder"), jn), zn, My = (zn = class extends Li {
  runCustomConverter(e, t, r) {
    if (e.name === "ARCH_ICON")
      return t.replace(/[()]/g, "").trim();
    if (e.name === "ARCH_TEXT_ICON")
      return t.replace(/["()]/g, "");
    if (e.name === "ARCH_TITLE")
      return t.replace(/[[\]]/g, "").trim();
  }
}, v(zn, "ArchitectureValueConverter"), zn), Dy = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Py(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new My(), "ValueConverter")
  }
};
function Fy(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    py,
    Dy
  );
  return e.ServiceRegistry.register(t), { shared: e, Architecture: t };
}
v(Fy, "createArchitectureServices");
var qn, Gy = (qn = class extends ct {
  constructor() {
    super(["radar-beta"]);
  }
}, v(qn, "RadarTokenBuilder"), qn), Uy = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Gy(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new _i(), "ValueConverter")
  }
};
function By(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    gy,
    Uy
  );
  return e.ServiceRegistry.register(t), { shared: e, Radar: t };
}
v(By, "createRadarServices");
var Yn, Vy = (Yn = class extends ct {
  constructor() {
    super(["treemap"]);
  }
}, v(Yn, "TreemapTokenBuilder"), Yn), Ky = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/, Xn, Wy = (Xn = class extends Li {
  runCustomConverter(e, t, r) {
    if (e.name === "NUMBER2")
      return parseFloat(t.replace(/,/g, ""));
    if (e.name === "SEPARATOR")
      return t.substring(1, t.length - 1);
    if (e.name === "STRING2")
      return t.substring(1, t.length - 1);
    if (e.name === "INDENTATION")
      return t.length;
    if (e.name === "ClassDef") {
      if (typeof t != "string")
        return t;
      const i = Ky.exec(t);
      if (i)
        return {
          $type: "ClassDefStatement",
          className: i[1],
          styleText: i[2] || void 0
        };
    }
  }
}, v(Xn, "TreemapValueConverter"), Xn);
function $c(n) {
  const e = n.validation.TreemapValidator, t = n.validation.ValidationRegistry;
  if (t) {
    const r = {
      Treemap: e.checkSingleRoot.bind(e)
      // Remove unused validation for TreemapRow
    };
    t.register(r, e);
  }
}
v($c, "registerValidationChecks");
var Jn, Hy = (Jn = class {
  /**
   * Validates that a treemap has only one root node.
   * A root node is defined as a node that has no indentation.
   */
  checkSingleRoot(e, t) {
    let r;
    for (const i of e.TreemapRows)
      i.item && (r === void 0 && // Check if this is a root node (no indentation)
      i.indent === void 0 ? r = 0 : i.indent === void 0 ? t("error", "Multiple root nodes are not allowed in a treemap.", {
        node: i,
        property: "item"
      }) : r !== void 0 && r >= parseInt(i.indent, 10) && t("error", "Multiple root nodes are not allowed in a treemap.", {
        node: i,
        property: "item"
      }));
  }
}, v(Jn, "TreemapValidator"), Jn), jy = {
  parser: {
    TokenBuilder: /* @__PURE__ */ v(() => new Vy(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ v(() => new Wy(), "ValueConverter")
  },
  validation: {
    TreemapValidator: /* @__PURE__ */ v(() => new Hy(), "TreemapValidator")
  }
};
function zy(n = ut) {
  const e = oe(
    lt(n),
    kt
  ), t = oe(
    ot({ shared: e }),
    yy,
    jy
  );
  return e.ServiceRegistry.register(t), $c(t), { shared: e, Treemap: t };
}
v(zy, "createTreemapServices");
var He = {}, qy = {
  info: /* @__PURE__ */ v(async () => {
    const { createInfoServices: n } = await __vitePreload(() => import("./info-NVLQJR56-c3898baa-3ad5390c.js"), true ? ["assets/info-NVLQJR56-c3898baa-3ad5390c.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().Info.parser.LangiumParser;
    He.info = e;
  }, "info"),
  packet: /* @__PURE__ */ v(async () => {
    const { createPacketServices: n } = await __vitePreload(() => import("./packet-BFZMPI3H-e85538bd-ed794c4a.js"), true ? ["assets/packet-BFZMPI3H-e85538bd-ed794c4a.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().Packet.parser.LangiumParser;
    He.packet = e;
  }, "packet"),
  pie: /* @__PURE__ */ v(async () => {
    const { createPieServices: n } = await __vitePreload(() => import("./pie-7BOR55EZ-8d9e4faf-fc290851.js"), true ? ["assets/pie-7BOR55EZ-8d9e4faf-fc290851.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().Pie.parser.LangiumParser;
    He.pie = e;
  }, "pie"),
  architecture: /* @__PURE__ */ v(async () => {
    const { createArchitectureServices: n } = await __vitePreload(() => import("./architecture-U656AL7Q-4ac54b7e-ea01b968.js"), true ? ["assets/architecture-U656AL7Q-4ac54b7e-ea01b968.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().Architecture.parser.LangiumParser;
    He.architecture = e;
  }, "architecture"),
  gitGraph: /* @__PURE__ */ v(async () => {
    const { createGitGraphServices: n } = await __vitePreload(() => import("./gitGraph-F6HP7TQM-579a5fc5-9dec232c.js"), true ? ["assets/gitGraph-F6HP7TQM-579a5fc5-9dec232c.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().GitGraph.parser.LangiumParser;
    He.gitGraph = e;
  }, "gitGraph"),
  radar: /* @__PURE__ */ v(async () => {
    const { createRadarServices: n } = await __vitePreload(() => import("./radar-NHE76QYJ-6d103e6f-85cdefd8.js"), true ? ["assets/radar-NHE76QYJ-6d103e6f-85cdefd8.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().Radar.parser.LangiumParser;
    He.radar = e;
  }, "radar"),
  treemap: /* @__PURE__ */ v(async () => {
    const { createTreemapServices: n } = await __vitePreload(() => import("./treemap-KMMF4GRG-9a97ff02-db81a890.js"), true ? ["assets/treemap-KMMF4GRG-9a97ff02-db81a890.js","assets/app-33e0c163.js","assets/monaco-45e206c0.js","assets/monaco-c3815ff7.css","assets/chakra-ui-1d60df8d.js","assets/vendor-75a482ef.js","assets/react-utils-0e8f4d03.js","assets/common-utils-40e9b830.js","assets/index-6ed2e589.css","assets/_baseUniq-cfe137aa-75cabb2d.js","assets/_basePickBy-9e57dae2-21bbebf4.js","assets/clone-66b7ef27-0fd17639.js"] : void 0), e = n().Treemap.parser.LangiumParser;
    He.treemap = e;
  }, "treemap")
};
async function Yy(n, e) {
  const t = qy[n];
  if (!t)
    throw new Error(`Unknown diagram type: ${n}`);
  He[n] || await t();
  const i = He[n].parse(e);
  if (i.lexerErrors.length > 0 || i.parserErrors.length > 0)
    throw new Xy(i);
  return i.value;
}
v(Yy, "parse");
var Qn, Xy = (Qn = class extends Error {
  constructor(e) {
    const t = e.lexerErrors.map((i) => i.message).join(`
`), r = e.parserErrors.map((i) => i.message).join(`
`);
    super(`Parsing failed: ${t} ${r}`), this.result = e;
  }
}, v(Qn, "MermaidParseError"), Qn);
export {
  $y as $,
  By as B,
  Dy as D,
  Fy as F,
  Iy as I,
  Ny as N,
  Oy as O,
  Sy as S,
  Uy as U,
  Yy as Y,
  by as b,
  jy as j,
  ky as k,
  wy as w,
  zy as z
};
