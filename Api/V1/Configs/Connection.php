<?php

namespace Api\Configs;

use Exception;
use PDO;

class Connection 
{
	// specify your own database credentials
	public $conn;

	// get the database connection
	public function getConnection()
	{
		$this->conn = null;

		try {
			$this->conn = new PDO("mysql:host = ".DBHOST."; dbname = ".DBNAME, DBUSER, DBPWD);
			$this->conn->exec("set names utf8");
		} catch(Exception $exception) {
			echo "Connection error: ".$exception->getMessage();
		}
		return $this->conn;
	}
}
