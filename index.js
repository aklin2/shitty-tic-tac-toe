const container = document.querySelector(".container");

// Add squares
function makeSquare() {
  const square = document.createElement("p");
  square.className = "square";
  return square;
}

const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

var gameOver = false;

function checkGame(board) {
  // row win
  function checkRowWin(matrix) {
    for (let row of matrix) {
      let collapseRow = [...new Set(row)];
      if (collapseRow.length === 1) {
        if (collapseRow[0] === "X") {
          alert("Game Over: You Win!");
          gameOver = true;
        } else if (collapseRow[0] === "O") {
          alert("Game Over: You Lose");
          gameOver = true;
        }
      }
    }
  }

  // convert squares into their innerHTML values
  let matrix = [];
  for (let row of board) {
    let rowValues = [];
    for (let column of row) {
      let value = column.innerHTML;
      rowValues.push(value || null);
    }
    matrix.push(rowValues);
  }
  // Check row win
  checkRowWin(matrix);

  // Check column win
  // Rotate the board
  let rotatedMatrix = matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  );
  checkRowWin(rotatedMatrix);

  // Check diagonal win
  let center = matrix[1][1];
  let topLeft = matrix[0][0];
  let topRight = matrix[0][2];
  let bottomLeft = matrix[2][0];
  let bottomRight = matrix[2][2];
  let majorDiagonal = [...new Set([topLeft, center, bottomRight])];
  let minorDiagnoal = [...new Set([topRight, center, bottomLeft])];
  if (majorDiagonal.length === 1 && majorDiagonal[0] !== null) {
    if (majorDiagonal[0] === "X") {
      alert("Game Over: You Win!");
      gameOver = true;
    } else if (majorDiagonal[0] === "O") {
      alert("Game Over: You Lose");
      gameOver = true;
    }
  }
  if (minorDiagnoal.length === 1 && minorDiagnoal[0] !== null) {
    if (minorDiagnoal[0] === "X") {
      alert("Game Over: You Win!");
      gameOver = true;
    } else if (minorDiagnoal[0] === "O") {
      alert("Game Over: You Lose");
      gameOver = true;
    }
  }
}

for (let row = 0; row < 3; row++) {
  for (let column = 0; column < 3; column++) {
    const square = makeSquare();
    square.row = row;
    square.column = column;
    board[row][column] = square;
    square.addEventListener("click", function () {
      this.innerHTML = "X";
      console.log(board);
      checkGame(board);
      if (!gameOver) {
        for (let i = 0; i < 50; i++) {
          const randomRow = Math.floor(Math.random() * 3);
          const randomColumn = Math.floor(Math.random() * 3);
          const computerMove = board[randomRow][randomColumn];
          if (
            computerMove !== 0 &&
            computerMove.innerHTML !== "O" &&
            computerMove.innerHTML !== "X"
          ) {
            computerMove.innerHTML = "O";
            computerMove.style.color = "red";
            checkGame(board);
            break;
          }
        }
      }
    });
    container.appendChild(square);
  }
}

// Add players

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("document loaded");
  console.log(event);
});
