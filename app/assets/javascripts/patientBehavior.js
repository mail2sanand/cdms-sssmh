var subVillageNodalVillageMapping;

function showDialogueForPatientPage(title,message) {
    var dialogueElement = $('#patient_dialogue_box');
    dialogueElement.text(message);
    dialogueElement.effect("highlight", {}, 3000).fadeOut();
}

function loadVillages(){
    simpleComboLoad("/get_all_villages.json",$('#input_pgd_village_id'));
    simpleComboLoad("/get_all_nodal_villages.json",$('#input_pgd_nodal_village_id'));
    populateSubVillageNodalVillageMapping();
}

function selectRespectiveNodalVillage(sub_village_id) {
    // console.log(subVillageNodalVillageMapping);
    nodal_village = subVillageNodalVillageMapping[sub_village_id];
    console.log(nodal_village);

    $('#input_pgd_nodal_village_id').val(nodal_village);
}

function populateSubVillageNodalVillageMapping() {
    $.ajax({
        type: "GET",
        url: '/get_sub_village_nodal_village_mapping.json',
        success: function (sub_village_nodal_villages) {
            subVillageNodalVillageMapping =
                sub_village_nodal_villages;
        }
    })
}

var createDefaultTemplates = function (comboResultArray) {
    var defaultAilmentsToBeLoaded = ["Diabetes"]
    $('#ailment_combo_select_id > option').each(function () {
        if(defaultAilmentsToBeLoaded.indexOf(this.text) != -1){
            add_new_ailment(this.value);
        }
    })
}

function loadAilments(){
    var saveAilmentsFunction = function(){

    };
    simpleComboLoad("/get_all_ailments_for_combo.json",$('#ailment_combo_select_id'),true,[createDefaultTemplates]);
}

function loadCoMorbidConditions() {
    simpleComboLoad("/get_all_ailments_for_combo.json",$('#co_morbid_condition_option_id'),false);
}

function loadHabits() {
    simpleComboLoad("/get_all_habits_for_combo.json",$('#habits_option_id'),false);
}

function loadPatientsForSearch(loadPatientsDiv,village) {
    if (village == null){
        village = "all_villages"
    }

    $.ajax({
        url:'/get_all_patients_for_reports/'+village+'/true.json',
        method:"GET",
        success:function (allPatients) {
            loadPatientsDiv.empty();
            initialPopulatePatients(loadPatientsDiv,allPatients);
        }
    })
}

function initialPopulatePatients(loadPatientsDiv,allPatients){
    $.each(allPatients,function(index,eachPatient){
        loadPatientsDiv.append(
            createPatientSearchNode(eachPatient)
        );
    });
}

function createPatientSearchNode(patientDetail){
    var eachPatientDivId = 'patSearch_'+patientDetail.patient_name+'_'+patientDetail.patient_id+'_'+patientDetail.village_id;
    var eachPatientName = firstWordCap(patientDetail.patient_name);
    var eachPatientGender = patientDetail.gender ? "M " : "F ";
    var eachPatientAge = patientDetail.age;
    var eachPatientCDNo = patientDetail.cdno;
    var eachPatientDisplayText = eachPatientName+' ('+ eachPatientCDNo +')';
    var eachPatientBlock = "<div id='"+eachPatientDivId+"' class='patientSearchDetailClass' onclick='loadPatientDetails("+patientDetail.patient_id+");'> > "+eachPatientDisplayText+"</div>";
    return eachPatientBlock;
}

function loadPatientDetails(patientId) {
    $.ajax({
        url:'/get_patient_detail/'+patientId+'.json',
        method:"GET",
        success:function (data) {
            // console.log(data);
            loadNonEditPatientTemplates(data);
        }
    })
}

function firstWordCap(stringToConvert){
    stringToConvert = stringToConvert.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    return stringToConvert;
}

