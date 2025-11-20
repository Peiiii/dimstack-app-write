(() => {
  var _a, _b, _c;
  (_a = Path2D.prototype).roundRect ?? (_a.roundRect = roundRect);
  if (globalThis.CanvasRenderingContext2D) {
    (_b = globalThis.CanvasRenderingContext2D.prototype).roundRect ?? (_b.roundRect = roundRect);
  }
  if (globalThis.OffscreenCanvasRenderingContext2D) {
    (_c = globalThis.OffscreenCanvasRenderingContext2D.prototype).roundRect ?? (_c.roundRect = roundRect);
  }
  function roundRect(x, y, w, h, radii) {
    if (![x, y, w, h].every((input) => Number.isFinite(input))) {
      return;
    }
    radii = parseRadiiArgument(radii);
    let upperLeft, upperRight, lowerRight, lowerLeft;
    if (radii.length === 4) {
      upperLeft = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[1]);
      lowerRight = toCornerPoint(radii[2]);
      lowerLeft = toCornerPoint(radii[3]);
    } else if (radii.length === 3) {
      upperLeft = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[1]);
      lowerLeft = toCornerPoint(radii[1]);
      lowerRight = toCornerPoint(radii[2]);
    } else if (radii.length === 2) {
      upperLeft = toCornerPoint(radii[0]);
      lowerRight = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[1]);
      lowerLeft = toCornerPoint(radii[1]);
    } else if (radii.length === 1) {
      upperLeft = toCornerPoint(radii[0]);
      upperRight = toCornerPoint(radii[0]);
      lowerRight = toCornerPoint(radii[0]);
      lowerLeft = toCornerPoint(radii[0]);
    } else {
      throw new RangeError(`${getErrorMessageHeader(this)} ${radii.length} is not a valid size for radii sequence.`);
    }
    const corners = [upperLeft, upperRight, lowerRight, lowerLeft];
    const negativeCorner = corners.find(({ x: x2, y: y2 }) => x2 < 0 || y2 < 0);
    (negativeCorner == null ? void 0 : negativeCorner.x) < 0 ? negativeCorner.x : negativeCorner == null ? void 0 : negativeCorner.y;
    if (corners.some(({ x: x2, y: y2 }) => !Number.isFinite(x2) || !Number.isFinite(y2))) {
      return;
    }
    if (negativeCorner) {
      throw new RangeError(`${getErrorMessageHeader(this)} Radius value ${negativeCorner} is negative.`);
    }
    fixOverlappingCorners(corners);
    if (w < 0 && h < 0) {
      this.moveTo(x - upperLeft.x, y);
      this.ellipse(x + w + upperRight.x, y - upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI * 1.5, -Math.PI);
      this.ellipse(x + w + lowerRight.x, y + h + lowerRight.y, lowerRight.x, lowerRight.y, 0, -Math.PI, -Math.PI / 2);
      this.ellipse(x - lowerLeft.x, y + h + lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, -Math.PI / 2, 0);
      this.ellipse(x - upperLeft.x, y - upperLeft.y, upperLeft.x, upperLeft.y, 0, 0, -Math.PI / 2);
    } else if (w < 0) {
      this.moveTo(x - upperLeft.x, y);
      this.ellipse(x + w + upperRight.x, y + upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI / 2, -Math.PI, 1);
      this.ellipse(x + w + lowerRight.x, y + h - lowerRight.y, lowerRight.x, lowerRight.y, 0, -Math.PI, -Math.PI * 1.5, 1);
      this.ellipse(x - lowerLeft.x, y + h - lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, Math.PI / 2, 0, 1);
      this.ellipse(x - upperLeft.x, y + upperLeft.y, upperLeft.x, upperLeft.y, 0, 0, -Math.PI / 2, 1);
    } else if (h < 0) {
      this.moveTo(x + upperLeft.x, y);
      this.ellipse(x + w - upperRight.x, y - upperRight.y, upperRight.x, upperRight.y, 0, Math.PI / 2, 0, 1);
      this.ellipse(x + w - lowerRight.x, y + h + lowerRight.y, lowerRight.x, lowerRight.y, 0, 0, -Math.PI / 2, 1);
      this.ellipse(x + lowerLeft.x, y + h + lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, -Math.PI / 2, -Math.PI, 1);
      this.ellipse(x + upperLeft.x, y - upperLeft.y, upperLeft.x, upperLeft.y, 0, -Math.PI, -Math.PI * 1.5, 1);
    } else {
      this.moveTo(x + upperLeft.x, y);
      this.ellipse(x + w - upperRight.x, y + upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI / 2, 0);
      this.ellipse(x + w - lowerRight.x, y + h - lowerRight.y, lowerRight.x, lowerRight.y, 0, 0, Math.PI / 2);
      this.ellipse(x + lowerLeft.x, y + h - lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, Math.PI / 2, Math.PI);
      this.ellipse(x + upperLeft.x, y + upperLeft.y, upperLeft.x, upperLeft.y, 0, Math.PI, Math.PI * 1.5);
    }
    this.closePath();
    this.moveTo(x, y);
    function toDOMPointInit(value) {
      const { x: x2, y: y2, z, w: w2 } = value;
      return { x: x2, y: y2, z, w: w2 };
    }
    function parseRadiiArgument(value) {
      const type = typeof value;
      if (type === "undefined" || value === null) {
        return [0];
      }
      if (type === "function") {
        return [NaN];
      }
      if (type === "object") {
        if (typeof value[Symbol.iterator] === "function") {
          return [...value].map((elem) => {
            const elemType = typeof elem;
            if (elemType === "undefined" || elem === null) {
              return 0;
            }
            if (elemType === "function") {
              return NaN;
            }
            if (elemType === "object") {
              return toDOMPointInit(elem);
            }
            return toUnrestrictedNumber(elem);
          });
        }
        return [toDOMPointInit(value)];
      }
      return [toUnrestrictedNumber(value)];
    }
    function toUnrestrictedNumber(value) {
      return +value;
    }
    function toCornerPoint(value) {
      const asNumber = toUnrestrictedNumber(value);
      if (Number.isFinite(asNumber)) {
        return {
          x: asNumber,
          y: asNumber
        };
      }
      if (Object(value) === value) {
        return {
          x: toUnrestrictedNumber(value.x ?? 0),
          y: toUnrestrictedNumber(value.y ?? 0)
        };
      }
      return {
        x: NaN,
        y: NaN
      };
    }
    function fixOverlappingCorners(corners2) {
      const [upperLeft2, upperRight2, lowerRight2, lowerLeft2] = corners2;
      const factors = [
        Math.abs(w) / (upperLeft2.x + upperRight2.x),
        Math.abs(h) / (upperRight2.y + lowerRight2.y),
        Math.abs(w) / (lowerRight2.x + lowerLeft2.x),
        Math.abs(h) / (upperLeft2.y + lowerLeft2.y)
      ];
      const minFactor = Math.min(...factors);
      if (minFactor <= 1) {
        for (const radii2 of corners2) {
          radii2.x *= minFactor;
          radii2.y *= minFactor;
        }
      }
    }
  }
  function getErrorMessageHeader(instance) {
    return `Failed to execute 'roundRect' on '${getConstructorName(instance)}':`;
  }
  function getConstructorName(instance) {
    return Object(instance) === instance && instance instanceof Path2D ? "Path2D" : instance instanceof (globalThis == null ? void 0 : globalThis.CanvasRenderingContext2D) ? "CanvasRenderingContext2D" : instance instanceof (globalThis == null ? void 0 : globalThis.OffscreenCanvasRenderingContext2D) ? "OffscreenCanvasRenderingContext2D" : (instance == null ? void 0 : instance.constructor.name) || instance;
  }
})();
