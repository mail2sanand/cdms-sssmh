module VisitHelper
  def get_all_patient_visits
    Visit.find_by(:patient_id=>(current_user.id))
  end
end
