import { aT as gr, aU as Rc, aV as Sn, aW as Yh, aX as P4 } from "./app-33e0c163.js";
import { t } from "./init-f9637058-7f0fc388.js";
import { N as N$1, t as tn$1, n as nn$1, J as J$1 } from "./defaultLocale-2db4a961-5e6dc2fe.js";
function M(n, r) {
  return n == null || r == null ? NaN : n < r ? -1 : n > r ? 1 : n >= r ? 0 : NaN;
}
function B(n, r) {
  return n == null || r == null ? NaN : r < n ? -1 : r > n ? 1 : r >= n ? 0 : NaN;
}
function R(n) {
  let r, t2, e;
  n.length !== 2 ? (r = M, t2 = (o, c) => M(n(o), c), e = (o, c) => n(o) - c) : (r = n === M || n === B ? n : I, t2 = n, e = n);
  function u(o, c, i = 0, h = o.length) {
    if (i < h) {
      if (r(c, c) !== 0)
        return h;
      do {
        const l = i + h >>> 1;
        t2(o[l], c) < 0 ? i = l + 1 : h = l;
      } while (i < h);
    }
    return i;
  }
  function f(o, c, i = 0, h = o.length) {
    if (i < h) {
      if (r(c, c) !== 0)
        return h;
      do {
        const l = i + h >>> 1;
        t2(o[l], c) <= 0 ? i = l + 1 : h = l;
      } while (i < h);
    }
    return i;
  }
  function a(o, c, i = 0, h = o.length) {
    const l = u(o, c, i, h - 1);
    return l > i && e(o[l - 1], c) > -e(o[l], c) ? l - 1 : l;
  }
  return { left: u, center: a, right: f };
}
function I() {
  return 0;
}
function O(n) {
  return n === null ? NaN : +n;
}
const V = R(M), $ = V.right;
R(O).center;
const x = $, Q = Math.sqrt(50), T = Math.sqrt(10), C = Math.sqrt(2);
function v(n, r, t2) {
  const e = (r - n) / Math.max(0, t2), u = Math.floor(Math.log10(e)), f = e / Math.pow(10, u), a = f >= Q ? 10 : f >= T ? 5 : f >= C ? 2 : 1;
  let o, c, i;
  return u < 0 ? (i = Math.pow(10, -u) / a, o = Math.round(n * i), c = Math.round(r * i), o / i < n && ++o, c / i > r && --c, i = -i) : (i = Math.pow(10, u) * a, o = Math.round(n / i), c = Math.round(r / i), o * i < n && ++o, c * i > r && --c), c < o && 0.5 <= t2 && t2 < 2 ? v(n, r, t2 * 2) : [o, c, i];
}
function E(n, r, t2) {
  if (r = +r, n = +n, t2 = +t2, !(t2 > 0))
    return [];
  if (n === r)
    return [n];
  const e = r < n, [u, f, a] = e ? v(r, n, t2) : v(n, r, t2);
  if (!(f >= u))
    return [];
  const o = f - u + 1, c = new Array(o);
  if (e)
    if (a < 0)
      for (let i = 0; i < o; ++i)
        c[i] = (f - i) / -a;
    else
      for (let i = 0; i < o; ++i)
        c[i] = (f - i) * a;
  else if (a < 0)
    for (let i = 0; i < o; ++i)
      c[i] = (u + i) / -a;
  else
    for (let i = 0; i < o; ++i)
      c[i] = (u + i) * a;
  return c;
}
function y(n, r, t2) {
  return r = +r, n = +n, t2 = +t2, v(n, r, t2)[2];
}
function G(n, r, t2) {
  r = +r, n = +n, t2 = +t2;
  const e = r < n, u = e ? y(r, n, t2) : y(n, r, t2);
  return (e ? -1 : 1) * (u < 0 ? 1 / -u : u);
}
function H(n, r) {
  r || (r = []);
  var t2 = n ? Math.min(r.length, n.length) : 0, e = r.slice(), u;
  return function(f) {
    for (u = 0; u < t2; ++u)
      e[u] = n[u] * (1 - f) + r[u] * f;
    return e;
  };
}
function J(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function K(n, r) {
  var t2 = r ? r.length : 0, e = n ? Math.min(t2, n.length) : 0, u = new Array(e), f = new Array(t2), a;
  for (a = 0; a < e; ++a)
    u[a] = d(n[a], r[a]);
  for (; a < t2; ++a)
    f[a] = r[a];
  return function(o) {
    for (a = 0; a < e; ++a)
      f[a] = u[a](o);
    return f;
  };
}
function L(n, r) {
  var t2 = /* @__PURE__ */ new Date();
  return n = +n, r = +r, function(e) {
    return t2.setTime(n * (1 - e) + r * e), t2;
  };
}
function U(n, r) {
  var t2 = {}, e = {}, u;
  (n === null || typeof n != "object") && (n = {}), (r === null || typeof r != "object") && (r = {});
  for (u in r)
    u in n ? t2[u] = d(n[u], r[u]) : e[u] = r[u];
  return function(f) {
    for (u in t2)
      e[u] = t2[u](f);
    return e;
  };
}
function d(n, r) {
  var t2 = typeof r, e;
  return r == null || t2 === "boolean" ? Rc(r) : (t2 === "number" ? gr : t2 === "string" ? (e = Sn(r)) ? (r = e, Yh) : P4 : r instanceof Sn ? Yh : r instanceof Date ? L : J(r) ? H : Array.isArray(r) ? K : typeof r.valueOf != "function" && typeof r.toString != "function" || isNaN(r) ? U : gr)(n, r);
}
function W(n, r) {
  return n = +n, r = +r, function(t2) {
    return Math.round(n * (1 - t2) + r * t2);
  };
}
function X(n) {
  return Math.max(0, -J$1(Math.abs(n)));
}
function Y(n, r) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(J$1(r) / 3))) * 3 - J$1(Math.abs(n)));
}
function Z(n, r) {
  return n = Math.abs(n), r = Math.abs(r) - n, Math.max(0, J$1(r) - J$1(n)) + 1;
}
function _(n) {
  return function() {
    return n;
  };
}
function b(n) {
  return +n;
}
var A = [0, 1];
function m(n) {
  return n;
}
function N(n, r) {
  return (r -= n = +n) ? function(t2) {
    return (t2 - n) / r;
  } : _(isNaN(r) ? NaN : 0.5);
}
function nn(n, r) {
  var t2;
  return n > r && (t2 = n, n = r, r = t2), function(e) {
    return Math.max(n, Math.min(r, e));
  };
}
function rn(n, r, t2) {
  var e = n[0], u = n[1], f = r[0], a = r[1];
  return u < e ? (e = N(u, e), f = t2(a, f)) : (e = N(e, u), f = t2(f, a)), function(o) {
    return f(e(o));
  };
}
function en(n, r, t2) {
  var e = Math.min(n.length, r.length) - 1, u = new Array(e), f = new Array(e), a = -1;
  for (n[e] < n[0] && (n = n.slice().reverse(), r = r.slice().reverse()); ++a < e; )
    u[a] = N(n[a], n[a + 1]), f[a] = t2(r[a], r[a + 1]);
  return function(o) {
    var c = x(n, o, 1, e) - 1;
    return f[c](u[c](o));
  };
}
function tn(n, r) {
  return r.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown());
}
function un() {
  var n = A, r = A, t2 = d, e, u, f, a = m, o, c, i;
  function h() {
    var s = Math.min(n.length, r.length);
    return a !== m && (a = nn(n[0], n[s - 1])), o = s > 2 ? en : rn, c = i = null, l;
  }
  function l(s) {
    return s == null || isNaN(s = +s) ? f : (c || (c = o(n.map(e), r, t2)))(e(a(s)));
  }
  return l.invert = function(s) {
    return a(u((i || (i = o(r, n.map(e), gr)))(s)));
  }, l.domain = function(s) {
    return arguments.length ? (n = Array.from(s, b), h()) : n.slice();
  }, l.range = function(s) {
    return arguments.length ? (r = Array.from(s), h()) : r.slice();
  }, l.rangeRound = function(s) {
    return r = Array.from(s), t2 = W, h();
  }, l.clamp = function(s) {
    return arguments.length ? (a = s ? true : m, h()) : a !== m;
  }, l.interpolate = function(s) {
    return arguments.length ? (t2 = s, h()) : t2;
  }, l.unknown = function(s) {
    return arguments.length ? (f = s, l) : f;
  }, function(s, S) {
    return e = s, u = S, h();
  };
}
function an() {
  return un()(m, m);
}
function on(n, r, t2, e) {
  var u = G(n, r, t2), f;
  switch (e = N$1(e ?? ",f"), e.type) {
    case "s": {
      var a = Math.max(Math.abs(n), Math.abs(r));
      return e.precision == null && !isNaN(f = Y(u, a)) && (e.precision = f), tn$1(e, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      e.precision == null && !isNaN(f = Z(u, Math.max(Math.abs(n), Math.abs(r)))) && (e.precision = f - (e.type === "e"));
      break;
    }
    case "f":
    case "%": {
      e.precision == null && !isNaN(f = X(u)) && (e.precision = f - (e.type === "%") * 2);
      break;
    }
  }
  return nn$1(e);
}
function fn(n) {
  var r = n.domain;
  return n.ticks = function(t2) {
    var e = r();
    return E(e[0], e[e.length - 1], t2 ?? 10);
  }, n.tickFormat = function(t2, e) {
    var u = r();
    return on(u[0], u[u.length - 1], t2 ?? 10, e);
  }, n.nice = function(t2) {
    t2 == null && (t2 = 10);
    var e = r(), u = 0, f = e.length - 1, a = e[u], o = e[f], c, i, h = 10;
    for (o < a && (i = a, a = o, o = i, i = u, u = f, f = i); h-- > 0; ) {
      if (i = y(a, o, t2), i === c)
        return e[u] = a, e[f] = o, r(e);
      if (i > 0)
        a = Math.floor(a / i) * i, o = Math.ceil(o / i) * i;
      else if (i < 0)
        a = Math.ceil(a * i) / i, o = Math.floor(o * i) / i;
      else
        break;
      c = i;
    }
    return n;
  }, n;
}
function cn() {
  var n = an();
  return n.copy = function() {
    return tn(n, cn());
  }, t.apply(n, arguments), fn(n);
}
export {
  G,
  R,
  an as a,
  cn as c,
  tn as t
};
