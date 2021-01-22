<?php

/**
 * Class Code_Snippet_File_Generator
 */
class Code_Snippet_File_Generator {
	/**
	 * Create directory if not exist
	 * Create file to store code
	 *
	 * @since 1.0.0
	 * @param string $code  written code.
	 * @param string $file_name store user's code.
	 *
	 * @return string
	 */
	public function create( string $code, string $filename = '' ) {
		$directory_path = $this->create_dir();
		$filename      = empty( $filename ) ? 'sample' : $filename;
		$path           = $directory_path . '/' . $filename . '.php';
		
		$response = file_put_contents($path, $code);// || die('Error occured');

		return $path;
	}

	/**
	 * Auto-create the directory for files.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function create_dir() {
		$permission     = 0777;
		$directory_path = ! defined( 'CODE_SNIPPET_DIR' )
		? ABSPATH . 'wp-code-snippet'
		: CODE_SNIPPET_DIR;
	
		if ( ! file_exists( $directory_path ) ) {
			mkdir( $directory_path );
			// @chmod( $directory_path, $permission );
		}

		return $directory_path;
	}
	/**
	 * Auto create a sample file in directory
	 *
	 * @since 1.0.0
	 * @param string $directory_path Get the directory path.
	 * @return void
	 */
	public function create_sample_file( $directory_path ) {
		if ( empty( $directory_path ) ) {
			$directory_path = CODE_SNIPPET_DIR;
		}
		$file_name = 'sample.php';
		$code      = "<?php \n\n//Silence is golden";
		$file_path = $directory_path . '/' . $file_name;
		if ( ! empty( $path ) ) {
			return;
		}
		file_put_contents( $file_path, $code ) || die( 'Unable to write to file' );
		// chmod( $file_path, 0777 );
	}
}
