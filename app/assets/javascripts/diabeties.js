/**
 * Created by srinianand on 13/09/17.
 */

function loadVisitsComboInDMDetailsTemplate(patientId) {
    // simpleComboLoad("/get_patient_visits/"+patientId+".json",$('#dm_patient_visits_select_id'),true);
    simpleComboLoad("/get_patient_dm_review_visit_dates/"+patientId+".json",$('#dm_patient_visits_select_id'),true);

    resetDMDetailVisitsCombo();
    resetDMDetailsNewVisitData();
    removeDMDetailsForPastPatient();
}

function resetDMDetailVisitsCombo() {
    $('#dm_patient_visits_select_id option').each(function (index,each_option) {
        each_option_val = $(each_option).val();
        if(each_option_val != "0" && each_option_val != "-1"){
            $(each_option).remove();
        }
    })

    // $('#dm_visit_calendar_icon').hide()
    $('#dm_details_visit').val("");
    // $('#visit_date').html("");
}

function resetDMDetailsNewVisitData() {
    $('#dm_details_for_patient_div_parent [id^="span_dm_details_"]').each(function (index,eachElement) {
        // console.log($(eachElement)[0]);
        $(eachElement).html("-");
    })
}

function removeDMDetailsForPastPatient() {
    $('#dm_details_for_patient_div [id^="visit_date_"]').each(function (index,eachElement) {
        // console.log($(eachElement));

        if((eachElement.id).indexOf("_0") == -1){
            $(eachElement).remove();
        }
    })

    $('#dm_details_for_patient_div [id^="history_visit_"]').each(function (index,eachElement) {
        if((eachElement.id).indexOf("_0") == -1){
            $(eachElement).remove();
        }
    })
}

function loadEditDMDetailsTemplate() {
    // Hide all the Input Elements
    $('#dm_details_for_patient_div_parent [id^="input_dm_details_"]').show();
    $('#dm_details_for_patient_div_parent [id^="span_dm_details_"]').hide();
}


