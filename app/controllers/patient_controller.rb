class PatientController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}


  @@comorbidConditionController = ComorbidConditionController.new
  @@habitController = HabitController.new
  @@historyController = PatientHistoryController.new
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
    params[:pgd][:dateOfBirth] = "#{params[:pgd][:dateOfBirth]}"

    @newPatient = Patient.create(patient_params)

    @@comorbidConditionController.create_comorbid_condition_for_patient(@newPatient,params[:cmc])
    @@habitController.create_habits_for_patient(@newPatient,params[:habits])
    @@historyController.create_other_history_details(@newPatient,params[:other_history])
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

    # History Details
    patientCMCDetails = @@comorbidConditionController.get_cmc_details_for_patient(patientId)
    patientHabitDetails = PatientHabit.joins(:habit).where(:patient_id => patientId).select("patient_habits.*, habits.code")
    patientHistory = PatientHistory.find_by(:patient_id => patientId)


    patientExaminationFindingDetails = ExaminationDetail.joins(:examination).where(:patient_id => patientId).select("examination_details.*, examinations.code")

    patientInvestigationDetails =
        InvestigationDetail.joins(:visit)
            .where(:patient_id => patientId).select("investigation_details.investigation_details, visits.visited_on")
            .order("visits.visited_on desc")

    patientDMDetails = Hash.new

    patientDMDetails[:examination] =
        ExaminationDetail.joins(:visit)
            .where(:patient_id => patientId).select("examination_details.examination_details, visits.visited_on")
            .order("visits.visited_on desc")

    patientDMDetails[:general] = PatientAilmentDetail.find_by(
      :patient_id => patientId,
      :ailment_id => Ailment.find_by(:name => "Diabeties").id,
      # :ailment_detail_name => "DM ID"
    )

    patient_age =
        (patientDetail.dateOfBirth ? calculate_age( Date.strptime(patientDetail.dateOfBirth.to_s, '%Y-%m-%d'),Date.today()).to_s : "")

    patientDetailJson = patientDetail.as_json.merge({
        "photo": patientDetail.photo.url,
        "patient_photo_thumb": patientDetail.photo.url(:thumb),
        "age": "#{patient_age} years - DOB : #{patientDetail.dateOfBirth}"
    })

    return {
        :pgd => patientDetailJson,
        :cmc => patientCMCDetails,
        :habits => patientHabitDetails,
        :other_history => patientHistory ? patientHistory["patient_history_details"] : [],
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

    # Update the Patient Other History Details
    @@historyController.update_other_history_details(patientForEditing,params[:other_history])

    # Update the Examination Findings
    @@examinationFindingsController.update_examination_findings_for_patient(patientForEditing,params[:examination_findings])

    # puts "====================>>>>> #{params[:investigation_details].inspect}"
    @@investigationDetailsController.update_investigation_details_for_patient(patientForEditing,params[:investigation_details])

    # puts "=====================>>>>>>  dm_details Paramters : #{.inspect}"
    @@dmDetailsController.update_dm_details_for_patient(params[:dm_details], patientForEditing)

    # Update the Patient General Details
    params[:pgd][:alive] = ( params[:pgd][:alive] == "on" ? 1 : 0)
    params[:pgd][:dateOfBirth] = "#{params[:pgd][:dateOfBirth]}"

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
    print = params[:print]
    ailment = params[:ailment]

    patientFile = print_patient_details_internal(patient_id,print,ailment)

    send_file(
        patientFile,
        type: "application/pdf",
        disposition: 'inline'
    )

  end

  def print_patient_details_internal(patient_id,print,ailment)
    patient = Patient.find(patient_id)
    patientLastUpdatedTime = patient.updated_at

    # Check if the Patient Details Report is already generated
    patientReport = Report.where(
        :report_type => "patient",
        :report_type_value => print,
        :report_type_value => patient_id,
        :ailment_id => ailment
    )
    # puts "=====>> patientReport : #{patientReport.inspect} #{patientReport.length}"

    report_method_name = "generate_#{print}_data_for_patient_report"

    patientFile = ""
    if(patientReport.length == 0)
      patientFile = send(report_method_name.to_sym, patient_id,ailment)
      # patientFile = generate_review_data_for_patient_report(patient_id)
    else
      if(patientReport.updated_at < patientLastUpdatedTime)
        patientFile = send(report_method_name.to_sym, patient_id,ailment)
        # patientFile = generate_review_data_for_patient_report(patient_id)
      else
        patientFile = patientReport.report_file_path
      end
    end

    patientFile
  end

  def generate_index_data_for_patient_report(patient_id,ailment)
    ailment_record = Ailment.find(ailment)
    send("generate_index_data_for_patient_report_for_#{ailment_record.name.downcase}",patient_id,ailment)
  end

  def generate_index_data_for_patient_report_for_diabeties(patient_id,ailment)

    report_details = {}
    patient_ailment = PatientAilmentDetail.find_by(
        :patient_id => patient_id,
        # :ailment_id => Ailment.find_by(:name => "Diabeties").id,
        :ailment_id => ailment
    )

    report_details[:dm_details] = (patient_ailment ? patient_ailment.patient_ailment_details : {})

    # Patient General Details
    report_details[:pgd] =
        Patient.joins("inner join villages v on v.id = patients.village_id").where(:id => patient_id)
            .select("
              CASE
                  WHEN v.parent_village_id != 0
                      THEN v.name || ' (' || (SELECT name FROM villages WHERE id=v.parent_village_id) || ' )'
                  ELSE v.name
              END village_name,patients.name as patient_name, v.*, patients.*
            ")

    # Patient History Details
    report_details[:history] = {}
    report_details[:history][:cmc] = {}
    patient_cmc_details = ComorbidCondition.joins("inner join ailments a on a.id = comorbid_conditions.sub_ailment_id").where(
        :patient_id => patient_id
    ).select("comorbid_conditions.*, a.code")

    patient_cmc_details_hash = {}
    patient_cmc_details.each do |each_patient_cmc_detail|
      puts "======>> #{each_patient_cmc_detail.comorbid_condition_details.inspect}"
      patient_cmc_details_hash[each_patient_cmc_detail.code] =
          each_patient_cmc_detail.comorbid_condition_details
    end

    # if(patient_cmc_details_hash.empty?)
      report_details[:history][:cmc][:ailment_identified_from] = ""
      report_details[:history][:cmc][:ailment_type] = ""
      report_details[:history][:cmc][:under_sssmh_care_from] = ""
      report_details[:history][:cmc][:cmc_htn] = ""
      report_details[:history][:cmc][:cmc_hyper_lipidemia] = ""
      report_details[:history][:cmc][:cmc_cad] = ""
      report_details[:history][:cmc][:cmc_cva] = ""
      report_details[:history][:cmc][:cmc_others] = ""

    # else
      # For Diabetes
      diabetes_details_json = {}
      if(patient_cmc_details_hash["diabeties"])
        diabetes_details_json = JSON.parse(patient_cmc_details_hash["diabeties"])
      end

      report_details[:history][:cmc][:ailment_identified_from] = diabetes_details_json["suffering_since"]
      report_details[:history][:cmc][:ailment_type] = diabetes_details_json["ailment_type"]
      report_details[:history][:cmc][:under_sssmh_care_from] = report_details[:dm_details]["sssmh_care_from"]

      if(patient_cmc_details_hash["hypertension"])
        cmc_htn = JSON.parse(patient_cmc_details_hash["hypertension"])["suffering_since"]
        report_details[:history][:cmc][:cmc_htn] = (cmc_htn == "0" ? "" : cmc_htn)
      end

      if(patient_cmc_details_hash["hyper_lipidemia"])
        cmc_hyper_lipidemia = JSON.parse(patient_cmc_details_hash["hyper_lipidemia"])["suffering_since"]
        report_details[:history][:cmc][:cmc_hyper_lipidemia] = (cmc_hyper_lipidemia == "0" ? "" : cmc_hyper_lipidemia)
      end

      if(patient_cmc_details_hash["cardiac_ailment"])
        cardiac_ailment = JSON.parse(patient_cmc_details_hash["cardiac_ailment"])["suffering_since"]
        report_details[:history][:cmc][:cmc_cad] = (cardiac_ailment == "0" ? "" : cardiac_ailment)
      end

      if(patient_cmc_details_hash["cva"])
        cmc_cva = JSON.parse(patient_cmc_details_hash["cva"])["suffering_since"]
        report_details[:history][:cmc][:cmc_cva] = (cmc_cva == "0" ? "" : cmc_cva)
      end

      cmc_others = ""
      cmc_thyroid = patient_cmc_details_hash["thyroid"] ? JSON.parse(patient_cmc_details_hash["thyroid"])["suffering_since"] : ""
      cmc_asthma = patient_cmc_details_hash["asthma"] ? JSON.parse(patient_cmc_details_hash["asthma"])["suffering_since"] : ""
      cmc_epilepsy = patient_cmc_details_hash["epilepsy"] ? JSON.parse(patient_cmc_details_hash["epilepsy"])["suffering_since"] : ""

      cmc_others = "#{cmc_others}#{Prawn::Text::NBSP*3}Thy : #{cmc_thyroid}" if cmc_thyroid != "0"
      cmc_others = "#{cmc_others} |#{Prawn::Text::NBSP*3} Asth : #{cmc_asthma}" if cmc_asthma != "0"
      cmc_others = "#{cmc_others} |#{Prawn::Text::NBSP*3} Epi : #{cmc_epilepsy}" if cmc_epilepsy != "0"

      report_details[:history][:cmc][:cmc_others] = cmc_others
    # end

    puts "report_details[:history][:cmc] :#{report_details[:history][:cmc]}"

    report_details[:history][:habits] = {}
    patient_habits =
        PatientHabit
            .joins("inner join habits h on h.id = patient_habits.habit_id")
            .where(:patient_id => patient_id)
            .select("patient_habits.*,h.code,h.name")

    patient_habits.each do|each_patient_habit|
      report_details[:history][:habits][each_patient_habit.name] = (each_patient_habit.comment!="" ? "Yes" : "")
    end

    # Patient Other History Details
    report_details[:history][:other_history_details] = {}
    patient_history = PatientHistory.find_by(:patient_id => patient_id)
    if(patient_history)
      patient_other_history_details = JSON.parse(patient_history.patient_history_details)

      patient_other_history_details.each do |each_patient_other_history_detail_key,each_patient_other_history_detail_value|
        report_details[:history][:other_history_details][each_patient_other_history_detail_key] = each_patient_other_history_detail_value
      end
    else
      report_details[:history][:other_history_details] = {}
    end

    # Patient Examination Finding Details
    patient_index_examination_findings = "
      select e.name,tmp.examination_finding,tmp.examination_id,e.units
        from examinations e
          left outer join (
            select examination_id,examination_finding from examination_details ed
              where patient_id=#{patient_id} and visit_id=0
          ) tmp on tmp.examination_id = e.id
        where 0 = ANY(ailments_supported)
    "
    patient_index_examination_findings = ActiveRecord::Base.connection.execute(patient_index_examination_findings)

    report_details[:examination_findings] = {}
    patient_index_examination_findings.each do |each_patient_index_examination_finding|
      puts "each_patient_index_examination_finding :",each_patient_index_examination_finding.inspect
      report_details[:examination_findings][each_patient_index_examination_finding["name"]] =
          "#{each_patient_index_examination_finding["examination_finding"]} #{each_patient_index_examination_finding["units"]}"
    end

    # puts "====================================\n"
    # puts report_details[:dm_details].inspect
    # puts "----------\n"
    # puts report_details[:pgd].inspect
    # puts "----------\n"
    # puts report_details[:history][:cmc].inspect
    # puts "----------\n"
    # puts report_details[:history][:habits].inspect
    # puts "----------\n"
    # puts report_details[:examination_findings].inspect
    #
    # puts "====================================\n"

    createPatientIndexReport(report_details, patient_id, ailment)

  end

  def createPatientIndexReport(report_details, patient_id, ailment)
    # Find if a Review Report exists for this patient
    patient_report = Report.where(
          :patient_id => patient_id,
          :report_type => "patient",
          :report_type_value => "index",
          :ailment_id => ailment
      )

    report_details[:ailment_details] = {
        :ailment_name => Ailment.find(ailment).botanical_name
    }

    # This is the Block to generate the PDF from the patient's Data
    # patientReviewDoc = PatientIndexTemplate.new(report_details, [10,10,10,50] )
    patientReviewDoc = PatientIndexTemplate.new(report_details)

    patientFilePath = File.join(Rails.root, "public/patientDetails/#{patient_id}/IndexSheets")
    FileUtils.mkdir_p(patientFilePath) unless File.exist?(patientFilePath)

    patientFile = File.join(patientFilePath+"/#{patient_id}_#{Time.now.strftime("%d-%m-%Y")}.pdf")

    if(patient_report.length == 0)
      Report.create({
          :report_type => "patient",
          :report_type_value => "index",
          :report_file_path => patientFile,
          :patient_id => patient_id,
          :report_details => report_details,
          :ailment_id => ailment
      })
    else
      patient_report.first.update({
          :report_file_path => patientFile,
          :report_details => report_details,
          :ailment_id => ailment
      })
    end

    patientReviewDoc.render_file File.join(patientFilePath+"/#{patient_id}_#{Time.now.strftime("%d-%m-%Y")}.pdf")

    patientFile
  end

  def generate_review_data_for_patient_report(patient_id,ailment)
    puts "patient_id,ailment : #{patient_id} : #{ailment}"
    report_details = Hash.new

    # report_details[:dm_details] = PatientAilmentDetail.find_by(
    #   :patient_id => patient_id,
    #   # :ailment_id => Ailment.find_by(:name => "Diabeties").id,
    #   :ailment_id => ailment,
    #   # :ailment_detail_name => "DM ID"
    # )

    patient_ailment = PatientAilmentDetail.find_by(
        :patient_id => patient_id,
        :ailment_id => ailment
    )
    puts "patient_ailment : #{patient_ailment.inspect}"
    report_details[:dm_details] = (patient_ailment ? patient_ailment.patient_ailment_details : {})


    report_details[:ailment_details] = {
        :ailment_name => Ailment.find(ailment).botanical_name
    }

    # report_details[:pgd] =
    #     Patient.joins(:village).where(:id => patient_id).select("patients.*,villages.name as village_name")

    report_details[:pgd] =
        Patient.joins(:village).where(:id => patient_id)
            .select("patients.*,villages.name as village_name, villages.*, patients.name patient_name")


    patient_cmc_details = ComorbidCondition.joins(:ailment).where("patient_id = #{patient_id} and code in ('diabeties','hypertension','cardiac_ailment','cva')").select("code,comorbid_condition_details")
    # binding.pry

    report_details[:cmc] = Hash.new
    cmc_ailments = {
        "diabeties" => "dm",
        "hypertension" => "htn"
        # "cardiac_ailment" => "cad"
    }

    cmc_ailments.each do |each_cmc_ailment_key,each_cmc_ailment_value|
      puts "each_cmc_ailment_key,each_cmc_ailment_value : #{each_cmc_ailment_key} , #{each_cmc_ailment_value}"
      patient_cmc_details_for_each_ailment = patient_cmc_details.where("code = '#{each_cmc_ailment_key}'")
      to_parse = (patient_cmc_details_for_each_ailment.length > 0 ? patient_cmc_details_for_each_ailment.first.comorbid_condition_details : nil)

      if(to_parse)
          cmc_ailment_details = JSON.parse(to_parse)

          if cmc_ailment_details["suffering_since"] != "0"
            display_detail_1 = ""
            if(cmc_ailment_details["ailment_type"])
              display_detail_1 = "#{cmc_ailment_details["ailment_type"]} for "
            end

            report_details[:cmc][each_cmc_ailment_value.to_sym] = "#{display_detail_1}#{calculate_age_with_year(cmc_ailment_details['suffering_since'].to_i)} years"
          end
      end
    end

    # CAD Details
    patient_cmc_details_for_cad = patient_cmc_details.where("code = 'cardiac_ailment'")
    to_parse = (patient_cmc_details_for_cad.length > 0 ? patient_cmc_details_for_cad.first.comorbid_condition_details : nil)

    report_details[:cmc][:cad] = ""
    if(to_parse)
      report_details[:cmc][:cad] = JSON.parse(to_parse)["details"]
    end

    latest_inv_detail_with_cc =
        InvestigationDetail.where("patient_id = #{patient_id} and investigation_details->>'chronic_complication' is not null").order("id desc")
    latest_inv_det = (latest_inv_detail_with_cc.length > 0 ? latest_inv_detail_with_cc.first.investigation_details : nil)

    report_details[:cmc][:chronic_complications] = (latest_inv_det ? latest_inv_det["chronic_complication"] : "")

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

    createPatientReviewReport(report_details, patient_id, ailment)
  end

  def createPatientReviewReport(report_details, patient_id, ailment)
    # Find if a Review Report exists for this patient
    patient_report = Report.where(
        :patient_id => patient_id,
        :report_type => "patient",
        :report_type_value => "review",
        :ailment_id => ailment
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
          :report_details => report_details,
          :ailment_id => ailment
      })
    else
      patient_report.first.update({
          :report_file_path => patientFile,
          :report_details => report_details,
          :ailment_id => ailment
      })
    end

    patientReviewDoc.render_file File.join(patientFilePath+"/#{patient_id}_#{Time.now.strftime("%d-%m-%Y")}.pdf")

    patientFile
  end

  private
  def patient_params
    params[:pgd].permit(:id,:alive,:photo,:name,:age,:gender, :dateOfBirth, :relationName,:bmNo,:contact, :annualIncome, :village_id, :cdno, :sssmhIdNo, :aadharNo)
  end

end
