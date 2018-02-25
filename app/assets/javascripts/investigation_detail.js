

    function loadEditInvestigationDetailsTemplate() {
        // Hide all the Input Elements
        $('#patient_gen_details_main_div [id^="input_investigation_details_"]').show();
        $('#patient_gen_details_main_div [id^="span_investigation_details_"]').hide();
    }

    function loadNonEditInvestigationDetailsTemplate(patientInvestigationDetails) {
        $('#patient_gen_details_main_div [id^="input_investigation_details_"]').hide();
        $('#patient_gen_details_main_div [id^="span_investigation_details_"]').show();

        if(patientInvestigationDetails.length != 0){
            var visit_date_div_id = 1;
            var visit_date_div = $('#date_row_div');

            $('#seperate_investigation_details_div').empty();
            var seperate_investigation_details_div = $('#seperate_investigation_details_div');
            var seperate_investigation_details_div_width = 100;
            var extra_width = 0;

            if(patientInvestigationDetails.length > 3){
                extra_width = ( Math.ceil((patientInvestigationDetails.length - 3) ) ) * 40;
            }

            var total_width = seperate_investigation_details_div_width + extra_width;
            // console.log(total_width);

            $(seperate_investigation_details_div).css("width",total_width+"%");

            var all_investigations_value_json = $.parseJSON($('#all_investigations_value').val());
            var all_investigations_hash = {};
            $.each(all_investigations_value_json, function (i,obj) {
                all_investigations_hash[obj.code] = obj.parameter_length;
            })

            patientInvestigationDetails.forEach(function (eachPatientInvestigationDetail) {
                // console.log(eachPatientInvestigationDetail.visited_on);

                var parsed_visited_date = $.datepicker.parseDate("yy-mm-dd",eachPatientInvestigationDetail.visited_on);
                var formatted_visit_date =  $.datepicker.formatDate('M d, yy', parsed_visited_date);

                var investigationDetails = eachPatientInvestigationDetail.investigation_details;
                visit_date_div_id++;

                seperate_investigation_details_div.append($('<div/>')
                        .attr("id","investigation_history_"+visit_date_div_id)
                        .attr("align","center")
                        .attr("style","margin-left:20px;padding-left:0px;margin-top:0px;float:left;width:180px;border:1px dotted green;height:auto;")
                        .addClass("patient_visited_on_div")
                    // .append(
                    //     $('<span/>')
                    //         .text(formatted_visit_date)
                    // )
                );

                $("#investigation_history_"+visit_date_div_id).append(
                    $('<div/>')
                        .attr("id","visit_date_"+visit_date_div_id)
                        .attr("style","height: 2.5vh;margin-top: 4px;margin-bottom: 0px;font-weight:bold;border-bottom: 1px dotted green;")
                        .attr("align","center")
                        .append(
                            $('<span/>')
                                .text(formatted_visit_date)
                        )
                );

                var div_height = '4.5';
                $.each(investigationDetails,function(key){
                    var code = key;
                    div_height = (all_investigations_hash[key] == "textarea" ? "12" : div_height);
                    var code_value = investigationDetails[key];

                    $("#investigation_history_"+visit_date_div_id).append(
                        $('<div/>')
                            .attr("id","history_visit_"+visit_date_div_id+"_"+code)
                            .attr("align","center")
                            .attr("style","margin-left:0px;padding-left:0px;width:180px;margin-top:0px;border-bottom:1px dotted green;height:"+div_height+"vh;")
                            .addClass("patient_visited_on_div")
                            .append(
                                $('<div/>')
                                    .attr("id","inside_history_visit_"+visit_date_div_id+"_"+code)
                                    // .attr("align","center")
                                    .attr("style","margin-left: 0px;margin-top: 5px;border-right: 0px solid green;border: 0px dotted green;height: 3vh;")
                                    .append(
                                        $('<span/>')
                                            .html(code_value)
                                    )
                            )
                    )

                })

            })
        }

    }

    function loadVisitsComboInAilmentDetailsTemplate(patientId) {
        removeInvestigationDetailsForPastPatient();
        resetInvestigationDetailVisitsCombo();
        resetInvestigationDetailsNewVisitData();
        // simpleComboLoad("/get_patient_visits/"+patientId+".json",$('#patient_visits_select_id'),true);
        simpleComboLoad("/get_investigation_details_visits/"+patientId+".json",$('#patient_visits_select_id'),true);
    }

    function resetInvestigationDetailVisitsCombo() {
        $('#patient_visits_select_id option').each(function (index,each_option) {
            each_option_val = $(each_option).val();
            if(each_option_val != "0" && each_option_val != "-1"){
                $(each_option).remove();
            }
        })

        $('#visit_calendar_icon').hide()
        $('#investigation_details_visit').val("");
        $('#visit_date').html("");
    }

    function resetInvestigationDetailsNewVisitData() {
        $('#patient_gen_details_main_div [id^="span_investigation_details_"]').each(function (index,eachElement) {
            // console.log($(eachElement)[0]);
            $(eachElement).html("-");
        })
    }

    function removeInvestigationDetailsForPastPatient() {
        $('#patient_gen_details_main_div [id^="visit_date_"]').each(function (index,eachElement) {
            // console.log($(eachElement));

            if((eachElement.id).indexOf("_0") == -1){
                $(eachElement).remove();
            }
        })

        $('#patient_gen_details_main_div [id^="history_visit_"]').each(function (index,eachElement) {
            if((eachElement.id).indexOf("_0") == -1){
                $(eachElement).remove();
            }
        })
    }

    function loadPatientInvestigationDetails(selectedVisitOption) {
        var parsedSelectedVisitDate = $.datepicker.parseDate("M dd, yy",selectedVisitOption)

        $.ajax({
            url:'/get_all_patients_investigation_details/'+$('#input_pgd_id').val()+'/'+parsedSelectedVisitDate+'.json',
            method:"GET",
            success:function (investigationDetailsForPatient) {
                loadPatientInvestigationDetailsData(investigationDetailsForPatient)
            }
        })
    }

    function loadPatientInvestigationDetailsData(investigationDetailsForPatient) {
        populateInputsAndSpans(investigationDetailsForPatient,'input_investigation_details_','span_investigation_details_',false,'');
    }
