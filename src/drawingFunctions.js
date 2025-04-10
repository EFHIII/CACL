function boundingBox(x, y, w, h) {
  const tX = Math.max(Math.min(x, width), 0);
  const tY = Math.max(Math.min(y, height), 0);
  const tX2 = Math.max(Math.min(x + w, width), 0);
  const tY2 = Math.max(Math.min(y + h, height), 0);
  return [
    tX,
    tY,
    tX2,
    tY2,
    Math.floor(tX),
    Math.floor(tY),
    Math.ceil(tX2),
    Math.ceil(tY2)
  ];
}

function lineIntersection(ax, ay, bx, by, cx, cy, dx, dy) {
  const a1 = by - ay;
  const b1 = ax - bx;

  const a2 = dy - cy;
  const b2 = cx - dx;

  const det = a1 * b2 - a2 * b1;

  //// parallel
  //if(det === 0) {
  //  return [NaN, NaN];
  //}

  const c1 = a1 * ax + b1 * ay;
  const c2 = a2 * cx + b2 * cy;

  return [
    (b2 * c1 - b1 * c2) / det,
    (a1 * c2 - a2 * c1) / det
  ];
}

function closestPointOnLine(x, y, x1, y1, x2, y2) {
  // intersection of line of normal vector from point and line
  const a1 = y2 - y1;
  const b1 = x1 - x2;
  const b2 = y1 - y2;

  const det = a1 * b2 - b1 * b1;

  const c1 = a1 * x1 + b1 * y1;
  const c2 = b1 * x + b2 * y;

  const ansx = (b2 * c1 - b1 * c2) / det;
  const ansy = (a1 * c2 - b1 * c1) / det;

  // clamp to line segment
  if(x1 === x2) {
    if(y1 < y2) {
      if(ansy < y1) {
        return [x1, y1];
      }
      if(ansy > y2) {
        return [x2, y2];
      }
      return [ansx, ansy];
    } else {
      if(ansy > y1) {
        return [x1, y1];
      }
      if(ansy < y2) {
        return [x2, y2];
      }
      return [ansx, ansy];
    }
  }
  if(x1 < x2) {
    if(ansx < x1) {
      return [x1, y1];
    }
    if(ansx > x2) {
      return [x2, y2];
    }
    return [ansx, ansy];
  }
  if(ansx > x1) {
    return [x1, y1];
  }
  if(ansx < x2) {
    return [x2, y2];
  }
  return [ansx, ansy];
}

function rightOfLine(x, y, x1, y1, x2, y2) {
  if(x1 === x2) {
    return y1 > y2 ? x > x1 : x < x1;
  }
  const sl = (y2 - y1) / (x2 - x1);
  return x1 > x2 === y - y1 < sl * x - x1 * sl;
}

function dist2FromShape(x, y, verts) {
  const closest = closestPointOnLine(x, y, verts[verts.length - 1][0], verts[verts.length - 1][1], verts[0][0], verts[0][1]);
  let closestDist = (closest[0] - x) * (closest[0] - x) + (closest[1] - y) * (closest[1] - y);

  for(let v = 1; v < verts.length; v++) {
    let newClosest = closestPointOnLine(x, y, verts[v - 1][0], verts[v - 1][1], verts[v][0], verts[v][1]);
    let newClosestDist = (newClosest[0] - x) ** 2 + (newClosest[1] - y) ** 2;
    if(newClosestDist < closestDist) {
      closestDist = newClosestDist;
    }
  }

  return closestDist;
}

function fillShape(verts) {
  // ray cast from minX-1 -> maxX+1
  // alternate from filling everything between
  // fill in anti-aliasing using dist2FromShape
  // stop when dist2FromShape > 1 or > lastDist
  // touch-up anti-aliasing around verticies where v-1.y < v.y > v+1.y or v-1.y > v.y < v+1.y
}

