<?php

class Autoloader
{
	public static function register()
	{
		spl_autoload_register(function ($class) {
			$file_name = str_replace('\\', DIRECTORY_SEPARATOR, $class).'.php';
			//see if the file exsists
			if(file_exists($file_name)) {
				require_once($file_name);
				return true;
			}
		});
	}
}

//loading configs for database
require_once('Database/config.php');

//autloading of classes
Autoloader::register();

if (RUN_MIGRATION) {
	//migrate tables
	require_once('Migrations/migrate.php');
}

//loading routes files
require_once('Routes/api.php');