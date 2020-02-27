<?php

namespace v1\Controllers;

class Controller
{
	private static $instance = null;

	private function __construct()
	{
		//Nobody will be able to create object now.
	}

	/**
	 * Get instance of singleton
	 */
	public static function getInstance()
	{
		$class_name = get_called_class();
		if (empty(self::$instance)) {
			self::$instance = new $class_name();
		}
		return self::$instance;
	}
}