// Non-Edit Empty Template Loading
    function loadNonEditEmptyTemplates(){
        $('#operation_mode').val("empty");

        //Select a Patient from the Left Panel
        $('#patient_detail_info').text("Please Select a Patient from the Left Panel");

        loadNonEditEmptyPGDTemplate();
        loadNonEditEmptyCMCTemplate();
        loadNonEditEmptyHabitsTemplate();
        loadNonEditEmptyHistoryTemplate();
        loadNonEditEmptyExaminationFindingsTemplate();

    }

    function loadNonEditEmptyCMCTemplate() {
        // Hide all the Input Elements and show all the Span Elements
        $('#patient_gen_details_main_div [id^="input_cmc_"]').hide();
        $('#patient_gen_details_main_div [id^="span_cmc_"]').each(function (index, eachSpanElement) {
            $(eachSpanElement).html('-');
            $(eachSpanElement).show();
        })
    }

    function loadNonEditEmptyHabitsTemplate() {
        // Hide all the Input Elements and show all the Span Elements
        $('#patient_gen_details_main_div [id^="input_habits_"]').hide();
        $('#patient_gen_details_main_div [id^="span_habits_"]').each(function (index, eachSpanElement) {
            $(eachSpanElement).html('-');
            $(eachSpanElement).show();
        })
    }

    function loadNonEditEmptyHistoryTemplate() {
        // Hide all the Input Elements and show all the Span Elements
        $('#patient_gen_details_main_div [id^="input_history_"]').hide();
        $('#patient_gen_details_main_div [id^="span_history_"]').each(function (index, eachSpanElement) {
            $(eachSpanElement).html('-');
            $(eachSpanElement).show();
        })
    }

    function loadNonEditEmptyExaminationFindingsTemplate() {
        // Hide all the Input Elements and show all the Span Elements
        $('#patient_gen_details_main_div [id^="input_examination_findings_"]').hide();
        $('#patient_gen_details_main_div [id^="span_examination_findings_"]').each(function (index, eachSpanElement) {
            $(eachSpanElement).html('-');
            $(eachSpanElement).show();
            // $(eachSpanElement).parent().closest('div').center();
            //     .css({
            //     "margin-left":"20px",
            //     "padding-left":"120px"
            // })
        })
    }

    function loadNonEditEmptyPGDTemplate(){
        // Hide all the Input Elements
        $('#patient_gen_details_main_div [id^="input_pgd_"]').hide();
        $('#patient_gen_details_main_div [id^="span_pgd_"]').show();

        // Adjust the padding-top property for all the Non-Input Elements
        $('#patient_gen_details_main_div [class^="patient_details_input"]').each(function (index,eachSpanElement) {
            $(eachSpanElement).css({
                "padding-top":"8px",
                "text-align":"left",
                "font-style": "italic",
            });
        });

        // Adjust the Div height for Special Elements
        $('#patient_gen_details_main_div select').each(function (index,selectElement) {
            $(selectElement).closest('.patient_details_input').css({
                "height":"30px",
                "padding-top":"2px"
            });
        })

        //Hide the Submit Buttons Block
        $('#submitButtonsBlock').hide();
    }
// END OF Non-Edit Empty Template Loading

