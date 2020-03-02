<?php

namespace Controllers\V1;

use Controllers\Controller;
use Exception;
use Http\AuthMiddleware;
use Http\Request;
use Models\User;
use PDO;

class UserController extends Controller 
{
    /**
     * Get users data by request key
     * 
     * @param Request $request
     * @return string | null
     */
    public function getData(Request $request)
    {
        try {
            if (!AuthMiddleware::checkAuth($request)) {
                return null;
            }
            return User::where('email', $_SESSION['loggedin'])->fetch()[$request->key];
        } catch (Exception $e) {
            echo "Error Details: ".$e->getMessage();
            return null;
        }
    }

    /**
     * Store data in currently logged in user by using key
     * 
     * @param Request $request -> key and value
     * @return boolean
     */
    public function store(Request $request)
    {
        try {
            if (!AuthMiddleware::checkAuth($request)) {
                return null;
            }
            $user = new User();
            $user->columns = User::where('email', $_SESSION['loggedin'])->fetch();
            $user->update([
                $request->key => $request->value
            ]);
            return true;
        } catch (Exception $e) {
            echo "Error Details: ".$e->getMessage();
            return false;
        }
    }

    /**
     * Get listing of leaderboards data
     * 
     * @param Request $request
     * @return array
     */
    public function scores(Request $request)
    {
        try {
            if (!AuthMiddleware::checkAuth($request)) {
                return null;
            }
            $users = User::only(['name', 'best_score'])->fetchAll(PDO::FETCH_ASSOC);
            usort($users, function($current, $next) {
                return $current['best_score'] > $next['best_score'] ? -1 : 1;
            });
            return $users;
        } catch (Exception $e) {
            echo "Error Details: ".$e->getMessage();
            return false;
        }
    }
}