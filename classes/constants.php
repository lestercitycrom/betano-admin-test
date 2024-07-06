<?php

error_reporting(E_ALL & ~E_DEPRECATED);

if ( stripos( $_SERVER["SERVER_NAME"],  ".local" ) !== false ) define("HOSTING", "local");
elseif ( stripos( $_SERVER["SERVER_NAME"],  ".icrm.space" ) !== false ) define("HOSTING", "test");
else trigger_error( "Unknown server name = {$_SERVER["SERVER_NAME"]}", E_USER_ERROR );

$session_time = 30000;

session_set_cookie_params($session_time, "/", false, false);
ini_set('session.gc_maxlifetime', $session_time);
ini_set('session.use_cookies', 1);
//ini_set('log_errors', 'On');
//ini_set('error_log', 'php_errors.log');

session_start();

mb_internal_encoding("UTF-8");

/* Константы по работе с БД */
	
if ( HOSTING == 'local' ) {
	
	define("IS_LOCAL_SERVER", true);
	define("VERSION", time() );
	
	
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', '');
	define('DB_NAME', 'velzon');
	
	$tz = 'Europe/Kiev';

} elseif ( HOSTING == 'test' ) {

	define("IS_LOCAL_SERVER", false);
	define("VERSION", time() );
	
	define('DB_HOST', 'json.mysql.tools');
	define('DB_USER', 'json_db');
	define('DB_PASSWORD', 'h3hmN92N9tBU');
	define('DB_NAME', 'json_velzon');	
	
	$tz = 'Europe/Kyiv';

}

define('DB_CHARSET','utf8');
define('DB_COLLATION','utf8_general_ci');


date_default_timezone_set( $tz );


$self_fn = str_ireplace('\\','/',__FILE__);
define("ROOT", str_ireplace( "classes/".basename($self_fn ), "", $self_fn ));

define("PRODUCTION", false);


// ~~~~~~~~~~~~~~~~~~~~~~~		Автозагрузка
function main_autoload($class_name) {
	$filename = ROOT . 'classes/'.$class_name.'.php';
	
	if ($res = file_exists($filename)) require_once($filename); 
	else trigger_error("Not found = {$filename}", E_USER_WARNING);
};
spl_autoload_register('main_autoload');

