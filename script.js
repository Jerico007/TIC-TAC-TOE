let turn = "X";
let gameOver = false;
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const reload = document.getElementById("reload");

//Code to check who has won the game
const checkWin = () => {
  //Mapping the patterns into the 2D array
  let myMap = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  myMap.forEach((val) => {
    const boxes = document.getElementsByClassName("cell");
    //Once gameOver no need to check for other possibilities
    if (gameOver) {
      return;
    }
    if (
      boxes[val[0]].innerHTML === boxes[val[1]].innerHTML &&
      boxes[val[0]].innerHTML === boxes[val[2]].innerHTML &&
      boxes[val[0]].innerHTML !== ""
    ) {
      boxes[val[0]].classList.add("winner");
      boxes[val[1]].classList.add("winner");
      boxes[val[2]].classList.add("winner");
      gameOver = true;
      return;
    }
  });
};

//Code to check for the chances of X or 0
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

//Code to Select the tile for placeing X or 0
const boxClick = (event) => {
  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;
  const message = document.getElementsByClassName("message")[0];
  //If the current cell is empty then initialize it with x or 0
  if (event.target.innerHTML === "" && !gameOver) {
    event.target.innerHTML = turn;
    checkWin();
    if (!gameOver) {
      turn = changeTurn();
      if (turn === "X") {
        if (player1 === "") {
          message.innerHTML = `Player 1's TURN`;
        } else {
          message.innerHTML = `${player1}'s TURN`;
        }
      } else {
        if (player2 === "") {
          message.innerHTML = `Player 2's TURN`;
        } else {
          message.innerHTML = `${player2}'s TURN`;
        }
      }
    } else {
      if (turn === "X") {
        if (player1 === "") {
          message.innerHTML = `Player 1 congratulations you won!`;
        } else {
          message.innerHTML = `${player1} congratulations you won!`;
        }
      } else {
        if (player2 === "") {
          message.innerHTML = `Player 2 congratulations you won!`;
        } else {
          message.innerHTML = `${player2} congratulations you won!`;
        }
      }
    }
  } else {
    event.target.removeEventListener("click", boxClick);
  }
  event.stopPropagation();
};

//Start Game function
const startGame = () => {
  let player1 = document.getElementById("player1").value;
  const user = document.getElementsByClassName("users")[0];
  const game = document.getElementsByClassName("main-container")[0];
  const message = document.getElementsByClassName("message")[0];

  if (player1 === "") {
    message.innerHTML = `Player 1's TURN`;
  } else {
    message.innerHTML = `${player1}'s TURN`;
  }
  user.style.display = "none";
  game.style.display = "flex";

  //Add an eventListener for each cell
  let boxes = document.getElementsByClassName("cell");
  Array.from(boxes).forEach((val) => {
    val.addEventListener("click", boxClick);
  });
};

//Call startGame function when clicked on submit button
submit.addEventListener("click", startGame);

//Reset the game from start
const resetGame = () => {
  const boxes = document.getElementsByClassName("cell");
  Array.from(boxes).forEach((val) => {
    val.innerHTML = "";
    val.classList.remove("winner");
  });

  turn = "X";
  gameOver = false;
  // After reseting inner cell content call startGame() function
  startGame();
};

reset.addEventListener("click", resetGame);

//Reload the game from the form page
const reloadGame = () => {
  location.reload();
};

reload.addEventListener("click", reloadGame);
