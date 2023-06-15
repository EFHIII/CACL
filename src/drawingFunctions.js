function boundingBox(x, y, w, h) {
  const X = Math.max(Math.min(Math.floor(x), width), 0);
  const Y = Math.max(Math.min(Math.floor(y), height), 0);
  return {
    x: X,
    y: Y,
    width: Math.max(Math.min(Math.ceil(x + w), width), 0) - X,
    height: Math.max(Math.min(Math.ceil(y + h), height), 0) - Y
  };
}

function fillRect(x, y, w, h) {
  const bounds = boundingBox(x, y, w, h);
  if(x % 1 === 0 && y % 1 === 0 && w % 1 === 0 && h % 1 === 0) {
    for(let x = bounds.x; x < bounds.x + bounds.width; x++) {
      for(let y = bounds.y; y < bounds.y + bounds.height; y++) {
        const pos = (x + y * width) * 4;
        imageData[pos + 0] = fillStyle.a * fillStyle.r * 65535 + (1 - fillStyle.a) * imageData[pos + 0];
        imageData[pos + 1] = fillStyle.a * fillStyle.g * 65535 + (1 - fillStyle.a) * imageData[pos + 1];
        imageData[pos + 2] = fillStyle.a * fillStyle.b * 65535 + (1 - fillStyle.a) * imageData[pos + 2];
        imageData[pos + 3] = fillStyle.a * 65535 + (1 - fillStyle.a) * imageData[pos + 3];
      }
    }
    return;
  }

  for(let x = bounds.x + 1; x < bounds.x - 1 + bounds.width; x++) {
    for(let y = bounds.y + 1; y < bounds.y - 1 + bounds.height; y++) {
      const pos = (x + y * width) * 4;
      imageData[pos + 0] = fillStyle.a * fillStyle.r * 65535 + (1 - fillStyle.a) * imageData[pos + 0];
      imageData[pos + 1] = fillStyle.a * fillStyle.g * 65535 + (1 - fillStyle.a) * imageData[pos + 1];
      imageData[pos + 2] = fillStyle.a * fillStyle.b * 65535 + (1 - fillStyle.a) * imageData[pos + 2];
      imageData[pos + 3] = fillStyle.a * 65535 + (1 - fillStyle.a) * imageData[pos + 3];
    }
  }

  const yTop = bounds.y;
  const yBottom = bounds.y + bounds.height - 1;

  if(yTop === yBottom) {
    const alpha = h * fillStyle.a;
    for(let x = bounds.x + 1; x < bounds.x - 1 + bounds.width; x++) {
      let pos = (x + yTop * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
  }
  else {
    const alphaTop = (1 - (y % 1)) * fillStyle.a;
    const alphaBottom = ((y + h) % 1) * fillStyle.a;
    for(let x = bounds.x + 1; x < bounds.x - 1 + bounds.width; x++) {
      // top
      let pos = (x + yTop * width) * 4;
      imageData[pos + 0] = alphaTop * fillStyle.r * 65535 + (1 - alphaTop) * imageData[pos + 0];
      imageData[pos + 1] = alphaTop * fillStyle.g * 65535 + (1 - alphaTop) * imageData[pos + 1];
      imageData[pos + 2] = alphaTop * fillStyle.b * 65535 + (1 - alphaTop) * imageData[pos + 2];
      imageData[pos + 3] = alphaTop * 65535 + (1 - alphaTop) * imageData[pos + 3];
      // bottom
      pos = (x + yBottom * width) * 4;
      imageData[pos + 0] = alphaBottom * fillStyle.r * 65535 + (1 - alphaBottom) * imageData[pos + 0];
      imageData[pos + 1] = alphaBottom * fillStyle.g * 65535 + (1 - alphaBottom) * imageData[pos + 1];
      imageData[pos + 2] = alphaBottom * fillStyle.b * 65535 + (1 - alphaBottom) * imageData[pos + 2];
      imageData[pos + 3] = alphaBottom * 65535 + (1 - alphaBottom) * imageData[pos + 3];
    }
  }

  const xLeft = bounds.x;
  const xRight = bounds.x + bounds.width - 1;

  if(xLeft === xRight) {
    const alpha = w * fillStyle.a;
    for(let y = bounds.y + 1; y < bounds.y - 1 + bounds.height; y++) {
      let pos = (xLeft + y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }

    // corners
    if(yTop === yBottom) {
      let alpha = w * h * fillStyle.a;
      let pos = (bounds.x + bounds.y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
    else {
      let alpha = (1 - (y % 1)) * w * fillStyle.a;
      let pos = (bounds.x + bounds.y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = ((y + h) % 1) * w * fillStyle.a;
      pos = (bounds.x + (bounds.y + bounds.height - 1) * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
  }
  else {
    const alphaLeft = (1 - (x % 1)) * fillStyle.a;
    const alphaRight = ((x + w) % 1) * fillStyle.a;
    for(let y = bounds.y + 1; y < bounds.y - 1 + bounds.height; y++) {
      // left
      let pos = (xLeft + y * width) * 4;
      imageData[pos + 0] = alphaLeft * fillStyle.r * 65535 + (1 - alphaLeft) * imageData[pos + 0];
      imageData[pos + 1] = alphaLeft * fillStyle.g * 65535 + (1 - alphaLeft) * imageData[pos + 1];
      imageData[pos + 2] = alphaLeft * fillStyle.b * 65535 + (1 - alphaLeft) * imageData[pos + 2];
      imageData[pos + 3] = alphaLeft * 65535 + (1 - alphaLeft) * imageData[pos + 3];
      // right
      pos = (xRight + y * width) * 4;
      imageData[pos + 0] = alphaRight * fillStyle.r * 65535 + (1 - alphaRight) * imageData[pos + 0];
      imageData[pos + 1] = alphaRight * fillStyle.g * 65535 + (1 - alphaRight) * imageData[pos + 1];
      imageData[pos + 2] = alphaRight * fillStyle.b * 65535 + (1 - alphaRight) * imageData[pos + 2];
      imageData[pos + 3] = alphaRight * 65535 + (1 - alphaRight) * imageData[pos + 3];
    }

    // corners
    if(yTop === yBottom) {
      let alpha = (1 - (x % 1)) * h * fillStyle.a;
      let pos = (bounds.x + bounds.y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = ((x + w) % 1) * h * fillStyle.a;
      pos = (bounds.x + bounds.width - 1 + bounds.y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];
    }
    else {
      const alphaTop = 1 - (y % 1);
      const alphaBottom = (y + h) % 1;
      const alphaLeft = 1 - (x % 1);
      const alphaRight = (x + w) % 1;

      let alpha = alphaLeft * alphaTop * fillStyle.a;
      let pos = (bounds.x + bounds.y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = alphaRight * alphaTop * fillStyle.a;
      pos = (bounds.x + bounds.width - 1 + bounds.y * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = alphaLeft * alphaBottom * fillStyle.a;
      pos = (bounds.x + (bounds.y + bounds.height - 1) * width) * 4;
      imageData[pos + 0] = alpha * fillStyle.r * 65535 + (1 - alpha) * imageData[pos + 0];
      imageData[pos + 1] = alpha * fillStyle.g * 65535 + (1 - alpha) * imageData[pos + 1];
      imageData[pos + 2] = alpha * fillStyle.b * 65535 + (1 - alpha) * imageData[pos + 2];
      imageData[pos + 3] = alpha * 65535 + (1 - alpha) * imageData[pos + 3];

      alpha = alphaRight * alphaBottom * fillStyle.a;
      pos = (bounds.x + bounds.width - 1 + (bounds.y + bounds.height - 1) * width) * 4;
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
