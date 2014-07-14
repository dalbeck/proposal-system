// Loading Proposal from Proposal Post Type
add_action('admin_init','load_my_script');
function load_my_script() {
  global $pagenow, $typenow;
  if (is_admin()) {
    if ($pagenow=='post-new.php' OR $pagenow=='post.php') {
      $ss_url = get_bloginfo('template_url');
      wp_enqueue_script('jquery');
      wp_enqueue_script('my-custom-script',"{$ss_url}/js/my-custom-script.js",array('jquery'));
    }
  }
}