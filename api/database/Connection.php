<?php

namespace database;

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
				self::$connection = new PDO("mysql:host = ".DBHOST."; dbname = ".DBNAME, DBUSER, DBPWD);
				self::$connection->exec("set names utf8");
			} catch(Exception $exception) {
				echo "Connection error: ".$exception->getMessage();
			}
		}
		return self::$connection;
	}
}
