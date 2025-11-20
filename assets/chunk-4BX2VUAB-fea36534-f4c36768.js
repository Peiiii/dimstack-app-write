import { H as m$1 } from "./app-ac489121.js";
function m(e, c) {
  var i, t, o;
  e.accDescr && ((i = c.setAccDescription) == null || i.call(c, e.accDescr)), e.accTitle && ((t = c.setAccTitle) == null || t.call(c, e.accTitle)), e.title && ((o = c.setDiagramTitle) == null || o.call(c, e.title));
}
m$1(m, "populateCommonDb");
export {
  m
};
