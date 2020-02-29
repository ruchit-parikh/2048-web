let GameManager = (function() {
  let instance;

  //private singleton factory
  var GameManagerFactory = function() {
    this.grid = GameGrid.getInstance();
    this.inputManager = InputManager.getInstance();
    this.scoreManager = ScoreManager.getInstance();
    this.dataManager = DataManager.getInstance();
    this.loadData();
  };

  //restarts whole game
  GameManagerFactory.prototype.restart = function() {
    this.grid.reset();
    this.scoreManager.reset();
    GAME_OVER_NODE.style.opacity = 0;
  };

  //loads all game data from cookie if not logged in else from server
  GameManagerFactory.prototype.loadData = function() {
    let best = this.dataManager.get(BEST_SCORE_COOKIE, 0);
    let name = this.dataManager.get(PLAYER_NAME_COOKIE, 'Guest');
    
    //set score and name display values
    this.scoreManager.setCurrentBest(best);
    PLAYER_NAME_NODE.innerHTML = name;

    if (!AuthManager.getInstance().isLoggedIn()) {
      //hide leaderboard
      LOGIN_FORM_NODE.style.display = 'block';
    }
  };

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