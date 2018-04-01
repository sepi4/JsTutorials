function setup() {
  createCanvas(200, 200);
}

function draw() {
  stroke("blue");
  line(50, 50, 200, 200);
  strokeWeight(3);
  stroke("red");
  noFill();
  rectMode(CENTER);
  rect(50, 50, 100, 100);

}