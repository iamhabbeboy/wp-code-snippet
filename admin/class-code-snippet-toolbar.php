<?php
class Code_Snippet_Toolbar
{
    public function init()
    {
        $this->register_callback();
    }

    public function register_callback()
    {
        add_action( 'code_snippet_wp_helpers', array( $this, 'action_get_wp_functions_list' ) );
    }

    public function get_config()
    {
        $config = array(
            'get_posts' => "$posts = get_posts(1);\n\n var_dump($posts);",
            'action' => "add_action('sample_action', static function(){\n echo 'Silence is golden';\n});"
        );

        return $config;
    }

    public function action_get_wp_functions_list()
    {
        $config = $this->get_config();
        $html = '';
        foreach( $config as $code => $snippet ):
            $html .= '<label data-code="'.$snippet.'">' . $code . '</label>';
        endforeach;

        echo $html;
    }
}