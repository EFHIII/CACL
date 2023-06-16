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

function fillRect(_x, _y, _w, _h) {
  const [tX, tY, tX2, tY2, X, Y, X2, Y2] = boundingBox(_x, _y, _w, _h);
  const w = tX2 - tX;
  const h = tY2 - tY;
  if(tX % 1 === 0 && tY % 1 === 0 && tX2 % 1 === 0 && tY2 % 1 === 0) {
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
  }
  else {
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
    }
    else {
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
  }
  else {
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
    }
    else {
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
    switch (things[i++]) {
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
        throw(`in worker: unknown function '${things[i]}'`);
    }
  }
}
