# Color Accurate Canvas Library
AKA CACL (pronounced Cackle)

## Reason for existing
The HTML Canvas has a decent drawing API, and there are other libraries like (P5.js)[https://p5js.org/] that do a good job of adding convenience functions for it. Unfortunately, most libraries have a problem. They don't do anti-aliasing properly. Usually it's not very noticeable, but for some things, it's very noticeable. Just to illustrate the problem, here's an example of what a green circle looks like on a red background using the HTML Canvas API.

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

# EVERYTHING BELLOW THIS IS ASPIRATINAL, NOT REALITY

## Context management

### `cacl.createContext(canvas)`
- Returns: `cacl.context`
Creates a CACL context for a canvas

### `cacl.context.draw()`
draws the CACL context to its canvas
This is when the conversion for linear sRGB to sRGB happens

### `cacl.context.setSize(width, height)`
sets the width and height of the CACL context's canvas

### `cacl.context.blendMode(mode)`
- default: `blend`
- options: `blend`, `add`, `multiply`, `darkest`, `lightest`, `difference`, `subtract`, `exclusion`, `screen`, `replace`, `remove`, `overlay`, `hard light`, `soft light`, `dodge`, `burn`

### `calc.context.strokeCap()`

## Drawing

### `cacl.context.background(color)`
clears the CACL canvas and sets every pixel to the color `color`

### `cacl.context.fill(color)`
sets the fill color of the CACL context

### `cacl.context.stroke(color)`
sets the fill color of the CACL context

### `cacl.context.noFill()`
sets to not fill shapes

### `cacl.context.noStroke()`
sets to not outline shapes

### `cacl.context.strokeWidth(size)`
sets the size of strokes

### `cacl.context.rect(x, y, w, h, radius=0)`
fills a rectangle at `(x, y)` of width `w` and height `h`
if radius is set, the corners will be rounded with a radius of `radius` pixels

### `cacl.circle(x, y, radius)`
fills a circle at `(x, y)` with a radius of `radius`

### `cacl.ellipse(x, y, w, h)`
fills an ellipse at `(x, y)` with a width of `w` and height of `h`

### `cacl.arc`

### `cacl.line`

### `cacl.point`

### `cacl.triangle`

### `cacl.quad`

## Shapes

### `cacl.beginShape`

### `cacl.endShape`

### `cacl.vertex`

### `cacl.bezierVertex`

## Color

### `color(r, g, b, alpha=255)`
- Returns: `{r, g, b, a}`

### `linearColor(r, g, b, alpha=255)`
- Returns: `{r, g, b, a}`

### `CSSColor(colorString)`
- Returns: `{r, g, b, a}`

### `hslColor(h, s, l, alpha=255)`
- Returns: `{r, g, b, a}`

### `hsvColor(h, s, v, alpha=255)`
- Returns: `{r, g, b, a}`

## interpolation

### `lerp(from, to, factor = 0.5)`
- Returns: `float`

### `lerpColor(color1, color2, factor = 0.5)`
- Returns: `{r, g, b, a}`

### `blend(color1, color2, blendMode = 'blend')`
- Returns: `{r, g, b, a}`

### `averageColors([colors])`
- Returns: `{r, g, b, a}`

### `cubicBezier(t, p1, p2, m1, m2)`
- Returns: `{x: float, y: float}`
takes in 4 points, `{x, y}`; starting point `p1`, ending point `p2`, control point 1 `m1`, and control point 2, `m2`, and returns the interpolated point t along.

### `pointOnBezier(bezier, x, resolution=20)`
- Returns: `float`
takes in a bezier object `{p1, p2, m1, m2}` and returns the `y` position of a point on the bezier at `x`
If there are multiple points on the bezier at `x`, it will only return the `y` position of one of them
The process is iterative. By default, it does 20 steps which can be changed via `resolution`

### `easeValue(atTime, fromTime, toTime, fromValue, toValue, easeA, easeB, beforeFromTime = false, afterToTime = false, beforeFromValue = false, afterToValue = false, resolution = 20)`
- Returns: `float`
returns a value eased between `fromValue` and `toValue` at `atTime` optionally taking into account a previous control point and/or a subsequent control point
