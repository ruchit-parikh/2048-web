let GameGrid = (function () {
  let instance;

  class GameGridFactory {
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
      let tileIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
      this.cells[tileIndex] = spotValues[Math.floor(Math.random()*spotValues.length)];
      
      //create new tiles with value generated
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.setAttribute('data-value', this.cells[tileIndex]);

      //target where we will spawn this tile
      let target = document.querySelector('#game-grid .game-grid-cell:nth-child(' + (tileIndex + 1) + ')');
      let tileStyles = target.getClientRects()[0];
      tile.style.width = tileStyles.width + 'px';
      tile.style.height = tileStyles.height + 'px';
      tile.style.transform = "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px)";
      document.querySelector('#filled-grid').append(tile);

      //performing zoomin animation 
      tile.style.scale = 1;
      tile.style.opacity = 1;
      return;
    }
  
    //render first time all cells into grid 
    renderHTML() {
      let html = '';
  
      this.cells.forEach(cell => {
        html += "<div class='game-grid-cell' data-value='" + cell + "' style='width: " + cellWidth + "%; height: " + cellHeight + "px; margin: " + (cellMargin/2) + "%;'></div>";
      }); 
  
      document.querySelector('#game-grid').innerHTML = html;  
    }
  }

  function createInstance() {
      let object = new GameGridFactory();
      object.constructor = null;
      return object;
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();