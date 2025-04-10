let lastT1 = new Array(50).fill(Date.now());
let lastT2 = new Array(50).fill(Date.now());

const offscreenCacl = document.getElementById('canvas1').transferControlToOffscreen();
let thread1 = new Worker('src/caclExample.js');
thread1.postMessage({
  canvas: offscreenCacl
}, [offscreenCacl]);

let fr1 = 0;
thread1.onmessage = msg => {
  fr1++;
  lastT1.shift();
  lastT1.push(msg.data);
  if(fr1 % 50 === 49) {
    libraryText.innerText = `Custom Library ${Math.round(10000 / (lastT1[49] - lastT1[0]) * 50)/10} fps`;
  }
};

//let ctx2 = document.getElementById('canvas2').getContext('2d');
const offscreenCanvas = document.getElementById('canvas2').transferControlToOffscreen();
let thread2 = new Worker('src/canvasExample.js');
thread2.postMessage({
  canvas: offscreenCanvas
}, [offscreenCanvas]);

let fr2 = 0;
thread2.onmessage = msg => {
  fr2++;
  lastT2.shift();
  lastT2.push(msg.data);
  if(fr2 % 50 === 49) {
    canvasText.innerText = `Canvas ${Math.round(10000 / (lastT2[49] - lastT2[0]) * 50)/10} fps`;
  }
};

function lag() {
  thread1.postMessage({toggleLag: true});
  thread2.postMessage({toggleLag: true});
}
