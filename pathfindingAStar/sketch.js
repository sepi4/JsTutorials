let cols = 30;
let rows = 30;
let grid;

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let path = [];
let nosolution = false;

class Spot {
  constructor(i, j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if (Math.random() < 0.3) {
      this.wall = true;
    }
  }

  show(col) {
    fill(col);
    if (this.wall)
      fill(0);
    noStroke();
    rect(this.i * w, this.j * h, w-1, h-1);
  }

  addNeighbors(grid) {
    let i = this.i;   
    let j = this.j;   
    if (i < cols - 1)
      this.neighbors.push(grid[i + 1][j]);
    if (i > 0)
      this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1)
      this.neighbors.push(grid[i][j + 1]);
    if (j > 0)
      this.neighbors.push(grid[i][j - 1]);
  }
}

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) 
    arr[i] = new Array(cols);
  return arr;
}

function setup() {
  createCanvas(300, 300);
  grid = make2DArray(rows, cols);

  w = width / cols;
  h = height / rows;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[rows-1][cols-1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);

  console.log(grid);
  // noLoop();
}

function draw() {
  if (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log("Finished");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
          neighbor.previous = current;
        }
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
    // we can keep going

    if (!nosolution) {
      //finding path
      path = [];
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
    }
 } 
  else {
    // no solution
    console.log("NO SOLUTION");
    nosolution = true;
    noLoop();
  }
  


  background(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0,0, 255));
  }
}

function heuristic(a, b) {
  let di = Math.abs(a.i - b.i);
  let dj = Math.abs(a.j - b.j);
  return Math.sqrt(Math.pow(di, 2) + Math.pow(dj, 2));
}