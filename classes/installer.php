<?php

class installer {
	public $abs_path = null;

/*


		<script src="/vue/componentsMixin.js?v<?=VERSION?>"></script>

		<!-- Assembled scripts -->
		<!--/ assembled scripts -->
		
		<!-- Assembled pages -->
		<!--/ assembled pages -->

		<!-- Assembled components -->
		<!--/ assembled components -->

		<script src="/vue/store/store-sys-account.js?v=<?=VERSION?>"></script>
		<script src="/vue/store/store-sys-page.js?v=<?=VERSION?>"></script>
		  
		<!-- Assembled stores -->
		<!--/ assembled stores -->		
*/


	function after() {
		
		
		$scripts = [ '/vue/componentsMixin.js', '/vue/store/store-sys-account.js', '/vue/store/store-sys-page.js'	];
		
		$block = "";
		
		foreach ( glob( $this->abs_path . "vue/components/*.js") as $fn ) if( !in_array( '/vue/components/'. basename($fn), $scripts )) $scripts[] = '/vue/components/'. basename($fn);				
		foreach ( glob( $this->abs_path . "vue/pages/*.js") as $fn ) if( !in_array( '/vue/pages/'. basename($fn), $scripts )) $scripts[] = '/vue/pages/'. basename($fn);		
		foreach ( glob( $this->abs_path . "vue/store/*.js") as $fn ) if( !in_array( '/vue/store/'. basename($fn), $scripts )) $scripts[] = '/vue/store/'. basename($fn);		
		


		$ver = '?v=' . time();
		echo "\t\t<!-- Vue pages and components -->\n";
		foreach ( $scripts as $src ) {
			echo "\t\t<script src='{$src}{$ver}'></script>\n";
		};
		echo "\t\t<!--/ vue pages and components -->\n";
		

	}








	function pregReplaceHTMLBlock( string $block_name, string $replace, string $content ) {
		$key = preg_replace("#\s+#", '\s+', preg_quote( trim($block_name) ));
		if ( !preg_match($query = '#(\t+)\<\!\-\- \s+ '. $key .' \s+ \-\-\> (.+?)	\<\!\-\-\/ \s+ '. $key .' \s+ \-\->#suix', $content, $sub)) trigger_error( "Отсутсвует блок - \"{$block_name}\"", E_USER_ERROR );
		
		$indent = $sub[1];
		
		// Добавляем отступы к блоку
		$rplc = "";
		foreach (explode("\n", trim( $replace )) as $line) $rplc .= $indent . trim($line) . "\n";
	
		$content = preg_replace(
			'#\t+\<\!\-\- \s+ '. $key .' \s+ \-\-\> (.+?)	\<\!\-\-\/ \s+ '. $key .' \s+ \-\->#suix', 
			"{$indent}<!-- ". ucfirst($block_name) ." -->\n{$rplc}{$indent}<!--/ {$block_name} -->\n", $content );
		return $content;
	}

	function pregReplaceJSBlock( string $block_name, string $replace, string $content ) {
		$key = preg_replace("#\s+#", '\s+', preg_quote( trim($block_name) ));
		if ( !preg_match($query = '#// \s+ '. $key .' \s+ start (.+?)	// \s+ '. $key .' \s+ end#suix', $content, $sub)) trigger_error( "Отсутсвует блок - \"{$block_name}\"", E_USER_ERROR );
	
		$content = preg_replace(
			'#// \s+ '. $key .' \s+ start (.+?)	// \s+ '. $key .' \s+ end#suix', 
			"// {$block_name} start\n{$replace}\n// {$block_name} end", $content );
		return $content;
	}



	function __construct() {
		$self_fn = str_ireplace('\\','/',__FILE__);
		$this->abs_path = str_ireplace( "classes/".basename($self_fn ), "", $self_fn );
	}
}