function add_new_comorbid_condition(comorbid_condition_selected,div_to_add_this) {
    var selected_comorbid_condition = comorbid_condition_selected.selectedOptions[0];
    var selected_comorbid_text_id = "selected_comorbid_text_id_"+comorbid_condition_selected.value;

    var selected_comorbid_text_id_div = selected_comorbid_text_id+"_div";
    var new_co_morbid_condition_div = "<div style='border-bottom:1px dotted green;height:4vh;' id='"+selected_comorbid_text_id_div+"'>";
    new_co_morbid_condition_div += "<div style='margin-top:5px;float:left;width:30%;height:3vh;'>"+selected_comorbid_condition.label+"</div><div style='margin-left:30px;margin-top:5px;float:left;width:60%;height:3vh;'>";
    new_co_morbid_condition_div += '<span><input id="'+selected_comorbid_text_id+'" type="text" name="mytext[]" size="30"/></span>';
    new_co_morbid_condition_div += '<img class="x-remove-icon"> <span class="x-remove-icon-text" onclick="remove_co_morbid_condition('+selected_comorbid_text_id_div+')">&nbsp;</span>';
    new_co_morbid_condition_div += "</div></div>";
    div_to_add_this.append(new_co_morbid_condition_div);
}

function remove_co_morbid_condition(selected_comorbid_text_id_div) {
    $(selected_comorbid_text_id_div).remove();
}