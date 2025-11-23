import { o, g, y, d } from "./chunk-TZMSLE5B-ee953cb1-f43091ee.js";
import { l } from "./chunk-FMBD7UC4-5bdb4c19-2389c3a5.js";
import { H as m, O as yt, ak as k5, al as _5, a7 as b5, a8 as x5, aa as y5, a9 as w5, ar as m5, a6 as gt, ah as Of } from "./app-254b8ee7.js";
import { h as hn } from "./arc-2bd2d84c-8ea256e4.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
var U = function() {
  var t = /* @__PURE__ */ m(function(h, i, a, o2) {
    for (a = a || {}, o2 = h.length; o2--; a[h[o2]] = i)
      ;
    return a;
  }, "o"), e = [6, 8, 10, 11, 12, 14, 16, 17, 18], s = [1, 9], c = [1, 10], r = [1, 11], y2 = [1, 12], u = [1, 13], d2 = [1, 14], m$1 = {
    trace: /* @__PURE__ */ m(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, journey: 4, document: 5, EOF: 6, line: 7, SPACE: 8, statement: 9, NEWLINE: 10, title: 11, acc_title: 12, acc_title_value: 13, acc_descr: 14, acc_descr_value: 15, acc_descr_multiline_value: 16, section: 17, taskName: 18, taskData: 19, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "journey", 6: "EOF", 8: "SPACE", 10: "NEWLINE", 11: "title", 12: "acc_title", 13: "acc_title_value", 14: "acc_descr", 15: "acc_descr_value", 16: "acc_descr_multiline_value", 17: "section", 18: "taskName", 19: "taskData" },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [9, 1], [9, 2], [9, 2], [9, 1], [9, 1], [9, 2]],
    performAction: /* @__PURE__ */ m(function(i, a, o2, p, f, l2, b) {
      var k = l2.length - 1;
      switch (f) {
        case 1:
          return l2[k - 1];
        case 2:
          this.$ = [];
          break;
        case 3:
          l2[k - 1].push(l2[k]), this.$ = l2[k - 1];
          break;
        case 4:
        case 5:
          this.$ = l2[k];
          break;
        case 6:
        case 7:
          this.$ = [];
          break;
        case 8:
          p.setDiagramTitle(l2[k].substr(6)), this.$ = l2[k].substr(6);
          break;
        case 9:
          this.$ = l2[k].trim(), p.setAccTitle(this.$);
          break;
        case 10:
        case 11:
          this.$ = l2[k].trim(), p.setAccDescription(this.$);
          break;
        case 12:
          p.addSection(l2[k].substr(8)), this.$ = l2[k].substr(8);
          break;
        case 13:
          p.addTask(l2[k - 1], l2[k]), this.$ = "task";
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, t(e, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: s, 12: c, 14: r, 16: y2, 17: u, 18: d2 }, t(e, [2, 7], { 1: [2, 1] }), t(e, [2, 3]), { 9: 15, 11: s, 12: c, 14: r, 16: y2, 17: u, 18: d2 }, t(e, [2, 5]), t(e, [2, 6]), t(e, [2, 8]), { 13: [1, 16] }, { 15: [1, 17] }, t(e, [2, 11]), t(e, [2, 12]), { 19: [1, 18] }, t(e, [2, 4]), t(e, [2, 9]), t(e, [2, 10]), t(e, [2, 13])],
    defaultActions: {},
    parseError: /* @__PURE__ */ m(function(i, a) {
      if (a.recoverable)
        this.trace(i);
      else {
        var o2 = new Error(i);
        throw o2.hash = a, o2;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m(function(i) {
      var a = this, o2 = [0], p = [], f = [null], l2 = [], b = this.table, k = "", C = 0, K = 0, pt = 2, Q = 1, dt = l2.slice.call(arguments, 1), _ = Object.create(this.lexer), I = { yy: {} };
      for (var O in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, O) && (I.yy[O] = this.yy[O]);
      _.setInput(i, I.yy), I.yy.lexer = _, I.yy.parser = this, typeof _.yylloc > "u" && (_.yylloc = {});
      var Y = _.yylloc;
      l2.push(Y);
      var yt2 = _.options && _.options.ranges;
      typeof I.yy.parseError == "function" ? this.parseError = I.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function ft(w) {
        o2.length = o2.length - 2 * w, f.length = f.length - w, l2.length = l2.length - w;
      }
      m(ft, "popStack");
      function D() {
        var w;
        return w = p.pop() || _.lex() || Q, typeof w != "number" && (w instanceof Array && (p = w, w = p.pop()), w = a.symbols_[w] || w), w;
      }
      m(D, "lex");
      for (var v, A, T, q, F = {}, N, M, tt, z; ; ) {
        if (A = o2[o2.length - 1], this.defaultActions[A] ? T = this.defaultActions[A] : ((v === null || typeof v > "u") && (v = D()), T = b[A] && b[A][v]), typeof T > "u" || !T.length || !T[0]) {
          var X = "";
          z = [];
          for (N in b[A])
            this.terminals_[N] && N > pt && z.push("'" + this.terminals_[N] + "'");
          _.showPosition ? X = "Parse error on line " + (C + 1) + `:
` + _.showPosition() + `
Expecting ` + z.join(", ") + ", got '" + (this.terminals_[v] || v) + "'" : X = "Parse error on line " + (C + 1) + ": Unexpected " + (v == Q ? "end of input" : "'" + (this.terminals_[v] || v) + "'"), this.parseError(X, {
            text: _.match,
            token: this.terminals_[v] || v,
            line: _.yylineno,
            loc: Y,
            expected: z
          });
        }
        if (T[0] instanceof Array && T.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + A + ", token: " + v);
        switch (T[0]) {
          case 1:
            o2.push(v), f.push(_.yytext), l2.push(_.yylloc), o2.push(T[1]), v = null, K = _.yyleng, k = _.yytext, C = _.yylineno, Y = _.yylloc;
            break;
          case 2:
            if (M = this.productions_[T[1]][1], F.$ = f[f.length - M], F._$ = {
              first_line: l2[l2.length - (M || 1)].first_line,
              last_line: l2[l2.length - 1].last_line,
              first_column: l2[l2.length - (M || 1)].first_column,
              last_column: l2[l2.length - 1].last_column
            }, yt2 && (F._$.range = [
              l2[l2.length - (M || 1)].range[0],
              l2[l2.length - 1].range[1]
            ]), q = this.performAction.apply(F, [
              k,
              K,
              C,
              I.yy,
              T[1],
              f,
              l2
            ].concat(dt)), typeof q < "u")
              return q;
            M && (o2 = o2.slice(0, -1 * M * 2), f = f.slice(0, -1 * M), l2 = l2.slice(0, -1 * M)), o2.push(this.productions_[T[1]][0]), f.push(F.$), l2.push(F._$), tt = b[o2[o2.length - 2]][o2[o2.length - 1]], o2.push(tt);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, g2 = /* @__PURE__ */ function() {
    var h = {
      EOF: 1,
      parseError: /* @__PURE__ */ m(function(a, o2) {
        if (this.yy.parser)
          this.yy.parser.parseError(a, o2);
        else
          throw new Error(a);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m(function(i, a) {
        return this.yy = a || this.yy || {}, this._input = i, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m(function() {
        var i = this._input[0];
        this.yytext += i, this.yyleng++, this.offset++, this.match += i, this.matched += i;
        var a = i.match(/(?:\r\n?|\n).*/g);
        return a ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), i;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m(function(i) {
        var a = i.length, o2 = i.split(/(?:\r\n?|\n)/g);
        this._input = i + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - a), this.offset -= a;
        var p = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), o2.length - 1 && (this.yylineno -= o2.length - 1);
        var f = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: o2 ? (o2.length === p.length ? this.yylloc.first_column : 0) + p[p.length - o2.length].length - o2[0].length : this.yylloc.first_column - a
        }, this.options.ranges && (this.yylloc.range = [f[0], f[0] + this.yyleng - a]), this.yyleng = this.yytext.length, this;
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
      less: /* @__PURE__ */ m(function(i) {
        this.unput(this.match.slice(i));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m(function() {
        var i = this.matched.substr(0, this.matched.length - this.match.length);
        return (i.length > 20 ? "..." : "") + i.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m(function() {
        var i = this.match;
        return i.length < 20 && (i += this._input.substr(0, 20 - i.length)), (i.substr(0, 20) + (i.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m(function() {
        var i = this.pastInput(), a = new Array(i.length + 1).join("-");
        return i + this.upcomingInput() + `
` + a + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m(function(i, a) {
        var o2, p, f;
        if (this.options.backtrack_lexer && (f = {
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
        }, this.options.ranges && (f.yylloc.range = this.yylloc.range.slice(0))), p = i[0].match(/(?:\r\n?|\n).*/g), p && (this.yylineno += p.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: p ? p[p.length - 1].length - p[p.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + i[0].length
        }, this.yytext += i[0], this.match += i[0], this.matches = i, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(i[0].length), this.matched += i[0], o2 = this.performAction.call(this, this.yy, this, a, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), o2)
          return o2;
        if (this._backtrack) {
          for (var l2 in f)
            this[l2] = f[l2];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var i, a, o2, p;
        this._more || (this.yytext = "", this.match = "");
        for (var f = this._currentRules(), l2 = 0; l2 < f.length; l2++)
          if (o2 = this._input.match(this.rules[f[l2]]), o2 && (!a || o2[0].length > a[0].length)) {
            if (a = o2, p = l2, this.options.backtrack_lexer) {
              if (i = this.test_match(o2, f[l2]), i !== false)
                return i;
              if (this._backtrack) {
                a = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return a ? (i = this.test_match(a, f[p]), i !== false ? i : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
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
      performAction: /* @__PURE__ */ m(function(a, o2, p, f) {
        switch (p) {
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
            return 18;
          case 16:
            return 19;
          case 17:
            return ":";
          case 18:
            return 6;
          case 19:
            return "INVALID";
        }
      }, "anonymous"),
      rules: [/^(?:%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:journey\b)/i, /^(?:title\s[^#\n;]+)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:section\s[^#:\n;]+)/i, /^(?:[^#:\n;]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { acc_descr_multiline: { rules: [12, 13], inclusive: false }, acc_descr: { rules: [10], inclusive: false }, acc_title: { rules: [8], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 19], inclusive: true } }
    };
    return h;
  }();
  m$1.lexer = g2;
  function x() {
    this.yy = {};
  }
  return m(x, "Parser"), x.prototype = m$1, m$1.Parser = x, new x();
}();
U.parser = U;
var Et = U, V = "", Z = [], L = [], B = [], Ct = /* @__PURE__ */ m(function() {
  Z.length = 0, L.length = 0, V = "", B.length = 0, m5();
}, "clear"), Pt = /* @__PURE__ */ m(function(t) {
  V = t, Z.push(t);
}, "addSection"), It = /* @__PURE__ */ m(function() {
  return Z;
}, "getSections"), At = /* @__PURE__ */ m(function() {
  let t = it();
  const e = 100;
  let s = 0;
  for (; !t && s < e; )
    t = it(), s++;
  return L.push(...B), L;
}, "getTasks"), Ft = /* @__PURE__ */ m(function() {
  const t = [];
  return L.forEach((s) => {
    s.people && t.push(...s.people);
  }), [...new Set(t)].sort();
}, "updateActors"), Vt = /* @__PURE__ */ m(function(t, e) {
  const s = e.substr(1).split(":");
  let c = 0, r = [];
  s.length === 1 ? (c = Number(s[0]), r = []) : (c = Number(s[0]), r = s[1].split(","));
  const y2 = r.map((d2) => d2.trim()), u = {
    section: V,
    type: V,
    people: y2,
    task: t,
    score: c
  };
  B.push(u);
}, "addTask"), Rt = /* @__PURE__ */ m(function(t) {
  const e = {
    section: V,
    type: V,
    description: t,
    task: t,
    classes: []
  };
  L.push(e);
}, "addTaskOrg"), it = /* @__PURE__ */ m(function() {
  const t = /* @__PURE__ */ m(function(s) {
    return B[s].processed;
  }, "compileTask");
  let e = true;
  for (const [s, c] of B.entries())
    t(s), e = e && c.processed;
  return e;
}, "compileTasks"), Lt = /* @__PURE__ */ m(function() {
  return Ft();
}, "getActors"), rt = {
  getConfig: /* @__PURE__ */ m(() => yt().journey, "getConfig"),
  clear: Ct,
  setDiagramTitle: k5,
  getDiagramTitle: _5,
  setAccTitle: b5,
  getAccTitle: x5,
  setAccDescription: y5,
  getAccDescription: w5,
  addSection: Pt,
  getSections: It,
  getTasks: At,
  addTask: Vt,
  addTaskOrg: Rt,
  getActors: Lt
}, Bt = /* @__PURE__ */ m((t) => `.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor ? `fill: ${t.faceColor}` : "fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0 ? `fill: ${t.fillType0}` : ""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0 ? `fill: ${t.fillType1}` : ""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0 ? `fill: ${t.fillType2}` : ""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0 ? `fill: ${t.fillType3}` : ""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0 ? `fill: ${t.fillType4}` : ""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0 ? `fill: ${t.fillType5}` : ""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0 ? `fill: ${t.fillType6}` : ""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0 ? `fill: ${t.fillType7}` : ""};
  }

  .actor-0 {
    ${t.actor0 ? `fill: ${t.actor0}` : ""};
  }
  .actor-1 {
    ${t.actor1 ? `fill: ${t.actor1}` : ""};
  }
  .actor-2 {
    ${t.actor2 ? `fill: ${t.actor2}` : ""};
  }
  .actor-3 {
    ${t.actor3 ? `fill: ${t.actor3}` : ""};
  }
  .actor-4 {
    ${t.actor4 ? `fill: ${t.actor4}` : ""};
  }
  .actor-5 {
    ${t.actor5 ? `fill: ${t.actor5}` : ""};
  }
  ${l()}
`, "getStyles"), jt = Bt, J = /* @__PURE__ */ m(function(t, e) {
  return o(t, e);
}, "drawRect"), Nt = /* @__PURE__ */ m(function(t, e) {
  const c = t.append("circle").attr("cx", e.cx).attr("cy", e.cy).attr("class", "face").attr("r", 15).attr("stroke-width", 2).attr("overflow", "visible"), r = t.append("g");
  r.append("circle").attr("cx", e.cx - 15 / 3).attr("cy", e.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666"), r.append("circle").attr("cx", e.cx + 15 / 3).attr("cy", e.cy - 15 / 3).attr("r", 1.5).attr("stroke-width", 2).attr("fill", "#666").attr("stroke", "#666");
  function y2(m2) {
    const g2 = hn().startAngle(Math.PI / 2).endAngle(3 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    m2.append("path").attr("class", "mouth").attr("d", g2).attr("transform", "translate(" + e.cx + "," + (e.cy + 2) + ")");
  }
  m(y2, "smile");
  function u(m2) {
    const g2 = hn().startAngle(3 * Math.PI / 2).endAngle(5 * (Math.PI / 2)).innerRadius(7.5).outerRadius(6.8181818181818175);
    m2.append("path").attr("class", "mouth").attr("d", g2).attr("transform", "translate(" + e.cx + "," + (e.cy + 7) + ")");
  }
  m(u, "sad");
  function d2(m2) {
    m2.append("line").attr("class", "mouth").attr("stroke", 2).attr("x1", e.cx - 5).attr("y1", e.cy + 7).attr("x2", e.cx + 5).attr("y2", e.cy + 7).attr("class", "mouth").attr("stroke-width", "1px").attr("stroke", "#666");
  }
  return m(d2, "ambivalent"), e.score > 3 ? y2(r) : e.score < 3 ? u(r) : d2(r), c;
}, "drawFace"), lt = /* @__PURE__ */ m(function(t, e) {
  const s = t.append("circle");
  return s.attr("cx", e.cx), s.attr("cy", e.cy), s.attr("class", "actor-" + e.pos), s.attr("fill", e.fill), s.attr("stroke", e.stroke), s.attr("r", e.r), s.class !== void 0 && s.attr("class", s.class), e.title !== void 0 && s.append("title").text(e.title), s;
}, "drawCircle"), ct = /* @__PURE__ */ m(function(t, e) {
  return g(t, e);
}, "drawText"), zt = /* @__PURE__ */ m(function(t, e) {
  function s(r, y2, u, d2, m2) {
    return r + "," + y2 + " " + (r + u) + "," + y2 + " " + (r + u) + "," + (y2 + d2 - m2) + " " + (r + u - m2 * 1.2) + "," + (y2 + d2) + " " + r + "," + (y2 + d2);
  }
  m(s, "genPoints");
  const c = t.append("polygon");
  c.attr("points", s(e.x, e.y, 50, 20, 7)), c.attr("class", "labelBox"), e.y = e.y + e.labelMargin, e.x = e.x + 0.5 * e.labelMargin, ct(t, e);
}, "drawLabel"), Wt = /* @__PURE__ */ m(function(t, e, s) {
  const c = t.append("g"), r = y();
  r.x = e.x, r.y = e.y, r.fill = e.fill, r.width = s.width * e.taskCount + // width of the tasks
  s.diagramMarginX * (e.taskCount - 1), r.height = s.height, r.class = "journey-section section-type-" + e.num, r.rx = 3, r.ry = 3, J(c, r), ht(s)(
    e.text,
    c,
    r.x,
    r.y,
    r.width,
    r.height,
    { class: "journey-section section-type-" + e.num },
    s,
    e.colour
  );
}, "drawSection"), nt = -1, Ot = /* @__PURE__ */ m(function(t, e, s) {
  const c = e.x + s.width / 2, r = t.append("g");
  nt++;
  const y$1 = 300 + 5 * 30;
  r.append("line").attr("id", "task" + nt).attr("x1", c).attr("y1", e.y).attr("x2", c).attr("y2", y$1).attr("class", "task-line").attr("stroke-width", "1px").attr("stroke-dasharray", "4 2").attr("stroke", "#666"), Nt(r, {
    cx: c,
    cy: 300 + (5 - e.score) * 30,
    score: e.score
  });
  const u = y();
  u.x = e.x, u.y = e.y, u.fill = e.fill, u.width = s.width, u.height = s.height, u.class = "task task-type-" + e.num, u.rx = 3, u.ry = 3, J(r, u);
  let d2 = e.x + 14;
  e.people.forEach((m2) => {
    const g2 = e.actors[m2].color, x = {
      cx: d2,
      cy: e.y,
      r: 7,
      fill: g2,
      stroke: "#000",
      title: m2,
      pos: e.actors[m2].position
    };
    lt(r, x), d2 += 10;
  }), ht(s)(
    e.task,
    r,
    u.x,
    u.y,
    u.width,
    u.height,
    { class: "task" },
    s,
    e.colour
  );
}, "drawTask"), Yt = /* @__PURE__ */ m(function(t, e) {
  d(t, e);
}, "drawBackgroundRect"), ht = /* @__PURE__ */ function() {
  function t(r, y2, u, d2, m2, g2, x, h) {
    const i = y2.append("text").attr("x", u + m2 / 2).attr("y", d2 + g2 / 2 + 5).style("font-color", h).style("text-anchor", "middle").text(r);
    c(i, x);
  }
  m(t, "byText");
  function e(r, y2, u, d2, m2, g2, x, h, i) {
    const { taskFontSize: a, taskFontFamily: o2 } = h, p = r.split(/<br\s*\/?>/gi);
    for (let f = 0; f < p.length; f++) {
      const l2 = f * a - a * (p.length - 1) / 2, b = y2.append("text").attr("x", u + m2 / 2).attr("y", d2).attr("fill", i).style("text-anchor", "middle").style("font-size", a).style("font-family", o2);
      b.append("tspan").attr("x", u + m2 / 2).attr("dy", l2).text(p[f]), b.attr("y", d2 + g2 / 2).attr("dominant-baseline", "central").attr("alignment-baseline", "central"), c(b, x);
    }
  }
  m(e, "byTspan");
  function s(r, y2, u, d2, m2, g2, x, h) {
    const i = y2.append("switch"), o2 = i.append("foreignObject").attr("x", u).attr("y", d2).attr("width", m2).attr("height", g2).attr("position", "fixed").append("xhtml:div").style("display", "table").style("height", "100%").style("width", "100%");
    o2.append("div").attr("class", "label").style("display", "table-cell").style("text-align", "center").style("vertical-align", "middle").text(r), e(r, i, u, d2, m2, g2, x, h), c(o2, x);
  }
  m(s, "byFo");
  function c(r, y2) {
    for (const u in y2)
      u in y2 && r.attr(u, y2[u]);
  }
  return m(c, "_setTextAttrs"), function(r) {
    return r.textPlacement === "fo" ? s : r.textPlacement === "old" ? t : e;
  };
}(), qt = /* @__PURE__ */ m(function(t) {
  t.append("defs").append("marker").attr("id", "arrowhead").attr("refX", 5).attr("refY", 2).attr("markerWidth", 6).attr("markerHeight", 4).attr("orient", "auto").append("path").attr("d", "M 0,0 V 4 L6,2 Z");
}, "initGraphics"), j = {
  drawRect: J,
  drawCircle: lt,
  drawSection: Wt,
  drawText: ct,
  drawLabel: zt,
  drawTask: Ot,
  drawBackgroundRect: Yt,
  initGraphics: qt
}, Xt = /* @__PURE__ */ m(function(t) {
  Object.keys(t).forEach(function(s) {
    $[s] = t[s];
  });
}, "setConf"), E = {}, W = 0;
function ut(t) {
  const e = yt().journey, s = e.maxLabelWidth;
  W = 0;
  let c = 60;
  Object.keys(E).forEach((r) => {
    const y2 = E[r].color, u = {
      cx: 20,
      cy: c,
      r: 7,
      fill: y2,
      stroke: "#000",
      pos: E[r].position
    };
    j.drawCircle(t, u);
    let d2 = t.append("text").attr("visibility", "hidden").text(r);
    const m2 = d2.node().getBoundingClientRect().width;
    d2.remove();
    let g2 = [];
    if (m2 <= s)
      g2 = [r];
    else {
      const x = r.split(" ");
      let h = "";
      d2 = t.append("text").attr("visibility", "hidden"), x.forEach((i) => {
        const a = h ? `${h} ${i}` : i;
        if (d2.text(a), d2.node().getBoundingClientRect().width > s) {
          if (h && g2.push(h), h = i, d2.text(i), d2.node().getBoundingClientRect().width > s) {
            let p = "";
            for (const f of i)
              p += f, d2.text(p + "-"), d2.node().getBoundingClientRect().width > s && (g2.push(p.slice(0, -1) + "-"), p = f);
            h = p;
          }
        } else
          h = a;
      }), h && g2.push(h), d2.remove();
    }
    g2.forEach((x, h) => {
      const i = {
        x: 40,
        y: c + 7 + h * 20,
        fill: "#666",
        text: x,
        textMargin: e.boxTextMargin ?? 5
      }, o2 = j.drawText(t, i).node().getBoundingClientRect().width;
      o2 > W && o2 > e.leftMargin - o2 && (W = o2);
    }), c += Math.max(20, g2.length * 20);
  });
}
m(ut, "drawActorLegend");
var $ = yt().journey, P = 0, Gt = /* @__PURE__ */ m(function(t, e, s, c) {
  const r = yt(), y2 = r.journey.titleColor, u = r.journey.titleFontSize, d2 = r.journey.titleFontFamily, m2 = r.securityLevel;
  let g2;
  m2 === "sandbox" && (g2 = gt("#i" + e));
  const x = m2 === "sandbox" ? gt(g2.nodes()[0].contentDocument.body) : gt("body");
  S.init();
  const h = x.select("#" + e);
  j.initGraphics(h);
  const i = c.db.getTasks(), a = c.db.getDiagramTitle(), o2 = c.db.getActors();
  for (const C in E)
    delete E[C];
  let p = 0;
  o2.forEach((C) => {
    E[C] = {
      color: $.actorColours[p % $.actorColours.length],
      position: p
    }, p++;
  }), ut(h), P = $.leftMargin + W, S.insert(0, 0, P, Object.keys(E).length * 50), Ht(h, i, 0);
  const f = S.getBounds();
  a && h.append("text").text(a).attr("x", P).attr("font-size", u).attr("font-weight", "bold").attr("y", 25).attr("fill", y2).attr("font-family", d2);
  const l2 = f.stopy - f.starty + 2 * $.diagramMarginY, b = P + f.stopx + 2 * $.diagramMarginX;
  Of(h, l2, b, $.useMaxWidth), h.append("line").attr("x1", P).attr("y1", $.height * 4).attr("x2", b - P - 4).attr("y2", $.height * 4).attr("stroke-width", 4).attr("stroke", "black").attr("marker-end", "url(#arrowhead)");
  const k = a ? 70 : 0;
  h.attr("viewBox", `${f.startx} -25 ${b} ${l2 + k}`), h.attr("preserveAspectRatio", "xMinYMin meet"), h.attr("height", l2 + k + 25);
}, "draw"), S = {
  data: {
    startx: void 0,
    stopx: void 0,
    starty: void 0,
    stopy: void 0
  },
  verticalPos: 0,
  sequenceItems: [],
  init: /* @__PURE__ */ m(function() {
    this.sequenceItems = [], this.data = {
      startx: void 0,
      stopx: void 0,
      starty: void 0,
      stopy: void 0
    }, this.verticalPos = 0;
  }, "init"),
  updateVal: /* @__PURE__ */ m(function(t, e, s, c) {
    t[e] === void 0 ? t[e] = s : t[e] = c(s, t[e]);
  }, "updateVal"),
  updateBounds: /* @__PURE__ */ m(function(t, e, s, c) {
    const r = yt().journey, y2 = this;
    let u = 0;
    function d2(m$1) {
      return /* @__PURE__ */ m(function(x) {
        u++;
        const h = y2.sequenceItems.length - u + 1;
        y2.updateVal(x, "starty", e - h * r.boxMargin, Math.min), y2.updateVal(x, "stopy", c + h * r.boxMargin, Math.max), y2.updateVal(S.data, "startx", t - h * r.boxMargin, Math.min), y2.updateVal(S.data, "stopx", s + h * r.boxMargin, Math.max), m$1 !== "activation" && (y2.updateVal(x, "startx", t - h * r.boxMargin, Math.min), y2.updateVal(x, "stopx", s + h * r.boxMargin, Math.max), y2.updateVal(S.data, "starty", e - h * r.boxMargin, Math.min), y2.updateVal(S.data, "stopy", c + h * r.boxMargin, Math.max));
      }, "updateItemBounds");
    }
    m(d2, "updateFn"), this.sequenceItems.forEach(d2());
  }, "updateBounds"),
  insert: /* @__PURE__ */ m(function(t, e, s, c) {
    const r = Math.min(t, s), y2 = Math.max(t, s), u = Math.min(e, c), d2 = Math.max(e, c);
    this.updateVal(S.data, "startx", r, Math.min), this.updateVal(S.data, "starty", u, Math.min), this.updateVal(S.data, "stopx", y2, Math.max), this.updateVal(S.data, "stopy", d2, Math.max), this.updateBounds(r, u, y2, d2);
  }, "insert"),
  bumpVerticalPos: /* @__PURE__ */ m(function(t) {
    this.verticalPos = this.verticalPos + t, this.data.stopy = this.verticalPos;
  }, "bumpVerticalPos"),
  getVerticalPos: /* @__PURE__ */ m(function() {
    return this.verticalPos;
  }, "getVerticalPos"),
  getBounds: /* @__PURE__ */ m(function() {
    return this.data;
  }, "getBounds")
}, H = $.sectionFills, st = $.sectionColours, Ht = /* @__PURE__ */ m(function(t, e, s) {
  const c = yt().journey;
  let r = "";
  const y2 = c.height * 2 + c.diagramMarginY, u = s + y2;
  let d2 = 0, m2 = "#CCC", g2 = "black", x = 0;
  for (const [h, i] of e.entries()) {
    if (r !== i.section) {
      m2 = H[d2 % H.length], x = d2 % H.length, g2 = st[d2 % st.length];
      let o2 = 0;
      const p = i.section;
      for (let l2 = h; l2 < e.length && e[l2].section == p; l2++)
        o2 = o2 + 1;
      const f = {
        x: h * c.taskMargin + h * c.width + P,
        y: 50,
        text: i.section,
        fill: m2,
        num: x,
        colour: g2,
        taskCount: o2
      };
      j.drawSection(t, f, c), r = i.section, d2++;
    }
    const a = i.people.reduce((o2, p) => (E[p] && (o2[p] = E[p]), o2), {});
    i.x = h * c.taskMargin + h * c.width + P, i.y = u, i.width = c.diagramMarginX, i.height = c.diagramMarginY, i.colour = g2, i.fill = m2, i.num = x, i.actors = a, j.drawTask(t, i, c), S.insert(i.x, i.y, i.x + i.width + c.taskMargin, 300 + 5 * 30);
  }
}, "drawTasks"), at = {
  setConf: Xt,
  draw: Gt
}, ki = {
  parser: Et,
  db: rt,
  renderer: at,
  styles: jt,
  init: /* @__PURE__ */ m((t) => {
    at.setConf(t.journey), rt.clear();
  }, "init")
};
export {
  ki as diagram
};
