<?php 

namespace v1;

use core\Route;

Route::post('/register', 'AuthController', 'register');
Route::post('/login', 'AuthController', 'login');