// New Patient
    // Load New Patient Registration Page
        function loadNewPatientRegistrationPage() {
            $('#operation_mode').val("newPatient");

            // Reset The Patient Details Form
            $('#patientDetailsFormId')[0].reset();

            loadEditEmptyPGDTemplate();
            loadEditCMCTemplate();
            loadEditHabitsTemplate();
            loadEditHistoryTemplate();
            loadEditExaminationFindingsTemplate();

            $('#patient_detail_options').hide();
        }

        function loadEditCMCTemplate() {
            // Hide all the Input Elements
            $('#patient_gen_details_main_div [id^="input_cmc_"]').show();
            $('#patient_gen_details_main_div [id^="span_cmc_"]').hide();
        }

        function loadEditHabitsTemplate() {
            // Hide all the Input Elements
            $('#patient_gen_details_main_div [id^="input_habits_"]').show();
            $('#patient_gen_details_main_div [id^="span_habits_"]').hide();
        }

        function loadEditHistoryTemplate() {
            // Hide all the Input Elements
            $('#patient_gen_details_main_div [id^="input_history_"]').show();
            $('#patient_gen_details_main_div [id^="span_history_"]').hide();
        }

        function loadEditExaminationFindingsTemplate() {
            // Hide all the Input Elements
            $('#patient_gen_details_main_div [id^="input_examination_findings_"]').show();
            $('#patient_gen_details_main_div [id^="span_examination_findings_"]').hide();
        }

        function loadEditEmptyPGDTemplate() {

            // Hide all the Input Elements
            $('#patient_gen_details_main_div [id^="input_pgd_"]').show();
            $('#patient_gen_details_main_div [id^="span_pgd_"]').hide();

            // Adjust the padding-top property for all the Non-Input Elements
            $('#patient_gen_details_main_div [class^="patient_details_input"]').each(function (index,eachSpanElement) {
                $(eachSpanElement).css({
                    "padding-top":"",
                    "text-align":"",
                    "font-style": "normal",
                });
            });

            // Adjust the Div height for Special Elements
            $('#patient_gen_details_main_div select').each(function (index,selectElement) {
                $(selectElement).closest('.patient_details_input').css({
                    "height":"35px",
                    "padding-top":""
                });
            })

            //Hide the Submit Buttons Block
            $('#submitButtonsBlock').show();

            //Change the Sub-Header Text to New Patient Registration
            $('#patient_detail_info').text("New Patient Registration");

        }
    // END OF Load New Patient Registration Page

    // Patient Details Submission
        function checkAndSubmit(){
            var patientDetailsForm =  new FormData($('#patientDetailsFormId')[0]);
            var operationMode = $('#operation_mode').val();
            var submitUrl = "";

            switch(operationMode){
                case "newPatient" :
                    // console.log("New Switch Case Block");
                    submitUrl = "/create_patient";
                    // submitNewPatient(patientDetailsForm);
                    break;
                case "editPatient" :
                    // console.log("Edit Switch Case Block");
                    submitUrl = "/edit_patient";
                    // submitEditPatient(patientDetailsForm);
                    break;
            }

            // console.log("submitUrl : "+submitUrl);

            $.ajax({
                url: submitUrl,
                method:"POST",
                dataType:'json',
                data:patientDetailsForm,
                processData:false,
                contentType:false,
                success:function (data) {
                    var successMessage = "";
                    var successMessageTitle = "";
                    if(operationMode == "newPatient"){
                        successMessage = "New Patient Registration Successful";
                        successMessageTitle = "New Patient";
                        loadNewPatientRegistrationPage();
                    }else if(operationMode == "editPatient"){
                        successMessage = "Patient Detail Modification Successful";
                        successMessageTitle = "Modify Patient";
                        loadNonEditPatientTemplates(data);
                    }

                    showDialogueForPatientPage(successMessageTitle,successMessage);
                    loadPatientsForSearch($('#patients_list_block_div'),$('#report_select_id').val());
                },
                error:function (data) {
                    console.log(data);
                }
            })


        }


        // END OF Edit Patient Submission

    // END OF Patient Details Submission

// END OF New Patient


