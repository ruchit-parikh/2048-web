let GameManager = (function() {
  let instance;

  //private singleton factory
  class GameManagerFactory {
    constructor() {
      this.grid = GameGrid.getInstance();
      this.inputManager = InputManager.getInstance();
      this.scoreManager = ScoreManager.getInstance();
      this.dataManager = DataManager.getInstance();
      this.loadData();
    }

    //restarts whole game
    restart() {
      this.grid.reset();
      this.scoreManager.reset();
      document.querySelector('#game-over').style.opacity = 0;
    }

    //loads all game data from cookie if not logged in else from server
    loadData() {
      let best = this.dataManager.get(bestScoreCookie, 0);
      let name = this.dataManager.get(playerNameCookie, 'Guest');
      
      //set score and name display values
      this.scoreManager.setCurrentBest(best);
      document.querySelector("#player-name").innerHTML = name;

      if (!AuthManager.getInstance().isLoggedIn()) {
        //hide leaderboard
        document.querySelector('#leaderboard #login-form').style.display = 'block';
      }
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