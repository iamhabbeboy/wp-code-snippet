<?php
/**
 * Fired during plugin activation
 * 
 * @since      1.0.0
 * @package Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 */
class Code_Snippet_Editor_Activator {

	/**
	 * Handles event triggers when plugin is activated.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		$file_generator = new Code_Snippet_File_Generator();
		$path           = $file_generator->create_dir();
		$file_generator->create_sample_file( $path );
	}

}
