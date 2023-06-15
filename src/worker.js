'use strict';
let id;
let imageData, width, height, fillStyle;

importScripts('drawingFunctions.js');

onmessage = function(msg) {
  if(msg.data.hasOwnProperty('start')) {
    id = msg.data.id;
  }
  else {
    if(msg.data.length === 0) return;
    console.log(`worker ${id}: ${msg.data.length}`);
    loadState(msg.data[0].state);
    imageData = new Uint16Array(width * height * 4);
    for(let i = 0; i < msg.data.length; i++) {
      drawThing(msg.data[i]);
    }
    postMessage({
      imageData,
      id,
      minPriority: msg.data[0].priority,
      maxPriority: msg.data[msg.data.length - 1].priority
    }, [imageData.buffer]);
  }
}
