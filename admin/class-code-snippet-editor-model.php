<?php
/**
 * The Class interface with WordPress option
 * to store values.
 *
 * @since 1.0.0
 *
 * @package Code_Snippet_Editor
 * @subpackage Code_Snippet_Editor/admin
 * @author  Azeez Abiodun Solomon < iamhabbeboy@gmail.com>
 */
class Code_Snippet_Model {
	/**
	 * Undocumented function
	 *
	 * @since 1.0.0
	 * @param string $key option key.
	 * @param mixed  $payload option value.
	 *
	 * @return void
	 */
	public function create( $key, $payload ) {
		if ( empty( $key ) ) {
			return;
		}
		update_option( $key, $payload );
	}
}
