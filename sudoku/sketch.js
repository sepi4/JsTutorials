let grid;
let sizeRect;
let count = 0;

class Cell {
  constructor(v) {
    this.value = v;
    this.added;
  }
}

function emptySudoku() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell();
    }
  }
}

function setup() {
  createCanvas(450, 450);
  sizeRect = width / 9;
  grid = make2DArray(9, 9);
  // testSudoku();
  // testSudoku2();
  emptySudoku();
  // noLoop();

  let solveBtn = document.getElementById('solve');
  solveBtn.addEventListener('click', function() {
    count = 0;
    solve();
  })
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
  }, false);
}

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function solve() {
  tryNum2(1,0);
}

function findY(place) {
  let y = floor(place / 9);
  return y;
}
function findX(place) {
  let x = place % 9;
  return x;
}

function addAddedValues() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let g = grid[i][j];
      if(!g.value)
        g.value = g.added;
    }
  }
  document.getElementById("result").textContent = "While silmukoita: " + count;
}



function tryNum2(num, place) {
  while (place < 9*9) {
    count++;

    let x = findX(place);
    let y = findY(place);

    if (num > 9) {
      grid[y][x].added = undefined;
      place--; 
      while (grid[findY(place)][findX(place)].value)
        place--;
      
      x = findX(place);
      y = findY(place);
      num = grid[y][x].added;
      num++;
      continue;
    }

    if(grid[y][x].value ) {
      place++;
      continue;
    }
    
    if (check(num, x, y)) { // jos numero kay
      grid[y][x].added = num;
      place++;
      num = 1;
      continue;
    }
    else {
      num++;
      continue;
    }

  }
  addAddedValues();
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
    let g = grid[y][i];
    if (g.value) {
      if (num === g.value)
        return false;
    } else {
      if (num === g.added)
        return false;
    }
  }	
  return true;
}

function checkCol(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (y === i) 
      continue;
    let g = grid[i][x];
    if (g.value) {
      if (num === g.value)
        return false;
    } else {
      if (num === g.added)
        return false;
    }
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
      let g = grid[i][j];
      if (g.value) {
        if (num === g.value)
          return false;
      } 
      else {
        if (num === g.added)
          return false;
      }
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

      if (grid[i][j].value) {
        fill(0);
        textAlign(CENTER);
        textSize(24);
        text(grid[i][j].value, x + w * 0.5, y + w * 0.5 + 10);
      }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (mouseX > j * sizeRect && mouseX < j * sizeRect + sizeRect && mouseY > i * sizeRect && mouseY < i * sizeRect + sizeRect) {
        if (Number.isInteger(grid[i][j].value)) {
          if (mouseButton === LEFT) {
            grid[i][j].value++;
            if (grid[i][j].value > 9) {
              grid[i][j].value = undefined;
            }
          } else if (mouseButton === RIGHT) {
            grid[i][j].value--;
            if (grid[i][j].value < 1) {
              grid[i][j].value = undefined;
            }
          } else if (mouseButton === CENTER) {
            grid[i][j].value = undefined;
          }
        } 
        else {
          if (mouseButton === LEFT)
            grid[i][j].value = 1;
          else if (mouseButton === RIGHT)
            grid[i][j].value = 9;
        }
      }
    }
  }
}

function draw() {
  drawSudoku();
}

