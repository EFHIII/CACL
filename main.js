let ctx1 = cacl.createContext(document.getElementById('canvas1'));

let ctx2 = document.getElementById('canvas2').getContext('2d');


function drawGradient(ctx, b, m) {
  for(let i = 0; i < 600; i++) {
    ctx.fillStyle = `rgb(${i / 600 * m + b}, ${i / 600 * m + b}, ${i / 600 * m + b})`;
    ctx.fillRect(i, 0, 1, 300);
  }
}

function loop() {
  let t = Date.now();

  drawGradient(ctx1, 10, (Math.sin(t / 1000) + 1) * 10);
  ctx1.draw();

  drawGradient(ctx2, 10, (Math.sin(t / 1000) + 1) * 10);

  window.requestAnimationFrame(loop);
}

loop();
