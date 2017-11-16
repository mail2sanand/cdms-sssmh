class ReportsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  @@patientsController = PatientController.new

  def index
    # Get all the Parent Villages
    @villages = Village.parent_villages
  end

  def get_all_patients_for_reports
    village_id = params[:village_id]

    query_1 = "
          SELECT p.id patient_id,p.name patient_name
              ,CASE
                  WHEN v.parent_village_id != 0
                      THEN (SELECT id FROM villages WHERE id=v.parent_village_id)
                  ELSE v.id
               END village_id
              ,CASE
                  WHEN v.parent_village_id != 0
                      THEN (SELECT name FROM villages WHERE id=v.parent_village_id)
                  ELSE v.name
              END village_name
              FROM patients p
                  JOIN villages v ON v.id = p.village_id
    "

    query_2 = "
                   WHERE v.id = #{village_id}
    "

    query_3 = "
              order by p.id asc
    "

    full_query = ""
    if(village_id == "all_villages")
      full_query = query_1 + query_3
    else
      full_query = query_1 + query_2 + query_3
    end

    puts "===============>> #{full_query}"

    all_patient_details = ActiveRecord::Base.connection.execute(full_query)

    respond_to do |format|
      format.html
      format.json { render json: all_patient_details}
    end
  end

  def print_village_review_report
    patient_ids = params[:patient_ids].split("_")
    village_name = params[:village_id]
    village_name = (village_name == "Select a Village" ? "All Villages" : village_name)

    combined_village_pdf = CombinePDF.new
    puts "combined_village_pdf : #{combined_village_pdf}"

    patient_ids.each do |each_patient|
      patientFile =
          @@patientsController.print_patient_details_internal(each_patient)

      combined_village_pdf << CombinePDF.load(patientFile)
    end

    villageFilePath = File.join(Rails.root, "public/villageReports/ReviewReports/#{village_name}/")
    FileUtils.mkdir_p(villageFilePath) unless File.exist?(villageFilePath)

    villageReviewReportFile =
        File.join(villageFilePath+"/#{village_name}_#{Time.now.strftime("%d-%m-%Y")}.pdf")

    combined_village_pdf.number_pages
    combined_village_pdf.save villageReviewReportFile

    send_file(
        villageReviewReportFile,
        type: "application/pdf",
        disposition: 'inline'
    )
    # pdf.save "#{village_name}_"


  end

end






















