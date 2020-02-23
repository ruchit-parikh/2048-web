let ScoreManager = (function() {
  let instance;
  let grid = GameGrid.getInstance();

  //private singleton factory
  class ScoreManagerFactory {
    constructor() {
      this.score = 0;
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

    //sets score display values
    setScoreHTML() {
      let score = this.score;
      //change current score display value
      document.querySelectorAll('.current-score').forEach(element => {
        element.innerHTML = score;
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