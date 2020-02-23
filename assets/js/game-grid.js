let GameGrid = (function () {
  let instance;

  //private singleton factory
  class GameGridFactory {
    constructor() {
      this.reset();
    }

    //reset grid
    reset() {
      this.cells = new Array(Math.pow(grid, 2)).fill(emptyCellValue);
      this.renderHTML();
      for (let i = 0; i < startTilesCount; ++i) {
        this.generateTile();
      }
    }
  
    //get indexes of empty cells from 0 to sqr(grid)
    getEmptyCells() {
      let cells = [];
  
      this.cells.forEach((cell, key) => {
        if (cell == emptyCellValue) {
          cells.push(key);
        }
      });
  
      return cells;
    }
  
    //generate random tile on empty cells available
    generateTile() {
      let emptyCells = this.getEmptyCells();
      if (emptyCells.length > 0) {
        let tileIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        this.cells[tileIndex] = spotValues[Math.floor(Math.random()*spotValues.length)];
        
        //create new tiles with value generated
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-value', this.cells[tileIndex]);
        tile.setAttribute('data-cell-no', tileIndex);

        //target where we will spawn this tile
        let target = document.querySelector('#game-grid .game-grid-cell:nth-child(' + (tileIndex + 1) + ')');
        let tileStyles = target.getClientRects()[0];
        tile.style.width = tileStyles.width + 'px';
        tile.style.height = tileStyles.height + 'px';
        tile.style.transform = "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px)";
        tile.style.transformOrigin = target.offsetLeft + (tileStyles.width / 2) + 'px ' + (target.offsetTop + (tileStyles.height / 2)) + 'px';
        document.querySelector('#filled-grid').append(tile);

        //performing zoomin animation
        setTimeout(function() {
          tile.style.scale = 1;
          tile.style.opacity = 1;
          return;
        }, 100);
      }
    }
  
    //render first time all cells into grid 
    renderHTML() {
      let html = '';
  
      this.cells.forEach(cell => {
        html += "<div class='game-grid-cell' data-value='" + cell + "' style='width: " + cellWidth + "%; height: " + cellHeight + "px; margin: " + (cellMargin/2) + "%;'></div>";
      }); 
  
      document.querySelector('#game-grid').innerHTML = html;  
      document.querySelector('#game-grid-wrapper').style = "font-size: " + 80 / grid + "px;";
      document.querySelector('#filled-grid').innerHTML = '';
    }

    //move tile from one pos to another
    moveTile(from, to, mergeValue = emptyCellValue) {
      if (this.cells[to] == emptyCellValue) {
        //if cell is empty then we'll move tile to this position else we may merge or live as it is
        this.cells[to] = this.cells[from];
      }

      //animate tile movement
      let tile = document.querySelector('#filled-grid .tile[data-cell-no="'+ from + '"]');
      let target = document.querySelector('#game-grid .game-grid-cell:nth-child(' + (to + 1) + ')');
      if (mergeValue != emptyCellValue) {
        tile.setAttribute('data-value', mergeValue);
        document.querySelector('#filled-grid .tile[data-cell-no="' + to + '"]').remove();
      }
      tile.setAttribute('data-cell-no', to);
      tile.style.transform = "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px)";
      this.cells[from] = emptyCellValue;
    }

    //merge from one tile into another tile 
    mergeTiles(from, to) {
      //cell is not empty so we are going to add our value in it.
      this.cells[to] += this.cells[from];
      this.moveTile(from, to, this.cells[to]);
      this.cells[from] = emptyCellValue;
    }
 
    //move all tiles up as possilble
    moveTilesUp() {
      let madeMove = false;
      //first pass: we'll only check empty cells and move tiles into empty cells
      for (let i = 0; i < this.cells.length; ++i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same column and move them
          for (let j = curRow + 1; j < grid; ++j) {
            if (this.cells[j*grid + curColumn] != emptyCellValue) {
              this.moveTile(j*grid + curColumn, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      //second pass: we'll merge two same immediate tiles
      for (let i = 0; i < this.cells.length; ++i) {
        if (this.cells[i] != emptyCellValue) {
          let curRow = parseInt(i / grid);
          let curColumn = i % grid;
          
          //if both are same then we'll merge tiles else we continue
          let immediateNext = (curRow + 1)*grid + curColumn;
          if ((curRow + 1) < grid && this.cells[i] == this.cells[immediateNext]) {
            this.mergeTiles(immediateNext, i);
            madeMove = true;
          }
        }
      }

      //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
      for (let i = 0; i < this.cells.length; ++i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same column and move them
          for (let j = curRow + 1; j < grid; ++j) {
            if (this.cells[j*grid + curColumn] != emptyCellValue) {
              this.moveTile(j*grid + curColumn, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      if (madeMove) {
        this.generateTile();
      }
    }

    //move all tiles to down as possilbe
    moveTilesDown() {
      let madeMove = false;
      //first pass: we'll only check empty cells and move tiles into empty cells
      for (let i = this.cells.length - 1; i >= 0; --i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same column and move them
          for (let j = curRow - 1; j >= 0; --j) {
            if (this.cells[j*grid + curColumn] != emptyCellValue) {
              this.moveTile(j*grid + curColumn, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      //second pass: we'll merge two same immediate tiles
      for (let i = this.cells.length - 1; i >= 0; --i) {
        if (this.cells[i] != emptyCellValue) {
          let curRow = parseInt(i / grid);
          let curColumn = i % grid;
          
          //if both are same then we'll merge tiles else we continue
          let immediateNext = (curRow  - 1)*grid + curColumn;
          if ((curRow - 1) >= 0 && this.cells[i] == this.cells[immediateNext]) {
            this.mergeTiles(immediateNext, i);
            madeMove = true;
          }
        }
      }

      //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
      for (let i = this.cells.length - 1; i >= 0; --i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same column and move them
          for (let j = curRow - 1; j >= 0; --j) {
            if (this.cells[j*grid + curColumn] != emptyCellValue) {
              this.moveTile(j*grid + curColumn, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      if (madeMove) {
        this.generateTile();
      }
    }

    //move all tiles to right as possible
    moveTilesRight() {
      let madeMove = false;
      //first pass: we'll only check empty cells and move tiles into empty cells
      for (let i = this.cells.length - 1; i >= 0; --i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same row and move them
          for (let j = curColumn - 1; j >= 0; --j) {
            if (this.cells[curRow*grid + j] != emptyCellValue) {
              this.moveTile(curRow*grid + j, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      //second pass: we'll merge two same immediate tiles
      for (let i = this.cells.length - 1; i >= 0; --i) {
        if (this.cells[i] != emptyCellValue) {
          let curRow = parseInt(i / grid);
          let curColumn = i % grid;
          
          //if both are same then we'll merge tiles else we continue
          let immediateNext = curRow*grid + curColumn - 1;
          if ((curColumn - 1) >= 0 && this.cells[i] == this.cells[immediateNext]) {
            this.mergeTiles(immediateNext, i);
            madeMove = true;
          }
        }
      }

      //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
      for (let i = this.cells.length - 1; i >= 0; --i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same row and move them
          for (let j = curColumn - 1; j >= 0; --j) {
            if (this.cells[curRow*grid + j] != emptyCellValue) {
              this.moveTile(curRow*grid + j, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      if (madeMove) {
        this.generateTile();
      }
    }

    //move all tiles to left as possilbe
    moveTilesLeft() {
      let madeMove = false;
      //first pass: we'll only check empty cells and move tiles into empty cells
      for (let i = 0; i < this.cells.length; ++i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same row and move them
          for (let j = curColumn + 1; j < grid; ++j) {
            if (this.cells[curRow*grid + j] != emptyCellValue) {
              this.moveTile(curRow*grid + j, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      //second pass: we'll merge two same immediate tiles
      for (let i = 0; i < this.cells.length; ++i) {
        if (this.cells[i] != emptyCellValue) {
          let curRow = parseInt(i / grid);
          let curColumn = i % grid;
          
          //if both are same then we'll merge tiles else we continue
          let immediateNext = curRow*grid + curColumn + 1;
          if ((curColumn + 1) < grid && this.cells[i] == this.cells[immediateNext]) {
            this.mergeTiles(immediateNext, i);
            madeMove = true;
          }
        }
      }

      //third pass: we'll only check empty cells remained after merge and move tiles into empty cells
      for (let i = 0; i < this.cells.length; ++i) {
        let curRow = parseInt(i / grid);
        let curColumn = i % grid;
        
        if (this.cells[i] == emptyCellValue) {
          //if cell is empty then we'll find all non empty element in same row and move them
          for (let j = curColumn + 1; j < grid; ++j) {
            if (this.cells[curRow*grid + j] != emptyCellValue) {
              this.moveTile(curRow*grid + j, i);
              madeMove = true;
              break;
            }
          }
        } 
      }

      if (madeMove) {
        this.generateTile();
      }
    }

    //check if tiles can be moved or not 
    //used to check if game is over or not
    isTilesMovable() {
      //check if any cell is empty then return true as tiles are movable
      for (let cell of this.cells) {
        if (cell == emptyCellValue) {
          return true;
        }
      }

      //all cells are filled and no neighboured cell has same values then return false
      for (let i = 0; i < this.cells.length; ++i) {
        let row = parseInt(i / grid);
        let col = i % grid;
        //check if two sequencial cells in a same row are matching or not
        if (col != (grid - 1)) {
          if (this.cells[i] == this.cells[row*grid + col + 1]) {
            return true;
          } 
        }

        //check if two sequencial cells in a same column are matching or not
        if (row != (grid - 1)) {
          if (this.cells[i] == this.cells[(row + 1)*grid + col]) {
            return true;
          }
        }
      }

      return false;
    }
  }

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