let InputManager = (function () {
  let instance;
  let grid = GameGrid.getInstance();
  let scoreManager = ScoreManager.getInstance();
  
  //private singleton factory
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
        
        //update scores after each move
        scoreManager.updateScore();

        //check if game is over or not and end game if it's over
        if (!grid.isTilesMovable()) {
          gameOver();
        }
      } 
    }

    //listen to mouse or touch inputs
    listenForDragInputs() {
      let pos = document.querySelector('#game-grid').getBoundingClientRect();
      let startX, startY, endX, endY;
      document.ontouchstart = dragStart;
      document.ontouchmove = dragMove;
      document.onmousedown = dragStart;
      document.onmouseup = dragEnd;

      //touch start
      function dragStart(cursor) {
        startX = cursor.clientX || cursor.touches[0].pageX;
        startY = cursor.clientY || cursor.touches[0].pageY;
      }

      //drag in process
      function dragMove(cursor) {
        endX = cursor.touches[0].pageX;
        endY = cursor.touches[0].pageY;
        dragEnd(cursor);
      }

      //touch end
      function dragEnd(cursor) {
        if (typeof cursor.touches == 'undefined') {
          endX = cursor.clientX;
          endY = cursor.clientY;
        }

        //check if drag happens in grid or not
        if (
          (startX < pos.left || startX > pos.right || startY < pos.top || startY > pos.down) &&
          (endX < pos.left || endX > pos.right || endY < pos.top || endY > pos.down)
        ) {
          return;
        }

        let horizontal = endX - startX;
        let vertical = endY - startY;

        if (Math.abs(horizontal) > drag || Math.abs(vertical) > drag) {
          if (Math.abs(horizontal) > Math.abs(vertical)) {
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

          //update scores after each move
          scoreManager.updateScore();
          
          //check if game is over or not and end game if it's over
          if (!grid.isTilesMovable()) {
            gameOver();
          }
        }
      }
    }
  }

  //creates instance only once
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

//game over
function gameOver() {
  let gameOver = document.querySelector('#game-over');
  gameOver.style.opacity = 1;
}