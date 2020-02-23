//self invocking function which will be invoked once dom is ready.
(function () {
  init();
})();

//initialize game and setup everything that needs
function init() {
  return GameManager.getInstance();
}

//restarts the game
function restart() {
  return GameManager.getInstance().restart();
}