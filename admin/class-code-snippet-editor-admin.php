<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/admin
 * @author     Your Name <email@example.com>
 */
class Code_Snippet_Editor_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		$menu_page         = new Code_Snippet_Sidebar();
		// Add menu bar link to sidebar.
		add_action( 'admin_menu', array( $menu_page, 'add_menu_page' ) );
		( new Code_Snippet_Ajax() )->init();
		( new Code_Snippet_History() )->init();
		( new Code_Snippet_Toolbar() )->init();
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'dist/css/code-snippet-editor-admin.min.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 */

		wp_enqueue_script( 'lib', plugin_dir_url( __FILE__ ) . 'js/lib/ace/ace.js', array(), $this->version, true );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'dist/js/code-snippet-editor-admin.min.js', array( 'jquery' ), $this->version, true );

	}

}
