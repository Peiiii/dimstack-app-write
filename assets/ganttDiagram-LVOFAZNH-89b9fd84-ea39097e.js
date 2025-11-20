import { aC as Dc, aD as Qf, aE as ce$1, aF as ta$1, a4 as Vv, H as m, aG as Kv, a5 as Xv, O as yt$1, a7 as $5, a8 as B5, ak as R5, al as I5, aa as F5, a9 as D5, aH as $4, ar as M5, ai as bm, M as R, a6 as gt$1, ah as Of, ad as Ii$1, aq as $e, aI as ep, aJ as TI } from "./app-ac489121.js";
import { c as cn$1, a as an$1, t as tn$1, R as R$1, G } from "./linear-877823e4-f73512be.js";
import { t } from "./init-f9637058-7f0fc388.js";
import "./chakra-ui-1d60df8d.js";
import "./react-utils-0e8f4d03.js";
import "./defaultLocale-2db4a961-5e6dc2fe.js";
import "./monaco-45e206c0.js";
import "./vendor-75a482ef.js";
import "./common-utils-40e9b830.js";
function Gr(t2, e) {
  let r;
  if (e === void 0)
    for (const n of t2)
      n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t2)
      (i = e(i, ++n, t2)) != null && (r < i || r === void 0 && i >= i) && (r = i);
  }
  return r;
}
function jr(t2, e) {
  let r;
  if (e === void 0)
    for (const n of t2)
      n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of t2)
      (i = e(i, ++n, t2)) != null && (r > i || r === void 0 && i >= i) && (r = i);
  }
  return r;
}
function Qr(t2) {
  return t2;
}
var qt = 1, ie = 2, me = 3, Xt = 4, We = 1e-6;
function $r(t2) {
  return "translate(" + t2 + ",0)";
}
function Jr(t2) {
  return "translate(0," + t2 + ")";
}
function Kr(t2) {
  return (e) => +t2(e);
}
function tn(t2, e) {
  return e = Math.max(0, t2.bandwidth() - e * 2) / 2, t2.round() && (e = Math.round(e)), (r) => +t2(r) + e;
}
function en() {
  return !this.__axis;
}
function er(t2, e) {
  var r = [], n = null, i = null, a = 6, s = 6, y = 3, _ = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, p = t2 === qt || t2 === Xt ? -1 : 1, g = t2 === Xt || t2 === ie ? "x" : "y", E = t2 === qt || t2 === me ? $r : Jr;
  function C(b) {
    var q = n ?? (e.ticks ? e.ticks.apply(e, r) : e.domain()), O = i ?? (e.tickFormat ? e.tickFormat.apply(e, r) : Qr), M = Math.max(a, 0) + y, I = e.range(), V = +I[0] + _, W = +I[I.length - 1] + _, Z = (e.bandwidth ? tn : Kr)(e.copy(), _), Q = b.selection ? b.selection() : b, D = Q.selectAll(".domain").data([null]), H = Q.selectAll(".tick").data(q, e).order(), x = H.exit(), Y = H.enter().append("g").attr("class", "tick"), F = H.select("line"), S = H.select("text");
    D = D.merge(D.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), H = H.merge(Y), F = F.merge(Y.append("line").attr("stroke", "currentColor").attr(g + "2", p * a)), S = S.merge(Y.append("text").attr("fill", "currentColor").attr(g, p * M).attr("dy", t2 === qt ? "0em" : t2 === me ? "0.71em" : "0.32em")), b !== Q && (D = D.transition(b), H = H.transition(b), F = F.transition(b), S = S.transition(b), x = x.transition(b).attr("opacity", We).attr("transform", function(v) {
      return isFinite(v = Z(v)) ? E(v + _) : this.getAttribute("transform");
    }), Y.attr("opacity", We).attr("transform", function(v) {
      var U = this.parentNode.__axis;
      return E((U && isFinite(U = U(v)) ? U : Z(v)) + _);
    })), x.remove(), D.attr("d", t2 === Xt || t2 === ie ? s ? "M" + p * s + "," + V + "H" + _ + "V" + W + "H" + p * s : "M" + _ + "," + V + "V" + W : s ? "M" + V + "," + p * s + "V" + _ + "H" + W + "V" + p * s : "M" + V + "," + _ + "H" + W), H.attr("opacity", 1).attr("transform", function(v) {
      return E(Z(v) + _);
    }), F.attr(g + "2", p * a), S.attr(g, p * M).text(O), Q.filter(en).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t2 === ie ? "start" : t2 === Xt ? "end" : "middle"), Q.each(function() {
      this.__axis = Z;
    });
  }
  return C.scale = function(b) {
    return arguments.length ? (e = b, C) : e;
  }, C.ticks = function() {
    return r = Array.from(arguments), C;
  }, C.tickArguments = function(b) {
    return arguments.length ? (r = b == null ? [] : Array.from(b), C) : r.slice();
  }, C.tickValues = function(b) {
    return arguments.length ? (n = b == null ? null : Array.from(b), C) : n && n.slice();
  }, C.tickFormat = function(b) {
    return arguments.length ? (i = b, C) : i;
  }, C.tickSize = function(b) {
    return arguments.length ? (a = s = +b, C) : a;
  }, C.tickSizeInner = function(b) {
    return arguments.length ? (a = +b, C) : a;
  }, C.tickSizeOuter = function(b) {
    return arguments.length ? (s = +b, C) : s;
  }, C.tickPadding = function(b) {
    return arguments.length ? (y = +b, C) : y;
  }, C.offset = function(b) {
    return arguments.length ? (_ = +b, C) : _;
  }, C;
}
function rn(t2) {
  return er(qt, t2);
}
function nn(t2) {
  return er(me, t2);
}
const an = Math.PI / 180, sn = 180 / Math.PI, $t = 18, rr = 0.96422, nr = 1, ir = 0.82521, ar = 4 / 29, St = 6 / 29, sr = 3 * St * St, on = St * St * St;
function or(t2) {
  if (t2 instanceof ft)
    return new ft(t2.l, t2.a, t2.b, t2.opacity);
  if (t2 instanceof dt)
    return cr(t2);
  t2 instanceof ce$1 || (t2 = $4(t2));
  var e = ce(t2.r), r = ce(t2.g), n = ce(t2.b), i = ae((0.2225045 * e + 0.7168786 * r + 0.0606169 * n) / nr), a, s;
  return e === r && r === n ? a = s = i : (a = ae((0.4360747 * e + 0.3850649 * r + 0.1430804 * n) / rr), s = ae((0.0139322 * e + 0.0971045 * r + 0.7141733 * n) / ir)), new ft(116 * i - 16, 500 * (a - i), 200 * (i - s), t2.opacity);
}
function cn(t2, e, r, n) {
  return arguments.length === 1 ? or(t2) : new ft(t2, e, r, n ?? 1);
}
function ft(t2, e, r, n) {
  this.l = +t2, this.a = +e, this.b = +r, this.opacity = +n;
}
Dc(ft, cn, Qf(ta$1, {
  brighter(t2) {
    return new ft(this.l + $t * (t2 ?? 1), this.a, this.b, this.opacity);
  },
  darker(t2) {
    return new ft(this.l - $t * (t2 ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t2 = (this.l + 16) / 116, e = isNaN(this.a) ? t2 : t2 + this.a / 500, r = isNaN(this.b) ? t2 : t2 - this.b / 200;
    return e = rr * se(e), t2 = nr * se(t2), r = ir * se(r), new ce$1(
      oe(3.1338561 * e - 1.6168667 * t2 - 0.4906146 * r),
      oe(-0.9787684 * e + 1.9161415 * t2 + 0.033454 * r),
      oe(0.0719453 * e - 0.2289914 * t2 + 1.4052427 * r),
      this.opacity
    );
  }
}));
function ae(t2) {
  return t2 > on ? Math.pow(t2, 1 / 3) : t2 / sr + ar;
}
function se(t2) {
  return t2 > St ? t2 * t2 * t2 : sr * (t2 - ar);
}
function oe(t2) {
  return 255 * (t2 <= 31308e-7 ? 12.92 * t2 : 1.055 * Math.pow(t2, 1 / 2.4) - 0.055);
}
function ce(t2) {
  return (t2 /= 255) <= 0.04045 ? t2 / 12.92 : Math.pow((t2 + 0.055) / 1.055, 2.4);
}
function ln(t2) {
  if (t2 instanceof dt)
    return new dt(t2.h, t2.c, t2.l, t2.opacity);
  if (t2 instanceof ft || (t2 = or(t2)), t2.a === 0 && t2.b === 0)
    return new dt(NaN, 0 < t2.l && t2.l < 100 ? 0 : NaN, t2.l, t2.opacity);
  var e = Math.atan2(t2.b, t2.a) * sn;
  return new dt(e < 0 ? e + 360 : e, Math.sqrt(t2.a * t2.a + t2.b * t2.b), t2.l, t2.opacity);
}
function ge(t2, e, r, n) {
  return arguments.length === 1 ? ln(t2) : new dt(t2, e, r, n ?? 1);
}
function dt(t2, e, r, n) {
  this.h = +t2, this.c = +e, this.l = +r, this.opacity = +n;
}
function cr(t2) {
  if (isNaN(t2.h))
    return new ft(t2.l, 0, 0, t2.opacity);
  var e = t2.h * an;
  return new ft(t2.l, Math.cos(e) * t2.c, Math.sin(e) * t2.c, t2.opacity);
}
Dc(dt, ge, Qf(ta$1, {
  brighter(t2) {
    return new dt(this.h, this.c, this.l + $t * (t2 ?? 1), this.opacity);
  },
  darker(t2) {
    return new dt(this.h, this.c, this.l - $t * (t2 ?? 1), this.opacity);
  },
  rgb() {
    return cr(this).rgb();
  }
}));
function un(t2) {
  return function(e, r) {
    var n = t2((e = ge(e)).h, (r = ge(r)).h), i = ep(e.c, r.c), a = ep(e.l, r.l), s = ep(e.opacity, r.opacity);
    return function(y) {
      return e.h = n(y), e.c = i(y), e.l = a(y), e.opacity = s(y), e + "";
    };
  };
}
const fn = un(TI);
function hn(t2, e) {
  t2 = t2.slice();
  var r = 0, n = t2.length - 1, i = t2[r], a = t2[n], s;
  return a < i && (s = r, r = n, n = s, s = i, i = a, a = s), t2[r] = e.floor(i), t2[n] = e.ceil(a), t2;
}
const le = /* @__PURE__ */ new Date(), ue = /* @__PURE__ */ new Date();
function et(t2, e, r, n) {
  function i(a) {
    return t2(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (t2(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (t2(a = new Date(a - 1)), e(a, 1), t2(a), a), i.round = (a) => {
    const s = i(a), y = i.ceil(a);
    return a - s < y - a ? s : y;
  }, i.offset = (a, s) => (e(a = /* @__PURE__ */ new Date(+a), s == null ? 1 : Math.floor(s)), a), i.range = (a, s, y) => {
    const _ = [];
    if (a = i.ceil(a), y = y == null ? 1 : Math.floor(y), !(a < s) || !(y > 0))
      return _;
    let p;
    do
      _.push(p = /* @__PURE__ */ new Date(+a)), e(a, y), t2(a);
    while (p < a && a < s);
    return _;
  }, i.filter = (a) => et((s) => {
    if (s >= s)
      for (; t2(s), !a(s); )
        s.setTime(s - 1);
  }, (s, y) => {
    if (s >= s)
      if (y < 0)
        for (; ++y <= 0; )
          for (; e(s, -1), !a(s); )
            ;
      else
        for (; --y >= 0; )
          for (; e(s, 1), !a(s); )
            ;
  }), r && (i.count = (a, s) => (le.setTime(+a), ue.setTime(+s), t2(le), t2(ue), Math.floor(r(le, ue))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (s) => n(s) % a === 0 : (s) => i.count(0, s) % a === 0) : i)), i;
}
const Yt = et(() => {
}, (t2, e) => {
  t2.setTime(+t2 + e);
}, (t2, e) => e - t2);
Yt.every = (t2) => (t2 = Math.floor(t2), !isFinite(t2) || !(t2 > 0) ? null : t2 > 1 ? et((e) => {
  e.setTime(Math.floor(e / t2) * t2);
}, (e, r) => {
  e.setTime(+e + r * t2);
}, (e, r) => (r - e) / t2) : Yt);
Yt.range;
const mt = 1e3, ct = mt * 60, gt = ct * 60, yt = gt * 24, xe = yt * 7, Oe = yt * 30, fe = yt * 365, vt = et((t2) => {
  t2.setTime(t2 - t2.getMilliseconds());
}, (t2, e) => {
  t2.setTime(+t2 + e * mt);
}, (t2, e) => (e - t2) / mt, (t2) => t2.getUTCSeconds());
vt.range;
const Wt = et((t2) => {
  t2.setTime(t2 - t2.getMilliseconds() - t2.getSeconds() * mt);
}, (t2, e) => {
  t2.setTime(+t2 + e * ct);
}, (t2, e) => (e - t2) / ct, (t2) => t2.getMinutes());
Wt.range;
const dn = et((t2) => {
  t2.setUTCSeconds(0, 0);
}, (t2, e) => {
  t2.setTime(+t2 + e * ct);
}, (t2, e) => (e - t2) / ct, (t2) => t2.getUTCMinutes());
dn.range;
const Ot = et((t2) => {
  t2.setTime(t2 - t2.getMilliseconds() - t2.getSeconds() * mt - t2.getMinutes() * ct);
}, (t2, e) => {
  t2.setTime(+t2 + e * gt);
}, (t2, e) => (e - t2) / gt, (t2) => t2.getHours());
Ot.range;
const mn = et((t2) => {
  t2.setUTCMinutes(0, 0, 0);
}, (t2, e) => {
  t2.setTime(+t2 + e * gt);
}, (t2, e) => (e - t2) / gt, (t2) => t2.getUTCHours());
mn.range;
const Tt = et(
  (t2) => t2.setHours(0, 0, 0, 0),
  (t2, e) => t2.setDate(t2.getDate() + e),
  (t2, e) => (e - t2 - (e.getTimezoneOffset() - t2.getTimezoneOffset()) * ct) / yt,
  (t2) => t2.getDate() - 1
);
Tt.range;
const we = et((t2) => {
  t2.setUTCHours(0, 0, 0, 0);
}, (t2, e) => {
  t2.setUTCDate(t2.getUTCDate() + e);
}, (t2, e) => (e - t2) / yt, (t2) => t2.getUTCDate() - 1);
we.range;
const gn = et((t2) => {
  t2.setUTCHours(0, 0, 0, 0);
}, (t2, e) => {
  t2.setUTCDate(t2.getUTCDate() + e);
}, (t2, e) => (e - t2) / yt, (t2) => Math.floor(t2 / yt));
gn.range;
function wt(t2) {
  return et((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t2) % 7), e.setHours(0, 0, 0, 0);
  }, (e, r) => {
    e.setDate(e.getDate() + r * 7);
  }, (e, r) => (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * ct) / xe);
}
const Vt = wt(0), Ht = wt(1), lr = wt(2), ur = wt(3), bt = wt(4), fr = wt(5), hr = wt(6);
Vt.range;
Ht.range;
lr.range;
ur.range;
bt.range;
fr.range;
hr.range;
function Dt(t2) {
  return et((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t2) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, r) => {
    e.setUTCDate(e.getUTCDate() + r * 7);
  }, (e, r) => (r - e) / xe);
}
const dr = Dt(0), Jt = Dt(1), yn = Dt(2), kn = Dt(3), Ut = Dt(4), pn = Dt(5), vn = Dt(6);
dr.range;
Jt.range;
yn.range;
kn.range;
Ut.range;
pn.range;
vn.range;
const Nt = et((t2) => {
  t2.setDate(1), t2.setHours(0, 0, 0, 0);
}, (t2, e) => {
  t2.setMonth(t2.getMonth() + e);
}, (t2, e) => e.getMonth() - t2.getMonth() + (e.getFullYear() - t2.getFullYear()) * 12, (t2) => t2.getMonth());
Nt.range;
const Tn = et((t2) => {
  t2.setUTCDate(1), t2.setUTCHours(0, 0, 0, 0);
}, (t2, e) => {
  t2.setUTCMonth(t2.getUTCMonth() + e);
}, (t2, e) => e.getUTCMonth() - t2.getUTCMonth() + (e.getUTCFullYear() - t2.getUTCFullYear()) * 12, (t2) => t2.getUTCMonth());
Tn.range;
const kt = et((t2) => {
  t2.setMonth(0, 1), t2.setHours(0, 0, 0, 0);
}, (t2, e) => {
  t2.setFullYear(t2.getFullYear() + e);
}, (t2, e) => e.getFullYear() - t2.getFullYear(), (t2) => t2.getFullYear());
kt.every = (t2) => !isFinite(t2 = Math.floor(t2)) || !(t2 > 0) ? null : et((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t2) * t2), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, r) => {
  e.setFullYear(e.getFullYear() + r * t2);
});
kt.range;
const xt = et((t2) => {
  t2.setUTCMonth(0, 1), t2.setUTCHours(0, 0, 0, 0);
}, (t2, e) => {
  t2.setUTCFullYear(t2.getUTCFullYear() + e);
}, (t2, e) => e.getUTCFullYear() - t2.getUTCFullYear(), (t2) => t2.getUTCFullYear());
xt.every = (t2) => !isFinite(t2 = Math.floor(t2)) || !(t2 > 0) ? null : et((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t2) * t2), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, r) => {
  e.setUTCFullYear(e.getUTCFullYear() + r * t2);
});
xt.range;
function bn(t2, e, r, n, i, a) {
  const s = [
    [vt, 1, mt],
    [vt, 5, 5 * mt],
    [vt, 15, 15 * mt],
    [vt, 30, 30 * mt],
    [a, 1, ct],
    [a, 5, 5 * ct],
    [a, 15, 15 * ct],
    [a, 30, 30 * ct],
    [i, 1, gt],
    [i, 3, 3 * gt],
    [i, 6, 6 * gt],
    [i, 12, 12 * gt],
    [n, 1, yt],
    [n, 2, 2 * yt],
    [r, 1, xe],
    [e, 1, Oe],
    [e, 3, 3 * Oe],
    [t2, 1, fe]
  ];
  function y(p, g, E) {
    const C = g < p;
    C && ([p, g] = [g, p]);
    const b = E && typeof E.range == "function" ? E : _(p, g, E), q = b ? b.range(p, +g + 1) : [];
    return C ? q.reverse() : q;
  }
  function _(p, g, E) {
    const C = Math.abs(g - p) / E, b = R$1(([, , M]) => M).right(s, C);
    if (b === s.length)
      return t2.every(G(p / fe, g / fe, E));
    if (b === 0)
      return Yt.every(Math.max(G(p, g, E), 1));
    const [q, O] = s[C / s[b - 1][2] < s[b][2] / C ? b - 1 : b];
    return q.every(O);
  }
  return [y, _];
}
const [xn, wn] = bn(kt, Nt, Vt, Tt, Ot, Wt);
function he(t2) {
  if (0 <= t2.y && t2.y < 100) {
    var e = new Date(-1, t2.m, t2.d, t2.H, t2.M, t2.S, t2.L);
    return e.setFullYear(t2.y), e;
  }
  return new Date(t2.y, t2.m, t2.d, t2.H, t2.M, t2.S, t2.L);
}
function de(t2) {
  if (0 <= t2.y && t2.y < 100) {
    var e = new Date(Date.UTC(-1, t2.m, t2.d, t2.H, t2.M, t2.S, t2.L));
    return e.setUTCFullYear(t2.y), e;
  }
  return new Date(Date.UTC(t2.y, t2.m, t2.d, t2.H, t2.M, t2.S, t2.L));
}
function Lt(t2, e, r) {
  return { y: t2, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function Dn(t2) {
  var e = t2.dateTime, r = t2.date, n = t2.time, i = t2.periods, a = t2.days, s = t2.shortDays, y = t2.months, _ = t2.shortMonths, p = At(i), g = It(i), E = At(a), C = It(a), b = At(s), q = It(s), O = At(y), M = It(y), I = At(_), V = It(_), W = {
    a: d,
    A: w,
    b: c,
    B: l,
    c: null,
    d: Re,
    e: Re,
    f: qn,
    g: ni,
    G: ai,
    H: Bn,
    I: Zn,
    j: Xn,
    L: mr,
    m: Gn,
    M: jn,
    p: o,
    q: P,
    Q: Xe,
    s: qe,
    S: Qn,
    u: $n,
    U: Jn,
    V: Kn,
    w: ti,
    W: ei,
    x: null,
    X: null,
    y: ri,
    Y: ii,
    Z: si,
    "%": Ze
  }, Z = {
    a: z,
    A: R2,
    b: K,
    B: G2,
    c: null,
    d: Be,
    e: Be,
    f: ui,
    g: Ti,
    G: xi,
    H: oi,
    I: ci,
    j: li,
    L: yr,
    m: fi,
    M: hi,
    p: $,
    q: at,
    Q: Xe,
    s: qe,
    S: di,
    u: mi,
    U: gi,
    V: yi,
    w: ki,
    W: pi,
    x: null,
    X: null,
    y: vi,
    Y: bi,
    Z: wi,
    "%": Ze
  }, Q = {
    a: F,
    A: S,
    b: v,
    B: U,
    c: u,
    d: ze,
    e: ze,
    f: Vn,
    g: Ve,
    G: Ne,
    H: Pe,
    I: Pe,
    j: Wn,
    L: Nn,
    m: In,
    M: On,
    p: Y,
    q: An,
    Q: Pn,
    s: Rn,
    S: Hn,
    u: Fn,
    U: Yn,
    V: Un,
    w: Sn,
    W: En,
    x: m2,
    X: T,
    y: Ve,
    Y: Ne,
    Z: Ln,
    "%": zn
  };
  W.x = D(r, W), W.X = D(n, W), W.c = D(e, W), Z.x = D(r, Z), Z.X = D(n, Z), Z.c = D(e, Z);
  function D(k, A) {
    return function(N) {
      var f = [], J = -1, L = 0, j = k.length, X, nt, st;
      for (N instanceof Date || (N = /* @__PURE__ */ new Date(+N)); ++J < j; )
        k.charCodeAt(J) === 37 && (f.push(k.slice(L, J)), (nt = He[X = k.charAt(++J)]) != null ? X = k.charAt(++J) : nt = X === "e" ? " " : "0", (st = A[X]) && (X = st(N, nt)), f.push(X), L = J + 1);
      return f.push(k.slice(L, J)), f.join("");
    };
  }
  function H(k, A) {
    return function(N) {
      var f = Lt(1900, void 0, 1), J = x(f, k, N += "", 0), L, j;
      if (J != N.length)
        return null;
      if ("Q" in f)
        return new Date(f.Q);
      if ("s" in f)
        return new Date(f.s * 1e3 + ("L" in f ? f.L : 0));
      if (A && !("Z" in f) && (f.Z = 0), "p" in f && (f.H = f.H % 12 + f.p * 12), f.m === void 0 && (f.m = "q" in f ? f.q : 0), "V" in f) {
        if (f.V < 1 || f.V > 53)
          return null;
        "w" in f || (f.w = 1), "Z" in f ? (L = de(Lt(f.y, 0, 1)), j = L.getUTCDay(), L = j > 4 || j === 0 ? Jt.ceil(L) : Jt(L), L = we.offset(L, (f.V - 1) * 7), f.y = L.getUTCFullYear(), f.m = L.getUTCMonth(), f.d = L.getUTCDate() + (f.w + 6) % 7) : (L = he(Lt(f.y, 0, 1)), j = L.getDay(), L = j > 4 || j === 0 ? Ht.ceil(L) : Ht(L), L = Tt.offset(L, (f.V - 1) * 7), f.y = L.getFullYear(), f.m = L.getMonth(), f.d = L.getDate() + (f.w + 6) % 7);
      } else
        ("W" in f || "U" in f) && ("w" in f || (f.w = "u" in f ? f.u % 7 : "W" in f ? 1 : 0), j = "Z" in f ? de(Lt(f.y, 0, 1)).getUTCDay() : he(Lt(f.y, 0, 1)).getDay(), f.m = 0, f.d = "W" in f ? (f.w + 6) % 7 + f.W * 7 - (j + 5) % 7 : f.w + f.U * 7 - (j + 6) % 7);
      return "Z" in f ? (f.H += f.Z / 100 | 0, f.M += f.Z % 100, de(f)) : he(f);
    };
  }
  function x(k, A, N, f) {
    for (var J = 0, L = A.length, j = N.length, X, nt; J < L; ) {
      if (f >= j)
        return -1;
      if (X = A.charCodeAt(J++), X === 37) {
        if (X = A.charAt(J++), nt = Q[X in He ? A.charAt(J++) : X], !nt || (f = nt(k, N, f)) < 0)
          return -1;
      } else if (X != N.charCodeAt(f++))
        return -1;
    }
    return f;
  }
  function Y(k, A, N) {
    var f = p.exec(A.slice(N));
    return f ? (k.p = g.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function F(k, A, N) {
    var f = b.exec(A.slice(N));
    return f ? (k.w = q.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function S(k, A, N) {
    var f = E.exec(A.slice(N));
    return f ? (k.w = C.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function v(k, A, N) {
    var f = I.exec(A.slice(N));
    return f ? (k.m = V.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function U(k, A, N) {
    var f = O.exec(A.slice(N));
    return f ? (k.m = M.get(f[0].toLowerCase()), N + f[0].length) : -1;
  }
  function u(k, A, N) {
    return x(k, e, A, N);
  }
  function m2(k, A, N) {
    return x(k, r, A, N);
  }
  function T(k, A, N) {
    return x(k, n, A, N);
  }
  function d(k) {
    return s[k.getDay()];
  }
  function w(k) {
    return a[k.getDay()];
  }
  function c(k) {
    return _[k.getMonth()];
  }
  function l(k) {
    return y[k.getMonth()];
  }
  function o(k) {
    return i[+(k.getHours() >= 12)];
  }
  function P(k) {
    return 1 + ~~(k.getMonth() / 3);
  }
  function z(k) {
    return s[k.getUTCDay()];
  }
  function R2(k) {
    return a[k.getUTCDay()];
  }
  function K(k) {
    return _[k.getUTCMonth()];
  }
  function G2(k) {
    return y[k.getUTCMonth()];
  }
  function $(k) {
    return i[+(k.getUTCHours() >= 12)];
  }
  function at(k) {
    return 1 + ~~(k.getUTCMonth() / 3);
  }
  return {
    format: function(k) {
      var A = D(k += "", W);
      return A.toString = function() {
        return k;
      }, A;
    },
    parse: function(k) {
      var A = H(k += "", false);
      return A.toString = function() {
        return k;
      }, A;
    },
    utcFormat: function(k) {
      var A = D(k += "", Z);
      return A.toString = function() {
        return k;
      }, A;
    },
    utcParse: function(k) {
      var A = H(k += "", true);
      return A.toString = function() {
        return k;
      }, A;
    }
  };
}
var He = { "-": "", _: " ", 0: "0" }, rt = /^\s*\d+/, Cn = /^%/, Mn = /[\\^$*+?|[\]().{}]/g;
function B(t2, e, r) {
  var n = t2 < 0 ? "-" : "", i = (n ? -t2 : t2) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(e) + i : i);
}
function _n(t2) {
  return t2.replace(Mn, "\\$&");
}
function At(t2) {
  return new RegExp("^(?:" + t2.map(_n).join("|") + ")", "i");
}
function It(t2) {
  return new Map(t2.map((e, r) => [e.toLowerCase(), r]));
}
function Sn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 1));
  return n ? (t2.w = +n[0], r + n[0].length) : -1;
}
function Fn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 1));
  return n ? (t2.u = +n[0], r + n[0].length) : -1;
}
function Yn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.U = +n[0], r + n[0].length) : -1;
}
function Un(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.V = +n[0], r + n[0].length) : -1;
}
function En(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.W = +n[0], r + n[0].length) : -1;
}
function Ne(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 4));
  return n ? (t2.y = +n[0], r + n[0].length) : -1;
}
function Ve(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function Ln(t2, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n ? (t2.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function An(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 1));
  return n ? (t2.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function In(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.m = n[0] - 1, r + n[0].length) : -1;
}
function ze(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.d = +n[0], r + n[0].length) : -1;
}
function Wn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 3));
  return n ? (t2.m = 0, t2.d = +n[0], r + n[0].length) : -1;
}
function Pe(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.H = +n[0], r + n[0].length) : -1;
}
function On(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.M = +n[0], r + n[0].length) : -1;
}
function Hn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 2));
  return n ? (t2.S = +n[0], r + n[0].length) : -1;
}
function Nn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 3));
  return n ? (t2.L = +n[0], r + n[0].length) : -1;
}
function Vn(t2, e, r) {
  var n = rt.exec(e.slice(r, r + 6));
  return n ? (t2.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function zn(t2, e, r) {
  var n = Cn.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function Pn(t2, e, r) {
  var n = rt.exec(e.slice(r));
  return n ? (t2.Q = +n[0], r + n[0].length) : -1;
}
function Rn(t2, e, r) {
  var n = rt.exec(e.slice(r));
  return n ? (t2.s = +n[0], r + n[0].length) : -1;
}
function Re(t2, e) {
  return B(t2.getDate(), e, 2);
}
function Bn(t2, e) {
  return B(t2.getHours(), e, 2);
}
function Zn(t2, e) {
  return B(t2.getHours() % 12 || 12, e, 2);
}
function Xn(t2, e) {
  return B(1 + Tt.count(kt(t2), t2), e, 3);
}
function mr(t2, e) {
  return B(t2.getMilliseconds(), e, 3);
}
function qn(t2, e) {
  return mr(t2, e) + "000";
}
function Gn(t2, e) {
  return B(t2.getMonth() + 1, e, 2);
}
function jn(t2, e) {
  return B(t2.getMinutes(), e, 2);
}
function Qn(t2, e) {
  return B(t2.getSeconds(), e, 2);
}
function $n(t2) {
  var e = t2.getDay();
  return e === 0 ? 7 : e;
}
function Jn(t2, e) {
  return B(Vt.count(kt(t2) - 1, t2), e, 2);
}
function gr(t2) {
  var e = t2.getDay();
  return e >= 4 || e === 0 ? bt(t2) : bt.ceil(t2);
}
function Kn(t2, e) {
  return t2 = gr(t2), B(bt.count(kt(t2), t2) + (kt(t2).getDay() === 4), e, 2);
}
function ti(t2) {
  return t2.getDay();
}
function ei(t2, e) {
  return B(Ht.count(kt(t2) - 1, t2), e, 2);
}
function ri(t2, e) {
  return B(t2.getFullYear() % 100, e, 2);
}
function ni(t2, e) {
  return t2 = gr(t2), B(t2.getFullYear() % 100, e, 2);
}
function ii(t2, e) {
  return B(t2.getFullYear() % 1e4, e, 4);
}
function ai(t2, e) {
  var r = t2.getDay();
  return t2 = r >= 4 || r === 0 ? bt(t2) : bt.ceil(t2), B(t2.getFullYear() % 1e4, e, 4);
}
function si(t2) {
  var e = t2.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + B(e / 60 | 0, "0", 2) + B(e % 60, "0", 2);
}
function Be(t2, e) {
  return B(t2.getUTCDate(), e, 2);
}
function oi(t2, e) {
  return B(t2.getUTCHours(), e, 2);
}
function ci(t2, e) {
  return B(t2.getUTCHours() % 12 || 12, e, 2);
}
function li(t2, e) {
  return B(1 + we.count(xt(t2), t2), e, 3);
}
function yr(t2, e) {
  return B(t2.getUTCMilliseconds(), e, 3);
}
function ui(t2, e) {
  return yr(t2, e) + "000";
}
function fi(t2, e) {
  return B(t2.getUTCMonth() + 1, e, 2);
}
function hi(t2, e) {
  return B(t2.getUTCMinutes(), e, 2);
}
function di(t2, e) {
  return B(t2.getUTCSeconds(), e, 2);
}
function mi(t2) {
  var e = t2.getUTCDay();
  return e === 0 ? 7 : e;
}
function gi(t2, e) {
  return B(dr.count(xt(t2) - 1, t2), e, 2);
}
function kr(t2) {
  var e = t2.getUTCDay();
  return e >= 4 || e === 0 ? Ut(t2) : Ut.ceil(t2);
}
function yi(t2, e) {
  return t2 = kr(t2), B(Ut.count(xt(t2), t2) + (xt(t2).getUTCDay() === 4), e, 2);
}
function ki(t2) {
  return t2.getUTCDay();
}
function pi(t2, e) {
  return B(Jt.count(xt(t2) - 1, t2), e, 2);
}
function vi(t2, e) {
  return B(t2.getUTCFullYear() % 100, e, 2);
}
function Ti(t2, e) {
  return t2 = kr(t2), B(t2.getUTCFullYear() % 100, e, 2);
}
function bi(t2, e) {
  return B(t2.getUTCFullYear() % 1e4, e, 4);
}
function xi(t2, e) {
  var r = t2.getUTCDay();
  return t2 = r >= 4 || r === 0 ? Ut(t2) : Ut.ceil(t2), B(t2.getUTCFullYear() % 1e4, e, 4);
}
function wi() {
  return "+0000";
}
function Ze() {
  return "%";
}
function Xe(t2) {
  return +t2;
}
function qe(t2) {
  return Math.floor(+t2 / 1e3);
}
var Mt, Kt;
Di({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function Di(t2) {
  return Mt = Dn(t2), Kt = Mt.format, Mt.parse, Mt.utcFormat, Mt.utcParse, Mt;
}
function Ci(t2) {
  return new Date(t2);
}
function Mi(t2) {
  return t2 instanceof Date ? +t2 : +/* @__PURE__ */ new Date(+t2);
}
function pr(t2, e, r, n, i, a, s, y, _, p) {
  var g = an$1(), E = g.invert, C = g.domain, b = p(".%L"), q = p(":%S"), O = p("%I:%M"), M = p("%I %p"), I = p("%a %d"), V = p("%b %d"), W = p("%B"), Z = p("%Y");
  function Q(D) {
    return (_(D) < D ? b : y(D) < D ? q : s(D) < D ? O : a(D) < D ? M : n(D) < D ? i(D) < D ? I : V : r(D) < D ? W : Z)(D);
  }
  return g.invert = function(D) {
    return new Date(E(D));
  }, g.domain = function(D) {
    return arguments.length ? C(Array.from(D, Mi)) : C().map(Ci);
  }, g.ticks = function(D) {
    var H = C();
    return t2(H[0], H[H.length - 1], D ?? 10);
  }, g.tickFormat = function(D, H) {
    return H == null ? Q : p(H);
  }, g.nice = function(D) {
    var H = C();
    return (!D || typeof D.range != "function") && (D = e(H[0], H[H.length - 1], D ?? 10)), D ? C(hn(H, D)) : g;
  }, g.copy = function() {
    return tn$1(g, pr(t2, e, r, n, i, a, s, y, _, p));
  }, g;
}
function _i() {
  return t.apply(pr(xn, wn, kt, Nt, Vt, Tt, Ot, Wt, vt, Kt).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var vr = { exports: {} };
(function(t2, e) {
  (function(r, n) {
    t2.exports = n();
  })(Vv, function() {
    var r = "day";
    return function(n, i, a) {
      var s = function(p) {
        return p.add(4 - p.isoWeekday(), r);
      }, y = i.prototype;
      y.isoWeekYear = function() {
        return s(this).year();
      }, y.isoWeek = function(p) {
        if (!this.$utils().u(p))
          return this.add(7 * (p - this.isoWeek()), r);
        var g, E, C, b, q = s(this), O = (g = this.isoWeekYear(), E = this.$u, C = (E ? a.utc : a)().year(g).startOf("year"), b = 4 - C.isoWeekday(), C.isoWeekday() > 4 && (b += 7), C.add(b, r));
        return q.diff(O, "week") + 1;
      }, y.isoWeekday = function(p) {
        return this.$utils().u(p) ? this.day() || 7 : this.day(this.day() % 7 ? p : p - 7);
      };
      var _ = y.startOf;
      y.startOf = function(p, g) {
        var E = this.$utils(), C = !!E.u(g) || g;
        return E.p(p) === "isoweek" ? C ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : _.bind(this)(p, g);
      };
    };
  });
})(vr);
var Si = vr.exports;
const Fi = /* @__PURE__ */ Xv(Si);
var Tr = { exports: {} };
(function(t2, e) {
  (function(r, n) {
    t2.exports = n();
  })(Vv, function() {
    var r = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, i = /\d/, a = /\d\d/, s = /\d\d?/, y = /\d*[^-_:/,()\s\d]+/, _ = {}, p = function(M) {
      return (M = +M) + (M > 68 ? 1900 : 2e3);
    }, g = function(M) {
      return function(I) {
        this[M] = +I;
      };
    }, E = [/[+-]\d\d:?(\d\d)?|Z/, function(M) {
      (this.zone || (this.zone = {})).offset = function(I) {
        if (!I || I === "Z")
          return 0;
        var V = I.match(/([+-]|\d\d)/g), W = 60 * V[1] + (+V[2] || 0);
        return W === 0 ? 0 : V[0] === "+" ? -W : W;
      }(M);
    }], C = function(M) {
      var I = _[M];
      return I && (I.indexOf ? I : I.s.concat(I.f));
    }, b = function(M, I) {
      var V, W = _.meridiem;
      if (W) {
        for (var Z = 1; Z <= 24; Z += 1)
          if (M.indexOf(W(Z, 0, I)) > -1) {
            V = Z > 12;
            break;
          }
      } else
        V = M === (I ? "pm" : "PM");
      return V;
    }, q = { A: [y, function(M) {
      this.afternoon = b(M, false);
    }], a: [y, function(M) {
      this.afternoon = b(M, true);
    }], Q: [i, function(M) {
      this.month = 3 * (M - 1) + 1;
    }], S: [i, function(M) {
      this.milliseconds = 100 * +M;
    }], SS: [a, function(M) {
      this.milliseconds = 10 * +M;
    }], SSS: [/\d{3}/, function(M) {
      this.milliseconds = +M;
    }], s: [s, g("seconds")], ss: [s, g("seconds")], m: [s, g("minutes")], mm: [s, g("minutes")], H: [s, g("hours")], h: [s, g("hours")], HH: [s, g("hours")], hh: [s, g("hours")], D: [s, g("day")], DD: [a, g("day")], Do: [y, function(M) {
      var I = _.ordinal, V = M.match(/\d+/);
      if (this.day = V[0], I)
        for (var W = 1; W <= 31; W += 1)
          I(W).replace(/\[|\]/g, "") === M && (this.day = W);
    }], w: [s, g("week")], ww: [a, g("week")], M: [s, g("month")], MM: [a, g("month")], MMM: [y, function(M) {
      var I = C("months"), V = (C("monthsShort") || I.map(function(W) {
        return W.slice(0, 3);
      })).indexOf(M) + 1;
      if (V < 1)
        throw new Error();
      this.month = V % 12 || V;
    }], MMMM: [y, function(M) {
      var I = C("months").indexOf(M) + 1;
      if (I < 1)
        throw new Error();
      this.month = I % 12 || I;
    }], Y: [/[+-]?\d+/, g("year")], YY: [a, function(M) {
      this.year = p(M);
    }], YYYY: [/\d{4}/, g("year")], Z: E, ZZ: E };
    function O(M) {
      var I, V;
      I = M, V = _ && _.formats;
      for (var W = (M = I.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(F, S, v) {
        var U = v && v.toUpperCase();
        return S || V[v] || r[v] || V[U].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(u, m2, T) {
          return m2 || T.slice(1);
        });
      })).match(n), Z = W.length, Q = 0; Q < Z; Q += 1) {
        var D = W[Q], H = q[D], x = H && H[0], Y = H && H[1];
        W[Q] = Y ? { regex: x, parser: Y } : D.replace(/^\[|\]$/g, "");
      }
      return function(F) {
        for (var S = {}, v = 0, U = 0; v < Z; v += 1) {
          var u = W[v];
          if (typeof u == "string")
            U += u.length;
          else {
            var m2 = u.regex, T = u.parser, d = F.slice(U), w = m2.exec(d)[0];
            T.call(S, w), F = F.replace(w, "");
          }
        }
        return function(c) {
          var l = c.afternoon;
          if (l !== void 0) {
            var o = c.hours;
            l ? o < 12 && (c.hours += 12) : o === 12 && (c.hours = 0), delete c.afternoon;
          }
        }(S), S;
      };
    }
    return function(M, I, V) {
      V.p.customParseFormat = true, M && M.parseTwoDigitYear && (p = M.parseTwoDigitYear);
      var W = I.prototype, Z = W.parse;
      W.parse = function(Q) {
        var D = Q.date, H = Q.utc, x = Q.args;
        this.$u = H;
        var Y = x[1];
        if (typeof Y == "string") {
          var F = x[2] === true, S = x[3] === true, v = F || S, U = x[2];
          S && (U = x[2]), _ = this.$locale(), !F && U && (_ = V.Ls[U]), this.$d = function(d, w, c, l) {
            try {
              if (["x", "X"].indexOf(w) > -1)
                return new Date((w === "X" ? 1e3 : 1) * d);
              var o = O(w)(d), P = o.year, z = o.month, R2 = o.day, K = o.hours, G2 = o.minutes, $ = o.seconds, at = o.milliseconds, k = o.zone, A = o.week, N = /* @__PURE__ */ new Date(), f = R2 || (P || z ? 1 : N.getDate()), J = P || N.getFullYear(), L = 0;
              P && !z || (L = z > 0 ? z - 1 : N.getMonth());
              var j, X = K || 0, nt = G2 || 0, st = $ || 0, pt = at || 0;
              return k ? new Date(Date.UTC(J, L, f, X, nt, st, pt + 60 * k.offset * 1e3)) : c ? new Date(Date.UTC(J, L, f, X, nt, st, pt)) : (j = new Date(J, L, f, X, nt, st, pt), A && (j = l(j).week(A).toDate()), j);
            } catch {
              return /* @__PURE__ */ new Date("");
            }
          }(D, Y, H, V), this.init(), U && U !== true && (this.$L = this.locale(U).$L), v && D != this.format(Y) && (this.$d = /* @__PURE__ */ new Date("")), _ = {};
        } else if (Y instanceof Array)
          for (var u = Y.length, m2 = 1; m2 <= u; m2 += 1) {
            x[1] = Y[m2 - 1];
            var T = V.apply(this, x);
            if (T.isValid()) {
              this.$d = T.$d, this.$L = T.$L, this.init();
              break;
            }
            m2 === u && (this.$d = /* @__PURE__ */ new Date(""));
          }
        else
          Z.call(this, Q);
      };
    };
  });
})(Tr);
var Yi = Tr.exports;
const Ui = /* @__PURE__ */ Xv(Yi);
var br = { exports: {} };
(function(t2, e) {
  (function(r, n) {
    t2.exports = n();
  })(Vv, function() {
    return function(r, n) {
      var i = n.prototype, a = i.format;
      i.format = function(s) {
        var y = this, _ = this.$locale();
        if (!this.isValid())
          return a.bind(this)(s);
        var p = this.$utils(), g = (s || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(E) {
          switch (E) {
            case "Q":
              return Math.ceil((y.$M + 1) / 3);
            case "Do":
              return _.ordinal(y.$D);
            case "gggg":
              return y.weekYear();
            case "GGGG":
              return y.isoWeekYear();
            case "wo":
              return _.ordinal(y.week(), "W");
            case "w":
            case "ww":
              return p.s(y.week(), E === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return p.s(y.isoWeek(), E === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return p.s(String(y.$H === 0 ? 24 : y.$H), E === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(y.$d.getTime() / 1e3);
            case "x":
              return y.$d.getTime();
            case "z":
              return "[" + y.offsetName() + "]";
            case "zzz":
              return "[" + y.offsetName("long") + "]";
            default:
              return E;
          }
        });
        return a.bind(this)(g);
      };
    };
  });
})(br);
var Ei = br.exports;
const Li = /* @__PURE__ */ Xv(Ei);
var ye = function() {
  var t2 = /* @__PURE__ */ m(function(U, u, m2, T) {
    for (m2 = m2 || {}, T = U.length; T--; m2[U[T]] = u)
      ;
    return m2;
  }, "o"), e = [6, 8, 10, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 35, 36, 38, 40], r = [1, 26], n = [1, 27], i = [1, 28], a = [1, 29], s = [1, 30], y = [1, 31], _ = [1, 32], p = [1, 33], g = [1, 34], E = [1, 9], C = [1, 10], b = [1, 11], q = [1, 12], O = [1, 13], M = [1, 14], I = [1, 15], V = [1, 16], W = [1, 19], Z = [1, 20], Q = [1, 21], D = [1, 22], H = [1, 23], x = [1, 25], Y = [1, 35], F = {
    trace: /* @__PURE__ */ m(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, gantt: 4, document: 5, EOF: 6, line: 7, SPACE: 8, statement: 9, NL: 10, weekday: 11, weekday_monday: 12, weekday_tuesday: 13, weekday_wednesday: 14, weekday_thursday: 15, weekday_friday: 16, weekday_saturday: 17, weekday_sunday: 18, weekend: 19, weekend_friday: 20, weekend_saturday: 21, dateFormat: 22, inclusiveEndDates: 23, topAxis: 24, axisFormat: 25, tickInterval: 26, excludes: 27, includes: 28, todayMarker: 29, title: 30, acc_title: 31, acc_title_value: 32, acc_descr: 33, acc_descr_value: 34, acc_descr_multiline_value: 35, section: 36, clickStatement: 37, taskTxt: 38, taskData: 39, click: 40, callbackname: 41, callbackargs: 42, href: 43, clickStatementDebug: 44, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "gantt", 6: "EOF", 8: "SPACE", 10: "NL", 12: "weekday_monday", 13: "weekday_tuesday", 14: "weekday_wednesday", 15: "weekday_thursday", 16: "weekday_friday", 17: "weekday_saturday", 18: "weekday_sunday", 20: "weekend_friday", 21: "weekend_saturday", 22: "dateFormat", 23: "inclusiveEndDates", 24: "topAxis", 25: "axisFormat", 26: "tickInterval", 27: "excludes", 28: "includes", 29: "todayMarker", 30: "title", 31: "acc_title", 32: "acc_title_value", 33: "acc_descr", 34: "acc_descr_value", 35: "acc_descr_multiline_value", 36: "section", 38: "taskTxt", 39: "taskData", 40: "click", 41: "callbackname", 42: "callbackargs", 43: "href" },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [19, 1], [19, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 2], [9, 2], [9, 1], [9, 1], [9, 1], [9, 2], [37, 2], [37, 3], [37, 3], [37, 4], [37, 3], [37, 4], [37, 2], [44, 2], [44, 3], [44, 3], [44, 4], [44, 3], [44, 4], [44, 2]],
    performAction: /* @__PURE__ */ m(function(u, m2, T, d, w, c, l) {
      var o = c.length - 1;
      switch (w) {
        case 1:
          return c[o - 1];
        case 2:
          this.$ = [];
          break;
        case 3:
          c[o - 1].push(c[o]), this.$ = c[o - 1];
          break;
        case 4:
        case 5:
          this.$ = c[o];
          break;
        case 6:
        case 7:
          this.$ = [];
          break;
        case 8:
          d.setWeekday("monday");
          break;
        case 9:
          d.setWeekday("tuesday");
          break;
        case 10:
          d.setWeekday("wednesday");
          break;
        case 11:
          d.setWeekday("thursday");
          break;
        case 12:
          d.setWeekday("friday");
          break;
        case 13:
          d.setWeekday("saturday");
          break;
        case 14:
          d.setWeekday("sunday");
          break;
        case 15:
          d.setWeekend("friday");
          break;
        case 16:
          d.setWeekend("saturday");
          break;
        case 17:
          d.setDateFormat(c[o].substr(11)), this.$ = c[o].substr(11);
          break;
        case 18:
          d.enableInclusiveEndDates(), this.$ = c[o].substr(18);
          break;
        case 19:
          d.TopAxis(), this.$ = c[o].substr(8);
          break;
        case 20:
          d.setAxisFormat(c[o].substr(11)), this.$ = c[o].substr(11);
          break;
        case 21:
          d.setTickInterval(c[o].substr(13)), this.$ = c[o].substr(13);
          break;
        case 22:
          d.setExcludes(c[o].substr(9)), this.$ = c[o].substr(9);
          break;
        case 23:
          d.setIncludes(c[o].substr(9)), this.$ = c[o].substr(9);
          break;
        case 24:
          d.setTodayMarker(c[o].substr(12)), this.$ = c[o].substr(12);
          break;
        case 27:
          d.setDiagramTitle(c[o].substr(6)), this.$ = c[o].substr(6);
          break;
        case 28:
          this.$ = c[o].trim(), d.setAccTitle(this.$);
          break;
        case 29:
        case 30:
          this.$ = c[o].trim(), d.setAccDescription(this.$);
          break;
        case 31:
          d.addSection(c[o].substr(8)), this.$ = c[o].substr(8);
          break;
        case 33:
          d.addTask(c[o - 1], c[o]), this.$ = "task";
          break;
        case 34:
          this.$ = c[o - 1], d.setClickEvent(c[o - 1], c[o], null);
          break;
        case 35:
          this.$ = c[o - 2], d.setClickEvent(c[o - 2], c[o - 1], c[o]);
          break;
        case 36:
          this.$ = c[o - 2], d.setClickEvent(c[o - 2], c[o - 1], null), d.setLink(c[o - 2], c[o]);
          break;
        case 37:
          this.$ = c[o - 3], d.setClickEvent(c[o - 3], c[o - 2], c[o - 1]), d.setLink(c[o - 3], c[o]);
          break;
        case 38:
          this.$ = c[o - 2], d.setClickEvent(c[o - 2], c[o], null), d.setLink(c[o - 2], c[o - 1]);
          break;
        case 39:
          this.$ = c[o - 3], d.setClickEvent(c[o - 3], c[o - 1], c[o]), d.setLink(c[o - 3], c[o - 2]);
          break;
        case 40:
          this.$ = c[o - 1], d.setLink(c[o - 1], c[o]);
          break;
        case 41:
        case 47:
          this.$ = c[o - 1] + " " + c[o];
          break;
        case 42:
        case 43:
        case 45:
          this.$ = c[o - 2] + " " + c[o - 1] + " " + c[o];
          break;
        case 44:
        case 46:
          this.$ = c[o - 3] + " " + c[o - 2] + " " + c[o - 1] + " " + c[o];
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, t2(e, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: 17, 12: r, 13: n, 14: i, 15: a, 16: s, 17: y, 18: _, 19: 18, 20: p, 21: g, 22: E, 23: C, 24: b, 25: q, 26: O, 27: M, 28: I, 29: V, 30: W, 31: Z, 33: Q, 35: D, 36: H, 37: 24, 38: x, 40: Y }, t2(e, [2, 7], { 1: [2, 1] }), t2(e, [2, 3]), { 9: 36, 11: 17, 12: r, 13: n, 14: i, 15: a, 16: s, 17: y, 18: _, 19: 18, 20: p, 21: g, 22: E, 23: C, 24: b, 25: q, 26: O, 27: M, 28: I, 29: V, 30: W, 31: Z, 33: Q, 35: D, 36: H, 37: 24, 38: x, 40: Y }, t2(e, [2, 5]), t2(e, [2, 6]), t2(e, [2, 17]), t2(e, [2, 18]), t2(e, [2, 19]), t2(e, [2, 20]), t2(e, [2, 21]), t2(e, [2, 22]), t2(e, [2, 23]), t2(e, [2, 24]), t2(e, [2, 25]), t2(e, [2, 26]), t2(e, [2, 27]), { 32: [1, 37] }, { 34: [1, 38] }, t2(e, [2, 30]), t2(e, [2, 31]), t2(e, [2, 32]), { 39: [1, 39] }, t2(e, [2, 8]), t2(e, [2, 9]), t2(e, [2, 10]), t2(e, [2, 11]), t2(e, [2, 12]), t2(e, [2, 13]), t2(e, [2, 14]), t2(e, [2, 15]), t2(e, [2, 16]), { 41: [1, 40], 43: [1, 41] }, t2(e, [2, 4]), t2(e, [2, 28]), t2(e, [2, 29]), t2(e, [2, 33]), t2(e, [2, 34], { 42: [1, 42], 43: [1, 43] }), t2(e, [2, 40], { 41: [1, 44] }), t2(e, [2, 35], { 43: [1, 45] }), t2(e, [2, 36]), t2(e, [2, 38], { 42: [1, 46] }), t2(e, [2, 37]), t2(e, [2, 39])],
    defaultActions: {},
    parseError: /* @__PURE__ */ m(function(u, m2) {
      if (m2.recoverable)
        this.trace(u);
      else {
        var T = new Error(u);
        throw T.hash = m2, T;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m(function(u) {
      var m$1 = this, T = [0], d = [], w = [null], c = [], l = this.table, o = "", P = 0, z = 0, R2 = 2, K = 1, G2 = c.slice.call(arguments, 1), $ = Object.create(this.lexer), at = { yy: {} };
      for (var k in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, k) && (at.yy[k] = this.yy[k]);
      $.setInput(u, at.yy), at.yy.lexer = $, at.yy.parser = this, typeof $.yylloc > "u" && ($.yylloc = {});
      var A = $.yylloc;
      c.push(A);
      var N = $.options && $.options.ranges;
      typeof at.yy.parseError == "function" ? this.parseError = at.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function f(ot) {
        T.length = T.length - 2 * ot, w.length = w.length - ot, c.length = c.length - ot;
      }
      m(f, "popStack");
      function J() {
        var ot;
        return ot = d.pop() || $.lex() || K, typeof ot != "number" && (ot instanceof Array && (d = ot, ot = d.pop()), ot = m$1.symbols_[ot] || ot), ot;
      }
      m(J, "lex");
      for (var L, j, X, nt, st = {}, pt, lt, Ae, Bt; ; ) {
        if (j = T[T.length - 1], this.defaultActions[j] ? X = this.defaultActions[j] : ((L === null || typeof L > "u") && (L = J()), X = l[j] && l[j][L]), typeof X > "u" || !X.length || !X[0]) {
          var re = "";
          Bt = [];
          for (pt in l[j])
            this.terminals_[pt] && pt > R2 && Bt.push("'" + this.terminals_[pt] + "'");
          $.showPosition ? re = "Parse error on line " + (P + 1) + `:
` + $.showPosition() + `
Expecting ` + Bt.join(", ") + ", got '" + (this.terminals_[L] || L) + "'" : re = "Parse error on line " + (P + 1) + ": Unexpected " + (L == K ? "end of input" : "'" + (this.terminals_[L] || L) + "'"), this.parseError(re, {
            text: $.match,
            token: this.terminals_[L] || L,
            line: $.yylineno,
            loc: A,
            expected: Bt
          });
        }
        if (X[0] instanceof Array && X.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + j + ", token: " + L);
        switch (X[0]) {
          case 1:
            T.push(L), w.push($.yytext), c.push($.yylloc), T.push(X[1]), L = null, z = $.yyleng, o = $.yytext, P = $.yylineno, A = $.yylloc;
            break;
          case 2:
            if (lt = this.productions_[X[1]][1], st.$ = w[w.length - lt], st._$ = {
              first_line: c[c.length - (lt || 1)].first_line,
              last_line: c[c.length - 1].last_line,
              first_column: c[c.length - (lt || 1)].first_column,
              last_column: c[c.length - 1].last_column
            }, N && (st._$.range = [
              c[c.length - (lt || 1)].range[0],
              c[c.length - 1].range[1]
            ]), nt = this.performAction.apply(st, [
              o,
              z,
              P,
              at.yy,
              X[1],
              w,
              c
            ].concat(G2)), typeof nt < "u")
              return nt;
            lt && (T = T.slice(0, -1 * lt * 2), w = w.slice(0, -1 * lt), c = c.slice(0, -1 * lt)), T.push(this.productions_[X[1]][0]), w.push(st.$), c.push(st._$), Ae = l[T[T.length - 2]][T[T.length - 1]], T.push(Ae);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, S = /* @__PURE__ */ function() {
    var U = {
      EOF: 1,
      parseError: /* @__PURE__ */ m(function(m2, T) {
        if (this.yy.parser)
          this.yy.parser.parseError(m2, T);
        else
          throw new Error(m2);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m(function(u, m2) {
        return this.yy = m2 || this.yy || {}, this._input = u, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m(function() {
        var u = this._input[0];
        this.yytext += u, this.yyleng++, this.offset++, this.match += u, this.matched += u;
        var m2 = u.match(/(?:\r\n?|\n).*/g);
        return m2 ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), u;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m(function(u) {
        var m2 = u.length, T = u.split(/(?:\r\n?|\n)/g);
        this._input = u + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - m2), this.offset -= m2;
        var d = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), T.length - 1 && (this.yylineno -= T.length - 1);
        var w = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: T ? (T.length === d.length ? this.yylloc.first_column : 0) + d[d.length - T.length].length - T[0].length : this.yylloc.first_column - m2
        }, this.options.ranges && (this.yylloc.range = [w[0], w[0] + this.yyleng - m2]), this.yyleng = this.yytext.length, this;
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
      less: /* @__PURE__ */ m(function(u) {
        this.unput(this.match.slice(u));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m(function() {
        var u = this.matched.substr(0, this.matched.length - this.match.length);
        return (u.length > 20 ? "..." : "") + u.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m(function() {
        var u = this.match;
        return u.length < 20 && (u += this._input.substr(0, 20 - u.length)), (u.substr(0, 20) + (u.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m(function() {
        var u = this.pastInput(), m2 = new Array(u.length + 1).join("-");
        return u + this.upcomingInput() + `
` + m2 + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m(function(u, m2) {
        var T, d, w;
        if (this.options.backtrack_lexer && (w = {
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
        }, this.options.ranges && (w.yylloc.range = this.yylloc.range.slice(0))), d = u[0].match(/(?:\r\n?|\n).*/g), d && (this.yylineno += d.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: d ? d[d.length - 1].length - d[d.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + u[0].length
        }, this.yytext += u[0], this.match += u[0], this.matches = u, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(u[0].length), this.matched += u[0], T = this.performAction.call(this, this.yy, this, m2, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), T)
          return T;
        if (this._backtrack) {
          for (var c in w)
            this[c] = w[c];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var u, m2, T, d;
        this._more || (this.yytext = "", this.match = "");
        for (var w = this._currentRules(), c = 0; c < w.length; c++)
          if (T = this._input.match(this.rules[w[c]]), T && (!m2 || T[0].length > m2[0].length)) {
            if (m2 = T, d = c, this.options.backtrack_lexer) {
              if (u = this.test_match(T, w[c]), u !== false)
                return u;
              if (this._backtrack) {
                m2 = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return m2 ? (u = this.test_match(m2, w[d]), u !== false ? u : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ m(function() {
        var m2 = this.next();
        return m2 || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ m(function(m2) {
        this.conditionStack.push(m2);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ m(function() {
        var m2 = this.conditionStack.length - 1;
        return m2 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ m(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ m(function(m2) {
        return m2 = this.conditionStack.length - 1 - Math.abs(m2 || 0), m2 >= 0 ? this.conditionStack[m2] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ m(function(m2) {
        this.begin(m2);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ m(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: /* @__PURE__ */ m(function(m2, T, d, w) {
        switch (d) {
          case 0:
            return this.begin("open_directive"), "open_directive";
          case 1:
            return this.begin("acc_title"), 31;
          case 2:
            return this.popState(), "acc_title_value";
          case 3:
            return this.begin("acc_descr"), 33;
          case 4:
            return this.popState(), "acc_descr_value";
          case 5:
            this.begin("acc_descr_multiline");
            break;
          case 6:
            this.popState();
            break;
          case 7:
            return "acc_descr_multiline_value";
          case 8:
            break;
          case 9:
            break;
          case 10:
            break;
          case 11:
            return 10;
          case 12:
            break;
          case 13:
            break;
          case 14:
            this.begin("href");
            break;
          case 15:
            this.popState();
            break;
          case 16:
            return 43;
          case 17:
            this.begin("callbackname");
            break;
          case 18:
            this.popState();
            break;
          case 19:
            this.popState(), this.begin("callbackargs");
            break;
          case 20:
            return 41;
          case 21:
            this.popState();
            break;
          case 22:
            return 42;
          case 23:
            this.begin("click");
            break;
          case 24:
            this.popState();
            break;
          case 25:
            return 40;
          case 26:
            return 4;
          case 27:
            return 22;
          case 28:
            return 23;
          case 29:
            return 24;
          case 30:
            return 25;
          case 31:
            return 26;
          case 32:
            return 28;
          case 33:
            return 27;
          case 34:
            return 29;
          case 35:
            return 12;
          case 36:
            return 13;
          case 37:
            return 14;
          case 38:
            return 15;
          case 39:
            return 16;
          case 40:
            return 17;
          case 41:
            return 18;
          case 42:
            return 20;
          case 43:
            return 21;
          case 44:
            return "date";
          case 45:
            return 30;
          case 46:
            return "accDescription";
          case 47:
            return 36;
          case 48:
            return 38;
          case 49:
            return 39;
          case 50:
            return ":";
          case 51:
            return 6;
          case 52:
            return "INVALID";
        }
      }, "anonymous"),
      rules: [/^(?:%%\{)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:%%(?!\{)*[^\n]*)/i, /^(?:[^\}]%%*[^\n]*)/i, /^(?:%%*[^\n]*[\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:%[^\n]*)/i, /^(?:href[\s]+["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:call[\s]+)/i, /^(?:\([\s]*\))/i, /^(?:\()/i, /^(?:[^(]*)/i, /^(?:\))/i, /^(?:[^)]*)/i, /^(?:click[\s]+)/i, /^(?:[\s\n])/i, /^(?:[^\s\n]*)/i, /^(?:gantt\b)/i, /^(?:dateFormat\s[^#\n;]+)/i, /^(?:inclusiveEndDates\b)/i, /^(?:topAxis\b)/i, /^(?:axisFormat\s[^#\n;]+)/i, /^(?:tickInterval\s[^#\n;]+)/i, /^(?:includes\s[^#\n;]+)/i, /^(?:excludes\s[^#\n;]+)/i, /^(?:todayMarker\s[^\n;]+)/i, /^(?:weekday\s+monday\b)/i, /^(?:weekday\s+tuesday\b)/i, /^(?:weekday\s+wednesday\b)/i, /^(?:weekday\s+thursday\b)/i, /^(?:weekday\s+friday\b)/i, /^(?:weekday\s+saturday\b)/i, /^(?:weekday\s+sunday\b)/i, /^(?:weekend\s+friday\b)/i, /^(?:weekend\s+saturday\b)/i, /^(?:\d\d\d\d-\d\d-\d\d\b)/i, /^(?:title\s[^\n]+)/i, /^(?:accDescription\s[^#\n;]+)/i, /^(?:section\s[^\n]+)/i, /^(?:[^:\n]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { acc_descr_multiline: { rules: [6, 7], inclusive: false }, acc_descr: { rules: [4], inclusive: false }, acc_title: { rules: [2], inclusive: false }, callbackargs: { rules: [21, 22], inclusive: false }, callbackname: { rules: [18, 19, 20], inclusive: false }, href: { rules: [15, 16], inclusive: false }, click: { rules: [24, 25], inclusive: false }, INITIAL: { rules: [0, 1, 3, 5, 8, 9, 10, 11, 12, 13, 14, 17, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], inclusive: true } }
    };
    return U;
  }();
  F.lexer = S;
  function v() {
    this.yy = {};
  }
  return m(v, "Parser"), v.prototype = F, F.Parser = v, new v();
}();
ye.parser = ye;
var Ai = ye;
Kv.extend(Fi);
Kv.extend(Ui);
Kv.extend(Li);
var Ge = { friday: 5, saturday: 6 }, ut = "", De = "", Ce = void 0, Me = "", zt = [], Pt = [], _e = /* @__PURE__ */ new Map(), Se = [], te = [], Et = "", Fe = "", xr = ["active", "done", "crit", "milestone", "vert"], Ye = [], Rt = false, Ue = false, Ee = "sunday", ee = "saturday", ke = 0, Ii = /* @__PURE__ */ m(function() {
  Se = [], te = [], Et = "", Ye = [], Gt = 0, ve = void 0, jt = void 0, tt = [], ut = "", De = "", Fe = "", Ce = void 0, Me = "", zt = [], Pt = [], Rt = false, Ue = false, ke = 0, _e = /* @__PURE__ */ new Map(), M5(), Ee = "sunday", ee = "saturday";
}, "clear"), Wi = /* @__PURE__ */ m(function(t2) {
  De = t2;
}, "setAxisFormat"), Oi = /* @__PURE__ */ m(function() {
  return De;
}, "getAxisFormat"), Hi = /* @__PURE__ */ m(function(t2) {
  Ce = t2;
}, "setTickInterval"), Ni = /* @__PURE__ */ m(function() {
  return Ce;
}, "getTickInterval"), Vi = /* @__PURE__ */ m(function(t2) {
  Me = t2;
}, "setTodayMarker"), zi = /* @__PURE__ */ m(function() {
  return Me;
}, "getTodayMarker"), Pi = /* @__PURE__ */ m(function(t2) {
  ut = t2;
}, "setDateFormat"), Ri = /* @__PURE__ */ m(function() {
  Rt = true;
}, "enableInclusiveEndDates"), Bi = /* @__PURE__ */ m(function() {
  return Rt;
}, "endDatesAreInclusive"), Zi = /* @__PURE__ */ m(function() {
  Ue = true;
}, "enableTopAxis"), Xi = /* @__PURE__ */ m(function() {
  return Ue;
}, "topAxisEnabled"), qi = /* @__PURE__ */ m(function(t2) {
  Fe = t2;
}, "setDisplayMode"), Gi = /* @__PURE__ */ m(function() {
  return Fe;
}, "getDisplayMode"), ji = /* @__PURE__ */ m(function() {
  return ut;
}, "getDateFormat"), Qi = /* @__PURE__ */ m(function(t2) {
  zt = t2.toLowerCase().split(/[\s,]+/);
}, "setIncludes"), $i = /* @__PURE__ */ m(function() {
  return zt;
}, "getIncludes"), Ji = /* @__PURE__ */ m(function(t2) {
  Pt = t2.toLowerCase().split(/[\s,]+/);
}, "setExcludes"), Ki = /* @__PURE__ */ m(function() {
  return Pt;
}, "getExcludes"), ta = /* @__PURE__ */ m(function() {
  return _e;
}, "getLinks"), ea = /* @__PURE__ */ m(function(t2) {
  Et = t2, Se.push(t2);
}, "addSection"), ra = /* @__PURE__ */ m(function() {
  return Se;
}, "getSections"), na = /* @__PURE__ */ m(function() {
  let t2 = je();
  const e = 10;
  let r = 0;
  for (; !t2 && r < e; )
    t2 = je(), r++;
  return te = tt, te;
}, "getTasks"), wr = /* @__PURE__ */ m(function(t2, e, r, n) {
  const i = t2.format(e.trim()), a = t2.format("YYYY-MM-DD");
  return n.includes(i) || n.includes(a) ? false : r.includes("weekends") && (t2.isoWeekday() === Ge[ee] || t2.isoWeekday() === Ge[ee] + 1) || r.includes(t2.format("dddd").toLowerCase()) ? true : r.includes(i) || r.includes(a);
}, "isInvalidDate"), ia = /* @__PURE__ */ m(function(t2) {
  Ee = t2;
}, "setWeekday"), aa = /* @__PURE__ */ m(function() {
  return Ee;
}, "getWeekday"), sa = /* @__PURE__ */ m(function(t2) {
  ee = t2;
}, "setWeekend"), Dr = /* @__PURE__ */ m(function(t2, e, r, n) {
  if (!r.length || t2.manualEndTime)
    return;
  let i;
  t2.startTime instanceof Date ? i = Kv(t2.startTime) : i = Kv(t2.startTime, e, true), i = i.add(1, "d");
  let a;
  t2.endTime instanceof Date ? a = Kv(t2.endTime) : a = Kv(t2.endTime, e, true);
  const [s, y] = oa(
    i,
    a,
    e,
    r,
    n
  );
  t2.endTime = s.toDate(), t2.renderEndTime = y;
}, "checkTaskDates"), oa = /* @__PURE__ */ m(function(t2, e, r, n, i) {
  let a = false, s = null;
  for (; t2 <= e; )
    a || (s = e.toDate()), a = wr(t2, r, n, i), a && (e = e.add(1, "d")), t2 = t2.add(1, "d");
  return [e, s];
}, "fixTaskDates"), pe = /* @__PURE__ */ m(function(t2, e, r) {
  if (r = r.trim(), (e.trim() === "x" || e.trim() === "X") && /^\d+$/.test(r))
    return new Date(Number(r));
  const i = /^after\s+(?<ids>[\d\w- ]+)/.exec(r);
  if (i !== null) {
    let s = null;
    for (const _ of i.groups.ids.split(" ")) {
      let p = Ct(_);
      p !== void 0 && (!s || p.endTime > s.endTime) && (s = p);
    }
    if (s)
      return s.endTime;
    const y = /* @__PURE__ */ new Date();
    return y.setHours(0, 0, 0, 0), y;
  }
  let a = Kv(r, e.trim(), true);
  if (a.isValid())
    return a.toDate();
  {
    R.debug("Invalid date:" + r), R.debug("With date format:" + e.trim());
    const s = new Date(r);
    if (s === void 0 || isNaN(s.getTime()) || // WebKit browsers can mis-parse invalid dates to be ridiculously
    // huge numbers, e.g. new Date('202304') gets parsed as January 1, 202304.
    // This can cause virtually infinite loops while rendering, so for the
    // purposes of Gantt charts we'll just treat any date beyond 10,000 AD/BC as
    // invalid.
    s.getFullYear() < -1e4 || s.getFullYear() > 1e4)
      throw new Error("Invalid date:" + r);
    return s;
  }
}, "getStartDate"), Cr = /* @__PURE__ */ m(function(t2) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t2.trim());
  return e !== null ? [Number.parseFloat(e[1]), e[2]] : [NaN, "ms"];
}, "parseDuration"), Mr = /* @__PURE__ */ m(function(t2, e, r, n = false) {
  r = r.trim();
  const a = /^until\s+(?<ids>[\d\w- ]+)/.exec(r);
  if (a !== null) {
    let g = null;
    for (const C of a.groups.ids.split(" ")) {
      let b = Ct(C);
      b !== void 0 && (!g || b.startTime < g.startTime) && (g = b);
    }
    if (g)
      return g.startTime;
    const E = /* @__PURE__ */ new Date();
    return E.setHours(0, 0, 0, 0), E;
  }
  let s = Kv(r, e.trim(), true);
  if (s.isValid())
    return n && (s = s.add(1, "d")), s.toDate();
  let y = Kv(t2);
  const [_, p] = Cr(r);
  if (!Number.isNaN(_)) {
    const g = y.add(_, p);
    g.isValid() && (y = g);
  }
  return y.toDate();
}, "getEndDate"), Gt = 0, Ft = /* @__PURE__ */ m(function(t2) {
  return t2 === void 0 ? (Gt = Gt + 1, "task" + Gt) : t2;
}, "parseId"), ca = /* @__PURE__ */ m(function(t2, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), i = {};
  Le(n, i, xr);
  for (let s = 0; s < n.length; s++)
    n[s] = n[s].trim();
  let a = "";
  switch (n.length) {
    case 1:
      i.id = Ft(), i.startTime = t2.endTime, a = n[0];
      break;
    case 2:
      i.id = Ft(), i.startTime = pe(void 0, ut, n[0]), a = n[1];
      break;
    case 3:
      i.id = Ft(n[0]), i.startTime = pe(void 0, ut, n[1]), a = n[2];
      break;
  }
  return a && (i.endTime = Mr(i.startTime, ut, a, Rt), i.manualEndTime = Kv(a, "YYYY-MM-DD", true).isValid(), Dr(i, ut, Pt, zt)), i;
}, "compileData"), la = /* @__PURE__ */ m(function(t2, e) {
  let r;
  e.substr(0, 1) === ":" ? r = e.substr(1, e.length) : r = e;
  const n = r.split(","), i = {};
  Le(n, i, xr);
  for (let a = 0; a < n.length; a++)
    n[a] = n[a].trim();
  switch (n.length) {
    case 1:
      i.id = Ft(), i.startTime = {
        type: "prevTaskEnd",
        id: t2
      }, i.endTime = {
        data: n[0]
      };
      break;
    case 2:
      i.id = Ft(), i.startTime = {
        type: "getStartDate",
        startData: n[0]
      }, i.endTime = {
        data: n[1]
      };
      break;
    case 3:
      i.id = Ft(n[0]), i.startTime = {
        type: "getStartDate",
        startData: n[1]
      }, i.endTime = {
        data: n[2]
      };
      break;
  }
  return i;
}, "parseData"), ve, jt, tt = [], _r = {}, ua = /* @__PURE__ */ m(function(t2, e) {
  const r = {
    section: Et,
    type: Et,
    processed: false,
    manualEndTime: false,
    renderEndTime: null,
    raw: { data: e },
    task: t2,
    classes: []
  }, n = la(jt, e);
  r.raw.startTime = n.startTime, r.raw.endTime = n.endTime, r.id = n.id, r.prevTaskId = jt, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, r.vert = n.vert, r.order = ke, ke++;
  const i = tt.push(r);
  jt = r.id, _r[r.id] = i - 1;
}, "addTask"), Ct = /* @__PURE__ */ m(function(t2) {
  const e = _r[t2];
  return tt[e];
}, "findTaskById"), fa = /* @__PURE__ */ m(function(t2, e) {
  const r = {
    section: Et,
    type: Et,
    description: t2,
    task: t2,
    classes: []
  }, n = ca(ve, e);
  r.startTime = n.startTime, r.endTime = n.endTime, r.id = n.id, r.active = n.active, r.done = n.done, r.crit = n.crit, r.milestone = n.milestone, r.vert = n.vert, ve = r, te.push(r);
}, "addTaskOrg"), je = /* @__PURE__ */ m(function() {
  const t2 = /* @__PURE__ */ m(function(r) {
    const n = tt[r];
    let i = "";
    switch (tt[r].raw.startTime.type) {
      case "prevTaskEnd": {
        const a = Ct(n.prevTaskId);
        n.startTime = a.endTime;
        break;
      }
      case "getStartDate":
        i = pe(void 0, ut, tt[r].raw.startTime.startData), i && (tt[r].startTime = i);
        break;
    }
    return tt[r].startTime && (tt[r].endTime = Mr(
      tt[r].startTime,
      ut,
      tt[r].raw.endTime.data,
      Rt
    ), tt[r].endTime && (tt[r].processed = true, tt[r].manualEndTime = Kv(
      tt[r].raw.endTime.data,
      "YYYY-MM-DD",
      true
    ).isValid(), Dr(tt[r], ut, Pt, zt))), tt[r].processed;
  }, "compileTask");
  let e = true;
  for (const [r, n] of tt.entries())
    t2(r), e = e && n.processed;
  return e;
}, "compileTasks"), ha = /* @__PURE__ */ m(function(t2, e) {
  let r = e;
  yt$1().securityLevel !== "loose" && (r = bm(e)), t2.split(",").forEach(function(n) {
    Ct(n) !== void 0 && (Fr(n, () => {
      window.open(r, "_self");
    }), _e.set(n, r));
  }), Sr(t2, "clickable");
}, "setLink"), Sr = /* @__PURE__ */ m(function(t2, e) {
  t2.split(",").forEach(function(r) {
    let n = Ct(r);
    n !== void 0 && n.classes.push(e);
  });
}, "setClass"), da = /* @__PURE__ */ m(function(t2, e, r) {
  if (yt$1().securityLevel !== "loose" || e === void 0)
    return;
  let n = [];
  if (typeof r == "string") {
    n = r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let a = 0; a < n.length; a++) {
      let s = n[a].trim();
      s.startsWith('"') && s.endsWith('"') && (s = s.substr(1, s.length - 2)), n[a] = s;
    }
  }
  n.length === 0 && n.push(t2), Ct(t2) !== void 0 && Fr(t2, () => {
    $e.runFunc(e, ...n);
  });
}, "setClickFun"), Fr = /* @__PURE__ */ m(function(t2, e) {
  Ye.push(
    function() {
      const r = document.querySelector(`[id="${t2}"]`);
      r !== null && r.addEventListener("click", function() {
        e();
      });
    },
    function() {
      const r = document.querySelector(`[id="${t2}-text"]`);
      r !== null && r.addEventListener("click", function() {
        e();
      });
    }
  );
}, "pushFun"), ma = /* @__PURE__ */ m(function(t2, e, r) {
  t2.split(",").forEach(function(n) {
    da(n, e, r);
  }), Sr(t2, "clickable");
}, "setClickEvent"), ga = /* @__PURE__ */ m(function(t2) {
  Ye.forEach(function(e) {
    e(t2);
  });
}, "bindFunctions"), ya = {
  getConfig: /* @__PURE__ */ m(() => yt$1().gantt, "getConfig"),
  clear: Ii,
  setDateFormat: Pi,
  getDateFormat: ji,
  enableInclusiveEndDates: Ri,
  endDatesAreInclusive: Bi,
  enableTopAxis: Zi,
  topAxisEnabled: Xi,
  setAxisFormat: Wi,
  getAxisFormat: Oi,
  setTickInterval: Hi,
  getTickInterval: Ni,
  setTodayMarker: Vi,
  getTodayMarker: zi,
  setAccTitle: $5,
  getAccTitle: B5,
  setDiagramTitle: R5,
  getDiagramTitle: I5,
  setDisplayMode: qi,
  getDisplayMode: Gi,
  setAccDescription: F5,
  getAccDescription: D5,
  addSection: ea,
  getSections: ra,
  getTasks: na,
  addTask: ua,
  findTaskById: Ct,
  addTaskOrg: fa,
  setIncludes: Qi,
  getIncludes: $i,
  setExcludes: Ji,
  getExcludes: Ki,
  setClickEvent: ma,
  setLink: ha,
  getLinks: ta,
  bindFunctions: ga,
  parseDuration: Cr,
  isInvalidDate: wr,
  setWeekday: ia,
  getWeekday: aa,
  setWeekend: sa
};
function Le(t2, e, r) {
  let n = true;
  for (; n; )
    n = false, r.forEach(function(i) {
      const a = "^\\s*" + i + "\\s*$", s = new RegExp(a);
      t2[0].match(s) && (e[i] = true, t2.shift(1), n = true);
    });
}
m(Le, "getTaskTags");
var ka = /* @__PURE__ */ m(function() {
  R.debug("Something is calling, setConf, remove the call");
}, "setConf"), Qe = {
  monday: Ht,
  tuesday: lr,
  wednesday: ur,
  thursday: bt,
  friday: fr,
  saturday: hr,
  sunday: Vt
}, pa = /* @__PURE__ */ m((t2, e) => {
  let r = [...t2].map(() => -1 / 0), n = [...t2].sort((a, s) => a.startTime - s.startTime || a.order - s.order), i = 0;
  for (const a of n)
    for (let s = 0; s < r.length; s++)
      if (a.startTime >= r[s]) {
        r[s] = a.endTime, a.order = s + e, s > i && (i = s);
        break;
      }
  return i;
}, "getMaxIntersections"), ht, va = /* @__PURE__ */ m(function(t2, e, r, n) {
  const i = yt$1().gantt, a = yt$1().securityLevel;
  let s;
  a === "sandbox" && (s = gt$1("#i" + e));
  const y = a === "sandbox" ? gt$1(s.nodes()[0].contentDocument.body) : gt$1("body"), _ = a === "sandbox" ? s.nodes()[0].contentDocument : document, p = _.getElementById(e);
  ht = p.parentElement.offsetWidth, ht === void 0 && (ht = 1200), i.useWidth !== void 0 && (ht = i.useWidth);
  const g = n.db.getTasks();
  let E = [];
  for (const x of g)
    E.push(x.type);
  E = H(E);
  const C = {};
  let b = 2 * i.topPadding;
  if (n.db.getDisplayMode() === "compact" || i.displayMode === "compact") {
    const x = {};
    for (const F of g)
      x[F.section] === void 0 ? x[F.section] = [F] : x[F.section].push(F);
    let Y = 0;
    for (const F of Object.keys(x)) {
      const S = pa(x[F], Y) + 1;
      Y += S, b += S * (i.barHeight + i.barGap), C[F] = S;
    }
  } else {
    b += g.length * (i.barHeight + i.barGap);
    for (const x of E)
      C[x] = g.filter((Y) => Y.type === x).length;
  }
  p.setAttribute("viewBox", "0 0 " + ht + " " + b);
  const q = y.select(`[id="${e}"]`), O = _i().domain([
    jr(g, function(x) {
      return x.startTime;
    }),
    Gr(g, function(x) {
      return x.endTime;
    })
  ]).rangeRound([0, ht - i.leftPadding - i.rightPadding]);
  function M(x, Y) {
    const F = x.startTime, S = Y.startTime;
    let v = 0;
    return F > S ? v = 1 : F < S && (v = -1), v;
  }
  m(M, "taskCompare"), g.sort(M), I(g, ht, b), Of(q, b, ht, i.useMaxWidth), q.append("text").text(n.db.getDiagramTitle()).attr("x", ht / 2).attr("y", i.titleTopMargin).attr("class", "titleText");
  function I(x, Y, F) {
    const S = i.barHeight, v = S + i.barGap, U = i.topPadding, u = i.leftPadding, m2 = cn$1().domain([0, E.length]).range(["#00B9FA", "#F95002"]).interpolate(fn);
    W(
      v,
      U,
      u,
      Y,
      F,
      x,
      n.db.getExcludes(),
      n.db.getIncludes()
    ), Z(u, U, Y, F), V(x, v, U, u, S, m2, Y), Q(v, U), D(u, U, Y, F);
  }
  m(I, "makeGantt");
  function V(x, Y, F, S, v, U, u) {
    x.sort((l, o) => l.vert === o.vert ? 0 : l.vert ? 1 : -1);
    const T = [...new Set(x.map((l) => l.order))].map((l) => x.find((o) => o.order === l));
    q.append("g").selectAll("rect").data(T).enter().append("rect").attr("x", 0).attr("y", function(l, o) {
      return o = l.order, o * Y + F - 2;
    }).attr("width", function() {
      return u - i.rightPadding / 2;
    }).attr("height", Y).attr("class", function(l) {
      for (const [o, P] of E.entries())
        if (l.type === P)
          return "section section" + o % i.numberSectionStyles;
      return "section section0";
    }).enter();
    const d = q.append("g").selectAll("rect").data(x).enter(), w = n.db.getLinks();
    if (d.append("rect").attr("id", function(l) {
      return l.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(l) {
      return l.milestone ? O(l.startTime) + S + 0.5 * (O(l.endTime) - O(l.startTime)) - 0.5 * v : O(l.startTime) + S;
    }).attr("y", function(l, o) {
      return o = l.order, l.vert ? i.gridLineStartPadding : o * Y + F;
    }).attr("width", function(l) {
      return l.milestone ? v : l.vert ? 0.08 * v : O(l.renderEndTime || l.endTime) - O(l.startTime);
    }).attr("height", function(l) {
      return l.vert ? g.length * (i.barHeight + i.barGap) + i.barHeight * 2 : v;
    }).attr("transform-origin", function(l, o) {
      return o = l.order, (O(l.startTime) + S + 0.5 * (O(l.endTime) - O(l.startTime))).toString() + "px " + (o * Y + F + 0.5 * v).toString() + "px";
    }).attr("class", function(l) {
      const o = "task";
      let P = "";
      l.classes.length > 0 && (P = l.classes.join(" "));
      let z = 0;
      for (const [K, G2] of E.entries())
        l.type === G2 && (z = K % i.numberSectionStyles);
      let R2 = "";
      return l.active ? l.crit ? R2 += " activeCrit" : R2 = " active" : l.done ? l.crit ? R2 = " doneCrit" : R2 = " done" : l.crit && (R2 += " crit"), R2.length === 0 && (R2 = " task"), l.milestone && (R2 = " milestone " + R2), l.vert && (R2 = " vert " + R2), R2 += z, R2 += " " + P, o + R2;
    }), d.append("text").attr("id", function(l) {
      return l.id + "-text";
    }).text(function(l) {
      return l.task;
    }).attr("font-size", i.fontSize).attr("x", function(l) {
      let o = O(l.startTime), P = O(l.renderEndTime || l.endTime);
      if (l.milestone && (o += 0.5 * (O(l.endTime) - O(l.startTime)) - 0.5 * v, P = o + v), l.vert)
        return O(l.startTime) + S;
      const z = this.getBBox().width;
      return z > P - o ? P + z + 1.5 * i.leftPadding > u ? o + S - 5 : P + S + 5 : (P - o) / 2 + o + S;
    }).attr("y", function(l, o) {
      return l.vert ? i.gridLineStartPadding + g.length * (i.barHeight + i.barGap) + 60 : (o = l.order, o * Y + i.barHeight / 2 + (i.fontSize / 2 - 2) + F);
    }).attr("text-height", v).attr("class", function(l) {
      const o = O(l.startTime);
      let P = O(l.endTime);
      l.milestone && (P = o + v);
      const z = this.getBBox().width;
      let R2 = "";
      l.classes.length > 0 && (R2 = l.classes.join(" "));
      let K = 0;
      for (const [$, at] of E.entries())
        l.type === at && (K = $ % i.numberSectionStyles);
      let G2 = "";
      return l.active && (l.crit ? G2 = "activeCritText" + K : G2 = "activeText" + K), l.done ? l.crit ? G2 = G2 + " doneCritText" + K : G2 = G2 + " doneText" + K : l.crit && (G2 = G2 + " critText" + K), l.milestone && (G2 += " milestoneText"), l.vert && (G2 += " vertText"), z > P - o ? P + z + 1.5 * i.leftPadding > u ? R2 + " taskTextOutsideLeft taskTextOutside" + K + " " + G2 : R2 + " taskTextOutsideRight taskTextOutside" + K + " " + G2 + " width-" + z : R2 + " taskText taskText" + K + " " + G2 + " width-" + z;
    }), yt$1().securityLevel === "sandbox") {
      let l;
      l = gt$1("#i" + e);
      const o = l.nodes()[0].contentDocument;
      d.filter(function(P) {
        return w.has(P.id);
      }).each(function(P) {
        var z = o.querySelector("#" + P.id), R2 = o.querySelector("#" + P.id + "-text");
        const K = z.parentNode;
        var G2 = o.createElement("a");
        G2.setAttribute("xlink:href", w.get(P.id)), G2.setAttribute("target", "_top"), K.appendChild(G2), G2.appendChild(z), G2.appendChild(R2);
      });
    }
  }
  m(V, "drawRects");
  function W(x, Y, F, S, v, U, u, m2) {
    if (u.length === 0 && m2.length === 0)
      return;
    let T, d;
    for (const { startTime: z, endTime: R2 } of U)
      (T === void 0 || z < T) && (T = z), (d === void 0 || R2 > d) && (d = R2);
    if (!T || !d)
      return;
    if (Kv(d).diff(Kv(T), "year") > 5) {
      R.warn(
        "The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days."
      );
      return;
    }
    const w = n.db.getDateFormat(), c = [];
    let l = null, o = Kv(T);
    for (; o.valueOf() <= d; )
      n.db.isInvalidDate(o, w, u, m2) ? l ? l.end = o : l = {
        start: o,
        end: o
      } : l && (c.push(l), l = null), o = o.add(1, "d");
    q.append("g").selectAll("rect").data(c).enter().append("rect").attr("id", (z) => "exclude-" + z.start.format("YYYY-MM-DD")).attr("x", (z) => O(z.start.startOf("day")) + F).attr("y", i.gridLineStartPadding).attr("width", (z) => O(z.end.endOf("day")) - O(z.start.startOf("day"))).attr("height", v - Y - i.gridLineStartPadding).attr("transform-origin", function(z, R2) {
      return (O(z.start) + F + 0.5 * (O(z.end) - O(z.start))).toString() + "px " + (R2 * x + 0.5 * v).toString() + "px";
    }).attr("class", "exclude-range");
  }
  m(W, "drawExcludeDays");
  function Z(x, Y, F, S) {
    const v = n.db.getDateFormat(), U = n.db.getAxisFormat();
    let u;
    U ? u = U : v === "D" ? u = "%d" : u = i.axisFormat ?? "%Y-%m-%d";
    let m2 = nn(O).tickSize(-S + Y + i.gridLineStartPadding).tickFormat(Kt(u));
    const d = /^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(
      n.db.getTickInterval() || i.tickInterval
    );
    if (d !== null) {
      const w = d[1], c = d[2], l = n.db.getWeekday() || i.weekday;
      switch (c) {
        case "millisecond":
          m2.ticks(Yt.every(w));
          break;
        case "second":
          m2.ticks(vt.every(w));
          break;
        case "minute":
          m2.ticks(Wt.every(w));
          break;
        case "hour":
          m2.ticks(Ot.every(w));
          break;
        case "day":
          m2.ticks(Tt.every(w));
          break;
        case "week":
          m2.ticks(Qe[l].every(w));
          break;
        case "month":
          m2.ticks(Nt.every(w));
          break;
      }
    }
    if (q.append("g").attr("class", "grid").attr("transform", "translate(" + x + ", " + (S - 50) + ")").call(m2).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), n.db.topAxisEnabled() || i.topAxis) {
      let w = rn(O).tickSize(-S + Y + i.gridLineStartPadding).tickFormat(Kt(u));
      if (d !== null) {
        const c = d[1], l = d[2], o = n.db.getWeekday() || i.weekday;
        switch (l) {
          case "millisecond":
            w.ticks(Yt.every(c));
            break;
          case "second":
            w.ticks(vt.every(c));
            break;
          case "minute":
            w.ticks(Wt.every(c));
            break;
          case "hour":
            w.ticks(Ot.every(c));
            break;
          case "day":
            w.ticks(Tt.every(c));
            break;
          case "week":
            w.ticks(Qe[o].every(c));
            break;
          case "month":
            w.ticks(Nt.every(c));
            break;
        }
      }
      q.append("g").attr("class", "grid").attr("transform", "translate(" + x + ", " + Y + ")").call(w).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  m(Z, "makeGrid");
  function Q(x, Y) {
    let F = 0;
    const S = Object.keys(C).map((v) => [v, C[v]]);
    q.append("g").selectAll("text").data(S).enter().append(function(v) {
      const U = v[0].split(Ii$1.lineBreakRegex), u = -(U.length - 1) / 2, m2 = _.createElementNS("http://www.w3.org/2000/svg", "text");
      m2.setAttribute("dy", u + "em");
      for (const [T, d] of U.entries()) {
        const w = _.createElementNS("http://www.w3.org/2000/svg", "tspan");
        w.setAttribute("alignment-baseline", "central"), w.setAttribute("x", "10"), T > 0 && w.setAttribute("dy", "1em"), w.textContent = d, m2.appendChild(w);
      }
      return m2;
    }).attr("x", 10).attr("y", function(v, U) {
      if (U > 0)
        for (let u = 0; u < U; u++)
          return F += S[U - 1][1], v[1] * x / 2 + F * x + Y;
      else
        return v[1] * x / 2 + Y;
    }).attr("font-size", i.sectionFontSize).attr("class", function(v) {
      for (const [U, u] of E.entries())
        if (v[0] === u)
          return "sectionTitle sectionTitle" + U % i.numberSectionStyles;
      return "sectionTitle";
    });
  }
  m(Q, "vertLabels");
  function D(x, Y, F, S) {
    const v = n.db.getTodayMarker();
    if (v === "off")
      return;
    const U = q.append("g").attr("class", "today"), u = /* @__PURE__ */ new Date(), m2 = U.append("line");
    m2.attr("x1", O(u) + x).attr("x2", O(u) + x).attr("y1", i.titleTopMargin).attr("y2", S - i.titleTopMargin).attr("class", "today"), v !== "" && m2.attr("style", v.replace(/,/g, ";"));
  }
  m(D, "drawToday");
  function H(x) {
    const Y = {}, F = [];
    for (let S = 0, v = x.length; S < v; ++S)
      Object.prototype.hasOwnProperty.call(Y, x[S]) || (Y[x[S]] = true, F.push(x[S]));
    return F;
  }
  m(H, "checkUnique");
}, "draw"), Ta = {
  setConf: ka,
  draw: va
}, ba = /* @__PURE__ */ m((t2) => `
  .mermaid-main-font {
        font-family: ${t2.fontFamily};
  }

  .exclude-range {
    fill: ${t2.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t2.sectionBkgColor};
  }

  .section2 {
    fill: ${t2.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t2.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t2.titleColor};
  }

  .sectionTitle1 {
    fill: ${t2.titleColor};
  }

  .sectionTitle2 {
    fill: ${t2.titleColor};
  }

  .sectionTitle3 {
    fill: ${t2.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t2.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t2.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t2.fontFamily};
    fill: ${t2.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t2.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t2.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t2.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t2.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t2.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t2.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t2.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t2.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t2.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t2.taskBkgColor};
    stroke: ${t2.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t2.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t2.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t2.activeTaskBkgColor};
    stroke: ${t2.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t2.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t2.doneTaskBorderColor};
    fill: ${t2.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t2.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t2.critBorderColor};
    fill: ${t2.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t2.critBorderColor};
    fill: ${t2.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t2.critBorderColor};
    fill: ${t2.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t2.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${t2.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t2.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t2.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t2.titleColor || t2.textColor};
    font-family: ${t2.fontFamily};
  }
`, "getStyles"), xa = ba, Gs = {
  parser: Ai,
  db: ya,
  renderer: Ta,
  styles: xa
};
export {
  Gs as diagram
};
