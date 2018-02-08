function load_and_display_patients_function(village_id,nodal) {
    $.ajax({
        url:'/get_all_patients_for_reports/'+village_id+'/'+nodal+'.json',
        method:"GET",
        success:function (allPatients) {
            populateTotalPatients(allPatients.length,nodal);
            display_patients_function(allPatients);
            selectAllPatients();
            attachClickEventToPatients();
        }
    })
}

function populateTotalPatients(patients_count,nodal) {
    var village_name = ";"
    if(nodal){
        village_name = $('#report_nodal_village_select_id option:selected').text();
    }else{
        village_name = $('#report_select_id option:selected').text();
    }

    $('#patients_count').html("<b>"+patients_count+"</b> patient(s) in "+ (nodal ? "Nodal " : "") +"Village : <b>" + village_name+"</b>")
}


function changeVillage(selectedVillage) {
    removeAllPatientDivs();

    if(selectedVillage == -1){
        load_and_display_patients_function("all_villages",false);
    }else{
        load_and_display_patients_function(selectedVillage,false);
    }
}

function changeNodalVillage(selectedVillage) {
    // console.log(selectedVillage);

    removeAllPatientDivs();

    load_and_display_patients_function(selectedVillage,true);
}

function removeAllPatientDivs() {
    $('#patients_block_div').empty();
}

function selectAllNonePatients(select_all_none) {
    console.log(select_all_none);
    if(select_all_none){
        selectAllPatients();
    }else{
        unSelectAllPatients();
    }
}

function unSelectAllPatients() {
    $('[id^="patient_checkbox_"]').each(function () {
        $(this).prop("checked",false);
    })
}

function selectAllPatients() {
    $('[id^="patient_checkbox_"]').each(function () {
        $(this).prop("checked",true);
    })
}

function attachClickEventToPatients() {
    $('[id^="individual_patient_block_div_"]').click(function () {
        individualpatientDivClick(this)
    })
}

function individualpatientDivClick(element) {
    var clicked_patient = element.id;
    var patient_id = clicked_patient.split("patient_id_")[1];

    var clicked_patient_checkbox = $("#patient_checkbox_"+patient_id);
    clicked_patient_checkbox.prop("checked",!clicked_patient_checkbox.prop("checked"));
    if(
        (clicked_patient_checkbox.prop("checked") === undefined || !clicked_patient_checkbox.prop("checked"))
        && $('#select_all_none').prop("checked")
    ){
        $('#select_all_none').prop("checked",false);
    }
}

function getSelectedPatients() {
    var selectedPatientsIds = "";
    $('[id^="patient_checkbox_"]').each(function () {
        if($(this).prop("checked")){
            var selected_patient_checkbox = this.id;
            var selected_patient_id = selected_patient_checkbox.split("patient_checkbox_")[1];
            selectedPatientsIds = selectedPatientsIds + selected_patient_id + "_";
        }
    })

    village_id = $('#report_select_id option:selected').text()

    selectedPatientsIds = selectedPatientsIds.replace(/_(\s+)?$/,'');

    return selectedPatientsIds;
}

function printReportsDetailsPage(report_type) {
    var all_selected_patients = getSelectedPatients();
    var selected_ailment = $('#ailment_combo_for_reports').val();

    // AJAX request to Print the selected Patients
    window.open('/print_village_report/'+all_selected_patients+'/'+village_id+'/'+report_type+'/'+selected_ailment, '_blank')
}

function showAndHideAllPatients(show_village) {
    if(show_village == 'all'){
        $('[id^="individual_patient_block_div_"]').each(function () {
            $(this).show();
        })
    }else{
        $('[id^="individual_patient_block_div_"]').each(function () {
            individual_patient_div_id = this.id;
            if(individual_patient_div_id.indexOf(show_village) == -1){
                $(this).hide();
            }
        })
    }
}

function display_patients_function(allPatients) {
    var dm_visit_date_div = $('#patients_block_div');
    var allPatients_backup = allPatients;

    number_of_rows_to_be_created = Math.ceil(allPatients.length/4)

    for(i=0;i < number_of_rows_to_be_created; i++){
        // console.log("=========>> "+i+"th time");
        dm_visit_date_div.append(
            $('<div/>')
                .attr('id','patients_block_div_'+i)
                .attr("style","margin-left:0px;padding-left:0px;margin-top:4px;border:0px dotted green;height:35px;")

        )

        current_patients_block_div = $('#patients_block_div_'+i);

        patient_count = 3
        patient_start = (i == 0 ? 0 : i*4)
        patient_end = (i == 0 ? 3 : (i*4+4)-1)

        for(j=patient_start;j <= patient_end;j++){
            current_patient = allPatients[j];

            if(current_patient){
                current_patient_id = current_patient.patient_id

                current_patients_block_div.append(
                    $('<div/>')
                        .attr('id','individual_patient_block_div_'+j+"_"+current_patient.village_name+"_patient_id_"+current_patient_id)
                        .attr('class','individual_patient_block_divs')
                        .attr("style","margin-left:5px;padding-left:15px;margin-top:4px;border:1px dotted red;float:left;width:250px;height:30px;v-align:middle;padding-top:15px;")
                        .attr('align',"left")
                        .append(
                            '<input type="checkbox" id="patient_checkbox_' + current_patient_id + '"name="' + current_patient_id + '" style="margin-right:10px;">'
                        ).append(
                            $('<span/>')
                                .text(current_patient.patient_name)
                        )
                )
            }

        }

    }

//            dm_visit_date_div.append($('<div/>')
//                .attr("id","dm_visit_date_0")
//                .attr("align","center")
//                .attr("style","margin-left:0px;padding-left:0px;margin-top:4px;border:0px dotted red;height:auto;")
//                .append(
//                    $('<span/>')
//                        .text("Select New Visit")
//                )
//            );

}

function loadAilmentsForReports(){
    simpleComboLoad("/get_all_ailments_for_combo.json",
        $('#ailment_combo_for_reports'),false,[function (comboResultArray) {
            // $('#ailment_combo_for_reports').val(9);   // By default Diabetes is Selected.
        }]
    );
}



// $('#individual_patient_block_divs').on('click', function (event) {
//     alert("I am getting triggered");
// })

