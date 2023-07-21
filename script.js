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

    if (
      boxes[val[0]].innerHTML === boxes[val[1]].innerHTML &&
      boxes[val[0]].innerHTML === boxes[val[2]].innerHTML &&
      boxes[val[0]].innerHTML !== ""
    ) {
      boxes[val[0]].style.backgroundColor = "purple";
      boxes[val[1]].style.backgroundColor = "purple";
      boxes[val[2]].style.backgroundColor = "purple";
      gameOver = true;
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
        message.innerHTML = `${player1} TURN`;
      } else {
        message.innerHTML = `${player2} TURN`;
      }
    } else {
      if (turn === "X") {
        message.innerHTML = `${player1} congratulations you won!`;
      } else {
        message.innerHTML = `${player2} congratulations you won!`;
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

  message.innerHTML = `${player1} TURN`;
  user.style.display = "none";
  game.style.display = "flex";

  //Add an eventListener for each cell
  let boxes = document.getElementsByClassName("cell");
  Array.from(boxes).forEach((val) => {
    console.log(val);
    val.addEventListener("click", boxClick);
  });
};

submit.addEventListener("click", startGame);

//Reset the game from start
const resetGame = () => {
  let player1 = document.getElementById("player1").value;
  
  const boxes = document.getElementsByClassName("cell");
  const message = document.getElementsByClassName("message")[0];
  Array.from(boxes).forEach((val) => {
    val.innerHTML = "";
    val.style.backgroundColor = "rgba(241, 142, 190, 0.877)";
  });
 
  turn = "X";
  gameOver = false;
  message.innerHTML = `${player1} TURN`
  
};

reset.addEventListener("click", resetGame);


//Reload the game from the form page
const reloadGame = () => {
  location.reload();
};

reload.addEventListener("click", reloadGame);
