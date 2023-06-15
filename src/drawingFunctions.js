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
        imageData[(x + y * width) * 4 + 0] = Math.round(fillStyle.r * 65535);
        imageData[(x + y * width) * 4 + 1] = Math.round(fillStyle.g * 65535);
        imageData[(x + y * width) * 4 + 2] = Math.round(fillStyle.b * 65535);
        imageData[(x + y * width) * 4 + 3] = Math.round(fillStyle.a * 65535);
      }
    }
    return;
  }
  console.log(x, y, w, h, fillStyle);
}

function loadState(state) {
  width = state.width;
  height = state.height;
  fillStyle = state.fillStyle;
}

function drawThing(thing) {
  switch (thing.function) {
    case 'fillRect':
      loadState(thing.state);
      fillRect(...thing.params);
    break;
    default:
      console.error(`in worker: unknown function '${thing.function}'`, thing);
  }
}
