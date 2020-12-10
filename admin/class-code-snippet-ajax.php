<?php

/**
 * Class Ajax
 *
 * @package InstantSnippet\Helpers
 */
class Code_Snippet_Ajax
{
    public function init() : void
    {
        $this->register_callback();
    }

    private function register_callback() : void
    {
        // $this->showError();
        add_action( 'wp_ajax_code_snippet_execution', array( $this, 'action_execute_snippet' ) );
        add_action( 'wp_ajax_code_open_existing_file', array( $this, 'action_open_single_file' ) );
        add_action( 'wp_ajax_code_snippet_delete_file', array( $this, 'code_snippet_delete_file' ) );
        add_action( 'wp_ajax_code_snippet_run_time', array( $this, 'code_snippet_run_time' ) );
    }

    public function action_execute_snippet() : void
    {
        if(empty( $_REQUEST['code'])) {
            return;
        }

        $code = str_replace( '\\', '', $_REQUEST['code'] );
        $filename = $_REQUEST['filename'];
        $file = new Code_Snippet_File_Generator();
        $filename = $file->create( $code, $filename );
        $fileIndex = $_REQUEST['tab'];
        ( new Code_Snippet_Model() )->create('code_snippet_last_file_created', $fileIndex);
        
       require_once empty( $filename ) ? 'sample-file.php' : $filename;
       exit;
    }

    public function action_open_single_file() : void
    {
        if( empty( $_REQUEST['filename'])) {
            echo "invalid filename passed";
        }

        $filename = $_REQUEST['filename'];
        $dir = !defined( 'CODE_SNIPPET_DIR' ) ? ABSPATH . '/wp-code-snippet' : CODE_SNIPPET_DIR;
        $path = $dir . '/' . $filename;
        if( ! file_exists( $path ) ) {
            echo "error occured";
        }

        echo file_get_contents( $path );
        exit;
    }

    public function code_snippet_delete_file()
    {
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