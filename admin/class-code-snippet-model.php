<?php

class Code_Snippet_Model
{
    public function create( string $key, $payload ) : void
    {
        if( empty( $key ) ) {
            return;
        }
        $data = $payload;
        if( is_array( $payload ) ) {
            $data = serialize( $payload );
        }

        update_option( $key, $data ); 
    }
}
