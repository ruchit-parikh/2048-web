<?php

namespace Models;

use Database\Connection as DatabaseConnection;
use Exception;

class Model 
{
	//table name of your model
	protected $table;

	//database connection object
	protected $connection; 

	//columns that are available in your model
	//this will be mostly overrided on child class
	protected $columns;

	//fields that can not be filled any way 
	//these fields are going to take values by Storage Engine (default values or index)
	protected $guarded;

	// constructor with $db as database connection
	public function __construct()
	{
		$this->connection = DatabaseConnection::getInstance();
		$this->table = $this->__plural(get_class($this));
	}

	/**
	 * Create new instance of your model with some data and store in database
	 * 
	 * @param array|mixed 
	 * @return Model|false
	 */
	protected static function create($data)
	{
		$model_name = get_called_class();
		
		try {
			$model = new $model_name();
			
			foreach ($data as $key => $value) {
				$model->columns[$key] = $value;
			}
			
			$model->store();
			
			return $model;
		} catch (Exception $e) {
			echo "Error: Creating new model instance. Error Details: ".$e->getMessage();
			return false;
		}
	}

	/**
	 * Save model in database or update if it's id is already set
	 * 
	 * @param void
	 * @return boolean
	 */
	protected function store()
	{
		if (array_key_exists('id', $this->columns)) {
			//update query
			return $this->update($this->columns);
		} else {
			//insert query
			return get_called_class()::insert($this);
		}
	}

	/**
	 * Mass Insert data into database
	 * 
	 * @param array
	 * @return boolean
	 */
	protected static function insert(Model $models)
	{
		try {
			$statement = '';
			
			foreach ($models as $model) {
				$statement .= 'INSERT INTO '.$model->table;
				$keys = '';
				$values = '';

				foreach ($model as $key => $value) {
					if (array_key_exists($key, $model->guarded)) {
						throw new Exception("Key is in guarded mode! You cannot fill it.");
					}

					$keys .= "$key".' ,';
					$values .= '"'.$value.'"'.' ,';
				}

				$statement .= ' ('.rtrim($keys, ',').') VALUES ('.rtrim($values, ',').'); ';
			}
			$this->connection->query($statement);
			return true;
		} catch (Exception $e) {
			echo "Failed to insert data in database. Error Details: ".$e->getMessage();
			return false;
		}
	}

	/**
	 * Update data into database
	 * 
	 * @param array
	 * @return boolean
	 */
	protected function update($data)
	{
		try {
			$statement = 'UPDATE '.$this->table.' SET ';

			foreach ($data as $key => $value) {
				if (array_key_exists($key, $this->guarded)) {
					throw new Exception("Key is in guarded mode! You cannot fill it.");
				}
				$statement .= $key.' = '.$value.' ,';
			}
			$statement = rtrim($statement, ',');
			$statement .= ' WHERE id = '.$data['id'].';';
			$this->connection->query($statement);
			return true;
		} catch (Exception $e) {
			echo "Failed to update data in database. Error Details: ".$e->getMessage();
			return false;
		}
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