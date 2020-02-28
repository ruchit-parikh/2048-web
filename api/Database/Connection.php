<?php

namespace Database;

use Exception;
use PDO;

class Connection 
{
	// specify your own database credentials
	private static $connection = null;

	private function __construct()
	{
		//Nobody will be able to create new instance.
	}

	/**
	 * Get connection instance
	 * 
	 * @param void
	 * @return PDO
	 */
	public static function getInstance()
	{
		if (empty(self::$connection)) {
			try {
				self::$connection = new PDO(("mysql:host=".DBHOST.";dbname=".DBNAME), DBUSER, DBPWD);
				self::$connection->exec("set names utf8");
				//display errors if debug is true
				if (ini_get('display_errors')) {
					self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				}
			} catch(Exception $exception) {
				echo "Connection error: ".$exception->getMessage();
			}
		}
		return self::$connection;
	}
}
