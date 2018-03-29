//  n < 2 => dies
// (n == 2 || n == 3) => live
//  n > 3 => dies
// n == 3 => born

let grid;
let cols;
let rows;
let resolution = 50;
let frames = 1;
let looping = false;

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * resolution;
    this.y = j * resolution;
    this.state;
    this.next = floor(random(2));
  }

  static kirjoita() {
    console.log('kirjoita');
  }

  drawRect(color) {
    fill(color);
    stroke(0);
    rect(this.x, this.y, resolution - 1, resolution - 1);
  }
}


function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution
  grid = make2DArray(cols, rows);

  //adding Cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  frameRate(frames);
  noLoop();

  // event listeners to buttons
  let startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", function() {
    if (looping) {
      startBtn.textContent = "Start";
      noLoop();
    } else {
      startBtn.textContent = "Pause";
      loop();
    }
    looping = !looping;
  });

  let oneLoopBtn = document.getElementById("one-loop");
  oneLoopBtn.addEventListener("click", function() {
    oneTurn();
  });
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let g = grid[i][j];
      if (mouseX > g.x && mouseX < g.x + resolution && mouseY > g.y && mouseY < g.y + resolution) {
        console.log(g);
        g.state = g.state === 1 ? 0 : 1;
      }
    }
  }
  computeNexts();
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let g = grid[i][j];
      if (g.state === 1) {
        g.drawRect(255);
      } else {
        g.drawRect(100);
      }
    }
  }
}

function oneTurn() {
  // drawing loops
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let g = grid[i][j];
      g.state = g.next;
      if (g.state === 1) {
        g.drawRect(255);
      } else {
        g.drawRect(100);
      }
    }
  }

  //computing nexts
  computeNexts();
}

function computeNexts() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j].state;

      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state === 0 && neighbors === 3) {
        grid[i][j].next = 1;
      } else if (state === 1 && neighbors < 2 || 
        neighbors > 3) {
        grid[i][j].next = 0;
      } else {
        grid[i][j].next = state;
      }
    }
  }
}

function draw() {
  background(0);
  oneTurn();
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row].state;
    }
  }
  sum -= grid[x][y].state;
  return sum;
}

