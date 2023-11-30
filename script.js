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
    clearBoard
  }
};

function playControl () {
  let currentPlayer = 1;
  const board = gameBoard();

  function turn(row, col) {
    if (board.checkValid(row, col)) {
      board.placeMark(currentPlayer, row, col);
      checkWin();
      currentPlayer = currentPlayer === 1 ? 2 : 1;
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
            console.log(`Player ${line[0]} wins`)
          }
        }
      });
    } else {
      console.log(`It's a draw!`);
    }
  }

  function newGame() {
    board.clearBoard();
    currentPlayer = 1;
  }

  return {
    turn,
    checkWin,
    newGame
  }
}

const play = playControl();
const board = gameBoard();