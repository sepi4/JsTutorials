let grid;
let sizeRect;
let poistiJotain = false;

class Cell {
  constructor() {
    this.possibleValues = [1,2,3,4,5,6,7,8,9];
    this.value = undefined;
  }
}

function setup() {
  createCanvas(450, 450);
  sizeRect = width / 9;
  grid = make2DArray(9, 9);


  grid[0][0].value = undefined;
  grid[0][1].value = undefined;
  grid[0][2].value = 7;
  grid[0][3].value = 3;
  grid[0][4].value = undefined;
  grid[0][5].value = 1;
  grid[0][6].value = undefined;
  grid[0][7].value = undefined;
  grid[0][8].value = 6;

  grid[1][0].value = undefined;
  grid[1][1].value = 3;
  grid[1][2].value = 9;
  grid[1][3].value = undefined;
  grid[1][4].value = undefined;
  grid[1][5].value = undefined;
  grid[1][6].value = 4;
  grid[1][7].value = 1;
  grid[1][8].value = undefined;

  grid[2][0].value = 1;
  grid[2][1].value = undefined;
  grid[2][2].value = 6;
  grid[2][3].value = 7;
  grid[2][4].value = undefined;
  grid[2][5].value = undefined;
  grid[2][6].value = undefined;
  grid[2][7].value = 2;
  grid[2][8].value = undefined;

  grid[3][0].value = undefined;
  grid[3][1].value = undefined;
  grid[3][2].value = 2;
  grid[3][3].value = undefined;
  grid[3][4].value = undefined;
  grid[3][5].value = 7;
  grid[3][6].value = 6;
  grid[3][7].value = undefined;
  grid[3][8].value = 1;

  grid[4][0].value = undefined;
  grid[4][1].value = undefined;
  grid[4][2].value = undefined;
  grid[4][3].value = 1;
  grid[4][4].value = undefined;
  grid[4][5].value = 5;
  grid[4][6].value = undefined;
  grid[4][7].value = undefined;
  grid[4][8].value = undefined;

  grid[5][0].value = 7;
  grid[5][1].value = undefined;
  grid[5][2].value = 8;
  grid[5][3].value = 9;
  grid[5][4].value = undefined;
  grid[5][5].value = undefined;
  grid[5][6].value = 5;
  grid[5][7].value = undefined;
  grid[5][8].value = undefined;

  grid[6][0].value = undefined;
  grid[6][1].value = 7;
  grid[6][2].value = undefined;
  grid[6][3].value = undefined;
  grid[6][4].value = undefined;
  grid[6][5].value = 4;
  grid[6][6].value = 1;
  grid[6][7].value = undefined;
  grid[6][8].value = 9;

  grid[7][0].value = undefined;
  grid[7][1].value = 8;
  grid[7][2].value = 3;
  grid[7][3].value = undefined;
  grid[7][4].value = undefined;
  grid[7][5].value = undefined;
  grid[7][6].value = 2;
  grid[7][7].value = 7;
  grid[7][8].value = undefined;

  grid[8][0].value = 4;
  grid[8][1].value = undefined;
  grid[8][2].value = undefined;
  grid[8][3].value = 8;
  grid[8][4].value = undefined;
  grid[8][5].value = 9;
  grid[8][6].value = 3;
  grid[8][7].value = undefined;
  grid[8][8].value = undefined;
  console.table(grid);


  // noLoop();
}

function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Cell();
    }
  }
  return arr;
}


// function tryNum(num, place) {
//   let y = floor(place / 9);
//   let x = place % 9;
// }

function removePossible() {
  poistiJotain = false;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let obj =  grid[i][j];
      if (Number.isInteger(obj.value)) {
        let num = obj.value;
        let x = j;
        let y = i;
        console.log(j, i);
        removePossibleRow(num, x, y);
        removePossibleCol(num, x, y);
        removePossibleSquare(num, x, y);
      }
    }
  }
  if (poistiJotain)
    removePossible();
  
}
function poisto(obj, num) {
  let index = obj.possibleValues.indexOf(num)
  if (index > -1) {
    obj.possibleValues.splice(index, 1);
    poistiJotain = true;
  }
  if (obj.possibleValues.length === 1) {
    obj.value = obj.possibleValues[0];
  }
}

function removePossibleRow(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (x === i)
      continue;
    let obj = grid[y][i];
    poisto(obj, num);
  }	
}

function removePossibleCol(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (y === i) 
      continue;
    let obj =  grid[i][x];
    poisto(obj, num);
  }	
}

function removePossibleSquare(num, x, y) {
  let yStart = floor(y / 3) * 3;
  let xStart = floor(x / 3) * 3;
  for (let i = yStart; i < yStart + 3; i++) {
    for (let j = xStart; j < xStart + 3; j++) {
      if (i === y && j === x)
       continue;
      let obj = grid[i][j];
      poisto(obj, num);
    }
  }	
}


function check(num, x, y) {
  if (!checkRow(num, x, y))
    return false;
  if (!checkCol(num, x, y))
    return false;
  if (!checkSquare(num, x, y))
    return false;

  return true;
}

function checkRow(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (x === i)
      continue;
    if (num === grid[y][i].value)
      return false;
  }	
  return true;
}

function checkCol(num, x, y) {
  for (let i = 0; i < 9; i++) {
    if (y === i) 
      continue;
    if (num === grid[i][x].value)
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
      if (grid[i][j].value === num)
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
      let obj = grid[i][j];
      if (obj) {
        fill(0);
        textAlign(CENTER);
        textSize(24);
        if (obj.value)
        text(obj.value, x + w * 0.5, y + w * 0.5 + 10);
      }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (mouseX > j * sizeRect && 
          mouseX < j * sizeRect + sizeRect && 
          mouseY > i * sizeRect && 
          mouseY < i * sizeRect + sizeRect) {
        let obj = grid[i][j];
        if (obj.value) {
          obj.value++;
          if (obj.value > 9) {
            obj.value = undefined;
          }
        } else {
          obj.value = 1;
        }
        // console.log(grid)
      }
    }
  }
}

function draw() {
  drawSudoku();
}