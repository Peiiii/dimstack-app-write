import { bo as nT, bp as Jh, bq as Qh, aO as DI, br as LI, bs as BI, bt as $I, bu as AI, bv as Nc, bw as FI, bx as EI, aN as di, by as II, bz as RI, bA as MI } from "./app-33e0c163.js";
function cn(l) {
  return l.innerRadius;
}
function yn(l) {
  return l.outerRadius;
}
function gn(l) {
  return l.startAngle;
}
function dn(l) {
  return l.endAngle;
}
function mn(l) {
  return l && l.padAngle;
}
function pn(l, h, I, D, v, A, C, a) {
  var O = I - l, i = D - h, n = C - v, d = a - A, u = d * O - n * i;
  if (!(u * u < Qh))
    return u = (n * (h - A) - d * (l - v)) / u, [l + u * O, h + u * i];
}
function W(l, h, I, D, v, A, C) {
  var a = l - I, O = h - D, i = (C ? A : -A) / FI(a * a + O * O), n = i * O, d = -i * a, u = l + n, s = h + d, f = I + n, c = D + d, F = (u + f) / 2, t = (s + c) / 2, m = f - u, g = c - s, R = m * m + g * g, T = v - A, P = u * c - f * s, S = (g < 0 ? -1 : 1) * FI(MI(0, T * T * R - P * P)), j = (P * g - m * S) / R, z = (-P * m - g * S) / R, w = (P * g + m * S) / R, p = (-P * m + g * S) / R, x = j - F, e = z - t, r = w - F, G = p - t;
  return x * x + e * e > r * r + G * G && (j = w, z = p), {
    cx: j,
    cy: z,
    x01: -n,
    y01: -d,
    x11: j * (v / T - 1),
    y11: z * (v / T - 1)
  };
}
function hn() {
  var l = cn, h = yn, I = di(0), D = null, v = gn, A = dn, C = mn, a = null, O = nT(i);
  function i() {
    var n, d, u = +l.apply(this, arguments), s = +h.apply(this, arguments), f = v.apply(this, arguments) - Jh, c = A.apply(this, arguments) - Jh, F = AI(c - f), t = c > f;
    if (a || (a = n = O()), s < u && (d = s, s = u, u = d), !(s > Qh))
      a.moveTo(0, 0);
    else if (F > DI - Qh)
      a.moveTo(s * LI(f), s * BI(f)), a.arc(0, 0, s, f, c, !t), u > Qh && (a.moveTo(u * LI(c), u * BI(c)), a.arc(0, 0, u, c, f, t));
    else {
      var m = f, g = c, R = f, T = c, P = F, S = F, j = C.apply(this, arguments) / 2, z = j > Qh && (D ? +D.apply(this, arguments) : FI(u * u + s * s)), w = $I(AI(s - u) / 2, +I.apply(this, arguments)), p = w, x = w, e, r;
      if (z > Qh) {
        var G = II(z / u * BI(j)), M = II(z / s * BI(j));
        (P -= G * 2) > Qh ? (G *= t ? 1 : -1, R += G, T -= G) : (P = 0, R = T = (f + c) / 2), (S -= M * 2) > Qh ? (M *= t ? 1 : -1, m += M, g -= M) : (S = 0, m = g = (f + c) / 2);
      }
      var J = s * LI(m), K = s * BI(m), N = u * LI(T), Q = u * BI(T);
      if (w > Qh) {
        var U = s * LI(g), V = s * BI(g), X = u * LI(R), Y = u * BI(R), E;
        if (F < Nc)
          if (E = pn(J, K, X, Y, U, V, N, Q)) {
            var Z = J - E[0], $ = K - E[1], b = U - E[0], k = V - E[1], nn = 1 / BI(RI((Z * b + $ * k) / (FI(Z * Z + $ * $) * FI(b * b + k * k))) / 2), en = FI(E[0] * E[0] + E[1] * E[1]);
            p = $I(w, (u - en) / (nn - 1)), x = $I(w, (s - en) / (nn + 1));
          } else
            p = x = 0;
      }
      S > Qh ? x > Qh ? (e = W(X, Y, J, K, s, x, t), r = W(U, V, N, Q, s, x, t), a.moveTo(e.cx + e.x01, e.cy + e.y01), x < w ? a.arc(e.cx, e.cy, x, EI(e.y01, e.x01), EI(r.y01, r.x01), !t) : (a.arc(e.cx, e.cy, x, EI(e.y01, e.x01), EI(e.y11, e.x11), !t), a.arc(0, 0, s, EI(e.cy + e.y11, e.cx + e.x11), EI(r.cy + r.y11, r.cx + r.x11), !t), a.arc(r.cx, r.cy, x, EI(r.y11, r.x11), EI(r.y01, r.x01), !t))) : (a.moveTo(J, K), a.arc(0, 0, s, m, g, !t)) : a.moveTo(J, K), !(u > Qh) || !(P > Qh) ? a.lineTo(N, Q) : p > Qh ? (e = W(N, Q, U, V, u, -p, t), r = W(J, K, X, Y, u, -p, t), a.lineTo(e.cx + e.x01, e.cy + e.y01), p < w ? a.arc(e.cx, e.cy, p, EI(e.y01, e.x01), EI(r.y01, r.x01), !t) : (a.arc(e.cx, e.cy, p, EI(e.y01, e.x01), EI(e.y11, e.x11), !t), a.arc(0, 0, u, EI(e.cy + e.y11, e.cx + e.x11), EI(r.cy + r.y11, r.cx + r.x11), t), a.arc(r.cx, r.cy, p, EI(r.y11, r.x11), EI(r.y01, r.x01), !t))) : a.arc(0, 0, u, T, R, t);
    }
    if (a.closePath(), n)
      return a = null, n + "" || null;
  }
  return i.centroid = function() {
    var n = (+l.apply(this, arguments) + +h.apply(this, arguments)) / 2, d = (+v.apply(this, arguments) + +A.apply(this, arguments)) / 2 - Nc / 2;
    return [LI(d) * n, BI(d) * n];
  }, i.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : di(+n), i) : l;
  }, i.outerRadius = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : di(+n), i) : h;
  }, i.cornerRadius = function(n) {
    return arguments.length ? (I = typeof n == "function" ? n : di(+n), i) : I;
  }, i.padRadius = function(n) {
    return arguments.length ? (D = n == null ? null : typeof n == "function" ? n : di(+n), i) : D;
  }, i.startAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : di(+n), i) : v;
  }, i.endAngle = function(n) {
    return arguments.length ? (A = typeof n == "function" ? n : di(+n), i) : A;
  }, i.padAngle = function(n) {
    return arguments.length ? (C = typeof n == "function" ? n : di(+n), i) : C;
  }, i.context = function(n) {
    return arguments.length ? (a = n ?? null, i) : a;
  }, i;
}
export {
  hn as h
};