// Non-Edit Patient Template Loading
    function loadNonEditPatientTemplates(patientDetails){
        $('#patientDetailsFormId')[0].reset();
        $('#operation_mode').val("nonEdit");

        //Change the Sub-Header Text to New Patient Registration
        $('#patient_detail_info').text("Details of Patient : "+patientDetails.pgd.name);

        pgd = patientDetails.pgd
        console.log(pgd);

        patientId = pgd.id;
        loadNonEditPatientPGDTemplate(pgd);

        if(patientDetails.cmc.length == 0){
            loadNonEditEmptyCMCTemplate();
        }else{
            loadNonEditCMCTemplate(patientDetails.cmc);
        }

        if(patientDetails.habits.length == 0){
            loadNonEditEmptyHabitsTemplate();
        }else{
            loadNonEditHabitsTemplate(patientDetails.habits);
        }

        if(patientDetails.other_history.length == 0){
            loadNonEditEmptyHistoryTemplate();
        }else{
            // loadNonEditHistoryTemplate($.parseJSON(patientDetails.other_history));
            loadNonEditHistoryTemplate(patientDetails.other_history);
        }

        if(patientDetails.examinationDetails.length == 0){
            loadNonEditEmptyExaminationFindingsTemplate();
        }else{
            loadNonEditExaminationFindingsTemplate(patientDetails.examinationDetails);
        }

        // Load the Visit Details of the Patient in the Investogation Details Section
        loadVisitsComboInAilmentDetailsTemplate(patientId);
        loadNonEditInvestigationDetailsTemplate(patientDetails.investigationDetails);

        // // Load the Visit Details of the Patient in the Diabetes Details Section
        loadVisitsComboInDMDetailsTemplate(patientId);
        loadNonEditDMDetailsTemplate(patientDetails.dmDetails);

        $('#patient_detail_options').show();
    }


    function changeVisitOption(selectedVisitOption,ailment_prefix) {
        if(selectedVisitOption == "0"){
            $('#'+ailment_prefix+'_visit_calendar_icon').show()
            $('#'+ailment_prefix+'_details_visit').val("");
            $('#'+ailment_prefix+'_visit_date_0').html("Select New Visit");
        }else if(selectedVisitOption != "-1"){
            $('#'+ailment_prefix+'_details_visit').val($.datepicker.parseDate("M dd, yy",selectedVisitOption));
            $('#'+ailment_prefix+'_visit_date_0').html(selectedVisitOption);

            if(ailment_prefix.indexOf("investigation") != -1){
                loadPatientInvestigationDetails(selectedVisitOption);
            }else if(ailment_prefix.indexOf("dm") != -1){
                loadPatientDMDetails(selectedVisitOption);
            }

            $('#'+ailment_prefix+'_visit_calendar_icon').hide();
        }
    }

    function loadNonEditCMCTemplate(patientCMCDetails) {
        $('#patient_gen_details_main_div [id^="input_cmc_"]').hide();
        $('#patient_gen_details_main_div [id^="span_cmc_"]').show();

        // populateInputsAndSpans(patientCMCDetails,'input_cmc_','span_cmc_',true,"comorbid_condition_details");
        populateInputsAndSpans(patientCMCDetails,'input_cmc_','span_cmc_',false,"comorbid_condition_details");
    }


    function loadNonEditHabitsTemplate(patientHabitsDetails) {
        $('#patient_gen_details_main_div [id^="input_habits_"]').hide();
        $('#patient_gen_details_main_div [id^="span_habits_"]').show();

        populateInputsAndSpans(patientHabitsDetails,'input_habits_','span_habits_',true,"comment");
    }

    function loadNonEditHistoryTemplate(patientHistoryDetails) {
        $('#patient_gen_details_main_div [id^="input_history_"]').hide();
        $('#patient_gen_details_main_div [id^="span_history_"]').show();

        // populateInputsAndSpans(patientHistoryDetails,'input_history_','span_history_','iterate_hash',"");
        populateInputsAndSpans(patientHistoryDetails,'input_history_','span_history_',false,"");
    }

    function loadNonEditExaminationFindingsTemplate(patientExaminationFindings) {
        $('#patient_gen_details_main_div [id^="input_examination_findings_"]').hide();
        $('#patient_gen_details_main_div [id^="span_examination_findings_"]').show();

        console.log("Examination Details in loadNonEditExaminationFindingsTemplate : ======>>");
        populateInputsAndSpans(patientExaminationFindings,'input_examination_findings_','span_examination_findings_',true,"examination_finding");
    }

    function loadNonEditPatientPGDTemplate(patientDetails){
        // Hide all the Input Elements
        $('#patient_gen_details_main_div [id^="input_pgd_"]').hide();
        $('#patient_gen_details_main_div [id^="span_pgd_"]').show();

        // Adjust the padding-top property for all the Non-Input Elements
        $('#patient_gen_details_main_div [class^="patient_details_input"]').each(function (index,eachSpanElement) {
            $(eachSpanElement).css({
                "padding-top":"8px",
                "text-align":"left",
                "font-style": "italic",
            });
        });

        // Adjust the Div height for Special Elements
        $('#patient_gen_details_main_div select').each(function (index,selectElement) {
            $(selectElement).closest('.patient_details_input').css({
                "height":"30px",
                "padding-top":"2px"
            });
        });

        populateInputsAndSpans(patientDetails,'input_pgd_','span_pgd_',false,'');

        //Hide the Submit Buttons Block
        $('#submitButtonsBlock').hide();

    }
