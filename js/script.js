'use strict';

const Gamechoice = (() => {
  const gameboardContainer = document.querySelector('#gameboardContainer');
  const gameChoiceButtons = document.querySelector('#gameChoiceButtons');
  const playerButton = document.querySelector('#playerButton');
  const computerButton = document.querySelector('#computerButton');
  //player button
  /*  gameboardContainer.style.display = 'none'; */
  playerButton.addEventListener('click', (event) => {
    gameboardContainer.style.display = '';
    gameChoiceButtons.style.display = 'none';
  });
  //computer button
  computerButton.addEventListener('click', (event) => {
    gameboardContainer.style.display = '';
    gameChoiceButtons.style.display = 'none';
  });
})();

const Gameboard = (() => {
  const cells = document.querySelectorAll('.cell');
  const displayPlayer = document.querySelector('#currentPlayer');

  let currentPlayer = 'X';
  const gameState = ['', '', '', '', '', '', '', '', ''];

  cells.forEach((eachCell) => {
    eachCell.addEventListener('click', (event) => {
      const cellArray = Array.from(cells);
      const cellIndex = cellArray.indexOf(event.target);

      if (currentPlayer === 'X') {
        if (cells[cellIndex].firstElementChild.classList.contains('playerO')) {
          return;
        } else {
          cells[cellIndex].firstElementChild.classList.add('playerX');
          currentPlayer = 'O';
        }
      } else {
        if (cells[cellIndex].firstElementChild.classList.contains('playerX')) {
          return;
        } else {
          currentPlayer = 'X';
          cells[cellIndex].firstElementChild.classList.add('playerO');
        }
      }

      (function handleResult() {
        /* gameState[cellIndex] = cellIndex; */
        if (currentPlayer === 'X') {
          gameState[cellIndex] = 'O';
        } else {
          gameState[cellIndex] = 'X';
        }

        console.log(gameState);

        let winningConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        if (
          (gameState[0] === 'X' &&
            gameState[1] === 'X' &&
            gameState[2] === 'X') ||
          (gameState[3] === 'X' &&
            gameState[4] === 'X' &&
            gameState[5] === 'X') ||
          (gameState[6] === 'X' &&
            gameState[7] === 'X' &&
            gameState[8] === 'X') ||
          (gameState[0] === 'X' &&
            gameState[3] === 'X' &&
            gameState[6] === 'X') ||
          (gameState[1] === 'X' &&
            gameState[4] === 'X' &&
            gameState[7] === 'X') ||
          (gameState[2] === 'X' &&
            gameState[5] === 'X' &&
            gameState[8] === 'X') ||
          (gameState[0] === 'X' &&
            gameState[4] === 'X' &&
            gameState[8] === 'X') ||
          (gameState[2] === 'X' && gameState[4] === 'X' && gameState[6] === 'X')
        ) {
          alert('X won');
        } else if (
          (gameState[0] === 'O' &&
            gameState[1] === 'O' &&
            gameState[2] === 'O') ||
          (gameState[3] === 'O' &&
            gameState[4] === 'O' &&
            gameState[5] === 'O') ||
          (gameState[6] === 'O' &&
            gameState[7] === 'O' &&
            gameState[8] === 'O') ||
          (gameState[0] === 'O' &&
            gameState[3] === 'O' &&
            gameState[6] === 'O') ||
          (gameState[1] === 'O' &&
            gameState[4] === 'O' &&
            gameState[7] === 'O') ||
          (gameState[2] === 'O' &&
            gameState[5] === 'O' &&
            gameState[8] === 'O') ||
          (gameState[0] === 'O' &&
            gameState[4] === 'O' &&
            gameState[8] === 'O') ||
          (gameState[2] === 'O' && gameState[4] === 'O' && gameState[6] === 'O')
        ) {
          alert('O won');
        }
      })();
    });
  });
})();
