<?php

/**
 * The class handles the menu page/sidebar link.
 *
 * @since 1.0.0
 *
 * @package Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/admin
 * @author  Azeez Abiodun Solomon < iamhabbeboy@gmail.com>
 */
class Code_Snippet_Sidebar {

	/**
	 * Invoke and register the page link
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function add_menu_page() {
		add_menu_page(
			__( 'Code Snippet Editor', 'code-snippet-editor' ),
			__( 'Code Snippet Editor', 'code-snippet-editor' ),
			'manage_options',
			'code_snippet_editor',
			array( $this, 'render_template' ),
			'dashicons-building'
		);
	}
	/**
	 * Render menu page template
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function render_template() {
		require_once WPCS_PATH . 'admin/partials/code-snippet-admin-display-page.php';
	}

}
