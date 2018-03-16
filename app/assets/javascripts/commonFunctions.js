
function delete_custom_icons_display() {
    $('#custom_icons_display').remove();
    $('#custom_icons_for_print').remove();
}

function display_custom_icons_menu(object_of_insertion,obj,point_of_insertion) {
    $('#custom_icons_display').remove();

    $(object_of_insertion[0]).prepend($('<div/>')
        .attr("id","custom_icons_display")
        .attr("align","center")
        .attr("style","position:absolute;background-color:#e9ecf3;height:3vh;width:200px;border:1px solid grey;margin:20px 0 0 40px;text-align:left;")
        .html("" +
            "<span style='cursor:pointer;' id='custom_icons_uarr'>&uarr;</span> | " +
            "<span style='cursor:pointer;' id='custom_icons_darr'>&darr;</span> | " +
            "")
    );

    $('#custom_icons_display [id^="custom_icons_"]').on('click',function (e) {
        var obj_val = $(obj).val();

        var selected_icon_id = this.id;
        var text_to_insert = "&"+selected_icon_id.split("custom_icons_")[1]+";";
        var modified_text = [obj_val.slice(0, point_of_insertion), text_to_insert, obj_val.slice(point_of_insertion)].join('');
        $(obj).val(modified_text);
        delete_custom_icons_display();
    })

}

function displayFloatingPopup(relativeElement) {
}



function insert_html(insert_text,obj,point_of_insertion) {
    var obj_val = $(obj).val();
    $(obj).val("sdsdsds");
}

function simpleComboLoad(urlToLoadCombo,comboElementToLoad,nameAsNameInOption,callbackFunctions){
    $.ajax({
        type:"GET",
        url:urlToLoadCombo,
        success:function(comboResultArray){
            $.each(comboResultArray,function(index,eachComboElement){
                // console.log(eachComboElement.name,eachComboElement.id);
                if(nameAsNameInOption){
                    comboElementToLoad.append(new Option(eachComboElement.name,eachComboElement.name))
                }else{
                    comboElementToLoad.append(new Option(eachComboElement.name,eachComboElement.id))
                }
            });

            $.each(callbackFunctions,function (index,eachcallbackFunction) {
                if (typeof eachcallbackFunction === "function") {
                    // console.log(eachcallbackFunction);
                    eachcallbackFunction.apply(this,comboResultArray);
                }
            })
        }
    });
}

var addTab = function (tabs, tabId, tabLabel, tabTemplate) {
    var ailment_tab_id = "ailment_tab_id_"+tabLabel+"_tabId_"+tabId;
    var delete_ailment_id = "delete_ailment_id_"+tabLabel+"_tabId_"+tabId;
    var header = "<li><a id='"+ailment_tab_id+"' href='#" + tabLabel + "_template'>" + tabLabel + "&nbsp;&nbsp;<i class='fa fa-remove' style='cursor:pointer;' title='Delete Ailment - "+tabLabel+"' id='"+delete_ailment_id+"' onclick='removeTab("+ailment_tab_id+","+tabs[0].id+","+tabId+");'></i> </a> </li>";
    tabs.find(".ui-tabs-nav").append(header);
    // tabs.append("<div id='" + tabId + "'><p>" + tabContentHtml + "</p></div>");
    tabs.tabs("refresh");

    if(tabTemplate) {
        $("#patient_detail_main").append(
            $('<div/>')
                .attr("id", tabLabel + "_template")
                .attr("align", "center")
                .attr("style","margin-left:0px;padding-left:0px;margin-top:0px;border:1px dotted green;height:56vh;overflow-y:scroll;")
        )
    }
    // $('<span/>')
    //     .text("This is the Diabities Template")
};

function removeTab(ailment_tab_id,tabs_id,tabId) {
    // console.log(ailment_tab_id);
    $(ailment_tab_id).closest( "li" ).remove();
    // $( "#" + panelId ).remove();
}

function addCheckbox(addToElementId,checkboxId) {
    var addToElement = $('#'+addToElementId);
    addToElement.append('<input type="checkbox" id="' + checkboxId + '"name="' + checkboxId + '" >')
}

function calculate_year(element) {
    var element_value = element.value;
    if(element_value.indexOf("-") != -1){
        element_value = new Date(element_value).getFullYear();
    }
    var d = new Date();
    var n = d.getFullYear();
    return n-element_value;
}

function calculate_and_select_year(element,replace,datepicker) {
    var default_replace = "__years_select";

    var year_to_be_selected = calculate_year(element);
    if(datepicker){
        year_to_be_selected = year_to_be_selected+'-01-01';
    }

    if(replace){
        $('#'+replace).val(year_to_be_selected);
    }else{
        $('#'+(element.id.split('__')[0]) + default_replace).val(year_to_be_selected);
    }
}

function calculate_and_display_year(element,replace) {
    var default_replace = "__suffering_since_years";

    var year_to_be_selected = calculate_year(element);
    // $('#'+(element.id.split('__')[0])+"__suffering_since_years").val(year_to_be_selected);

    if(replace){
        $('#'+replace).val(year_to_be_selected);
    }else{
        $('#'+(element.id.split('__')[0]) + default_replace).val(year_to_be_selected);
    }

    // $('#'+(element.id.split('__')[0])+replace).val(year_to_be_selected);
}

function format_list(text_to_be_formatted) {
    var text_to_be_formatted_array = text_to_be_formatted.split(/\d+\.\s+/);

    var i=1;
    var new_formatted_text = "";
    text_to_be_formatted_array.forEach(function (each_array) {
        if(each_array == "") {
            return;
        }
        new_formatted_text = new_formatted_text + "<br>" + i + ". " + each_array;
        i++;
    })

    var new_2_formatted_text = new_formatted_text.replace("<br>","");

    return new_2_formatted_text;
}

















