<?php

namespace Routes;

use Exception;
use Http\Request;

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
			if ($_SERVER['REQUEST_METHOD'] == 'POST' && (($_SERVER['HTTP_ORIGIN'].$_SERVER['REQUEST_URI']) == (APPURL.(strstr($uri, '/') ? $uri : '/'.$uri)))) {
				$response = ('Controllers\\'.$controller)::getInstance()->$action_method(new Request(json_decode(file_get_contents('php://input'), true)));
				
				//output api results
				print_r(json_encode($response));
			}
		} catch (Exception $e) {
			echo "Error resolving route. Error Details: ".$e->getMessage();
			return;
		}
	}
}