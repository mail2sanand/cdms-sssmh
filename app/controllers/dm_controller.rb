class DmController < ApplicationController
  include ApplicationHelper

  def update_dm_details_for_patient(dm_details, patient)

    patientVisit = dm_details.delete("visit")
    puts "=========>>> dm_details : #{dm_details.inspect}"
    puts "==============>>>>>>>>>>>>>>> patientVisit : #{patientVisit}"

    dmDetailsJSON = convertHashObjectToJSON(dm_details)

    if(patientVisit =~ /^\d+$/)
      puts "----------- Patient Visit is a old one"
      dmDetailOnVisit = ExaminationDetail.find(:patient_id => patient.id, :visit_id => patientVisit)
      dmDetailOnVisit.update({:examination_details => dmDetailsJSON})

    elsif patientVisit.empty?
      # We will have to error that there is no Visit Selected.
    else
      # puts "The patients visit isn't a Number but a Date : #{patientVisit}"
      newVisit = Visit.find_or_create_by({
           :patient_id => patient.id,
           :visited_on => patientVisit,
           :visited_at => patient.village_id
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
