let InputManager = (function () {
  let instance;
  let grid = GameGrid.getInstance();
  
  class InputManagerFactory {
    constructor() {
      this.listenKeyboardInputs();
      this.listenForDragInputs();
    }
  
    //listener for keyboard inputs
    listenKeyboardInputs() {
      document.onkeyup = function(event) {
        switch(event.keyCode) {
          case inputs.LEFT:
          case inputs.A:
            grid.moveTilesLeft();
            break;
          
          case inputs.UP:
          case inputs.W:
            grid.moveTilesUp();
            break;
  
          case inputs.RIGHT:
          case inputs.D:
            grid.moveTilesRight();
            break;
          
          case inputs.DOWN:
          case inputs.S:
            grid.moveTilesDown();
            break;
        }
      } 
    }

    //listen to mouse or touch inputs
    listenForDragInputs() {
      let startX, startY, endX, endY;
      document.onmousedown = function(cursor) {
        startX = cursor.clientX;
        startY = cursor.clientY;
      }

      document.onmouseup = function(cursor) {
        endX = cursor.clientX;
        endY = cursor.clientY;

        let horizontal = endX - startX;
        let vertical = endY - startY;

        if (horizontal > drag || vertical > drag) {
          if (horizontal > vertical) {
            //x-swipe
            if (endX > startX) {
              //right-swipe
              grid.moveTilesRight();
            } else {
              //left-swipe
              grid.moveTilesLeft();
            }
          } else {
            //y-swipe
            if (endY > startY) {
              //down-swipe
              grid.moveTilesDown();
            } else {
              //up-swipe
              grid.moveTilesUp();
            }
          }
        }
      }
    }
  }

  function createInstance() {
    var object = new InputManagerFactory();
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