// END OF Non-Edit Empty Template Loading

// Edit Patient Template Loading
    function editPatientDetailsPage(){
        $('#operation_mode').val("editPatient");
        loadEditPatientTemplates();
        // console.log($('#input_pgd_id').val());
    }

    function loadEditPatientTemplates(){
        //Change the Sub-Header Text to New Patient Registration
        $('#patient_detail_info').text("Edit "+$('#patient_detail_info').text());

        loadEditPatientPGDTemplate();
        loadEditCMCTemplate();
        loadEditHabitsTemplate();
        loadEditHistoryTemplate();
        loadEditExaminationFindingsTemplate();
        loadEditInvestigationDetailsTemplate();
        loadEditDMDetailsTemplate();
    }

    function loadEditPatientPGDTemplate(){
        // Hide all the Input Elements
        $('#patient_gen_details_main_div [id^="input_pgd_"]').show();
        $('#patient_gen_details_main_div [id^="span_pgd_"]').hide();

        // Adjust the padding-top property for all the Non-Input Elements
        $('#patient_gen_details_main_div [class^="patient_details_input"]').each(function (index,eachSpanElement) {
            $(eachSpanElement).css({
                "padding-top":"",
                "text-align":"",
                "font-style": "normal",
            });
        });

        // Adjust the Div height for Special Elements
        $('#patient_gen_details_main_div select').each(function (index,selectElement) {
            $(selectElement).closest('.patient_details_input').css({
                "height":"35px",
                "padding-top":""
            });
        })

        //Show only the Photo
        $('#span_pgd_photo').show();
        $('#span_pgd_photo_src').show();

        //Hide the Submit Buttons Block
        $('#submitButtonsBlock').show();

    }
