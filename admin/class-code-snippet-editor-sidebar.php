<?php


class Code_Snippet_Sidebar {

    /**
     * Register a custom menu page.
     */
    public function add_menu_page() {
        add_menu_page(
            __( 'Code Snippet Editor', 'code-snippet' ),
            __( 'Code Snippet Editor', 'code-snippets' ),
            'manage_options',
            'instant_snippet',
            array( $this, 'render_template' ),
            'dashicons-building'
        );
    }

    public function render_template() {
        require_once WPCS_PATH . 'admin/partials/code-snippet-admin-display-page.php';
    }

}
