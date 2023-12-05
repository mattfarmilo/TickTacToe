function gameBoard () {
  let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  function checkValid (row, col) {
    return board[row][col] === 0;
  }
  
  function placeMark (player, row, col) {
    board[row][col] = player;
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
  let currentPlayer;
  const message = document.getElementById('message');
  let stop = false
  
  function turn(row, col) {
    if (board.checkValid(row, col)) {
      board.placeMark(currentPlayer, row, col);
      display.turn(row, col, currentPlayer.token);
      checkWin();
      if (!stop) {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        display.showNextTurn();
      }  
    } else {
      message.innerText = 'Invalid move';
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
    
    if (!row0.includes(0) && !row1.includes(0) && !row2.includes(0)) {
      message.innerText = `It's a draw!`;
      stop = true;
      display.toggleLock();
    } else {
    winArr.forEach((line) => {
        if (!line.includes(0)){
          if (line[0] === line[1] && line[1] === line[2]) {
            display.toggleLock();
            message.innerText = `${currentPlayer.name} wins!`;
            stop = true
          }
        }
      });  
    }
  }

  function newGame() {
    board.clearBoard();
    display.clearBoard();
    currentPlayer = player1;
    display.toggleLock();
    stop = false;
  }

  function resetGame() {    
    if (currentPlayer === player2) {
      display.showNextTurn();
    }
    board.clearBoard();
    display.clearBoard();
    currentPlayer = player1;
    stop = false;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  return {
    turn,
    checkWin,
    newGame,
    resetGame,
    getCurrentPlayer
  }
}

function player (name, token) {
  return {
    name: name,
    token: token
  }
}

function displayController() {
  const play1 = document.getElementById('player1');
  const play2 = document.getElementById('player2');
  
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
    });

    play1.classList.add('turn');
    play2.classList.remove('turn');

    const message = document.querySelector('#message');
    message.innerText = '';
  }

  function showNextTurn() { 
    play1.classList.toggle('turn');
    play2.classList.toggle('turn');
  }

  return {
    turn,
    toggleLock,
    clearBoard,
    showNextTurn
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
      
      const p1Name = document.querySelector('#p1Name').value;
      const p1Token = document.querySelector('#p1Token').value;
      const p2Name = document.querySelector('#p2Name').value;
      const p2Token = document.querySelector('#p2Token').value;

      player1 = player(p1Name, p1Token);
      player2 = player(p2Name, p2Token);
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
      
      const p1Name = document.querySelector('#p1Name').value;
      const p1Token = document.querySelector('#p1Token').value;
      const p2Name = document.querySelector('#p2Name').value;
      const p2Token = document.querySelector('#p2Token').value;

      player1 = player(p1Name, p1Token);
      player2 = player(p2Name, p2Token);
      
      play.resetGame();
    })
  
  controls.appendChild(newGame);
  controls.appendChild(reset);
  
})();  

let player1;
let player2;

const play = playControl();
const board = gameBoard();
const display = displayController();