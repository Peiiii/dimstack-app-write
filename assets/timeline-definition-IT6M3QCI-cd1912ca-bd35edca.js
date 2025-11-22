import { H as m, aw as Qv, bj as Pf, ar as M5, a6 as gt$1, O as yt$1, M as R, bk as T5, bl as Kn, bm as Y$1, bn as et } from "./app-e6b7fe9d.js";
import { h as hn } from "./arc-8303a7b0-41ff7687.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
var X = function() {
  var i = /* @__PURE__ */ m(function(m2, n, a, h) {
    for (a = a || {}, h = m2.length; h--; a[m2[h]] = n)
      ;
    return a;
  }, "o"), t = [6, 8, 10, 11, 12, 14, 16, 17, 20, 21], e = [1, 9], o = [1, 10], r = [1, 11], p = [1, 12], c = [1, 13], g = [1, 16], f = [1, 17], u = {
    trace: /* @__PURE__ */ m(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, timeline: 4, document: 5, EOF: 6, line: 7, SPACE: 8, statement: 9, NEWLINE: 10, title: 11, acc_title: 12, acc_title_value: 13, acc_descr: 14, acc_descr_value: 15, acc_descr_multiline_value: 16, section: 17, period_statement: 18, event_statement: 19, period: 20, event: 21, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "timeline", 6: "EOF", 8: "SPACE", 10: "NEWLINE", 11: "title", 12: "acc_title", 13: "acc_title_value", 14: "acc_descr", 15: "acc_descr_value", 16: "acc_descr_multiline_value", 17: "section", 20: "period", 21: "event" },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [9, 1], [9, 2], [9, 2], [9, 1], [9, 1], [9, 1], [9, 1], [18, 1], [19, 1]],
    performAction: /* @__PURE__ */ m(function(n, a, h, d, y, l, S) {
      var k = l.length - 1;
      switch (y) {
        case 1:
          return l[k - 1];
        case 2:
          this.$ = [];
          break;
        case 3:
          l[k - 1].push(l[k]), this.$ = l[k - 1];
          break;
        case 4:
        case 5:
          this.$ = l[k];
          break;
        case 6:
        case 7:
          this.$ = [];
          break;
        case 8:
          d.getCommonDb().setDiagramTitle(l[k].substr(6)), this.$ = l[k].substr(6);
          break;
        case 9:
          this.$ = l[k].trim(), d.getCommonDb().setAccTitle(this.$);
          break;
        case 10:
        case 11:
          this.$ = l[k].trim(), d.getCommonDb().setAccDescription(this.$);
          break;
        case 12:
          d.addSection(l[k].substr(8)), this.$ = l[k].substr(8);
          break;
        case 15:
          d.addTask(l[k], 0, ""), this.$ = l[k];
          break;
        case 16:
          d.addEvent(l[k].substr(2)), this.$ = l[k];
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, i(t, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: e, 12: o, 14: r, 16: p, 17: c, 18: 14, 19: 15, 20: g, 21: f }, i(t, [2, 7], { 1: [2, 1] }), i(t, [2, 3]), { 9: 18, 11: e, 12: o, 14: r, 16: p, 17: c, 18: 14, 19: 15, 20: g, 21: f }, i(t, [2, 5]), i(t, [2, 6]), i(t, [2, 8]), { 13: [1, 19] }, { 15: [1, 20] }, i(t, [2, 11]), i(t, [2, 12]), i(t, [2, 13]), i(t, [2, 14]), i(t, [2, 15]), i(t, [2, 16]), i(t, [2, 4]), i(t, [2, 9]), i(t, [2, 10])],
    defaultActions: {},
    parseError: /* @__PURE__ */ m(function(n, a) {
      if (a.recoverable)
        this.trace(n);
      else {
        var h = new Error(n);
        throw h.hash = a, h;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m(function(n) {
      var a = this, h = [0], d = [], y = [null], l = [], S = this.table, k = "", $ = 0, C = 0, B = 2, J = 1, O = l.slice.call(arguments, 1), v = Object.create(this.lexer), N = { yy: {} };
      for (var L in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, L) && (N.yy[L] = this.yy[L]);
      v.setInput(n, N.yy), N.yy.lexer = v, N.yy.parser = this, typeof v.yylloc > "u" && (v.yylloc = {});
      var b = v.yylloc;
      l.push(b);
      var M = v.options && v.options.ranges;
      typeof N.yy.parseError == "function" ? this.parseError = N.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function R2(T) {
        h.length = h.length - 2 * T, y.length = y.length - T, l.length = l.length - T;
      }
      m(R2, "popStack");
      function A() {
        var T;
        return T = d.pop() || v.lex() || J, typeof T != "number" && (T instanceof Array && (d = T, T = d.pop()), T = a.symbols_[T] || T), T;
      }
      m(A, "lex");
      for (var w, H, I, K, V = {}, j, P, et2, G; ; ) {
        if (H = h[h.length - 1], this.defaultActions[H] ? I = this.defaultActions[H] : ((w === null || typeof w > "u") && (w = A()), I = S[H] && S[H][w]), typeof I > "u" || !I.length || !I[0]) {
          var Q = "";
          G = [];
          for (j in S[H])
            this.terminals_[j] && j > B && G.push("'" + this.terminals_[j] + "'");
          v.showPosition ? Q = "Parse error on line " + ($ + 1) + `:
` + v.showPosition() + `
Expecting ` + G.join(", ") + ", got '" + (this.terminals_[w] || w) + "'" : Q = "Parse error on line " + ($ + 1) + ": Unexpected " + (w == J ? "end of input" : "'" + (this.terminals_[w] || w) + "'"), this.parseError(Q, {
            text: v.match,
            token: this.terminals_[w] || w,
            line: v.yylineno,
            loc: b,
            expected: G
          });
        }
        if (I[0] instanceof Array && I.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + H + ", token: " + w);
        switch (I[0]) {
          case 1:
            h.push(w), y.push(v.yytext), l.push(v.yylloc), h.push(I[1]), w = null, C = v.yyleng, k = v.yytext, $ = v.yylineno, b = v.yylloc;
            break;
          case 2:
            if (P = this.productions_[I[1]][1], V.$ = y[y.length - P], V._$ = {
              first_line: l[l.length - (P || 1)].first_line,
              last_line: l[l.length - 1].last_line,
              first_column: l[l.length - (P || 1)].first_column,
              last_column: l[l.length - 1].last_column
            }, M && (V._$.range = [
              l[l.length - (P || 1)].range[0],
              l[l.length - 1].range[1]
            ]), K = this.performAction.apply(V, [
              k,
              C,
              $,
              N.yy,
              I[1],
              y,
              l
            ].concat(O)), typeof K < "u")
              return K;
            P && (h = h.slice(0, -1 * P * 2), y = y.slice(0, -1 * P), l = l.slice(0, -1 * P)), h.push(this.productions_[I[1]][0]), y.push(V.$), l.push(V._$), et2 = S[h[h.length - 2]][h[h.length - 1]], h.push(et2);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, x = /* @__PURE__ */ function() {
    var m$1 = {
      EOF: 1,
      parseError: /* @__PURE__ */ m(function(a, h) {
        if (this.yy.parser)
          this.yy.parser.parseError(a, h);
        else
          throw new Error(a);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m(function(n, a) {
        return this.yy = a || this.yy || {}, this._input = n, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m(function() {
        var n = this._input[0];
        this.yytext += n, this.yyleng++, this.offset++, this.match += n, this.matched += n;
        var a = n.match(/(?:\r\n?|\n).*/g);
        return a ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), n;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m(function(n) {
        var a = n.length, h = n.split(/(?:\r\n?|\n)/g);
        this._input = n + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - a), this.offset -= a;
        var d = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), h.length - 1 && (this.yylineno -= h.length - 1);
        var y = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: h ? (h.length === d.length ? this.yylloc.first_column : 0) + d[d.length - h.length].length - h[0].length : this.yylloc.first_column - a
        }, this.options.ranges && (this.yylloc.range = [y[0], y[0] + this.yyleng - a]), this.yyleng = this.yytext.length, this;
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
      less: /* @__PURE__ */ m(function(n) {
        this.unput(this.match.slice(n));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m(function() {
        var n = this.matched.substr(0, this.matched.length - this.match.length);
        return (n.length > 20 ? "..." : "") + n.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m(function() {
        var n = this.match;
        return n.length < 20 && (n += this._input.substr(0, 20 - n.length)), (n.substr(0, 20) + (n.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m(function() {
        var n = this.pastInput(), a = new Array(n.length + 1).join("-");
        return n + this.upcomingInput() + `
` + a + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m(function(n, a) {
        var h, d, y;
        if (this.options.backtrack_lexer && (y = {
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
        }, this.options.ranges && (y.yylloc.range = this.yylloc.range.slice(0))), d = n[0].match(/(?:\r\n?|\n).*/g), d && (this.yylineno += d.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: d ? d[d.length - 1].length - d[d.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + n[0].length
        }, this.yytext += n[0], this.match += n[0], this.matches = n, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(n[0].length), this.matched += n[0], h = this.performAction.call(this, this.yy, this, a, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), h)
          return h;
        if (this._backtrack) {
          for (var l in y)
            this[l] = y[l];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var n, a, h, d;
        this._more || (this.yytext = "", this.match = "");
        for (var y = this._currentRules(), l = 0; l < y.length; l++)
          if (h = this._input.match(this.rules[y[l]]), h && (!a || h[0].length > a[0].length)) {
            if (a = h, d = l, this.options.backtrack_lexer) {
              if (n = this.test_match(h, y[l]), n !== false)
                return n;
              if (this._backtrack) {
                a = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return a ? (n = this.test_match(a, y[d]), n !== false ? n : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ m(function() {
        var a = this.next();
        return a || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ m(function(a) {
        this.conditionStack.push(a);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ m(function() {
        var a = this.conditionStack.length - 1;
        return a > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ m(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ m(function(a) {
        return a = this.conditionStack.length - 1 - Math.abs(a || 0), a >= 0 ? this.conditionStack[a] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ m(function(a) {
        this.begin(a);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ m(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: /* @__PURE__ */ m(function(a, h, d, y) {
        switch (d) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            return 10;
          case 3:
            break;
          case 4:
            break;
          case 5:
            return 4;
          case 6:
            return 11;
          case 7:
            return this.begin("acc_title"), 12;
          case 8:
            return this.popState(), "acc_title_value";
          case 9:
            return this.begin("acc_descr"), 14;
          case 10:
            return this.popState(), "acc_descr_value";
          case 11:
            this.begin("acc_descr_multiline");
            break;
          case 12:
            this.popState();
            break;
          case 13:
            return "acc_descr_multiline_value";
          case 14:
            return 17;
          case 15:
            return 21;
          case 16:
            return 20;
          case 17:
            return 6;
          case 18:
            return "INVALID";
        }
      }, "anonymous"),
      rules: [/^(?:%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:timeline\b)/i, /^(?:title\s[^\n]+)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:section\s[^:\n]+)/i, /^(?::\s(?:[^:\n]|:(?!\s))+)/i, /^(?:[^#:\n]+)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { acc_descr_multiline: { rules: [12, 13], inclusive: false }, acc_descr: { rules: [10], inclusive: false }, acc_title: { rules: [8], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18], inclusive: true } }
    };
    return m$1;
  }();
  u.lexer = x;
  function _() {
    this.yy = {};
  }
  return m(_, "Parser"), _.prototype = u, u.Parser = _, new _();
}();
X.parser = X;
var Tt = X, at = {};
Qv(at, {
  addEvent: () => yt,
  addSection: () => ht,
  addTask: () => ut,
  addTaskOrg: () => gt,
  clear: () => ct,
  default: () => It,
  getCommonDb: () => lt,
  getSections: () => pt,
  getTasks: () => dt
});
var W = "", ot = 0, Y = [], U = [], z = [], lt = /* @__PURE__ */ m(() => Pf, "getCommonDb"), ct = /* @__PURE__ */ m(function() {
  Y.length = 0, U.length = 0, W = "", z.length = 0, M5();
}, "clear"), ht = /* @__PURE__ */ m(function(i) {
  W = i, Y.push(i);
}, "addSection"), pt = /* @__PURE__ */ m(function() {
  return Y;
}, "getSections"), dt = /* @__PURE__ */ m(function() {
  let i = rt();
  const t = 100;
  let e = 0;
  for (; !i && e < t; )
    i = rt(), e++;
  return U.push(...z), U;
}, "getTasks"), ut = /* @__PURE__ */ m(function(i, t, e) {
  const o = {
    id: ot++,
    section: W,
    type: W,
    task: i,
    score: t || 0,
    //if event is defined, then add it the events array
    events: e ? [e] : []
  };
  z.push(o);
}, "addTask"), yt = /* @__PURE__ */ m(function(i) {
  z.find((e) => e.id === ot - 1).events.push(i);
}, "addEvent"), gt = /* @__PURE__ */ m(function(i) {
  const t = {
    section: W,
    type: W,
    description: i,
    task: i,
    classes: []
  };
  U.push(t);
}, "addTaskOrg"), rt = /* @__PURE__ */ m(function() {
  const i = /* @__PURE__ */ m(function(e) {
    return z[e].processed;
  }, "compileTask");
  let t = true;
  for (const [e, o] of z.entries())
    i(e), t = t && o.processed;
  return t;
}, "compileTasks"), It = {
  clear: ct,
  getCommonDb: lt,
  addSection: ht,
  getSections: pt,
  getTasks: dt,
  addTask: ut,
  addTaskOrg: gt,
  addEvent: yt
}, Nt = 12, Z = /* @__PURE__ */ m(function(i, t) {
  const e = i.append("rect");
  return e.attr("x", t.x), e.attr("y", t.y), e.attr("fill", t.fill), e.attr("stroke", t.stroke), e.attr("width", t.width), e.attr("height", t.height), e.attr("rx", t.rx), e.attr("ry", t.ry), t.class !== void 0 && e.attr("class", t.class), e;
}, "drawRect"), Lt = /* @__PURE__ */ m(function(i, t) {
  const o = i.append("circle").attr("cx", t.cx).attr("cy", t.cy).attr("class", "face").attr("r", 15).attr("stroke-width", 2).attr("overflow", "visible"), r = i.append("g");
  r.append("circle").attr("cx", t.cx - 15 / 3).attr("cy", t.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666"), r.append("circle").attr("cx", t.cx + 15 / 3).attr("cy", t.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666");
  function p(f) {
    const u = hn().startAngle(Math.PI / 2).endAngle(3 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    f.append("path").attr("class", "mouth").attr("d", u).attr("transform", "translate(" + t.cx + "," + (t.cy + 2) + ")");
  }
  m(p, "smile");
  function c(f) {
    const u = hn().startAngle(3 * Math.PI / 2).endAngle(5 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    f.append("path").attr("class", "mouth").attr("d", u).attr("transform", "translate(" + t.cx + "," + (t.cy + 7) + ")");
  }
  m(c, "sad");
  function g(f) {
    f.append("line").attr("class", "mouth").attr("stroke", 2).attr("x1", t.cx - 5).attr("y1", t.cy + 7).attr("x2", t.cx + 5).attr("y2", t.cy + 7).attr("class", "mouth").attr("stroke-width", "1px").attr("stroke", "#666");
  }
  return m(g, "ambivalent"), t.score > 3 ? p(r) : t.score < 3 ? c(r) : g(r), o;
}, "drawFace"), $t = /* @__PURE__ */ m(function(i, t) {
  const e = i.append("circle");
  return e.attr("cx", t.cx), e.attr("cy", t.cy), e.attr("class", "actor-" + t.pos), e.attr("fill", t.fill), e.attr("stroke", t.stroke), e.attr("r", t.r), e.class !== void 0 && e.attr("class", e.class), t.title !== void 0 && e.append("title").text(t.title), e;
}, "drawCircle"), mt = /* @__PURE__ */ m(function(i, t) {
  const e = t.text.replace(/<br\s*\/?>/gi, " "), o = i.append("text");
  o.attr("x", t.x), o.attr("y", t.y), o.attr("class", "legend"), o.style("text-anchor", t.anchor), t.class !== void 0 && o.attr("class", t.class);
  const r = o.append("tspan");
  return r.attr("x", t.x + t.textMargin * 2), r.text(e), o;
}, "drawText"), Mt = /* @__PURE__ */ m(function(i, t) {
  function e(r, p, c, g, f) {
    return r + "," + p + " " + (r + c) + "," + p + " " + (r + c) + "," + (p + g - f) + " " + (r + c - f * 1.2) + "," + (p + g) + " " + r + "," + (p + g);
  }
  m(e, "genPoints");
  const o = i.append("polygon");
  o.attr("points", e(t.x, t.y, 50, 20, 7)), o.attr("class", "labelBox"), t.y = t.y + t.labelMargin, t.x = t.x + 0.5 * t.labelMargin, mt(i, t);
}, "drawLabel"), Ht = /* @__PURE__ */ m(function(i, t, e) {
  const o = i.append("g"), r = D();
  r.x = t.x, r.y = t.y, r.fill = t.fill, r.width = e.width, r.height = e.height, r.class = "journey-section section-type-" + t.num, r.rx = 3, r.ry = 3, Z(o, r), ft(e)(
    t.text,
    o,
    r.x,
    r.y,
    r.width,
    r.height,
    { class: "journey-section section-type-" + t.num },
    e,
    t.colour
  );
}, "drawSection"), nt = -1, Pt = /* @__PURE__ */ m(function(i, t, e) {
  const o = t.x + e.width / 2, r = i.append("g");
  nt++;
  const p = 300 + 5 * 30;
  r.append("line").attr("id", "task" + nt).attr("x1", o).attr("y1", t.y).attr("x2", o).attr("y2", p).attr("class", "task-line").attr("stroke-width", "1px").attr("stroke-dasharray", "4 2").attr("stroke", "#666"), Lt(r, {
    cx: o,
    cy: 300 + (5 - t.score) * 30,
    score: t.score
  });
  const c = D();
  c.x = t.x, c.y = t.y, c.fill = t.fill, c.width = e.width, c.height = e.height, c.class = "task task-type-" + t.num, c.rx = 3, c.ry = 3, Z(r, c), ft(e)(
    t.task,
    r,
    c.x,
    c.y,
    c.width,
    c.height,
    { class: "task" },
    e,
    t.colour
  );
}, "drawTask"), At = /* @__PURE__ */ m(function(i, t) {
  Z(i, {
    x: t.startx,
    y: t.starty,
    width: t.stopx - t.startx,
    height: t.stopy - t.starty,
    fill: t.fill,
    class: "rect"
  }).lower();
}, "drawBackgroundRect"), Ct = /* @__PURE__ */ m(function() {
  return {
    x: 0,
    y: 0,
    fill: void 0,
    "text-anchor": "start",
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0
  };
}, "getTextObj"), D = /* @__PURE__ */ m(function() {
  return {
    x: 0,
    y: 0,
    width: 100,
    anchor: "start",
    height: 100,
    rx: 0,
    ry: 0
  };
}, "getNoteRect"), ft = /* @__PURE__ */ function() {
  function i(r, p, c, g, f, u, x, _) {
    const m2 = p.append("text").attr("x", c + f / 2).attr("y", g + u / 2 + 5).style("font-color", _).style("text-anchor", "middle").text(r);
    o(m2, x);
  }
  m(i, "byText");
  function t(r, p, c, g, f, u, x, _, m2) {
    const { taskFontSize: n, taskFontFamily: a } = _, h = r.split(/<br\s*\/?>/gi);
    for (let d = 0; d < h.length; d++) {
      const y = d * n - n * (h.length - 1) / 2, l = p.append("text").attr("x", c + f / 2).attr("y", g).attr("fill", m2).style("text-anchor", "middle").style("font-size", n).style("font-family", a);
      l.append("tspan").attr("x", c + f / 2).attr("dy", y).text(h[d]), l.attr("y", g + u / 2).attr("dominant-baseline", "central").attr("alignment-baseline", "central"), o(l, x);
    }
  }
  m(t, "byTspan");
  function e(r, p, c, g, f, u, x, _) {
    const m2 = p.append("switch"), a = m2.append("foreignObject").attr("x", c).attr("y", g).attr("width", f).attr("height", u).attr("position", "fixed").append("xhtml:div").style("display", "table").style("height", "100%").style("width", "100%");
    a.append("div").attr("class", "label").style("display", "table-cell").style("text-align", "center").style("vertical-align", "middle").text(r), t(r, m2, c, g, f, u, x, _), o(a, x);
  }
  m(e, "byFo");
  function o(r, p) {
    for (const c in p)
      c in p && r.attr(c, p[c]);
  }
  return m(o, "_setTextAttrs"), function(r) {
    return r.textPlacement === "fo" ? e : r.textPlacement === "old" ? i : t;
  };
}(), Rt = /* @__PURE__ */ m(function(i) {
  i.append("defs").append("marker").attr("id", "arrowhead").attr("refX", 5).attr("refY", 2).attr("markerWidth", 6).attr("markerHeight", 4).attr("orient", "auto").append("path").attr("d", "M 0,0 V 4 L6,2 Z");
}, "initGraphics");
function tt(i, t) {
  i.each(function() {
    var e = gt$1(this), o = e.text().split(/(\s+|<br>)/).reverse(), r, p = [], c = 1.1, g = e.attr("y"), f = parseFloat(e.attr("dy")), u = e.text(null).append("tspan").attr("x", 0).attr("y", g).attr("dy", f + "em");
    for (let x = 0; x < o.length; x++)
      r = o[o.length - 1 - x], p.push(r), u.text(p.join(" ").trim()), (u.node().getComputedTextLength() > t || r === "<br>") && (p.pop(), u.text(p.join(" ").trim()), r === "<br>" ? p = [""] : p = [r], u = e.append("tspan").attr("x", 0).attr("y", g).attr("dy", c + "em").text(r));
  });
}
m(tt, "wrap");
var Ft = /* @__PURE__ */ m(function(i, t, e, o) {
  var _;
  const r = e % Nt - 1, p = i.append("g");
  t.section = r, p.attr(
    "class",
    (t.class ? t.class + " " : "") + "timeline-node " + ("section-" + r)
  );
  const c = p.append("g"), g = p.append("g"), u = g.append("text").text(t.descr).attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle").call(tt, t.width).node().getBBox(), x = (_ = o.fontSize) != null && _.replace ? o.fontSize.replace("px", "") : o.fontSize;
  return t.height = u.height + x * 1.1 * 0.5 + t.padding, t.height = Math.max(t.height, t.maxHeight), t.width = t.width + 2 * t.padding, g.attr("transform", "translate(" + t.width / 2 + ", " + t.padding / 2 + ")"), Wt(c, t, r, o), t;
}, "drawNode"), Vt = /* @__PURE__ */ m(function(i, t, e) {
  var g;
  const o = i.append("g"), p = o.append("text").text(t.descr).attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle").call(tt, t.width).node().getBBox(), c = (g = e.fontSize) != null && g.replace ? e.fontSize.replace("px", "") : e.fontSize;
  return o.remove(), p.height + c * 1.1 * 0.5 + t.padding;
}, "getVirtualNodeHeight"), Wt = /* @__PURE__ */ m(function(i, t, e) {
  i.append("path").attr("id", "node-" + t.id).attr("class", "node-bkg node-" + t.type).attr(
    "d",
    `M0 ${t.height - 5} v${-t.height + 2 * 5} q0,-5 5,-5 h${t.width - 2 * 5} q5,0 5,5 v${t.height - 5} H0 Z`
  ), i.append("line").attr("class", "node-line-" + e).attr("x1", 0).attr("y1", t.height).attr("x2", t.width).attr("y2", t.height);
}, "defaultBkg"), F = {
  drawRect: Z,
  drawCircle: $t,
  drawSection: Ht,
  drawText: mt,
  drawLabel: Mt,
  drawTask: Pt,
  drawBackgroundRect: At,
  getTextObj: Ct,
  getNoteRect: D,
  initGraphics: Rt,
  drawNode: Ft,
  getVirtualNodeHeight: Vt
}, zt = /* @__PURE__ */ m(function(i, t, e, o) {
  var O, v, N;
  const r = yt$1(), p = ((O = r.timeline) == null ? void 0 : O.leftMargin) ?? 50;
  R.debug("timeline", o.db);
  const c = r.securityLevel;
  let g;
  c === "sandbox" && (g = gt$1("#i" + t));
  const u = (c === "sandbox" ? gt$1(g.nodes()[0].contentDocument.body) : gt$1("body")).select("#" + t);
  u.append("g");
  const x = o.db.getTasks(), _ = o.db.getCommonDb().getDiagramTitle();
  R.debug("task", x), F.initGraphics(u);
  const m2 = o.db.getSections();
  R.debug("sections", m2);
  let n = 0, a = 0, h = 0, d = 0, y = 50 + p, l = 50;
  d = 50;
  let S = 0, k = true;
  m2.forEach(function(L) {
    const b = {
      number: S,
      descr: L,
      section: S,
      width: 150,
      padding: 20,
      maxHeight: n
    }, M = F.getVirtualNodeHeight(u, b, r);
    R.debug("sectionHeight before draw", M), n = Math.max(n, M + 20);
  });
  let $ = 0, C = 0;
  R.debug("tasks.length", x.length);
  for (const [L, b] of x.entries()) {
    const M = {
      number: L,
      descr: b,
      section: b.section,
      width: 150,
      padding: 20,
      maxHeight: a
    }, R$1 = F.getVirtualNodeHeight(u, M, r);
    R.debug("taskHeight before draw", R$1), a = Math.max(a, R$1 + 20), $ = Math.max($, b.events.length);
    let A = 0;
    for (const w of b.events) {
      const H = {
        descr: w,
        section: b.section,
        number: b.section,
        width: 150,
        padding: 20,
        maxHeight: 50
      };
      A += F.getVirtualNodeHeight(u, H, r);
    }
    b.events.length > 0 && (A += (b.events.length - 1) * 10), C = Math.max(C, A);
  }
  R.debug("maxSectionHeight before draw", n), R.debug("maxTaskHeight before draw", a), m2 && m2.length > 0 ? m2.forEach((L) => {
    const b = x.filter((w) => w.section === L), M = {
      number: S,
      descr: L,
      section: S,
      width: 200 * Math.max(b.length, 1) - 50,
      padding: 20,
      maxHeight: n
    };
    R.debug("sectionNode", M);
    const R$1 = u.append("g"), A = F.drawNode(R$1, M, S, r);
    R.debug("sectionNode output", A), R$1.attr("transform", `translate(${y}, ${d})`), l += n + 50, b.length > 0 && st(
      u,
      b,
      S,
      y,
      l,
      a,
      r,
      $,
      C,
      n,
      false
    ), y += 200 * Math.max(b.length, 1), l = d, S++;
  }) : (k = false, st(
    u,
    x,
    S,
    y,
    l,
    a,
    r,
    $,
    C,
    n,
    true
  ));
  const B = u.node().getBBox();
  R.debug("bounds", B), _ && u.append("text").text(_).attr("x", B.width / 2 - p).attr("font-size", "4ex").attr("font-weight", "bold").attr("y", 20), h = k ? n + a + 150 : a + 100, u.append("g").attr("class", "lineWrapper").append("line").attr("x1", p).attr("y1", h).attr("x2", B.width + 3 * p).attr("y2", h).attr("stroke-width", 4).attr("stroke", "black").attr("marker-end", "url(#arrowhead)"), T5(
    void 0,
    u,
    ((v = r.timeline) == null ? void 0 : v.padding) ?? 50,
    ((N = r.timeline) == null ? void 0 : N.useMaxWidth) ?? false
  );
}, "draw"), st = /* @__PURE__ */ m(function(i, t, e, o, r, p, c, g, f, u, x) {
  var _;
  for (const m2 of t) {
    const n = {
      descr: m2.task,
      section: e,
      number: e,
      width: 150,
      padding: 20,
      maxHeight: p
    };
    R.debug("taskNode", n);
    const a = i.append("g").attr("class", "taskWrapper"), d = F.drawNode(a, n, e, c).height;
    if (R.debug("taskHeight after draw", d), a.attr("transform", `translate(${o}, ${r})`), p = Math.max(p, d), m2.events) {
      const y = i.append("g").attr("class", "lineWrapper");
      let l = p;
      r += 100, l = l + Bt(i, m2.events, e, o, r, c), r -= 100, y.append("line").attr("x1", o + 190 / 2).attr("y1", r + p).attr("x2", o + 190 / 2).attr("y2", r + p + 100 + f + 100).attr("stroke-width", 2).attr("stroke", "black").attr("marker-end", "url(#arrowhead)").attr("stroke-dasharray", "5,5");
    }
    o = o + 200, x && !((_ = c.timeline) != null && _.disableMulticolor) && e++;
  }
  r = r - 10;
}, "drawTasks"), Bt = /* @__PURE__ */ m(function(i, t, e, o, r, p) {
  let c = 0;
  const g = r;
  r = r + 100;
  for (const f of t) {
    const u = {
      descr: f,
      section: e,
      number: e,
      width: 150,
      padding: 20,
      maxHeight: 50
    };
    R.debug("eventNode", u);
    const x = i.append("g").attr("class", "eventWrapper"), m2 = F.drawNode(x, u, e, p).height;
    c = c + m2, x.attr("transform", `translate(${o}, ${r})`), r = r + 10 + m2;
  }
  return r = g, c;
}, "drawEvents"), Ot = {
  setConf: /* @__PURE__ */ m(() => {
  }, "setConf"),
  draw: zt
}, jt = /* @__PURE__ */ m((i) => {
  let t = "";
  for (let e = 0; e < i.THEME_COLOR_LIMIT; e++)
    i["lineColor" + e] = i["lineColor" + e] || i["cScaleInv" + e], Kn(i["lineColor" + e]) ? i["lineColor" + e] = Y$1(i["lineColor" + e], 20) : i["lineColor" + e] = et(i["lineColor" + e], 20);
  for (let e = 0; e < i.THEME_COLOR_LIMIT; e++) {
    const o = "" + (17 - 3 * e);
    t += `
    .section-${e - 1} rect, .section-${e - 1} path, .section-${e - 1} circle, .section-${e - 1} path  {
      fill: ${i["cScale" + e]};
    }
    .section-${e - 1} text {
     fill: ${i["cScaleLabel" + e]};
    }
    .node-icon-${e - 1} {
      font-size: 40px;
      color: ${i["cScaleLabel" + e]};
    }
    .section-edge-${e - 1}{
      stroke: ${i["cScale" + e]};
    }
    .edge-depth-${e - 1}{
      stroke-width: ${o};
    }
    .section-${e - 1} line {
      stroke: ${i["cScaleInv" + e]} ;
      stroke-width: 3;
    }

    .lineWrapper line{
      stroke: ${i["cScaleLabel" + e]} ;
    }

    .disabled, .disabled circle, .disabled text {
      fill: lightgray;
    }
    .disabled text {
      fill: #efefef;
    }
    `;
  }
  return t;
}, "genSections"), Gt = /* @__PURE__ */ m((i) => `
  .edge {
    stroke-width: 3;
  }
  ${jt(i)}
  .section-root rect, .section-root path, .section-root circle  {
    fill: ${i.git0};
  }
  .section-root text {
    fill: ${i.gitBranchLabel0};
  }
  .icon-container {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edge {
    fill: none;
  }
  .eventWrapper  {
   filter: brightness(120%);
  }
`, "getStyles"), qt = Gt, gi = {
  db: at,
  renderer: Ot,
  parser: Tt,
  styles: qt
};
export {
  gi as diagram
};
