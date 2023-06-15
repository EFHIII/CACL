let ctx1 = cacl.createContext(document.getElementById('canvas1'));

let ctx2 = document.getElementById('canvas2').getContext('2d');


function drawGradient(ctx, b, m) {
  for(let i = 0; i < 600; i++) {
    ctx.fillStyle = `rgb(${i / 600 * m + b}, ${i / 600 * m + b}, ${i / 600 * m + b})`;
    ctx.fillRect(i, 0, 1, 300);
  }

  ctx.fillStyle = '#444';
  for(let i = -10; i < 10; i += 2) {
    ctx.fillRect(100, 150 + i * 2 + m, 400, 1);
  }

  ctx.fillRect(300 - m - 1, 100 - m - 1, m * 2 + 2, m * 2 + 2);

  ctx.fillStyle = '#000';
  ctx.fillRect(300 - m, 100 - m, m * 2, m * 2);
}

function loop() {
  let t = Date.now();

  drawGradient(ctx1, 0, (Math.sin(t / 1000) + 1) * 10);

  drawGradient(ctx2, 0, (Math.sin(t / 1000) + 1) * 10);

  ctx1.draw().then(loop);
//  window.requestAnimationFrame(loop);
}

loop();
