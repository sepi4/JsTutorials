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
var w = 30;
var statusElement = document.getElementById("status");
statusElement.textContent = "Game is not over";


var totalBees = 10;
var beesCountElement = document.getElementById("bees-count");
beesCountElement.value = totalBees;

beesCountElement.addEventListener("keyup", function() {
  if (beesCountElement.value.length > 0 && parseInt(beesCountElement.value)) {
    totalBees = parseInt(beesCountElement.value);
    newGame();
  }

});

var sizeGrid = 10;
var sizeGridElement = document.getElementById("size-grid");
sizeGridElement.value = sizeGrid;

sizeGridElement.addEventListener("keyup", function() {
  if (sizeGridElement.value.length > 0) {
    sizeGrid = parseInt(sizeGridElement.value);
    newGame();
  }
});

var newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", function() {
  newGame();
});


function setup() {
  newGame();
}

function newGame() {
  statusElement.textContent = "Game is not over";
  createCanvas(w * sizeGrid + 1, w * sizeGrid +1);
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
