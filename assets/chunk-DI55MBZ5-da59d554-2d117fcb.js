import { g } from "./chunk-55IACEB6-ed41ea2e-96ebbe7d.js";
import { d } from "./chunk-QN33PNHL-0ed1f29c-3e45b115.js";
import { H as m, a8 as x5, a7 as b5, a9 as w5, aa as y5, ak as k5, al as _5, O as yt$1, K as R, bh as wM, ad as Ii, ar as m5, au as DI, aq as $e$1 } from "./app-254b8ee7.js";
var vt = function() {
  var e = /* @__PURE__ */ m(function(V, o, h, n) {
    for (h = h || {}, n = V.length; n--; h[V[n]] = o)
      ;
    return h;
  }, "o"), t = [1, 2], s = [1, 3], a = [1, 4], i = [2, 4], l = [1, 9], d2 = [1, 11], S = [1, 16], p = [1, 17], T = [1, 18], _ = [1, 19], m$1 = [1, 33], k = [1, 20], A = [1, 21], $ = [1, 22], x = [1, 23], R2 = [1, 24], u = [1, 26], L = [1, 27], I = [1, 28], N = [1, 29], G = [1, 30], P = [1, 31], B = [1, 32], at = [1, 35], nt = [1, 36], ot = [1, 37], lt = [1, 38], W = [1, 34], y = [1, 4, 5, 16, 17, 19, 21, 22, 24, 25, 26, 27, 28, 29, 33, 35, 37, 38, 41, 45, 48, 51, 52, 53, 54, 57], ct = [1, 4, 5, 14, 15, 16, 17, 19, 21, 22, 24, 25, 26, 27, 28, 29, 33, 35, 37, 38, 39, 40, 41, 45, 48, 51, 52, 53, 54, 57], xt = [4, 5, 16, 17, 19, 21, 22, 24, 25, 26, 27, 28, 29, 33, 35, 37, 38, 41, 45, 48, 51, 52, 53, 54, 57], gt = {
    trace: /* @__PURE__ */ m(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, SPACE: 4, NL: 5, SD: 6, document: 7, line: 8, statement: 9, classDefStatement: 10, styleStatement: 11, cssClassStatement: 12, idStatement: 13, DESCR: 14, "-->": 15, HIDE_EMPTY: 16, scale: 17, WIDTH: 18, COMPOSIT_STATE: 19, STRUCT_START: 20, STRUCT_STOP: 21, STATE_DESCR: 22, AS: 23, ID: 24, FORK: 25, JOIN: 26, CHOICE: 27, CONCURRENT: 28, note: 29, notePosition: 30, NOTE_TEXT: 31, direction: 32, acc_title: 33, acc_title_value: 34, acc_descr: 35, acc_descr_value: 36, acc_descr_multiline_value: 37, CLICK: 38, STRING: 39, HREF: 40, classDef: 41, CLASSDEF_ID: 42, CLASSDEF_STYLEOPTS: 43, DEFAULT: 44, style: 45, STYLE_IDS: 46, STYLEDEF_STYLEOPTS: 47, class: 48, CLASSENTITY_IDS: 49, STYLECLASS: 50, direction_tb: 51, direction_bt: 52, direction_rl: 53, direction_lr: 54, eol: 55, ";": 56, EDGE_STATE: 57, STYLE_SEPARATOR: 58, left_of: 59, right_of: 60, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "SPACE", 5: "NL", 6: "SD", 14: "DESCR", 15: "-->", 16: "HIDE_EMPTY", 17: "scale", 18: "WIDTH", 19: "COMPOSIT_STATE", 20: "STRUCT_START", 21: "STRUCT_STOP", 22: "STATE_DESCR", 23: "AS", 24: "ID", 25: "FORK", 26: "JOIN", 27: "CHOICE", 28: "CONCURRENT", 29: "note", 31: "NOTE_TEXT", 33: "acc_title", 34: "acc_title_value", 35: "acc_descr", 36: "acc_descr_value", 37: "acc_descr_multiline_value", 38: "CLICK", 39: "STRING", 40: "HREF", 41: "classDef", 42: "CLASSDEF_ID", 43: "CLASSDEF_STYLEOPTS", 44: "DEFAULT", 45: "style", 46: "STYLE_IDS", 47: "STYLEDEF_STYLEOPTS", 48: "class", 49: "CLASSENTITY_IDS", 50: "STYLECLASS", 51: "direction_tb", 52: "direction_bt", 53: "direction_rl", 54: "direction_lr", 56: ";", 57: "EDGE_STATE", 58: "STYLE_SEPARATOR", 59: "left_of", 60: "right_of" },
    productions_: [0, [3, 2], [3, 2], [3, 2], [7, 0], [7, 2], [8, 2], [8, 1], [8, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 2], [9, 3], [9, 4], [9, 1], [9, 2], [9, 1], [9, 4], [9, 3], [9, 6], [9, 1], [9, 1], [9, 1], [9, 1], [9, 4], [9, 4], [9, 1], [9, 2], [9, 2], [9, 1], [9, 5], [9, 5], [10, 3], [10, 3], [11, 3], [12, 3], [32, 1], [32, 1], [32, 1], [32, 1], [55, 1], [55, 1], [13, 1], [13, 1], [13, 3], [13, 3], [30, 1], [30, 1]],
    performAction: /* @__PURE__ */ m(function(o, h, n, g2, E, r, Z) {
      var c = r.length - 1;
      switch (E) {
        case 3:
          return g2.setRootDoc(r[c]), r[c];
        case 4:
          this.$ = [];
          break;
        case 5:
          r[c] != "nl" && (r[c - 1].push(r[c]), this.$ = r[c - 1]);
          break;
        case 6:
        case 7:
          this.$ = r[c];
          break;
        case 8:
          this.$ = "nl";
          break;
        case 12:
          this.$ = r[c];
          break;
        case 13:
          const tt = r[c - 1];
          tt.description = g2.trimColon(r[c]), this.$ = tt;
          break;
        case 14:
          this.$ = { stmt: "relation", state1: r[c - 2], state2: r[c] };
          break;
        case 15:
          const Tt = g2.trimColon(r[c]);
          this.$ = { stmt: "relation", state1: r[c - 3], state2: r[c - 1], description: Tt };
          break;
        case 19:
          this.$ = { stmt: "state", id: r[c - 3], type: "default", description: "", doc: r[c - 1] };
          break;
        case 20:
          var U = r[c], K = r[c - 2].trim();
          if (r[c].match(":")) {
            var ut = r[c].split(":");
            U = ut[0], K = [K, ut[1]];
          }
          this.$ = { stmt: "state", id: U, type: "default", description: K };
          break;
        case 21:
          this.$ = { stmt: "state", id: r[c - 3], type: "default", description: r[c - 5], doc: r[c - 1] };
          break;
        case 22:
          this.$ = { stmt: "state", id: r[c], type: "fork" };
          break;
        case 23:
          this.$ = { stmt: "state", id: r[c], type: "join" };
          break;
        case 24:
          this.$ = { stmt: "state", id: r[c], type: "choice" };
          break;
        case 25:
          this.$ = { stmt: "state", id: g2.getDividerId(), type: "divider" };
          break;
        case 26:
          this.$ = { stmt: "state", id: r[c - 1].trim(), note: { position: r[c - 2].trim(), text: r[c].trim() } };
          break;
        case 29:
          this.$ = r[c].trim(), g2.setAccTitle(this.$);
          break;
        case 30:
        case 31:
          this.$ = r[c].trim(), g2.setAccDescription(this.$);
          break;
        case 32:
          this.$ = {
            stmt: "click",
            id: r[c - 3],
            url: r[c - 2],
            tooltip: r[c - 1]
          };
          break;
        case 33:
          this.$ = {
            stmt: "click",
            id: r[c - 3],
            url: r[c - 1],
            tooltip: ""
          };
          break;
        case 34:
        case 35:
          this.$ = { stmt: "classDef", id: r[c - 1].trim(), classes: r[c].trim() };
          break;
        case 36:
          this.$ = { stmt: "style", id: r[c - 1].trim(), styleClass: r[c].trim() };
          break;
        case 37:
          this.$ = { stmt: "applyClass", id: r[c - 1].trim(), styleClass: r[c].trim() };
          break;
        case 38:
          g2.setDirection("TB"), this.$ = { stmt: "dir", value: "TB" };
          break;
        case 39:
          g2.setDirection("BT"), this.$ = { stmt: "dir", value: "BT" };
          break;
        case 40:
          g2.setDirection("RL"), this.$ = { stmt: "dir", value: "RL" };
          break;
        case 41:
          g2.setDirection("LR"), this.$ = { stmt: "dir", value: "LR" };
          break;
        case 44:
        case 45:
          this.$ = { stmt: "state", id: r[c].trim(), type: "default", description: "" };
          break;
        case 46:
          this.$ = { stmt: "state", id: r[c - 2].trim(), classes: [r[c].trim()], type: "default", description: "" };
          break;
        case 47:
          this.$ = { stmt: "state", id: r[c - 2].trim(), classes: [r[c].trim()], type: "default", description: "" };
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: t, 5: s, 6: a }, { 1: [3] }, { 3: 5, 4: t, 5: s, 6: a }, { 3: 6, 4: t, 5: s, 6: a }, e([1, 4, 5, 16, 17, 19, 22, 24, 25, 26, 27, 28, 29, 33, 35, 37, 38, 41, 45, 48, 51, 52, 53, 54, 57], i, { 7: 7 }), { 1: [2, 1] }, { 1: [2, 2] }, { 1: [2, 3], 4: l, 5: d2, 8: 8, 9: 10, 10: 12, 11: 13, 12: 14, 13: 15, 16: S, 17: p, 19: T, 22: _, 24: m$1, 25: k, 26: A, 27: $, 28: x, 29: R2, 32: 25, 33: u, 35: L, 37: I, 38: N, 41: G, 45: P, 48: B, 51: at, 52: nt, 53: ot, 54: lt, 57: W }, e(y, [2, 5]), { 9: 39, 10: 12, 11: 13, 12: 14, 13: 15, 16: S, 17: p, 19: T, 22: _, 24: m$1, 25: k, 26: A, 27: $, 28: x, 29: R2, 32: 25, 33: u, 35: L, 37: I, 38: N, 41: G, 45: P, 48: B, 51: at, 52: nt, 53: ot, 54: lt, 57: W }, e(y, [2, 7]), e(y, [2, 8]), e(y, [2, 9]), e(y, [2, 10]), e(y, [2, 11]), e(y, [2, 12], { 14: [1, 40], 15: [1, 41] }), e(y, [2, 16]), { 18: [1, 42] }, e(y, [2, 18], { 20: [1, 43] }), { 23: [1, 44] }, e(y, [2, 22]), e(y, [2, 23]), e(y, [2, 24]), e(y, [2, 25]), { 30: 45, 31: [1, 46], 59: [1, 47], 60: [1, 48] }, e(y, [2, 28]), { 34: [1, 49] }, { 36: [1, 50] }, e(y, [2, 31]), { 13: 51, 24: m$1, 57: W }, { 42: [1, 52], 44: [1, 53] }, { 46: [1, 54] }, { 49: [1, 55] }, e(ct, [2, 44], { 58: [1, 56] }), e(ct, [2, 45], { 58: [1, 57] }), e(y, [2, 38]), e(y, [2, 39]), e(y, [2, 40]), e(y, [2, 41]), e(y, [2, 6]), e(y, [2, 13]), { 13: 58, 24: m$1, 57: W }, e(y, [2, 17]), e(xt, i, { 7: 59 }), { 24: [1, 60] }, { 24: [1, 61] }, { 23: [1, 62] }, { 24: [2, 48] }, { 24: [2, 49] }, e(y, [2, 29]), e(y, [2, 30]), { 39: [1, 63], 40: [1, 64] }, { 43: [1, 65] }, { 43: [1, 66] }, { 47: [1, 67] }, { 50: [1, 68] }, { 24: [1, 69] }, { 24: [1, 70] }, e(y, [2, 14], { 14: [1, 71] }), { 4: l, 5: d2, 8: 8, 9: 10, 10: 12, 11: 13, 12: 14, 13: 15, 16: S, 17: p, 19: T, 21: [1, 72], 22: _, 24: m$1, 25: k, 26: A, 27: $, 28: x, 29: R2, 32: 25, 33: u, 35: L, 37: I, 38: N, 41: G, 45: P, 48: B, 51: at, 52: nt, 53: ot, 54: lt, 57: W }, e(y, [2, 20], { 20: [1, 73] }), { 31: [1, 74] }, { 24: [1, 75] }, { 39: [1, 76] }, { 39: [1, 77] }, e(y, [2, 34]), e(y, [2, 35]), e(y, [2, 36]), e(y, [2, 37]), e(ct, [2, 46]), e(ct, [2, 47]), e(y, [2, 15]), e(y, [2, 19]), e(xt, i, { 7: 78 }), e(y, [2, 26]), e(y, [2, 27]), { 5: [1, 79] }, { 5: [1, 80] }, { 4: l, 5: d2, 8: 8, 9: 10, 10: 12, 11: 13, 12: 14, 13: 15, 16: S, 17: p, 19: T, 21: [1, 81], 22: _, 24: m$1, 25: k, 26: A, 27: $, 28: x, 29: R2, 32: 25, 33: u, 35: L, 37: I, 38: N, 41: G, 45: P, 48: B, 51: at, 52: nt, 53: ot, 54: lt, 57: W }, e(y, [2, 32]), e(y, [2, 33]), e(y, [2, 21])],
    defaultActions: { 5: [2, 1], 6: [2, 2], 47: [2, 48], 48: [2, 49] },
    parseError: /* @__PURE__ */ m(function(o, h) {
      if (h.recoverable)
        this.trace(o);
      else {
        var n = new Error(o);
        throw n.hash = h, n;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ m(function(o) {
      var h = this, n = [0], g2 = [], E = [null], r = [], Z = this.table, c = "", U = 0, K = 0, ut = 2, tt = 1, Tt = r.slice.call(arguments, 1), b = Object.create(this.lexer), j = { yy: {} };
      for (var Et in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, Et) && (j.yy[Et] = this.yy[Et]);
      b.setInput(o, j.yy), j.yy.lexer = b, j.yy.parser = this, typeof b.yylloc > "u" && (b.yylloc = {});
      var _t = b.yylloc;
      r.push(_t);
      var Qt = b.options && b.options.ranges;
      typeof j.yy.parseError == "function" ? this.parseError = j.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Zt(O) {
        n.length = n.length - 2 * O, E.length = E.length - O, r.length = r.length - O;
      }
      m(Zt, "popStack");
      function Lt() {
        var O;
        return O = g2.pop() || b.lex() || tt, typeof O != "number" && (O instanceof Array && (g2 = O, O = g2.pop()), O = h.symbols_[O] || O), O;
      }
      m(Lt, "lex");
      for (var C, H, w, mt, X = {}, dt, Y, Ot, ft; ; ) {
        if (H = n[n.length - 1], this.defaultActions[H] ? w = this.defaultActions[H] : ((C === null || typeof C > "u") && (C = Lt()), w = Z[H] && Z[H][C]), typeof w > "u" || !w.length || !w[0]) {
          var Dt = "";
          ft = [];
          for (dt in Z[H])
            this.terminals_[dt] && dt > ut && ft.push("'" + this.terminals_[dt] + "'");
          b.showPosition ? Dt = "Parse error on line " + (U + 1) + `:
` + b.showPosition() + `
Expecting ` + ft.join(", ") + ", got '" + (this.terminals_[C] || C) + "'" : Dt = "Parse error on line " + (U + 1) + ": Unexpected " + (C == tt ? "end of input" : "'" + (this.terminals_[C] || C) + "'"), this.parseError(Dt, {
            text: b.match,
            token: this.terminals_[C] || C,
            line: b.yylineno,
            loc: _t,
            expected: ft
          });
        }
        if (w[0] instanceof Array && w.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + H + ", token: " + C);
        switch (w[0]) {
          case 1:
            n.push(C), E.push(b.yytext), r.push(b.yylloc), n.push(w[1]), C = null, K = b.yyleng, c = b.yytext, U = b.yylineno, _t = b.yylloc;
            break;
          case 2:
            if (Y = this.productions_[w[1]][1], X.$ = E[E.length - Y], X._$ = {
              first_line: r[r.length - (Y || 1)].first_line,
              last_line: r[r.length - 1].last_line,
              first_column: r[r.length - (Y || 1)].first_column,
              last_column: r[r.length - 1].last_column
            }, Qt && (X._$.range = [
              r[r.length - (Y || 1)].range[0],
              r[r.length - 1].range[1]
            ]), mt = this.performAction.apply(X, [
              c,
              K,
              U,
              j.yy,
              w[1],
              E,
              r
            ].concat(Tt)), typeof mt < "u")
              return mt;
            Y && (n = n.slice(0, -1 * Y * 2), E = E.slice(0, -1 * Y), r = r.slice(0, -1 * Y)), n.push(this.productions_[w[1]][0]), E.push(X.$), r.push(X._$), Ot = Z[n[n.length - 2]][n[n.length - 1]], n.push(Ot);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  }, qt = /* @__PURE__ */ function() {
    var V = {
      EOF: 1,
      parseError: /* @__PURE__ */ m(function(h, n) {
        if (this.yy.parser)
          this.yy.parser.parseError(h, n);
        else
          throw new Error(h);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ m(function(o, h) {
        return this.yy = h || this.yy || {}, this._input = o, this._more = this._backtrack = this.done = false, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ m(function() {
        var o = this._input[0];
        this.yytext += o, this.yyleng++, this.offset++, this.match += o, this.matched += o;
        var h = o.match(/(?:\r\n?|\n).*/g);
        return h ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), o;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ m(function(o) {
        var h = o.length, n = o.split(/(?:\r\n?|\n)/g);
        this._input = o + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - h), this.offset -= h;
        var g2 = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
        var E = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: n ? (n.length === g2.length ? this.yylloc.first_column : 0) + g2[g2.length - n.length].length - n[0].length : this.yylloc.first_column - h
        }, this.options.ranges && (this.yylloc.range = [E[0], E[0] + this.yyleng - h]), this.yyleng = this.yytext.length, this;
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
      less: /* @__PURE__ */ m(function(o) {
        this.unput(this.match.slice(o));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ m(function() {
        var o = this.matched.substr(0, this.matched.length - this.match.length);
        return (o.length > 20 ? "..." : "") + o.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ m(function() {
        var o = this.match;
        return o.length < 20 && (o += this._input.substr(0, 20 - o.length)), (o.substr(0, 20) + (o.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ m(function() {
        var o = this.pastInput(), h = new Array(o.length + 1).join("-");
        return o + this.upcomingInput() + `
` + h + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ m(function(o, h) {
        var n, g2, E;
        if (this.options.backtrack_lexer && (E = {
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
        }, this.options.ranges && (E.yylloc.range = this.yylloc.range.slice(0))), g2 = o[0].match(/(?:\r\n?|\n).*/g), g2 && (this.yylineno += g2.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: g2 ? g2[g2.length - 1].length - g2[g2.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + o[0].length
        }, this.yytext += o[0], this.match += o[0], this.matches = o, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = false, this._backtrack = false, this._input = this._input.slice(o[0].length), this.matched += o[0], n = this.performAction.call(this, this.yy, this, h, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = false), n)
          return n;
        if (this._backtrack) {
          for (var r in E)
            this[r] = E[r];
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ m(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = true);
        var o, h, n, g2;
        this._more || (this.yytext = "", this.match = "");
        for (var E = this._currentRules(), r = 0; r < E.length; r++)
          if (n = this._input.match(this.rules[E[r]]), n && (!h || n[0].length > h[0].length)) {
            if (h = n, g2 = r, this.options.backtrack_lexer) {
              if (o = this.test_match(n, E[r]), o !== false)
                return o;
              if (this._backtrack) {
                h = false;
                continue;
              } else
                return false;
            } else if (!this.options.flex)
              break;
          }
        return h ? (o = this.test_match(h, E[g2]), o !== false ? o : false) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ m(function() {
        var h = this.next();
        return h || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ m(function(h) {
        this.conditionStack.push(h);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ m(function() {
        var h = this.conditionStack.length - 1;
        return h > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ m(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ m(function(h) {
        return h = this.conditionStack.length - 1 - Math.abs(h || 0), h >= 0 ? this.conditionStack[h] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ m(function(h) {
        this.begin(h);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ m(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: /* @__PURE__ */ m(function(h, n, g2, E) {
        switch (g2) {
          case 0:
            return 38;
          case 1:
            return 40;
          case 2:
            return 39;
          case 3:
            return 44;
          case 4:
            return 51;
          case 5:
            return 52;
          case 6:
            return 53;
          case 7:
            return 54;
          case 8:
            break;
          case 9:
            break;
          case 10:
            return 5;
          case 11:
            break;
          case 12:
            break;
          case 13:
            break;
          case 14:
            break;
          case 15:
            return this.pushState("SCALE"), 17;
          case 16:
            return 18;
          case 17:
            this.popState();
            break;
          case 18:
            return this.begin("acc_title"), 33;
          case 19:
            return this.popState(), "acc_title_value";
          case 20:
            return this.begin("acc_descr"), 35;
          case 21:
            return this.popState(), "acc_descr_value";
          case 22:
            this.begin("acc_descr_multiline");
            break;
          case 23:
            this.popState();
            break;
          case 24:
            return "acc_descr_multiline_value";
          case 25:
            return this.pushState("CLASSDEF"), 41;
          case 26:
            return this.popState(), this.pushState("CLASSDEFID"), "DEFAULT_CLASSDEF_ID";
          case 27:
            return this.popState(), this.pushState("CLASSDEFID"), 42;
          case 28:
            return this.popState(), 43;
          case 29:
            return this.pushState("CLASS"), 48;
          case 30:
            return this.popState(), this.pushState("CLASS_STYLE"), 49;
          case 31:
            return this.popState(), 50;
          case 32:
            return this.pushState("STYLE"), 45;
          case 33:
            return this.popState(), this.pushState("STYLEDEF_STYLES"), 46;
          case 34:
            return this.popState(), 47;
          case 35:
            return this.pushState("SCALE"), 17;
          case 36:
            return 18;
          case 37:
            this.popState();
            break;
          case 38:
            this.pushState("STATE");
            break;
          case 39:
            return this.popState(), n.yytext = n.yytext.slice(0, -8).trim(), 25;
          case 40:
            return this.popState(), n.yytext = n.yytext.slice(0, -8).trim(), 26;
          case 41:
            return this.popState(), n.yytext = n.yytext.slice(0, -10).trim(), 27;
          case 42:
            return this.popState(), n.yytext = n.yytext.slice(0, -8).trim(), 25;
          case 43:
            return this.popState(), n.yytext = n.yytext.slice(0, -8).trim(), 26;
          case 44:
            return this.popState(), n.yytext = n.yytext.slice(0, -10).trim(), 27;
          case 45:
            return 51;
          case 46:
            return 52;
          case 47:
            return 53;
          case 48:
            return 54;
          case 49:
            this.pushState("STATE_STRING");
            break;
          case 50:
            return this.pushState("STATE_ID"), "AS";
          case 51:
            return this.popState(), "ID";
          case 52:
            this.popState();
            break;
          case 53:
            return "STATE_DESCR";
          case 54:
            return 19;
          case 55:
            this.popState();
            break;
          case 56:
            return this.popState(), this.pushState("struct"), 20;
          case 57:
            break;
          case 58:
            return this.popState(), 21;
          case 59:
            break;
          case 60:
            return this.begin("NOTE"), 29;
          case 61:
            return this.popState(), this.pushState("NOTE_ID"), 59;
          case 62:
            return this.popState(), this.pushState("NOTE_ID"), 60;
          case 63:
            this.popState(), this.pushState("FLOATING_NOTE");
            break;
          case 64:
            return this.popState(), this.pushState("FLOATING_NOTE_ID"), "AS";
          case 65:
            break;
          case 66:
            return "NOTE_TEXT";
          case 67:
            return this.popState(), "ID";
          case 68:
            return this.popState(), this.pushState("NOTE_TEXT"), 24;
          case 69:
            return this.popState(), n.yytext = n.yytext.substr(2).trim(), 31;
          case 70:
            return this.popState(), n.yytext = n.yytext.slice(0, -8).trim(), 31;
          case 71:
            return 6;
          case 72:
            return 6;
          case 73:
            return 16;
          case 74:
            return 57;
          case 75:
            return 24;
          case 76:
            return n.yytext = n.yytext.trim(), 14;
          case 77:
            return 15;
          case 78:
            return 28;
          case 79:
            return 58;
          case 80:
            return 5;
          case 81:
            return "INVALID";
        }
      }, "anonymous"),
      rules: [/^(?:click\b)/i, /^(?:href\b)/i, /^(?:"[^"]*")/i, /^(?:default\b)/i, /^(?:.*direction\s+TB[^\n]*)/i, /^(?:.*direction\s+BT[^\n]*)/i, /^(?:.*direction\s+RL[^\n]*)/i, /^(?:.*direction\s+LR[^\n]*)/i, /^(?:%%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[\n]+)/i, /^(?:[\s]+)/i, /^(?:((?!\n)\s)+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:scale\s+)/i, /^(?:\d+)/i, /^(?:\s+width\b)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:classDef\s+)/i, /^(?:DEFAULT\s+)/i, /^(?:\w+\s+)/i, /^(?:[^\n]*)/i, /^(?:class\s+)/i, /^(?:(\w+)+((,\s*\w+)*))/i, /^(?:[^\n]*)/i, /^(?:style\s+)/i, /^(?:[\w,]+\s+)/i, /^(?:[^\n]*)/i, /^(?:scale\s+)/i, /^(?:\d+)/i, /^(?:\s+width\b)/i, /^(?:state\s+)/i, /^(?:.*<<fork>>)/i, /^(?:.*<<join>>)/i, /^(?:.*<<choice>>)/i, /^(?:.*\[\[fork\]\])/i, /^(?:.*\[\[join\]\])/i, /^(?:.*\[\[choice\]\])/i, /^(?:.*direction\s+TB[^\n]*)/i, /^(?:.*direction\s+BT[^\n]*)/i, /^(?:.*direction\s+RL[^\n]*)/i, /^(?:.*direction\s+LR[^\n]*)/i, /^(?:["])/i, /^(?:\s*as\s+)/i, /^(?:[^\n\{]*)/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:[^\n\s\{]+)/i, /^(?:\n)/i, /^(?:\{)/i, /^(?:%%(?!\{)[^\n]*)/i, /^(?:\})/i, /^(?:[\n])/i, /^(?:note\s+)/i, /^(?:left of\b)/i, /^(?:right of\b)/i, /^(?:")/i, /^(?:\s*as\s*)/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:[^\n]*)/i, /^(?:\s*[^:\n\s\-]+)/i, /^(?:\s*:[^:\n;]+)/i, /^(?:[\s\S]*?end note\b)/i, /^(?:stateDiagram\s+)/i, /^(?:stateDiagram-v2\s+)/i, /^(?:hide empty description\b)/i, /^(?:\[\*\])/i, /^(?:[^:\n\s\-\{]+)/i, /^(?:\s*:[^:\n;]+)/i, /^(?:-->)/i, /^(?:--)/i, /^(?::::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { LINE: { rules: [12, 13], inclusive: false }, struct: { rules: [12, 13, 25, 29, 32, 38, 45, 46, 47, 48, 57, 58, 59, 60, 74, 75, 76, 77, 78], inclusive: false }, FLOATING_NOTE_ID: { rules: [67], inclusive: false }, FLOATING_NOTE: { rules: [64, 65, 66], inclusive: false }, NOTE_TEXT: { rules: [69, 70], inclusive: false }, NOTE_ID: { rules: [68], inclusive: false }, NOTE: { rules: [61, 62, 63], inclusive: false }, STYLEDEF_STYLEOPTS: { rules: [], inclusive: false }, STYLEDEF_STYLES: { rules: [34], inclusive: false }, STYLE_IDS: { rules: [], inclusive: false }, STYLE: { rules: [33], inclusive: false }, CLASS_STYLE: { rules: [31], inclusive: false }, CLASS: { rules: [30], inclusive: false }, CLASSDEFID: { rules: [28], inclusive: false }, CLASSDEF: { rules: [26, 27], inclusive: false }, acc_descr_multiline: { rules: [23, 24], inclusive: false }, acc_descr: { rules: [21], inclusive: false }, acc_title: { rules: [19], inclusive: false }, SCALE: { rules: [16, 17, 36, 37], inclusive: false }, ALIAS: { rules: [], inclusive: false }, STATE_ID: { rules: [51], inclusive: false }, STATE_STRING: { rules: [52, 53], inclusive: false }, FORK_STATE: { rules: [], inclusive: false }, STATE: { rules: [12, 13, 39, 40, 41, 42, 43, 44, 49, 50, 54, 55, 56], inclusive: false }, ID: { rules: [12, 13], inclusive: false }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 18, 20, 22, 25, 29, 32, 35, 38, 56, 60, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81], inclusive: true } }
    };
    return V;
  }();
  gt.lexer = qt;
  function ht() {
    this.yy = {};
  }
  return m(ht, "Parser"), ht.prototype = gt, gt.Parser = ht, new ht();
}();
vt.parser = vt;
var Be = vt, de = "TB", Yt = "TB", Rt = "dir", q = "state", J = "root", Ct = "relation", fe = "classDef", pe = "style", Se = "applyClass", it = "default", Gt = "divider", Bt = "fill:none", Vt = "fill: #333", Mt = "c", Ut = "text", jt = "normal", bt = "rect", kt = "rectWithTitle", ye = "stateStart", ge = "stateEnd", It = "divider", Nt = "roundedWithTitle", Te = "note", Ee = "noteGroup", rt = "statediagram", _e = "state", me = `${rt}-${_e}`, Ht = "transition", De = "note", be = "note-edge", ke = `${Ht} ${be}`, ve = `${rt}-${De}`, Ce = "cluster", Ae = `${rt}-${Ce}`, xe = "cluster-alt", Le = `${rt}-${xe}`, zt = "parent", Wt = "note", Oe = "state", At = "----", Re = `${At}${Wt}`, wt = `${At}${zt}`, Kt = /* @__PURE__ */ m((e, t = Yt) => {
  if (!e.doc)
    return t;
  let s = t;
  for (const a of e.doc)
    a.stmt === "dir" && (s = a.value);
  return s;
}, "getDir"), Ie = /* @__PURE__ */ m(function(e, t) {
  return t.db.getClasses();
}, "getClasses"), Ne = /* @__PURE__ */ m(async function(e, t, s, a) {
  R.info("REF0:"), R.info("Drawing state diagram (v2)", t);
  const { securityLevel: i, state: l, layout: d$1 } = yt$1();
  a.db.extract(a.db.getRootDocV2());
  const S = a.db.getData(), p = g(t, i);
  S.type = a.type, S.layoutAlgorithm = d$1, S.nodeSpacing = (l == null ? void 0 : l.nodeSpacing) || 50, S.rankSpacing = (l == null ? void 0 : l.rankSpacing) || 50, S.markers = ["barb"], S.diagramId = t, await DI(S, p);
  const T = 8;
  try {
    (typeof a.db.getLinks == "function" ? a.db.getLinks() : /* @__PURE__ */ new Map()).forEach((m2, k) => {
      var I;
      const A = typeof k == "string" ? k : typeof (k == null ? void 0 : k.id) == "string" ? k.id : "";
      if (!A) {
        R.warn("⚠️ Invalid or missing stateId from key:", JSON.stringify(k));
        return;
      }
      const $ = (I = p.node()) == null ? void 0 : I.querySelectorAll("g");
      let x;
      if ($ == null || $.forEach((N) => {
        var P;
        ((P = N.textContent) == null ? void 0 : P.trim()) === A && (x = N);
      }), !x) {
        R.warn("⚠️ Could not find node matching text:", A);
        return;
      }
      const R$1 = x.parentNode;
      if (!R$1) {
        R.warn("⚠️ Node has no parent, cannot wrap:", A);
        return;
      }
      const u = document.createElementNS("http://www.w3.org/2000/svg", "a"), L = m2.url.replace(/^"+|"+$/g, "");
      if (u.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", L), u.setAttribute("target", "_blank"), m2.tooltip) {
        const N = m2.tooltip.replace(/^"+|"+$/g, "");
        u.setAttribute("title", N);
      }
      R$1.replaceChild(u, x), u.appendChild(x), R.info("🔗 Wrapped node in <a> tag for:", A, m2.url);
    });
  } catch (_) {
    R.error("❌ Error injecting clickable links:", _);
  }
  $e$1.insertTitle(
    p,
    "statediagramTitleText",
    (l == null ? void 0 : l.titleTopMargin) ?? 25,
    a.db.getDiagramTitle()
  ), d(p, T, rt, (l == null ? void 0 : l.useMaxWidth) ?? true);
}, "draw"), Ve = {
  getClasses: Ie,
  draw: Ne,
  getDir: Kt
}, St = /* @__PURE__ */ new Map(), M = 0;
function yt(e = "", t = 0, s = "", a = At) {
  const i = s !== null && s.length > 0 ? `${a}${s}` : "";
  return `${Oe}-${e}${i}-${t}`;
}
m(yt, "stateDomId");
var we = /* @__PURE__ */ m((e, t, s, a, i, l, d2, S) => {
  R.trace("items", t), t.forEach((p) => {
    switch (p.stmt) {
      case q:
        st(e, p, s, a, i, l, d2, S);
        break;
      case it:
        st(e, p, s, a, i, l, d2, S);
        break;
      case Ct:
        {
          st(
            e,
            p.state1,
            s,
            a,
            i,
            l,
            d2,
            S
          ), st(
            e,
            p.state2,
            s,
            a,
            i,
            l,
            d2,
            S
          );
          const T = {
            id: "edge" + M,
            start: p.state1.id,
            end: p.state2.id,
            arrowhead: "normal",
            arrowTypeEnd: "arrow_barb",
            style: Bt,
            labelStyle: "",
            label: Ii.sanitizeText(p.description ?? "", yt$1()),
            arrowheadStyle: Vt,
            labelpos: Mt,
            labelType: Ut,
            thickness: jt,
            classes: Ht,
            look: d2
          };
          i.push(T), M++;
        }
        break;
    }
  });
}, "setupDoc"), $t = /* @__PURE__ */ m((e, t = Yt) => {
  let s = t;
  if (e.doc)
    for (const a of e.doc)
      a.stmt === "dir" && (s = a.value);
  return s;
}, "getDir");
function et(e, t, s) {
  if (!t.id || t.id === "</join></fork>" || t.id === "</choice>")
    return;
  t.cssClasses && (Array.isArray(t.cssCompiledStyles) || (t.cssCompiledStyles = []), t.cssClasses.split(" ").forEach((i) => {
    const l = s.get(i);
    l && (t.cssCompiledStyles = [...t.cssCompiledStyles ?? [], ...l.styles]);
  }));
  const a = e.find((i) => i.id === t.id);
  a ? Object.assign(a, t) : e.push(t);
}
m(et, "insertOrUpdateNode");
function Xt(e) {
  var t;
  return ((t = e == null ? void 0 : e.classes) == null ? void 0 : t.join(" ")) ?? "";
}
m(Xt, "getClassesFromDbInfo");
function Jt(e) {
  return (e == null ? void 0 : e.styles) ?? [];
}
m(Jt, "getStylesFromDbInfo");
var st = /* @__PURE__ */ m((e, t, s, a, i, l, d2, S) => {
  var A, $, x;
  const p = t.id, T = s.get(p), _ = Xt(T), m2 = Jt(T), k = yt$1();
  if (R.info("dataFetcher parsedItem", t, T, m2), p !== "root") {
    let R$1 = bt;
    t.start === true ? R$1 = ye : t.start === false && (R$1 = ge), t.type !== it && (R$1 = t.type), St.get(p) || St.set(p, {
      id: p,
      shape: R$1,
      description: Ii.sanitizeText(p, k),
      cssClasses: `${_} ${me}`,
      cssStyles: m2
    });
    const u = St.get(p);
    t.description && (Array.isArray(u.description) ? (u.shape = kt, u.description.push(t.description)) : (A = u.description) != null && A.length && u.description.length > 0 ? (u.shape = kt, u.description === p ? u.description = [t.description] : u.description = [u.description, t.description]) : (u.shape = bt, u.description = t.description), u.description = Ii.sanitizeTextOrArray(u.description, k)), (($ = u.description) == null ? void 0 : $.length) === 1 && u.shape === kt && (u.type === "group" ? u.shape = Nt : u.shape = bt), !u.type && t.doc && (R.info("Setting cluster for XCX", p, $t(t)), u.type = "group", u.isGroup = true, u.dir = $t(t), u.shape = t.type === Gt ? It : Nt, u.cssClasses = `${u.cssClasses} ${Ae} ${l ? Le : ""}`);
    const L = {
      labelStyle: "",
      shape: u.shape,
      label: u.description,
      cssClasses: u.cssClasses,
      cssCompiledStyles: [],
      cssStyles: u.cssStyles,
      id: p,
      dir: u.dir,
      domId: yt(p, M),
      type: u.type,
      isGroup: u.type === "group",
      padding: 8,
      rx: 10,
      ry: 10,
      look: d2
    };
    if (L.shape === It && (L.label = ""), e && e.id !== "root" && (R.trace("Setting node ", p, " to be child of its parent ", e.id), L.parentId = e.id), L.centerLabel = true, t.note) {
      const I = {
        labelStyle: "",
        shape: Te,
        label: t.note.text,
        cssClasses: ve,
        // useHtmlLabels: false,
        cssStyles: [],
        cssCompiledStyles: [],
        id: p + Re + "-" + M,
        domId: yt(p, M, Wt),
        type: u.type,
        isGroup: u.type === "group",
        padding: (x = k.flowchart) == null ? void 0 : x.padding,
        look: d2,
        position: t.note.position
      }, N = p + wt, G = {
        labelStyle: "",
        shape: Ee,
        label: t.note.text,
        cssClasses: u.cssClasses,
        cssStyles: [],
        id: p + wt,
        domId: yt(p, M, zt),
        type: "group",
        isGroup: true,
        padding: 16,
        //getConfig().flowchart.padding
        look: d2,
        position: t.note.position
      };
      M++, G.id = N, I.parentId = N, et(a, G, S), et(a, I, S), et(a, L, S);
      let P = p, B = I.id;
      t.note.position === "left of" && (P = I.id, B = p), i.push({
        id: P + "-" + B,
        start: P,
        end: B,
        arrowhead: "none",
        arrowTypeEnd: "",
        style: Bt,
        labelStyle: "",
        classes: ke,
        arrowheadStyle: Vt,
        labelpos: Mt,
        labelType: Ut,
        thickness: jt,
        look: d2
      });
    } else
      et(a, L, S);
  }
  t.doc && (R.trace("Adding nodes children "), we(t, t.doc, s, a, i, !l, d2, S));
}, "dataFetcher"), $e = /* @__PURE__ */ m(() => {
  St.clear(), M = 0;
}, "reset"), v = {
  START_NODE: "[*]",
  START_TYPE: "start",
  END_NODE: "[*]",
  END_TYPE: "end",
  COLOR_KEYWORD: "color",
  FILL_KEYWORD: "fill",
  BG_FILL: "bgFill",
  STYLECLASS_SEP: ","
}, Pt = /* @__PURE__ */ m(() => /* @__PURE__ */ new Map(), "newClassesList"), Ft = /* @__PURE__ */ m(() => ({
  relations: [],
  states: /* @__PURE__ */ new Map(),
  documents: {}
}), "newDoc"), pt = /* @__PURE__ */ m((e) => JSON.parse(JSON.stringify(e)), "clone"), Q, Me = (Q = class {
  constructor(t) {
    this.version = t, this.nodes = [], this.edges = [], this.rootDoc = [], this.classes = Pt(), this.documents = { root: Ft() }, this.currentDocument = this.documents.root, this.startEndCount = 0, this.dividerCnt = 0, this.links = /* @__PURE__ */ new Map(), this.getAccTitle = x5, this.setAccTitle = b5, this.getAccDescription = w5, this.setAccDescription = y5, this.setDiagramTitle = k5, this.getDiagramTitle = _5, this.clear(), this.setRootDoc = this.setRootDoc.bind(this), this.getDividerId = this.getDividerId.bind(this), this.setDirection = this.setDirection.bind(this), this.trimColon = this.trimColon.bind(this);
  }
  /**
   * Convert all of the statements (stmts) that were parsed into states and relationships.
   * This is done because a state diagram may have nested sections,
   * where each section is a 'document' and has its own set of statements.
   * Ex: the section within a fork has its own statements, and incoming and outgoing statements
   * refer to the fork as a whole (document).
   * See the parser grammar:  the definition of a document is a document then a 'line', where a line can be a statement.
   * This will push the statement into the list of statements for the current document.
   */
  extract(t) {
    this.clear(true);
    for (const i of Array.isArray(t) ? t : t.doc)
      switch (i.stmt) {
        case q:
          this.addState(i.id.trim(), i.type, i.doc, i.description, i.note);
          break;
        case Ct:
          this.addRelation(i.state1, i.state2, i.description);
          break;
        case fe:
          this.addStyleClass(i.id.trim(), i.classes);
          break;
        case pe:
          this.handleStyleDef(i);
          break;
        case Se:
          this.setCssClass(i.id.trim(), i.styleClass);
          break;
        case "click":
          this.addLink(i.id, i.url, i.tooltip);
          break;
      }
    const s = this.getStates(), a = yt$1();
    $e(), st(
      void 0,
      this.getRootDocV2(),
      s,
      this.nodes,
      this.edges,
      true,
      a.look,
      this.classes
    );
    for (const i of this.nodes)
      if (Array.isArray(i.label)) {
        if (i.description = i.label.slice(1), i.isGroup && i.description.length > 0)
          throw new Error(
            `Group nodes can only have label. Remove the additional description for node [${i.id}]`
          );
        i.label = i.label[0];
      }
  }
  handleStyleDef(t) {
    const s = t.id.trim().split(","), a = t.styleClass.split(",");
    for (const i of s) {
      let l = this.getState(i);
      if (!l) {
        const d2 = i.trim();
        this.addState(d2), l = this.getState(d2);
      }
      l && (l.styles = a.map((d2) => {
        var S;
        return (S = d2.replace(/;/g, "")) == null ? void 0 : S.trim();
      }));
    }
  }
  setRootDoc(t) {
    R.info("Setting root doc", t), this.rootDoc = t, this.version === 1 ? this.extract(t) : this.extract(this.getRootDocV2());
  }
  docTranslator(t, s, a) {
    if (s.stmt === Ct) {
      this.docTranslator(t, s.state1, true), this.docTranslator(t, s.state2, false);
      return;
    }
    if (s.stmt === q && (s.id === v.START_NODE ? (s.id = t.id + (a ? "_start" : "_end"), s.start = a) : s.id = s.id.trim()), s.stmt !== J && s.stmt !== q || !s.doc)
      return;
    const i = [];
    let l = [];
    for (const d2 of s.doc)
      if (d2.type === Gt) {
        const S = pt(d2);
        S.doc = pt(l), i.push(S), l = [];
      } else
        l.push(d2);
    if (i.length > 0 && l.length > 0) {
      const d2 = {
        stmt: q,
        id: wM(),
        type: "divider",
        doc: pt(l)
      };
      i.push(pt(d2)), s.doc = i;
    }
    s.doc.forEach((d2) => this.docTranslator(s, d2, true));
  }
  getRootDocV2() {
    return this.docTranslator(
      { id: J, stmt: J },
      { id: J, stmt: J, doc: this.rootDoc },
      true
    ), { id: J, doc: this.rootDoc };
  }
  /**
   * Function called by parser when a node definition has been found.
   *
   * @param descr - description for the state. Can be a string or a list or strings
   * @param classes - class styles to apply to this state. Can be a string (1 style) or an array of styles. If it's just 1 class, convert it to an array of that 1 class.
   * @param styles - styles to apply to this state. Can be a string (1 style) or an array of styles. If it's just 1 style, convert it to an array of that 1 style.
   * @param textStyles - text styles to apply to this state. Can be a string (1 text test) or an array of text styles. If it's just 1 text style, convert it to an array of that 1 text style.
   */
  addState(t, s = it, a = void 0, i = void 0, l = void 0, d2 = void 0, S = void 0, p = void 0) {
    const T = t == null ? void 0 : t.trim();
    if (!this.currentDocument.states.has(T))
      R.info("Adding state ", T, i), this.currentDocument.states.set(T, {
        stmt: q,
        id: T,
        descriptions: [],
        type: s,
        doc: a,
        note: l,
        classes: [],
        styles: [],
        textStyles: []
      });
    else {
      const _ = this.currentDocument.states.get(T);
      if (!_)
        throw new Error(`State not found: ${T}`);
      _.doc || (_.doc = a), _.type || (_.type = s);
    }
    if (i && (R.info("Setting state description", T, i), (Array.isArray(i) ? i : [i]).forEach((m2) => this.addDescription(T, m2.trim()))), l) {
      const _ = this.currentDocument.states.get(T);
      if (!_)
        throw new Error(`State not found: ${T}`);
      _.note = l, _.note.text = Ii.sanitizeText(_.note.text, yt$1());
    }
    d2 && (R.info("Setting state classes", T, d2), (Array.isArray(d2) ? d2 : [d2]).forEach((m2) => this.setCssClass(T, m2.trim()))), S && (R.info("Setting state styles", T, S), (Array.isArray(S) ? S : [S]).forEach((m2) => this.setStyle(T, m2.trim()))), p && (R.info("Setting state styles", T, S), (Array.isArray(p) ? p : [p]).forEach((m2) => this.setTextStyle(T, m2.trim())));
  }
  clear(t) {
    this.nodes = [], this.edges = [], this.documents = { root: Ft() }, this.currentDocument = this.documents.root, this.startEndCount = 0, this.classes = Pt(), t || (this.links = /* @__PURE__ */ new Map(), m5());
  }
  getState(t) {
    return this.currentDocument.states.get(t);
  }
  getStates() {
    return this.currentDocument.states;
  }
  logDocuments() {
    R.info("Documents = ", this.documents);
  }
  getRelations() {
    return this.currentDocument.relations;
  }
  /**
   * Adds a clickable link to a state.
   */
  addLink(t, s, a) {
    this.links.set(t, { url: s, tooltip: a }), R.warn("Adding link", t, s, a);
  }
  /**
   * Get all registered links.
   */
  getLinks() {
    return this.links;
  }
  /**
   * If the id is a start node ( [*] ), then return a new id constructed from
   * the start node name and the current start node count.
   * else return the given id
   */
  startIdIfNeeded(t = "") {
    return t === v.START_NODE ? (this.startEndCount++, `${v.START_TYPE}${this.startEndCount}`) : t;
  }
  /**
   * If the id is a start node ( [*] ), then return the start type ('start')
   * else return the given type
   */
  startTypeIfNeeded(t = "", s = it) {
    return t === v.START_NODE ? v.START_TYPE : s;
  }
  /**
   * If the id is an end node ( [*] ), then return a new id constructed from
   * the end node name and the current start_end node count.
   * else return the given id
   */
  endIdIfNeeded(t = "") {
    return t === v.END_NODE ? (this.startEndCount++, `${v.END_TYPE}${this.startEndCount}`) : t;
  }
  /**
   * If the id is an end node ( [*] ), then return the end type
   * else return the given type
   *
   */
  endTypeIfNeeded(t = "", s = it) {
    return t === v.END_NODE ? v.END_TYPE : s;
  }
  addRelationObjs(t, s, a = "") {
    const i = this.startIdIfNeeded(t.id.trim()), l = this.startTypeIfNeeded(t.id.trim(), t.type), d2 = this.startIdIfNeeded(s.id.trim()), S = this.startTypeIfNeeded(s.id.trim(), s.type);
    this.addState(
      i,
      l,
      t.doc,
      t.description,
      t.note,
      t.classes,
      t.styles,
      t.textStyles
    ), this.addState(
      d2,
      S,
      s.doc,
      s.description,
      s.note,
      s.classes,
      s.styles,
      s.textStyles
    ), this.currentDocument.relations.push({
      id1: i,
      id2: d2,
      relationTitle: Ii.sanitizeText(a, yt$1())
    });
  }
  /**
   * Add a relation between two items.  The items may be full objects or just the string id of a state.
   */
  addRelation(t, s, a) {
    if (typeof t == "object" && typeof s == "object")
      this.addRelationObjs(t, s, a);
    else if (typeof t == "string" && typeof s == "string") {
      const i = this.startIdIfNeeded(t.trim()), l = this.startTypeIfNeeded(t), d2 = this.endIdIfNeeded(s.trim()), S = this.endTypeIfNeeded(s);
      this.addState(i, l), this.addState(d2, S), this.currentDocument.relations.push({
        id1: i,
        id2: d2,
        relationTitle: a ? Ii.sanitizeText(a, yt$1()) : void 0
      });
    }
  }
  addDescription(t, s) {
    var l;
    const a = this.currentDocument.states.get(t), i = s.startsWith(":") ? s.replace(":", "").trim() : s;
    (l = a == null ? void 0 : a.descriptions) == null || l.push(Ii.sanitizeText(i, yt$1()));
  }
  cleanupLabel(t) {
    return t.startsWith(":") ? t.slice(2).trim() : t.trim();
  }
  getDividerId() {
    return this.dividerCnt++, `divider-id-${this.dividerCnt}`;
  }
  /**
   * Called when the parser comes across a (style) class definition
   * @example classDef my-style fill:#f96;
   *
   * @param id - the id of this (style) class
   * @param styleAttributes - the string with 1 or more style attributes (each separated by a comma)
   */
  addStyleClass(t, s = "") {
    this.classes.has(t) || this.classes.set(t, { id: t, styles: [], textStyles: [] });
    const a = this.classes.get(t);
    s && a && s.split(v.STYLECLASS_SEP).forEach((i) => {
      const l = i.replace(/([^;]*);/, "$1").trim();
      if (RegExp(v.COLOR_KEYWORD).exec(i)) {
        const S = l.replace(v.FILL_KEYWORD, v.BG_FILL).replace(v.COLOR_KEYWORD, v.FILL_KEYWORD);
        a.textStyles.push(S);
      }
      a.styles.push(l);
    });
  }
  getClasses() {
    return this.classes;
  }
  /**
   * Add a (style) class or css class to a state with the given id.
   * If the state isn't already in the list of known states, add it.
   * Might be called by parser when a style class or CSS class should be applied to a state
   *
   * @param itemIds - The id or a list of ids of the item(s) to apply the css class to
   * @param cssClassName - CSS class name
   */
  setCssClass(t, s) {
    t.split(",").forEach((a) => {
      var l;
      let i = this.getState(a);
      if (!i) {
        const d2 = a.trim();
        this.addState(d2), i = this.getState(d2);
      }
      (l = i == null ? void 0 : i.classes) == null || l.push(s);
    });
  }
  /**
   * Add a style to a state with the given id.
   * @example style stateId fill:#f9f,stroke:#333,stroke-width:4px
   *   where 'style' is the keyword
   *   stateId is the id of a state
   *   the rest of the string is the styleText (all of the attributes to be applied to the state)
   *
   * @param itemId - The id of item to apply the style to
   * @param styleText - the text of the attributes for the style
   */
  setStyle(t, s) {
    var a, i;
    (i = (a = this.getState(t)) == null ? void 0 : a.styles) == null || i.push(s);
  }
  /**
   * Add a text style to a state with the given id
   *
   * @param itemId - The id of item to apply the css class to
   * @param cssClassName - CSS class name
   */
  setTextStyle(t, s) {
    var a, i;
    (i = (a = this.getState(t)) == null ? void 0 : a.textStyles) == null || i.push(s);
  }
  /**
   * Finds the direction statement in the root document.
   * @returns the direction statement if present
   */
  getDirectionStatement() {
    return this.rootDoc.find((t) => t.stmt === Rt);
  }
  getDirection() {
    var t;
    return ((t = this.getDirectionStatement()) == null ? void 0 : t.value) ?? de;
  }
  setDirection(t) {
    const s = this.getDirectionStatement();
    s ? s.value = t : this.rootDoc.unshift({ stmt: Rt, value: t });
  }
  trimColon(t) {
    return t.startsWith(":") ? t.slice(1).trim() : t.trim();
  }
  getData() {
    const t = yt$1();
    return {
      nodes: this.nodes,
      edges: this.edges,
      other: {},
      config: t,
      direction: Kt(this.getRootDocV2())
    };
  }
  getConfig() {
    return yt$1().state;
  }
}, m(Q, "StateDB"), Q.relationType = {
  AGGREGATION: 0,
  EXTENSION: 1,
  COMPOSITION: 2,
  DEPENDENCY: 3
}, Q), Pe = /* @__PURE__ */ m((e) => `
defs #statediagram-barbEnd {
    fill: ${e.transitionColor};
    stroke: ${e.transitionColor};
  }
g.stateGroup text {
  fill: ${e.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${e.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${e.stateLabelColor};
}

g.stateGroup rect {
  fill: ${e.mainBkg};
  stroke: ${e.nodeBorder};
}

g.stateGroup line {
  stroke: ${e.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${e.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${e.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${e.noteBorderColor};
  fill: ${e.noteBkgColor};

  text {
    fill: ${e.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${e.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${e.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${e.edgeLabelBackground};
  p {
    background-color: ${e.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${e.edgeLabelBackground};
    fill: ${e.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${e.transitionLabelColor || e.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${e.transitionLabelColor || e.tertiaryTextColor};
}

.stateLabel text {
  fill: ${e.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${e.specialStateColor};
  stroke: ${e.specialStateColor};
}

.node .fork-join {
  fill: ${e.specialStateColor};
  stroke: ${e.specialStateColor};
}

.node circle.state-end {
  fill: ${e.innerEndBackground};
  stroke: ${e.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${e.compositeBackground || e.background};
  // stroke: ${e.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${e.stateBkg || e.mainBkg};
  stroke: ${e.stateBorder || e.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${e.mainBkg};
  stroke: ${e.stateBorder || e.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${e.lineColor};
}

.statediagram-cluster rect {
  fill: ${e.compositeTitleBackground};
  stroke: ${e.stateBorder || e.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${e.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${e.stateBorder || e.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${e.compositeBackground || e.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${e.altBackground ? e.altBackground : "#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${e.altBackground ? e.altBackground : "#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${e.noteBkgColor};
  stroke: ${e.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${e.noteBkgColor};
  stroke: ${e.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${e.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${e.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${e.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${e.lineColor};
  stroke: ${e.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${e.textColor};
}
`, "getStyles"), Ue = Pe;
export {
  Be as B,
  Me as M,
  Ue as U,
  Ve as V
};
