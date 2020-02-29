<?php

// show error reporting
ini_set('display_errors', 0);
error_reporting(E_ALL);

//application name
define('APPNAME', '2048 WEB');

//application homepage url
define('APPURL', 'http://192.168.1.100/2048-web/api/v1');

//Database host name 
define('DBHOST','localhost');

//Database name
define('DBNAME','2048_web');

//Database username
define('DBUSER','root');

//Database password
define('DBPWD','smile');

//run migration on request
//kindly set this value to false after it's migrated
define('RUN_MIGRATION', false);