class VisitController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def get_patient_visits
    patientId = params[:id]
    all_patient_visits =
        Visit.where(:patient_id=>patientId)
            .select("id, to_char(visited_on, 'Mon DD, YYYY') as name")
            .order("visited_on desc")

    respond_to do |format|
      format.html
      format.json { render json: all_patient_visits}
    end

  end

  def save_patient_visit
  end
end
