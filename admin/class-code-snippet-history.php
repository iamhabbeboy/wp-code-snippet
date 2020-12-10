<?php

class Code_Snippet_History
{
    public function init() : void
    {
       $this->register_callback();
    }

    public function register_callback() : void
    {
        add_action( 'get_history', array( $this, 'get_open_files' ) );
    }

    public function get_open_files() : void
    {
        $dir = !defined( 'CODE_SNIPPET_DIR' ) ? ABSPATH . '/wp-code-snippet' : CODE_SNIPPET_DIR;
        if ($handle = opendir($dir)) {
            $key = 0;
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    require 'partials/single-file.php';
                    $key++;
                }
            }
          
            closedir($handle);
        }
    }
}