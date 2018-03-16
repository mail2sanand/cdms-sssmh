class DmController < ApplicationController
  include ApplicationHelper

  def update_dm_details_for_patient(dm_details, patient)

    patientVisit = dm_details.delete("visit")
    dm_no = dm_details.delete("dm_number")
    sssmh_care_from = dm_details.delete("sssmh_care_from")

    puts " ========>>>>> sssmh_care_from : #{sssmh_care_from}"

    # Create a record for the Patient Diabetes Number
    patient_ailment_detail = PatientAilmentDetail.find_or_create_by({
       :patient_id => patient.id,
       :ailment_id => Ailment.find_by(:name => "Diabetes").id,
       # :ailment_detail_name => "DM ID",
    })

    patient_ailment_detail.update(:patient_ailment_details => {
        "dm_no" => dm_no,
        "sssmh_care_from" => sssmh_care_from
    })

    # puts "=========>>> dm_details : #{dm_details.inspect}"
    # puts "==============>>>>>>>>>>>>>>> patientVisit : #{patientVisit}"

    dmDetailsJSON = convertHashObjectToJSON(dm_details)

    if(patientVisit =~ /^\d+$/)
      # puts "----------- Patient Visit is a old one"
      dmDetailOnVisit = ExaminationDetail.find(:patient_id => patient.id, :visit_id => patientVisit)
      dmDetailOnVisit.update({:examination_details => dmDetailsJSON})
    elsif patientVisit.empty?
      # We will have to error that there is no Visit Selected.
    else
      # puts "The patients visit isn't a Number but a Date : #{patientVisit}"
      patient_village = Village.find(patient.village_id)
      visited_at = (patient_village.parent_village_id == 0 ? patient_village.id : patient_village.parent_village_id)

      newVisit = Visit.find_or_create_by({
           :patient_id => patient.id,
           :visited_on => patientVisit,
           :visited_at => visited_at
       })
      # puts "================>>>>>newVisit : #{newVisit.inspect}"

      # newVisit.update({:ailments => [1]})

      patientVisitId = newVisit.id
      patientDMDetail = ExaminationDetail.find_or_create_by({
                           :patient_id => patient.id,
                           :visit_id => patientVisitId,
                           :examination_id => 0
                        })
      # puts "===========>>> patientDMDetail : #{patientDMDetail.inspect}"

      patientDMDetail.update({:examination_details => dmDetailsJSON})

      # puts "===========>>> After Modification -- patientDMDetail : #{patientDMDetail.inspect}"

    end

  end

  def get_all_patients_dm_details
    patientId = params[:id]
    parsedDate = DateTime.parse(params[:visit]).strftime("%Y-%m-%d")

    patientDMDetail =
        ExaminationDetail.joins(:visit)
            .where("examination_details.patient_id=#{patientId} and visited_on='#{parsedDate}'").first.examination_details

    respond_to do |format|
      format.html
      format.json { render json: patientDMDetail}
    end
  end

end
