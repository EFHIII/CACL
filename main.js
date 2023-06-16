let ctx1 = cacl.createContext(document.getElementById('canvas1'));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function drawGradient(ctx, b, m) {
  ctx.fill(0, 0, 0);
  ctx.fillRect(0, 0, 600, 300);

  for(let x = 0; x < 600; x += 2) {
    for(let y = 0; y < 300; y += 2) {
      ctx.fill(x / 600 * 255, y / 600 * 255, m / 20 * 255);
      ctx.fillRect(x, y, 2, 2);
    }
  }

  ctx.fill(0, 0, 0, 128);
  ctx.fillRect(50, 50, 500, 200);


  ctx.fill(0, 0, 0);
  ctx.fillRect(75, 125, 450, 75);

  for(let x = 50; x < 550; x++) {
    let c = x / 600 * m + 20;
    ctx.fill(c, c, c);
    ctx.fillRect(x, 200, 1, 50);
  }

  ctx.fill(64, 64, 64);
  for(let i = -10; i < 10; i += 2) {
    ctx.fillRect(100, 150 + i * 2 + m, 400, 1);
  }

  ctx.fillRect(300 - m - 1, 100 - m - 1, m * 2 + 2, m * 2 + 2);

  ctx.fill(0, 0, 0);
  ctx.fillRect(300 - m, 100 - m, m * 2, m * 2);
}

let lastT = new Array(50).fill(Date.now());
let lastT2 = new Array(50).fill(Date.now());

let fr = 0;

let libraryText = document.getElementById('libraryText');
let canvasText = document.getElementById('canvasText');

function loop() {
  let t = Date.now();
  lastT.shift();
  lastT.push(t);

  fr++;
  if(fr % 50 === 49) {
    libraryText.innerText = `Custom Library ${Math.round(10000 / (lastT[49] - lastT[0]) * 50)/10} fps`;
  }


  drawGradient(ctx1, 0, (Math.sin(t / 1000) + 1) * 10);


  ctx1.draw().then(loop);
}
loop();


//let ctx2 = document.getElementById('canvas2').getContext('2d');

const offscreenCanvas = document.getElementById('canvas2').transferControlToOffscreen();
let thread = new Worker('src/offscreenCanvas.js');
thread.postMessage({
  canvas: offscreenCanvas
}, [offscreenCanvas]);

let fr2 = 0;
thread.onmessage = msg => {
  fr2++;
  lastT2.shift();
  lastT2.push(msg.data);
  if(fr2 % 50 === 49) {
    canvasText.innerText = `Canvas ${Math.round(10000 / (lastT2[49] - lastT2[0]) * 50)/10} fps`;
  }
};
