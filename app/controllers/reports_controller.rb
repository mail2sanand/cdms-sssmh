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
    nodal_village = params[:nodal]

    puts "nodal_village : #{nodal_village}"

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
              END village_name,
              p.age,
              p.gender
              FROM patients p
                  JOIN villages v ON v.id = p.village_id
    "

    query_2 = "
                   WHERE v.id = #{village_id}
    "

    puts "nodal_village : #{nodal_village} | ",nodal_village
    if(nodal_village == "true")
      query_2 = query_2 + " or v.parent_village_id = #{village_id}"
    end

    query_3 = "
              order by p.id asc
    "

    village_id = "all_villages" if !village_id
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

  def print_village_report
    patient_ids = params[:patient_ids].split("_")
    village_name = params[:village_id]
    ailment_id = params[:ailment_id]
    print = params[:print]
    village_name = (village_name == "Select a Village" ? "All Villages" : village_name)

    combined_village_pdf = CombinePDF.new
    villageFilePath = ""

    if(params[:print] == "review")
      # Select only those Patients whose details have been updated a month ago
      filtered_patients = []
      filtered_patients_records =
          Patient.where("id in (#{params[:patient_ids].gsub('_',',')}) and
        updated_at >= (CURRENT_DATE - INTEGER '31') AND updated_at <= CURRENT_TIMESTAMP")

      filtered_patients_records.map{|i| filtered_patients << i.id.to_s} if filtered_patients_records.length > 0

      patient_ids = filtered_patients

      villageFilePath = "ReviewReports"
    elsif(params[:print] == "index")
      villageFilePath = "IndexReports"
    end

    puts "patient_ids : #{patient_ids.inspect}"

    if(patient_ids.length > 0)
      patient_ids.each do |each_patient|
        patientFile =
            @@patientsController.print_patient_details_internal(
                each_patient,print,ailment_id)

        combined_village_pdf << CombinePDF.load(patientFile)
      end

      villageFilePath = File.join(Rails.root, "public/villageReports/#{villageFilePath}/#{village_name}/")
      FileUtils.mkdir_p(villageFilePath) unless File.exist?(villageFilePath)

      villageReviewReportFile =
          File.join(villageFilePath+"/#{village_name}_#{Time.now.strftime("%d-%m-%Y")}.pdf")

      # combined_village_pdf.number_pages
      combined_village_pdf.save villageReviewReportFile

      send_file(
          villageReviewReportFile,
          type: "application/pdf",
          disposition: 'inline'
      )

    else
      render "_no_patients"
      # send_file(
      #     File.join(Rails.root, "app/assets/images/no_patients.pdf"),
      #     type: "application/pdf"
      # )
    end

  end

end






















