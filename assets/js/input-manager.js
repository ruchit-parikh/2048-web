let InputManager = (function () {
  let instance;
  
  class InputManagerFactory {
    constructor() {
      this.listen();
    }
  
    listen() {
      document.onkeyup = function(event) {
        switch(event.keyCode) {
          case inputs.LEFT:
          case inputs.A:
            break;
          
          case inputs.UP:
          case inputs.W:
            break;
  
          case inputs.RIGHT:
          case inputs.D:
            break;
          
          case inputs.DOWN:
          case inputs.S:
            break;
        }
      } 
    }
  }

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