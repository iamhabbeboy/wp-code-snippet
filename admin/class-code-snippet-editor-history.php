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
class Code_Snippet_History
{
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

    public function register_callback() : void
    {
        add_action( 'get_history', array( $this, 'get_open_files' ) );
    }

    public function get_open_files() : void
    {
        $dir = !defined( 'CODE_SNIPPET_DIR' ) ? ABSPATH . '/wp-code-snippet' : CODE_SNIPPET_DIR;
        if( is_dir( $dir ) ) {
            if ( $handle = opendir( $dir ) ) {
                $key = 0;
                while ( false !== ($entry = readdir( $handle ) ) ) {
                    if ($entry != "." && $entry != "..") {
                        require 'partials/single-file.php';
                        $key++;
                    }
                }
                closedir($handle);
            }
        } else {
            echo "No file available.";
        }
    }
}