<?php
/**
 * Undocumented class
 *
 * Description
 *
 * @link Undocumented class
 * @since Undocumented class
 *
 * @package Undocumented class
 * @subpackage Undocumented class
 * @author  Azeez Abiodun Solomon < iamhabbeboy@gmail.com>
 */
class Code_Snippet_History {
	/**
	 * Undocumented function
	 *
	 * @since Undocumented function
	 *
	 * @return void
	 */
	public function init() {
		$this->register_callback();
	}
	/**
	 * Register all hooks
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_callback() {
		add_action( 'get_history', array( $this, 'get_open_files' ) );
	}
	/**
	 * Undocumented function
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function get_open_files() {
		$dir = ! defined( 'CODE_SNIPPET_DIR' )
		? ABSPATH . '/wp-code-snippet'
		: CODE_SNIPPET_DIR;

		if ( ! is_dir( $dir ) ) {
			echo 'No file available.';
		} else {

			if ( $handle = opendir( $dir ) ) {
				$key = 0;
				while ( false !== ( $entry = readdir( $handle ) ) ) {
					if ( '.' !== $entry && '..' !== $entry ) {
						require 'partials/single-file.php';
						$key++;
					}
				}
				closedir( $handle );
			}
		}
	}
}
