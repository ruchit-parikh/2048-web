<?php

namespace v1\Controllers;

class AuthController extends Controller
{
	/**
	 * Login to Application
	 * 
	 * @param Request $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function login()
	{
		return ['response' => 200];
	}

	/**
	 * Register new user to Application
	 * 
	 * @param Request $request
	 * @return string $token | 422: Validation errors | false
	 */
	public function register()
	{
		return ['response' => 200];
	}
}