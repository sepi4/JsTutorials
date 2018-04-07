let cols, rows;
let w = 20;
let grid = [];
let current;

let stack = [];

function isUnvisited() {
  for (const c  of grid) {
    if (!c.visited)
      return true;
  }
  return false;
}

function setup() {
  createCanvas(400, 400);
  cols = Math.floor(width/w);
  rows = Math.floor(height/w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];

  while (isUnvisited()) {
    // STEP 1
    let next = current.checkNeighbors()[0];
    const numOfNeighbors = current.checkNeighbors()[1];
    if (next) {
      next.visited = true;

      // STEP 2
      if (numOfNeighbors > 1)
        stack.push(current);

      // STEP 3
      Cell.removeWalls(current, next);
      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  }
}

function draw() {
  background(55);
  for (const c of grid) {
    c.show(); 
  }

  // current.visited = true;
  // current.highlight();

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
    return -1;
  return i + cols * j;
}
