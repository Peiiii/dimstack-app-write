import { H as m, a6 as gt } from "./app-325be324.js";
var g = /* @__PURE__ */ m((t, e) => {
  let n;
  return e === "sandbox" && (n = gt("#i" + t)), (e === "sandbox" ? gt(n.nodes()[0].contentDocument.body) : gt("body")).select(`[id="${t}"]`);
}, "getDiagramElement");
export {
  g
};
