let AuthManager = (function() {
  let instance;

  //private singleton factory
  class AuthManagerFactory {
    constructor() {
      this.token = getCookie('bearer');
    }

    //check if user is loggedin or not
    isLoggedIn() {
      if (this.token) {
        //user has token verify it if it's expired or not
      } else {
        return false;
      }
    }
  }

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