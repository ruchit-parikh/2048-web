let GameGrid = (function () {
  let instance;

  //private singleton factory
  var GameGridFactory = function() {
    this.reset();
  };

  //reset grid
  GameGridFactory.prototype.reset = function() {
    this.cells = new Array(Math.pow(GRID, 2)).fill(EMPTY_CELL_VALUE);
    this.renderHTML();
    for (let i = 0; i < START_TILES_COUNT; ++i) {
      this.generateTile();
    }
  };

  //get indexes of empty cells from 0 to sqr(GRID)
  GameGridFactory.prototype.getEmptyCells = function() {
    let cells = [];

    this.cells.forEach(function(cell, key) {
      if (cell == EMPTY_CELL_VALUE) {
        cells.push(key);
      }
    });

    return cells;
  };

  //generate random tile on empty cells available
  GameGridFactory.prototype.generateTile = function() {
    let emptyCells = this.getEmptyCells();
    if (emptyCells.length > 0) {
      let tileIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
      this.cells[tileIndex] = SPOT_VALUES[Math.floor(Math.random()*SPOT_VALUES.length)];
      
      //create new tiles with value generated
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.setAttribute('data-value', this.cells[tileIndex]);
      tile.setAttribute('data-cell-no', tileIndex);

      //target where we will spawn this tile
      let target = GAME_GRID_NODE.querySelector('.game-grid-cell:nth-child(' + (tileIndex + 1) + ')');
      let tileStyles = target.getClientRects()[0];
      tile.style.width = tileStyles.width + 'px';
      tile.style.height = tileStyles.height + 'px';
      tile.style.transform = "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px) scale(0)";
      tile.style.transformOrigin = (tileStyles.width / 2) + 'px ' + (tileStyles.height / 2) + 'px';
      FILLED_GRID_NODE.appendChild(tile);

      //performing zoomin animation
      setTimeout(function() {
        tile.style.transform = "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px) scale(1)";
        tile.style.opacity = 1;
        return;
      }, 100);
    }
  };

  //render first time all cells into grid 
  GameGridFactory.prototype.renderHTML = function() {
    let html = '';

    this.cells.forEach(function(cell) {
      html += "<div class='game-grid-cell' data-value='" + cell + "' style='width: " + CELL_WIDTH + "%; height: " + CELL_HEIGHT + "px; margin: " + (CELL_MARGIN/2) + "%;'></div>";
    }); 

    GAME_GRID_NODE.innerHTML = html;  
    document.querySelector('#game-grid-wrapper').style = "font-size: " + 80 / GRID + "px;";
    FILLED_GRID_NODE.innerHTML = '';
  };

  //move tile from one pos to another
  GameGridFactory.prototype.moveTile = function(from, to, mergeValue) {
    //javascript internet explorer doesn't support default value arguments so 
    if (typeof mergeValue == 'undefined') {
      mergeValue = EMPTY_CELL_VALUE;
    }
    if (this.cells[to] == EMPTY_CELL_VALUE) {
      //if cell is empty then we'll move tile to this position else we may merge or live as it is
      this.cells[to] = this.cells[from];
    }

    //animate tile movement
    let tile = FILLED_GRID_NODE.querySelector('.tile[data-cell-no="'+ from + '"]');
    let target = GAME_GRID_NODE.querySelector('.game-grid-cell:nth-child(' + (to + 1) + ')');
    if (mergeValue != EMPTY_CELL_VALUE) {
      tile.setAttribute('data-value', mergeValue);
      let removeNode = FILLED_GRID_NODE.querySelector('.tile[data-cell-no="' + to + '"]');
      FILLED_GRID_NODE.removeChild(removeNode);
    }
    tile.setAttribute('data-cell-no', to);
    tile.style.transform = "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px)";
    this.cells[from] = EMPTY_CELL_VALUE;
  };

  //merge from one tile into another tile 
  GameGridFactory.prototype.mergeTiles = function(from, to) {
    //cell is not empty so we are going to add our value in it.
    this.cells[to] += this.cells[from];
    this.moveTile(from, to, this.cells[to]);
    this.cells[from] = EMPTY_CELL_VALUE;
  };

  //move all tiles up as possilble
  GameGridFactory.prototype.moveTilesUp = function() {
    let madeMove = false;
    //first pass: we'll only check empty cells and move tiles into empty cells
    for (let i = 0; i < this.cells.length; ++i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same column and move them
        for (let j = curRow + 1; j < GRID; ++j) {
          if (this.cells[j*GRID + curColumn] != EMPTY_CELL_VALUE) {
            this.moveTile(j*GRID + curColumn, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    //second pass: we'll merge two same immediate tiles
    for (let i = 0; i < this.cells.length; ++i) {
      if (this.cells[i] != EMPTY_CELL_VALUE) {
        let curRow = parseInt(i / GRID);
        let curColumn = i % GRID;
        
        //if both are same then we'll merge tiles else we continue
        let immediateNext = (curRow + 1)*GRID + curColumn;
        if ((curRow + 1) < GRID && this.cells[i] == this.cells[immediateNext]) {
          this.mergeTiles(immediateNext, i);
          madeMove = true;
        }
      }
    }

    //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
    for (let i = 0; i < this.cells.length; ++i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same column and move them
        for (let j = curRow + 1; j < GRID; ++j) {
          if (this.cells[j*GRID + curColumn] != EMPTY_CELL_VALUE) {
            this.moveTile(j*GRID + curColumn, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    if (madeMove) {
      this.generateTile();
    }
  };

  //move all tiles to down as possilbe
  GameGridFactory.prototype.moveTilesDown = function() {
    let madeMove = false;
    //first pass: we'll only check empty cells and move tiles into empty cells
    for (let i = this.cells.length - 1; i >= 0; --i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same column and move them
        for (let j = curRow - 1; j >= 0; --j) {
          if (this.cells[j*GRID + curColumn] != EMPTY_CELL_VALUE) {
            this.moveTile(j*GRID + curColumn, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    //second pass: we'll merge two same immediate tiles
    for (let i = this.cells.length - 1; i >= 0; --i) {
      if (this.cells[i] != EMPTY_CELL_VALUE) {
        let curRow = parseInt(i / GRID);
        let curColumn = i % GRID;
        
        //if both are same then we'll merge tiles else we continue
        let immediateNext = (curRow  - 1)*GRID + curColumn;
        if ((curRow - 1) >= 0 && this.cells[i] == this.cells[immediateNext]) {
          this.mergeTiles(immediateNext, i);
          madeMove = true;
        }
      }
    }

    //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
    for (let i = this.cells.length - 1; i >= 0; --i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same column and move them
        for (let j = curRow - 1; j >= 0; --j) {
          if (this.cells[j*GRID + curColumn] != EMPTY_CELL_VALUE) {
            this.moveTile(j*GRID + curColumn, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    if (madeMove) {
      this.generateTile();
    }
  };

  //move all tiles to right as possible
  GameGridFactory.prototype.moveTilesRight = function() {
    let madeMove = false;
    //first pass: we'll only check empty cells and move tiles into empty cells
    for (let i = this.cells.length - 1; i >= 0; --i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same row and move them
        for (let j = curColumn - 1; j >= 0; --j) {
          if (this.cells[curRow*GRID + j] != EMPTY_CELL_VALUE) {
            this.moveTile(curRow*GRID + j, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    //second pass: we'll merge two same immediate tiles
    for (let i = this.cells.length - 1; i >= 0; --i) {
      if (this.cells[i] != EMPTY_CELL_VALUE) {
        let curRow = parseInt(i / GRID);
        let curColumn = i % GRID;
        
        //if both are same then we'll merge tiles else we continue
        let immediateNext = curRow*GRID + curColumn - 1;
        if ((curColumn - 1) >= 0 && this.cells[i] == this.cells[immediateNext]) {
          this.mergeTiles(immediateNext, i);
          madeMove = true;
        }
      }
    }

    //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
    for (let i = this.cells.length - 1; i >= 0; --i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same row and move them
        for (let j = curColumn - 1; j >= 0; --j) {
          if (this.cells[curRow*GRID + j] != EMPTY_CELL_VALUE) {
            this.moveTile(curRow*GRID + j, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    if (madeMove) {
      this.generateTile();
    }
  };

  //move all tiles to left as possilbe
  GameGridFactory.prototype.moveTilesLeft = function() {
    let madeMove = false;
    //first pass: we'll only check empty cells and move tiles into empty cells
    for (let i = 0; i < this.cells.length; ++i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same row and move them
        for (let j = curColumn + 1; j < GRID; ++j) {
          if (this.cells[curRow*GRID + j] != EMPTY_CELL_VALUE) {
            this.moveTile(curRow*GRID + j, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    //second pass: we'll merge two same immediate tiles
    for (let i = 0; i < this.cells.length; ++i) {
      if (this.cells[i] != EMPTY_CELL_VALUE) {
        let curRow = parseInt(i / GRID);
        let curColumn = i % GRID;
        
        //if both are same then we'll merge tiles else we continue
        let immediateNext = curRow*GRID + curColumn + 1;
        if ((curColumn + 1) < GRID && this.cells[i] == this.cells[immediateNext]) {
          this.mergeTiles(immediateNext, i);
          madeMove = true;
        }
      }
    }

    //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
    for (let i = 0; i < this.cells.length; ++i) {
      let curRow = parseInt(i / GRID);
      let curColumn = i % GRID;
      
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        //if cell is empty then we'll find all non empty element in same row and move them
        for (let j = curColumn + 1; j < GRID; ++j) {
          if (this.cells[curRow*GRID + j] != EMPTY_CELL_VALUE) {
            this.moveTile(curRow*GRID + j, i);
            madeMove = true;
            break;
          }
        }
      } 
    }

    if (madeMove) {
      this.generateTile();
    }
  };

  //check if tiles can be moved or not 
  //used to check if game is over or not
  GameGridFactory.prototype.isTilesMovable = function() {
    //check if any cell is empty then return true as tiles are movable
    for (let i in this.cells) {
      if (this.cells[i] == EMPTY_CELL_VALUE) {
        return true;
      }
    }

    //all cells are filled and no neighboured cell has same values then return false
    for (let i = 0; i < this.cells.length; ++i) {
      let row = parseInt(i / GRID);
      let col = i % GRID;
      //check if two sequencial cells in a same row are matching or not
      if (col != (GRID - 1)) {
        if (this.cells[i] == this.cells[row*GRID + col + 1]) {
          return true;
        } 
      }

      //check if two sequencial cells in a same column are matching or not
      if (row != (GRID - 1)) {
        if (this.cells[i] == this.cells[(row + 1)*GRID + col]) {
          return true;
        }
      }
    }

    return false;
  };

  //creates instance only once
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