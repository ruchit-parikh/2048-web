<?php 

namespace Routes;

use Routes\Route;

Route::post('/register', 'V1\AuthController', 'register');
Route::post('/login', 'V1\AuthController', 'login');