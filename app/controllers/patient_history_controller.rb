class PatientHistoryController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def update_other_history_details(patientForEditing,other_history_details)
    other_history_details_json = other_history_details.to_json
    patient_history = PatientHistory.find_by(:patient_id=>patientForEditing.id)

    if(patient_history)
      patient_history.update(:patient_history_details => other_history_details_json)
    else
      PatientHistory.create({
            :patient_id=>patientForEditing.id,
            :patient_history_details => other_history_details_json
        }
      )
    end

  end

  def create_other_history_details(new_patient,other_history_details)

    PatientHistory.new({
      :patient_id => new_patient.id,
      :patient_history_details => other_history_details
    })
  end

end
