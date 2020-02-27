<?php

namespace core;

use Exception;

class Route
{
	private function __construct()
	{
		//Nobody will be able to create instance of this.
	}

	/**
	 * POST Request
	 * 
	 * @param string $uri
	 * @param string $controller
	 * @param string $action_method
	 * @return void
	 */
	public static function post(string $uri, string $controller, string $action_method)
	{
		try {
			if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['REQUEST_URI'] == (APPURL.strstr($uri, '/') ? $uri : '/'.$uri)) {
				$response = 'Controllers\\'.$controller::getInstance()->$action_method();
				
				//output api results
				print_r($response);
			}
		} catch (Exception $e) {
			echo "Error resolving route. Error Details: ".$e->getMessage();
			return;
		}
	}
}