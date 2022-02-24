"Use Strict";

// Get all cell elements
const cellElements = document.querySelectorAll("#cell");
const board = document.querySelector("#board");
const restartBtn = document.querySelector("#restartBtn");
const gameMessageElement = document.querySelector("#gameMessage");
const gameMessageTextElement = document.querySelector(
  "[data-game-message-text]"
);
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Create mark classes
const x_class = "x";
const circle_class = "circle";

// Set state
let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

// Event listener that goes off once per click of each cell
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  gameMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  // Place the mark
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    // Check for draw
    endGame(true);
  } else {
    // Switch turns
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}

function endGame(draw) {
  if (draw) {
    gameMessageTextElement.innerText = "Draw!";
  } else {
    gameMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  gameMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);

  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
}
