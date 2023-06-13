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
      name: 'player2',
      sign: 'O',
    },
  ];
  const getPlayers = () => players;
  let selectedPlayer = players[0];
  const changeSelectedPlayer = () => {
    selectedPlayer = selectedPlayer === players[0] ? players[1] : players[0];
  };
  const getSelectedPlayer = () => selectedPlayer;
  console.log(gameBoard.printBoard()); // intial board print
  console.log(`${selectedPlayer.name} turn`);
  function checkWinner() {
    let won = false;
    let match = 0;
    const board = gameBoard.printBoard();
    const columns = [];
    for (let i = 0; i < 3; i++) {
      columns[i] = [];
      for (let j = 0; j < 3; j++) {
        columns[i][j] = board[j][i];
      }
    }

    const diagonal = [
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];
    const merged = [...board, ...columns, ...diagonal];
    merged.forEach((row) => {
      row.reduce((previousValue, currentValue) => {
        if (previousValue === currentValue && currentValue !== 0) {
          match++;
        }
        return currentValue;
      });

      if (match === 2) {
        won = true;
      }
      match = 0;
    });
    return won;
  }

  function checkTie() {
    const board = gameBoard.printBoard();
    let tie = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== 0 && checkWinner() === false) tie = true;
        else return false;
      }
    }
    return tie;
  }

  function playRound(index) {
    gameBoard.placeToken(index, selectedPlayer.sign);
    changeSelectedPlayer();
    console.log(gameBoard.printBoard());
    console.log(`${selectedPlayer.name} turn`);
    checkWinner();
    checkTie();
  }
  return {
    playRound,
    printBoard: gameBoard.printBoard,
    getSelectedPlayer,
    changeSelectedPlayer,
    getPlayers,
    players,
    checkWinner,
    checkTie,
  };
})();

function screenRendering() {
  // Selecting elements
  const resetButton = document.querySelector('.reset');
  const playerTurnPara = document.querySelector('.playerTurnPara');
  const playervs = document.querySelector('.playervs');
  const gameBoardContainer = document.querySelector('.gameBoardContainer');
  const namingCard = document.querySelector('.naming');
  const divForBlur = document.querySelector('.divForBlur');
  const winnerDisplay = document.querySelector('.winnerDisplay');
  const playAgainButton = document.querySelector('.playAgain');
  const goToMenuButton = document.querySelector('.goToMenu');

  // Creating Divs
  const divs = [];
  for (let i = 0; i < 3; i++) {
    divs[i] = [];
    for (let j = 0; j < 3; j++) {
      divs[i][j] = document.createElement('div');
      gameBoardContainer.appendChild(divs[i][j]);
      divs[i][j].dataset.index = [i, j];
      divs[i][j].classList.add('cells', `line${i}`);
      divs[i][
        j
      ].innerHTML = `<img src = "/img/cross.svg" class = "crossCircleSign cross${i}${j} sign${i}${j} signs"> <img src = "/img/circle.svg" class = "crossCircleSign circle${i}${j} sign${i}${j} signs">`;
    }
  }

  function namingCardButtons() {
    const humanButton = document.querySelector('.player2Selection');
    const aiButton = document.querySelector('.aiSelection');
    const humanVsAiDiv = document.querySelector('.humanVsAiSelection');
    const otherPlayerNameDiv = document.querySelector('.otherPlayerName');
    const aiDifficultyDiv = document.querySelector('.aiDifficultySelection');
    const playButton = document.querySelector('.play');
    const player1Input = document.querySelector('#player1Name');
    const player2Input = document.querySelector('#player2Name');
    humanButton.addEventListener('click', () => {
      const isValid = player1Input.checkValidity();
      if (!isValid) player1Input.reportValidity();
      else {
        humanVsAiDiv.style.display = 'none';
        otherPlayerNameDiv.style.display = 'flex';
        playButton.style.display = 'block';
      }
    });

    aiButton.addEventListener('click', () => {
      const isValid = player1Input.checkValidity();
      if (!isValid) player1Input.reportValidity();
      else {
        humanVsAiDiv.style.display = 'none';
        aiDifficultyDiv.style.display = 'flex';
        playButton.style.display = 'block';
      }
    });

    playButton.addEventListener('click', () => {
      const isValid1 = player1Input.checkValidity();
      let isValid2 = player2Input.checkValidity();
      if (aiDifficultyDiv.style.display === 'flex') isValid2 = true;
      if (!isValid1 || !isValid2) {
        player1Input.reportValidity();
        player2Input.reportValidity();
      } else {
        namingCard.style.display = 'none';
        divForBlur.classList.remove('blur');
        gameController.players[0].name = player1Input.value;
        gameController.players[1].name = player2Input.value;
        if (aiDifficultyDiv.style.display === 'flex')
          gameController.players[1].name = 'A.I';
        playerTurnPara.textContent = `${
          gameController.getSelectedPlayer().name
        } turn`;
        playervs.textContent = `${gameController.players[0].name} vs ${gameController.players[1].name}`;
      }
    });
  }
  function reset() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard.placeToken([i, j], 0);
      }
    }
    const signs = document.querySelectorAll('.crossCircleSign');
    signs.forEach((sign) => {
      sign.classList.add('signs');
    });
  }

  function playAgain() {
    winnerDisplay.style.display = 'none';
    divForBlur.classList.remove('blur');
    reset();
  }

  function goToMenu() {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
  function updateScreen(e) {
    const index = e.target.dataset.index.split(',');
    const playerTurn = gameController.getSelectedPlayer().name;
    if (gameController.printBoard()[index[0]][index[1]] !== 0) return;
    gameController.playRound(index);
    const board = gameController.printBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) continue;
        if (board[i][j] === 'X')
          document.querySelector(`.cross${i}${j}`).classList.remove('signs');
        else
          document.querySelector(`.circle${i}${j}`).classList.remove('signs');
      }
    }
    playerTurnPara.textContent = `${
      gameController.getSelectedPlayer().name
    } turn`;
    if (
      gameController.checkWinner() === true ||
      gameController.checkTie() === true
    ) {
      const winnerPlayerNameDisplay = document.querySelector(
        '.winnerPlayerNameDisplay'
      );
      const wins = document.querySelector('.wins');
      divForBlur.classList.add('blur');
      winnerDisplay.style.display = 'block';
      if (gameController.checkWinner() === true) {
        winnerPlayerNameDisplay.textContent = `${playerTurn}`;
        wins.style.display = 'block';
      } else {
        winnerPlayerNameDisplay.textContent = 'Its Tie';
        wins.style.display = 'none';
      }
    }
  }
  namingCardButtons();
  resetButton.addEventListener('click', reset);
  gameBoardContainer.addEventListener('click', updateScreen);
  playAgainButton.addEventListener('click', playAgain);
  goToMenuButton.addEventListener('click', goToMenu);
}
screenRendering();
