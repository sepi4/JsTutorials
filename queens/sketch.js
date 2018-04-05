let grid;
let c = 0;
let n;
let timeOfCalculation = 0;
let answers = [];
let possibleCols = [];
for (let i = 0; i < n; i++)
  possibleCols.push(i);
let resultDiv = document.getElementById("result");
let calculateBtn = document.getElementById("calculate");
main();



function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++)
    arr[i] = new Array(cols).fill('');
  return arr;
}

function main() {

  // console.time("queens");
  // nFor(0, n, n);
  // console.log("QUEENS: " + n);
  // console.log(answers);
  // console.timeEnd("queens");

  // console.time("queens");
  // optimLoop(0,n);
  // console.log(answers);
  // console.timeEnd("queens");

  // printAnswers();

  calculateBtn.addEventListener("click", calculate);
  document.getElementById("num").addEventListener("keyup", function (e) { 
    if (e.key === "Enter") {
      n = parseInt(e.target.value);
      calculate();
    }
  });
}

function calculate() {
  answers = [];
  if (n > 3) {
    grid = make2DArray(n, n);
    let t1 = performance.now();
    nFor(0, n, n);
    let t2 = performance.now();
    timeOfCalculation = t2 - t1;
    printAnswers();
  } else {
    printAnswers();
  }
}

function printAnswers() {
  let str = "";
  str = str + "Kuningattareja: " + n + "\n";
  str = str + "Ratkaisuja: " + answers.length + "\n";
  str = str + "Laskenta-aika: " + timeOfCalculation + " ms\n";

  for (let i = 0; i < answers.length; i++) {
    str = str +"\n";
    str = str  + (i + 1) + "." + " ratkaisu: \n";
    for (let j = 0; j < answers[i].length; j++) {
      for (let a = 0; a < answers[i].length; a++) {
        if (a === answers[i][j]) {
          str = str + "Q ";
        }
        else {
          str = str + ". ";
        }
      }
      str = str + "\n";
    }
  }
  // console.log(str)
  resultDiv.innerText = str;
}

// function optimLoop(y, depth) {
//   if (depth <= 0) return;
//   for (const x of possibleCols) {
//     if (check(y, x)) {
//       grid[y][x] = "Q";
//       if (depth === 1)
//         answers.push(getAnswer(grid));
//       optimLoop(y + 1, depth - 1);
//     }
//     grid[y][x] = "";
//   }
// }

function nFor(y, depth, size) {
  if (depth <= 0) return;
  for (let i = 0; i < size; i++) {
    if (check(y, i)) {
      grid[y][i] = "Q";
      if (depth === 1)
        answers.push(getAnswer(grid));
      nFor(y + 1, depth - 1, size);
    }
    grid[y][i] = "";
  }
}

  // for (let a = 0; a < n; a++) {
  //   grid[0][a] = "Q";
  //   for (let b = 0; b < n; b++) {
  //     if (check(1, b)) {
  //       grid[1][b] = "Q";
  //       for (let c = 0; c < n; c++) {
  //         if (check(2, c)) {
  //           grid[2][c] = "Q";
  //           for (let d = 0; d < n; d++) {
  //             if (check(3, d)) {
  //               grid[3][d] = "Q";
  //               answers.push(getAnswer(grid));
  //             }
  //             grid[3][d] = "";
  //           }
  //         }
  //         grid[2][c] = "";
  //       }
  //     }
  //     grid[1][b] = "";
  //   }
  //   grid[0][a] = "";
  // }


function getAnswer(grid) {
  let answer = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "Q") {
        answer.push(j);
      }
    }
  }
  return answer;
}



function check(qY, qX) {
  c++;
  //up left
  for (let y = qY - 1, x = qX - 1; y >= 0 && x >= 0; y-- , x--) {
    if (grid[y][x] === "Q") return false;
  }
  //up right
  for (let y = qY - 1, x = qX + 1; y >= 0 && x < n; y-- , x++) {
    if (grid[y][x] === "Q") return false;
  }
  //down left 
  for (let y = qY + 1, x = qX - 1; y < n && x >= 0; y++ , x--) {
    if (grid[y][x] === "Q") return false;
  }
  //down right
  for (let y = qY + 1, x = qX + 1; y < n && x < n; y++ , x++) {
    if (grid[y][x] === "Q") return false;
  }
  //up down
  for (let y = 0; y < n; y++) {
    if (y === qY) continue;
    if (grid[y][qX] === "Q") return false;
  }
  // left right
  for (let x = 0; x < n; x++) {
    if (x === qX) continue;
    if (grid[qY][x] === "Q") return false;
  }
  return true;
}