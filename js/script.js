'use strict';

const Game = (() => {
  //DOM
  const cells = document.querySelectorAll('.cell');
  const cellArray = Array.from(cells);
  const gameboardContainer = document.querySelector('#gameboardContainer');
  const gameChoiceButtons = document.querySelector('#gameChoiceButtons');
  const playerButton = document.querySelector('#playerButton');
  /*  const computerButton = document.querySelector('#computerButton'); */
  const restartButtons = document.querySelector('#restartButtons');
  const resetButton = document.querySelector('#resetButton');
  const goBackButton = document.querySelector('#goBackButton');
  const scores = document.querySelector('#scores');
  const playerNamesContainer = document.querySelector('#playerNamesContainer');
  const playerNamesContainerForm = document.querySelector(
    '#playerNamesContainer form'
  );
  const playerGameStartButton = document.querySelector(
    '#playerGameStartButton'
  );
  const playerOne = document.querySelector('#playerOne');
  const playerTwo = document.querySelector('#playerTwo');
  const gameStatus = document.querySelector('#gameStatus');
  const playerOneName = document.querySelector('#playerOneName');
  const playerOneScore = document.querySelector('#playerOneScore');
  const playerTwoName = document.querySelector('#playerTwoName');
  const playerTwoScore = document.querySelector('#playerTwoScore');

  //Show game container, scores, player names and game status
  function gameDisplayOn() {
    playerNamesContainer.style.display = '';
    scores.style.display = '';
    gameboardContainer.style.display = '';
    gameStatus.style.display = '';
  }

  //Hide game container, scores, player names, game status restart buttons
  function gameDisplayOff() {
    playerNamesContainer.style.display = 'none';
    scores.style.display = 'none';
    gameboardContainer.style.display = 'none';
    gameStatus.style.display = 'none';
    restartButtons.style.display = 'none';
  }

  //Game container, scores, player names, game status and restart buttons hidden as default
  playerNamesContainer.style.display = 'none';
  scores.style.display = 'none';
  gameboardContainer.style.display = 'none';
  gameStatus.style.display = 'none';
  restartButtons.style.display = 'none';

  //player button onclick
  playerButton.addEventListener('click', () => {
    gameChoiceButtons.style.display = 'none';
    playerNamesContainer.style.display = '';
    restartButtons.style.display = 'none';
  });

  //Player factory function
  const Player = (name, playerChoice) => {
    return { name, playerChoice };
  };

  let player1 = Player('Player 1', 'X');
  let player2 = Player('Player 2', 'O');

  //Get input from user for Player 1 and Player 2
  playerGameStartButton.addEventListener('click', (e) => {
    if (playerOne.value) {
      player1.name = playerOne.value;
      playerOneName.textContent = player1.name;
    }
    if (playerTwo.value) {
      player2.name = playerTwo.value;
      playerTwoName.textContent = player2.name;
    }
    gameStatus.textContent = `${player1.name} will play`;
    playerNamesContainerForm.reset();
    gameDisplayOn();
    playerNamesContainer.style.display = 'none';
    restartButtons.style.display = 'none';
  });

  //computer button onclick
  /*   computerButton.addEventListener('click', () => {
    gameDisplayOn();
    gameStatus.textContent = `${player1.name} will play`;
    gameChoiceButtons.style.display = 'none';
    playerNamesContainer.style.display = 'none';
    restartButtons.style.display = 'none';
    player2.name = 'Computer';
    playerTwoName.textContent = player2.name;
  }); */

  //reset button onclick
  resetButton.addEventListener('click', () => {
    restartButtons.style.display = 'none';
    gameStatus.textContent = `${player1.name} will play`;
    cellArray.forEach((eachCell) => {
      eachCell.firstElementChild.classList.remove('playerX');
      eachCell.firstElementChild.classList.remove('playerO');
      gameboardContainer.style.pointerEvents = 'auto';
    });
  });

  //goBackButton onclick
  goBackButton.addEventListener('click', () => {
    gameDisplayOff();
    gameChoiceButtons.style.display = '';
    playerOneName.textContent = 'Player 1';
    playerTwoName.textContent = 'Player 2';
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    gameStatus.textContent = `${player1.name} will play`;
    playerOneCurrentScore = 0;
    playerTwoCurrentScore = 0;
    cellArray.forEach((eachCell) => {
      eachCell.firstElementChild.classList.remove('playerX');
      eachCell.firstElementChild.classList.remove('playerO');
      gameboardContainer.style.pointerEvents = 'auto';
    });
  });

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let playerOneCurrentScore = 0;
  let playerTwoCurrentScore = 0;

  //Move order
  cells.forEach((eachCell) => {
    eachCell.addEventListener('click', (event) => {
      const cellArray = Array.from(cells);
      const cellIndex = cellArray.indexOf(event.target);

      //Add X and O's using classList
      if (currentPlayer === 'X') {
        if (
          cells[cellIndex].firstElementChild.classList.contains('playerO') ||
          cells[cellIndex].firstElementChild.classList.contains('playerX')
        ) {
          return;
        } else {
          cells[cellIndex].firstElementChild.classList.add('playerX');
          currentPlayer = 'O';
        }
      } else {
        if (
          cells[cellIndex].firstElementChild.classList.contains('playerX') ||
          cells[cellIndex].firstElementChild.classList.contains('playerO')
        ) {
          return;
        } else {
          currentPlayer = 'X';
          cells[cellIndex].firstElementChild.classList.add('playerO');
        }
      }

      //Look if game is over or not
      (function handleResult() {
        if (currentPlayer === 'X') {
          gameState[cellIndex] = 'O';
          gameStatus.textContent = `${player1.name} will play`;
        } else {
          gameState[cellIndex] = 'X';
          gameStatus.textContent = `${player2.name} will play`;
        }

        //reset game after game over
        function afterResult() {
          gameboardContainer.style.pointerEvents = 'none';
          restartButtons.style.display = '';
          gameState = ['', '', '', '', '', '', '', '', ''];
          currentPlayer = 'X';
        }

        function winCon(who) {
          if (
            (gameState[0] === who &&
              gameState[1] === who &&
              gameState[2] === who) ||
            (gameState[3] === who &&
              gameState[4] === who &&
              gameState[5] === who) ||
            (gameState[6] === who &&
              gameState[7] === who &&
              gameState[8] === who) ||
            (gameState[0] === who &&
              gameState[3] === who &&
              gameState[6] === who) ||
            (gameState[1] === who &&
              gameState[4] === who &&
              gameState[7] === who) ||
            (gameState[2] === who &&
              gameState[5] === who &&
              gameState[8] === who) ||
            (gameState[0] === who &&
              gameState[4] === who &&
              gameState[8] === who) ||
            (gameState[2] === who &&
              gameState[4] === who &&
              gameState[6] === who)
          ) {
            return true;
          } else {
            return false;
          }
        }

        // Result of game player vs player
        if (winCon('X')) {
          playerOneCurrentScore++;
          playerOneScore.textContent = playerOneCurrentScore;
          gameStatus.textContent = `${player1.name} won`;
          afterResult();
        } else if (winCon('O')) {
          playerTwoCurrentScore++;
          playerTwoScore.textContent = playerTwoCurrentScore;
          gameStatus.textContent = `${player2.name} won`;
          afterResult();
        } else {
          let countXO = 0;
          gameState.forEach((x) => {
            if (x === 'X' || x === 'O') {
              countXO++;
              if (countXO === 9) {
                gameStatus.textContent = `Tie`;
                afterResult();
              }
            }
          });
        }
      })();
    });
  });
  // Result of game player vs computer (Will add later)
  /*   function minimax(position, depth, maximizingPlayer) {} */
})();
