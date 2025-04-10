let ctx;
let lag = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let star = [];
for (let i = 0; i < Math.PI * 2; i += Math.PI * 2 / 5) {
  star.push([Math.sin(i) * 50, -Math.cos(i) * 50]);
  star.push([Math.sin(i + Math.PI / 5) * 25, -Math.cos(i + Math.PI / 5) * 25]);
}

let frame = 0;

function drawGradient(ctx, b, m) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 600, 300);

  if (lag) {
    for (let x = 0; x < 600; x += 2) {
      for (let y = 0; y < 300; y += 2) {
        ctx.fillStyle = `#${Math.round(x / 600 * 255).toString(16).padStart(2,0)}${Math.round(y / 600 * 255).toString(16).padStart(2,0)}${Math.round(m / 20 * 255).toString(16).padStart(2,0)}`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';
  ctx.fillRect(50, 50, 500, 200);


  ctx.fillStyle = '#000';
  ctx.fillRect(75, 125, 450, 75);

  for (let x = 50; x < 550; x++) {
    let c = (x + 200) / 33 + 20 + m / 2;
    let c1 = Math.round(c).toString(16).padStart(2, 0);
    let c2 = Math.round(80 - c).toString(16).padStart(2, 0);
    ctx.fillStyle = `#${c1}${c1}${c2}`;
    ctx.fillRect(x, 200, 1, 30);

    c1 = (Math.round(c) * 3 - 60).toString(16).padStart(2, 0);
    c2 = (Math.round(80 - c) * 3 - 60).toString(16).padStart(2, 0);
    ctx.fillStyle = `#${c1}${c1}${c2}`;
    ctx.fillRect(x, 230, 1, 30);

    c1 = (Math.round(c * 3) - 60).toString(16).padStart(2, 0);
    c2 = (Math.round((80 - c) * 3) - 60).toString(16).padStart(2, 0);
    ctx.fillStyle = `#${c1}${c1}${c2}`;
    ctx.fillRect(x, 260, 1, 30);
  }

  ctx.fillStyle = '#444';
  for (let i = -10; i < 10; i += 2) {
    ctx.fillRect(100, 150 + i * 2 + m, 400, 1);
  }

  //ctx.fillRect(300 - m - 1, 100 - m - 1, m * 2 + 2, m * 2 + 2);

  ctx.fillStyle = '#0f0';
  ctx.fillRect(300 - m, 100 - m, m * 2, m * 2);

  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.arc(300, 100, m * 2 / 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(250, 100 - m * 2 - 5);
  ctx.lineTo(350, 100 - m * 2 + m - 10);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = '#ff0';
  ctx.beginPath();
  ctx.moveTo(150 + star[0][0] * (1 + m / 50), 150 + star[0][1] * (1 + m / 50));
  for (let i = 1; i < star.length; i++) {
    ctx.lineTo(150 + star[i][0] * (1 + m / 50), 150 + star[i][1] * (1 + m / 50));
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(450 + star[0][0] * (1 + m / 50), 150 + star[0][1] * (1 + m / 50));
  for (let i = 1; i < star.length; i++) {
    ctx.lineTo(450 + star[i][0] * (1 + m / 50), 150 + star[i][1] * (1 + m / 50));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  frame++;
  let bits = frame.toString(2);
  for (let i = 0; i < bits.length; i++) {
    ctx.fillStyle = bits[i] === '0' ? '#000' : '#fff';
    ctx.fillRect(i * 10, 0, 10, 10);
  }
}


function canvasLoop() {
  let t = Date.now();

  postMessage(t);

  drawGradient(ctx, 0, (Math.sin(t / 1000) + 1) * 10);

  //setTimeout(canvasLoop, 0);
  requestAnimationFrame(canvasLoop);
  //setImmediate();
}

let channel = new MessageChannel();
channel.port1.onmessage = function() {
  canvasLoop();
}

function setImmediate() {
  channel.port2.postMessage('');
}

onmessage = function(msg) {
  if (msg.data.hasOwnProperty('toggleLag')) {
    lag = !lag;
    return;
  }

  let canvas = msg.data.canvas;

  ctx = canvas.getContext('2d', {
    colorSpace: 'srgb',
    alpha: false
  });

  canvasLoop();
}
