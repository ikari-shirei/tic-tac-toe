'use strict';

const Gameboard = (() => {
  const cells = document.querySelectorAll('.cell');
  const displayPlayer = document.querySelector('#currentPlayer');
  /*   const playerX = document.createElement('div').cloneNode(true);
  playerX.classList.add('playerX');
  const playerO = document.createElement('div');
  playerO.classList.add('playerO'); */
  let currentPlayer = 'X';
  cells.forEach((eachCell) => {
    eachCell.addEventListener('click', (event) => {
      const cellArray = Array.from(cells);
      const cellIndex = cellArray.indexOf(event.target);
      /*  console.log(cellIndex); */
      displayPlayer.textContent = currentPlayer;
      if (currentPlayer === 'X') {
        if (cells[cellIndex].firstElementChild.classList.contains('playerO')) {
          /*     if (cells[cellIndex].firstChild.classList.contains('playerO')) return; */
          return;
        } else {
          cells[cellIndex].firstElementChild.classList.add('playerX');
          currentPlayer = 'O';
          console.log(currentPlayer);
        }
      } else {
        if (cells[cellIndex].firstElementChild.classList.contains('playerX')) {
          /*  if (cells[cellIndex].firstChild.classList.contains('playerX')) return; */
          return;
        } else {
          currentPlayer = 'X';
          cells[cellIndex].firstElementChild.classList.add('playerO');
          console.log(currentPlayer);
        }
      }
    });
  });
})();
