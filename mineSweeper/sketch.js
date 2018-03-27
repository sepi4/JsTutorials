function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var totalBees = 2;
var status = "Game not over";
var statusElement = document.getElementById("status");
statusElement.textContent = status;
function setup() {
  createCanvas(201, 201);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }


  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choose = options[index];
    var i = choose[0];
    var j = choose[1];
    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  statusElement.textContent = "LOSE!";
}

function mousePressed() {
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
  }, false);

  if (mouseButton === "left") {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();

          if (grid[i][j].bee) {
            gameOver();
          }
        }
      }
    }
  } else if (mouseButton === "right") {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].marked = !grid[i][j].marked;
        }
      }
    }
  }

  checkWin();
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

}

function checkWin() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].bee && !grid[i][j].marked) {
        return;
      } else {
        if (!grid[i][j].bee && !grid[i][j].revealed) {
          return;
        }
      }
    }
  }
  statusElement.textContent = "WIN!";
}