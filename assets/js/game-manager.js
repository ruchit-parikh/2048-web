let GameManager = (function() {
  let instance;

  //private singleton factory
  class GameManagerFactory {
    constructor() {
      this.grid = GameGrid.getInstance();
      this.inputManager = InputManager.getInstance();
      this.scoreManager = ScoreManager.getInstance();
    }

    //restarts whole game
    restart() {
      this.grid.reset();
      this.scoreManager.reset();
      document.querySelector('#game-over').style.opacity = 0;
    }
  }

  //create only one instance
  function createInstance() {
    var object = new GameManagerFactory();
    object.constructor = null;
    return object;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();