function strokeShape(verts) {
  // ray cast from minX-1 -> maxX+1
  // fill in anti-aliasing using dist2FromShape
  // stop when dist2FromShape > 1 or > lastDist
  // touch-up anti-aliasing around verticies where v-1.y < v.y > v+1.y or v-1.y > v.y < v+1.y
}

function fillAndStrokeShape(verts) {
  // ray cast from minX-1 -> maxX+1
  // fill in anti-aliasing using dist2FromShape
  // stop when dist2FromShape > 1 or > lastDist
  // touch-up anti-aliasing around verticies where v-1.y < v.y > v+1.y or v-1.y > v.y < v+1.y
}

function circle(_x, _y, r) {}

function ellipse(_x, _y, _w, _h) {}

function triangle(x1, y1, x2, y2, x3, y3) {}

function quad(x1, y1, x2, y2, x3, y3, x4, y4) {}

function fillRect(_x, _y, _w, _h) {
  const [tX, tY, tX2, tY2, X, Y, X2, Y2] = boundingBox(_x, _y, _w, _h);
  const w = tX2 - tX;
  const h = tY2 - tY;
  if(tX === X && tY === Y && tX2 === X2 && tY2 === Y2) {
    for(let y = tY; y < tY2; y++) {
      let pos = (tX + y * width) << 2;
      for(let x = tX; x < tX2; x++, pos += 4) {
        imageData[pos + 0] = fillStyle.a * fillStyle.r * 65535 + (1 - fillStyle.a) * imageData[pos + 0];
        imageData[pos + 1] = fillStyle.a * fillStyle.g * 65535 + (1 - fillStyle.a) * imageData[pos + 1];
        imageData[pos + 2] = fillStyle.a * fillStyle.b * 65535 + (1 - fillStyle.a) * imageData[pos + 2];
        imageData[pos + 3] = fillStyle.a * 65535 + (1 - fillStyle.a) * imageData[pos + 3];
      }
    }
    return;
  }

  for(let y = Y + 1; y < Y2 - 1; y++) {
    let pos = (X + 1 + y * width) << 2;
    for(let x = X + 1; x < X2 - 1; x++, pos += 4) {
      imageData[pos + 0] = fillStyle.a * fillStyle.r * 65535 + (1 - fillStyle.a) * imageData[pos + 0];
      imageData[pos + 1] = fillStyle.a * fillStyle.g * 65535 + (1 - fillStyle.a) * imageData[pos + 1];
      imageData[pos + 2] = fillStyle.a * fillStyle.b * 65535 + (1 - fillStyle.a) * imageData[pos + 2];
      imageData[pos + 3] = fillStyle.a * 65535 + (1 - fillStyle.a) * imageData[pos + 3];
    }
  }

  const yTop = Y;
  const yBottom = Y2 - 1;

  if(yTop === yBottom) {
    const alpha = h * fillStyle.a;
    let pos = (X + 1 + yTop * width) << 2;
    for(let x = X + 1; x < X2 - 1; x++, pos += 4) {
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
  } else {
    const alphaTop = (1 - (tY % 1)) * fillStyle.a;
    const alphaBottom = (tY2 % 1) * fillStyle.a;
    for(let x = X + 1; x < X2 - 1; x++) {
      // top
      let pos = (x + yTop * width) << 2;
      imageData[pos + 0] = alphaTop * fillStyle.r * 65535 + (1 - alphaTop) * imageData[pos + 0];
      imageData[pos + 1] = alphaTop * fillStyle.g * 65535 + (1 - alphaTop) * imageData[pos + 1];
      imageData[pos + 2] = alphaTop * fillStyle.b * 65535 + (1 - alphaTop) * imageData[pos + 2];
      imageData[pos + 3] = alphaTop * 65535 + (1 - alphaTop) * imageData[pos + 3];
      // bottom
      pos = (x + yBottom * width) << 2;
      imageData[pos + 0] = alphaBottom * fillStyle.r * 65535 + (1 - alphaBottom) * imageData[pos + 0];
      imageData[pos + 1] = alphaBottom * fillStyle.g * 65535 + (1 - alphaBottom) * imageData[pos + 1];
      imageData[pos + 2] = alphaBottom * fillStyle.b * 65535 + (1 - alphaBottom) * imageData[pos + 2];
      imageData[pos + 3] = alphaBottom * 65535 + (1 - alphaBottom) * imageData[pos + 3];
    }
  }

  const xLeft = X;
  const xRight = X2 - 1;

  if(xLeft === xRight) {
    const alpha = w * fillStyle.a;
    for(let y = Y + 1; y < Y2 - 1; y++) {
      let pos = (xLeft + y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }

    // corners
    if(yTop === yBottom) {
      let alpha = w * h * fillStyle.a;
      let pos = (X + Y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    } else {
      let alpha = (1 - (tY % 1)) * w * fillStyle.a;
      let pos = (X + Y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = (tY2 % 1) * w * fillStyle.a;
      pos = (X + (Y2 - 1) * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
  } else {
    const alphaLeft = (1 - (tX % 1)) * fillStyle.a;
    const alphaRight = (tX2 % 1) * fillStyle.a;
    for(let y = Y + 1; y < Y2 - 1; y++) {
      // left
      let pos = (xLeft + y * width) << 2;
      imageData[pos + 0] = alphaLeft * fillStyle.r * 65535 + (1 - alphaLeft) * imageData[pos + 0];
      imageData[pos + 1] = alphaLeft * fillStyle.g * 65535 + (1 - alphaLeft) * imageData[pos + 1];
      imageData[pos + 2] = alphaLeft * fillStyle.b * 65535 + (1 - alphaLeft) * imageData[pos + 2];
      imageData[pos + 3] = alphaLeft * 65535 + (1 - alphaLeft) * imageData[pos + 3];
      // right
      pos = (xRight + y * width) << 2;
      imageData[pos + 0] = alphaRight * fillStyle.r * 65535 + (1 - alphaRight) * imageData[pos + 0];
      imageData[pos + 1] = alphaRight * fillStyle.g * 65535 + (1 - alphaRight) * imageData[pos + 1];
      imageData[pos + 2] = alphaRight * fillStyle.b * 65535 + (1 - alphaRight) * imageData[pos + 2];
      imageData[pos + 3] = alphaRight * 65535 + (1 - alphaRight) * imageData[pos + 3];
    }

    // corners
    if(yTop === yBottom) {
      let alpha = (1 - (tX % 1)) * h * fillStyle.a;
      let pos = (X + Y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = (tX2 % 1) * h * fillStyle.a;
      pos = (X2 - 1 + Y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    } else {
      const alphaTop = 1 - (tY % 1);
      const alphaBottom = tY2 % 1;
      const alphaLeft = 1 - (tX % 1);
      const alphaRight = tX2 % 1;

      let alpha = alphaLeft * alphaTop * fillStyle.a;
      let pos = (X + Y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = alphaRight * alphaTop * fillStyle.a;
      pos = (X2 - 1 + Y * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = alphaLeft * alphaBottom * fillStyle.a;
      pos = (X + (Y2 - 1) * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = alphaRight * alphaBottom * fillStyle.a;
      pos = (X2 - 1 + (Y2 - 1) * width) << 2;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
  }
}

function drawThings(things, eoi) {
  for(let i = 0; i < eoi;) {
    switch(things[i++]) {
      case 0: // fillStyle
        fillStyle = {
          r: things[i++],
          g: things[i++],
          b: things[i++],
          a: things[i++]
        };
        break;
      case 1: // fillRect
        fillRect(things[i++], things[i++], things[i++], things[i++]);
        break;
      default:
        throw (`in worker: unknown function '${things[i]}'`);
    }
  }
}
