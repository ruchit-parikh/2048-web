<?php 

namespace Routes;

Route::post('/register', 'Controllers\V1\AuthController', 'register');
Route::post('/login', 'Controllers\V1\AuthController', 'login');