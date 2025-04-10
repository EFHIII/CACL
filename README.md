# Color Accurate Canvas Library
AKA CACL (pronounced Cackle)

Demo: https://efhiii.github.io/CACL

## Reason for existing
The HTML Canvas has a decent drawing API, and there are other libraries like [P5.js](https://p5js.org/) that do a good job of adding convenience functions for it. Unfortunately, most libraries have a problem. They don't do anti-aliasing properly. Usually it's not very noticeable, but for some things, it's very noticeable. Just to illustrate the problem, here's an example of what a green circle looks like on a red background using the HTML Canvas API.

!(image of green circle on red background with dark outline)[]

Here's what it looks like using this library.

!(image of green circle on red background without dark outline)[]

This reason it's wrong has to do with linear color interpolation in sRGB, which is not a linear color space. The problem becomes even more apparent when animating shapes.

<Gif>

Notice the flickering.

Here's the same thing, but using this library:

<Gif>

## Features
This library renders shapes, lines, curves, bitmaps, and images with color-accurate blending and antialiasing. ~~Normal text isn't supported at the moment, but to compensate, a custom form of bitmap fonts is and extended versions of *Press Start 2P* and *Minecraft* are included. If you want non-bitmap fonts, it's recommended to use HTML elements placed on top of the canvas via CSS.~~ Nothing is supported at the moment.

It's important to note that all colors are worked on in the linear sRGB space. convenience functions are available for converting from other common formats.

A full list of functions is bellow:

## Context management

### `cacl.createContext(canvas)`
- Returns: `cacl.context`
Creates a CACL context for a canvas

### `cacl.context.draw()`
Draws the CACL context to its canvas
This is when the conversion for linear sRGB to sRGB happens

### `cacl.context.setSize(width, height)`
Sets the width and height of the CACL context's canvas

## Drawing

### `cacl.context.background(color)`
Clears the CACL canvas and sets every pixel to the color `color`

### `cacl.context.fill(color)`
Sets the fill color of the CACL context

### `cacl.context.fillRect(x, y, w, h)`
Fills a rectangle at `(x, y)` of width `w` and height `h`

### `cacl.circle(x, y, radius)`
Fills a circle at `(x, y)` with a radius of `radius`

### `cacl.line(x1, y1, x2, y2)`
Draws a line from (x1, y1) to (x2, y2)

### `cacl.point(x, y)`
Draws a point at (x, y)

## Shapes

### `cacl.beginPath()`
Starts a shape

### `cacl.closePath()`
Ends a shape

### `cacl.moveTo(x, y)`
Appends a vertex to a shape

### `cacl.fillPath()`
Draws the shape

### `cacl.fillPathAliased()`
Draws the shape without anti-aliasing

### `cacl.strokePath()`
Draws the outline of the shape

## Color

### `parseCSSColorString(cssString)`
- Returns: `{r, g, b, a}`
Parses a CSS color string and returns a color object.
Supports hex (`#RGB`, `#RGBA`, `#RRGGBB`, and `#RRGGBBAA`), rgb (`rgb(red, green, blue)`), rgba (`rgba(red, green blue, alpha)`), and color names (ex. `mediumaquamarine`)

### `sRGBtolRGB({r, g, b, a})`
- Returns: `{r, g, b, a}`
Converts a sRGB color object to a linear RGB color object

### `lRGBtosRGB({r, g, b, a})`
- Returns: `{r, g, b, a}`
Converts a linear RGB color object to a sRGB color object

## interpolation

### `lerp(from, to, factor = 0.5)`
- Returns: `float`

### `lerpColor(color1, color2, factor = 0.5)`
- Returns: `{r, g, b, a}`

### `blend(color1, color2, blendMode = 'blend')`
- Returns: `{r, g, b, a}`

### `averageColors([colors])`
- Returns: `{r, g, b, a}`

### `cubicBezier(p1, p2, p3, p4, t)`
- Returns: `float`
Takes in 4 1D points; starting point `p1`, ending point `p4`, control point 1 `p2`, and control point 2, `p3`, and returns the interpolated point `t`.

### `pointOnBezier(x1, y1, c1x, c1y, c2x, c2y, x2, y2, x, resolution = 20)`
- Returns: `float`
Takes in a bezier and returns the `y` position of a point on the bezier at `x`
If there are multiple points on the bezier at `x`, it will only return the `y` position of one of them
The process is iterative. By default, it does 20 steps which can be changed via `resolution`

### `easeValue(atTime, fromTime, toTime, fromValue, toValue, easeA, easeB, beforeFromTime = false, afterToTime = false, beforeFromValue = false, afterToValue = false, resolution = 20)`
- Returns: `float`
Returns a value eased between `fromValue` and `toValue` at `atTime` optionally taking into account a previous control point and/or a subsequent control point
