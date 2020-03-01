<?php

namespace Controllers\V1;

use Controllers\Controller;
use Exception;
use Http\AuthMiddleware;
use Http\Request;
use Models\User;

class AuthController extends Controller
{
	/**
	 * Login to Application
	 * 
	 * @param Request $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function login(Request $request)
	{
		$request->validate([
			'email' => ['required', 'email', 'match:users,email,password,'.$request->password], 
			'password' => ['required', 'min:8', 'max:32']
		]);
		return $this->__loginAttempt($request->email, $request->password);
	}

	/**
	 * Register new user to Application
	 * 
	 * @param Request $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function register(Request $request)
	{
		$this->__checkForDos();

		$request->validate([
			'name' => ['required'], 
			'email' => ['required', 'email', 'unique:users,email'], 
			'password' => ['required', 'min:8', 'max:32', 'confirmed:'.$request->confirm_password], 
			'confirm_password' => ['required', 'min:8', 'max:32', 'confirmed:'.$request->password]
		]);
		$request->password = md5($request->password);
		$user = User::create($request->only(['name', 'email', 'password']));
		return $this->__loginAttempt($user->columns['email'], $user->columns['password']);
	}

	/**
	 * Attempt for login 
	 * 
	 * @param string $email
	 * @param string $password
	 * 
	 * @return string $token | false
	 */
	private function __loginAttempt(string $email, string $password)
	{
		session_start();
		try {
			$token = openssl_encrypt(
				$email, openssl_get_cipher_methods()[0], APPKEY, 0, APPKEY
			);

			$_SESSION['loggedin'] = $email;
			$response = [
				'token' => $token,
			];
			return $response;
		} catch (Exception $e) {
			return ['error' => $e->getMessage()];
		}
	}

	/**
	 * Checks if request has valid auth token or it's expired 
	 * 
	 * @param Request $request
	 * @return boolean
	 */
	public function verify(Request $request)
	{
		return AuthMiddleware::checkAuth($request);
	}

	/**
	 * Check if api is pinged more than throttle's limit
	 * 
	 * @param void
	 * @return void
	 */
	private function __checkForDos()
	{
		//limit api rate to throttles rate to avoid dos attack
		session_start();
		if (isset($_SESSION['LAST_API_CALL'])) {
			$last = strtotime($_SESSION['LAST_API_CALL']);
			$curr = strtotime(date("Y-m-d h:i:s"));
			$sec =  abs($last - $curr);
			if ($sec <= THROTTLE) {
				$data = 'Rate Limit Exceeded';
				header('Content-Type: application/json');
				header("HTTP/1.1 403 Forbidden");
				header('Connection: close');
				print_r(json_encode($data));
				die ();
			}
		}
		$_SESSION['LAST_API_CALL'] = date("Y-m-d h:i:s");
	}
}