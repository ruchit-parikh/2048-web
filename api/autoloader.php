<?php

class Autoloader
{
	public static function register()
	{
		spl_autoload_register(function ($class) {
			$file = str_replace('\\', DIRECTORY_SEPARATOR, $class).'.php';
			if (file_exists($file)) {
				require_once $file;
				return true;
			}
			return false;
		});
	}
}

//loading configs for database
require_once('Database/config.php');

//autloading of classes
Autoloader::register();

//loading routes files
require_once('Routes/api.php');