let grid;
let sizeRect;

// class Cell {
//   constructor(v) {
//     this.value = v;
//     this.added;
//   }
// }

function setup() {
  createCanvas(450, 450);
  sizeRect = width / 9;
  grid = make2DArray(9, 9);

  grid[0][0] = undefined;
  grid[0][1] = undefined;
  grid[0][2] = 7;
  grid[0][3] = 3;
  grid[0][4] = undefined;
  grid[0][5] = 1;
  grid[0][6] = undefined;
  grid[0][7] = undefined;
  grid[0][8] = 6;

  grid[1][0] = undefined;
  grid[1][1] = 3;
  grid[1][2] = 9;
  grid[1][3] = undefined;
  grid[1][4] = undefined;
  grid[1][5] = undefined;
  grid[1][6] = 4;
  grid[1][7] = 1;
  grid[1][8] = undefined;

  grid[2][0] = 1;
  grid[2][1] = undefined;
  grid[2][2] = 6;
  grid[2][3] = 7;
  grid[2][4] = undefined;
  grid[2][5] = undefined;
  grid[2][6] = undefined;
  grid[2][7] = 2;
  grid[2][8] = undefined;

  grid[3][0] = undefined;
  grid[3][1] = undefined;
  grid[3][2] = 2;
  grid[3][3] = undefined;
  grid[3][4] = undefined;
  grid[3][5] = 7;
  grid[3][6] = 6;
  grid[3][7] = undefined;
  grid[3][8] = 1;

  grid[4][0] = undefined;
  grid[4][1] = undefined;
  grid[4][2] = undefined;
  grid[4][3] = 1;
  grid[4][4] = undefined;
  grid[4][5] = 5;
  grid[4][6] = undefined;
  grid[4][7] = undefined;
  grid[4][8] = undefined;

  grid[5][0] = 7;
  grid[5][1] = undefined;
  grid[5][2] = 8;
  grid[5][3] = 9;
  grid[5][4] = undefined;
  grid[5][5] = undefined;
  grid[5][6] = 5;
  grid[5][7] = undefined;
  grid[5][8] = undefined;

  grid[6][0] = undefined;
  grid[6][1] = 7;
  grid[6][2] = undefined;
  grid[6][3] = undefined;
  grid[6][4] = undefined;
  grid[6][5] = 4;
  grid[6][6] = 1;
  grid[6][7] = undefined;
  grid[6][8] = 9;

  grid[7][0] = undefined;
  grid[7][1] = 8;
  grid[7][2] = 3;
  grid[7][3] = undefined;
  grid[7][4] = undefined;
  grid[7][5] = undefined;
  grid[7][6] = 2;
  grid[7][7] = 7;
  grid[7][8] = undefined;

  grid[8][0] = 4;
  grid[8][1] = undefined;
  grid[8][2] = undefined;
  grid[8][3] = 8;
  grid[8][4] = undefined;
  grid[8][5] = 9;
  grid[8][6] = 3;
  grid[8][7] = undefined;
  grid[8][8] = undefined;

  console.table(grid);
  // noLoop();
}

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function solve() {
  tryNum(1,0);
}

function findY(place) {
  let y = floor(place / 9);
  return y;
}
function findX(place) {
  let x = place % 9;
  return x;
}

function tryNum(num, place) {
  if (place >= 9 * 9) {
    console.log("over", place, "!!!!");
    return true;
  }

  let x = findX(place);
  let y = findY(place);
  if(grid[y][x]) {
    place++;
    tryNum(1, place);
    return true;
  }

  //check
  if (check(num, x, y)) {
    tryNum(1, ++place);
    grid[y][x] = num;
    return true;
  } else {
    tryNum(++num, place);
    return true;
  }
}

function check(num, x, y) {
  if (!checkRow(num, x, y)) return false;
  if (!checkCol(num, x, y)) return false;
  if (!checkSquare(num, x, y)) return false;

  return true;
}

function checkRow(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (x === i) 
      continue;
    if (num === grid[y][i])
      return false;
  }	
  return true;
}

function checkCol(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (y === i) 
      continue;
    if (num === grid[i][x])
      return false;
  }	
  return true;
}

function checkSquare(num, x, y) {
  let yStart = floor(y / 3) * 3;
  let xStart = floor(x / 3) * 3;
  for (let i = yStart; i < yStart + 3; i++) {
    for (let j = xStart; j < xStart + 3; j++) {
      if (i === y && j === x)
       continue;
      if (grid[i][j] === num)
        return false;
    }
  }	
  return true;
}

function drawSudoku() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let y = i * sizeRect;
      let x = j * sizeRect;
      let w = sizeRect-1;
      if (floor(i / 3) === 1 && floor(j / 3) === 1)
        fill(255);
      else if (floor(i / 3) === 1 || floor(j / 3) === 1)
        fill(220);
      else 
        fill(255);

      stroke(0);

      rect(x, y, w, w);

      if (grid[i][j]) {
        fill(0);
        textAlign(CENTER);
        textSize(24);
        text(grid[i][j], x + w * 0.5, y + w * 0.5 + 10);
      }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (mouseX > j * sizeRect && mouseX < j * sizeRect + sizeRect && mouseY > i * sizeRect && mouseY < i * sizeRect + sizeRect) {
        if (Number.isInteger(grid[i][j])) {
          grid[i][j]++;
          if (grid[i][j] > 9) {
            grid[i][j] = undefined;
          }
        } else {
          grid[i][j] = 1;
        }
        console.log(`checking x:${j} y:${i} : ${check(grid[i][j], j, i)}`);
      }
    }
  }
}

function draw() {
  drawSudoku();
}