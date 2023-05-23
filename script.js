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
  const placeToken = (index, player) => {
    board[index[0]][index[1]].addToken(player);
  };

  return { getBoard, printBoard, placeToken };
}

function Cell() {
  let value = 0;
  const addToken = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { getValue, addToken };
}

function GameControl() {
  const players = [
    {
      name: 'player1',
      sign: 'X',
    },
    {
      name: 'plyer2',
      sign: 'O',
    },
  ];
}
