import { H as m$1, K as R, O as yt, aK as iT, a1 as s$, W as Nb, a0 as BI, bk as d5, ax as Mf, ag as _e, am as uA, an as cA, bl as Kn, bm as Y, bn as et } from "./app-254b8ee7.js";
import { l } from "./chunk-FMBD7UC4-5bdb4c19-2389c3a5.js";
import "./chakra-ui-31f48106.js";
import "./react-utils-d801a309.js";
import "./monaco-f0dde6c1.js";
import "./vendor-c051683a.js";
import "./common-utils-40e9b830.js";
import "./react-syntax-highlighter-bb88d724.js";
import "./react-markdown-1245d4fe.js";
import "./remark-gfm-e39f7469.js";
var $ = function() {
  var t = /* @__PURE__ */ m$1(function(_, n, i, a) {
    for (i = i || {}, a = _.length; a--; i[_[a]] = n)
      ;
    return i;
  }, "o"), u = [1, 4], g = [1, 13], s = [1, 12], d = [1, 15], E = [1, 16], f = [1, 20], h = [1, 19], L = [6, 7, 8], C = [1, 26], w = [1, 24], N = [1, 25], r = [6, 7, 11], H = [1, 31], x = [6, 7, 11, 24], P = [1, 6, 13, 16, 17, 20, 23], M = [1, 35], U = [1, 36], A = [1, 6, 7, 11, 13, 16, 17, 20, 23], j = [1, 38], V = {
    trace: /* @__PURE__ */ m$1(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, mindMap: 4, spaceLines: 5, SPACELINE: 6, NL: 7, KANBAN: 8, document: 9, stop: 10, EOF: 11, statement: 12, SPACELIST: 13, node: 14, shapeData: 15, ICON: 16, CLASS: 17, nodeWithId: 18, nodeWithoutId: 19, NODE_DSTART: 20, NODE_DESCR: 21, NODE_DEND: 22, NODE_ID: 23, SHAPE_DATA: 24, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 6: "SPACELINE", 7: "NL", 8: "KANBAN", 11: "EOF", 13: "SPACELIST", 16: "ICON", 17: "CLASS", 20: "NODE_DSTART", 21: "NODE_DESCR", 22: "NODE_DEND", 23: "NODE_ID", 24: "SHAPE_DATA" },
    productions_: [0, [3, 1], [3, 2], [5, 1], [5, 2], [5, 2], [4, 2], [4, 3], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [9, 3], [9, 2], [12, 3], [12, 2], [12, 2], [12, 2], [12, 1], [12, 2], [12, 1], [12, 1], [12, 1], [12, 1], [14, 1], [14, 1], [19, 3], [18, 1], [18, 4], [15, 2], [15, 1]],
    performAction: /* @__PURE__ */ m$1(function(n, i, a, o, p, e, B) {
      var l2 = e.length - 1;
      switch (p) {
        case 6:
        case 7:
          return o;
        case 8:
          o.getLogger().trace("Stop NL ");
          break;
        case 9:
          o.getLogger().trace("Stop EOF ");
          break;
        case 11:
          o.getLogger().trace("Stop NL2 ");
          break;
        case 12:
          o.getLogger().trace("Stop EOF2 ");
          break;
        case 15:
          o.getLogger().info("Node: ", e[l2 - 1].id), o.addNode(e[l2 - 2].length, e[l2 - 1].id, e[l2 - 1].descr, e[l2 - 1].type, e[l2]);
          break;
        case 16:
          o.getLogger().info("Node: ", e[l2].id), o.addNode(e[l2 - 1].length, e[l2].id, e[l2].descr, e[l2].type);
          break;
        case 17:
          o.getLogger().trace("Icon: ", e[l2]), o.decorateNode({ icon: e[l2] });
          break;
        case 18:
        case 23:
          o.decorateNode({ class: e[l2] });
          break;
        case 19:
          o.getLogger().trace("SPACELIST");
          break;
        case 20:
          o.getLogger().trace("Node: ", e[l2 - 1].id), o.addNode(0, e[l2 - 1].id, e[l2 - 1].descr, e[l2 - 1].type, e[l2]);
          break;
        case 21:
          o.getLogger().trace("Node: ", e[l2].id), o.addNode(0, e[l2].id, e[l2].descr, e[l2].type);
          break;
        case 22:
          o.decorateNode({ icon: e[l2] });
          break;
        case 27:
          o.getLogger().trace("node found ..", e[l2 - 2]), this.$ = { id: e[l2 - 1], descr: e[l2 - 1], type: o.getType(e[l2 - 2], e[l2]) };
          break;
        case 28:
          this.$ = { id: e[l2], descr: e[l2], type: 0 };
          break;
        case 29:
          o.getLogger().trace("node found ..", e[l2 - 3]), this.$ = { id: e[l2 - 3], descr: e[l2 - 1], type: o.getType(e[l2 - 2], e[l2]) };
          break;
        case 30:
          this.$ = e[l2 - 1] + e[l2];
          break;
        case 31:
          this.$ = e[l2];
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 8: u }, { 1: [3] }, { 1: [2, 1] }, { 4: 6, 6: [1, 7], 7: [1, 8], 8: u }, { 6: g, 7: [1, 10], 9: 9, 12: 11, 13: s, 14: 14, 16: d, 17: E, 18: 17, 19: 18, 20: f, 23: h }, t(L, [2, 3]), { 1: [2, 2] }, t(L, [2, 4]), t(L, [2, 5]), { 1: [2, 6], 6: g, 12: 21, 13: s, 14: 14, 16: d, 17: E, 18: 17, 19: 18, 20: f, 23: h }, { 6: g, 9: 22, 12: 11, 13: s, 14: 14, 16: d, 17: E, 18: 17, 19: 18, 20: f, 23: h }, { 6: C, 7: w, 10: 23, 11: N }, t(r, [2, 24], { 18: 17, 19: 18, 14: 27, 16: [1, 28], 17: [1, 29], 20: f, 23: h }), t(r, [2, 19]), t(r, [2, 21], { 15: 30, 24: H }), t(r, [2, 22]), t(r, [2, 23]), t(x, [2, 25]), t(x, [2, 26]), t(x, [2, 28], { 20: [1, 32] }), { 21: [1, 33] }, { 6: C, 7: w, 10: 34, 11: N }, { 1: [2, 7], 6: g, 12: 21, 13: s, 14: 14, 16: d, 17: E, 18: 17, 19: 18, 20: f, 23: h }, t(P, [2, 14], { 7: M, 11: U }), t(A, [2, 8]), t(A, [2, 9]), t(A, [2, 10]), t(r, [2, 16], { 15: 37, 24: H }), t(r, [2, 17]), t(r, [2, 18]), t(r, [2, 20], { 24: j }), t(x, [2, 31]), { 21: [1, 39] }, { 22: [1, 40] }, t(P, [2, 13], { 7: M, 11: U }), t(A, [2, 11]), t(A, [2, 12]), t(r, [2, 15], { 24: j }), t(x, [2, 30]), { 22: [1, 41] }, t(x, [2, 27]), t(x, [2, 29])],
    defaultActions: { 2: [2, 1], 6: [2, 2] },
    parseError: /* @__PURE__ */ m$1(function(n, i) {
      if (i.recoverable)
        this.trace(n);
      else {
        var a = new Error(n);
        throw a.hash = i, a;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m$1(function(n) {
      var i = this, a = [0], o = [], p = [null], e = [], B = this.table, l2 = "", z = 0, re = 0, pe = 2, se = 1, ue = e.slice.call(arguments, 1), y = Object.create(this.lexer), T = { yy: {} };
      for (var J in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, J) && (T.yy[J] = this.yy[J]);
      y.setInput(n, T.yy), T.yy.lexer = y, T.yy.parser = this, typeof y.yylloc > "u" && (y.yylloc = {});
      var q = y.yylloc;
      e.push(q);
      var ge = y.options && y.options.ranges;
      typeof T.yy.parseError == "function" ? this.parseError = T.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function de(S) {
        a.length = a.length - 2 * S, p.length = p.length - S, e.length = e.length - S;
      }
      m$1(de, "popStack");
      function ae() {
        var S;
        return S = o.pop() || y.lex() || se, typeof S != "number" && (S instanceof Array && (o = S, S = o.pop()), S = i.symbols_[S] || S), S;
      }
      m$1(ae, "lex");
      for (var k, R2, v, Q, F = {}, X, I, oe, Y2; ; ) {
        if (R2 = a[a.length - 1], this.defaultActions[R2] ? v = this.defaultActions[R2] : ((k === null || typeof k > "u") && (k = ae()), v = B[R2] && B[R2][k]), typeof v > "u" || !v.length || !v[0]) {
          var Z = "";
          Y2 = [];
          for (X in B[R2])
            this.terminals_[X] && X > pe && Y2.push("'" + this.terminals_[X] + "'");
          y.showPosition ? Z = "Parse error on line " + (z + 1) + `:
` + y.showPosition() + `
Expecting ` + Y2.join(", ") + ", got '" + (this.terminals_[k] || k) + "'" : Z = "Parse error on line " + (z + 1) + ": Unexpected " + (k == se ? "end of input" : "'" + (this.terminals_[k] || k) + "'"), this.parseError(Z, {
            text: y.match,
            token: this.terminals_[k] || k,
            line: y.yylineno,
            loc: q,
            expected: Y2
          });
        }
        if (v[0] instanceof Array && v.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + R2 + ", token: " + k);
        switch (v[0]) {
          case 1:
            a.push(k), p.push(y.yytext), e.push(y.yylloc), a.push(v[1]), k = null, re = y.yyleng, l2 = y.yytext, z = y.yylineno, q = y.yylloc;
            break;
          case 2:
            if (I = this.productions_[v[1]][1], F.$ = p[p.length - I], F._$ = {
              first_line: e[e.length - (I || 1)].first_line,
              last_line: e[e.length - 1].last_line,
              first_column: e[e.length - (I || 1)].first_column,
              last_column: e[e.length - 1].last_column
            }, ge && (F._$.range = [
              e[e.length - (I || 1)].range[0],
              e[e.length - 1].range[1]
            ]), Q = this.performAction.apply(F, [
              l2,
              re,
              z,
              T.yy,
              v[1],
              p,
              e
            ].concat(ue)), typeof Q < "u")
              return Q;
            I && (a = a.slice(0, -1 * I * 2), p = p.slice(0, -1 * I), e = e.slice(0, -1 * I)), a.push(this.productions_[v[1]][0]), p.push(F.$), e.push(F._$), oe = B[a[a.length - 2]][a[a.length - 1]], a.push(oe);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, b = /* @__PURE__ */ function() {
    var _ = {
      EOF: 1,
      parseError: /* @__PURE__ */ m$1(function(i, a) {
        if (this.yy.parser)
          this.yy.parser.parseError(i, a);
        else
          throw new Error(i);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m$1(function(n, i) {
        return this.yy = i || this.yy || {}, this._input = n, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m$1(function() {
        var n = this._input[0];
        this.yytext += n, this.yyleng++, this.offset++, this.match += n, this.matched += n;
        var i = n.match(/(?:\r\n?|\n).*/g);
        return i ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), n;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m$1(function(n) {
        var i = n.length, a = n.split(/(?:\r\n?|\n)/g);
        this._input = n + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - i), this.offset -= i;
        var o = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), a.length - 1 && (this.yylineno -= a.length - 1);
        var p = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: a ? (a.length === o.length ? this.yylloc.first_column : 0) + o[o.length - a.length].length - a[0].length : this.yylloc.first_column - i
        }, this.options.ranges && (this.yylloc.range = [p[0], p[0] + this.yyleng - i]), this.yyleng = this.yytext.length, this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: /* @__PURE__ */ m$1(function() {
        return this._more = true, this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: /* @__PURE__ */ m$1(function() {
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
      less: /* @__PURE__ */ m$1(function(n) {
        this.unput(this.match.slice(n));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m$1(function() {
        var n = this.matched.substr(0, this.matched.length - this.match.length);
        return (n.length > 20 ? "..." : "") + n.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m$1(function() {
        var n = this.match;
        return n.length < 20 && (n += this._input.substr(0, 20 - n.length)), (n.substr(0, 20) + (n.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m$1(function() {
        var n = this.pastInput(), i = new Array(n.length + 1).join("-");
        return n + this.upcomingInput() + `
` + i + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m$1(function(n, i) {
        var a, o, p;
        if (this.options.backtrack_lexer && (p = {
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
        }, this.options.ranges && (p.yylloc.range = this.yylloc.range.slice(0))), o = n[0].match(/(?:\r\n?|\n).*/g), o && (this.yylineno += o.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: o ? o[o.length - 1].length - o[o.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + n[0].length
        }, this.yytext += n[0], this.match += n[0], this.matches = n, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(n[0].length), this.matched += n[0], a = this.performAction.call(this, this.yy, this, i, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), a)
          return a;
        if (this._backtrack) {
          for (var e in p)
            this[e] = p[e];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m$1(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var n, i, a, o;
        this._more || (this.yytext = "", this.match = "");
        for (var p = this._currentRules(), e = 0; e < p.length; e++)
          if (a = this._input.match(this.rules[p[e]]), a && (!i || a[0].length > i[0].length)) {
            if (i = a, o = e, this.options.backtrack_lexer) {
              if (n = this.test_match(a, p[e]), n !== false)
                return n;
              if (this._backtrack) {
                i = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return i ? (n = this.test_match(i, p[o]), n !== false ? n : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ m$1(function() {
        var i = this.next();
        return i || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ m$1(function(i) {
        this.conditionStack.push(i);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ m$1(function() {
        var i = this.conditionStack.length - 1;
        return i > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ m$1(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ m$1(function(i) {
        return i = this.conditionStack.length - 1 - Math.abs(i || 0), i >= 0 ? this.conditionStack[i] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ m$1(function(i) {
        this.begin(i);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ m$1(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: /* @__PURE__ */ m$1(function(i, a, o, p) {
        switch (o) {
          case 0:
            return this.pushState("shapeData"), a.yytext = "", 24;
          case 1:
            return this.pushState("shapeDataStr"), 24;
          case 2:
            return this.popState(), 24;
          case 3:
            const e = /\n\s*/g;
            return a.yytext = a.yytext.replace(e, "<br/>"), 24;
          case 4:
            return 24;
          case 5:
            this.popState();
            break;
          case 6:
            return i.getLogger().trace("Found comment", a.yytext), 6;
          case 7:
            return 8;
          case 8:
            this.begin("CLASS");
            break;
          case 9:
            return this.popState(), 17;
          case 10:
            this.popState();
            break;
          case 11:
            i.getLogger().trace("Begin icon"), this.begin("ICON");
            break;
          case 12:
            return i.getLogger().trace("SPACELINE"), 6;
          case 13:
            return 7;
          case 14:
            return 16;
          case 15:
            i.getLogger().trace("end icon"), this.popState();
            break;
          case 16:
            return i.getLogger().trace("Exploding node"), this.begin("NODE"), 20;
          case 17:
            return i.getLogger().trace("Cloud"), this.begin("NODE"), 20;
          case 18:
            return i.getLogger().trace("Explosion Bang"), this.begin("NODE"), 20;
          case 19:
            return i.getLogger().trace("Cloud Bang"), this.begin("NODE"), 20;
          case 20:
            return this.begin("NODE"), 20;
          case 21:
            return this.begin("NODE"), 20;
          case 22:
            return this.begin("NODE"), 20;
          case 23:
            return this.begin("NODE"), 20;
          case 24:
            return 13;
          case 25:
            return 23;
          case 26:
            return 11;
          case 27:
            this.begin("NSTR2");
            break;
          case 28:
            return "NODE_DESCR";
          case 29:
            this.popState();
            break;
          case 30:
            i.getLogger().trace("Starting NSTR"), this.begin("NSTR");
            break;
          case 31:
            return i.getLogger().trace("description:", a.yytext), "NODE_DESCR";
          case 32:
            this.popState();
            break;
          case 33:
            return this.popState(), i.getLogger().trace("node end ))"), "NODE_DEND";
          case 34:
            return this.popState(), i.getLogger().trace("node end )"), "NODE_DEND";
          case 35:
            return this.popState(), i.getLogger().trace("node end ...", a.yytext), "NODE_DEND";
          case 36:
            return this.popState(), i.getLogger().trace("node end (("), "NODE_DEND";
          case 37:
            return this.popState(), i.getLogger().trace("node end (-"), "NODE_DEND";
          case 38:
            return this.popState(), i.getLogger().trace("node end (-"), "NODE_DEND";
          case 39:
            return this.popState(), i.getLogger().trace("node end (("), "NODE_DEND";
          case 40:
            return this.popState(), i.getLogger().trace("node end (("), "NODE_DEND";
          case 41:
            return i.getLogger().trace("Long description:", a.yytext), 21;
          case 42:
            return i.getLogger().trace("Long description:", a.yytext), 21;
        }
      }, "anonymous"),
      rules: [/^(?:@\{)/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^\"]+)/i, /^(?:[^}^"]+)/i, /^(?:\})/i, /^(?:\s*%%.*)/i, /^(?:kanban\b)/i, /^(?::::)/i, /^(?:.+)/i, /^(?:\n)/i, /^(?:::icon\()/i, /^(?:[\s]+[\n])/i, /^(?:[\n]+)/i, /^(?:[^\)]+)/i, /^(?:\))/i, /^(?:-\))/i, /^(?:\(-)/i, /^(?:\)\))/i, /^(?:\))/i, /^(?:\(\()/i, /^(?:\{\{)/i, /^(?:\()/i, /^(?:\[)/i, /^(?:[\s]+)/i, /^(?:[^\(\[\n\)\{\}@]+)/i, /^(?:$)/i, /^(?:["][`])/i, /^(?:[^`"]+)/i, /^(?:[`]["])/i, /^(?:["])/i, /^(?:[^"]+)/i, /^(?:["])/i, /^(?:[\)]\))/i, /^(?:[\)])/i, /^(?:[\]])/i, /^(?:\}\})/i, /^(?:\(-)/i, /^(?:-\))/i, /^(?:\(\()/i, /^(?:\()/i, /^(?:[^\)\]\(\}]+)/i, /^(?:.+(?!\(\())/i],
      conditions: { shapeDataEndBracket: { rules: [], inclusive: false }, shapeDataStr: { rules: [2, 3], inclusive: false }, shapeData: { rules: [1, 4, 5], inclusive: false }, CLASS: { rules: [9, 10], inclusive: false }, ICON: { rules: [14, 15], inclusive: false }, NSTR2: { rules: [28, 29], inclusive: false }, NSTR: { rules: [31, 32], inclusive: false }, NODE: { rules: [27, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], inclusive: false }, INITIAL: { rules: [0, 6, 7, 8, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], inclusive: true } }
    };
    return _;
  }();
  V.lexer = b;
  function O() {
    this.yy = {};
  }
  return m$1(O, "Parser"), O.prototype = V, V.Parser = O, new O();
}();
$.parser = $;
var xe = $, D = [], ie = [], ee = 0, ne = {}, ve = /* @__PURE__ */ m$1(() => {
  D = [], ie = [], ee = 0, ne = {};
}, "clear"), De = /* @__PURE__ */ m$1((t) => {
  if (D.length === 0)
    return null;
  const u = D[0].level;
  let g = null;
  for (let s = D.length - 1; s >= 0; s--)
    if (D[s].level === u && !g && (g = D[s]), D[s].level < u)
      throw new Error('Items without section detected, found section ("' + D[s].label + '")');
  return t === (g == null ? void 0 : g.level) ? null : g;
}, "getSection"), he = /* @__PURE__ */ m$1(function() {
  return ie;
}, "getSections"), Le = /* @__PURE__ */ m$1(function() {
  const t = [], u = [], g = he(), s = yt();
  for (const d of g) {
    const E = {
      id: d.id,
      label: _e(d.label ?? "", s),
      isGroup: true,
      ticket: d.ticket,
      shape: "kanbanSection",
      level: d.level,
      look: s.look
    };
    u.push(E);
    const f = D.filter((h) => h.parentId === d.id);
    for (const h of f) {
      const L = {
        id: h.id,
        parentId: d.id,
        label: _e(h.label ?? "", s),
        isGroup: false,
        ticket: h == null ? void 0 : h.ticket,
        priority: h == null ? void 0 : h.priority,
        assigned: h == null ? void 0 : h.assigned,
        icon: h == null ? void 0 : h.icon,
        shape: "kanbanItem",
        level: h.level,
        rx: 5,
        ry: 5,
        cssStyles: ["text-align: left"]
      };
      u.push(L);
    }
  }
  return { nodes: u, edges: t, other: {}, config: yt() };
}, "getData"), Oe = /* @__PURE__ */ m$1((t, u, g, s, d) => {
  var C, w;
  const E = yt();
  let f = ((C = E.mindmap) == null ? void 0 : C.padding) ?? Mf.mindmap.padding;
  switch (s) {
    case m.ROUNDED_RECT:
    case m.RECT:
    case m.HEXAGON:
      f *= 2;
  }
  const h = {
    id: _e(u, E) || "kbn" + ee++,
    level: t,
    label: _e(g, E),
    width: ((w = E.mindmap) == null ? void 0 : w.maxNodeWidth) ?? Mf.mindmap.maxNodeWidth,
    padding: f,
    isGroup: false
  };
  if (d !== void 0) {
    let N;
    d.includes(`
`) ? N = d + `
` : N = `{
` + d + `
}`;
    const r = uA(N, { schema: cA });
    if (r.shape && (r.shape !== r.shape.toLowerCase() || r.shape.includes("_")))
      throw new Error(`No such shape: ${r.shape}. Shape names should be lowercase.`);
    r != null && r.shape && r.shape === "kanbanItem" && (h.shape = r == null ? void 0 : r.shape), r != null && r.label && (h.label = r == null ? void 0 : r.label), r != null && r.icon && (h.icon = r == null ? void 0 : r.icon.toString()), r != null && r.assigned && (h.assigned = r == null ? void 0 : r.assigned.toString()), r != null && r.ticket && (h.ticket = r == null ? void 0 : r.ticket.toString()), r != null && r.priority && (h.priority = r == null ? void 0 : r.priority);
  }
  const L = De(t);
  L ? h.parentId = L.id || "kbn" + ee++ : ie.push(h), D.push(h);
}, "addNode"), m = {
  DEFAULT: 0,
  NO_BORDER: 0,
  ROUNDED_RECT: 1,
  RECT: 2,
  CIRCLE: 3,
  CLOUD: 4,
  BANG: 5,
  HEXAGON: 6
}, Ie = /* @__PURE__ */ m$1((t, u) => {
  switch (R.debug("In get type", t, u), t) {
    case "[":
      return m.RECT;
    case "(":
      return u === ")" ? m.ROUNDED_RECT : m.CLOUD;
    case "((":
      return m.CIRCLE;
    case ")":
      return m.CLOUD;
    case "))":
      return m.BANG;
    case "{{":
      return m.HEXAGON;
    default:
      return m.DEFAULT;
  }
}, "getType"), Ce = /* @__PURE__ */ m$1((t, u) => {
  ne[t] = u;
}, "setElementForId"), we = /* @__PURE__ */ m$1((t) => {
  if (!t)
    return;
  const u = yt(), g = D[D.length - 1];
  t.icon && (g.icon = _e(t.icon, u)), t.class && (g.cssClasses = _e(t.class, u));
}, "decorateNode"), Ae = /* @__PURE__ */ m$1((t) => {
  switch (t) {
    case m.DEFAULT:
      return "no-border";
    case m.RECT:
      return "rect";
    case m.ROUNDED_RECT:
      return "rounded-rect";
    case m.CIRCLE:
      return "circle";
    case m.CLOUD:
      return "cloud";
    case m.BANG:
      return "bang";
    case m.HEXAGON:
      return "hexgon";
    default:
      return "no-border";
  }
}, "type2Str"), Te = /* @__PURE__ */ m$1(() => R, "getLogger"), Re = /* @__PURE__ */ m$1((t) => ne[t], "getElementById"), Pe = {
  clear: ve,
  addNode: Oe,
  getSections: he,
  getData: Le,
  nodeType: m,
  getType: Ie,
  setElementForId: Ce,
  decorateNode: we,
  type2Str: Ae,
  getLogger: Te,
  getElementById: Re
}, Ve = Pe, Be = /* @__PURE__ */ m$1(async (t, u, g, s) => {
  var M, U, A, j, V;
  R.debug(`Rendering kanban diagram
` + t);
  const E = s.db.getData(), f = yt();
  f.htmlLabels = false;
  const h = iT(u), L = h.append("g");
  L.attr("class", "sections");
  const C = h.append("g");
  C.attr("class", "items");
  const w = E.nodes.filter(
    // TODO: TypeScript 5.5 will infer this predicate automatically
    (b) => b.isGroup
  );
  let N = 0;
  const r = 10, H = [];
  let x = 25;
  for (const b of w) {
    const O = ((M = f == null ? void 0 : f.kanban) == null ? void 0 : M.sectionWidth) || 200;
    N = N + 1, b.x = O * N + (N - 1) * r / 2, b.width = O, b.y = 0, b.height = O * 3, b.rx = 5, b.ry = 5, b.cssClasses = b.cssClasses + " section-" + N;
    const _ = await s$(L, b);
    x = Math.max(x, (U = _ == null ? void 0 : _.labelBBox) == null ? void 0 : U.height), H.push(_);
  }
  let P = 0;
  for (const b of w) {
    const O = H[P];
    P = P + 1;
    const _ = ((A = f == null ? void 0 : f.kanban) == null ? void 0 : A.sectionWidth) || 200, n = -_ * 3 / 2 + x;
    let i = n;
    const a = E.nodes.filter((e) => e.parentId === b.id);
    for (const e of a) {
      if (e.isGroup)
        throw new Error("Groups within groups are not allowed in Kanban diagrams");
      e.x = b.x, e.width = _ - 1.5 * r;
      const l2 = (await Nb(C, e, { config: f })).node().getBBox();
      e.y = i + l2.height / 2, await BI(e), i = e.y + l2.height / 2 + r / 2;
    }
    const o = O.cluster.select("rect"), p = Math.max(i - n + 3 * r, 50) + (x - 25);
    o.attr("height", p);
  }
  d5(
    void 0,
    h,
    ((j = f.mindmap) == null ? void 0 : j.padding) ?? Mf.kanban.padding,
    ((V = f.mindmap) == null ? void 0 : V.useMaxWidth) ?? Mf.kanban.useMaxWidth
  );
}, "draw"), Fe = {
  draw: Be
}, Ge = /* @__PURE__ */ m$1((t) => {
  let u = "";
  for (let s = 0; s < t.THEME_COLOR_LIMIT; s++)
    t["lineColor" + s] = t["lineColor" + s] || t["cScaleInv" + s], Kn(t["lineColor" + s]) ? t["lineColor" + s] = Y(t["lineColor" + s], 20) : t["lineColor" + s] = et(t["lineColor" + s], 20);
  const g = /* @__PURE__ */ m$1((s, d) => t.darkMode ? et(s, d) : Y(s, d), "adjuster");
  for (let s = 0; s < t.THEME_COLOR_LIMIT; s++) {
    const d = "" + (17 - 3 * s);
    u += `
    .section-${s - 1} rect, .section-${s - 1} path, .section-${s - 1} circle, .section-${s - 1} polygon, .section-${s - 1} path  {
      fill: ${g(t["cScale" + s], 10)};
      stroke: ${g(t["cScale" + s], 10)};

    }
    .section-${s - 1} text {
     fill: ${t["cScaleLabel" + s]};
    }
    .node-icon-${s - 1} {
      font-size: 40px;
      color: ${t["cScaleLabel" + s]};
    }
    .section-edge-${s - 1}{
      stroke: ${t["cScale" + s]};
    }
    .edge-depth-${s - 1}{
      stroke-width: ${d};
    }
    .section-${s - 1} line {
      stroke: ${t["cScaleInv" + s]} ;
      stroke-width: 3;
    }

    .disabled, .disabled circle, .disabled text {
      fill: lightgray;
    }
    .disabled text {
      fill: #efefef;
    }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.background};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .kanban-ticket-link {
    fill: ${t.background};
    stroke: ${t.nodeBorder};
    text-decoration: underline;
  }
    `;
  }
  return u;
}, "genSections"), He = /* @__PURE__ */ m$1((t) => `
  .edge {
    stroke-width: 3;
  }
  ${Ge(t)}
  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {
    fill: ${t.git0};
  }
  .section-root text {
    fill: ${t.gitBranchLabel0};
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
  .cluster-label, .label {
    color: ${t.textColor};
    fill: ${t.textColor};
    }
  .kanban-label {
    dy: 1em;
    alignment-baseline: middle;
    text-anchor: middle;
    dominant-baseline: middle;
    text-align: center;
  }
    ${l()}
`, "getStyles"), Me = He, pi = {
  db: Ve,
  renderer: Fe,
  parser: xe,
  styles: Me
};
export {
  pi as diagram
};