function testSudoku() {
  grid[0][0] = new Cell(undefined);
  grid[0][1] = new Cell(undefined);
  grid[0][2] = new Cell(7);
  grid[0][3] = new Cell(3);
  grid[0][4] = new Cell(undefined);
  grid[0][5] = new Cell(1);
  grid[0][6] = new Cell(undefined);
  grid[0][7] = new Cell(undefined);
  grid[0][8] = new Cell(6);

  grid[1][0] = new Cell(undefined);
  grid[1][1] = new Cell(3);
  grid[1][2] = new Cell(9);
  grid[1][3] = new Cell(undefined);
  grid[1][4] = new Cell(undefined);
  grid[1][5] = new Cell(undefined);
  grid[1][6] = new Cell(4);
  grid[1][7] = new Cell(1);
  grid[1][8] = new Cell(undefined);

  grid[2][0] = new Cell(1);
  grid[2][1] = new Cell(undefined);
  grid[2][2] = new Cell(6);
  grid[2][3] = new Cell(7);
  grid[2][4] = new Cell(undefined);
  grid[2][5] = new Cell(undefined);
  grid[2][6] = new Cell(undefined);
  grid[2][7] = new Cell(2);
  grid[2][8] = new Cell(undefined);

  grid[3][0] = new Cell(undefined);
  grid[3][1] = new Cell(undefined);
  grid[3][2] = new Cell(2);
  grid[3][3] = new Cell(undefined);
  grid[3][4] = new Cell(undefined);
  grid[3][5] = new Cell(7);
  grid[3][6] = new Cell(6);
  grid[3][7] = new Cell(undefined);
  grid[3][8] = new Cell(1);

  grid[4][0] = new Cell(undefined);
  grid[4][1] = new Cell(undefined);
  grid[4][2] = new Cell(undefined);
  grid[4][3] = new Cell(1);
  grid[4][4] = new Cell(undefined);
  grid[4][5] = new Cell(5);
  grid[4][6] = new Cell(undefined);
  grid[4][7] = new Cell(undefined);
  grid[4][8] = new Cell(undefined);

  grid[5][0] = new Cell(7);
  grid[5][1] = new Cell(undefined);
  grid[5][2] = new Cell(8);
  grid[5][3] = new Cell(9);
  grid[5][4] = new Cell(undefined);
  grid[5][5] = new Cell(undefined);
  grid[5][6] = new Cell(5);
  grid[5][7] = new Cell(undefined);
  grid[5][8] = new Cell(undefined);

  grid[6][0] = new Cell(undefined);
  grid[6][1] = new Cell(7);
  grid[6][2] = new Cell(undefined);
  grid[6][3] = new Cell(undefined);
  grid[6][4] = new Cell(undefined);
  grid[6][5] = new Cell(4);
  grid[6][6] = new Cell(1);
  grid[6][7] = new Cell(undefined);
  grid[6][8] = new Cell(9);

  grid[7][0] = new Cell(undefined);
  grid[7][1] = new Cell(8);
  grid[7][2] = new Cell(3);
  grid[7][3] = new Cell(undefined);
  grid[7][4] = new Cell(undefined);
  grid[7][5] = new Cell(undefined);
  grid[7][6] = new Cell(2);
  grid[7][7] = new Cell(7);
  grid[7][8] = new Cell(undefined);

  grid[8][0] = new Cell(4);
  grid[8][1] = new Cell(undefined);
  grid[8][2] = new Cell(undefined);
  grid[8][3] = new Cell(8);
  grid[8][4] = new Cell(undefined);
  grid[8][5] = new Cell(9);
  grid[8][6] = new Cell(3);
  grid[8][7] = new Cell(undefined);
  grid[8][8] = new Cell(undefined);
}

function testSudoku2() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell();
    }
  }

  grid[0][2] = new Cell(3);

  grid[1][1] = new Cell(5);
  grid[1][3] = new Cell(3);
  grid[1][4] = new Cell(7);
  grid[1][5] = new Cell(8);
  grid[1][7] = new Cell(6);

  grid[2][0] = new Cell(4);
  grid[2][1] = new Cell(9);
  grid[2][4] = new Cell(2);
  grid[2][6] = new Cell(7);

  grid[3][0] = new Cell(9);
  grid[3][6] = new Cell(2);
  grid[3][7] = new Cell(1);

  grid[4][1] = new Cell(2);
  grid[4][2] = new Cell(6);
  grid[4][4] = new Cell(8);
  grid[4][6] = new Cell(3);
  grid[4][7] = new Cell(9);

  grid[5][1] = new Cell(1);
  grid[5][2] = new Cell(4);
  grid[5][8] = new Cell(8);

  grid[6][2] = new Cell(5);
  grid[6][4] = new Cell(9);
  grid[6][7] = new Cell(4);
  grid[6][8] = new Cell(7);

  grid[7][1] = new Cell(6);
  grid[7][3] = new Cell(4);
  grid[7][4] = new Cell(3);
  grid[7][5] = new Cell(2);
  grid[7][7] = new Cell(8);

  grid[8][6] = new Cell(1);
}