// END OF Non-Edit Empty Template Loading


    // Function to populate all the inputs and spans with the JSON data
    function populateInputsAndSpans(patientDetails,input_key,span_key,iterate_with_code,code_value_parameter) {

        // Load all the details of the Patient into the respective Spans
        // console.log("input_key : "+input_key+"patientDetails : "+patientDetails);
        $.each(patientDetails,function (eachpatientDetailKey,eachpatientDetailValue) {
            // console.log("Key : "+eachpatientDetailKey+"===> "+eachpatientDetailValue);
            var eachpatientDetailInputElement;
            var eachpatientDetailSpanElement;
            var eachpatientDetailValueAttribute;

            if(iterate_with_code){
                eachpatientDetailInputElement = $('#'+input_key+eachpatientDetailValue.code);
                eachpatientDetailSpanElement = $('#'+span_key+eachpatientDetailValue.code);

                eachpatientDetailValueAttribute = eachpatientDetailValue[code_value_parameter];
            // }else if(iterate_with_code == "iterate_hash"){
            //
            }else{
                console.log("==>"+span_key+eachpatientDetailKey+"==>"+eachpatientDetailValue);
                eachpatientDetailInputElement = $('#'+input_key+eachpatientDetailKey);
                eachpatientDetailSpanElement = $('#'+span_key+eachpatientDetailKey);

                // console.log("==>"+span_key+eachpatientDetailKey+"==>"+eachpatientDetailValue);


                eachpatientDetailValueAttribute = eachpatientDetailValue;
            }

            // console.log(eachpatientDetailInputElement);
            // console.log(eachpatientDetailValueAttribute);

            console.log("Examination Details : ======>>");
            if($(eachpatientDetailInputElement).is("input[type=file]")){
                var file_element = $('#'+span_key+eachpatientDetailKey+"_src");
                $(file_element).attr("src",eachpatientDetailValueAttribute);
            }else if($(eachpatientDetailInputElement).is("input[type=checkbox]")){
                var checkboxValue = "Yes";
                var checkedValue = true;
                // console.log(eachpatientDetailKey, eachpatientDetailValueAttribute);
                if(!eachpatientDetailValueAttribute){
                    checkboxValue = "No";
                    checkedValue = false;
                }
                $(eachpatientDetailSpanElement).html(checkboxValue);
                $(eachpatientDetailInputElement).attr('checked',checkedValue);
            }else if($(eachpatientDetailInputElement).is("input")){
                $(eachpatientDetailSpanElement).html(eachpatientDetailValueAttribute);
                $(eachpatientDetailInputElement).val(eachpatientDetailValueAttribute);
            }else if($(eachpatientDetailInputElement).is("select")){
                $(eachpatientDetailInputElement).val(eachpatientDetailValueAttribute);
                var selectedText = $("#"+eachpatientDetailInputElement.attr('id')+" option:selected").text();
                eachpatientDetailSpanElement.html(selectedText);
            }else if($(eachpatientDetailInputElement).is("textarea")){
                console.log("eachpatientDetailValueAttribute : TextArea ==> "+eachpatientDetailValueAttribute);
                $(eachpatientDetailSpanElement).html(eachpatientDetailValueAttribute);
                $(eachpatientDetailInputElement).val(eachpatientDetailValueAttribute);
            }else{
                $(eachpatientDetailSpanElement).html(eachpatientDetailValueAttribute);
            }
        });
    }
    // END OF Function to populate .....

    // Print Patient Details Page
    function printPatientReviewDetailsPage() {
        var patientId = $('#input_pgd_id').val();
        window.open('/print_patient_details/'+patientId+'/review/9', '_blank')
    }

    function printPatientIndexDetailsPage() {
        var patientId = $('#input_pgd_id').val();
        window.open('/print_patient_details/'+patientId+'/index/9', '_blank')
    }

    function showPrintOptions(printElement) {
        $(printElement).append($('<div/>')
            .attr("id","custom_icons_for_print")
            .attr("align","center")
            .attr("style","cursor:default;z-index:20;position:absolute;background-color:#e9ecf3;height:4vh;width:55px;border:1px solid grey;margin:0px;padding:4px;")
            .html(
                "<div id='review_print' style='float: left;margin:0px;padding:0px;' class='custom_icons_print' id='custom_icons_R'>" +
                    "<img src='/assets/review_print.png' class='print_icons_class' border='0' onclick='printPatientReviewDetailsPage();'>"+
                "</div>" +
                "<div id='index_print' style='float: right;margin:0px;padding:0px;' class='custom_icons_print' id='custom_icons_I'>" +
                    "<img src='/assets/index_print.png' class='print_icons_class' border='0' onclick='printPatientIndexDetailsPage();'>"+
                "</div>"
            )
        );
    }

    function review_print(){
        alert("dsdssdsdsds");
    }


    //

    // Delete Patient
    function deletePatientDetailsPage() {
        var patientId = $('#input_pgd_id').val();
        var patientName = $('#patientname').val();

        var delete_patient_node = "<span style='align:left;width:300px;' id='delete_patient_node_span' >Are you sure you want to delete the Patient?</span>";
        $('#patient_dialogue_box').empty().append(delete_patient_node);

        $('#patient_dialogue_box').dialog({
            resizable:false,
            width:400,
            height:200,
            // modal: true,
            buttons:{
                "Ok":function () {
                    $( this ).dialog( "close" );
                    $.ajax({
                        url:'delete_patient/'+patientId,
                        method:'DELETE',
                        success:function (data) {
                            console.log(data);
                            successMessage = "Patient Detail Deleted Successful";
                            successMessageTitle = "Delete Patient";
                            showDialogueForPatientPage(successMessageTitle,successMessage);
                            loadPatientsForSearch($('#patients_list_block_div'));
                            loadNonEditEmptyTemplates();
                        },
                        error:function (error) {
                            console.log(error);
                        }
                    })
                },
                "Cancel":function () {
                    $( this ).dialog( "close" );
                }
            }
        });


    }
// END OF Delete Patient















