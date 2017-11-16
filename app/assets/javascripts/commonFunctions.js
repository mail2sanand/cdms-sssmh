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


















