function gameBoard () {
  let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  
  function logBoard() {
    console.log(board);
  }

  function checkValid (row, col) {
    return board[row][col] === 0;
  }
  
  function placeMark (player, row, col) {
    board[row][col] = player;
    logBoard();
  }

  function getBoard() {
    return board;
  }

    function clearBoard() {
    board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    console.log(board);
  }

  return {
    placeMark,
    getBoard,
    checkValid,
    clearBoard,
  }
};

function playControl () {
  const board = gameBoard();
  let currentPlayer = player1;
  
  function turn(row, col) {
    if (board.checkValid(row, col)) {
      board.placeMark(currentPlayer, row, col);
      display.turn(row, col, currentPlayer.token);
      checkWin();
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else {
      console.log('Invalid move');
    }
  }

  function checkWin() {
    const currentBoard = board.getBoard();
    const row0 = currentBoard[0];
    const row1 = currentBoard[1];
    const row2 = currentBoard[2];
    const col0 = [currentBoard[0][0], currentBoard[1][0], currentBoard[2][0]];
    const col1 = [currentBoard[0][1], currentBoard[1][1], currentBoard[2][1]];
    const col2 = [currentBoard[0][2], currentBoard[1][2], currentBoard[2][2]];
    const diag0 = [currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]];
    const diag1 = [currentBoard[0][2], currentBoard[1][1], currentBoard[2][0]];

    const winArr = [row0, row1, row2, col0, col1, col2, diag0, diag1];
    
    if (row0.includes(0) || row1.includes(0) || row2.includes(0)) {
      winArr.forEach((line) => {
        if(!line.includes(0)) {
          if (line[0] === line[1] && line[1] === line[2]) {
            display.toggleLock();
            console.log(`${line[0].name} wins!`)
          }
        }
      });
    } else {
      console.log(`It's a draw!`);
      display.toggleLock();
    }
  }

  function newGame() {
    board.clearBoard();
    display.clearBoard();
    currentPlayer = player1;
    display.toggleLock();
  }

  function resetGame() {
    board.clearBoard();
    display.clearBoard();
    currentPlayer = player1;
  }

  return {
    turn,
    checkWin,
    newGame,
    resetGame
  }
}

function player (name, token) {
  return {
    name: name,
    token: token
  }
}

function displayController() {
  function turn(row, col, token) {
    const button = document.getElementById(`r${row}c${col}`);
    button.innerText = token;
  }

  function toggleLock() {
    buttons = document.querySelectorAll('.boardSquare');
    controls = document.querySelectorAll('.control');

    buttons.forEach((button) => {
      button.toggleAttribute("disabled");
    })

    controls.forEach((button) => {
      button.toggleAttribute('hidden');
    })
  }

  function clearBoard() {
    const buttons = document.querySelectorAll('.boardSquare');
    buttons.forEach((button) => {
      button.innerText = '';
    })
  }

  return {
    turn,
    toggleLock,
    clearBoard
  }
}

(function createButtons() {
  const board = document.getElementById('board');
  for (let r=0; r<3; r++) {
    for (let c=0; c<3; c++) {
      const button = document.createElement("button");
      button.setAttribute("class", "boardSquare");
      button.setAttribute("id", `r${r}c${c}`);
      button.disabled = true;
      button.addEventListener("click", function () {
        play.turn(r, c);
      })
      board.appendChild(button);
    }
  }

  const controls = document.getElementById('controls')
  const newGame = document.createElement('button');
    newGame.innerText = 'New Game';
    newGame.setAttribute('class', 'control');
    newGame.setAttribute('id', 'newGame');
    newGame.addEventListener('click', function() {
      play.newGame();
      newGame.hidden = true;
      reset.hidden = false;
    })
  const reset = document.createElement('button');
    reset.innerText = 'Reset';
    reset.setAttribute('class', 'control');
    reset.setAttribute('id', 'reset');
    reset.hidden = true;
    reset.addEventListener('click', function() {
      play.resetGame();
    })
  
  controls.appendChild(newGame);
  controls.appendChild(reset);
  
})();  

const player1 = player('Matt', 'x');
const player2 = player('Andrea', 'o');

const play = playControl();
const board = gameBoard();
const display = displayController();