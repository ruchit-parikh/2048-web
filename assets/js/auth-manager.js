let AuthManager = (function() {
  let instance;

  //private singleton factory
  var AuthManagerFactory = function() {
    this.token = getCookie(AUTH_TOKEN);
  };

  //check if user is loggedin or not
  AuthManagerFactory.prototype.isLoggedIn = function() {
    if (this.token) {
      //user has token verify it if it's expired or not
      if (this.verify(this.token)) {
        return true;
      }
    } 

    return false;
  };

  //verify token if it's expired or not and if it's not expired it will also refresh token
  AuthManagerFactory.prototype.verify = function(token) {
    return postData(BASE_URL + '/auth/verify', {token: token}, function(response) {
      return true;
    }, function(response) {
      showError(response);
      return false;
    });
  };

  //create only one instance
  function createInstance() {
    var object = new AuthManagerFactory();
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