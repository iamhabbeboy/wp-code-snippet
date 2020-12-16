<?php


class Code_Snippet_Sidebar
{
    // public function init(): void
    // {
    //     $this->registerCallback();
    // }

    // public function registerCallback(): void
    // {
    //     $loader = new Plugin_Name_Loader();
    //     $loader->add_action( 'admin_menu', $this, 'add_Menu_Page' );
    // }

    /**
     * Register a custom menu page.
     */
    public function add_Menu_Page(): void
    {
        add_menu_page(
            __( 'Code Snippet', 'code-snippet' ),
            __( 'Code Snippet', 'code-snippet' ),
            'manage_options',
            'instant_snippet',
            array( $this, 'render_Template' ),
            'dashicons-building'
        );
    }

    public function render_Template(): void
    {
        include WPCS_PATH . 'admin/partials/code-snippet-admin-display-page.php';
    }

}
