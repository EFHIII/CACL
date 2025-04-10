const canvas = document.getElementById('canvas1');
const ctx = cacl.createContext(canvas);

function runTest() {
  ctx.background(255,0,0);
  ctx.fill(0,255,0);

  ctx.stroke(255, 128, 0);
  ctx.strokeWeight(5);

  let star = [];
  for(let i = 0; i < Math.PI*2; i += Math.PI*2 / 5) {
    star.push([Math.sin(i) * 50, -Math.cos(i) * 50]);
    star.push([Math.sin(i+Math.PI/5) * 25, -Math.cos(i+Math.PI/5) * 25]);
  }

  ctx.beginPath();
  ctx.moveTo(150 + star[0][0], 150 + star[0][1]);
  for(let i = 1; i < star.length; i++) {
    ctx.lineTo(150 + star[i][0], 150 + star[i][1]);
  }
  ctx.closePath();
  //ctx.fillPathAliased();
  ctx.fillPath();

  ctx.beginPath();
  ctx.moveTo(75,50);
  ctx.lineTo(100.5,99.01);
  ctx.lineTo(125,60);
  ctx.closePath();
  ctx.fillPathAliased();

  ctx.beginPath();
  ctx.moveTo(135,50);
  ctx.lineTo(160.5,99.01);
  ctx.lineTo(185,60);
  ctx.closePath();
  ctx.fillPath();

  let p1 = [235, 50];
  let p2 = [260, 100];

  ctx.beginPath();
  ctx.moveTo(p1[0]-4,p1[1]);
  ctx.lineTo(p1[0]+4,p1[1]);
  ctx.lineTo(p2[0]-4,p2[1]);
  ctx.lineTo(p2[0]+4,p2[1]);
  ctx.closePath();
  ctx.fillPath();

  /*
  basic fill path
  for(let x=p1[0]-4; x < p2[0]+4;x++) {
    for(let y=p1[1];y<p2[1];y++) {
      let count = 0;
      for(let X = 0; X < 1; X+=1/8) {
        for(let Y = 0; Y < 1; Y+=1/8) {
          if(ctx.pointInPath(x+X,y+Y)) count++;
        }
      }
      if(count > 0) {
        ctx.fillStyle.a = count / 64;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }*/

  //ctx.fill(255,255,255);
  //ctx.fillRect(160.5,99.5,1,1);

  ctx.draw();
  //requestAnimationFrame(runTest);
}

runTest();

function test() {
  console.log('test');
}
