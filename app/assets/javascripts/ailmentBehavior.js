// Addition of Ailments to Patients General Details Block

    function add_new_ailment(ailment_name) {
        // Load the Template for the Ailment
        loadTemplateForAilment(ailment_name);
    }

    function loadTemplateForAilment(ailment_name) {
        addTab($("#patient_detail_main"),1,ailment_name,1);
        get_ailment_template(ailment_name)

        // Make sure to remove the Ailment from the Drop-Down

    }

    function get_ailment_template(ailment) {
        $.ajax({
            url:'/get_ailment_template/'+ailment,
            method:"GET",
            success:function (partial_template) {
                $("#"+ailment+"_template").html(partial_template);
                $("#patient_detail_main").tabs("refresh");
            }
        })
    }

    // function createDiabetesTemplate() {
    // }


// END OF Addition of Ailments ........
