<?php

namespace Controllers\V1;

use Controllers\Controller;
use Http\Request;
use Models\User;

class AuthController extends Controller
{
	/**
	 * Login to Application
	 * 
	 * @param $_POST $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function login(Request $request)
	{
		$request->validate([
			'email' => ['required', 'email'], 
			'password' => ['required', 'min:8', 'max:32']
		]);
		return $this->__loginAttempt($request->email, $request->password);
	}

	/**
	 * Register new user to Application
	 * 
	 * @param $_POST $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function register(Request $request)
	{
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
		
	}
}