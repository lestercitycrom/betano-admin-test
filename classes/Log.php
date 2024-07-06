<?php

class Log {






    public function send() {
        
		$args = func_get_args();
		$code = trim( array_shift( $args ) );
		$args_count = count( $args );
		
		$tmpl = iDB::row( $query = "SELECT * FROM log_templates WHERE code=". iS::sq($code) ." AND args_count={$args_count}" );
		if ( is_null( $tmpl ) ) $tmpl = iDB::row( $query = "SELECT * FROM log_templates WHERE code=". iS::sq($code) );

		if ( !is_null( $tmpl ) ) {
			$format = is_null( $tmpl->format ) ? $code : $tmpl->format;
			$msg = vsprintf( $format, $args );
			
			if ( $tmpl->console ) $this->console( $msg );
			$row_log = [ "title" => $msg, "space" => $tmpl->space, "type" => $tmpl->type ];				
		} else {
			if ( $tmpl->console ) $this->console( $code );
			$row_log = [ "title" => $code ];
		};

		if ( isset( $args[0] ) ) $row_log["arg1"] = $args[0];	
		if ( isset( $args[1] ) ) $row_log["arg2"] = $args[1];
		if ( isset( $args[2] ) ) $row_log["arg3"] = $args[2];
		if ( isset( $args[3] ) ) $row_log["arg4"] = $args[3];
		if ( isset( $args[4] ) ) $row_log["arg5"] = $args[4];
		
		iDB::insertSQL( "sys_logs", $row_log );
		
	
		return false;
    }
	
	
	public function console( $msg ) {
		echo "> {$msg}\n";
		
	}






	// $this->log( "test lead added", json_encode($data_lead, JSON_UNESCAPED_UNICODE) );




	function __construct() {
	
	
	
	}



}