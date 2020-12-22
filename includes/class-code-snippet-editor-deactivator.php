<?php
/**
 * Fired during plugin deactivation
 *
 * @since      1.0.0
 * @package Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/admin
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 */
class Code_Snippet_Editor_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
		( new self() )->delete_dir();
		( new self() )->delete_db_data();
	}

	/**
	 * Delete directory and all files
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function delete_dir() {
		$directory_path = ! defined( 'CODE_SNIPPET_DIR' )
		? ABSPATH . '/wp-code-snippet'
		: CODE_SNIPPET_DIR;
		$files          = glob( $directory_path . '/*' );
		foreach ( $files as $file ) {
			if ( is_file( $file ) ) {
				unlink( $file );
			}
		}

		if ( file_exists( $directory_path ) ) {
			rmdir( $directory_path );
		}
	}
	/**
	 * Delete update_option data
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function delete_db_data() {
		delete_option( Code_Snippet_Ajax::FILE_INDEX_KEY );
	}

}
