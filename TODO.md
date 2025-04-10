# TODO
## Context management
[x] `cacl.createContext(canvas)`
[x] `cacl.context.draw()`
[x] `cacl.context.setSize(width, height)`

## Drawing
[x] `cacl.context.background(color)`
[x] `cacl.context.fill(r, g, b, a?)`
[x] `cacl.context.fillRect(x, y, w, h)`
[x] `cacl.circle(x, y, radius)`
[x] `cacl.line(x1, y1, x2, y2)`
[x] `cacl.point(x, y)`

## Shapes
[x] `cacl.beginPath()`
[x] `cacl.closePath()`
[x] `cacl.moveTo(x, y)`
[x] `cacl.fillPath()`
[x] `cacl.fillPathAliased()`
[x] `cacl.strokePath()`

## Color
[x] `sRGBtolRGB(r, g, b, a?)`
[x] `lRGBtosRGB(r, g, b, a?)`
[x] `parseCSSColorString(colorString)`

## interpolation
[x] `lerp(from, to, factor = 0.5)`
[x] `lerpColor(color1, color2, factor = 0.5)`
[x] `pointOnBezier: (x1, y1, x2, y2, x3, y3, t)`
[x] `easeValue(atTime, fromTime, toTime, fromValue, toValue, easeA, easeB, beforeFromTime = false, beforeFromValue = false, afterToTime = false, afterToValue = false)`
[x] `weightedAverage(values, weights)`
[x] `weightedArrayAverage(values, weights)`
[x] `averageColors([colors])`
[x] `weightedAverageColors(colors, weights)`

# helper
[x] `cacl.boundingBox(x, y, w, h)`
[x] `cacl.lineIntersection(ax, ay, bx, by, cx, cy, dx, dy)`
[x] `cacl.pointInPath(x, y)`
