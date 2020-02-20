class GameGrid {
  constructor() {
    this.cells = new Array(Math.pow(grid, 2)).fill('');
    this.renderHTML();
    for (let i = 0; i < startTilesCount; ++i) {
      this.generateTile();
    }
  }

  //get indexes of empty cells from 0 to sqr(grid)
  getEmptyCells() {
    let cells = [];

    this.cells.forEach((cell, key) => {
      if (cell == '') {
        cells.push(key);
      }
    });

    return cells;
  }

  //generate random tile on empty cells available
  generateTile() {
    let emptyCells = this.getEmptyCells();
    let tile = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    this.cells[tile] = spotValues[Math.floor(Math.random()*spotValues.length)];
    document.querySelector('#game-grid .game-grid-cell:nth-child(' + (tile + 1) + ')').setAttribute('data-value', this.cells[tile]);
    return;
  }

  //render first time all cells into grid 
  renderHTML() {
    let html = '';

    this.cells.forEach(cell => {
      html += "<div class='game-grid-cell' data-value='" + cell + "' style='width: " + cellWidth + "%; height: " + cellHeight + "px; margin: " + (margin/2) + "%;'></div>";
    }); 

    document.querySelector('#game-grid').innerHTML = html;  
  }

  //move tiles down on down inputs
  moveTilesDown() {

  }

  //move tiles left on left inputs
  moveTilesLeft() {

  }

  //move tiles right on right inputs
  moveTilesRight() {

  }

  //move tiles up on up inputs
  moveTilesUp() {

  }
}

class InputManager {
  constructor() {
    this.grid = new GameGrid();
    this.listen();
  }

  listen() {
    document.onkeyup = function(event) {
      switch(event.keyCode) {
        case inputs.LEFT:
        case inputs.A:
          this.grid.moveTilesLeft();
          break;
        
        case inputs.UP:
        case inputs.W:
          this.grid.moveTilesUp();
          break;

        case inputs.RIGHT:
        case inputs.D:
          this.grid.moveTilesRight();
          break;
        
        case inputs.DOWN:
        case inputs.S:
          this.grid.moveTilesDown();
          break;
      }
    } 
  }
}