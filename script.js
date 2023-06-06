const gameBoard = (() => {
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
})();

function Cell() {
  let value = 0;
  const addToken = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { getValue, addToken };
}

const gameController = (() => {
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
  let selectedPlayer = players[0];
  const changeSelectedPlayer = () => {
    selectedPlayer = selectedPlayer === players[0] ? players[1] : players[0];
  };
  console.log(gameBoard.printBoard()); // intial board print
  console.log(`${selectedPlayer.name} turn`);

  function playRound(index) {
    gameBoard.placeToken(index, selectedPlayer.sign);
    changeSelectedPlayer();
    console.log(gameBoard.printBoard());
    console.log(`${selectedPlayer.name} turn`);
  }
  return { playRound, printBoard: gameBoard.printBoard };
})();

function screenRendering() {
  const gameBoardContainer = document.querySelector('.gameBoardContainer');
  const divs = [];
  for (let i = 0; i < 3; i++) {
    divs[i] = [];
    for (let j = 0; j < 3; j++) {
      divs[i][j] = document.createElement('div');
      gameBoardContainer.appendChild(divs[i][j]);
      divs[i][j].dataset.index = [i, j];
    }
  }
}
screenRendering();
