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

        $('#dm_visit_calendar_icon').hide()
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
            var seperate_dm_details_div = $('#seperate_dm_details_div');
            var seperate_dm_details_div_width = 100;
            var extra_width = 0;

            if(patientDMDetails.length > 3){
                extra_width = ( Math.ceil((patientDMDetails.length - 3) ) ) * 40;
            }

            var total_width = seperate_dm_details_div_width + extra_width;

            $(seperate_dm_details_div).css("width",total_width+"%");

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
                        .attr("style","height: 2.5vh;margin-top: 4px;margin-bottom: 13px;font-weight:bold;border-bottom: 1px dotted green;")
                        .attr("align","center")
                        .append(
                            $('<span/>')
                                .text(formatted_visit_date)
                        )
                );

                $.each(dmDetails,function(key){
                    var code = key;
                    var code_value = dmDetails[key];
                    console.log("code: "+code);
                    console.log("code_value: "+code_value);

                    var code_height = $('#examination_header_'+code).height();

                    // .attr("style","margin-left:0px;padding-left:0px;width:180px;margin-top:0px;border-bottom:1px dotted green;height:4.5vh;")
                    // $('#no_examination_detail_'+code).hide();
                    // $('#examination_header_'+code).append(
                    $("#dm_history_"+visit_date_div_id).append(
                        $('<div/>')
                            .attr("id","history_visit_"+visit_date_div_id+"_"+code)
                            .attr("align","center")
                            .attr("style","margin-left:0px;padding-left:0px;width:180px;margin-top:0px;border-bottom:1px dotted green;height:"+code_height+"px;")
                            .addClass("patient_visited_on_div")
                            .append(
                                $('<div/>')
                                    .attr("id","inside_history_visit_"+visit_date_div_id+"_"+code)
                                    // .attr("align","center")
                                    .attr("style","margin-left: 0px;margin-top: 5px;border-right: 0px solid green;border: 0px dotted green;height: 3vh;")
                                    .append(
                                        // $('<span/>')
                                        //     .text(code_value)
                                        $('<span/>')
                                            .html(code_value)
                                    )
                            )
                    )

                })

            })

            // Process all Current Medicine for Listing


        }

    }

    function loadPatientDMDetails(selectedVisitOption) {
        var parsedSelectedVisitDate = $.datepicker.parseDate("M dd, yy",selectedVisitOption)

        $.ajax({
            url:'/get_all_patients_dm_details/'+$('#input_pgd_id').val()+'/'+parsedSelectedVisitDate+'.json',
            method:"GET",
            success:function (dmDetailsForPatient) {
                loadPatientDMDetailsData(dmDetailsForPatient)
            }
        })
    }

    function loadPatientDMDetailsData(dmDetailsForPatient) {
        populateInputsAndSpans(dmDetailsForPatient,'input_dm_details_','span_dm_details_',false,'');
    }
