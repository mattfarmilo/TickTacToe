function gameBoard () {
  const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  function logBoard() {
    console.log(board);
  }

  function placeMark (player, row, col) {
    if (board[row][col] === 0) {
      board[row][col] = player;
      logBoard();
    } else {
      console.log('Invalid move');
    }
  }

  function getBoard () {
    return board;
  }

  return {
    placeMark,
    getBoard,
  }
};

function playControl () {
  let currentPlayer = 1;
  const board = gameBoard();

  function turn(row, col) {
    board.placeMark(currentPlayer, row, col);
    checkWin();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  function checkWin() {
    const currentBoard = board.getBoard();
    
    if (currentBoard[0][0] === 1 && currentBoard[0][1] === 1 && currentBoard[0][2] === 1) {
      console.log(`Player 1 wins`);
    }
  }

  return {
    turn,
  }
}

const play = playControl();
const board = gameBoard();