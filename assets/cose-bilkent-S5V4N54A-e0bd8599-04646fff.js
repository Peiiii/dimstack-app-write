import { a4 as Vv, H as m, a5 as Xv, a6 as gt, M as R } from "./app-325be324.js";
import { e as ea } from "./cytoscape.esm-13077586-528ad357.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
var tt = { exports: {} }, Z = { exports: {} }, Q = { exports: {} }, J;
function ut() {
  return J || (J = 1, function(G, b) {
    (function(O, T) {
      G.exports = T();
    })(Vv, function() {
      return (
        /******/
        function(A) {
          var O = {};
          function T(o) {
            if (O[o])
              return O[o].exports;
            var e = O[o] = {
              /******/
              i: o,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            return A[o].call(e.exports, e, e.exports, T), e.l = true, e.exports;
          }
          return T.m = A, T.c = O, T.i = function(o) {
            return o;
          }, T.d = function(o, e, t) {
            T.o(o, e) || Object.defineProperty(o, e, {
              /******/
              configurable: false,
              /******/
              enumerable: true,
              /******/
              get: t
              /******/
            });
          }, T.n = function(o) {
            var e = o && o.__esModule ? (
              /******/
              function() {
                return o.default;
              }
            ) : (
              /******/
              function() {
                return o;
              }
            );
            return T.d(e, "a", e), e;
          }, T.o = function(o, e) {
            return Object.prototype.hasOwnProperty.call(o, e);
          }, T.p = "", T(T.s = 26);
        }([
          /* 0 */
          /***/
          function(A, O, T) {
            function o() {
            }
            o.QUALITY = 1, o.DEFAULT_CREATE_BENDS_AS_NEEDED = false, o.DEFAULT_INCREMENTAL = false, o.DEFAULT_ANIMATION_ON_LAYOUT = true, o.DEFAULT_ANIMATION_DURING_LAYOUT = false, o.DEFAULT_ANIMATION_PERIOD = 50, o.DEFAULT_UNIFORM_LEAF_NODE_SIZES = false, o.DEFAULT_GRAPH_MARGIN = 15, o.NODE_DIMENSIONS_INCLUDE_LABELS = false, o.SIMPLE_NODE_SIZE = 40, o.SIMPLE_NODE_HALF_SIZE = o.SIMPLE_NODE_SIZE / 2, o.EMPTY_COMPOUND_NODE_SIZE = 40, o.MIN_EDGE_LENGTH = 1, o.WORLD_BOUNDARY = 1e6, o.INITIAL_WORLD_BOUNDARY = o.WORLD_BOUNDARY / 1e3, o.WORLD_CENTER_X = 1200, o.WORLD_CENTER_Y = 900, A.exports = o;
          },
          /* 1 */
          /***/
          function(A, O, T) {
            var o = T(2), e = T(8), t = T(9);
            function i(g, n, d) {
              o.call(this, d), this.isOverlapingSourceAndTarget = false, this.vGraphObject = d, this.bendpoints = [], this.source = g, this.target = n;
            }
            i.prototype = Object.create(o.prototype);
            for (var l in o)
              i[l] = o[l];
            i.prototype.getSource = function() {
              return this.source;
            }, i.prototype.getTarget = function() {
              return this.target;
            }, i.prototype.isInterGraph = function() {
              return this.isInterGraph;
            }, i.prototype.getLength = function() {
              return this.length;
            }, i.prototype.isOverlapingSourceAndTarget = function() {
              return this.isOverlapingSourceAndTarget;
            }, i.prototype.getBendpoints = function() {
              return this.bendpoints;
            }, i.prototype.getLca = function() {
              return this.lca;
            }, i.prototype.getSourceInLca = function() {
              return this.sourceInLca;
            }, i.prototype.getTargetInLca = function() {
              return this.targetInLca;
            }, i.prototype.getOtherEnd = function(g) {
              if (this.source === g)
                return this.target;
              if (this.target === g)
                return this.source;
              throw "Node is not incident with this edge";
            }, i.prototype.getOtherEndInGraph = function(g, n) {
              for (var d = this.getOtherEnd(g), r = n.getGraphManager().getRoot(); ; ) {
                if (d.getOwner() == n)
                  return d;
                if (d.getOwner() == r)
                  break;
                d = d.getOwner().getParent();
              }
              return null;
            }, i.prototype.updateLength = function() {
              var g = new Array(4);
              this.isOverlapingSourceAndTarget = e.getIntersection(this.target.getRect(), this.source.getRect(), g), this.isOverlapingSourceAndTarget || (this.lengthX = g[0] - g[2], this.lengthY = g[1] - g[3], Math.abs(this.lengthX) < 1 && (this.lengthX = t.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = t.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY));
            }, i.prototype.updateLengthSimple = function() {
              this.lengthX = this.target.getCenterX() - this.source.getCenterX(), this.lengthY = this.target.getCenterY() - this.source.getCenterY(), Math.abs(this.lengthX) < 1 && (this.lengthX = t.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = t.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
            }, A.exports = i;
          },
          /* 2 */
          /***/
          function(A, O, T) {
            function o(e) {
              this.vGraphObject = e;
            }
            A.exports = o;
          },
          /* 3 */
          /***/
          function(A, O, T) {
            var o = T(2), e = T(10), t = T(13), i = T(0), l = T(16), g = T(4);
            function n(r, h, a, p) {
              a == null && p == null && (p = h), o.call(this, p), r.graphManager != null && (r = r.graphManager), this.estimatedSize = e.MIN_VALUE, this.inclusionTreeDepth = e.MAX_VALUE, this.vGraphObject = p, this.edges = [], this.graphManager = r, a != null && h != null ? this.rect = new t(h.x, h.y, a.width, a.height) : this.rect = new t();
            }
            n.prototype = Object.create(o.prototype);
            for (var d in o)
              n[d] = o[d];
            n.prototype.getEdges = function() {
              return this.edges;
            }, n.prototype.getChild = function() {
              return this.child;
            }, n.prototype.getOwner = function() {
              return this.owner;
            }, n.prototype.getWidth = function() {
              return this.rect.width;
            }, n.prototype.setWidth = function(r) {
              this.rect.width = r;
            }, n.prototype.getHeight = function() {
              return this.rect.height;
            }, n.prototype.setHeight = function(r) {
              this.rect.height = r;
            }, n.prototype.getCenterX = function() {
              return this.rect.x + this.rect.width / 2;
            }, n.prototype.getCenterY = function() {
              return this.rect.y + this.rect.height / 2;
            }, n.prototype.getCenter = function() {
              return new g(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
            }, n.prototype.getLocation = function() {
              return new g(this.rect.x, this.rect.y);
            }, n.prototype.getRect = function() {
              return this.rect;
            }, n.prototype.getDiagonal = function() {
              return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
            }, n.prototype.getHalfTheDiagonal = function() {
              return Math.sqrt(this.rect.height * this.rect.height + this.rect.width * this.rect.width) / 2;
            }, n.prototype.setRect = function(r, h) {
              this.rect.x = r.x, this.rect.y = r.y, this.rect.width = h.width, this.rect.height = h.height;
            }, n.prototype.setCenter = function(r, h) {
              this.rect.x = r - this.rect.width / 2, this.rect.y = h - this.rect.height / 2;
            }, n.prototype.setLocation = function(r, h) {
              this.rect.x = r, this.rect.y = h;
            }, n.prototype.moveBy = function(r, h) {
              this.rect.x += r, this.rect.y += h;
            }, n.prototype.getEdgeListToNode = function(r) {
              var h = [], a = this;
              return a.edges.forEach(function(p) {
                if (p.target == r) {
                  if (p.source != a)
                    throw "Incorrect edge source!";
                  h.push(p);
                }
              }), h;
            }, n.prototype.getEdgesBetween = function(r) {
              var h = [], a = this;
              return a.edges.forEach(function(p) {
                if (!(p.source == a || p.target == a))
                  throw "Incorrect edge source and/or target";
                (p.target == r || p.source == r) && h.push(p);
              }), h;
            }, n.prototype.getNeighborsList = function() {
              var r = /* @__PURE__ */ new Set(), h = this;
              return h.edges.forEach(function(a) {
                if (a.source == h)
                  r.add(a.target);
                else {
                  if (a.target != h)
                    throw "Incorrect incidency!";
                  r.add(a.source);
                }
              }), r;
            }, n.prototype.withChildren = function() {
              var r = /* @__PURE__ */ new Set(), h, a;
              if (r.add(this), this.child != null)
                for (var p = this.child.getNodes(), v = 0; v < p.length; v++)
                  h = p[v], a = h.withChildren(), a.forEach(function(m2) {
                    r.add(m2);
                  });
              return r;
            }, n.prototype.getNoOfChildren = function() {
              var r = 0, h;
              if (this.child == null)
                r = 1;
              else
                for (var a = this.child.getNodes(), p = 0; p < a.length; p++)
                  h = a[p], r += h.getNoOfChildren();
              return r == 0 && (r = 1), r;
            }, n.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == e.MIN_VALUE)
                throw "assert failed";
              return this.estimatedSize;
            }, n.prototype.calcEstimatedSize = function() {
              return this.child == null ? this.estimatedSize = (this.rect.width + this.rect.height) / 2 : (this.estimatedSize = this.child.calcEstimatedSize(), this.rect.width = this.estimatedSize, this.rect.height = this.estimatedSize, this.estimatedSize);
            }, n.prototype.scatter = function() {
              var r, h, a = -i.INITIAL_WORLD_BOUNDARY, p = i.INITIAL_WORLD_BOUNDARY;
              r = i.WORLD_CENTER_X + l.nextDouble() * (p - a) + a;
              var v = -i.INITIAL_WORLD_BOUNDARY, m2 = i.INITIAL_WORLD_BOUNDARY;
              h = i.WORLD_CENTER_Y + l.nextDouble() * (m2 - v) + v, this.rect.x = r, this.rect.y = h;
            }, n.prototype.updateBounds = function() {
              if (this.getChild() == null)
                throw "assert failed";
              if (this.getChild().getNodes().length != 0) {
                var r = this.getChild();
                if (r.updateBounds(true), this.rect.x = r.getLeft(), this.rect.y = r.getTop(), this.setWidth(r.getRight() - r.getLeft()), this.setHeight(r.getBottom() - r.getTop()), i.NODE_DIMENSIONS_INCLUDE_LABELS) {
                  var h = r.getRight() - r.getLeft(), a = r.getBottom() - r.getTop();
                  this.labelWidth > h && (this.rect.x -= (this.labelWidth - h) / 2, this.setWidth(this.labelWidth)), this.labelHeight > a && (this.labelPos == "center" ? this.rect.y -= (this.labelHeight - a) / 2 : this.labelPos == "top" && (this.rect.y -= this.labelHeight - a), this.setHeight(this.labelHeight));
                }
              }
            }, n.prototype.getInclusionTreeDepth = function() {
              if (this.inclusionTreeDepth == e.MAX_VALUE)
                throw "assert failed";
              return this.inclusionTreeDepth;
            }, n.prototype.transform = function(r) {
              var h = this.rect.x;
              h > i.WORLD_BOUNDARY ? h = i.WORLD_BOUNDARY : h < -i.WORLD_BOUNDARY && (h = -i.WORLD_BOUNDARY);
              var a = this.rect.y;
              a > i.WORLD_BOUNDARY ? a = i.WORLD_BOUNDARY : a < -i.WORLD_BOUNDARY && (a = -i.WORLD_BOUNDARY);
              var p = new g(h, a), v = r.inverseTransformPoint(p);
              this.setLocation(v.x, v.y);
            }, n.prototype.getLeft = function() {
              return this.rect.x;
            }, n.prototype.getRight = function() {
              return this.rect.x + this.rect.width;
            }, n.prototype.getTop = function() {
              return this.rect.y;
            }, n.prototype.getBottom = function() {
              return this.rect.y + this.rect.height;
            }, n.prototype.getParent = function() {
              return this.owner == null ? null : this.owner.getParent();
            }, A.exports = n;
          },
          /* 4 */
          /***/
          function(A, O, T) {
            function o(e, t) {
              e == null && t == null ? (this.x = 0, this.y = 0) : (this.x = e, this.y = t);
            }
            o.prototype.getX = function() {
              return this.x;
            }, o.prototype.getY = function() {
              return this.y;
            }, o.prototype.setX = function(e) {
              this.x = e;
            }, o.prototype.setY = function(e) {
              this.y = e;
            }, o.prototype.getDifference = function(e) {
              return new DimensionD(this.x - e.x, this.y - e.y);
            }, o.prototype.getCopy = function() {
              return new o(this.x, this.y);
            }, o.prototype.translate = function(e) {
              return this.x += e.width, this.y += e.height, this;
            }, A.exports = o;
          },
          /* 5 */
          /***/
          function(A, O, T) {
            var o = T(2), e = T(10), t = T(0), i = T(6), l = T(3), g = T(1), n = T(13), d = T(12), r = T(11);
            function h(p, v, m2) {
              o.call(this, m2), this.estimatedSize = e.MIN_VALUE, this.margin = t.DEFAULT_GRAPH_MARGIN, this.edges = [], this.nodes = [], this.isConnected = false, this.parent = p, v != null && v instanceof i ? this.graphManager = v : v != null && v instanceof Layout && (this.graphManager = v.graphManager);
            }
            h.prototype = Object.create(o.prototype);
            for (var a in o)
              h[a] = o[a];
            h.prototype.getNodes = function() {
              return this.nodes;
            }, h.prototype.getEdges = function() {
              return this.edges;
            }, h.prototype.getGraphManager = function() {
              return this.graphManager;
            }, h.prototype.getParent = function() {
              return this.parent;
            }, h.prototype.getLeft = function() {
              return this.left;
            }, h.prototype.getRight = function() {
              return this.right;
            }, h.prototype.getTop = function() {
              return this.top;
            }, h.prototype.getBottom = function() {
              return this.bottom;
            }, h.prototype.isConnected = function() {
              return this.isConnected;
            }, h.prototype.add = function(p, v, m2) {
              if (v == null && m2 == null) {
                var u = p;
                if (this.graphManager == null)
                  throw "Graph has no graph mgr!";
                if (this.getNodes().indexOf(u) > -1)
                  throw "Node already in graph!";
                return u.owner = this, this.getNodes().push(u), u;
              } else {
                var E = p;
                if (!(this.getNodes().indexOf(v) > -1 && this.getNodes().indexOf(m2) > -1))
                  throw "Source or target not in graph!";
                if (!(v.owner == m2.owner && v.owner == this))
                  throw "Both owners must be this graph!";
                return v.owner != m2.owner ? null : (E.source = v, E.target = m2, E.isInterGraph = false, this.getEdges().push(E), v.edges.push(E), m2 != v && m2.edges.push(E), E);
              }
            }, h.prototype.remove = function(p) {
              var v = p;
              if (p instanceof l) {
                if (v == null)
                  throw "Node is null!";
                if (!(v.owner != null && v.owner == this))
                  throw "Owner graph is invalid!";
                if (this.graphManager == null)
                  throw "Owner graph manager is invalid!";
                for (var m2 = v.edges.slice(), u, E = m2.length, y = 0; y < E; y++)
                  u = m2[y], u.isInterGraph ? this.graphManager.remove(u) : u.source.owner.remove(u);
                var N = this.nodes.indexOf(v);
                if (N == -1)
                  throw "Node not in owner node list!";
                this.nodes.splice(N, 1);
              } else if (p instanceof g) {
                var u = p;
                if (u == null)
                  throw "Edge is null!";
                if (!(u.source != null && u.target != null))
                  throw "Source and/or target is null!";
                if (!(u.source.owner != null && u.target.owner != null && u.source.owner == this && u.target.owner == this))
                  throw "Source and/or target owner is invalid!";
                var s = u.source.edges.indexOf(u), f = u.target.edges.indexOf(u);
                if (!(s > -1 && f > -1))
                  throw "Source and/or target doesn't know this edge!";
                u.source.edges.splice(s, 1), u.target != u.source && u.target.edges.splice(f, 1);
                var N = u.source.owner.getEdges().indexOf(u);
                if (N == -1)
                  throw "Not in owner's edge list!";
                u.source.owner.getEdges().splice(N, 1);
              }
            }, h.prototype.updateLeftTop = function() {
              for (var p = e.MAX_VALUE, v = e.MAX_VALUE, m2, u, E, y = this.getNodes(), N = y.length, s = 0; s < N; s++) {
                var f = y[s];
                m2 = f.getTop(), u = f.getLeft(), p > m2 && (p = m2), v > u && (v = u);
              }
              return p == e.MAX_VALUE ? null : (y[0].getParent().paddingLeft != null ? E = y[0].getParent().paddingLeft : E = this.margin, this.left = v - E, this.top = p - E, new d(this.left, this.top));
            }, h.prototype.updateBounds = function(p) {
              for (var v = e.MAX_VALUE, m2 = -e.MAX_VALUE, u = e.MAX_VALUE, E = -e.MAX_VALUE, y, N, s, f, c, L = this.nodes, D = L.length, I = 0; I < D; I++) {
                var R2 = L[I];
                p && R2.child != null && R2.updateBounds(), y = R2.getLeft(), N = R2.getRight(), s = R2.getTop(), f = R2.getBottom(), v > y && (v = y), m2 < N && (m2 = N), u > s && (u = s), E < f && (E = f);
              }
              var C = new n(v, u, m2 - v, E - u);
              v == e.MAX_VALUE && (this.left = this.parent.getLeft(), this.right = this.parent.getRight(), this.top = this.parent.getTop(), this.bottom = this.parent.getBottom()), L[0].getParent().paddingLeft != null ? c = L[0].getParent().paddingLeft : c = this.margin, this.left = C.x - c, this.right = C.x + C.width + c, this.top = C.y - c, this.bottom = C.y + C.height + c;
            }, h.calculateBounds = function(p) {
              for (var v = e.MAX_VALUE, m2 = -e.MAX_VALUE, u = e.MAX_VALUE, E = -e.MAX_VALUE, y, N, s, f, c = p.length, L = 0; L < c; L++) {
                var D = p[L];
                y = D.getLeft(), N = D.getRight(), s = D.getTop(), f = D.getBottom(), v > y && (v = y), m2 < N && (m2 = N), u > s && (u = s), E < f && (E = f);
              }
              var I = new n(v, u, m2 - v, E - u);
              return I;
            }, h.prototype.getInclusionTreeDepth = function() {
              return this == this.graphManager.getRoot() ? 1 : this.parent.getInclusionTreeDepth();
            }, h.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == e.MIN_VALUE)
                throw "assert failed";
              return this.estimatedSize;
            }, h.prototype.calcEstimatedSize = function() {
              for (var p = 0, v = this.nodes, m2 = v.length, u = 0; u < m2; u++) {
                var E = v[u];
                p += E.calcEstimatedSize();
              }
              return p == 0 ? this.estimatedSize = t.EMPTY_COMPOUND_NODE_SIZE : this.estimatedSize = p / Math.sqrt(this.nodes.length), this.estimatedSize;
            }, h.prototype.updateConnected = function() {
              var p = this;
              if (this.nodes.length == 0) {
                this.isConnected = true;
                return;
              }
              var v = new r(), m2 = /* @__PURE__ */ new Set(), u = this.nodes[0], E, y, N = u.withChildren();
              for (N.forEach(function(I) {
                v.push(I), m2.add(I);
              }); v.length !== 0; ) {
                u = v.shift(), E = u.getEdges();
                for (var s = E.length, f = 0; f < s; f++) {
                  var c = E[f];
                  if (y = c.getOtherEndInGraph(u, this), y != null && !m2.has(y)) {
                    var L = y.withChildren();
                    L.forEach(function(I) {
                      v.push(I), m2.add(I);
                    });
                  }
                }
              }
              if (this.isConnected = false, m2.size >= this.nodes.length) {
                var D = 0;
                m2.forEach(function(I) {
                  I.owner == p && D++;
                }), D == this.nodes.length && (this.isConnected = true);
              }
            }, A.exports = h;
          },
          /* 6 */
          /***/
          function(A, O, T) {
            var o, e = T(1);
            function t(i) {
              o = T(5), this.layout = i, this.graphs = [], this.edges = [];
            }
            t.prototype.addRoot = function() {
              var i = this.layout.newGraph(), l = this.layout.newNode(null), g = this.add(i, l);
              return this.setRootGraph(g), this.rootGraph;
            }, t.prototype.add = function(i, l, g, n, d) {
              if (g == null && n == null && d == null) {
                if (i == null)
                  throw "Graph is null!";
                if (l == null)
                  throw "Parent node is null!";
                if (this.graphs.indexOf(i) > -1)
                  throw "Graph already in this graph mgr!";
                if (this.graphs.push(i), i.parent != null)
                  throw "Already has a parent!";
                if (l.child != null)
                  throw "Already has a child!";
                return i.parent = l, l.child = i, i;
              } else {
                d = g, n = l, g = i;
                var r = n.getOwner(), h = d.getOwner();
                if (!(r != null && r.getGraphManager() == this))
                  throw "Source not in this graph mgr!";
                if (!(h != null && h.getGraphManager() == this))
                  throw "Target not in this graph mgr!";
                if (r == h)
                  return g.isInterGraph = false, r.add(g, n, d);
                if (g.isInterGraph = true, g.source = n, g.target = d, this.edges.indexOf(g) > -1)
                  throw "Edge already in inter-graph edge list!";
                if (this.edges.push(g), !(g.source != null && g.target != null))
                  throw "Edge source and/or target is null!";
                if (!(g.source.edges.indexOf(g) == -1 && g.target.edges.indexOf(g) == -1))
                  throw "Edge already in source and/or target incidency list!";
                return g.source.edges.push(g), g.target.edges.push(g), g;
              }
            }, t.prototype.remove = function(i) {
              if (i instanceof o) {
                var l = i;
                if (l.getGraphManager() != this)
                  throw "Graph not in this graph mgr";
                if (!(l == this.rootGraph || l.parent != null && l.parent.graphManager == this))
                  throw "Invalid parent node!";
                var g = [];
                g = g.concat(l.getEdges());
                for (var n, d = g.length, r = 0; r < d; r++)
                  n = g[r], l.remove(n);
                var h = [];
                h = h.concat(l.getNodes());
                var a;
                d = h.length;
                for (var r = 0; r < d; r++)
                  a = h[r], l.remove(a);
                l == this.rootGraph && this.setRootGraph(null);
                var p = this.graphs.indexOf(l);
                this.graphs.splice(p, 1), l.parent = null;
              } else if (i instanceof e) {
                if (n = i, n == null)
                  throw "Edge is null!";
                if (!n.isInterGraph)
                  throw "Not an inter-graph edge!";
                if (!(n.source != null && n.target != null))
                  throw "Source and/or target is null!";
                if (!(n.source.edges.indexOf(n) != -1 && n.target.edges.indexOf(n) != -1))
                  throw "Source and/or target doesn't know this edge!";
                var p = n.source.edges.indexOf(n);
                if (n.source.edges.splice(p, 1), p = n.target.edges.indexOf(n), n.target.edges.splice(p, 1), !(n.source.owner != null && n.source.owner.getGraphManager() != null))
                  throw "Edge owner graph or owner graph manager is null!";
                if (n.source.owner.getGraphManager().edges.indexOf(n) == -1)
                  throw "Not in owner graph manager's edge list!";
                var p = n.source.owner.getGraphManager().edges.indexOf(n);
                n.source.owner.getGraphManager().edges.splice(p, 1);
              }
            }, t.prototype.updateBounds = function() {
              this.rootGraph.updateBounds(true);
            }, t.prototype.getGraphs = function() {
              return this.graphs;
            }, t.prototype.getAllNodes = function() {
              if (this.allNodes == null) {
                for (var i = [], l = this.getGraphs(), g = l.length, n = 0; n < g; n++)
                  i = i.concat(l[n].getNodes());
                this.allNodes = i;
              }
              return this.allNodes;
            }, t.prototype.resetAllNodes = function() {
              this.allNodes = null;
            }, t.prototype.resetAllEdges = function() {
              this.allEdges = null;
            }, t.prototype.resetAllNodesToApplyGravitation = function() {
              this.allNodesToApplyGravitation = null;
            }, t.prototype.getAllEdges = function() {
              if (this.allEdges == null) {
                var i = [], l = this.getGraphs();
                l.length;
                for (var g = 0; g < l.length; g++)
                  i = i.concat(l[g].getEdges());
                i = i.concat(this.edges), this.allEdges = i;
              }
              return this.allEdges;
            }, t.prototype.getAllNodesToApplyGravitation = function() {
              return this.allNodesToApplyGravitation;
            }, t.prototype.setAllNodesToApplyGravitation = function(i) {
              if (this.allNodesToApplyGravitation != null)
                throw "assert failed";
              this.allNodesToApplyGravitation = i;
            }, t.prototype.getRoot = function() {
              return this.rootGraph;
            }, t.prototype.setRootGraph = function(i) {
              if (i.getGraphManager() != this)
                throw "Root not in this graph mgr!";
              this.rootGraph = i, i.parent == null && (i.parent = this.layout.newNode("Root node"));
            }, t.prototype.getLayout = function() {
              return this.layout;
            }, t.prototype.isOneAncestorOfOther = function(i, l) {
              if (!(i != null && l != null))
                throw "assert failed";
              if (i == l)
                return true;
              var g = i.getOwner(), n;
              do {
                if (n = g.getParent(), n == null)
                  break;
                if (n == l)
                  return true;
                if (g = n.getOwner(), g == null)
                  break;
              } while (true);
              g = l.getOwner();
              do {
                if (n = g.getParent(), n == null)
                  break;
                if (n == i)
                  return true;
                if (g = n.getOwner(), g == null)
                  break;
              } while (true);
              return false;
            }, t.prototype.calcLowestCommonAncestors = function() {
              for (var i, l, g, n, d, r = this.getAllEdges(), h = r.length, a = 0; a < h; a++) {
                if (i = r[a], l = i.source, g = i.target, i.lca = null, i.sourceInLca = l, i.targetInLca = g, l == g) {
                  i.lca = l.getOwner();
                  continue;
                }
                for (n = l.getOwner(); i.lca == null; ) {
                  for (i.targetInLca = g, d = g.getOwner(); i.lca == null; ) {
                    if (d == n) {
                      i.lca = d;
                      break;
                    }
                    if (d == this.rootGraph)
                      break;
                    if (i.lca != null)
                      throw "assert failed";
                    i.targetInLca = d.getParent(), d = i.targetInLca.getOwner();
                  }
                  if (n == this.rootGraph)
                    break;
                  i.lca == null && (i.sourceInLca = n.getParent(), n = i.sourceInLca.getOwner());
                }
                if (i.lca == null)
                  throw "assert failed";
              }
            }, t.prototype.calcLowestCommonAncestor = function(i, l) {
              if (i == l)
                return i.getOwner();
              var g = i.getOwner();
              do {
                if (g == null)
                  break;
                var n = l.getOwner();
                do {
                  if (n == null)
                    break;
                  if (n == g)
                    return n;
                  n = n.getParent().getOwner();
                } while (true);
                g = g.getParent().getOwner();
              } while (true);
              return g;
            }, t.prototype.calcInclusionTreeDepths = function(i, l) {
              i == null && l == null && (i = this.rootGraph, l = 1);
              for (var g, n = i.getNodes(), d = n.length, r = 0; r < d; r++)
                g = n[r], g.inclusionTreeDepth = l, g.child != null && this.calcInclusionTreeDepths(g.child, l + 1);
            }, t.prototype.includesInvalidEdge = function() {
              for (var i, l = this.edges.length, g = 0; g < l; g++)
                if (i = this.edges[g], this.isOneAncestorOfOther(i.source, i.target))
                  return true;
              return false;
            }, A.exports = t;
          },
          /* 7 */
          /***/
          function(A, O, T) {
            var o = T(0);
            function e() {
            }
            for (var t in o)
              e[t] = o[t];
            e.MAX_ITERATIONS = 2500, e.DEFAULT_EDGE_LENGTH = 50, e.DEFAULT_SPRING_STRENGTH = 0.45, e.DEFAULT_REPULSION_STRENGTH = 4500, e.DEFAULT_GRAVITY_STRENGTH = 0.4, e.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1, e.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8, e.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5, e.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = true, e.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = true, e.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3, e.COOLING_ADAPTATION_FACTOR = 0.33, e.ADAPTATION_LOWER_NODE_LIMIT = 1e3, e.ADAPTATION_UPPER_NODE_LIMIT = 5e3, e.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100, e.MAX_NODE_DISPLACEMENT = e.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3, e.MIN_REPULSION_DIST = e.DEFAULT_EDGE_LENGTH / 10, e.CONVERGENCE_CHECK_PERIOD = 100, e.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1, e.MIN_EDGE_LENGTH = 1, e.GRID_CALCULATION_CHECK_PERIOD = 10, A.exports = e;
          },
          /* 8 */
          /***/
          function(A, O, T) {
            var o = T(12);
            function e() {
            }
            e.calcSeparationAmount = function(t, i, l, g) {
              if (!t.intersects(i))
                throw "assert failed";
              var n = new Array(2);
              this.decideDirectionsForOverlappingNodes(t, i, n), l[0] = Math.min(t.getRight(), i.getRight()) - Math.max(t.x, i.x), l[1] = Math.min(t.getBottom(), i.getBottom()) - Math.max(t.y, i.y), t.getX() <= i.getX() && t.getRight() >= i.getRight() ? l[0] += Math.min(i.getX() - t.getX(), t.getRight() - i.getRight()) : i.getX() <= t.getX() && i.getRight() >= t.getRight() && (l[0] += Math.min(t.getX() - i.getX(), i.getRight() - t.getRight())), t.getY() <= i.getY() && t.getBottom() >= i.getBottom() ? l[1] += Math.min(i.getY() - t.getY(), t.getBottom() - i.getBottom()) : i.getY() <= t.getY() && i.getBottom() >= t.getBottom() && (l[1] += Math.min(t.getY() - i.getY(), i.getBottom() - t.getBottom()));
              var d = Math.abs((i.getCenterY() - t.getCenterY()) / (i.getCenterX() - t.getCenterX()));
              i.getCenterY() === t.getCenterY() && i.getCenterX() === t.getCenterX() && (d = 1);
              var r = d * l[0], h = l[1] / d;
              l[0] < h ? h = l[0] : r = l[1], l[0] = -1 * n[0] * (h / 2 + g), l[1] = -1 * n[1] * (r / 2 + g);
            }, e.decideDirectionsForOverlappingNodes = function(t, i, l) {
              t.getCenterX() < i.getCenterX() ? l[0] = -1 : l[0] = 1, t.getCenterY() < i.getCenterY() ? l[1] = -1 : l[1] = 1;
            }, e.getIntersection2 = function(t, i, l) {
              var g = t.getCenterX(), n = t.getCenterY(), d = i.getCenterX(), r = i.getCenterY();
              if (t.intersects(i))
                return l[0] = g, l[1] = n, l[2] = d, l[3] = r, true;
              var h = t.getX(), a = t.getY(), p = t.getRight(), v = t.getX(), m2 = t.getBottom(), u = t.getRight(), E = t.getWidthHalf(), y = t.getHeightHalf(), N = i.getX(), s = i.getY(), f = i.getRight(), c = i.getX(), L = i.getBottom(), D = i.getRight(), I = i.getWidthHalf(), R2 = i.getHeightHalf(), C = false, M = false;
              if (g === d) {
                if (n > r)
                  return l[0] = g, l[1] = a, l[2] = d, l[3] = L, false;
                if (n < r)
                  return l[0] = g, l[1] = m2, l[2] = d, l[3] = s, false;
              } else if (n === r) {
                if (g > d)
                  return l[0] = h, l[1] = n, l[2] = f, l[3] = r, false;
                if (g < d)
                  return l[0] = p, l[1] = n, l[2] = N, l[3] = r, false;
              } else {
                var S = t.height / t.width, Y = i.height / i.width, w = (r - n) / (d - g), x = void 0, F = void 0, U = void 0, P = void 0, _ = void 0, X = void 0;
                if (-S === w ? g > d ? (l[0] = v, l[1] = m2, C = true) : (l[0] = p, l[1] = a, C = true) : S === w && (g > d ? (l[0] = h, l[1] = a, C = true) : (l[0] = u, l[1] = m2, C = true)), -Y === w ? d > g ? (l[2] = c, l[3] = L, M = true) : (l[2] = f, l[3] = s, M = true) : Y === w && (d > g ? (l[2] = N, l[3] = s, M = true) : (l[2] = D, l[3] = L, M = true)), C && M)
                  return false;
                if (g > d ? n > r ? (x = this.getCardinalDirection(S, w, 4), F = this.getCardinalDirection(Y, w, 2)) : (x = this.getCardinalDirection(-S, w, 3), F = this.getCardinalDirection(-Y, w, 1)) : n > r ? (x = this.getCardinalDirection(-S, w, 1), F = this.getCardinalDirection(-Y, w, 3)) : (x = this.getCardinalDirection(S, w, 2), F = this.getCardinalDirection(Y, w, 4)), !C)
                  switch (x) {
                    case 1:
                      P = a, U = g + -y / w, l[0] = U, l[1] = P;
                      break;
                    case 2:
                      U = u, P = n + E * w, l[0] = U, l[1] = P;
                      break;
                    case 3:
                      P = m2, U = g + y / w, l[0] = U, l[1] = P;
                      break;
                    case 4:
                      U = v, P = n + -E * w, l[0] = U, l[1] = P;
                      break;
                  }
                if (!M)
                  switch (F) {
                    case 1:
                      X = s, _ = d + -R2 / w, l[2] = _, l[3] = X;
                      break;
                    case 2:
                      _ = D, X = r + I * w, l[2] = _, l[3] = X;
                      break;
                    case 3:
                      X = L, _ = d + R2 / w, l[2] = _, l[3] = X;
                      break;
                    case 4:
                      _ = c, X = r + -I * w, l[2] = _, l[3] = X;
                      break;
                  }
              }
              return false;
            }, e.getCardinalDirection = function(t, i, l) {
              return t > i ? l : 1 + l % 4;
            }, e.getIntersection = function(t, i, l, g) {
              if (g == null)
                return this.getIntersection2(t, i, l);
              var n = t.x, d = t.y, r = i.x, h = i.y, a = l.x, p = l.y, v = g.x, m2 = g.y, u = void 0, E = void 0, y = void 0, N = void 0, s = void 0, f = void 0, c = void 0, L = void 0, D = void 0;
              return y = h - d, s = n - r, c = r * d - n * h, N = m2 - p, f = a - v, L = v * p - a * m2, D = y * f - N * s, D === 0 ? null : (u = (s * L - f * c) / D, E = (N * c - y * L) / D, new o(u, E));
            }, e.angleOfVector = function(t, i, l, g) {
              var n = void 0;
              return t !== l ? (n = Math.atan((g - i) / (l - t)), l < t ? n += Math.PI : g < i && (n += this.TWO_PI)) : g < i ? n = this.ONE_AND_HALF_PI : n = this.HALF_PI, n;
            }, e.doIntersect = function(t, i, l, g) {
              var n = t.x, d = t.y, r = i.x, h = i.y, a = l.x, p = l.y, v = g.x, m2 = g.y, u = (r - n) * (m2 - p) - (v - a) * (h - d);
              if (u === 0)
                return false;
              var E = ((m2 - p) * (v - n) + (a - v) * (m2 - d)) / u, y = ((d - h) * (v - n) + (r - n) * (m2 - d)) / u;
              return 0 < E && E < 1 && 0 < y && y < 1;
            }, e.HALF_PI = 0.5 * Math.PI, e.ONE_AND_HALF_PI = 1.5 * Math.PI, e.TWO_PI = 2 * Math.PI, e.THREE_PI = 3 * Math.PI, A.exports = e;
          },
          /* 9 */
          /***/
          function(A, O, T) {
            function o() {
            }
            o.sign = function(e) {
              return e > 0 ? 1 : e < 0 ? -1 : 0;
            }, o.floor = function(e) {
              return e < 0 ? Math.ceil(e) : Math.floor(e);
            }, o.ceil = function(e) {
              return e < 0 ? Math.floor(e) : Math.ceil(e);
            }, A.exports = o;
          },
          /* 10 */
          /***/
          function(A, O, T) {
            function o() {
            }
            o.MAX_VALUE = 2147483647, o.MIN_VALUE = -2147483648, A.exports = o;
          },
          /* 11 */
          /***/
          function(A, O, T) {
            var o = function() {
              function n(d, r) {
                for (var h = 0; h < r.length; h++) {
                  var a = r[h];
                  a.enumerable = a.enumerable || false, a.configurable = true, "value" in a && (a.writable = true), Object.defineProperty(d, a.key, a);
                }
              }
              return function(d, r, h) {
                return r && n(d.prototype, r), h && n(d, h), d;
              };
            }();
            function e(n, d) {
              if (!(n instanceof d))
                throw new TypeError("Cannot call a class as a function");
            }
            var t = function(d) {
              return { value: d, next: null, prev: null };
            }, i = function(d, r, h, a) {
              return d !== null ? d.next = r : a.head = r, h !== null ? h.prev = r : a.tail = r, r.prev = d, r.next = h, a.length++, r;
            }, l = function(d, r) {
              var h = d.prev, a = d.next;
              return h !== null ? h.next = a : r.head = a, a !== null ? a.prev = h : r.tail = h, d.prev = d.next = null, r.length--, d;
            }, g = function() {
              function n(d) {
                var r = this;
                e(this, n), this.length = 0, this.head = null, this.tail = null, d != null && d.forEach(function(h) {
                  return r.push(h);
                });
              }
              return o(n, [{
                key: "size",
                value: function() {
                  return this.length;
                }
              }, {
                key: "insertBefore",
                value: function(r, h) {
                  return i(h.prev, t(r), h, this);
                }
              }, {
                key: "insertAfter",
                value: function(r, h) {
                  return i(h, t(r), h.next, this);
                }
              }, {
                key: "insertNodeBefore",
                value: function(r, h) {
                  return i(h.prev, r, h, this);
                }
              }, {
                key: "insertNodeAfter",
                value: function(r, h) {
                  return i(h, r, h.next, this);
                }
              }, {
                key: "push",
                value: function(r) {
                  return i(this.tail, t(r), null, this);
                }
              }, {
                key: "unshift",
                value: function(r) {
                  return i(null, t(r), this.head, this);
                }
              }, {
                key: "remove",
                value: function(r) {
                  return l(r, this);
                }
              }, {
                key: "pop",
                value: function() {
                  return l(this.tail, this).value;
                }
              }, {
                key: "popNode",
                value: function() {
                  return l(this.tail, this);
                }
              }, {
                key: "shift",
                value: function() {
                  return l(this.head, this).value;
                }
              }, {
                key: "shiftNode",
                value: function() {
                  return l(this.head, this);
                }
              }, {
                key: "get_object_at",
                value: function(r) {
                  if (r <= this.length()) {
                    for (var h = 1, a = this.head; h < r; )
                      a = a.next, h++;
                    return a.value;
                  }
                }
              }, {
                key: "set_object_at",
                value: function(r, h) {
                  if (r <= this.length()) {
                    for (var a = 1, p = this.head; a < r; )
                      p = p.next, a++;
                    p.value = h;
                  }
                }
              }]), n;
            }();
            A.exports = g;
          },
          /* 12 */
          /***/
          function(A, O, T) {
            function o(e, t, i) {
              this.x = null, this.y = null, e == null && t == null && i == null ? (this.x = 0, this.y = 0) : typeof e == "number" && typeof t == "number" && i == null ? (this.x = e, this.y = t) : e.constructor.name == "Point" && t == null && i == null && (i = e, this.x = i.x, this.y = i.y);
            }
            o.prototype.getX = function() {
              return this.x;
            }, o.prototype.getY = function() {
              return this.y;
            }, o.prototype.getLocation = function() {
              return new o(this.x, this.y);
            }, o.prototype.setLocation = function(e, t, i) {
              e.constructor.name == "Point" && t == null && i == null ? (i = e, this.setLocation(i.x, i.y)) : typeof e == "number" && typeof t == "number" && i == null && (parseInt(e) == e && parseInt(t) == t ? this.move(e, t) : (this.x = Math.floor(e + 0.5), this.y = Math.floor(t + 0.5)));
            }, o.prototype.move = function(e, t) {
              this.x = e, this.y = t;
            }, o.prototype.translate = function(e, t) {
              this.x += e, this.y += t;
            }, o.prototype.equals = function(e) {
              if (e.constructor.name == "Point") {
                var t = e;
                return this.x == t.x && this.y == t.y;
              }
              return this == e;
            }, o.prototype.toString = function() {
              return new o().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
            }, A.exports = o;
          },
          /* 13 */
          /***/
          function(A, O, T) {
            function o(e, t, i, l) {
              this.x = 0, this.y = 0, this.width = 0, this.height = 0, e != null && t != null && i != null && l != null && (this.x = e, this.y = t, this.width = i, this.height = l);
            }
            o.prototype.getX = function() {
              return this.x;
            }, o.prototype.setX = function(e) {
              this.x = e;
            }, o.prototype.getY = function() {
              return this.y;
            }, o.prototype.setY = function(e) {
              this.y = e;
            }, o.prototype.getWidth = function() {
              return this.width;
            }, o.prototype.setWidth = function(e) {
              this.width = e;
            }, o.prototype.getHeight = function() {
              return this.height;
            }, o.prototype.setHeight = function(e) {
              this.height = e;
            }, o.prototype.getRight = function() {
              return this.x + this.width;
            }, o.prototype.getBottom = function() {
              return this.y + this.height;
            }, o.prototype.intersects = function(e) {
              return !(this.getRight() < e.x || this.getBottom() < e.y || e.getRight() < this.x || e.getBottom() < this.y);
            }, o.prototype.getCenterX = function() {
              return this.x + this.width / 2;
            }, o.prototype.getMinX = function() {
              return this.getX();
            }, o.prototype.getMaxX = function() {
              return this.getX() + this.width;
            }, o.prototype.getCenterY = function() {
              return this.y + this.height / 2;
            }, o.prototype.getMinY = function() {
              return this.getY();
            }, o.prototype.getMaxY = function() {
              return this.getY() + this.height;
            }, o.prototype.getWidthHalf = function() {
              return this.width / 2;
            }, o.prototype.getHeightHalf = function() {
              return this.height / 2;
            }, A.exports = o;
          },
          /* 14 */
          /***/
          function(A, O, T) {
            var o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
              return typeof t;
            } : function(t) {
              return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            };
            function e() {
            }
            e.lastID = 0, e.createID = function(t) {
              return e.isPrimitive(t) ? t : (t.uniqueID != null || (t.uniqueID = e.getString(), e.lastID++), t.uniqueID);
            }, e.getString = function(t) {
              return t == null && (t = e.lastID), "Object#" + t;
            }, e.isPrimitive = function(t) {
              var i = typeof t > "u" ? "undefined" : o(t);
              return t == null || i != "object" && i != "function";
            }, A.exports = e;
          },
          /* 15 */
          /***/
          function(A, O, T) {
            function o(a) {
              if (Array.isArray(a)) {
                for (var p = 0, v = Array(a.length); p < a.length; p++)
                  v[p] = a[p];
                return v;
              } else
                return Array.from(a);
            }
            var e = T(0), t = T(6), i = T(3), l = T(1), g = T(5), n = T(4), d = T(17), r = T(27);
            function h(a) {
              r.call(this), this.layoutQuality = e.QUALITY, this.createBendsAsNeeded = e.DEFAULT_CREATE_BENDS_AS_NEEDED, this.incremental = e.DEFAULT_INCREMENTAL, this.animationOnLayout = e.DEFAULT_ANIMATION_ON_LAYOUT, this.animationDuringLayout = e.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = e.DEFAULT_ANIMATION_PERIOD, this.uniformLeafNodeSizes = e.DEFAULT_UNIFORM_LEAF_NODE_SIZES, this.edgeToDummyNodes = /* @__PURE__ */ new Map(), this.graphManager = new t(this), this.isLayoutFinished = false, this.isSubLayout = false, this.isRemoteUse = false, a != null && (this.isRemoteUse = a);
            }
            h.RANDOM_SEED = 1, h.prototype = Object.create(r.prototype), h.prototype.getGraphManager = function() {
              return this.graphManager;
            }, h.prototype.getAllNodes = function() {
              return this.graphManager.getAllNodes();
            }, h.prototype.getAllEdges = function() {
              return this.graphManager.getAllEdges();
            }, h.prototype.getAllNodesToApplyGravitation = function() {
              return this.graphManager.getAllNodesToApplyGravitation();
            }, h.prototype.newGraphManager = function() {
              var a = new t(this);
              return this.graphManager = a, a;
            }, h.prototype.newGraph = function(a) {
              return new g(null, this.graphManager, a);
            }, h.prototype.newNode = function(a) {
              return new i(this.graphManager, a);
            }, h.prototype.newEdge = function(a) {
              return new l(null, null, a);
            }, h.prototype.checkLayoutSuccess = function() {
              return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
            }, h.prototype.runLayout = function() {
              this.isLayoutFinished = false, this.tilingPreLayout && this.tilingPreLayout(), this.initParameters();
              var a;
              return this.checkLayoutSuccess() ? a = false : a = this.layout(), e.ANIMATE === "during" ? false : (a && (this.isSubLayout || this.doPostLayout()), this.tilingPostLayout && this.tilingPostLayout(), this.isLayoutFinished = true, a);
            }, h.prototype.doPostLayout = function() {
              this.incremental || this.transform(), this.update();
            }, h.prototype.update2 = function() {
              if (this.createBendsAsNeeded && (this.createBendpointsFromDummyNodes(), this.graphManager.resetAllEdges()), !this.isRemoteUse) {
                for (var a = this.graphManager.getAllEdges(), p = 0; p < a.length; p++)
                  a[p];
                for (var v = this.graphManager.getRoot().getNodes(), p = 0; p < v.length; p++)
                  v[p];
                this.update(this.graphManager.getRoot());
              }
            }, h.prototype.update = function(a) {
              if (a == null)
                this.update2();
              else if (a instanceof i) {
                var p = a;
                if (p.getChild() != null)
                  for (var v = p.getChild().getNodes(), m2 = 0; m2 < v.length; m2++)
                    update(v[m2]);
                if (p.vGraphObject != null) {
                  var u = p.vGraphObject;
                  u.update(p);
                }
              } else if (a instanceof l) {
                var E = a;
                if (E.vGraphObject != null) {
                  var y = E.vGraphObject;
                  y.update(E);
                }
              } else if (a instanceof g) {
                var N = a;
                if (N.vGraphObject != null) {
                  var s = N.vGraphObject;
                  s.update(N);
                }
              }
            }, h.prototype.initParameters = function() {
              this.isSubLayout || (this.layoutQuality = e.QUALITY, this.animationDuringLayout = e.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = e.DEFAULT_ANIMATION_PERIOD, this.animationOnLayout = e.DEFAULT_ANIMATION_ON_LAYOUT, this.incremental = e.DEFAULT_INCREMENTAL, this.createBendsAsNeeded = e.DEFAULT_CREATE_BENDS_AS_NEEDED, this.uniformLeafNodeSizes = e.DEFAULT_UNIFORM_LEAF_NODE_SIZES), this.animationDuringLayout && (this.animationOnLayout = false);
            }, h.prototype.transform = function(a) {
              if (a == null)
                this.transform(new n(0, 0));
              else {
                var p = new d(), v = this.graphManager.getRoot().updateLeftTop();
                if (v != null) {
                  p.setWorldOrgX(a.x), p.setWorldOrgY(a.y), p.setDeviceOrgX(v.x), p.setDeviceOrgY(v.y);
                  for (var m2 = this.getAllNodes(), u, E = 0; E < m2.length; E++)
                    u = m2[E], u.transform(p);
                }
              }
            }, h.prototype.positionNodesRandomly = function(a) {
              if (a == null)
                this.positionNodesRandomly(this.getGraphManager().getRoot()), this.getGraphManager().getRoot().updateBounds(true);
              else
                for (var p, v, m2 = a.getNodes(), u = 0; u < m2.length; u++)
                  p = m2[u], v = p.getChild(), v == null || v.getNodes().length == 0 ? p.scatter() : (this.positionNodesRandomly(v), p.updateBounds());
            }, h.prototype.getFlatForest = function() {
              for (var a = [], p = true, v = this.graphManager.getRoot().getNodes(), m2 = true, u = 0; u < v.length; u++)
                v[u].getChild() != null && (m2 = false);
              if (!m2)
                return a;
              var E = /* @__PURE__ */ new Set(), y = [], N = /* @__PURE__ */ new Map(), s = [];
              for (s = s.concat(v); s.length > 0 && p; ) {
                for (y.push(s[0]); y.length > 0 && p; ) {
                  var f = y[0];
                  y.splice(0, 1), E.add(f);
                  for (var c = f.getEdges(), u = 0; u < c.length; u++) {
                    var L = c[u].getOtherEnd(f);
                    if (N.get(f) != L)
                      if (!E.has(L))
                        y.push(L), N.set(L, f);
                      else {
                        p = false;
                        break;
                      }
                  }
                }
                if (!p)
                  a = [];
                else {
                  var D = [].concat(o(E));
                  a.push(D);
                  for (var u = 0; u < D.length; u++) {
                    var I = D[u], R2 = s.indexOf(I);
                    R2 > -1 && s.splice(R2, 1);
                  }
                  E = /* @__PURE__ */ new Set(), N = /* @__PURE__ */ new Map();
                }
              }
              return a;
            }, h.prototype.createDummyNodesForBendpoints = function(a) {
              for (var p = [], v = a.source, m2 = this.graphManager.calcLowestCommonAncestor(a.source, a.target), u = 0; u < a.bendpoints.length; u++) {
                var E = this.newNode(null);
                E.setRect(new Point(0, 0), new Dimension(1, 1)), m2.add(E);
                var y = this.newEdge(null);
                this.graphManager.add(y, v, E), p.add(E), v = E;
              }
              var y = this.newEdge(null);
              return this.graphManager.add(y, v, a.target), this.edgeToDummyNodes.set(a, p), a.isInterGraph() ? this.graphManager.remove(a) : m2.remove(a), p;
            }, h.prototype.createBendpointsFromDummyNodes = function() {
              var a = [];
              a = a.concat(this.graphManager.getAllEdges()), a = [].concat(o(this.edgeToDummyNodes.keys())).concat(a);
              for (var p = 0; p < a.length; p++) {
                var v = a[p];
                if (v.bendpoints.length > 0) {
                  for (var m2 = this.edgeToDummyNodes.get(v), u = 0; u < m2.length; u++) {
                    var E = m2[u], y = new n(E.getCenterX(), E.getCenterY()), N = v.bendpoints.get(u);
                    N.x = y.x, N.y = y.y, E.getOwner().remove(E);
                  }
                  this.graphManager.add(v, v.source, v.target);
                }
              }
            }, h.transform = function(a, p, v, m2) {
              if (v != null && m2 != null) {
                var u = p;
                if (a <= 50) {
                  var E = p / v;
                  u -= (p - E) / 50 * (50 - a);
                } else {
                  var y = p * m2;
                  u += (y - p) / 50 * (a - 50);
                }
                return u;
              } else {
                var N, s;
                return a <= 50 ? (N = 9 * p / 500, s = p / 10) : (N = 9 * p / 50, s = -8 * p), N * a + s;
              }
            }, h.findCenterOfTree = function(a) {
              var p = [];
              p = p.concat(a);
              var v = [], m2 = /* @__PURE__ */ new Map(), u = false, E = null;
              (p.length == 1 || p.length == 2) && (u = true, E = p[0]);
              for (var y = 0; y < p.length; y++) {
                var N = p[y], s = N.getNeighborsList().size;
                m2.set(N, N.getNeighborsList().size), s == 1 && v.push(N);
              }
              var f = [];
              for (f = f.concat(v); !u; ) {
                var c = [];
                c = c.concat(f), f = [];
                for (var y = 0; y < p.length; y++) {
                  var N = p[y], L = p.indexOf(N);
                  L >= 0 && p.splice(L, 1);
                  var D = N.getNeighborsList();
                  D.forEach(function(C) {
                    if (v.indexOf(C) < 0) {
                      var M = m2.get(C), S = M - 1;
                      S == 1 && f.push(C), m2.set(C, S);
                    }
                  });
                }
                v = v.concat(f), (p.length == 1 || p.length == 2) && (u = true, E = p[0]);
              }
              return E;
            }, h.prototype.setGraphManager = function(a) {
              this.graphManager = a;
            }, A.exports = h;
          },
          /* 16 */
          /***/
          function(A, O, T) {
            function o() {
            }
            o.seed = 1, o.x = 0, o.nextDouble = function() {
              return o.x = Math.sin(o.seed++) * 1e4, o.x - Math.floor(o.x);
            }, A.exports = o;
          },
          /* 17 */
          /***/
          function(A, O, T) {
            var o = T(4);
            function e(t, i) {
              this.lworldOrgX = 0, this.lworldOrgY = 0, this.ldeviceOrgX = 0, this.ldeviceOrgY = 0, this.lworldExtX = 1, this.lworldExtY = 1, this.ldeviceExtX = 1, this.ldeviceExtY = 1;
            }
            e.prototype.getWorldOrgX = function() {
              return this.lworldOrgX;
            }, e.prototype.setWorldOrgX = function(t) {
              this.lworldOrgX = t;
            }, e.prototype.getWorldOrgY = function() {
              return this.lworldOrgY;
            }, e.prototype.setWorldOrgY = function(t) {
              this.lworldOrgY = t;
            }, e.prototype.getWorldExtX = function() {
              return this.lworldExtX;
            }, e.prototype.setWorldExtX = function(t) {
              this.lworldExtX = t;
            }, e.prototype.getWorldExtY = function() {
              return this.lworldExtY;
            }, e.prototype.setWorldExtY = function(t) {
              this.lworldExtY = t;
            }, e.prototype.getDeviceOrgX = function() {
              return this.ldeviceOrgX;
            }, e.prototype.setDeviceOrgX = function(t) {
              this.ldeviceOrgX = t;
            }, e.prototype.getDeviceOrgY = function() {
              return this.ldeviceOrgY;
            }, e.prototype.setDeviceOrgY = function(t) {
              this.ldeviceOrgY = t;
            }, e.prototype.getDeviceExtX = function() {
              return this.ldeviceExtX;
            }, e.prototype.setDeviceExtX = function(t) {
              this.ldeviceExtX = t;
            }, e.prototype.getDeviceExtY = function() {
              return this.ldeviceExtY;
            }, e.prototype.setDeviceExtY = function(t) {
              this.ldeviceExtY = t;
            }, e.prototype.transformX = function(t) {
              var i = 0, l = this.lworldExtX;
              return l != 0 && (i = this.ldeviceOrgX + (t - this.lworldOrgX) * this.ldeviceExtX / l), i;
            }, e.prototype.transformY = function(t) {
              var i = 0, l = this.lworldExtY;
              return l != 0 && (i = this.ldeviceOrgY + (t - this.lworldOrgY) * this.ldeviceExtY / l), i;
            }, e.prototype.inverseTransformX = function(t) {
              var i = 0, l = this.ldeviceExtX;
              return l != 0 && (i = this.lworldOrgX + (t - this.ldeviceOrgX) * this.lworldExtX / l), i;
            }, e.prototype.inverseTransformY = function(t) {
              var i = 0, l = this.ldeviceExtY;
              return l != 0 && (i = this.lworldOrgY + (t - this.ldeviceOrgY) * this.lworldExtY / l), i;
            }, e.prototype.inverseTransformPoint = function(t) {
              var i = new o(this.inverseTransformX(t.x), this.inverseTransformY(t.y));
              return i;
            }, A.exports = e;
          },
          /* 18 */
          /***/
          function(A, O, T) {
            function o(r) {
              if (Array.isArray(r)) {
                for (var h = 0, a = Array(r.length); h < r.length; h++)
                  a[h] = r[h];
                return a;
              } else
                return Array.from(r);
            }
            var e = T(15), t = T(7), i = T(0), l = T(8), g = T(9);
            function n() {
              e.call(this), this.useSmartIdealEdgeLengthCalculation = t.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.idealEdgeLength = t.DEFAULT_EDGE_LENGTH, this.springConstant = t.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = t.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = t.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = t.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = t.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = t.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.displacementThresholdPerNode = 3 * t.DEFAULT_EDGE_LENGTH / 100, this.coolingFactor = t.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.initialCoolingFactor = t.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.totalDisplacement = 0, this.oldTotalDisplacement = 0, this.maxIterations = t.MAX_ITERATIONS;
            }
            n.prototype = Object.create(e.prototype);
            for (var d in e)
              n[d] = e[d];
            n.prototype.initParameters = function() {
              e.prototype.initParameters.call(this, arguments), this.totalIterations = 0, this.notAnimatedIterations = 0, this.useFRGridVariant = t.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION, this.grid = [];
            }, n.prototype.calcIdealEdgeLengths = function() {
              for (var r, h, a, p, v, m2, u = this.getGraphManager().getAllEdges(), E = 0; E < u.length; E++)
                r = u[E], r.idealLength = this.idealEdgeLength, r.isInterGraph && (a = r.getSource(), p = r.getTarget(), v = r.getSourceInLca().getEstimatedSize(), m2 = r.getTargetInLca().getEstimatedSize(), this.useSmartIdealEdgeLengthCalculation && (r.idealLength += v + m2 - 2 * i.SIMPLE_NODE_SIZE), h = r.getLca().getInclusionTreeDepth(), r.idealLength += t.DEFAULT_EDGE_LENGTH * t.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (a.getInclusionTreeDepth() + p.getInclusionTreeDepth() - 2 * h));
            }, n.prototype.initSpringEmbedder = function() {
              var r = this.getAllNodes().length;
              this.incremental ? (r > t.ADAPTATION_LOWER_NODE_LIMIT && (this.coolingFactor = Math.max(this.coolingFactor * t.COOLING_ADAPTATION_FACTOR, this.coolingFactor - (r - t.ADAPTATION_LOWER_NODE_LIMIT) / (t.ADAPTATION_UPPER_NODE_LIMIT - t.ADAPTATION_LOWER_NODE_LIMIT) * this.coolingFactor * (1 - t.COOLING_ADAPTATION_FACTOR))), this.maxNodeDisplacement = t.MAX_NODE_DISPLACEMENT_INCREMENTAL) : (r > t.ADAPTATION_LOWER_NODE_LIMIT ? this.coolingFactor = Math.max(t.COOLING_ADAPTATION_FACTOR, 1 - (r - t.ADAPTATION_LOWER_NODE_LIMIT) / (t.ADAPTATION_UPPER_NODE_LIMIT - t.ADAPTATION_LOWER_NODE_LIMIT) * (1 - t.COOLING_ADAPTATION_FACTOR)) : this.coolingFactor = 1, this.initialCoolingFactor = this.coolingFactor, this.maxNodeDisplacement = t.MAX_NODE_DISPLACEMENT), this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations), this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length, this.repulsionRange = this.calcRepulsionRange();
            }, n.prototype.calcSpringForces = function() {
              for (var r = this.getAllEdges(), h, a = 0; a < r.length; a++)
                h = r[a], this.calcSpringForce(h, h.idealLength);
            }, n.prototype.calcRepulsionForces = function() {
              var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, a, p, v, m2, u = this.getAllNodes(), E;
              if (this.useFRGridVariant)
                for (this.totalIterations % t.GRID_CALCULATION_CHECK_PERIOD == 1 && r && this.updateGrid(), E = /* @__PURE__ */ new Set(), a = 0; a < u.length; a++)
                  v = u[a], this.calculateRepulsionForceOfANode(v, E, r, h), E.add(v);
              else
                for (a = 0; a < u.length; a++)
                  for (v = u[a], p = a + 1; p < u.length; p++)
                    m2 = u[p], v.getOwner() == m2.getOwner() && this.calcRepulsionForce(v, m2);
            }, n.prototype.calcGravitationalForces = function() {
              for (var r, h = this.getAllNodesToApplyGravitation(), a = 0; a < h.length; a++)
                r = h[a], this.calcGravitationalForce(r);
            }, n.prototype.moveNodes = function() {
              for (var r = this.getAllNodes(), h, a = 0; a < r.length; a++)
                h = r[a], h.move();
            }, n.prototype.calcSpringForce = function(r, h) {
              var a = r.getSource(), p = r.getTarget(), v, m2, u, E;
              if (this.uniformLeafNodeSizes && a.getChild() == null && p.getChild() == null)
                r.updateLengthSimple();
              else if (r.updateLength(), r.isOverlapingSourceAndTarget)
                return;
              v = r.getLength(), v != 0 && (m2 = this.springConstant * (v - h), u = m2 * (r.lengthX / v), E = m2 * (r.lengthY / v), a.springForceX += u, a.springForceY += E, p.springForceX -= u, p.springForceY -= E);
            }, n.prototype.calcRepulsionForce = function(r, h) {
              var a = r.getRect(), p = h.getRect(), v = new Array(2), m2 = new Array(4), u, E, y, N, s, f, c;
              if (a.intersects(p)) {
                l.calcSeparationAmount(a, p, v, t.DEFAULT_EDGE_LENGTH / 2), f = 2 * v[0], c = 2 * v[1];
                var L = r.noOfChildren * h.noOfChildren / (r.noOfChildren + h.noOfChildren);
                r.repulsionForceX -= L * f, r.repulsionForceY -= L * c, h.repulsionForceX += L * f, h.repulsionForceY += L * c;
              } else
                this.uniformLeafNodeSizes && r.getChild() == null && h.getChild() == null ? (u = p.getCenterX() - a.getCenterX(), E = p.getCenterY() - a.getCenterY()) : (l.getIntersection(a, p, m2), u = m2[2] - m2[0], E = m2[3] - m2[1]), Math.abs(u) < t.MIN_REPULSION_DIST && (u = g.sign(u) * t.MIN_REPULSION_DIST), Math.abs(E) < t.MIN_REPULSION_DIST && (E = g.sign(E) * t.MIN_REPULSION_DIST), y = u * u + E * E, N = Math.sqrt(y), s = this.repulsionConstant * r.noOfChildren * h.noOfChildren / y, f = s * u / N, c = s * E / N, r.repulsionForceX -= f, r.repulsionForceY -= c, h.repulsionForceX += f, h.repulsionForceY += c;
            }, n.prototype.calcGravitationalForce = function(r) {
              var h, a, p, v, m2, u, E, y;
              h = r.getOwner(), a = (h.getRight() + h.getLeft()) / 2, p = (h.getTop() + h.getBottom()) / 2, v = r.getCenterX() - a, m2 = r.getCenterY() - p, u = Math.abs(v) + r.getWidth() / 2, E = Math.abs(m2) + r.getHeight() / 2, r.getOwner() == this.graphManager.getRoot() ? (y = h.getEstimatedSize() * this.gravityRangeFactor, (u > y || E > y) && (r.gravitationForceX = -this.gravityConstant * v, r.gravitationForceY = -this.gravityConstant * m2)) : (y = h.getEstimatedSize() * this.compoundGravityRangeFactor, (u > y || E > y) && (r.gravitationForceX = -this.gravityConstant * v * this.compoundGravityConstant, r.gravitationForceY = -this.gravityConstant * m2 * this.compoundGravityConstant));
            }, n.prototype.isConverged = function() {
              var r, h = false;
              return this.totalIterations > this.maxIterations / 3 && (h = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2), r = this.totalDisplacement < this.totalDisplacementThreshold, this.oldTotalDisplacement = this.totalDisplacement, r || h;
            }, n.prototype.animate = function() {
              this.animationDuringLayout && !this.isSubLayout && (this.notAnimatedIterations == this.animationPeriod ? (this.update(), this.notAnimatedIterations = 0) : this.notAnimatedIterations++);
            }, n.prototype.calcNoOfChildrenForAllNodes = function() {
              for (var r, h = this.graphManager.getAllNodes(), a = 0; a < h.length; a++)
                r = h[a], r.noOfChildren = r.getNoOfChildren();
            }, n.prototype.calcGrid = function(r) {
              var h = 0, a = 0;
              h = parseInt(Math.ceil((r.getRight() - r.getLeft()) / this.repulsionRange)), a = parseInt(Math.ceil((r.getBottom() - r.getTop()) / this.repulsionRange));
              for (var p = new Array(h), v = 0; v < h; v++)
                p[v] = new Array(a);
              for (var v = 0; v < h; v++)
                for (var m2 = 0; m2 < a; m2++)
                  p[v][m2] = new Array();
              return p;
            }, n.prototype.addNodeToGrid = function(r, h, a) {
              var p = 0, v = 0, m2 = 0, u = 0;
              p = parseInt(Math.floor((r.getRect().x - h) / this.repulsionRange)), v = parseInt(Math.floor((r.getRect().width + r.getRect().x - h) / this.repulsionRange)), m2 = parseInt(Math.floor((r.getRect().y - a) / this.repulsionRange)), u = parseInt(Math.floor((r.getRect().height + r.getRect().y - a) / this.repulsionRange));
              for (var E = p; E <= v; E++)
                for (var y = m2; y <= u; y++)
                  this.grid[E][y].push(r), r.setGridCoordinates(p, v, m2, u);
            }, n.prototype.updateGrid = function() {
              var r, h, a = this.getAllNodes();
              for (this.grid = this.calcGrid(this.graphManager.getRoot()), r = 0; r < a.length; r++)
                h = a[r], this.addNodeToGrid(h, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
            }, n.prototype.calculateRepulsionForceOfANode = function(r, h, a, p) {
              if (this.totalIterations % t.GRID_CALCULATION_CHECK_PERIOD == 1 && a || p) {
                var v = /* @__PURE__ */ new Set();
                r.surrounding = new Array();
                for (var m2, u = this.grid, E = r.startX - 1; E < r.finishX + 2; E++)
                  for (var y = r.startY - 1; y < r.finishY + 2; y++)
                    if (!(E < 0 || y < 0 || E >= u.length || y >= u[0].length)) {
                      for (var N = 0; N < u[E][y].length; N++)
                        if (m2 = u[E][y][N], !(r.getOwner() != m2.getOwner() || r == m2) && !h.has(m2) && !v.has(m2)) {
                          var s = Math.abs(r.getCenterX() - m2.getCenterX()) - (r.getWidth() / 2 + m2.getWidth() / 2), f = Math.abs(r.getCenterY() - m2.getCenterY()) - (r.getHeight() / 2 + m2.getHeight() / 2);
                          s <= this.repulsionRange && f <= this.repulsionRange && v.add(m2);
                        }
                    }
                r.surrounding = [].concat(o(v));
              }
              for (E = 0; E < r.surrounding.length; E++)
                this.calcRepulsionForce(r, r.surrounding[E]);
            }, n.prototype.calcRepulsionRange = function() {
              return 0;
            }, A.exports = n;
          },
          /* 19 */
          /***/
          function(A, O, T) {
            var o = T(1), e = T(7);
            function t(l, g, n) {
              o.call(this, l, g, n), this.idealLength = e.DEFAULT_EDGE_LENGTH;
            }
            t.prototype = Object.create(o.prototype);
            for (var i in o)
              t[i] = o[i];
            A.exports = t;
          },
          /* 20 */
          /***/
          function(A, O, T) {
            var o = T(3);
            function e(i, l, g, n) {
              o.call(this, i, l, g, n), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0, this.startX = 0, this.finishX = 0, this.startY = 0, this.finishY = 0, this.surrounding = [];
            }
            e.prototype = Object.create(o.prototype);
            for (var t in o)
              e[t] = o[t];
            e.prototype.setGridCoordinates = function(i, l, g, n) {
              this.startX = i, this.finishX = l, this.startY = g, this.finishY = n;
            }, A.exports = e;
          },
          /* 21 */
          /***/
          function(A, O, T) {
            function o(e, t) {
              this.width = 0, this.height = 0, e !== null && t !== null && (this.height = t, this.width = e);
            }
            o.prototype.getWidth = function() {
              return this.width;
            }, o.prototype.setWidth = function(e) {
              this.width = e;
            }, o.prototype.getHeight = function() {
              return this.height;
            }, o.prototype.setHeight = function(e) {
              this.height = e;
            }, A.exports = o;
          },
          /* 22 */
          /***/
          function(A, O, T) {
            var o = T(14);
            function e() {
              this.map = {}, this.keys = [];
            }
            e.prototype.put = function(t, i) {
              var l = o.createID(t);
              this.contains(l) || (this.map[l] = i, this.keys.push(t));
            }, e.prototype.contains = function(t) {
              return o.createID(t), this.map[t] != null;
            }, e.prototype.get = function(t) {
              var i = o.createID(t);
              return this.map[i];
            }, e.prototype.keySet = function() {
              return this.keys;
            }, A.exports = e;
          },
          /* 23 */
          /***/
          function(A, O, T) {
            var o = T(14);
            function e() {
              this.set = {};
            }
            e.prototype.add = function(t) {
              var i = o.createID(t);
              this.contains(i) || (this.set[i] = t);
            }, e.prototype.remove = function(t) {
              delete this.set[o.createID(t)];
            }, e.prototype.clear = function() {
              this.set = {};
            }, e.prototype.contains = function(t) {
              return this.set[o.createID(t)] == t;
            }, e.prototype.isEmpty = function() {
              return this.size() === 0;
            }, e.prototype.size = function() {
              return Object.keys(this.set).length;
            }, e.prototype.addAllTo = function(t) {
              for (var i = Object.keys(this.set), l = i.length, g = 0; g < l; g++)
                t.push(this.set[i[g]]);
            }, e.prototype.size = function() {
              return Object.keys(this.set).length;
            }, e.prototype.addAll = function(t) {
              for (var i = t.length, l = 0; l < i; l++) {
                var g = t[l];
                this.add(g);
              }
            }, A.exports = e;
          },
          /* 24 */
          /***/
          function(A, O, T) {
            var o = function() {
              function l(g, n) {
                for (var d = 0; d < n.length; d++) {
                  var r = n[d];
                  r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(g, r.key, r);
                }
              }
              return function(g, n, d) {
                return n && l(g.prototype, n), d && l(g, d), g;
              };
            }();
            function e(l, g) {
              if (!(l instanceof g))
                throw new TypeError("Cannot call a class as a function");
            }
            var t = T(11), i = function() {
              function l(g, n) {
                e(this, l), (n !== null || n !== void 0) && (this.compareFunction = this._defaultCompareFunction);
                var d = void 0;
                g instanceof t ? d = g.size() : d = g.length, this._quicksort(g, 0, d - 1);
              }
              return o(l, [{
                key: "_quicksort",
                value: function(n, d, r) {
                  if (d < r) {
                    var h = this._partition(n, d, r);
                    this._quicksort(n, d, h), this._quicksort(n, h + 1, r);
                  }
                }
              }, {
                key: "_partition",
                value: function(n, d, r) {
                  for (var h = this._get(n, d), a = d, p = r; ; ) {
                    for (; this.compareFunction(h, this._get(n, p)); )
                      p--;
                    for (; this.compareFunction(this._get(n, a), h); )
                      a++;
                    if (a < p)
                      this._swap(n, a, p), a++, p--;
                    else
                      return p;
                  }
                }
              }, {
                key: "_get",
                value: function(n, d) {
                  return n instanceof t ? n.get_object_at(d) : n[d];
                }
              }, {
                key: "_set",
                value: function(n, d, r) {
                  n instanceof t ? n.set_object_at(d, r) : n[d] = r;
                }
              }, {
                key: "_swap",
                value: function(n, d, r) {
                  var h = this._get(n, d);
                  this._set(n, d, this._get(n, r)), this._set(n, r, h);
                }
              }, {
                key: "_defaultCompareFunction",
                value: function(n, d) {
                  return d > n;
                }
              }]), l;
            }();
            A.exports = i;
          },
          /* 25 */
          /***/
          function(A, O, T) {
            var o = function() {
              function i(l, g) {
                for (var n = 0; n < g.length; n++) {
                  var d = g[n];
                  d.enumerable = d.enumerable || false, d.configurable = true, "value" in d && (d.writable = true), Object.defineProperty(l, d.key, d);
                }
              }
              return function(l, g, n) {
                return g && i(l.prototype, g), n && i(l, n), l;
              };
            }();
            function e(i, l) {
              if (!(i instanceof l))
                throw new TypeError("Cannot call a class as a function");
            }
            var t = function() {
              function i(l, g) {
                var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, d = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
                e(this, i), this.sequence1 = l, this.sequence2 = g, this.match_score = n, this.mismatch_penalty = d, this.gap_penalty = r, this.iMax = l.length + 1, this.jMax = g.length + 1, this.grid = new Array(this.iMax);
                for (var h = 0; h < this.iMax; h++) {
                  this.grid[h] = new Array(this.jMax);
                  for (var a = 0; a < this.jMax; a++)
                    this.grid[h][a] = 0;
                }
                this.tracebackGrid = new Array(this.iMax);
                for (var p = 0; p < this.iMax; p++) {
                  this.tracebackGrid[p] = new Array(this.jMax);
                  for (var v = 0; v < this.jMax; v++)
                    this.tracebackGrid[p][v] = [null, null, null];
                }
                this.alignments = [], this.score = -1, this.computeGrids();
              }
              return o(i, [{
                key: "getScore",
                value: function() {
                  return this.score;
                }
              }, {
                key: "getAlignments",
                value: function() {
                  return this.alignments;
                }
                // Main dynamic programming procedure
              }, {
                key: "computeGrids",
                value: function() {
                  for (var g = 1; g < this.jMax; g++)
                    this.grid[0][g] = this.grid[0][g - 1] + this.gap_penalty, this.tracebackGrid[0][g] = [false, false, true];
                  for (var n = 1; n < this.iMax; n++)
                    this.grid[n][0] = this.grid[n - 1][0] + this.gap_penalty, this.tracebackGrid[n][0] = [false, true, false];
                  for (var d = 1; d < this.iMax; d++)
                    for (var r = 1; r < this.jMax; r++) {
                      var h = void 0;
                      this.sequence1[d - 1] === this.sequence2[r - 1] ? h = this.grid[d - 1][r - 1] + this.match_score : h = this.grid[d - 1][r - 1] + this.mismatch_penalty;
                      var a = this.grid[d - 1][r] + this.gap_penalty, p = this.grid[d][r - 1] + this.gap_penalty, v = [h, a, p], m2 = this.arrayAllMaxIndexes(v);
                      this.grid[d][r] = v[m2[0]], this.tracebackGrid[d][r] = [m2.includes(0), m2.includes(1), m2.includes(2)];
                    }
                  this.score = this.grid[this.iMax - 1][this.jMax - 1];
                }
                // Gets all possible valid sequence combinations
              }, {
                key: "alignmentTraceback",
                value: function() {
                  var g = [];
                  for (g.push({
                    pos: [this.sequence1.length, this.sequence2.length],
                    seq1: "",
                    seq2: ""
                  }); g[0]; ) {
                    var n = g[0], d = this.tracebackGrid[n.pos[0]][n.pos[1]];
                    d[0] && g.push({
                      pos: [n.pos[0] - 1, n.pos[1] - 1],
                      seq1: this.sequence1[n.pos[0] - 1] + n.seq1,
                      seq2: this.sequence2[n.pos[1] - 1] + n.seq2
                    }), d[1] && g.push({
                      pos: [n.pos[0] - 1, n.pos[1]],
                      seq1: this.sequence1[n.pos[0] - 1] + n.seq1,
                      seq2: "-" + n.seq2
                    }), d[2] && g.push({
                      pos: [n.pos[0], n.pos[1] - 1],
                      seq1: "-" + n.seq1,
                      seq2: this.sequence2[n.pos[1] - 1] + n.seq2
                    }), n.pos[0] === 0 && n.pos[1] === 0 && this.alignments.push({
                      sequence1: n.seq1,
                      sequence2: n.seq2
                    }), g.shift();
                  }
                  return this.alignments;
                }
                // Helper Functions
              }, {
                key: "getAllIndexes",
                value: function(g, n) {
                  for (var d = [], r = -1; (r = g.indexOf(n, r + 1)) !== -1; )
                    d.push(r);
                  return d;
                }
              }, {
                key: "arrayAllMaxIndexes",
                value: function(g) {
                  return this.getAllIndexes(g, Math.max.apply(null, g));
                }
              }]), i;
            }();
            A.exports = t;
          },
          /* 26 */
          /***/
          function(A, O, T) {
            var o = function() {
            };
            o.FDLayout = T(18), o.FDLayoutConstants = T(7), o.FDLayoutEdge = T(19), o.FDLayoutNode = T(20), o.DimensionD = T(21), o.HashMap = T(22), o.HashSet = T(23), o.IGeometry = T(8), o.IMath = T(9), o.Integer = T(10), o.Point = T(12), o.PointD = T(4), o.RandomSeed = T(16), o.RectangleD = T(13), o.Transform = T(17), o.UniqueIDGeneretor = T(14), o.Quicksort = T(24), o.LinkedList = T(11), o.LGraphObject = T(2), o.LGraph = T(5), o.LEdge = T(1), o.LGraphManager = T(6), o.LNode = T(3), o.Layout = T(15), o.LayoutConstants = T(0), o.NeedlemanWunsch = T(25), A.exports = o;
          },
          /* 27 */
          /***/
          function(A, O, T) {
            function o() {
              this.listeners = [];
            }
            var e = o.prototype;
            e.addListener = function(t, i) {
              this.listeners.push({
                event: t,
                callback: i
              });
            }, e.removeListener = function(t, i) {
              for (var l = this.listeners.length; l >= 0; l--) {
                var g = this.listeners[l];
                g.event === t && g.callback === i && this.listeners.splice(l, 1);
              }
            }, e.emit = function(t, i) {
              for (var l = 0; l < this.listeners.length; l++) {
                var g = this.listeners[l];
                t === g.event && g.callback(i);
              }
            }, A.exports = o;
          }
          /******/
        ])
      );
    });
  }(Q)), Q.exports;
}
var q;
function ft() {
  return q || (q = 1, function(G, b) {
    (function(O, T) {
      G.exports = T(ut());
    })(Vv, function(A) {
      return (
        /******/
        function(O) {
          var T = {};
          function o(e) {
            if (T[e])
              return T[e].exports;
            var t = T[e] = {
              /******/
              i: e,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            return O[e].call(t.exports, t, t.exports, o), t.l = true, t.exports;
          }
          return o.m = O, o.c = T, o.i = function(e) {
            return e;
          }, o.d = function(e, t, i) {
            o.o(e, t) || Object.defineProperty(e, t, {
              /******/
              configurable: false,
              /******/
              enumerable: true,
              /******/
              get: i
              /******/
            });
          }, o.n = function(e) {
            var t = e && e.__esModule ? (
              /******/
              function() {
                return e.default;
              }
            ) : (
              /******/
              function() {
                return e;
              }
            );
            return o.d(t, "a", t), t;
          }, o.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }, o.p = "", o(o.s = 7);
        }([
          /* 0 */
          /***/
          function(O, T) {
            O.exports = A;
          },
          /* 1 */
          /***/
          function(O, T, o) {
            var e = o(0).FDLayoutConstants;
            function t() {
            }
            for (var i in e)
              t[i] = e[i];
            t.DEFAULT_USE_MULTI_LEVEL_SCALING = false, t.DEFAULT_RADIAL_SEPARATION = e.DEFAULT_EDGE_LENGTH, t.DEFAULT_COMPONENT_SEPERATION = 60, t.TILE = true, t.TILING_PADDING_VERTICAL = 10, t.TILING_PADDING_HORIZONTAL = 10, t.TREE_REDUCTION_ON_INCREMENTAL = false, O.exports = t;
          },
          /* 2 */
          /***/
          function(O, T, o) {
            var e = o(0).FDLayoutEdge;
            function t(l, g, n) {
              e.call(this, l, g, n);
            }
            t.prototype = Object.create(e.prototype);
            for (var i in e)
              t[i] = e[i];
            O.exports = t;
          },
          /* 3 */
          /***/
          function(O, T, o) {
            var e = o(0).LGraph;
            function t(l, g, n) {
              e.call(this, l, g, n);
            }
            t.prototype = Object.create(e.prototype);
            for (var i in e)
              t[i] = e[i];
            O.exports = t;
          },
          /* 4 */
          /***/
          function(O, T, o) {
            var e = o(0).LGraphManager;
            function t(l) {
              e.call(this, l);
            }
            t.prototype = Object.create(e.prototype);
            for (var i in e)
              t[i] = e[i];
            O.exports = t;
          },
          /* 5 */
          /***/
          function(O, T, o) {
            var e = o(0).FDLayoutNode, t = o(0).IMath;
            function i(g, n, d, r) {
              e.call(this, g, n, d, r);
            }
            i.prototype = Object.create(e.prototype);
            for (var l in e)
              i[l] = e[l];
            i.prototype.move = function() {
              var g = this.graphManager.getLayout();
              this.displacementX = g.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.noOfChildren, this.displacementY = g.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.noOfChildren, Math.abs(this.displacementX) > g.coolingFactor * g.maxNodeDisplacement && (this.displacementX = g.coolingFactor * g.maxNodeDisplacement * t.sign(this.displacementX)), Math.abs(this.displacementY) > g.coolingFactor * g.maxNodeDisplacement && (this.displacementY = g.coolingFactor * g.maxNodeDisplacement * t.sign(this.displacementY)), this.child == null ? this.moveBy(this.displacementX, this.displacementY) : this.child.getNodes().length == 0 ? this.moveBy(this.displacementX, this.displacementY) : this.propogateDisplacementToChildren(this.displacementX, this.displacementY), g.totalDisplacement += Math.abs(this.displacementX) + Math.abs(this.displacementY), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0;
            }, i.prototype.propogateDisplacementToChildren = function(g, n) {
              for (var d = this.getChild().getNodes(), r, h = 0; h < d.length; h++)
                r = d[h], r.getChild() == null ? (r.moveBy(g, n), r.displacementX += g, r.displacementY += n) : r.propogateDisplacementToChildren(g, n);
            }, i.prototype.setPred1 = function(g) {
              this.pred1 = g;
            }, i.prototype.getPred1 = function() {
              return pred1;
            }, i.prototype.getPred2 = function() {
              return pred2;
            }, i.prototype.setNext = function(g) {
              this.next = g;
            }, i.prototype.getNext = function() {
              return next;
            }, i.prototype.setProcessed = function(g) {
              this.processed = g;
            }, i.prototype.isProcessed = function() {
              return processed;
            }, O.exports = i;
          },
          /* 6 */
          /***/
          function(O, T, o) {
            var e = o(0).FDLayout, t = o(4), i = o(3), l = o(5), g = o(2), n = o(1), d = o(0).FDLayoutConstants, r = o(0).LayoutConstants, h = o(0).Point, a = o(0).PointD, p = o(0).Layout, v = o(0).Integer, m2 = o(0).IGeometry, u = o(0).LGraph, E = o(0).Transform;
            function y() {
              e.call(this), this.toBeTiled = {};
            }
            y.prototype = Object.create(e.prototype);
            for (var N in e)
              y[N] = e[N];
            y.prototype.newGraphManager = function() {
              var s = new t(this);
              return this.graphManager = s, s;
            }, y.prototype.newGraph = function(s) {
              return new i(null, this.graphManager, s);
            }, y.prototype.newNode = function(s) {
              return new l(this.graphManager, s);
            }, y.prototype.newEdge = function(s) {
              return new g(null, null, s);
            }, y.prototype.initParameters = function() {
              e.prototype.initParameters.call(this, arguments), this.isSubLayout || (n.DEFAULT_EDGE_LENGTH < 10 ? this.idealEdgeLength = 10 : this.idealEdgeLength = n.DEFAULT_EDGE_LENGTH, this.useSmartIdealEdgeLengthCalculation = n.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.springConstant = d.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = d.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = d.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = d.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = d.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = d.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.prunedNodesAll = [], this.growTreeIterations = 0, this.afterGrowthIterations = 0, this.isTreeGrowing = false, this.isGrowthFinished = false, this.coolingCycle = 0, this.maxCoolingCycle = this.maxIterations / d.CONVERGENCE_CHECK_PERIOD, this.finalTemperature = d.CONVERGENCE_CHECK_PERIOD / this.maxIterations, this.coolingAdjuster = 1);
            }, y.prototype.layout = function() {
              var s = r.DEFAULT_CREATE_BENDS_AS_NEEDED;
              return s && (this.createBendpoints(), this.graphManager.resetAllEdges()), this.level = 0, this.classicLayout();
            }, y.prototype.classicLayout = function() {
              if (this.nodesWithGravity = this.calculateNodesToApplyGravitationTo(), this.graphManager.setAllNodesToApplyGravitation(this.nodesWithGravity), this.calcNoOfChildrenForAllNodes(), this.graphManager.calcLowestCommonAncestors(), this.graphManager.calcInclusionTreeDepths(), this.graphManager.getRoot().calcEstimatedSize(), this.calcIdealEdgeLengths(), this.incremental) {
                if (n.TREE_REDUCTION_ON_INCREMENTAL) {
                  this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
                  var f = new Set(this.getAllNodes()), c = this.nodesWithGravity.filter(function(I) {
                    return f.has(I);
                  });
                  this.graphManager.setAllNodesToApplyGravitation(c);
                }
              } else {
                var s = this.getFlatForest();
                if (s.length > 0)
                  this.positionNodesRadially(s);
                else {
                  this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
                  var f = new Set(this.getAllNodes()), c = this.nodesWithGravity.filter(function(L) {
                    return f.has(L);
                  });
                  this.graphManager.setAllNodesToApplyGravitation(c), this.positionNodesRandomly();
                }
              }
              return this.initSpringEmbedder(), this.runSpringEmbedder(), true;
            }, y.prototype.tick = function() {
              if (this.totalIterations++, this.totalIterations === this.maxIterations && !this.isTreeGrowing && !this.isGrowthFinished)
                if (this.prunedNodesAll.length > 0)
                  this.isTreeGrowing = true;
                else
                  return true;
              if (this.totalIterations % d.CONVERGENCE_CHECK_PERIOD == 0 && !this.isTreeGrowing && !this.isGrowthFinished) {
                if (this.isConverged())
                  if (this.prunedNodesAll.length > 0)
                    this.isTreeGrowing = true;
                  else
                    return true;
                this.coolingCycle++, this.layoutQuality == 0 ? this.coolingAdjuster = this.coolingCycle : this.layoutQuality == 1 && (this.coolingAdjuster = this.coolingCycle / 3), this.coolingFactor = Math.max(this.initialCoolingFactor - Math.pow(this.coolingCycle, Math.log(100 * (this.initialCoolingFactor - this.finalTemperature)) / Math.log(this.maxCoolingCycle)) / 100 * this.coolingAdjuster, this.finalTemperature), this.animationPeriod = Math.ceil(this.initialAnimationPeriod * Math.sqrt(this.coolingFactor));
              }
              if (this.isTreeGrowing) {
                if (this.growTreeIterations % 10 == 0)
                  if (this.prunedNodesAll.length > 0) {
                    this.graphManager.updateBounds(), this.updateGrid(), this.growTree(this.prunedNodesAll), this.graphManager.resetAllNodesToApplyGravitation();
                    var s = new Set(this.getAllNodes()), f = this.nodesWithGravity.filter(function(D) {
                      return s.has(D);
                    });
                    this.graphManager.setAllNodesToApplyGravitation(f), this.graphManager.updateBounds(), this.updateGrid(), this.coolingFactor = d.DEFAULT_COOLING_FACTOR_INCREMENTAL;
                  } else
                    this.isTreeGrowing = false, this.isGrowthFinished = true;
                this.growTreeIterations++;
              }
              if (this.isGrowthFinished) {
                if (this.isConverged())
                  return true;
                this.afterGrowthIterations % 10 == 0 && (this.graphManager.updateBounds(), this.updateGrid()), this.coolingFactor = d.DEFAULT_COOLING_FACTOR_INCREMENTAL * ((100 - this.afterGrowthIterations) / 100), this.afterGrowthIterations++;
              }
              var c = !this.isTreeGrowing && !this.isGrowthFinished, L = this.growTreeIterations % 10 == 1 && this.isTreeGrowing || this.afterGrowthIterations % 10 == 1 && this.isGrowthFinished;
              return this.totalDisplacement = 0, this.graphManager.updateBounds(), this.calcSpringForces(), this.calcRepulsionForces(c, L), this.calcGravitationalForces(), this.moveNodes(), this.animate(), false;
            }, y.prototype.getPositionsData = function() {
              for (var s = this.graphManager.getAllNodes(), f = {}, c = 0; c < s.length; c++) {
                var L = s[c].rect, D = s[c].id;
                f[D] = {
                  id: D,
                  x: L.getCenterX(),
                  y: L.getCenterY(),
                  w: L.width,
                  h: L.height
                };
              }
              return f;
            }, y.prototype.runSpringEmbedder = function() {
              this.initialAnimationPeriod = 25, this.animationPeriod = this.initialAnimationPeriod;
              var s = false;
              if (d.ANIMATE === "during")
                this.emit("layoutstarted");
              else {
                for (; !s; )
                  s = this.tick();
                this.graphManager.updateBounds();
              }
            }, y.prototype.calculateNodesToApplyGravitationTo = function() {
              var s = [], f, c = this.graphManager.getGraphs(), L = c.length, D;
              for (D = 0; D < L; D++)
                f = c[D], f.updateConnected(), f.isConnected || (s = s.concat(f.getNodes()));
              return s;
            }, y.prototype.createBendpoints = function() {
              var s = [];
              s = s.concat(this.graphManager.getAllEdges());
              var f = /* @__PURE__ */ new Set(), c;
              for (c = 0; c < s.length; c++) {
                var L = s[c];
                if (!f.has(L)) {
                  var D = L.getSource(), I = L.getTarget();
                  if (D == I)
                    L.getBendpoints().push(new a()), L.getBendpoints().push(new a()), this.createDummyNodesForBendpoints(L), f.add(L);
                  else {
                    var R2 = [];
                    if (R2 = R2.concat(D.getEdgeListToNode(I)), R2 = R2.concat(I.getEdgeListToNode(D)), !f.has(R2[0])) {
                      if (R2.length > 1) {
                        var C;
                        for (C = 0; C < R2.length; C++) {
                          var M = R2[C];
                          M.getBendpoints().push(new a()), this.createDummyNodesForBendpoints(M);
                        }
                      }
                      R2.forEach(function(S) {
                        f.add(S);
                      });
                    }
                  }
                }
                if (f.size == s.length)
                  break;
              }
            }, y.prototype.positionNodesRadially = function(s) {
              for (var f = new h(0, 0), c = Math.ceil(Math.sqrt(s.length)), L = 0, D = 0, I = 0, R2 = new a(0, 0), C = 0; C < s.length; C++) {
                C % c == 0 && (I = 0, D = L, C != 0 && (D += n.DEFAULT_COMPONENT_SEPERATION), L = 0);
                var M = s[C], S = p.findCenterOfTree(M);
                f.x = I, f.y = D, R2 = y.radialLayout(M, S, f), R2.y > L && (L = Math.floor(R2.y)), I = Math.floor(R2.x + n.DEFAULT_COMPONENT_SEPERATION);
              }
              this.transform(new a(r.WORLD_CENTER_X - R2.x / 2, r.WORLD_CENTER_Y - R2.y / 2));
            }, y.radialLayout = function(s, f, c) {
              var L = Math.max(this.maxDiagonalInTree(s), n.DEFAULT_RADIAL_SEPARATION);
              y.branchRadialLayout(f, null, 0, 359, 0, L);
              var D = u.calculateBounds(s), I = new E();
              I.setDeviceOrgX(D.getMinX()), I.setDeviceOrgY(D.getMinY()), I.setWorldOrgX(c.x), I.setWorldOrgY(c.y);
              for (var R2 = 0; R2 < s.length; R2++) {
                var C = s[R2];
                C.transform(I);
              }
              var M = new a(D.getMaxX(), D.getMaxY());
              return I.inverseTransformPoint(M);
            }, y.branchRadialLayout = function(s, f, c, L, D, I) {
              var R2 = (L - c + 1) / 2;
              R2 < 0 && (R2 += 180);
              var C = (R2 + c) % 360, M = C * m2.TWO_PI / 360, S = D * Math.cos(M), Y = D * Math.sin(M);
              s.setCenter(S, Y);
              var w = [];
              w = w.concat(s.getEdges());
              var x = w.length;
              f != null && x--;
              for (var F = 0, U = w.length, P, _ = s.getEdgesBetween(f); _.length > 1; ) {
                var X = _[0];
                _.splice(0, 1);
                var H = w.indexOf(X);
                H >= 0 && w.splice(H, 1), U--, x--;
              }
              f != null ? P = (w.indexOf(_[0]) + 1) % U : P = 0;
              for (var W = Math.abs(L - c) / x, B = P; F != x; B = ++B % U) {
                var K = w[B].getOtherEnd(s);
                if (K != f) {
                  var j = (c + F * W) % 360, ht = (j + W) % 360;
                  y.branchRadialLayout(K, s, j, ht, D + I, I), F++;
                }
              }
            }, y.maxDiagonalInTree = function(s) {
              for (var f = v.MIN_VALUE, c = 0; c < s.length; c++) {
                var L = s[c], D = L.getDiagonal();
                D > f && (f = D);
              }
              return f;
            }, y.prototype.calcRepulsionRange = function() {
              return 2 * (this.level + 1) * this.idealEdgeLength;
            }, y.prototype.groupZeroDegreeMembers = function() {
              var s = this, f = {};
              this.memberGroups = {}, this.idToDummyNode = {};
              for (var c = [], L = this.graphManager.getAllNodes(), D = 0; D < L.length; D++) {
                var I = L[D], R2 = I.getParent();
                this.getNodeDegreeWithChildren(I) === 0 && (R2.id == null || !this.getToBeTiled(R2)) && c.push(I);
              }
              for (var D = 0; D < c.length; D++) {
                var I = c[D], C = I.getParent().id;
                typeof f[C] > "u" && (f[C] = []), f[C] = f[C].concat(I);
              }
              Object.keys(f).forEach(function(M) {
                if (f[M].length > 1) {
                  var S = "DummyCompound_" + M;
                  s.memberGroups[S] = f[M];
                  var Y = f[M][0].getParent(), w = new l(s.graphManager);
                  w.id = S, w.paddingLeft = Y.paddingLeft || 0, w.paddingRight = Y.paddingRight || 0, w.paddingBottom = Y.paddingBottom || 0, w.paddingTop = Y.paddingTop || 0, s.idToDummyNode[S] = w;
                  var x = s.getGraphManager().add(s.newGraph(), w), F = Y.getChild();
                  F.add(w);
                  for (var U = 0; U < f[M].length; U++) {
                    var P = f[M][U];
                    F.remove(P), x.add(P);
                  }
                }
              });
            }, y.prototype.clearCompounds = function() {
              var s = {}, f = {};
              this.performDFSOnCompounds();
              for (var c = 0; c < this.compoundOrder.length; c++)
                f[this.compoundOrder[c].id] = this.compoundOrder[c], s[this.compoundOrder[c].id] = [].concat(this.compoundOrder[c].getChild().getNodes()), this.graphManager.remove(this.compoundOrder[c].getChild()), this.compoundOrder[c].child = null;
              this.graphManager.resetAllNodes(), this.tileCompoundMembers(s, f);
            }, y.prototype.clearZeroDegreeMembers = function() {
              var s = this, f = this.tiledZeroDegreePack = [];
              Object.keys(this.memberGroups).forEach(function(c) {
                var L = s.idToDummyNode[c];
                f[c] = s.tileNodes(s.memberGroups[c], L.paddingLeft + L.paddingRight), L.rect.width = f[c].width, L.rect.height = f[c].height;
              });
            }, y.prototype.repopulateCompounds = function() {
              for (var s = this.compoundOrder.length - 1; s >= 0; s--) {
                var f = this.compoundOrder[s], c = f.id, L = f.paddingLeft, D = f.paddingTop;
                this.adjustLocations(this.tiledMemberPack[c], f.rect.x, f.rect.y, L, D);
              }
            }, y.prototype.repopulateZeroDegreeMembers = function() {
              var s = this, f = this.tiledZeroDegreePack;
              Object.keys(f).forEach(function(c) {
                var L = s.idToDummyNode[c], D = L.paddingLeft, I = L.paddingTop;
                s.adjustLocations(f[c], L.rect.x, L.rect.y, D, I);
              });
            }, y.prototype.getToBeTiled = function(s) {
              var f = s.id;
              if (this.toBeTiled[f] != null)
                return this.toBeTiled[f];
              var c = s.getChild();
              if (c == null)
                return this.toBeTiled[f] = false, false;
              for (var L = c.getNodes(), D = 0; D < L.length; D++) {
                var I = L[D];
                if (this.getNodeDegree(I) > 0)
                  return this.toBeTiled[f] = false, false;
                if (I.getChild() == null) {
                  this.toBeTiled[I.id] = false;
                  continue;
                }
                if (!this.getToBeTiled(I))
                  return this.toBeTiled[f] = false, false;
              }
              return this.toBeTiled[f] = true, true;
            }, y.prototype.getNodeDegree = function(s) {
              s.id;
              for (var f = s.getEdges(), c = 0, L = 0; L < f.length; L++) {
                var D = f[L];
                D.getSource().id !== D.getTarget().id && (c = c + 1);
              }
              return c;
            }, y.prototype.getNodeDegreeWithChildren = function(s) {
              var f = this.getNodeDegree(s);
              if (s.getChild() == null)
                return f;
              for (var c = s.getChild().getNodes(), L = 0; L < c.length; L++) {
                var D = c[L];
                f += this.getNodeDegreeWithChildren(D);
              }
              return f;
            }, y.prototype.performDFSOnCompounds = function() {
              this.compoundOrder = [], this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes());
            }, y.prototype.fillCompexOrderByDFS = function(s) {
              for (var f = 0; f < s.length; f++) {
                var c = s[f];
                c.getChild() != null && this.fillCompexOrderByDFS(c.getChild().getNodes()), this.getToBeTiled(c) && this.compoundOrder.push(c);
              }
            }, y.prototype.adjustLocations = function(s, f, c, L, D) {
              f += L, c += D;
              for (var I = f, R2 = 0; R2 < s.rows.length; R2++) {
                var C = s.rows[R2];
                f = I;
                for (var M = 0, S = 0; S < C.length; S++) {
                  var Y = C[S];
                  Y.rect.x = f, Y.rect.y = c, f += Y.rect.width + s.horizontalPadding, Y.rect.height > M && (M = Y.rect.height);
                }
                c += M + s.verticalPadding;
              }
            }, y.prototype.tileCompoundMembers = function(s, f) {
              var c = this;
              this.tiledMemberPack = [], Object.keys(s).forEach(function(L) {
                var D = f[L];
                c.tiledMemberPack[L] = c.tileNodes(s[L], D.paddingLeft + D.paddingRight), D.rect.width = c.tiledMemberPack[L].width, D.rect.height = c.tiledMemberPack[L].height;
              });
            }, y.prototype.tileNodes = function(s, f) {
              var c = n.TILING_PADDING_VERTICAL, L = n.TILING_PADDING_HORIZONTAL, D = {
                rows: [],
                rowWidth: [],
                rowHeight: [],
                width: 0,
                height: f,
                // assume minHeight equals to minWidth
                verticalPadding: c,
                horizontalPadding: L
              };
              s.sort(function(C, M) {
                return C.rect.width * C.rect.height > M.rect.width * M.rect.height ? -1 : C.rect.width * C.rect.height < M.rect.width * M.rect.height ? 1 : 0;
              });
              for (var I = 0; I < s.length; I++) {
                var R2 = s[I];
                D.rows.length == 0 ? this.insertNodeToRow(D, R2, 0, f) : this.canAddHorizontal(D, R2.rect.width, R2.rect.height) ? this.insertNodeToRow(D, R2, this.getShortestRowIndex(D), f) : this.insertNodeToRow(D, R2, D.rows.length, f), this.shiftToLastRow(D);
              }
              return D;
            }, y.prototype.insertNodeToRow = function(s, f, c, L) {
              var D = L;
              if (c == s.rows.length) {
                var I = [];
                s.rows.push(I), s.rowWidth.push(D), s.rowHeight.push(0);
              }
              var R2 = s.rowWidth[c] + f.rect.width;
              s.rows[c].length > 0 && (R2 += s.horizontalPadding), s.rowWidth[c] = R2, s.width < R2 && (s.width = R2);
              var C = f.rect.height;
              c > 0 && (C += s.verticalPadding);
              var M = 0;
              C > s.rowHeight[c] && (M = s.rowHeight[c], s.rowHeight[c] = C, M = s.rowHeight[c] - M), s.height += M, s.rows[c].push(f);
            }, y.prototype.getShortestRowIndex = function(s) {
              for (var f = -1, c = Number.MAX_VALUE, L = 0; L < s.rows.length; L++)
                s.rowWidth[L] < c && (f = L, c = s.rowWidth[L]);
              return f;
            }, y.prototype.getLongestRowIndex = function(s) {
              for (var f = -1, c = Number.MIN_VALUE, L = 0; L < s.rows.length; L++)
                s.rowWidth[L] > c && (f = L, c = s.rowWidth[L]);
              return f;
            }, y.prototype.canAddHorizontal = function(s, f, c) {
              var L = this.getShortestRowIndex(s);
              if (L < 0)
                return true;
              var D = s.rowWidth[L];
              if (D + s.horizontalPadding + f <= s.width)
                return true;
              var I = 0;
              s.rowHeight[L] < c && L > 0 && (I = c + s.verticalPadding - s.rowHeight[L]);
              var R2;
              s.width - D >= f + s.horizontalPadding ? R2 = (s.height + I) / (D + f + s.horizontalPadding) : R2 = (s.height + I) / s.width, I = c + s.verticalPadding;
              var C;
              return s.width < f ? C = (s.height + I) / f : C = (s.height + I) / s.width, C < 1 && (C = 1 / C), R2 < 1 && (R2 = 1 / R2), R2 < C;
            }, y.prototype.shiftToLastRow = function(s) {
              var f = this.getLongestRowIndex(s), c = s.rowWidth.length - 1, L = s.rows[f], D = L[L.length - 1], I = D.width + s.horizontalPadding;
              if (s.width - s.rowWidth[c] > I && f != c) {
                L.splice(-1, 1), s.rows[c].push(D), s.rowWidth[f] = s.rowWidth[f] - I, s.rowWidth[c] = s.rowWidth[c] + I, s.width = s.rowWidth[instance.getLongestRowIndex(s)];
                for (var R2 = Number.MIN_VALUE, C = 0; C < L.length; C++)
                  L[C].height > R2 && (R2 = L[C].height);
                f > 0 && (R2 += s.verticalPadding);
                var M = s.rowHeight[f] + s.rowHeight[c];
                s.rowHeight[f] = R2, s.rowHeight[c] < D.height + s.verticalPadding && (s.rowHeight[c] = D.height + s.verticalPadding);
                var S = s.rowHeight[f] + s.rowHeight[c];
                s.height += S - M, this.shiftToLastRow(s);
              }
            }, y.prototype.tilingPreLayout = function() {
              n.TILE && (this.groupZeroDegreeMembers(), this.clearCompounds(), this.clearZeroDegreeMembers());
            }, y.prototype.tilingPostLayout = function() {
              n.TILE && (this.repopulateZeroDegreeMembers(), this.repopulateCompounds());
            }, y.prototype.reduceTrees = function() {
              for (var s = [], f = true, c; f; ) {
                var L = this.graphManager.getAllNodes(), D = [];
                f = false;
                for (var I = 0; I < L.length; I++)
                  c = L[I], c.getEdges().length == 1 && !c.getEdges()[0].isInterGraph && c.getChild() == null && (D.push([c, c.getEdges()[0], c.getOwner()]), f = true);
                if (f == true) {
                  for (var R2 = [], C = 0; C < D.length; C++)
                    D[C][0].getEdges().length == 1 && (R2.push(D[C]), D[C][0].getOwner().remove(D[C][0]));
                  s.push(R2), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
                }
              }
              this.prunedNodesAll = s;
            }, y.prototype.growTree = function(s) {
              for (var f = s.length, c = s[f - 1], L, D = 0; D < c.length; D++)
                L = c[D], this.findPlaceforPrunedNode(L), L[2].add(L[0]), L[2].add(L[1], L[1].source, L[1].target);
              s.splice(s.length - 1, 1), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
            }, y.prototype.findPlaceforPrunedNode = function(s) {
              var f, c, L = s[0];
              L == s[1].source ? c = s[1].target : c = s[1].source;
              var D = c.startX, I = c.finishX, R2 = c.startY, C = c.finishY, M = 0, S = 0, Y = 0, w = 0, x = [M, Y, S, w];
              if (R2 > 0)
                for (var F = D; F <= I; F++)
                  x[0] += this.grid[F][R2 - 1].length + this.grid[F][R2].length - 1;
              if (I < this.grid.length - 1)
                for (var F = R2; F <= C; F++)
                  x[1] += this.grid[I + 1][F].length + this.grid[I][F].length - 1;
              if (C < this.grid[0].length - 1)
                for (var F = D; F <= I; F++)
                  x[2] += this.grid[F][C + 1].length + this.grid[F][C].length - 1;
              if (D > 0)
                for (var F = R2; F <= C; F++)
                  x[3] += this.grid[D - 1][F].length + this.grid[D][F].length - 1;
              for (var U = v.MAX_VALUE, P, _, X = 0; X < x.length; X++)
                x[X] < U ? (U = x[X], P = 1, _ = X) : x[X] == U && P++;
              if (P == 3 && U == 0)
                x[0] == 0 && x[1] == 0 && x[2] == 0 ? f = 1 : x[0] == 0 && x[1] == 0 && x[3] == 0 ? f = 0 : x[0] == 0 && x[2] == 0 && x[3] == 0 ? f = 3 : x[1] == 0 && x[2] == 0 && x[3] == 0 && (f = 2);
              else if (P == 2 && U == 0) {
                var H = Math.floor(Math.random() * 2);
                x[0] == 0 && x[1] == 0 ? H == 0 ? f = 0 : f = 1 : x[0] == 0 && x[2] == 0 ? H == 0 ? f = 0 : f = 2 : x[0] == 0 && x[3] == 0 ? H == 0 ? f = 0 : f = 3 : x[1] == 0 && x[2] == 0 ? H == 0 ? f = 1 : f = 2 : x[1] == 0 && x[3] == 0 ? H == 0 ? f = 1 : f = 3 : H == 0 ? f = 2 : f = 3;
              } else if (P == 4 && U == 0) {
                var H = Math.floor(Math.random() * 4);
                f = H;
              } else
                f = _;
              f == 0 ? L.setCenter(c.getCenterX(), c.getCenterY() - c.getHeight() / 2 - d.DEFAULT_EDGE_LENGTH - L.getHeight() / 2) : f == 1 ? L.setCenter(c.getCenterX() + c.getWidth() / 2 + d.DEFAULT_EDGE_LENGTH + L.getWidth() / 2, c.getCenterY()) : f == 2 ? L.setCenter(c.getCenterX(), c.getCenterY() + c.getHeight() / 2 + d.DEFAULT_EDGE_LENGTH + L.getHeight() / 2) : L.setCenter(c.getCenterX() - c.getWidth() / 2 - d.DEFAULT_EDGE_LENGTH - L.getWidth() / 2, c.getCenterY());
            }, O.exports = y;
          },
          /* 7 */
          /***/
          function(O, T, o) {
            var e = {};
            e.layoutBase = o(0), e.CoSEConstants = o(1), e.CoSEEdge = o(2), e.CoSEGraph = o(3), e.CoSEGraphManager = o(4), e.CoSELayout = o(6), e.CoSENode = o(5), O.exports = e;
          }
          /******/
        ])
      );
    });
  }(Z)), Z.exports;
}
(function(G, b) {
  (function(O, T) {
    G.exports = T(ft());
  })(Vv, function(A) {
    return (
      /******/
      function(O) {
        var T = {};
        function o(e) {
          if (T[e])
            return T[e].exports;
          var t = T[e] = {
            /******/
            i: e,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
          };
          return O[e].call(t.exports, t, t.exports, o), t.l = true, t.exports;
        }
        return o.m = O, o.c = T, o.i = function(e) {
          return e;
        }, o.d = function(e, t, i) {
          o.o(e, t) || Object.defineProperty(e, t, {
            /******/
            configurable: false,
            /******/
            enumerable: true,
            /******/
            get: i
            /******/
          });
        }, o.n = function(e) {
          var t = e && e.__esModule ? (
            /******/
            function() {
              return e.default;
            }
          ) : (
            /******/
            function() {
              return e;
            }
          );
          return o.d(t, "a", t), t;
        }, o.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }, o.p = "", o(o.s = 1);
      }([
        /* 0 */
        /***/
        function(O, T) {
          O.exports = A;
        },
        /* 1 */
        /***/
        function(O, T, o) {
          var e = o(0).layoutBase.LayoutConstants, t = o(0).layoutBase.FDLayoutConstants, i = o(0).CoSEConstants, l = o(0).CoSELayout, g = o(0).CoSENode, n = o(0).layoutBase.PointD, d = o(0).layoutBase.DimensionD, r = {
            // Called on `layoutready`
            ready: function() {
            },
            // Called on `layoutstop`
            stop: function() {
            },
            // 'draft', 'default' or 'proof" 
            // - 'draft' fast cooling rate 
            // - 'default' moderate cooling rate 
            // - "proof" slow cooling rate
            quality: "default",
            // include labels in node dimensions
            nodeDimensionsIncludeLabels: false,
            // number of ticks per frame; higher is faster but more jerky
            refresh: 30,
            // Whether to fit the network view after when done
            fit: true,
            // Padding on fit
            padding: 10,
            // Whether to enable incremental mode
            randomize: true,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: 4500,
            // Ideal edge (non nested) length
            idealEdgeLength: 50,
            // Divisor to compute edge forces
            edgeElasticity: 0.45,
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 0.1,
            // Gravity force (constant)
            gravity: 0.25,
            // Maximum number of iterations to perform
            numIter: 2500,
            // For enabling tiling
            tile: true,
            // Type of layout animation. The option set is {'during', 'end', false}
            animate: "end",
            // Duration for animate:end
            animationDuration: 500,
            // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingVertical: 10,
            // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingHorizontal: 10,
            // Gravity range (constant) for compounds
            gravityRangeCompound: 1.5,
            // Gravity force (constant) for compounds
            gravityCompound: 1,
            // Gravity range (constant)
            gravityRange: 3.8,
            // Initial cooling factor for incremental layout
            initialEnergyOnIncremental: 0.5
          };
          function h(m2, u) {
            var E = {};
            for (var y in m2)
              E[y] = m2[y];
            for (var y in u)
              E[y] = u[y];
            return E;
          }
          function a(m2) {
            this.options = h(r, m2), p(this.options);
          }
          var p = function(u) {
            u.nodeRepulsion != null && (i.DEFAULT_REPULSION_STRENGTH = t.DEFAULT_REPULSION_STRENGTH = u.nodeRepulsion), u.idealEdgeLength != null && (i.DEFAULT_EDGE_LENGTH = t.DEFAULT_EDGE_LENGTH = u.idealEdgeLength), u.edgeElasticity != null && (i.DEFAULT_SPRING_STRENGTH = t.DEFAULT_SPRING_STRENGTH = u.edgeElasticity), u.nestingFactor != null && (i.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = t.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = u.nestingFactor), u.gravity != null && (i.DEFAULT_GRAVITY_STRENGTH = t.DEFAULT_GRAVITY_STRENGTH = u.gravity), u.numIter != null && (i.MAX_ITERATIONS = t.MAX_ITERATIONS = u.numIter), u.gravityRange != null && (i.DEFAULT_GRAVITY_RANGE_FACTOR = t.DEFAULT_GRAVITY_RANGE_FACTOR = u.gravityRange), u.gravityCompound != null && (i.DEFAULT_COMPOUND_GRAVITY_STRENGTH = t.DEFAULT_COMPOUND_GRAVITY_STRENGTH = u.gravityCompound), u.gravityRangeCompound != null && (i.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = t.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = u.gravityRangeCompound), u.initialEnergyOnIncremental != null && (i.DEFAULT_COOLING_FACTOR_INCREMENTAL = t.DEFAULT_COOLING_FACTOR_INCREMENTAL = u.initialEnergyOnIncremental), u.quality == "draft" ? e.QUALITY = 0 : u.quality == "proof" ? e.QUALITY = 2 : e.QUALITY = 1, i.NODE_DIMENSIONS_INCLUDE_LABELS = t.NODE_DIMENSIONS_INCLUDE_LABELS = e.NODE_DIMENSIONS_INCLUDE_LABELS = u.nodeDimensionsIncludeLabels, i.DEFAULT_INCREMENTAL = t.DEFAULT_INCREMENTAL = e.DEFAULT_INCREMENTAL = !u.randomize, i.ANIMATE = t.ANIMATE = e.ANIMATE = u.animate, i.TILE = u.tile, i.TILING_PADDING_VERTICAL = typeof u.tilingPaddingVertical == "function" ? u.tilingPaddingVertical.call() : u.tilingPaddingVertical, i.TILING_PADDING_HORIZONTAL = typeof u.tilingPaddingHorizontal == "function" ? u.tilingPaddingHorizontal.call() : u.tilingPaddingHorizontal;
          };
          a.prototype.run = function() {
            var m2, u, E = this.options;
            this.idToLNode = {};
            var y = this.layout = new l(), N = this;
            N.stopped = false, this.cy = this.options.cy, this.cy.trigger({ type: "layoutstart", layout: this });
            var s = y.newGraphManager();
            this.gm = s;
            var f = this.options.eles.nodes(), c = this.options.eles.edges();
            this.root = s.addRoot(), this.processChildrenList(this.root, this.getTopMostNodes(f), y);
            for (var L = 0; L < c.length; L++) {
              var D = c[L], I = this.idToLNode[D.data("source")], R2 = this.idToLNode[D.data("target")];
              if (I !== R2 && I.getEdgesBetween(R2).length == 0) {
                var C = s.add(y.newEdge(), I, R2);
                C.id = D.id();
              }
            }
            var M = function(w, x) {
              typeof w == "number" && (w = x);
              var F = w.data("id"), U = N.idToLNode[F];
              return {
                x: U.getRect().getCenterX(),
                y: U.getRect().getCenterY()
              };
            }, S = function Y() {
              for (var w = function() {
                E.fit && E.cy.fit(E.eles, E.padding), m2 || (m2 = true, N.cy.one("layoutready", E.ready), N.cy.trigger({ type: "layoutready", layout: N }));
              }, x = N.options.refresh, F, U = 0; U < x && !F; U++)
                F = N.stopped || N.layout.tick();
              if (F) {
                y.checkLayoutSuccess() && !y.isSubLayout && y.doPostLayout(), y.tilingPostLayout && y.tilingPostLayout(), y.isLayoutFinished = true, N.options.eles.nodes().positions(M), w(), N.cy.one("layoutstop", N.options.stop), N.cy.trigger({ type: "layoutstop", layout: N }), u && cancelAnimationFrame(u), m2 = false;
                return;
              }
              var P = N.layout.getPositionsData();
              E.eles.nodes().positions(function(_, X) {
                if (typeof _ == "number" && (_ = X), !_.isParent()) {
                  for (var H = _.id(), W = P[H], B = _; W == null && (W = P[B.data("parent")] || P["DummyCompound_" + B.data("parent")], P[H] = W, B = B.parent()[0], B != null); )
                    ;
                  return W != null ? {
                    x: W.x,
                    y: W.y
                  } : {
                    x: _.position("x"),
                    y: _.position("y")
                  };
                }
              }), w(), u = requestAnimationFrame(Y);
            };
            return y.addListener("layoutstarted", function() {
              N.options.animate === "during" && (u = requestAnimationFrame(S));
            }), y.runLayout(), this.options.animate !== "during" && (N.options.eles.nodes().not(":parent").layoutPositions(N, N.options, M), m2 = false), this;
          }, a.prototype.getTopMostNodes = function(m2) {
            for (var u = {}, E = 0; E < m2.length; E++)
              u[m2[E].id()] = true;
            var y = m2.filter(function(N, s) {
              typeof N == "number" && (N = s);
              for (var f = N.parent()[0]; f != null; ) {
                if (u[f.id()])
                  return false;
                f = f.parent()[0];
              }
              return true;
            });
            return y;
          }, a.prototype.processChildrenList = function(m2, u, E) {
            for (var y = u.length, N = 0; N < y; N++) {
              var s = u[N], f = s.children(), c, L = s.layoutDimensions({
                nodeDimensionsIncludeLabels: this.options.nodeDimensionsIncludeLabels
              });
              if (s.outerWidth() != null && s.outerHeight() != null ? c = m2.add(new g(E.graphManager, new n(s.position("x") - L.w / 2, s.position("y") - L.h / 2), new d(parseFloat(L.w), parseFloat(L.h)))) : c = m2.add(new g(this.graphManager)), c.id = s.data("id"), c.paddingLeft = parseInt(s.css("padding")), c.paddingTop = parseInt(s.css("padding")), c.paddingRight = parseInt(s.css("padding")), c.paddingBottom = parseInt(s.css("padding")), this.options.nodeDimensionsIncludeLabels && s.isParent()) {
                var D = s.boundingBox({ includeLabels: true, includeNodes: false }).w, I = s.boundingBox({ includeLabels: true, includeNodes: false }).h, R2 = s.css("text-halign");
                c.labelWidth = D, c.labelHeight = I, c.labelPos = R2;
              }
              if (this.idToLNode[s.data("id")] = c, isNaN(c.rect.x) && (c.rect.x = 0), isNaN(c.rect.y) && (c.rect.y = 0), f != null && f.length > 0) {
                var C;
                C = E.getGraphManager().add(E.newGraph(), c), this.processChildrenList(C, f, E);
              }
            }
          }, a.prototype.stop = function() {
            return this.stopped = true, this;
          };
          var v = function(u) {
            u("layout", "cose-bilkent", a);
          };
          typeof cytoscape < "u" && v(cytoscape), O.exports = v;
        }
        /******/
      ])
    );
  });
})(tt);
var ct = tt.exports;
const pt = /* @__PURE__ */ Xv(ct);
ea.use(pt);
function et(G, b) {
  G.forEach((A) => {
    const O = {
      id: A.id,
      labelText: A.label,
      height: A.height,
      width: A.width,
      padding: A.padding ?? 0
    };
    Object.keys(A).forEach((T) => {
      ["id", "label", "height", "width", "padding", "x", "y"].includes(T) || (O[T] = A[T]);
    }), b.add({
      group: "nodes",
      data: O,
      position: {
        x: A.x ?? 0,
        y: A.y ?? 0
      }
    });
  });
}
m(et, "addNodes");
function rt(G, b) {
  G.forEach((A) => {
    const O = {
      id: A.id,
      source: A.start,
      target: A.end
    };
    Object.keys(A).forEach((T) => {
      ["id", "start", "end"].includes(T) || (O[T] = A[T]);
    }), b.add({
      group: "edges",
      data: O
    });
  });
}
m(rt, "addEdges");
function it(G) {
  return new Promise((b) => {
    const A = gt("body").append("div").attr("id", "cy").attr("style", "display:none"), O = ea({
      container: document.getElementById("cy"),
      // container to render in
      style: [
        {
          selector: "edge",
          style: {
            "curve-style": "bezier"
          }
        }
      ]
    });
    A.remove(), et(G.nodes, O), rt(G.edges, O), O.nodes().forEach(function(o) {
      o.layoutDimensions = () => {
        const e = o.data();
        return { w: e.width, h: e.height };
      };
    });
    const T = {
      name: "cose-bilkent",
      // @ts-ignore Types for cose-bilkent are not correct?
      quality: "proof",
      styleEnabled: false,
      animate: false
    };
    O.layout(T).run(), O.ready((o) => {
      R.info("Cytoscape ready", o), b(O);
    });
  });
}
m(it, "createCytoscapeInstance");
function nt(G) {
  return G.nodes().map((b) => {
    const A = b.data(), O = b.position(), T = {
      id: A.id,
      x: O.x,
      y: O.y
    };
    return Object.keys(A).forEach((o) => {
      o !== "id" && (T[o] = A[o]);
    }), T;
  });
}
m(nt, "extractPositionedNodes");
function ot(G) {
  return G.edges().map((b) => {
    const A = b.data(), O = b._private.rscratch, T = {
      id: A.id,
      source: A.source,
      target: A.target,
      startX: O.startX,
      startY: O.startY,
      midX: O.midX,
      midY: O.midY,
      endX: O.endX,
      endY: O.endY
    };
    return Object.keys(A).forEach((o) => {
      ["id", "source", "target"].includes(o) || (T[o] = A[o]);
    }), T;
  });
}
m(ot, "extractPositionedEdges");
async function st(G, b) {
  R.debug("Starting cose-bilkent layout algorithm");
  try {
    at(G);
    const A = await it(G), O = nt(A), T = ot(A);
    return R.debug(`Layout completed: ${O.length} nodes, ${T.length} edges`), {
      nodes: O,
      edges: T
    };
  } catch (A) {
    throw R.error("Error in cose-bilkent layout algorithm:", A), A;
  }
}
m(st, "executeCoseBilkentLayout");
function at(G) {
  if (!G)
    throw new Error("Layout data is required");
  if (!G.config)
    throw new Error("Configuration is required in layout data");
  if (!G.rootNode)
    throw new Error("Root node is required");
  if (!G.nodes || !Array.isArray(G.nodes))
    throw new Error("No nodes found in layout data");
  if (!Array.isArray(G.edges))
    throw new Error("Edges array is required in layout data");
  return true;
}
m(at, "validateLayoutData");
var dt = /* @__PURE__ */ m(async (G, b, {
  insertCluster: A,
  insertEdge: O,
  insertEdgeLabel: T,
  insertMarkers: o,
  insertNode: e,
  log: t,
  positionEdgeLabel: i
}, { algorithm: l }) => {
  const g = {}, n = {}, d = b.select("g");
  o(d, G.markers, G.type, G.diagramId);
  const r = d.insert("g").attr("class", "subgraphs"), h = d.insert("g").attr("class", "edgePaths"), a = d.insert("g").attr("class", "edgeLabels"), p = d.insert("g").attr("class", "nodes");
  t.debug("Inserting nodes into DOM for dimension calculation"), await Promise.all(
    G.nodes.map(async (u) => {
      if (u.isGroup) {
        const E = { ...u };
        n[u.id] = E, g[u.id] = E, await A(r, u);
      } else {
        const E = { ...u };
        g[u.id] = E;
        const y = await e(p, u, {
          config: G.config,
          dir: G.direction || "TB"
        }), N = y.node().getBBox();
        E.width = N.width, E.height = N.height, E.domId = y, t.debug(`Node ${u.id} dimensions: ${N.width}x${N.height}`);
      }
    })
  ), t.debug("Running cose-bilkent layout algorithm");
  const v = {
    ...G,
    nodes: G.nodes.map((u) => {
      const E = g[u.id];
      return {
        ...u,
        width: E.width,
        height: E.height
      };
    })
  }, m2 = await st(v, G.config);
  t.debug("Positioning nodes based on layout results"), m2.nodes.forEach((u) => {
    const E = g[u.id];
    E != null && E.domId && (E.domId.attr(
      "transform",
      `translate(${u.x}, ${u.y})`
    ), E.x = u.x, E.y = u.y, t.debug(`Positioned node ${E.id} at center (${u.x}, ${u.y})`));
  }), m2.edges.forEach((u) => {
    const E = G.edges.find((y) => y.id === u.id);
    E && (E.points = [
      { x: u.startX, y: u.startY },
      { x: u.midX, y: u.midY },
      { x: u.endX, y: u.endY }
    ]);
  }), t.debug("Inserting and positioning edges"), await Promise.all(
    G.edges.map(async (u) => {
      await T(a, u);
      const E = g[u.start ?? ""], y = g[u.end ?? ""];
      if (E && y) {
        const N = m2.edges.find((s) => s.id === u.id);
        if (N) {
          t.debug("APA01 positionedEdge", N);
          const s = { ...u }, f = O(
            h,
            s,
            n,
            G.type,
            E,
            y,
            G.diagramId
          );
          i(s, f);
        } else {
          const s = {
            ...u,
            points: [
              { x: E.x || 0, y: E.y || 0 },
              { x: y.x || 0, y: y.y || 0 }
            ]
          }, f = O(
            h,
            s,
            n,
            G.type,
            E,
            y,
            G.diagramId
          );
          i(s, f);
        }
      }
    })
  ), t.debug("Cose-bilkent rendering completed");
}, "render"), Xe = dt;
export {
  Xe as render
};
