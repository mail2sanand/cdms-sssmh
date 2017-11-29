class PatientController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}


  @@comorbidConditionController = ComorbidConditionController.new
  @@habitController = HabitController.new
  @@examinationFindingsController = ExaminationController.new
  @@investigationDetailsController = InvestigationController.new
  @@dmDetailsController = DmController.new

  def index

  end

  def show_all
    @all_patients = Patient.all

    respond_to do |format|
      format.html
      format.json { render json: @all_patients}
    end
  end

  def create
    puts "===================\n"

    params[:pgd][:alive] = ( params[:pgd][:alive] == "on" ? 1 : 0)
    @newPatient = Patient.create(patient_params)
    @@comorbidConditionController.create_comorbid_condition_for_patient(@newPatient,params[:cmc])
    @@habitController.create_habits_for_patient(@newPatient,params[:habits])
    @@examinationFindingsController.create_examination_findings_for_patient(@newPatient,params[:examination_findings])
    # @@investigationDetailsController.

    puts "===================\n"

    params[:pgd][:id]=""
    # @newPatient = Patient.create(patient_params)
    render :json => true
  end

  def get_all_patients_for_search
    for_village = params[:for_village]

    @patientsForSearch

    if(for_village == "all_villages")
      @patientsForSearch = Patient.all.select(:id,:name,:gender,:age,:village_id)
    else
      @patientsForSearch = Patient.all.select(:id,:name,:gender,:age,:village_id)
    end


    respond_to do |format|
      format.html
      format.json { render json: @patientsForSearch}
    end
  end

  def get_patient_specific_detail(patientId)
    patientDetail = Patient.find(patientId)
    patientCMCDetails = ComorbidCondition.joins(:ailment).where(:patient_id => patientId).select("comorbid_conditions.*, ailments.code")
    patientHabitDetails = PatientHabit.joins(:habit).where(:patient_id => patientId).select("patient_habits.*, habits.code")
    patientExaminationFindingDetails = ExaminationDetail.joins(:examination).where(:patient_id => patientId).select("examination_details.*, examinations.code")
    patientInvestigationDetails = InvestigationDetail.joins(:visit).where(:patient_id => patientId).select("investigation_details.investigation_details, visits.visited_on")
    patientDMDetails = Hash.new
    patientDMDetails[:examination] = ExaminationDetail.joins(:visit).where(:patient_id => patientId).select("examination_details.examination_details, visits.visited_on")
    patientDMDetails[:general] = PatientAilmentDetail.find_by(
      :patient_id => patientId,
      :ailment_id => Ailment.find_by(:name => "Diabeties").id,
      :ailment_detail_name => "DM ID"
    )

    patientDetailJson = patientDetail.as_json.merge({
        "photo": patientDetail.photo.url,
        "patient_photo_thumb": patientDetail.photo.url(:thumb)
    })

    return {
        :pgd => patientDetailJson,
        :cmc => patientCMCDetails,
        :habits => patientHabitDetails,
        :examinationDetails => patientExaminationFindingDetails,
        :investigationDetails => patientInvestigationDetails,
        :dmDetails => patientDMDetails
    }
  end

  def get_patient_detail
    patientId = params[:id]

    allPatientDetails = get_patient_specific_detail(patientId)

    respond_to do |format|
      format.html
      format.json { render json: allPatientDetails}
    end
  end

  def edit
    patientId = params[:pgd][:id]
    patientForEditing = Patient.find(patientId)

    # Update the Comorbid Condition for the Patient
    @@comorbidConditionController.update_comorbid_condition_for_patient(patientForEditing,params[:cmc])

    # Update the Patient Habits
    @@habitController.update_patient_habits(patientForEditing,params[:habits])

    # Update the Examination Findings
    @@examinationFindingsController.update_examination_findings_for_patient(patientForEditing,params[:examination_findings])

    # puts "====================>>>>> #{params[:investigation_details].inspect}"
    @@investigationDetailsController.update_investigation_details_for_patient(patientForEditing,params[:investigation_details])

    # puts "=====================>>>>>>  dm_details Paramters : #{.inspect}"
    @@dmDetailsController.update_dm_details_for_patient(params[:dm_details], patientForEditing)

    # Update the Patient General Details
    params[:pgd][:alive] = ( params[:pgd][:alive] == "on" ? 1 : 0)
    patientForEditing.update(patient_params)
    patientForEditing.touch

    # After update get all the Patient Details
    patientForEditingJson = get_patient_specific_detail(patientId)

    respond_to do |format|
      format.html
      format.json { render json: patientForEditingJson}
    end

  end

  def delete_patient
    Patient.destroy(params[:id])
    render json: "true"
  end

  def print_patient_details
    patient_id = params[:id]
    patientFile = print_patient_details_internal(patient_id)

    send_file(
        patientFile,
        type: "application/pdf",
        disposition: 'inline'
    )

  end

  def print_patient_details_internal(patient_id)
    patient = Patient.find(patient_id)
    patientLastUpdatedTime = patient.updated_at

    # Check if the Patient Details Report is already generated
    patientReport = Report.where(
        :report_type => "patient",
        :report_type_value => patient_id
    )
    # puts "=====>> patientReport : #{patientReport.inspect} #{patientReport.length}"

    patientFile = ""
    if(patientReport.length == 0)
      patientFile = generate_data_for_patient_report(patient_id)
    else
      if(patientReport.updated_at < patientLastUpdatedTime)
        patientFile = generate_data_for_patient_report(patient_id)
      else
        patientFile = patientReport.report_file_path
      end
    end

    puts "Comming inside the patientReport Block"
    patientFile
  end

  def generate_data_for_patient_report(patient_id)
    report_details = Hash.new

    report_details[:dm_details] = PatientAilmentDetail.find_by(
      :patient_id => patient_id,
      :ailment_id => Ailment.find_by(:name => "Diabeties").id,
      :ailment_detail_name => "DM ID"
    )

    report_details[:pgd] = Patient.joins(:village).where(:id => patient_id).select("patients.*,villages.name as village_name")
    patient_cmc_details = ComorbidCondition.joins(:ailment).where("patient_id = #{patient_id} and code in ('diabeties','hypertension','cardiac_ailment','cva')").select("code,comorbid_condition_details")
    # binding.pry

    report_details[:cmc] = Hash.new
    report_details[:cmc][:dm] = patient_cmc_details.where("code = 'diabeties'").first.comorbid_condition_details
    report_details[:cmc][:htn] = patient_cmc_details.where("code = 'hypertension'").first.comorbid_condition_details
    report_details[:cmc][:cad] = patient_cmc_details.where("code = 'cardiac_ailment'").first.comorbid_condition_details
    report_details[:cmc][:chronic_complications] = patient_cmc_details.where("code = 'cva'").first.comorbid_condition_details

    # Get the Latest Visit's Examination Parameters
    visit_examinations = ExaminationDetail.joins(:visit).where(:patient_id => patient_id, :examination_id => 0).order("visit_id desc").limit(5)
    latest_visit_examination = visit_examinations.order("visit_id desc").first

    index_visit =
        ExaminationDetail
          .joins(:examination)
          .where(:patient_id => patient_id)
          .where.not(:examination_id => 0)
          .select("examinations.code, examination_details.id, examination_id, examination_finding")

    report_details[:treatment_advised] = ""
    one_month_examination_detail = Hash.new
    if(latest_visit_examination)
      one_month_examination_detail[:weight] = latest_visit_examination.examination_details["weight"]
      one_month_examination_detail[:bp] = latest_visit_examination.examination_details["bp"]
      one_month_examination_detail[:pulse] = latest_visit_examination.examination_details["pulse"]
      one_month_examination_detail[:fbs] = latest_visit_examination.examination_details["fbs"]
      one_month_examination_detail[:ppbs] = latest_visit_examination.examination_details["ppbs"]
      one_month_examination_detail[:rbs] = latest_visit_examination.examination_details["rbs"]

      report_details[:treatment_advised] = latest_visit_examination.examination_details["treatment_advised"]
    else
      one_month_examination_detail[:weight] = index_visit.where("examinations.code = 'weight'").first ? index_visit.where("examinations.code = 'weight'").first.examination_finding : ""
      one_month_examination_detail[:bp] = index_visit.where("examinations.code = 'bp'").first ? index_visit.where("examinations.code = 'bp'").first.examination_finding : ""
      one_month_examination_detail[:pulse] = index_visit.where("examinations.code = 'pulse'").first ? index_visit.where("examinations.code = 'pulse'").first.examination_finding : ""
      one_month_examination_detail[:fbs] = index_visit.where("examinations.code = 'fbs'").first ? index_visit.where("examinations.code = 'fbs'").first.examination_finding : ""
      one_month_examination_detail[:ppbs] = index_visit.where("examinations.code = 'ppbs'").first ? index_visit.where("examinations.code = 'ppbs'").first.examination_finding : ""
      one_month_examination_detail[:rbs] = index_visit.where("examinations.code = 'rbs'").first ? index_visit.where("examinations.code = 'rbs'").first.examination_finding : ""
    end

    report_details[:one_month_examination_detail] = one_month_examination_detail

    bs_examination_details = Array.new
    i=0
    visit_examinations.order("visit_id desc").each do |each_visit_examination|
      i = i+1
      next if i==1
      bs_examination_details_hash = Hash.new
      bs_examination_details_hash[:visit] = each_visit_examination.visit.visited_on.strftime("%d %b %Y")
      bs_examination_details_hash[:fbs] = each_visit_examination.examination_details["fbs"]
      bs_examination_details_hash[:ppbs] = each_visit_examination.examination_details["ppbs"]
      bs_examination_details_hash[:rbs] = each_visit_examination.examination_details["rbs"]

      bs_examination_details << bs_examination_details_hash
    end

    report_details[:bs_examination_details] = bs_examination_details

    createPatientReviewReport(report_details, patient_id)
  end

  def createPatientReviewReport(report_details, patient_id)
    # Find if a Review Report exists for this patient
    patient_report = Report.where(
        :patient_id => patient_id,
        :report_type => "patient",
        :report_type_value => "review"
    )

    # This is the Block to generate the PDF from the patient's Data
    patientReviewDoc = PatientReviewTemplate.new(report_details)

    patientFilePath = File.join(Rails.root, "public/patientDetails/#{patient_id}/ReviewSheets")
    FileUtils.mkdir_p(patientFilePath) unless File.exist?(patientFilePath)

    patientFile = File.join(patientFilePath+"/#{patient_id}_#{Time.now.strftime("%d-%m-%Y")}.pdf")

    if(patient_report.length == 0)
      Report.create({
          :report_type => "patient",
          :report_type_value => "review",
          :report_file_path => patientFile,
          :patient_id => patient_id,
          :report_details => report_details
      })
    else
      patient_report.first.update({
          :report_type => "patient",
          :report_type_value => "review",
          :report_file_path => patientFile,
          :patient_id => patient_id,
          :report_details => report_details
      })
    end

    patientReviewDoc.render_file File.join(patientFilePath+"/#{patient_id}_#{Time.now.strftime("%d-%m-%Y")}.pdf")
    patientFile
  end

  private
  def patient_params
    params[:pgd].permit(:id,:alive,:photo,:name,:age,:gender, :contact, :annualIncome, :village_id, :cdno, :sssmhIdNo, :aadharNo)
  end

end
