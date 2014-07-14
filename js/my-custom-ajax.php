<?php

/** Load WordPress Bootstrap */
require_once( dirname( dirname( __FILE__ ) ) . '/../../../wp-load.php' );

// Require an action parameter
if ( empty( $_REQUEST['action'] ) )
	die( '0' );

if(isset($_REQUEST['action']) && $_REQUEST['action'] == "GetDetail"){
	$pro_item_post = get_post($_REQUEST['post_id']);
	$field_price = get_post_meta($pro_item_post->ID, "price", true);

	$return_object = array();
	$return_object["price"] = $field_price;
	$return_object["content"] = $pro_item_post->post_content;

	echo json_encode($return_object);
}

?>