<?php

namespace Controllers\V1;

use Controllers\Controller;
use Models\User;

class AuthController extends Controller
{
	/**
	 * Login to Application
	 * 
	 * @param $_POST $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function login()
	{
		return $this->__loginAttempt($_POST['email'], $_POST['password']);
	}

	/**
	 * Register new user to Application
	 * 
	 * @param $_POST $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function register()
	{
		$user = User::create(array(
			'name' => $_POST['name'], 
			'email' => $_POST['email'],
			'password' => md5($_POST['password']), 
		));

		return $this->__loginAttempt($user->columns['email'], $user->column['password']);
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