function loadNonEditDMDetailsTemplate(patientDMAllDetails) {
    $('#dm_details_for_patient_div_parent [id^="input_dm_details_"]').hide();
    $('#dm_details_for_patient_div_parent [id^="span_dm_details_"]').show();

    patientDMDetails = patientDMAllDetails.examination;
    patientGeneralDetail = (patientDMAllDetails.general ? patientDMAllDetails.general.patient_ailment_details : null);

    if(patientGeneralDetail) {
        $('#span_dm_details_dm_number').html(patientGeneralDetail.dm_no);
        $('#input_dm_details_dm_number').val(patientGeneralDetail.dm_no);

        $('#span_dm_details_sssmh_care_from').html(patientGeneralDetail.sssmh_care_from);
        $('#input_dm_details_sssmh_care_from').val(patientGeneralDetail.sssmh_care_from);
    }

    if(patientDMDetails.length != 0){
        var visit_date_div_id = 1;
        var visit_date_div = $('#dm_date_row_div');

        $('#seperate_dm_details_div').empty();
        $('#main_floating_dates_parent').remove();
        var seperate_dm_details_div = $('#seperate_dm_details_div');
        // var seperate_dm_details_div_width = 100;
        var seperate_dm_details_div_width = 500;
        var extra_width = 0;

        // if(patientDMDetails.length > 2){
        //     extra_width = ( Math.ceil((patientDMDetails.length - 2) ) ) * 40;
        // }
        // console.log("extra_width : "+extra_width);

        for(var i=0;i< patientDMDetails.length-1;i++){
            extra_width = extra_width + 250;
        }
        // console.log(extra_width);

        var total_width = seperate_dm_details_div_width + extra_width;
        console.log(total_width);

        // $(seperate_dm_details_div).css("width",total_width+"%");
        $(seperate_dm_details_div).css("width",total_width+"px");

        // Block for the Floating Dates.
        $('#dm_details_for_patient_div_parent').append($('<div/>')
            .attr("id","main_floating_dates_parent")
            .attr("style","left:37%;top:31%;width:60%;overflow-x:auto;height:6vh;position:absolute;z-index:1;border:0px solid green;")
            // .attr("onscroll","div_on_scroll();")
            .append($('<div/>')
                .attr("id","main_floating_dates")
                .attr("style","height:6vh;border:0px solid red;width:"+total_width+"px")
            )
        )

        var main_floating_dates_div = $('#main_floating_dates');
        patientDMDetails.forEach(function (eachPatientDMDetail) {

            var parsed_visited_date = $.datepicker.parseDate("yy-mm-dd",eachPatientDMDetail.visited_on);
            var formatted_visit_date =  $.datepicker.formatDate('M d, yy', parsed_visited_date);

            var dmDetails = eachPatientDMDetail.examination_details;
            visit_date_div_id++;

            seperate_dm_details_div.append($('<div/>')
                .attr("id","dm_history_"+visit_date_div_id)
                .attr("align","center")
                .attr("style","margin-left:20px;padding-left:0px;margin-top:0px;float:left;width:180px;border:1px dotted green;height:auto;")
                .addClass("patient_visited_on_div")
            );

            $("#dm_history_"+visit_date_div_id).append(
                $('<div/>')
                    .attr("id","visit_date_"+visit_date_div_id)
                    .attr("style","height: 3.1vh;margin-top: 4px;margin-bottom: 13px;font-weight:bold;border-bottom: 1px dotted green;")
                    .attr("align","center")
                    // .append(
                    //     $('<span/>')
                    //         .text(formatted_visit_date)
                    // )
            );

            // Floating Date Block
                main_floating_dates_div.append($('<div/>')
                    .attr("id", "fl_dm_history_" + visit_date_div_id)
                    .attr("align", "center")
                    .attr("style", "margin-left:20px;padding-left:0px;margin-top:0px;float:left;width:180px;border:1px dotted green;height:auto;")
                    .addClass("patient_visited_on_div")
                );

                $("#fl_dm_history_" + visit_date_div_id).append(
                    $('<div/>')
                        .attr("id", "fl_visit_date" + visit_date_div_id)
                        .attr("style", "height: 3.1vh;margin-top: 4px;margin-bottom: 13px;font-weight:bold;border-bottom: 0px dotted green;background-color:yellow;")
                        .attr("align", "center")
                        .append(
                            $('<span/>')
                                .text(formatted_visit_date)
                        )
                );
            // END OF Floating Date Block

            $('#dm_details_div [id^="examination_header_"]').each(function (index,eachElement) {
                var eachElement_id = eachElement.id;
                var each_element_height = $(eachElement).height();

                var eachElement_code = eachElement_id.replace("examination_header_","");
                var eachElement_code_val = dmDetails[eachElement_code]
                var dmDetails_code_value = dmDetails[eachElement_code];
                var pointed_list_flag = 0;

                if(eachElement_code_val && isNaN(eachElement_code_val) && eachElement_code_val.match(/\d+\.\s+/)){
                    pointed_list_flag = 1;
                    dmDetails_code_value = format_list(dmDetails[eachElement_code]);
                }

                $("#dm_history_"+visit_date_div_id).append(
                    $('<div/>')
                        .attr("id","history_visit_"+visit_date_div_id+"_"+eachElement_code)
                        .attr("align","center")
                        .attr("style","margin-left:0px;padding-left:0px;width:180px;margin-top:0px;border-bottom:1px dotted green;height:"+each_element_height+"px;")
                        .addClass("patient_visited_on_div")
                )

                if(pointed_list_flag == 1){
                    $("#history_visit_"+visit_date_div_id+"_"+eachElement_code).append(
                        $('<div/>')
                            .attr("id","inside_history_visit_"+visit_date_div_id+"_"+eachElement_code)
                            .attr("style","margin-left: 0px;margin-left:5px;margin-top: 5px;" +
                                "border-right: 0px solid green;border: 0px dotted green;" +
                                "text-align:left;overflow:auto;height: 12vh;")
                    )
                }else{
                    $("#history_visit_"+visit_date_div_id+"_"+eachElement_code).append(
                        $('<div/>')
                            .attr("id","inside_history_visit_"+visit_date_div_id+"_"+eachElement_code)
                            .attr("style","margin-left: 0px;margin-top: 5px;border-right: 0px solid green;border: 0px dotted green;height: 3vh;")
                    )
                }

                $("#inside_history_visit_"+visit_date_div_id+"_"+eachElement_code).append(
                    $('<span/>')
                        .html(dmDetails_code_value)
                )

            })

        })

        // Process all Current Medicine for Listing

    }

}


function loadPatientDMDetails(selectedVisitOption) {
    var parsedSelectedVisitDate;

    if(selectedVisitOption == "0"){
        parsedSelectedVisitDate = "0";
    }else{
        parsedSelectedVisitDate = $.datepicker.parseDate("M dd, yy",selectedVisitOption)
    }

    $.ajax({
        url:'/get_all_patients_dm_details/'+$('#input_pgd_id').val()+'/'+parsedSelectedVisitDate+'.json',
        method:"GET",
        success:function (dmDetailsForPatient) {
            loadPatientDMDetailsData(dmDetailsForPatient)
        }
    })
}

function loadPatientDMDetailsData(dmDetailsForPatient) {
    var current_medicine = dmDetailsForPatient["current_medicine"];
    if(current_medicine.match(/\d+\.\s+/)){
        dmDetailsForPatient["current_medicine"] = format_list(current_medicine)
    }

    populateInputsAndSpans(dmDetailsForPatient,'input_dm_details_','span_dm_details_',false,'');
}

function showDatePickerDiabetes(){
    // console.log("sddsdsd sds d");
    $('#dm_datepicker').datepicker("show");
}

function div_on_scroll() {
    // console.log("In the div_on_scroll Function ... :) ");
    var target = $('#main_floating_dates_parent');
    var source = $('#seperate_dm_details_div_block');
    target.scrollTop(source.scrollTop());
    target.scrollLeft(source.scrollLeft());
}

