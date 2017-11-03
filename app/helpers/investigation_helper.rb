module InvestigationHelper
  def get_investigations_from_helper
    Investigation.all.select(:id,:name,:code,:units,:parameter_length)
  end

  def all_patient_visit_investigation_details_from_helper
    patient_id = current_user.id
    InvestigationDetail.where(:patient_id => patient_id)
  end

end
