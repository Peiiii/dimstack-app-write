import { g as getDefaultExportFromCjs } from "./chakra-ui-31f48106.js";
import { c as commonjsRequire } from "./_commonjs-dynamic-modules-58f2b0ec.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var pica$2 = { exports: {} };
/*!

pica
https://github.com/nodeca/pica

*/
(function(module, exports) {
  (function(f) {
    {
      module.exports = f();
    }
  })(function() {
    return function() {
      function r(e, n, t) {
        function o(i2, f) {
          if (!n[i2]) {
            if (!e[i2]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f && c)
                return c(i2, true);
              if (u)
                return u(i2, true);
              var a = new Error("Cannot find module '" + i2 + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var p = n[i2] = { exports: {} };
            e[i2][0].call(p.exports, function(r2) {
              var n2 = e[i2][1][r2];
              return o(n2 || r2);
            }, p, p.exports, r, e, n, t);
          }
          return n[i2].exports;
        }
        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++)
          o(t[i]);
        return o;
      }
      return r;
    }()({ 1: [function(_dereq_, module2, exports2) {
      var inherits = _dereq_("inherits");
      var Multimath = _dereq_("multimath");
      var mm_unsharp_mask = _dereq_("./mm_unsharp_mask");
      var mm_resize = _dereq_("./mm_resize");
      function MathLib(requested_features) {
        var __requested_features = requested_features || [];
        var features = {
          js: __requested_features.indexOf("js") >= 0,
          wasm: __requested_features.indexOf("wasm") >= 0
        };
        Multimath.call(this, features);
        this.features = {
          js: features.js,
          wasm: features.wasm && this.has_wasm()
        };
        this.use(mm_unsharp_mask);
        this.use(mm_resize);
      }
      inherits(MathLib, Multimath);
      MathLib.prototype.resizeAndUnsharp = function resizeAndUnsharp(options, cache) {
        var result = this.resize(options, cache);
        if (options.unsharpAmount) {
          this.unsharp_mask(result, options.toWidth, options.toHeight, options.unsharpAmount, options.unsharpRadius, options.unsharpThreshold);
        }
        return result;
      };
      module2.exports = MathLib;
    }, { "./mm_resize": 4, "./mm_unsharp_mask": 9, "inherits": 19, "multimath": 20 }], 2: [function(_dereq_, module2, exports2) {
      function clampTo8(i) {
        return i < 0 ? 0 : i > 255 ? 255 : i;
      }
      function convolveHorizontally(src, dest, srcW, srcH, destW, filters) {
        var r, g, b, a;
        var filterPtr, filterShift, filterSize;
        var srcPtr, srcY, destX, filterVal;
        var srcOffset = 0, destOffset = 0;
        for (srcY = 0; srcY < srcH; srcY++) {
          filterPtr = 0;
          for (destX = 0; destX < destW; destX++) {
            filterShift = filters[filterPtr++];
            filterSize = filters[filterPtr++];
            srcPtr = srcOffset + filterShift * 4 | 0;
            r = g = b = a = 0;
            for (; filterSize > 0; filterSize--) {
              filterVal = filters[filterPtr++];
              a = a + filterVal * src[srcPtr + 3] | 0;
              b = b + filterVal * src[srcPtr + 2] | 0;
              g = g + filterVal * src[srcPtr + 1] | 0;
              r = r + filterVal * src[srcPtr] | 0;
              srcPtr = srcPtr + 4 | 0;
            }
            dest[destOffset + 3] = clampTo8(
              a + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            dest[destOffset + 2] = clampTo8(
              b + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            dest[destOffset + 1] = clampTo8(
              g + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            dest[destOffset] = clampTo8(
              r + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            destOffset = destOffset + srcH * 4 | 0;
          }
          destOffset = (srcY + 1) * 4 | 0;
          srcOffset = (srcY + 1) * srcW * 4 | 0;
        }
      }
      function convolveVertically(src, dest, srcW, srcH, destW, filters) {
        var r, g, b, a;
        var filterPtr, filterShift, filterSize;
        var srcPtr, srcY, destX, filterVal;
        var srcOffset = 0, destOffset = 0;
        for (srcY = 0; srcY < srcH; srcY++) {
          filterPtr = 0;
          for (destX = 0; destX < destW; destX++) {
            filterShift = filters[filterPtr++];
            filterSize = filters[filterPtr++];
            srcPtr = srcOffset + filterShift * 4 | 0;
            r = g = b = a = 0;
            for (; filterSize > 0; filterSize--) {
              filterVal = filters[filterPtr++];
              a = a + filterVal * src[srcPtr + 3] | 0;
              b = b + filterVal * src[srcPtr + 2] | 0;
              g = g + filterVal * src[srcPtr + 1] | 0;
              r = r + filterVal * src[srcPtr] | 0;
              srcPtr = srcPtr + 4 | 0;
            }
            dest[destOffset + 3] = clampTo8(
              a + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            dest[destOffset + 2] = clampTo8(
              b + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            dest[destOffset + 1] = clampTo8(
              g + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            dest[destOffset] = clampTo8(
              r + (1 << 13) >> 14
              /*FIXED_FRAC_BITS*/
            );
            destOffset = destOffset + srcH * 4 | 0;
          }
          destOffset = (srcY + 1) * 4 | 0;
          srcOffset = (srcY + 1) * srcW * 4 | 0;
        }
      }
      module2.exports = {
        convolveHorizontally,
        convolveVertically
      };
    }, {}], 3: [function(_dereq_, module2, exports2) {
      module2.exports = "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEXA2AAAGAGf39/f39/AGAHf39/f39/fwACDwEDZW52Bm1lbW9yeQIAAAMEAwABAgYGAX8AQQALB1cFEV9fd2FzbV9jYWxsX2N0b3JzAAAIY29udm9sdmUAAQpjb252b2x2ZUhWAAIMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAK7AMDAwABC8YDAQ9/AkAgA0UNACAERQ0AA0AgDCENQQAhE0EAIQcDQCAHQQJqIQYCfyAHQQF0IAVqIgcuAQIiFEUEQEGAwAAhCEGAwAAhCUGAwAAhCkGAwAAhCyAGDAELIBIgBy4BAGohCEEAIQsgFCEHQQAhDiAGIQlBACEPQQAhEANAIAUgCUEBdGouAQAiESAAIAhBAnRqKAIAIgpBGHZsIBBqIRAgCkH/AXEgEWwgC2ohCyAKQRB2Qf8BcSARbCAPaiEPIApBCHZB/wFxIBFsIA5qIQ4gCEEBaiEIIAlBAWohCSAHQQFrIgcNAAsgC0GAQGshCCAOQYBAayEJIA9BgEBrIQogEEGAQGshCyAGIBRqCyEHIAEgDUECdGogCUEOdSIGQf8BIAZB/wFIGyIGQQAgBkEAShtBCHRBgP4DcSAKQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EQdEGAgPwHcSALQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobcjYCACADIA1qIQ0gE0EBaiITIARHDQALIAxBAWoiDCACbCESIAMgDEcNAAsLCx4AQQAgAiADIAQgBSAAEAEgAkEAIAQgBSAGIAEQAQs=";
    }, {}], 4: [function(_dereq_, module2, exports2) {
      module2.exports = {
        name: "resize",
        fn: _dereq_("./resize"),
        wasm_fn: _dereq_("./resize_wasm"),
        wasm_src: _dereq_("./convolve_wasm_base64")
      };
    }, { "./convolve_wasm_base64": 3, "./resize": 5, "./resize_wasm": 8 }], 5: [function(_dereq_, module2, exports2) {
      var createFilters = _dereq_("./resize_filter_gen");
      var convolveHorizontally = _dereq_("./convolve").convolveHorizontally;
      var convolveVertically = _dereq_("./convolve").convolveVertically;
      function resetAlpha(dst, width, height) {
        var ptr = 3, len = width * height * 4 | 0;
        while (ptr < len) {
          dst[ptr] = 255;
          ptr = ptr + 4 | 0;
        }
      }
      module2.exports = function resize(options) {
        var src = options.src;
        var srcW = options.width;
        var srcH = options.height;
        var destW = options.toWidth;
        var destH = options.toHeight;
        var scaleX = options.scaleX || options.toWidth / options.width;
        var scaleY = options.scaleY || options.toHeight / options.height;
        var offsetX = options.offsetX || 0;
        var offsetY = options.offsetY || 0;
        var dest = options.dest || new Uint8Array(destW * destH * 4);
        var quality = typeof options.quality === "undefined" ? 3 : options.quality;
        var alpha = options.alpha || false;
        var filtersX = createFilters(quality, srcW, destW, scaleX, offsetX), filtersY = createFilters(quality, srcH, destH, scaleY, offsetY);
        var tmp = new Uint8Array(destW * srcH * 4);
        convolveHorizontally(src, tmp, srcW, srcH, destW, filtersX);
        convolveVertically(tmp, dest, srcH, destW, destH, filtersY);
        if (!alpha)
          resetAlpha(dest, destW, destH);
        return dest;
      };
    }, { "./convolve": 2, "./resize_filter_gen": 6 }], 6: [function(_dereq_, module2, exports2) {
      var FILTER_INFO = _dereq_("./resize_filter_info");
      var FIXED_FRAC_BITS = 14;
      function toFixedPoint(num) {
        return Math.round(num * ((1 << FIXED_FRAC_BITS) - 1));
      }
      module2.exports = function resizeFilterGen(quality, srcSize, destSize, scale, offset) {
        var filterFunction = FILTER_INFO[quality].filter;
        var scaleInverted = 1 / scale;
        var scaleClamped = Math.min(1, scale);
        var srcWindow = FILTER_INFO[quality].win / scaleClamped;
        var destPixel, srcPixel, srcFirst, srcLast, filterElementSize, floatFilter, fxpFilter, total, pxl, idx, floatVal, filterTotal, filterVal;
        var leftNotEmpty, rightNotEmpty, filterShift, filterSize;
        var maxFilterElementSize = Math.floor((srcWindow + 1) * 2);
        var packedFilter = new Int16Array((maxFilterElementSize + 2) * destSize);
        var packedFilterPtr = 0;
        var slowCopy = !packedFilter.subarray || !packedFilter.set;
        for (destPixel = 0; destPixel < destSize; destPixel++) {
          srcPixel = (destPixel + 0.5) * scaleInverted + offset;
          srcFirst = Math.max(0, Math.floor(srcPixel - srcWindow));
          srcLast = Math.min(srcSize - 1, Math.ceil(srcPixel + srcWindow));
          filterElementSize = srcLast - srcFirst + 1;
          floatFilter = new Float32Array(filterElementSize);
          fxpFilter = new Int16Array(filterElementSize);
          total = 0;
          for (pxl = srcFirst, idx = 0; pxl <= srcLast; pxl++, idx++) {
            floatVal = filterFunction((pxl + 0.5 - srcPixel) * scaleClamped);
            total += floatVal;
            floatFilter[idx] = floatVal;
          }
          filterTotal = 0;
          for (idx = 0; idx < floatFilter.length; idx++) {
            filterVal = floatFilter[idx] / total;
            filterTotal += filterVal;
            fxpFilter[idx] = toFixedPoint(filterVal);
          }
          fxpFilter[destSize >> 1] += toFixedPoint(1 - filterTotal);
          leftNotEmpty = 0;
          while (leftNotEmpty < fxpFilter.length && fxpFilter[leftNotEmpty] === 0) {
            leftNotEmpty++;
          }
          if (leftNotEmpty < fxpFilter.length) {
            rightNotEmpty = fxpFilter.length - 1;
            while (rightNotEmpty > 0 && fxpFilter[rightNotEmpty] === 0) {
              rightNotEmpty--;
            }
            filterShift = srcFirst + leftNotEmpty;
            filterSize = rightNotEmpty - leftNotEmpty + 1;
            packedFilter[packedFilterPtr++] = filterShift;
            packedFilter[packedFilterPtr++] = filterSize;
            if (!slowCopy) {
              packedFilter.set(fxpFilter.subarray(leftNotEmpty, rightNotEmpty + 1), packedFilterPtr);
              packedFilterPtr += filterSize;
            } else {
              for (idx = leftNotEmpty; idx <= rightNotEmpty; idx++) {
                packedFilter[packedFilterPtr++] = fxpFilter[idx];
              }
            }
          } else {
            packedFilter[packedFilterPtr++] = 0;
            packedFilter[packedFilterPtr++] = 0;
          }
        }
        return packedFilter;
      };
    }, { "./resize_filter_info": 7 }], 7: [function(_dereq_, module2, exports2) {
      module2.exports = [{
        // Nearest neibor (Box)
        win: 0.5,
        filter: function filter(x) {
          return x >= -0.5 && x < 0.5 ? 1 : 0;
        }
      }, {
        // Hamming
        win: 1,
        filter: function filter(x) {
          if (x <= -1 || x >= 1) {
            return 0;
          }
          if (x > -11920929e-14 && x < 11920929e-14) {
            return 1;
          }
          var xpi = x * Math.PI;
          return Math.sin(xpi) / xpi * (0.54 + 0.46 * Math.cos(xpi / 1));
        }
      }, {
        // Lanczos, win = 2
        win: 2,
        filter: function filter(x) {
          if (x <= -2 || x >= 2) {
            return 0;
          }
          if (x > -11920929e-14 && x < 11920929e-14) {
            return 1;
          }
          var xpi = x * Math.PI;
          return Math.sin(xpi) / xpi * Math.sin(xpi / 2) / (xpi / 2);
        }
      }, {
        // Lanczos, win = 3
        win: 3,
        filter: function filter(x) {
          if (x <= -3 || x >= 3) {
            return 0;
          }
          if (x > -11920929e-14 && x < 11920929e-14) {
            return 1;
          }
          var xpi = x * Math.PI;
          return Math.sin(xpi) / xpi * Math.sin(xpi / 3) / (xpi / 3);
        }
      }];
    }, {}], 8: [function(_dereq_, module2, exports2) {
      var createFilters = _dereq_("./resize_filter_gen");
      function resetAlpha(dst, width, height) {
        var ptr = 3, len = width * height * 4 | 0;
        while (ptr < len) {
          dst[ptr] = 255;
          ptr = ptr + 4 | 0;
        }
      }
      function asUint8Array(src) {
        return new Uint8Array(src.buffer, 0, src.byteLength);
      }
      var IS_LE = true;
      try {
        IS_LE = new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0] === 1;
      } catch (__) {
      }
      function copyInt16asLE(src, target, target_offset) {
        if (IS_LE) {
          target.set(asUint8Array(src), target_offset);
          return;
        }
        for (var ptr = target_offset, i = 0; i < src.length; i++) {
          var data = src[i];
          target[ptr++] = data & 255;
          target[ptr++] = data >> 8 & 255;
        }
      }
      module2.exports = function resize_wasm(options) {
        var src = options.src;
        var srcW = options.width;
        var srcH = options.height;
        var destW = options.toWidth;
        var destH = options.toHeight;
        var scaleX = options.scaleX || options.toWidth / options.width;
        var scaleY = options.scaleY || options.toHeight / options.height;
        var offsetX = options.offsetX || 0;
        var offsetY = options.offsetY || 0;
        var dest = options.dest || new Uint8Array(destW * destH * 4);
        var quality = typeof options.quality === "undefined" ? 3 : options.quality;
        var alpha = options.alpha || false;
        var filtersX = createFilters(quality, srcW, destW, scaleX, offsetX), filtersY = createFilters(quality, srcH, destH, scaleY, offsetY);
        var src_offset = 0;
        var tmp_offset = this.__align(src_offset + Math.max(src.byteLength, dest.byteLength));
        var filtersX_offset = this.__align(tmp_offset + srcH * destW * 4);
        var filtersY_offset = this.__align(filtersX_offset + filtersX.byteLength);
        var alloc_bytes = filtersY_offset + filtersY.byteLength;
        var instance = this.__instance("resize", alloc_bytes);
        var mem = new Uint8Array(this.__memory.buffer);
        var mem32 = new Uint32Array(this.__memory.buffer);
        var src32 = new Uint32Array(src.buffer);
        mem32.set(src32);
        copyInt16asLE(filtersX, mem, filtersX_offset);
        copyInt16asLE(filtersY, mem, filtersY_offset);
        var fn = instance.exports.convolveHV || instance.exports._convolveHV;
        fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH);
        var dest32 = new Uint32Array(dest.buffer);
        dest32.set(new Uint32Array(this.__memory.buffer, 0, destH * destW));
        if (!alpha)
          resetAlpha(dest, destW, destH);
        return dest;
      };
    }, { "./resize_filter_gen": 6 }], 9: [function(_dereq_, module2, exports2) {
      module2.exports = {
        name: "unsharp_mask",
        fn: _dereq_("./unsharp_mask"),
        wasm_fn: _dereq_("./unsharp_mask_wasm"),
        wasm_src: _dereq_("./unsharp_mask_wasm_base64")
      };
    }, { "./unsharp_mask": 10, "./unsharp_mask_wasm": 11, "./unsharp_mask_wasm_base64": 12 }], 10: [function(_dereq_, module2, exports2) {
      var glur_mono16 = _dereq_("glur/mono16");
      function hsv_v16(img, width, height) {
        var size = width * height;
        var out = new Uint16Array(size);
        var r, g, b, max;
        for (var i = 0; i < size; i++) {
          r = img[4 * i];
          g = img[4 * i + 1];
          b = img[4 * i + 2];
          max = r >= g && r >= b ? r : g >= b && g >= r ? g : b;
          out[i] = max << 8;
        }
        return out;
      }
      module2.exports = function unsharp(img, width, height, amount, radius, threshold) {
        var v1, v2, vmul;
        var diff, iTimes4;
        if (amount === 0 || radius < 0.5) {
          return;
        }
        if (radius > 2) {
          radius = 2;
        }
        var brightness = hsv_v16(img, width, height);
        var blured = new Uint16Array(brightness);
        glur_mono16(blured, width, height, radius);
        var amountFp = amount / 100 * 4096 + 0.5 | 0;
        var thresholdFp = threshold << 8;
        var size = width * height;
        for (var i = 0; i < size; i++) {
          v1 = brightness[i];
          diff = v1 - blured[i];
          if (Math.abs(diff) >= thresholdFp) {
            v2 = v1 + (amountFp * diff + 2048 >> 12);
            v2 = v2 > 65280 ? 65280 : v2;
            v2 = v2 < 0 ? 0 : v2;
            v1 = v1 !== 0 ? v1 : 1;
            vmul = (v2 << 12) / v1 | 0;
            iTimes4 = i * 4;
            img[iTimes4] = img[iTimes4] * vmul + 2048 >> 12;
            img[iTimes4 + 1] = img[iTimes4 + 1] * vmul + 2048 >> 12;
            img[iTimes4 + 2] = img[iTimes4 + 2] * vmul + 2048 >> 12;
          }
        }
      };
    }, { "glur/mono16": 18 }], 11: [function(_dereq_, module2, exports2) {
      module2.exports = function unsharp(img, width, height, amount, radius, threshold) {
        if (amount === 0 || radius < 0.5) {
          return;
        }
        if (radius > 2) {
          radius = 2;
        }
        var pixels = width * height;
        var img_bytes_cnt = pixels * 4;
        var hsv_bytes_cnt = pixels * 2;
        var blur_bytes_cnt = pixels * 2;
        var blur_line_byte_cnt = Math.max(width, height) * 4;
        var blur_coeffs_byte_cnt = 8 * 4;
        var img_offset = 0;
        var hsv_offset = img_bytes_cnt;
        var blur_offset = hsv_offset + hsv_bytes_cnt;
        var blur_tmp_offset = blur_offset + blur_bytes_cnt;
        var blur_line_offset = blur_tmp_offset + blur_bytes_cnt;
        var blur_coeffs_offset = blur_line_offset + blur_line_byte_cnt;
        var instance = this.__instance("unsharp_mask", img_bytes_cnt + hsv_bytes_cnt + blur_bytes_cnt * 2 + blur_line_byte_cnt + blur_coeffs_byte_cnt, {
          exp: Math.exp
        });
        var img32 = new Uint32Array(img.buffer);
        var mem32 = new Uint32Array(this.__memory.buffer);
        mem32.set(img32);
        var fn = instance.exports.hsv_v16 || instance.exports._hsv_v16;
        fn(img_offset, hsv_offset, width, height);
        fn = instance.exports.blurMono16 || instance.exports._blurMono16;
        fn(hsv_offset, blur_offset, blur_tmp_offset, blur_line_offset, blur_coeffs_offset, width, height, radius);
        fn = instance.exports.unsharp || instance.exports._unsharp;
        fn(img_offset, img_offset, hsv_offset, blur_offset, width, height, amount, threshold);
        img32.set(new Uint32Array(this.__memory.buffer, 0, pixels));
      };
    }, {}], 12: [function(_dereq_, module2, exports2) {
      module2.exports = "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL";
    }, {}], 13: [function(_dereq_, module2, exports2) {
      var GC_INTERVAL = 100;
      function Pool(create, idle) {
        this.create = create;
        this.available = [];
        this.acquired = {};
        this.lastId = 1;
        this.timeoutId = 0;
        this.idle = idle || 2e3;
      }
      Pool.prototype.acquire = function() {
        var _this = this;
        var resource;
        if (this.available.length !== 0) {
          resource = this.available.pop();
        } else {
          resource = this.create();
          resource.id = this.lastId++;
          resource.release = function() {
            return _this.release(resource);
          };
        }
        this.acquired[resource.id] = resource;
        return resource;
      };
      Pool.prototype.release = function(resource) {
        var _this2 = this;
        delete this.acquired[resource.id];
        resource.lastUsed = Date.now();
        this.available.push(resource);
        if (this.timeoutId === 0) {
          this.timeoutId = setTimeout(function() {
            return _this2.gc();
          }, GC_INTERVAL);
        }
      };
      Pool.prototype.gc = function() {
        var _this3 = this;
        var now = Date.now();
        this.available = this.available.filter(function(resource) {
          if (now - resource.lastUsed > _this3.idle) {
            resource.destroy();
            return false;
          }
          return true;
        });
        if (this.available.length !== 0) {
          this.timeoutId = setTimeout(function() {
            return _this3.gc();
          }, GC_INTERVAL);
        } else {
          this.timeoutId = 0;
        }
      };
      module2.exports = Pool;
    }, {}], 14: [function(_dereq_, module2, exports2) {
      var MIN_INNER_TILE_SIZE = 2;
      module2.exports = function createStages(fromWidth, fromHeight, toWidth, toHeight, srcTileSize, destTileBorder) {
        var scaleX = toWidth / fromWidth;
        var scaleY = toHeight / fromHeight;
        var minScale = (2 * destTileBorder + MIN_INNER_TILE_SIZE + 1) / srcTileSize;
        if (minScale > 0.5)
          return [[toWidth, toHeight]];
        var stageCount = Math.ceil(Math.log(Math.min(scaleX, scaleY)) / Math.log(minScale));
        if (stageCount <= 1)
          return [[toWidth, toHeight]];
        var result = [];
        for (var i = 0; i < stageCount; i++) {
          var width = Math.round(Math.pow(Math.pow(fromWidth, stageCount - i - 1) * Math.pow(toWidth, i + 1), 1 / stageCount));
          var height = Math.round(Math.pow(Math.pow(fromHeight, stageCount - i - 1) * Math.pow(toHeight, i + 1), 1 / stageCount));
          result.push([width, height]);
        }
        return result;
      };
    }, {}], 15: [function(_dereq_, module2, exports2) {
      var PIXEL_EPSILON = 1e-5;
      function pixelFloor(x) {
        var nearest = Math.round(x);
        if (Math.abs(x - nearest) < PIXEL_EPSILON) {
          return nearest;
        }
        return Math.floor(x);
      }
      function pixelCeil(x) {
        var nearest = Math.round(x);
        if (Math.abs(x - nearest) < PIXEL_EPSILON) {
          return nearest;
        }
        return Math.ceil(x);
      }
      module2.exports = function createRegions(options) {
        var scaleX = options.toWidth / options.width;
        var scaleY = options.toHeight / options.height;
        var innerTileWidth = pixelFloor(options.srcTileSize * scaleX) - 2 * options.destTileBorder;
        var innerTileHeight = pixelFloor(options.srcTileSize * scaleY) - 2 * options.destTileBorder;
        if (innerTileWidth < 1 || innerTileHeight < 1) {
          throw new Error("Internal error in pica: target tile width/height is too small.");
        }
        var x, y;
        var innerX, innerY, toTileWidth, toTileHeight;
        var tiles = [];
        var tile;
        for (innerY = 0; innerY < options.toHeight; innerY += innerTileHeight) {
          for (innerX = 0; innerX < options.toWidth; innerX += innerTileWidth) {
            x = innerX - options.destTileBorder;
            if (x < 0) {
              x = 0;
            }
            toTileWidth = innerX + innerTileWidth + options.destTileBorder - x;
            if (x + toTileWidth >= options.toWidth) {
              toTileWidth = options.toWidth - x;
            }
            y = innerY - options.destTileBorder;
            if (y < 0) {
              y = 0;
            }
            toTileHeight = innerY + innerTileHeight + options.destTileBorder - y;
            if (y + toTileHeight >= options.toHeight) {
              toTileHeight = options.toHeight - y;
            }
            tile = {
              toX: x,
              toY: y,
              toWidth: toTileWidth,
              toHeight: toTileHeight,
              toInnerX: innerX,
              toInnerY: innerY,
              toInnerWidth: innerTileWidth,
              toInnerHeight: innerTileHeight,
              offsetX: x / scaleX - pixelFloor(x / scaleX),
              offsetY: y / scaleY - pixelFloor(y / scaleY),
              scaleX,
              scaleY,
              x: pixelFloor(x / scaleX),
              y: pixelFloor(y / scaleY),
              width: pixelCeil(toTileWidth / scaleX),
              height: pixelCeil(toTileHeight / scaleY)
            };
            tiles.push(tile);
          }
        }
        return tiles;
      };
    }, {}], 16: [function(_dereq_, module2, exports2) {
      function objClass(obj) {
        return Object.prototype.toString.call(obj);
      }
      module2.exports.isCanvas = function isCanvas(element) {
        var cname = objClass(element);
        return cname === "[object HTMLCanvasElement]" || cname === "[object OffscreenCanvas]" || cname === "[object Canvas]";
      };
      module2.exports.isImage = function isImage(element) {
        return objClass(element) === "[object HTMLImageElement]";
      };
      module2.exports.isImageBitmap = function isImageBitmap(element) {
        return objClass(element) === "[object ImageBitmap]";
      };
      module2.exports.limiter = function limiter(concurrency) {
        var active = 0, queue = [];
        function roll() {
          if (active < concurrency && queue.length) {
            active++;
            queue.shift()();
          }
        }
        return function limit(fn) {
          return new Promise(function(resolve, reject) {
            queue.push(function() {
              fn().then(function(result) {
                resolve(result);
                active--;
                roll();
              }, function(err) {
                reject(err);
                active--;
                roll();
              });
            });
            roll();
          });
        };
      };
      module2.exports.cib_quality_name = function cib_quality_name(num) {
        switch (num) {
          case 0:
            return "pixelated";
          case 1:
            return "low";
          case 2:
            return "medium";
        }
        return "high";
      };
      module2.exports.cib_support = function cib_support(createCanvas) {
        return Promise.resolve().then(function() {
          if (typeof createImageBitmap === "undefined") {
            return false;
          }
          var c = createCanvas(100, 100);
          return createImageBitmap(c, 0, 0, 100, 100, {
            resizeWidth: 10,
            resizeHeight: 10,
            resizeQuality: "high"
          }).then(function(bitmap) {
            var status = bitmap.width === 10;
            bitmap.close();
            c = null;
            return status;
          });
        })["catch"](function() {
          return false;
        });
      };
      module2.exports.worker_offscreen_canvas_support = function worker_offscreen_canvas_support() {
        return new Promise(function(resolve, reject) {
          if (typeof OffscreenCanvas === "undefined") {
            resolve(false);
            return;
          }
          function workerPayload(self) {
            if (typeof createImageBitmap === "undefined") {
              self.postMessage(false);
              return;
            }
            Promise.resolve().then(function() {
              var canvas = new OffscreenCanvas(10, 10);
              var ctx = canvas.getContext("2d");
              ctx.rect(0, 0, 1, 1);
              return createImageBitmap(canvas, 0, 0, 1, 1);
            }).then(function() {
              return self.postMessage(true);
            }, function() {
              return self.postMessage(false);
            });
          }
          var code = btoa("(".concat(workerPayload.toString(), ")(self);"));
          var w = new Worker("data:text/javascript;base64,".concat(code));
          w.onmessage = function(ev) {
            return resolve(ev.data);
          };
          w.onerror = reject;
        }).then(function(result) {
          return result;
        }, function() {
          return false;
        });
      };
      module2.exports.can_use_canvas = function can_use_canvas(createCanvas) {
        var usable = false;
        try {
          var canvas = createCanvas(2, 1);
          var ctx = canvas.getContext("2d");
          var d = ctx.createImageData(2, 1);
          d.data[0] = 12;
          d.data[1] = 23;
          d.data[2] = 34;
          d.data[3] = 255;
          d.data[4] = 45;
          d.data[5] = 56;
          d.data[6] = 67;
          d.data[7] = 255;
          ctx.putImageData(d, 0, 0);
          d = null;
          d = ctx.getImageData(0, 0, 2, 1);
          if (d.data[0] === 12 && d.data[1] === 23 && d.data[2] === 34 && d.data[3] === 255 && d.data[4] === 45 && d.data[5] === 56 && d.data[6] === 67 && d.data[7] === 255) {
            usable = true;
          }
        } catch (err) {
        }
        return usable;
      };
      module2.exports.cib_can_use_region = function cib_can_use_region() {
        return new Promise(function(resolve) {
          if (typeof createImageBitmap === "undefined") {
            resolve(false);
            return;
          }
          var image = new Image();
          image.src = "data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z";
          image.onload = function() {
            createImageBitmap(image, 0, 0, image.width, image.height).then(function(bitmap) {
              if (bitmap.width === image.width && bitmap.height === image.height) {
                resolve(true);
              } else {
                resolve(false);
              }
            }, function() {
              return resolve(false);
            });
          };
          image.onerror = function() {
            return resolve(false);
          };
        });
      };
    }, {}], 17: [function(_dereq_, module2, exports2) {
      module2.exports = function() {
        var MathLib = _dereq_("./mathlib");
        var mathLib;
        onmessage = function onmessage2(ev) {
          var tileOpts = ev.data.opts;
          if (!tileOpts.src && tileOpts.srcBitmap) {
            var canvas = new OffscreenCanvas(tileOpts.width, tileOpts.height);
            var ctx = canvas.getContext("2d", {
              alpha: Boolean(tileOpts.alpha)
            });
            ctx.drawImage(tileOpts.srcBitmap, 0, 0);
            tileOpts.src = ctx.getImageData(0, 0, tileOpts.width, tileOpts.height).data;
            canvas.width = canvas.height = 0;
            canvas = null;
            tileOpts.srcBitmap.close();
            tileOpts.srcBitmap = null;
          }
          if (!mathLib)
            mathLib = new MathLib(ev.data.features);
          var data = mathLib.resizeAndUnsharp(tileOpts);
          {
            postMessage({
              data
            }, [data.buffer]);
          }
        };
      };
    }, { "./mathlib": 1 }], 18: [function(_dereq_, module2, exports2) {
      var a0, a1, a2, a3, b1, b2, left_corner, right_corner;
      function gaussCoef(sigma) {
        if (sigma < 0.5) {
          sigma = 0.5;
        }
        var a = Math.exp(0.726 * 0.726) / sigma, g1 = Math.exp(-a), g2 = Math.exp(-2 * a), k = (1 - g1) * (1 - g1) / (1 + 2 * a * g1 - g2);
        a0 = k;
        a1 = k * (a - 1) * g1;
        a2 = k * (a + 1) * g1;
        a3 = -k * g2;
        b1 = 2 * g1;
        b2 = -g2;
        left_corner = (a0 + a1) / (1 - b1 - b2);
        right_corner = (a2 + a3) / (1 - b1 - b2);
        return new Float32Array([a0, a1, a2, a3, b1, b2, left_corner, right_corner]);
      }
      function convolveMono16(src, out, line, coeff, width, height) {
        var prev_src, curr_src, curr_out, prev_out, prev_prev_out;
        var src_index, out_index, line_index;
        var i, j;
        var coeff_a0, coeff_a1, coeff_b1, coeff_b2;
        for (i = 0; i < height; i++) {
          src_index = i * width;
          out_index = i;
          line_index = 0;
          prev_src = src[src_index];
          prev_prev_out = prev_src * coeff[6];
          prev_out = prev_prev_out;
          coeff_a0 = coeff[0];
          coeff_a1 = coeff[1];
          coeff_b1 = coeff[4];
          coeff_b2 = coeff[5];
          for (j = 0; j < width; j++) {
            curr_src = src[src_index];
            curr_out = curr_src * coeff_a0 + prev_src * coeff_a1 + prev_out * coeff_b1 + prev_prev_out * coeff_b2;
            prev_prev_out = prev_out;
            prev_out = curr_out;
            prev_src = curr_src;
            line[line_index] = prev_out;
            line_index++;
            src_index++;
          }
          src_index--;
          line_index--;
          out_index += height * (width - 1);
          prev_src = src[src_index];
          prev_prev_out = prev_src * coeff[7];
          prev_out = prev_prev_out;
          curr_src = prev_src;
          coeff_a0 = coeff[2];
          coeff_a1 = coeff[3];
          for (j = width - 1; j >= 0; j--) {
            curr_out = curr_src * coeff_a0 + prev_src * coeff_a1 + prev_out * coeff_b1 + prev_prev_out * coeff_b2;
            prev_prev_out = prev_out;
            prev_out = curr_out;
            prev_src = curr_src;
            curr_src = src[src_index];
            out[out_index] = line[line_index] + prev_out;
            src_index--;
            line_index--;
            out_index -= height;
          }
        }
      }
      function blurMono16(src, width, height, radius) {
        if (!radius) {
          return;
        }
        var out = new Uint16Array(src.length), tmp_line = new Float32Array(Math.max(width, height));
        var coeff = gaussCoef(radius);
        convolveMono16(src, out, tmp_line, coeff, width, height);
        convolveMono16(out, src, tmp_line, coeff, height, width);
      }
      module2.exports = blurMono16;
    }, {}], 19: [function(_dereq_, module2, exports2) {
      if (typeof Object.create === "function") {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }, {}], 20: [function(_dereq_, module2, exports2) {
      var assign = _dereq_("object-assign");
      var base64decode = _dereq_("./lib/base64decode");
      var hasWebAssembly = _dereq_("./lib/wa_detect");
      var DEFAULT_OPTIONS = {
        js: true,
        wasm: true
      };
      function MultiMath(options) {
        if (!(this instanceof MultiMath))
          return new MultiMath(options);
        var opts = assign({}, DEFAULT_OPTIONS, options || {});
        this.options = opts;
        this.__cache = {};
        this.__init_promise = null;
        this.__modules = opts.modules || {};
        this.__memory = null;
        this.__wasm = {};
        this.__isLE = new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0] === 1;
        if (!this.options.js && !this.options.wasm) {
          throw new Error('mathlib: at least "js" or "wasm" should be enabled');
        }
      }
      MultiMath.prototype.has_wasm = hasWebAssembly;
      MultiMath.prototype.use = function(module3) {
        this.__modules[module3.name] = module3;
        if (this.options.wasm && this.has_wasm() && module3.wasm_fn) {
          this[module3.name] = module3.wasm_fn;
        } else {
          this[module3.name] = module3.fn;
        }
        return this;
      };
      MultiMath.prototype.init = function() {
        if (this.__init_promise)
          return this.__init_promise;
        if (!this.options.js && this.options.wasm && !this.has_wasm()) {
          return Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`));
        }
        var self = this;
        this.__init_promise = Promise.all(Object.keys(self.__modules).map(function(name) {
          var module3 = self.__modules[name];
          if (!self.options.wasm || !self.has_wasm() || !module3.wasm_fn)
            return null;
          if (self.__wasm[name])
            return null;
          return WebAssembly.compile(self.__base64decode(module3.wasm_src)).then(function(m) {
            self.__wasm[name] = m;
          });
        })).then(function() {
          return self;
        });
        return this.__init_promise;
      };
      MultiMath.prototype.__base64decode = base64decode;
      MultiMath.prototype.__reallocate = function mem_grow_to(bytes) {
        if (!this.__memory) {
          this.__memory = new WebAssembly.Memory({
            initial: Math.ceil(bytes / (64 * 1024))
          });
          return this.__memory;
        }
        var mem_size = this.__memory.buffer.byteLength;
        if (mem_size < bytes) {
          this.__memory.grow(Math.ceil((bytes - mem_size) / (64 * 1024)));
        }
        return this.__memory;
      };
      MultiMath.prototype.__instance = function instance(name, memsize, env_extra) {
        if (memsize)
          this.__reallocate(memsize);
        if (!this.__wasm[name]) {
          var module3 = this.__modules[name];
          this.__wasm[name] = new WebAssembly.Module(this.__base64decode(module3.wasm_src));
        }
        if (!this.__cache[name]) {
          var env_base = {
            memoryBase: 0,
            memory: this.__memory,
            tableBase: 0,
            table: new WebAssembly.Table({ initial: 0, element: "anyfunc" })
          };
          this.__cache[name] = new WebAssembly.Instance(this.__wasm[name], {
            env: assign(env_base, env_extra || {})
          });
        }
        return this.__cache[name];
      };
      MultiMath.prototype.__align = function align(number, base) {
        base = base || 8;
        var reminder = number % base;
        return number + (reminder ? base - reminder : 0);
      };
      module2.exports = MultiMath;
    }, { "./lib/base64decode": 21, "./lib/wa_detect": 22, "object-assign": 23 }], 21: [function(_dereq_, module2, exports2) {
      var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      module2.exports = function base64decode(str) {
        var input = str.replace(/[\r\n=]/g, ""), max = input.length;
        var out = new Uint8Array(max * 3 >> 2);
        var bits = 0;
        var ptr = 0;
        for (var idx = 0; idx < max; idx++) {
          if (idx % 4 === 0 && idx) {
            out[ptr++] = bits >> 16 & 255;
            out[ptr++] = bits >> 8 & 255;
            out[ptr++] = bits & 255;
          }
          bits = bits << 6 | BASE64_MAP.indexOf(input.charAt(idx));
        }
        var tailbits = max % 4 * 6;
        if (tailbits === 0) {
          out[ptr++] = bits >> 16 & 255;
          out[ptr++] = bits >> 8 & 255;
          out[ptr++] = bits & 255;
        } else if (tailbits === 18) {
          out[ptr++] = bits >> 10 & 255;
          out[ptr++] = bits >> 2 & 255;
        } else if (tailbits === 12) {
          out[ptr++] = bits >> 4 & 255;
        }
        return out;
      };
    }, {}], 22: [function(_dereq_, module2, exports2) {
      var wa;
      module2.exports = function hasWebAssembly() {
        if (typeof wa !== "undefined")
          return wa;
        wa = false;
        if (typeof WebAssembly === "undefined")
          return wa;
        try {
          var bin = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 3, 2, 1, 0, 5, 3, 1, 0, 1, 7, 8, 1, 4, 116, 101, 115, 116, 0, 0, 10, 16, 1, 14, 0, 32, 0, 65, 1, 54, 2, 0, 32, 0, 40, 2, 0, 11]);
          var module3 = new WebAssembly.Module(bin);
          var instance = new WebAssembly.Instance(module3, {});
          if (instance.exports.test(4) !== 0)
            wa = true;
          return wa;
        } catch (__) {
        }
        return wa;
      };
    }, {}], 23: [function(_dereq_, module2, exports2) {
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }, {}], 24: [function(_dereq_, module2, exports2) {
      var bundleFn = arguments[3];
      var sources = arguments[4];
      var cache = arguments[5];
      var stringify = JSON.stringify;
      module2.exports = function(fn, options) {
        var wkey;
        var cacheKeys = Object.keys(cache);
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
          var key = cacheKeys[i];
          var exp = cache[key].exports;
          if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
          }
        }
        if (!wkey) {
          wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
          var wcache = {};
          for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
          }
          sources[wkey] = [
            "function(require,module,exports){" + fn + "(self); }",
            wcache
          ];
        }
        var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var scache = {};
        scache[wkey] = wkey;
        sources[skey] = [
          "function(require,module,exports){var f = require(" + stringify(wkey) + ");(f.default ? f.default : f)(self);}",
          scache
        ];
        var workerSources = {};
        resolveSources(skey);
        function resolveSources(key2) {
          workerSources[key2] = true;
          for (var depPath in sources[key2][1]) {
            var depKey = sources[key2][1][depPath];
            if (!workerSources[depKey]) {
              resolveSources(depKey);
            }
          }
        }
        var src = "(" + bundleFn + ")({" + Object.keys(workerSources).map(function(key2) {
          return stringify(key2) + ":[" + sources[key2][0] + "," + stringify(sources[key2][1]) + "]";
        }).join(",") + "},{},[" + stringify(skey) + "])";
        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        var blob = new Blob([src], { type: "text/javascript" });
        if (options && options.bare) {
          return blob;
        }
        var workerUrl = URL.createObjectURL(blob);
        var worker = new Worker(workerUrl);
        worker.objectURL = workerUrl;
        return worker;
      };
    }, {}], "/index.js": [function(_dereq_, module2, exports2) {
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null)
          return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null)
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      var assign = _dereq_("object-assign");
      var webworkify = _dereq_("webworkify");
      var MathLib = _dereq_("./lib/mathlib");
      var Pool = _dereq_("./lib/pool");
      var utils = _dereq_("./lib/utils");
      var worker = _dereq_("./lib/worker");
      var createStages = _dereq_("./lib/stepper");
      var createRegions = _dereq_("./lib/tiler");
      var singletones = {};
      var NEED_SAFARI_FIX = false;
      try {
        if (typeof navigator !== "undefined" && navigator.userAgent) {
          NEED_SAFARI_FIX = navigator.userAgent.indexOf("Safari") >= 0;
        }
      } catch (e) {
      }
      var concurrency = 1;
      if (typeof navigator !== "undefined") {
        concurrency = Math.min(navigator.hardwareConcurrency || 1, 4);
      }
      var DEFAULT_PICA_OPTS = {
        tile: 1024,
        concurrency,
        features: ["js", "wasm", "ww"],
        idle: 2e3,
        createCanvas: function createCanvas(width, height) {
          var tmpCanvas = document.createElement("canvas");
          tmpCanvas.width = width;
          tmpCanvas.height = height;
          return tmpCanvas;
        }
      };
      var DEFAULT_RESIZE_OPTS = {
        quality: 3,
        alpha: false,
        unsharpAmount: 0,
        unsharpRadius: 0,
        unsharpThreshold: 0
      };
      var CAN_NEW_IMAGE_DATA = false;
      var CAN_CREATE_IMAGE_BITMAP = false;
      var CAN_USE_CANVAS_GET_IMAGE_DATA = false;
      var CAN_USE_OFFSCREEN_CANVAS = false;
      var CAN_USE_CIB_REGION_FOR_IMAGE = false;
      function workerFabric() {
        return {
          value: webworkify(worker),
          destroy: function destroy() {
            this.value.terminate();
            if (typeof window !== "undefined") {
              var url = window.URL || window.webkitURL || window.mozURL || window.msURL;
              if (url && url.revokeObjectURL && this.value.objectURL) {
                url.revokeObjectURL(this.value.objectURL);
              }
            }
          }
        };
      }
      function Pica(options) {
        if (!(this instanceof Pica))
          return new Pica(options);
        this.options = assign({}, DEFAULT_PICA_OPTS, options || {});
        var limiter_key = "lk_".concat(this.options.concurrency);
        this.__limit = singletones[limiter_key] || utils.limiter(this.options.concurrency);
        if (!singletones[limiter_key])
          singletones[limiter_key] = this.__limit;
        this.features = {
          js: false,
          // pure JS implementation, can be disabled for testing
          wasm: false,
          // webassembly implementation for heavy functions
          cib: false,
          // resize via createImageBitmap (only FF at this moment)
          ww: false
          // webworkers
        };
        this.__workersPool = null;
        this.__requested_features = [];
        this.__mathlib = null;
      }
      Pica.prototype.init = function() {
        var _this = this;
        if (this.__initPromise)
          return this.__initPromise;
        if (typeof ImageData !== "undefined" && typeof Uint8ClampedArray !== "undefined") {
          try {
            new ImageData(new Uint8ClampedArray(400), 10, 10);
            CAN_NEW_IMAGE_DATA = true;
          } catch (__) {
          }
        }
        if (typeof ImageBitmap !== "undefined") {
          if (ImageBitmap.prototype && ImageBitmap.prototype.close) {
            CAN_CREATE_IMAGE_BITMAP = true;
          } else {
            this.debug("ImageBitmap does not support .close(), disabled");
          }
        }
        var features = this.options.features.slice();
        if (features.indexOf("all") >= 0) {
          features = ["cib", "wasm", "js", "ww"];
        }
        this.__requested_features = features;
        this.__mathlib = new MathLib(features);
        if (features.indexOf("ww") >= 0) {
          if (typeof window !== "undefined" && "Worker" in window) {
            try {
              var wkr = _dereq_("webworkify")(function() {
              });
              wkr.terminate();
              this.features.ww = true;
              var wpool_key = "wp_".concat(JSON.stringify(this.options));
              if (singletones[wpool_key]) {
                this.__workersPool = singletones[wpool_key];
              } else {
                this.__workersPool = new Pool(workerFabric, this.options.idle);
                singletones[wpool_key] = this.__workersPool;
              }
            } catch (__) {
            }
          }
        }
        var initMath = this.__mathlib.init().then(function(mathlib) {
          assign(_this.features, mathlib.features);
        });
        var checkCibResize;
        if (!CAN_CREATE_IMAGE_BITMAP) {
          checkCibResize = Promise.resolve(false);
        } else {
          checkCibResize = utils.cib_support(this.options.createCanvas).then(function(status) {
            if (_this.features.cib && features.indexOf("cib") < 0) {
              _this.debug("createImageBitmap() resize supported, but disabled by config");
              return;
            }
            if (features.indexOf("cib") >= 0)
              _this.features.cib = status;
          });
        }
        CAN_USE_CANVAS_GET_IMAGE_DATA = utils.can_use_canvas(this.options.createCanvas);
        var checkOffscreenCanvas;
        if (CAN_CREATE_IMAGE_BITMAP && CAN_NEW_IMAGE_DATA && features.indexOf("ww") !== -1) {
          checkOffscreenCanvas = utils.worker_offscreen_canvas_support();
        } else {
          checkOffscreenCanvas = Promise.resolve(false);
        }
        checkOffscreenCanvas = checkOffscreenCanvas.then(function(result) {
          CAN_USE_OFFSCREEN_CANVAS = result;
        });
        var checkCibRegion = utils.cib_can_use_region().then(function(result) {
          CAN_USE_CIB_REGION_FOR_IMAGE = result;
        });
        this.__initPromise = Promise.all([initMath, checkCibResize, checkOffscreenCanvas, checkCibRegion]).then(function() {
          return _this;
        });
        return this.__initPromise;
      };
      Pica.prototype.__invokeResize = function(tileOpts, opts) {
        var _this2 = this;
        opts.__mathCache = opts.__mathCache || {};
        return Promise.resolve().then(function() {
          if (!_this2.features.ww) {
            return {
              data: _this2.__mathlib.resizeAndUnsharp(tileOpts, opts.__mathCache)
            };
          }
          return new Promise(function(resolve, reject) {
            var w = _this2.__workersPool.acquire();
            if (opts.cancelToken)
              opts.cancelToken["catch"](function(err) {
                return reject(err);
              });
            w.value.onmessage = function(ev) {
              w.release();
              if (ev.data.err)
                reject(ev.data.err);
              else
                resolve(ev.data);
            };
            var transfer = [];
            if (tileOpts.src)
              transfer.push(tileOpts.src.buffer);
            if (tileOpts.srcBitmap)
              transfer.push(tileOpts.srcBitmap);
            w.value.postMessage({
              opts: tileOpts,
              features: _this2.__requested_features,
              preload: {
                wasm_nodule: _this2.__mathlib.__
              }
            }, transfer);
          });
        });
      };
      Pica.prototype.__extractTileData = function(tile, from, opts, stageEnv, extractTo) {
        if (this.features.ww && CAN_USE_OFFSCREEN_CANVAS && // createImageBitmap doesn't work for images (Image, ImageBitmap) with Exif orientation in Chrome,
        // can use canvas because canvas doesn't have orientation;
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
        (utils.isCanvas(from) || CAN_USE_CIB_REGION_FOR_IMAGE)) {
          this.debug("Create tile for OffscreenCanvas");
          return createImageBitmap(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height).then(function(bitmap) {
            extractTo.srcBitmap = bitmap;
            return extractTo;
          });
        }
        if (utils.isCanvas(from)) {
          if (!stageEnv.srcCtx)
            stageEnv.srcCtx = from.getContext("2d", {
              alpha: Boolean(opts.alpha)
            });
          this.debug("Get tile pixel data");
          extractTo.src = stageEnv.srcCtx.getImageData(tile.x, tile.y, tile.width, tile.height).data;
          return extractTo;
        }
        this.debug("Draw tile imageBitmap/image to temporary canvas");
        var tmpCanvas = this.options.createCanvas(tile.width, tile.height);
        var tmpCtx = tmpCanvas.getContext("2d", {
          alpha: Boolean(opts.alpha)
        });
        tmpCtx.globalCompositeOperation = "copy";
        tmpCtx.drawImage(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height, 0, 0, tile.width, tile.height);
        this.debug("Get tile pixel data");
        extractTo.src = tmpCtx.getImageData(0, 0, tile.width, tile.height).data;
        tmpCanvas.width = tmpCanvas.height = 0;
        return extractTo;
      };
      Pica.prototype.__landTileData = function(tile, result, stageEnv) {
        var toImageData;
        this.debug("Convert raw rgba tile result to ImageData");
        if (result.bitmap) {
          stageEnv.toCtx.drawImage(result.bitmap, tile.toX, tile.toY);
          return null;
        }
        if (CAN_NEW_IMAGE_DATA) {
          toImageData = new ImageData(new Uint8ClampedArray(result.data), tile.toWidth, tile.toHeight);
        } else {
          toImageData = stageEnv.toCtx.createImageData(tile.toWidth, tile.toHeight);
          if (toImageData.data.set) {
            toImageData.data.set(result.data);
          } else {
            for (var i = toImageData.data.length - 1; i >= 0; i--) {
              toImageData.data[i] = result.data[i];
            }
          }
        }
        this.debug("Draw tile");
        if (NEED_SAFARI_FIX) {
          stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth + 1e-5, tile.toInnerHeight + 1e-5);
        } else {
          stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth, tile.toInnerHeight);
        }
        return null;
      };
      Pica.prototype.__tileAndResize = function(from, to, opts) {
        var _this3 = this;
        var stageEnv = {
          srcCtx: null,
          srcImageBitmap: null,
          isImageBitmapReused: false,
          toCtx: null
        };
        var processTile = function processTile2(tile) {
          return _this3.__limit(function() {
            if (opts.canceled)
              return opts.cancelToken;
            var tileOpts = {
              width: tile.width,
              height: tile.height,
              toWidth: tile.toWidth,
              toHeight: tile.toHeight,
              scaleX: tile.scaleX,
              scaleY: tile.scaleY,
              offsetX: tile.offsetX,
              offsetY: tile.offsetY,
              quality: opts.quality,
              alpha: opts.alpha,
              unsharpAmount: opts.unsharpAmount,
              unsharpRadius: opts.unsharpRadius,
              unsharpThreshold: opts.unsharpThreshold
            };
            _this3.debug("Invoke resize math");
            return Promise.resolve(tileOpts).then(function(tileOpts2) {
              return _this3.__extractTileData(tile, from, opts, stageEnv, tileOpts2);
            }).then(function(tileOpts2) {
              _this3.debug("Invoke resize math");
              return _this3.__invokeResize(tileOpts2, opts);
            }).then(function(result) {
              if (opts.canceled)
                return opts.cancelToken;
              stageEnv.srcImageData = null;
              return _this3.__landTileData(tile, result, stageEnv);
            });
          });
        };
        return Promise.resolve().then(function() {
          stageEnv.toCtx = to.getContext("2d", {
            alpha: Boolean(opts.alpha)
          });
          if (utils.isCanvas(from))
            return null;
          if (utils.isImageBitmap(from)) {
            stageEnv.srcImageBitmap = from;
            stageEnv.isImageBitmapReused = true;
            return null;
          }
          if (utils.isImage(from)) {
            if (!CAN_CREATE_IMAGE_BITMAP)
              return null;
            _this3.debug("Decode image via createImageBitmap");
            return createImageBitmap(from).then(function(imageBitmap) {
              stageEnv.srcImageBitmap = imageBitmap;
            })["catch"](function(e) {
              return null;
            });
          }
          throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap');
        }).then(function() {
          if (opts.canceled)
            return opts.cancelToken;
          _this3.debug("Calculate tiles");
          var regions = createRegions({
            width: opts.width,
            height: opts.height,
            srcTileSize: _this3.options.tile,
            toWidth: opts.toWidth,
            toHeight: opts.toHeight,
            destTileBorder: opts.__destTileBorder
          });
          var jobs = regions.map(function(tile) {
            return processTile(tile);
          });
          function cleanup(stageEnv2) {
            if (stageEnv2.srcImageBitmap) {
              if (!stageEnv2.isImageBitmapReused)
                stageEnv2.srcImageBitmap.close();
              stageEnv2.srcImageBitmap = null;
            }
          }
          _this3.debug("Process tiles");
          return Promise.all(jobs).then(function() {
            _this3.debug("Finished!");
            cleanup(stageEnv);
            return to;
          }, function(err) {
            cleanup(stageEnv);
            throw err;
          });
        });
      };
      Pica.prototype.__processStages = function(stages, from, to, opts) {
        var _this4 = this;
        if (opts.canceled)
          return opts.cancelToken;
        var _stages$shift = stages.shift(), _stages$shift2 = _slicedToArray(_stages$shift, 2), toWidth = _stages$shift2[0], toHeight = _stages$shift2[1];
        var isLastStage = stages.length === 0;
        opts = assign({}, opts, {
          toWidth,
          toHeight,
          // only use user-defined quality for the last stage,
          // use simpler (Hamming) filter for the first stages where
          // scale factor is large enough (more than 2-3)
          quality: isLastStage ? opts.quality : Math.min(1, opts.quality)
        });
        var tmpCanvas;
        if (!isLastStage) {
          tmpCanvas = this.options.createCanvas(toWidth, toHeight);
        }
        return this.__tileAndResize(from, isLastStage ? to : tmpCanvas, opts).then(function() {
          if (isLastStage)
            return to;
          opts.width = toWidth;
          opts.height = toHeight;
          return _this4.__processStages(stages, tmpCanvas, to, opts);
        }).then(function(res) {
          if (tmpCanvas) {
            tmpCanvas.width = tmpCanvas.height = 0;
          }
          return res;
        });
      };
      Pica.prototype.__resizeViaCreateImageBitmap = function(from, to, opts) {
        var _this5 = this;
        var toCtx = to.getContext("2d", {
          alpha: Boolean(opts.alpha)
        });
        this.debug("Resize via createImageBitmap()");
        return createImageBitmap(from, {
          resizeWidth: opts.toWidth,
          resizeHeight: opts.toHeight,
          resizeQuality: utils.cib_quality_name(opts.quality)
        }).then(function(imageBitmap) {
          if (opts.canceled)
            return opts.cancelToken;
          if (!opts.unsharpAmount) {
            toCtx.drawImage(imageBitmap, 0, 0);
            imageBitmap.close();
            toCtx = null;
            _this5.debug("Finished!");
            return to;
          }
          _this5.debug("Unsharp result");
          var tmpCanvas = _this5.options.createCanvas(opts.toWidth, opts.toHeight);
          var tmpCtx = tmpCanvas.getContext("2d", {
            alpha: Boolean(opts.alpha)
          });
          tmpCtx.drawImage(imageBitmap, 0, 0);
          imageBitmap.close();
          var iData = tmpCtx.getImageData(0, 0, opts.toWidth, opts.toHeight);
          _this5.__mathlib.unsharp_mask(iData.data, opts.toWidth, opts.toHeight, opts.unsharpAmount, opts.unsharpRadius, opts.unsharpThreshold);
          toCtx.putImageData(iData, 0, 0);
          tmpCanvas.width = tmpCanvas.height = 0;
          iData = tmpCtx = tmpCanvas = toCtx = null;
          _this5.debug("Finished!");
          return to;
        });
      };
      Pica.prototype.resize = function(from, to, options) {
        var _this6 = this;
        this.debug("Start resize...");
        var opts = assign({}, DEFAULT_RESIZE_OPTS);
        if (!isNaN(options)) {
          opts = assign(opts, {
            quality: options
          });
        } else if (options) {
          opts = assign(opts, options);
        }
        opts.toWidth = to.width;
        opts.toHeight = to.height;
        opts.width = from.naturalWidth || from.width;
        opts.height = from.naturalHeight || from.height;
        if (to.width === 0 || to.height === 0) {
          return Promise.reject(new Error("Invalid output size: ".concat(to.width, "x").concat(to.height)));
        }
        if (opts.unsharpRadius > 2)
          opts.unsharpRadius = 2;
        opts.canceled = false;
        if (opts.cancelToken) {
          opts.cancelToken = opts.cancelToken.then(function(data) {
            opts.canceled = true;
            throw data;
          }, function(err) {
            opts.canceled = true;
            throw err;
          });
        }
        var DEST_TILE_BORDER = 3;
        opts.__destTileBorder = Math.ceil(Math.max(DEST_TILE_BORDER, 2.5 * opts.unsharpRadius | 0));
        return this.init().then(function() {
          if (opts.canceled)
            return opts.cancelToken;
          if (_this6.features.cib) {
            return _this6.__resizeViaCreateImageBitmap(from, to, opts);
          }
          if (!CAN_USE_CANVAS_GET_IMAGE_DATA) {
            var err = new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");
            err.code = "ERR_GET_IMAGE_DATA";
            throw err;
          }
          var stages = createStages(opts.width, opts.height, opts.toWidth, opts.toHeight, _this6.options.tile, opts.__destTileBorder);
          return _this6.__processStages(stages, from, to, opts);
        });
      };
      Pica.prototype.resizeBuffer = function(options) {
        var _this7 = this;
        var opts = assign({}, DEFAULT_RESIZE_OPTS, options);
        return this.init().then(function() {
          return _this7.__mathlib.resizeAndUnsharp(opts);
        });
      };
      Pica.prototype.toBlob = function(canvas, mimeType, quality) {
        mimeType = mimeType || "image/png";
        return new Promise(function(resolve) {
          if (canvas.toBlob) {
            canvas.toBlob(function(blob) {
              return resolve(blob);
            }, mimeType, quality);
            return;
          }
          if (canvas.convertToBlob) {
            resolve(canvas.convertToBlob({
              type: mimeType,
              quality
            }));
            return;
          }
          var asString = atob(canvas.toDataURL(mimeType, quality).split(",")[1]);
          var len = asString.length;
          var asBuffer = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            asBuffer[i] = asString.charCodeAt(i);
          }
          resolve(new Blob([asBuffer], {
            type: mimeType
          }));
        });
      };
      Pica.prototype.debug = function() {
      };
      module2.exports = Pica;
    }, { "./lib/mathlib": 1, "./lib/pool": 13, "./lib/stepper": 14, "./lib/tiler": 15, "./lib/utils": 16, "./lib/worker": 17, "object-assign": 23, "webworkify": 24 }] }, {}, [])("/index.js");
  });
})(pica$2);
var picaExports = pica$2.exports;
const pica = /* @__PURE__ */ getDefaultExportFromCjs(picaExports);
const pica$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: pica
}, [picaExports]);
export {
  pica$1 as p
};
