<?php

/**
 * Handles the xhr actions/events
 *
 * @since 1.0.0
 *
 * @package Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/admin
 * @author  Azeez Abiodun Solomon < iamhabbeboy@gmail.com>
 */
class Code_Snippet_Ajax {

    const FILE_INDEX_KEY = 'code_snippet_last_file_created';
    /**
     * Class Action Loader
     *
     * @since 1.0.0
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
    private function register_callback() {
        /**
		 * This function is provided to handle all the hooks.
		 *
		 * This method should be passed to the init() so as to be called 
         * directly.
		 */
        add_action( 'wp_ajax_code_snippet_execution', array( 
            $this, 'action_execute_snippet' 
        ) );

        add_action( 'wp_ajax_code_open_existing_file', array( 
            $this, 'action_open_single_file' 
        ) );

        add_action( 'wp_ajax_code_snippet_delete_file', array( 
            $this, 'code_snippet_delete_file' 
        ) );

        add_action( 'wp_ajax_code_snippet_run_time', array( 
            $this, 'code_snippet_run_time' 
        ) );
    }
    /**
     * Handles the script execution on preview via xhr
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function action_execute_snippet() {
        if( empty( $_REQUEST['code'] ) ) {
            echo 'empty code is not valid.';
        }

        $code = str_replace( '\\', '', $_REQUEST['code'] );
        $filename = $_REQUEST['filename'];
        $file = new Code_Snippet_File_Generator();
        $filename = $file->create( $code, $filename );
        $fileIndex = (int) $_REQUEST['tab'];
        ( new Code_Snippet_Model() )->create( self::FILE_INDEX_KEY, $fileIndex );
        
       require_once empty( $filename ) ? 'sample-file.php' : $filename;
       exit;
    }
    /**
     * This function handles the openining single file logic
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function action_open_single_file() {
        if( empty( $_REQUEST['filename'] ) ) {
            echo "invalid filename passed";
        }

        $filename = $_REQUEST['filename'];
        $dir = !defined( 'CODE_SNIPPET_DIR' ) 
        ? ABSPATH . '/wp-code-snippet' 
        : CODE_SNIPPET_DIR;
        $path = $dir . '/' . $filename;
        if( ! file_exists( $path ) ) {
            echo "error occured";
        }

        echo file_get_contents( $path );
        exit;
    }

    public function code_snippet_delete_file() {
        if( empty( $_REQUEST['filename'])) {
            echo "invalid filename passed";
        }

        $filename = $_REQUEST['filename'];
        $dir = !defined( 'CODE_SNIPPET_DIR' ) ? ABSPATH . '/wp-code-snippet' : CODE_SNIPPET_DIR;
        $path = $dir . '/' . $filename;
        if( ! file_exists( $path ) ) {
            echo "error occured";
        }
        unlink( $path );
        echo "deleted";
        exit;
    }
    /**
     * Undocumented function
     *
     * @return void
     */
    public function code_snippet_run_time()
    {
        if( empty( $_REQUEST['filename'])) {
            echo "invalid filename passed";
        }

        $filename = $_REQUEST['filename'];
        $dir = !defined( 'CODE_SNIPPET_DIR' ) ? ABSPATH . '/wp-code-snippet' : CODE_SNIPPET_DIR;
        $path = $dir . '/' . $filename . '.php';
        if( ! file_exists( $path ) ) {
            echo "error occured";
        }
        $start = microtime(TRUE);
        require_once $path;
        $end = microtime(TRUE) - $start;
        echo "\ncode_snippet_time:". $end;
        exit;
    }

    private function showError()
    {
        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            define( 'WP_DEBUG', false );
        } else {
            define( 'WP_DEBUG', true );
        }
    }
}