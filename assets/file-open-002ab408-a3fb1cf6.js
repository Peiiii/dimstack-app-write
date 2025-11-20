const e = async (e2) => {
  const t2 = await e2.getFile();
  return t2.handle = e2, t2;
};
var t = async (t2 = [{}]) => {
  Array.isArray(t2) || (t2 = [t2]);
  const i = [];
  t2.forEach((e2, t3) => {
    i[t3] = { description: e2.description || "", accept: {} }, e2.mimeTypes ? e2.mimeTypes.map((a2) => {
      i[t3].accept[a2] = e2.extensions || [];
    }) : i[t3].accept["*/*"] = e2.extensions || [];
  });
  const a = await window.showOpenFilePicker({ id: t2[0].id, startIn: t2[0].startIn, types: i, multiple: t2[0].multiple || false, excludeAcceptAllOption: t2[0].excludeAcceptAllOption || false }), c = await Promise.all(a.map(e));
  return t2[0].multiple ? c : c[0];
};
export {
  t as default
};
