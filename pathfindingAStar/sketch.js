let cols = 20;
let rows = 20;
let grid;

let openSet = [];
let closedSet = [];
let start;
let end;
let w, h;
let path = [];
let nosolution = false;
let solve = false;
let button;
let walls = [];

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

    // if (Math.random() < 0.3) {
    //   this.wall = true;
    // }
  }

  show(col) {
    fill(col);
    if (this.wall)
      fill(96,96,96);
    noStroke();
    rect(this.i * w, this.j * h, w-1, h-1);
    // ellipse(this.i * w + w*0.5, this.j * h + h*0.5, w*0.7, h*0.7);
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

    // diagonals
    if (i > 0 && j > 0)
      this.neighbors.push(grid[i - 1][j - 1]);
    if (i < cols - 1 && j > 0)
      this.neighbors.push(grid[i + 1][j - 1]);
    if (i < cols - 1 && j < cols - 1)
      this.neighbors.push(grid[i + 1][j + 1]);
    if (i > 0 && j < cols - 1)
      this.neighbors.push(grid[i - 1][j + 1]);
  }
}

function removeFromArray(arr, elt) {
  // console.log("removeFromArray")
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

  createCanvas(400, 400);
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

  button = document.createElement("button");
  button.addEventListener("click", function () { solve = !solve; });
  button.textContent = "Start";
  let body = document.querySelector("body");
  body.appendChild(document.createElement("br"));
  body.appendChild(button);

  resetButton = document.createElement("button");
  resetButton.addEventListener("click", function () { clearGrid(); });
  resetButton.textContent = "Reset";
  body.appendChild(resetButton);

  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
  }, false);
}

function makeWall() {
  if (mouseX <= width && mouseY <= height) {
    let i = Math.floor(mouseX / w);
    let j = Math.floor(mouseY / h);
    if (mouseButton === LEFT) {
      grid[i][j].wall = true;
      if (walls.includes(grid[i][j]) === false)
        walls.push(grid[i][j]);
    }
    else if (mouseButton === RIGHT) {
      for (let k = 0; k < walls.length; k++) {
        if (walls[k].i === i && walls[k].j === j)
          removeFromArray(walls, walls[k]);
      }
      grid[i][j].wall = false;
    }

    // console.log(grid[i][j]);
  }
}

function draw() {
  if (solve === true) {
    button.textContent = "Pause";
  }
  else {
    button.textContent = "Start";
  }

  // console.log("mouseIsPressed", mouseIsPressed);
  if (mouseIsPressed) {
      makeWall();
  }

  if (solve) {
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
        // solve = false;
      }

      removeFromArray(openSet, current);
      closedSet.push(current);

      let neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + distance(current, neighbor);
          // let tempG = current.g + dist(current.i,current.j, neighbor.i, neighbor.j);
          // let tempG = current.g + 1;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              neighbor.previous = current;
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
      // solve = false;
      noLoop();
    }

  }
  


  background(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(250,128,114));
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(153, 255, 153));
  }

  // for (let i = 0; i < path.length; i++) {
  //   path[i].show(color(0,0, 255));
  // }

  noFill();
  // stroke(255, 0, 255);
  stroke(0, 0, 255);
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w * 0.5, path[i].j * h + h * 0.5)
  }
  endShape();
}


function distance(a, b) {
  let di = Math.abs(a.i - b.i);
  let dj = Math.abs(a.j - b.j);
  return Math.sqrt(Math.pow(di, 2) + Math.pow(dj, 2));
}

function heuristic(a, b) {
  let di = Math.abs(a.i - b.i);
  let dj = Math.abs(a.j - b.j);
  return Math.sqrt(Math.pow(di, 2) + Math.pow(dj, 2));
  // return 1;
}

function clearGrid() {
  grid = make2DArray(rows, cols);
  openSet = [];
  closedSet = [];
  path = [];
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

  console.log("print")
  walls.forEach(el => {
    grid[el.i][el.j].wall = true;
  });
  solve = false;
  loop();
  // button.click();
  // if (button.textContent === "Pause")
  //   button.click();
}
