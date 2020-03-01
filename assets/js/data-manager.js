let DataManager = (function() {
  let instance;

  //private singleton factory
  var DataManagerFactory = function() {
    this.authManager = AuthManager.getInstance();
  };

  //get values of current user from key
  DataManagerFactory.prototype.get = function(key, defaultValue, displayNodes) {
    if (!this.authManager.isLoggedIn()) {
      //load data from cache
      return getCookie(key) || defaultValue;
    } else {
      //load data from server
      return postData(BASE_URL + '/user/data', {token: this.authManager.token, key: key}, function(response) {
        if (response != null) {
          setCookie(key, response, 30);
        } else {
          response = getCookie(key) || defaultValue;
        }
        //set html after getting data from server
        if (typeof displayNodes != 'undefined') {
          for (let i = 0; i < displayNodes.length; ++i) {
            displayNodes[i].innerHTML = response;
          }
        }
        return response;
      }, function(response) {
        showError(response);
        return getCookie(key) || defaultValue;
      });
    }
  };

  //stores data in cache or server if user is loggedin
  DataManagerFactory.prototype.store = function(key, value) {
    if (!this.authManager.isLoggedIn()) {
      //store data in cache
      setCookie(key, value, 30);
    } else {
      //store data on server
      postData(BASE_URL + '/user/data/update', {token: this.authManager.token, key: key, value: value}, function(response) {
        setCookie(key, value, 30);
        return true;
      }, function(response) {
        setCookie(key, value, 30);
        showError(response);
        return false;
      });
    }
  };

  //refresh leaderboard data and logout if error occurs
  DataManagerFactory.prototype.refreshLeaderBoard = function() {
    if (!this.authManager.isLoggedIn()) {
      LOGIN_FORM_NODE.style.left = "0%";
    } else {
      postData(BASE_URL + '/scores', {token: this.authManager.token}, function(response) {
        TOTAL_PLAYERS.innerHTML = response.length;
        let leaderboard = LEADER_BOARD_NODE.querySelector('.list');
        leaderboard.innerHTML = '';

        //append all scores
        for (let i in response) {
          let listItem = document.createElement('li');
          listItem.classList.add('list-item');
          listItem.innerHTML = '<span class="name">' + response[i].name + '</span><span class="points">' + response[i].best_score + '</span>';
          leaderboard.appendChild(listItem);
        }
        
        //slide both forms and show leaderboard
        LOGIN_FORM_NODE.style.left = "100%";
        REGISTER_FORM_NODE.style.left = "100%";
        return response;
      }, function(error) {
        showError(error);
        //slide both forms and show leaderboard
        LOGIN_FORM_NODE.style.left = "0%";
        REGISTER_FORM_NODE.style.left = "0%";
        return false;
      }, false, function() {
        PLAYER_NAME_NODE.innerHTML = DataManager.getInstance().get(PLAYER_NAME_COOKIE, 'Guest', PLAYER_NAME_NODE);
        ScoreManager.getInstance().setCurrentBest(DataManager.getInstance().get(BEST_SCORE_COOKIE, 0, BEST_SCORES_NODE));
        ScoreManager.getInstance().updateBestIfPossilble();
      });
    }
  };

  //create only once instance
  function createInstance() {
    var object = new DataManagerFactory();
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