let ScoreManager = (function() {
  let instance;
  let grid = GameGrid.getInstance();

  //private singleton factory
  var ScoreManagerFactory = function() {
    this.score = 0;
    this.best = 0;
  };

  //resets the score
  ScoreManagerFactory.prototype.reset = function() {
    this.score = 0;
    this.setScoreHTML();
  };

  //update scores
  ScoreManagerFactory.prototype.updateScore = function() {
    let sum = 0;
    for (let i = 0; i < grid.cells.length; ++i) {
      if (grid.cells[i] != EMPTY_CELL_VALUE) {
        sum += parseInt(grid.cells[i]);
      }
    }

    this.score = sum;
    this.setScoreHTML();
  };

  //checks if current score is greater than best and if yes then set it to best
  ScoreManagerFactory.prototype.updateBestIfPossilble = function() {
    if (this.score > this.best) {
      this.best = this.score;
      DataManager.getInstance().store(BEST_SCORE_COOKIE, this.best);
    }
  };

  //sets current best score
  ScoreManagerFactory.prototype.setCurrentBest = function(score) {
    this.best = score;
    this.setScoreHTML();
  };

  //sets score display values
  ScoreManagerFactory.prototype.setScoreHTML = function() {
    let score = this.score, bestScore = this.best;
    //change current score display value
    for (let i in CURRENT_SCORES_NODE) {
      CURRENT_SCORES_NODE[i].innerHTML = score;
    }

    //change best score display value
    for (let i in BEST_SCORES_NODE) {
      BEST_SCORES_NODE[i].innerHTML = bestScore;
    }
  };

  //create instance only once
  function createInstance() {
    var object = new ScoreManagerFactory();
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