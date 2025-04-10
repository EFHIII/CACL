# Color Accurate Canvas Library
AKA CACL (pronounced Cackle)

Demo: https://efhiii.github.io/CACL

## Reason for existing
The HTML Canvas has a decent drawing API, and there are other libraries like [P5.js](https://p5js.org/) that do a good job of adding convenience functions for it. Unfortunately, most libraries have a problem. They don't do anti-aliasing properly. Usually it's not very noticeable, but for some things, it's very noticeable. Just to illustrate the problem, here's an example of what a green circle looks like on a red background using the HTML Canvas API.

![image of green circle on red background with dark outline](https://github.com/user-attachments/assets/1298cb3f-1a5a-43f8-b230-b014e5025228)

Here's what it looks like using this library.

![image of green circle on red background without dark outline](https://github.com/user-attachments/assets/a7a6ce1b-d2de-46ee-975b-7eb4947a0be8)

The reason it's wrong has to do with linear color interpolation in sRGB, which is not a linear color space. The problem becomes even more apparent when animating shapes.

![sRGB-lines](https://github.com/user-attachments/assets/71b81bac-f1fa-424c-b2a5-48e4146ed3f6)

Notice the flickering.

Here's the same thing, but using CACL:

![CACL-lines](https://github.com/user-attachments/assets/6a9161ea-76d2-4dd6-8a6e-85e5183608f5)

Another thing this library does is store color in high bit-depth and then render using dithering. The most obvious benefit being smooth gradients.

here's a gradient in the HTML Canvas

![gradient with banding](https://github.com/user-attachments/assets/7f595bb9-53dc-4840-97d2-84bcfc09f346)

and in CACL

![gradient with dithering](https://github.com/user-attachments/assets/bc3f750f-6cbb-4631-ba3b-eca5597a676e)

## Features
This library renders with color-accurate blending and antialiasing. It also stores color in a high bit depth and dithers to simulate higher than 8-bit color.

It's important to note that all colors are worked on in the linear RGB space. convenience functions are available for converting to and from sRGB.

A full list of functions is bellow:

## Context management

### `cacl.createContext(canvas)`
- Returns: `cacl.context`
Creates a CACL context for a canvas

### `cacl.context.draw()`
Draws the CACL context to its canvas
This is when the conversion for linear RGB to sRGB happens

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
