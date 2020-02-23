let ScoreManager = (function() {
  let instance;
  let grid = GameGrid.getInstance();

  //private singleton factory
  class ScoreManagerFactory {
    constructor() {
      this.score = 0;
      this.best = 0;
    }

    //resets the score
    reset() {
      this.score = 0;
      this.setScoreHTML();
    }

    //update scores
    updateScore() {
      let score = 0;
      for (let cell of grid.cells) {
        if (cell != emptyCellValue) {
          score += cell;
        }
      }
      
      this.score = score;
      this.setScoreHTML();
    }

    //checks if current score is greater than best and if yes then set it to best
    updateBestIfPossilble() {
      if (this.score > this.best) {
        this.best = this.score;
        DataManager.getInstance().store(bestScoreCookie, this.best);
      }
    }

    //sets current best score
    setCurrentBest(score) {
      this.best = score;
      this.setScoreHTML();
    }

    //sets score display values
    setScoreHTML() {
      let score = this.score, bestScore = this.best;
      //change current score display value
      document.querySelectorAll('.current-score').forEach(element => {
        element.innerHTML = score;
      });

      //change best score display value
      document.querySelectorAll('.best-score').forEach(element => {
        element.innerHTML = bestScore;
      });
    }
  }

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