<?php 

namespace Routes;

use Routes\Route;

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] != '') {
    $allowed_urls = ['http://127.0.0.1', 'http://localhost', 'http://192.168.1.100'];

    foreach ($allowed_urls as $url) {
        if ($url == $_SERVER['HTTP_ORIGIN']) {
            header('Access-Control-Allow-Origin: '.$url);
            header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
            header('Access-Control-Max-Age: 1000');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            break;
        }
    }
}

Route::post('/register', 'V1\AuthController', 'register');
Route::post('/login', 'V1\AuthController', 'login');

//token verification
Route::post('/auth/verify', 'V1\AuthController', 'verify');

//users routes
Route::post('/user/data', 'V1\UserController', 'getData');
Route::post('/user/data/update', 'V1\UserController', 'store');
Route::post('/scores', 'V1\UserController', 'scores');