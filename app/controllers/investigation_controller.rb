class InvestigationController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def update_investigation_details_for_patient(patient,investigationDetails)

    patientVisit = investigationDetails.delete("visit")
    puts " =============>>>> patientVisit in InvestigationController : #{patientVisit}"

    investigationDetailsJSON = convertHashObjectToJSON(investigationDetails)

    if(patientVisit =~ /^\d+$/)
      puts "----------- Patient Visit is a old one"
      investigationDetailOnVisit = InvestigationDetail.find(:patient_id => patient.id, :visit_id => patientVisit)
      investigationDetailOnVisit.update({:investigation_details => investigationDetailsJSON})
    elsif patientVisit.empty?
      # We will have to error that there is no Visit Selected.
    else
      newVisit = Visit.find_or_create_by({
        :patient_id => patient.id,
        :visited_on => patientVisit,
        :visited_at => patient.village_id
      })

      ailments = Ailment.find_by_name("Diabeties").id

      newVisit.update({:ailments => [ailments]})

      patientVisitId = newVisit.id

      patientInvestigationDetail = InvestigationDetail.find_or_create_by({
        :patient_id => patient.id,
        :visit_id => patientVisitId
      })

      patientInvestigationDetail.update({:investigation_details => investigationDetailsJSON})

    end

  end

  def get_all_patient_investigation_visits
    patientId = params[:id]
    patientInvestigationVisits =
        InvestigationDetail.joins(:visit).where(:patient_id=>patientId).select("visits.id, to_char(visited_on, 'Mon DD, YYYY') as name")

    # InvestigationDetail.joins(:visit).where(:patient_id=>patientId).select("visits.id, to_char(visited_on, 'Mon DD, YYYY') as name")
    respond_to do |format|
      format.html
      format.json { render json: patientInvestigationVisits}
    end
  end

  def get_all_patients_investigation_details
    patientId = params[:id]
    parsedDate = DateTime.parse(params[:visit]).strftime("%Y-%m-%d")

    patientInvestigationDetail =
        InvestigationDetail.joins(:visit)
            .where("investigation_details.patient_id=#{patientId} and visited_on='#{parsedDate}'")
            .order("visited_on desc")
            .first.investigation_details

    puts "====================>> \n #{patientInvestigationDetail.inspect}"
    puts "<< ==================="

    respond_to do |format|
      format.html
      format.json { render json: patientInvestigationDetail}
    end

  end

end
