let ctx2;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function drawGradient(ctx, b, m) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 600, 300);

  for(let x = 0; x < 600; x += 2) {
    for(let y = 0; y < 300; y += 2) {
      ctx.fillStyle = `rgb(${x / 600 * 255}, ${y / 600 * 255}, ${m / 20 * 255})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }

  ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';
  ctx.fillRect(50, 50, 500, 200);


  ctx.fillStyle = '#000';
  ctx.fillRect(75, 125, 450, 75);

  for(let x = 50; x < 550; x++) {
    let c = x / 600 * m + 20;
    ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
    ctx.fillRect(x, 200, 1, 50);
  }

  ctx.fillStyle = '#444';
  for(let i = -10; i < 10; i += 2) {
    ctx.fillRect(100, 150 + i * 2 + m, 400, 1);
  }

  ctx.fillRect(300 - m - 1, 100 - m - 1, m * 2 + 2, m * 2 + 2);

  ctx.fillStyle = '#000';
  ctx.fillRect(300 - m, 100 - m, m * 2, m * 2);
}


function canvasLoop() {
  let t = Date.now();

  postMessage(t);

  drawGradient(ctx2, 0, (Math.sin(t / 1000) + 1) * 10);

  sleep(0).then(canvasLoop);
}

onmessage = function(msg) {
  let canvas = msg.data.canvas;
  ctx2 = canvas.getContext('2d');

  ctx = canvas.getContext('2d', {
    colorSpace: 'srgb',
    alpha: false
  });

  canvasLoop();
}
