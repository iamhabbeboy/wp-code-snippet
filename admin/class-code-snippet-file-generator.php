<?php

/**
 * Class Code_Snippet_File_Generator
 */
class Code_Snippet_File_Generator
{
    /**
     * @param string $code
     * 
     * @param string $file_name
     * 
     * @return string
     */
    public function create( string $code, string $file_name = '' ): string
    {   
        $dir = !defined( 'CODE_SNIPPET_DIR' ) ? ABSPATH . '/wp-code-snippet' : CODE_SNIPPET_DIR;
        if( ! file_exists( $dir ) ) {
            mkdir( $dir );
        }

        $file_name = empty( $file_name ) ? 'sample.php' : $file_name;

        $path = $dir . '/' . $file_name . '.php';
        $fopen = fopen( $path, 'wb') or die('Unable to open file');
        fwrite( $fopen, $code );
        fclose( $fopen );

        return $path;
    }

    public function recreate()
    {

    }

    public function delete()
    {

    }


}