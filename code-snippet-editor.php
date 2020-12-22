<?php
/**
 * The plugin bootstrap file
 *
 * @since             1.0.0
 * @package           Code_Snippet_Editor
 *
 * @wordpress-plugin
 * Plugin Name:       Code Snippet Editor
 * Description:       Improving project workflow has been our priority as the plugin provides developers with web editor and various WP helper snippet available for copy, also fast live coding and preview 😉.
 * Version:           1.0.0
 * Author:            Azeez Solomon
 * Author URI:        http://abiodunazeez.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       code-snippet-editor
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CODE_SNIPPET_EDITOR', '1.0.0' );

// WPINS stands for WP Instant Snippet Plugin.
define( 'WPCS_URL', plugin_dir_url( __FILE__ ) );
define( 'WPCS_PATH', plugin_dir_path( __FILE__ ) );
define( 'WPCS_BASENAME', plugin_basename( __FILE__ ) );

define( 'CODE_SNIPPET_DIR', ABSPATH . 'wp-code-snippet' );

/**
 * The code that runs during plugin activation.
 */
function activate_code_snippet_editor() {
	require_once WPCS_PATH . 'includes/class-code-snippet-editor-activator.php';
	Code_Snippet_Editor_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_code_snippet_editor() {
	require_once WPCS_PATH . 'includes/class-code-snippet-editor-deactivator.php';
	Code_Snippet_Editor_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_code_snippet_editor' );
register_deactivation_hook( __FILE__, 'deactivate_code_snippet_editor' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require WPCS_PATH . 'includes/class-code-snippet-editor.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_code_snippet_editor() {
	$plugin = new Code_Snippet_Editor();
}
run_code_snippet_editor();
