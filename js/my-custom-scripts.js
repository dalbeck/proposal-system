////////////////////////////
// Scripts to pull data - Replace fields to match your setup
//////////////////////////

var timeout;
var total_cost = 0;
var editor_index = 2;

function timeout_trigger() {

	jQuery("#acf-project_items div.values.ui-sortable table.widefat.acf_input tr").each(function(){
		if(jQuery(this).attr("data-field_name") == "choose_project_item"){
			if(jQuery(this).find("select.post_object").attr("onchange") == null){
				jQuery(this).find("select.post_object").attr("onchange", "getDetailItem(this)");
				jQuery(this).find("select.post_object").attr("editor_index", editor_index);
				editor_index = editor_index + 1;
			}
		}
		if(jQuery(this).attr("data-field_name") == "item_cost"){
			if(jQuery(this).find("input").attr("oninput") == null){
				jQuery(this).find("input").attr("oninput", "updatePrice(this)");
			}
		}
	});

	//clearTimeout(timeout);
	timeout = setTimeout('timeout_trigger()', 2000);
}

function getDetailItem(object)
{
	jQuery.post( window.location.origin + "/wp-content/themes/THEMEFOLDERHERE/js/my-custom-ajax.php", { action: "GetDetail", post_id: jQuery(object).val() }, function(data){
		var obj = jQuery.parseJSON(data);

		jQuery(object).parent('div').parent('td').parent('tr').parent('tbody').find('tr').each(function(){
			if(jQuery(this).attr("data-field_name") == "item_cost"){
				var price = obj.price;
				price = price.replace('$', '');

				total_cost = total_cost + parseInt(price);

				jQuery(this).find("input").val("$"+price);
			}
		});

		jQuery(object).parent('div').parent('td').parent('tr').parent('tbody').find('tr').each(function(){
			if(jQuery(this).attr("data-field_name") == "edit_proposal_item"){
				var editors = tinyMCE.editors;
				var index_of_editor = jQuery(object).attr("editor_index");
				editors[index_of_editor].setContent(obj.content);
			}
		});

		jQuery("div#acf-total_cost input#acf-field-total_cost").val("$"+total_cost);
	});
}

function updatePrice(object) {
	var total_price = 0;
	jQuery("#acf-project_items div.values.ui-sortable table.widefat.acf_input tr").each(function(){
		if(jQuery(this).attr("data-field_name") == "item_cost"){
			var new_price = jQuery(this).find("input").val();
			new_price = new_price.replace('$', '');
			total_price = total_price + parseInt(new_price);
		}
	});

	jQuery("div#acf-total_cost input#acf-field-total_cost").val("$"+total_price);
	total_cost = total_price;
}


jQuery(document).ready(function(){

	timeout = setTimeout('timeout_trigger()', 5000);

});