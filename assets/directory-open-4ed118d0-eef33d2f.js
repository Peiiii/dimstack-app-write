function e(r2) {
  function t2(e2) {
    if (Object(e2) !== e2)
      return Promise.reject(new TypeError(e2 + " is not an object."));
    var r3 = e2.done;
    return Promise.resolve(e2.value).then(function(e3) {
      return { value: e3, done: r3 };
    });
  }
  return e = function(e2) {
    this.s = e2, this.n = e2.next;
  }, e.prototype = { s: null, n: null, next: function() {
    return t2(this.n.apply(this.s, arguments));
  }, return: function(e2) {
    var r3 = this.s.return;
    return void 0 === r3 ? Promise.resolve({ value: e2, done: true }) : t2(r3.apply(this.s, arguments));
  }, throw: function(e2) {
    var r3 = this.s.return;
    return void 0 === r3 ? Promise.reject(e2) : t2(r3.apply(this.s, arguments));
  } }, new e(r2);
}
const r = async (t2, n, i = t2.name, a) => {
  const o = [], l = [];
  var s, u = false, c = false;
  try {
    for (var y, f = function(r2) {
      var t3, n2, i2, a2 = 2;
      for ("undefined" != typeof Symbol && (n2 = Symbol.asyncIterator, i2 = Symbol.iterator); a2--; ) {
        if (n2 && null != (t3 = r2[n2]))
          return t3.call(r2);
        if (i2 && null != (t3 = r2[i2]))
          return new e(t3.call(r2));
        n2 = "@@asyncIterator", i2 = "@@iterator";
      }
      throw new TypeError("Object is not async iterable");
    }(t2.values()); u = !(y = await f.next()).done; u = false) {
      const e2 = y.value, s2 = `${i}/${e2.name}`;
      "file" === e2.kind ? l.push(e2.getFile().then((r2) => (r2.directoryHandle = t2, r2.handle = e2, Object.defineProperty(r2, "webkitRelativePath", { configurable: true, enumerable: true, get: () => s2 })))) : "directory" !== e2.kind || !n || a && a(e2) || o.push(r(e2, n, s2, a));
    }
  } catch (e2) {
    c = true, s = e2;
  } finally {
    try {
      u && null != f.return && await f.return();
    } finally {
      if (c)
        throw s;
    }
  }
  return [...(await Promise.all(o)).flat(), ...await Promise.all(l)];
};
var t = async (e2 = {}) => {
  e2.recursive = e2.recursive || false;
  const t2 = await window.showDirectoryPicker({ id: e2.id, startIn: e2.startIn });
  return r(t2, e2.recursive, void 0, e2.skipDirectory);
};
export {
  t as default
};
