<?php

namespace Api\V1\Models;

class Model 
{
	protected $table;
	protected $connection; 

	// constructor with $db as database connection
	public function __construct($connection)
	{
		$this->connection = $connection;
		$this->table = $this->__plural(get_class($this));
	}

	/**
	 * Get plural name of any class name
	 * 
	 * @param string
	 * @return string
	 */
	private function __plural(string $class_name)
	{
		return $class_name[strlen($class_name) - 1] == 's' ? $class_name.'es' : $class_name.'s';
	}
}