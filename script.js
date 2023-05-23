function Gameboard() {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      // eslint-disable-next-line no-use-before-define
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
  const printBoard = () =>
    board.map((row) => row.map((cell) => cell.getValue()));

  return { getBoard, printBoard };
}

function Cell() {
  let value = 0;
  const addToken = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { getValue, addToken };
}

Gameboard();
