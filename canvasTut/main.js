main();

function createCanvas(w, h) {
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function main() {
  let canvas = createCanvas(400, 400);
  const body = document.querySelector("body");
  body.appendChild(canvas);
  let ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.clearRect(20, 20, 20, 20);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 50, 50);

  ctx.strokeRect(50, 50, 50, 50);

  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
  
}

