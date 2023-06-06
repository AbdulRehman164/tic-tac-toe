/* eslint-disable no-continue */
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
  const getSelectedPlayer = () => selectedPlayer;
  console.log(gameBoard.printBoard()); // intial board print
  console.log(`${selectedPlayer.name} turn`);

  function playRound(index) {
    gameBoard.placeToken(index, selectedPlayer.sign);
    changeSelectedPlayer();
    console.log(gameBoard.printBoard());
    console.log(`${selectedPlayer.name} turn`);
  }
  return {
    playRound,
    printBoard: gameBoard.printBoard,
    getSelectedPlayer,
    changeSelectedPlayer,
  };
})();

function screenRendering() {
  const playerTurnPara = document.querySelector('.playerTurnPara');
  // initail player turn printing
  playerTurnPara.textContent = `${
    gameController.getSelectedPlayer().name
  } turn`;

  const gameBoardContainer = document.querySelector('.gameBoardContainer');
  const divs = [];
  for (let i = 0; i < 3; i++) {
    divs[i] = [];
    for (let j = 0; j < 3; j++) {
      divs[i][j] = document.createElement('div');
      gameBoardContainer.appendChild(divs[i][j]);
      divs[i][j].dataset.index = [i, j];
      divs[i][j].classList.add('cells');
    }
  }

  function updateScreen(e) {
    gameController.playRound(e.target.dataset.index.split(','));
    const board = gameController.printBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) continue;
        let color = 'white';
        if (board[i][j] === 'X') color = 'red';
        else color = 'blue';
        divs[i][j].style.backgroundColor = color;
      }
    }
    playerTurnPara.textContent = `${
      gameController.getSelectedPlayer().name
    } turn`;
  }
  gameBoardContainer.addEventListener('click', updateScreen);
}
screenRendering();
