//grid for game matrix 4 x 4 = 16cells
const GRID = 4;

//spot values are values which can be generated at each move
//2 has more priority than 4
//make sure you specify colors and size for all combinations of these numbers in scss/css files.
const SPOT_VALUES = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
const EMPTY_CELL_VALUE = '';

//cache HTML nodes so that we won't need to fetch again and again
const GAME_GRID_NODE = document.querySelector('#game-grid');
const FILLED_GRID_NODE = document.querySelector('#filled-grid');
const GAME_OVER_NODE = document.querySelector('#game-over');
const NOTIFICATION_NODE = document.querySelector('#messages');
const PLAYER_NAME_NODE = document.querySelector('#player-name');
const LEADER_BOARD_NODE = document.querySelector('#leaderboard');
const TOTAL_PLAYERS = document.querySelector('#scores-count');
const CURRENT_SCORES_NODE = document.querySelectorAll('.current-score');
const BEST_SCORES_NODE = document.querySelectorAll('.best-score');
const LOGIN_FORM_NODE = document.querySelector('#login-form');
const REGISTER_FORM_NODE = document.querySelector('#register-form');

//compute const height and width of cells in the beginning to avoid computation at each move
const CELL_MARGIN = 3;
const CELL_WIDTH = ((100 / GRID) - CELL_MARGIN);
const CELL_HEIGHT = GAME_GRID_NODE.getBoundingClientRect().width / GRID;

//intial numbers of tiles generated
const START_TILES_COUNT = 2;

//minimum drag difference required for touch inputs and mouse drags
const DRAG = 25;

//possible input values
const INPUTS = {
  LEFT: 37, 
  UP: 38, 
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  S: 83,
  A: 65,
  D: 68
}

//cookie names
BEST_SCORE_COOKIE = 'best';
PLAYER_NAME_COOKIE = 'name';
AUTH_TOKEN = 'bearer';

//api url
BASE_URL = 'http://192.168.1.100/2048-web/api/v1';

//status code of api
STATUS = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  ERROR: 500
};
