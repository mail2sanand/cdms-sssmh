namespace :import do

  # folder_at_access = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/FullData"
  folder_at_access = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/FullData_28_Mar_2018"
  # folder_at_access = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/Patient42"

  desc "Import All Users"
  task patients: :environment do
    # filename = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/new_data.xlsx"
    filename = "#{folder_at_access}/Patients_data.xlsx"

    alternate_village_hash = {
        "Kondakamarala" => "Kondakamarla",
        "Basireddypalli"=>"Basireddipalli",
        "C.C.Thanda, Marala" => "C.C. Thanda",
        "Chandryunpalli" => "Chandrayunpalli",
        "Chpwtakuntapalli" => "Chowtakuntapalli",
        "Eddulavaripalli" => "Yeddulavaripalli",
        "Kanumukalla" => "Kanumukala",
        "Kanumukkala" => "Kanumukala",
        "Mangalmadaka" => "Mangalamadaka",
        "Nallamada" => "Nallamadda",
        "Obuladevarpalli" => "Obuladevarapalli",
        "Pedapalli" => "Peddapalli",
        "Veeranjanepalli" => "Veeranjinapalli",
        "Vengalamacheruvu" => "Vengalamcheruvu",
        "Kambalaparthy" => "Kambalaparthi",
        "Amagondapalem" => "Ammagundapalem",
        "Vankarkunta" => "Vankarakunta"
    }

    xsls = Roo::Excelx.new(filename)
    sheet_0 = xsls.sheet(0)
    i=0
    (2..sheet_0.last_row).each do |each_row|
      sheet_0_each_row = sheet_0.row(each_row)

      patient_id = sheet_0_each_row[0]
      patient_name = sheet_0_each_row[1]
      gender = (sheet_0_each_row[4] == "Female" ? 2 : 1)
      contact_number = sheet_0_each_row[8]
      cdno = sheet_0_each_row[9]
      dateOfBirth = sheet_0_each_row[12].to_s+"-1-1"
      village_id = sheet_0_each_row[6]
      old_village_id = sheet_0_each_row[6]
      old_sub_village = sheet_0_each_row[10]

      alive = ((sheet_0_each_row[13] == "NULL" or sheet_0_each_row[13] == "Y" or village_id == 16) ? 0 : 1 )
      sub_village_rec = Village.find_by_name(old_sub_village)
      nodal_village_id = 0
      if(sub_village_rec)
        village_id = sub_village_rec.id
      else
        # puts "old_sub_village : #{old_sub_village}"
        village_id = Village.find_by_name(alternate_village_hash[old_sub_village]).id
      end

      if(old_village_id == 16)
        new_village = Village.find(village_id)
        nodal_village_id =
            (new_village.parent_village_id == 0 ? new_village.id : new_village.parent_village_id)
      else
        nodal_village_id = old_village_id
      end

      Patient.create({
         :id => patient_id,
         :name => patient_name,
         :gender => gender,
         :village_id => village_id,
         :nodal_village_id => nodal_village_id,
         :contact => contact_number,
         # :cdno => cdno,
         :dateOfBirth=>dateOfBirth,
         :alive => alive
       })

      ailment = Ailment.find_by_name('Diabetes').id

      PatientAilmentDetail.create({
          :patient_id => patient_id,
          :ailment_id => ailment,
          :patient_ailment_details => {
              "sssmh_care_from" => "",
              "dm_no" => cdno
          }
      })


    end

  end

  desc "Import Index Sheet Data"
  task :index_data => [:patient_history,:examination_findings,:inv_det_data,:habits]

  desc "Import Habits of Patient"
  task habits: :environment do
    puts "Processing : Patient Habits\n"
    filename = "#{folder_at_access}/dbo_Answers_original.xlsx"

    latest_patient_history_array = {}

    smoking_habit_id = Habit.find_by(:code => "smoking").id
    alcohol_habit_id = Habit.find_by(:code => "alcohol").id
    tobacco_chewing_habit_id = Habit.find_by(:code => "tobacco_chewing").id
    non_veg_food_habit_id = Habit.find_by(:code => "non_veg_food").id

    xsls = Roo::Excelx.new(filename)
    sheet_0 = xsls.sheet(2)

    (2..sheet_0.last_row).each do |each_row|
      sheet_0_each_row = sheet_0.row(each_row)

      next unless sheet_0_each_row[1]
      habit_name = sheet_0_each_row[1].downcase
      patient_id = sheet_0_each_row[2]

      new_habit_hash = {
          "smoking" => "",
          "alcohol" => "",
          "tobacco_chewing" => "",
          "non_veg_food" => ""
      }

      habit_name.downcase!
      puts "Habit : #{habit_name} \n"

      if(habit_name =~ /good/)
        next
      end

      if(habit_name =~ /smo/)
        new_habit_hash["smoking"] += "Smoker"
      end

      if(habit_name =~ /alc/)
        new_habit_hash["alcohol"] += "Alcoholic"
      end

      if(habit_name =~ /tbc|tob/)
        new_habit_hash["tobacco_chewing"] += "Tobacco"
      end

      if(habit_name =~ /nv/)
        new_habit_hash["non_veg_food"] += "Non-Veg"
      end

      if(habit_name =~ /ex-/)
        new_habit_hash.each do |key,value|
          if value != ""
            new_habit_hash[key] = "Ex-"+value
          end
        end
      end

      if new_habit_hash["smoking"] != ""
        smoking_habit = PatientHabit.find_or_create_by(
            :patient_id => patient_id,
            :habit_id => smoking_habit_id
        )
        smoking_habit.update(:comment => new_habit_hash["smoking"])
      end

      if new_habit_hash["alcohol"] != ""
        alcohol_habit = PatientHabit.find_or_create_by(
            :patient_id => patient_id,
            :habit_id => alcohol_habit_id
        )
        alcohol_habit.update(:comment => new_habit_hash["alcohol"])
      end

      if new_habit_hash["tobacco_chewing"] != ""
        tobacco_chewing_habit = PatientHabit.find_or_create_by(
            :patient_id => patient_id,
            :habit_id => tobacco_chewing_habit_id
        )
        tobacco_chewing_habit.update(:comment => new_habit_hash["tobacco_chewing"])
      end

      if new_habit_hash["non_veg_food"] != ""
        non_veg_food_habit = PatientHabit.find_or_create_by(
            :patient_id => patient_id,
            :habit_id => non_veg_food_habit_id
        )
        non_veg_food_habit.update(:comment => new_habit_hash["non_veg_food"])
      end


    end

  end


  desc "Import Habits of Patient"
  task diet_excercise: :environment do
    puts "Processing : Patient Habits\n"
    filename = "#{folder_at_access}/dbo_Answers_original.xlsx"

    excercise_id = Habit.find_by(:code => "excercise").id
    diet_id = Habit.find_by(:code => "diet").id

    xsls = Roo::Excelx.new(filename)
    sheet_0 = xsls.sheet(3)

    (2..sheet_0.last_row).each do |each_row|
      sheet_0_each_row = sheet_0.row(each_row)

      next unless sheet_0_each_row[1]
      habit_name = sheet_0_each_row[1].downcase
      patient_id = sheet_0_each_row[2]

      excercise_habit = PatientHabit.find_or_create_by(
          :patient_id => patient_id,
          :habit_id => excercise_id
      )
      excercise_habit.update(:comment => habit_name)

      diet_habit = PatientHabit.find_or_create_by(
          :patient_id => patient_id,
          :habit_id => diet_id
      )
      diet_habit.update(:comment => habit_name)

    end

  end

  desc "Import All Patient's History"
  task patient_history: :environment do
    puts "Processing : Patient History\n"
    filename = "#{folder_at_access}/Index_sheet_history_details.xlsx"
    latest_patient_history_array = {}

    xsls = Roo::Excelx.new(filename)
    sheet_0 = xsls.sheet(0)
    i=0
    (2..sheet_0.last_row).each do |each_row|
      sheet_0_each_row = sheet_0.row(each_row)

      patient_id = sheet_0_each_row[2]
      latest_patient_history_array[patient_id] ||= {}


      question = sheet_0_each_row[0]
      answer = sheet_0_each_row[1]
      if(question == 1)
        latest_patient_history_array[patient_id]["type_of_dm"] = answer
      end

      if(question == 2)
        latest_patient_history_array[patient_id]["ailment_suffering_from"] = answer
      end

      if(question == 3)
        if match = answer.to_s.match(/(\d+).*/)
          year = match.captures
          latest_patient_history_array[patient_id]["patient_ailment_details"] = {
              "sssmh_care_from" => year.first,
              "dm_no" => ""
          }
        end
      end

      if(question == 8)
        latest_patient_history_array[patient_id]["patient_history"] = {
            "other_medical_problem" => answer
        }
      end

      if(question == 14)
        latest_patient_history_array[patient_id]["diet_exceicise"] = answer
      end

    end

    ailment = Ailment.find_by_name('Diabetes').id

    latest_patient_history_array.each do |patient_id,patient_history_detail_hash|

      PatientHistory.create({
            :patient_id=>patient_id,
            :patient_history_details => patient_history_detail_hash["patient_history"],
            :ailment_id => ailment
        }
      )

      patient_history_detail_hash = patient_history_detail_hash["patient_ailment_details"]

      puts "Patient Id : ====>> #{patient_id}"
      sssmh_care_from = patient_history_detail_hash ? patient_history_detail_hash['sssmh_care_from'] : ""
      puts "sssmh_care_from : ====>> #{sssmh_care_from}"

      patientAilmentPatientAilmentDetailRec = PatientAilmentDetail.find_by(
          :patient_id => patient_id,
          :ailment_id => ailment
      )

      #
      # patientAilmentPatientAilmentDetailRec.update(:patient_ailment_details => {})
      #
      if patientAilmentPatientAilmentDetailRec
        patient_ailment_details_hash = patientAilmentPatientAilmentDetailRec.patient_ailment_details
        patient_ailment_details_hash.merge!({"sssmh_care_from" => "#{sssmh_care_from}"})
        patientAilmentPatientAilmentDetailRec.update(:patient_ailment_details => patient_ailment_details_hash)
      end

      habit_comment = patient_history_detail_hash ? patient_history_detail_hash["diet_exceicise"] : ""
      PatientHabit.create([{
          :patient_id => patient_id,
          :habit_id => 7,
          :comment => habit_comment
      },{
          :patient_id => patient_id,
          :habit_id => 8,
          :comment => habit_comment
      }])

    end

  end

  desc "Import All Examination Findings"
  task examination_findings: :environment do
    puts "Processing : Patient Examination Findings\n"
    filename = "#{folder_at_access}/Index_exam_findings.xlsx"
    # filename = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/Index_exam_findings.xlsx"

    xsls = Roo::Excelx.new(filename)
    sheet_0 = xsls.sheet(0)
    patient_array = []

    (1..sheet_0.last_row).each do |each_row|
      sheet_0_each_row = sheet_0.row(each_row)
      patient_id = sheet_0_each_row[1]

      next if(patient_array.include?(patient_id))

      # height = sheet_0_each_row[4] ? sheet_0_each_row[4] : ""
      # weight = sheet_0_each_row[5] ? sheet_0_each_row[5] : ""
      # bmi = sheet_0_each_row[6] ? sheet_0_each_row[6] : ""
      # waist_circumfrence = sheet_0_each_row[7] ? sheet_0_each_row[7] : ""
      # pulse = sheet_0_each_row[8] ? sheet_0_each_row[8] : ""
      # bp = sheet_0_each_row[13] ? sheet_0_each_row[13] : ""

      height = return_empty_on_null_or_0(sheet_0_each_row[4])
      weight = return_empty_on_null_or_0(sheet_0_each_row[5])
      bmi = return_empty_on_null_or_0(sheet_0_each_row[6])
      waist_circumfrence = return_empty_on_null_or_0(sheet_0_each_row[7])
      pulse = return_empty_on_null_or_0(sheet_0_each_row[8])
      bp = return_empty_on_null_or_0(sheet_0_each_row[13])

      new_ex_finding_records = [
          {
            :patient_id => patient_id,
            :examination_id => 1,
            :examination_finding => height
          },
          {
              :patient_id => patient_id,
              :examination_id => 2,
              :examination_finding => weight
          },
          {
              :patient_id => patient_id,
              :examination_id => 3,
              :examination_finding => bmi
          },
          {
              :patient_id => patient_id,
              :examination_id => 4,
              :examination_finding => waist_circumfrence
          },
          {
              :patient_id => patient_id,
              :examination_id => 5,
              :examination_finding => pulse
          },
          {
              :patient_id => patient_id,
              :examination_id => 7,
              :examination_finding => bp
          }
      ]

      # Height
      ExaminationDetail.create(new_ex_finding_records)
      patient_array << patient_id

    end

  end

  desc "Import Investigation Details Data from excel Sheet"
  task inv_det_data: :environment do
    puts "Processing : Patient Investigation Details Data\n"
    filename = "#{folder_at_access}/Old_Investigations_Data.xlsx"
    # filename = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/Old_Investigations_Data.xlsx"

    # filename = "/Users/srinianand/Personal/sssmh/cdms-new_app/DB_Data_Migration-Heroku/Index_Sheet_Data/Patient_81_Habibunissa.xlsx"

    inv_det = {}

    xsls = Roo::Excelx.new(filename)
    sheet_0 = xsls.sheet(0) #.row(2).inspect
    i=0
    (2..sheet_0.last_row).each do |each_row|
      dates_and_data = {}
      sheet_0_each_row = sheet_0.row(each_row)

      patient_id = sheet_0_each_row[1]

      lipids_date = sheet_0_each_row[38]
      t_c = sheet_0_each_row[4]
      t_g = sheet_0_each_row[5]
      ldl = sheet_0_each_row[6]
      hdl = sheet_0_each_row[7]
      if(lipids_date and lipids_date != "NULL")
        lipids_date = convertIntoProperDateFormat(sheet_0_each_row[38])
        # lipids_date_time = DateTime.strptime(lipids_date.to_s,'%m/%d/%Y %H:%M:%S')
        # puts "lipids_date_time : ",lipids_date_time
        #
        # lipids_date = lipids_date_time.strftime('%Y-%m-%d')
        dates_and_data[lipids_date.to_s] ||= {}
        dates_and_data[lipids_date.to_s]["lipid_tc"] = t_c
        dates_and_data[lipids_date.to_s]["lipid_tg"] = t_g
        dates_and_data[lipids_date.to_s]["lipid_hdl"] = hdl
        dates_and_data[lipids_date.to_s]["lipid_ldl"] = ldl
      end

      hb1ac_date = sheet_0_each_row[25]
      hb1ac = sheet_0_each_row[8]
      if(hb1ac_date and hb1ac_date != "NULL")
        hb1ac_date = convertIntoProperDateFormat(sheet_0_each_row[25])
        dates_and_data[hb1ac_date.to_s] ||= {}
        dates_and_data[hb1ac_date.to_s]["hba1c"] = hb1ac
      end

      blood_urea_date = sheet_0_each_row[27]
      s_creat_date = sheet_0_each_row[28]
      blood_urea = sheet_0_each_row[10]
      s_crt = sheet_0_each_row[11]
      if(blood_urea_date and blood_urea_date != "NULL")
        blood_urea_date = convertIntoProperDateFormat(sheet_0_each_row[27])
        dates_and_data[blood_urea_date.to_s] ||= {}
        dates_and_data[blood_urea_date.to_s]["blood_urea"] = blood_urea
      end
      if(s_creat_date and s_creat_date != "NULL")
        s_creat_date = convertIntoProperDateFormat(sheet_0_each_row[28])
        dates_and_data[s_creat_date.to_s] ||= {}
        dates_and_data[s_creat_date.to_s]["s_crt"] = s_crt
      end


      usg_date = sheet_0_each_row[29]
      usg_abdomen = sheet_0_each_row[12]
      if(usg_date and usg_date != "NULL")
        usg_date = convertIntoProperDateFormat(sheet_0_each_row[29])
        dates_and_data[usg_date.to_s] ||= {}
        dates_and_data[usg_date.to_s]["usg_abdomen"] = usg_abdomen
      end

      ecg_date = sheet_0_each_row[32]
      ecg = sheet_0_each_row[14]
      if(ecg_date and ecg_date != "NULL")
        ecg_date = convertIntoProperDateFormat(sheet_0_each_row[32])
        dates_and_data[ecg_date.to_s] ||= {}
        dates_and_data[ecg_date.to_s]["ecg"] = ecg
      end

      two_d_echo_date = sheet_0_each_row[33]
      two_d_echo = sheet_0_each_row[15]
      if(two_d_echo_date and two_d_echo_date != "NULL")
        # puts "sheet_0_each_row[33] : #{sheet_0_each_row[33]}"
        two_d_echo_date = convertIntoProperDateFormat(sheet_0_each_row[33])
        dates_and_data[two_d_echo_date.to_s] ||= {}
        dates_and_data[two_d_echo_date.to_s]["2d_echo"] = two_d_echo
      end

      tmt_date = sheet_0_each_row[34]
      tmt = sheet_0_each_row[16]
      if(tmt_date and tmt_date != "NULL")
        tmt_date = convertIntoProperDateFormat(sheet_0_each_row[34])
        dates_and_data[tmt_date.to_s] ||= {}
        dates_and_data[tmt_date.to_s]["tmt"] = tmt
      end

      # dental_screen_date = sheet_0_each_row[37]
      # dental_sce = sheet_0_each_row[19]
      # if(usg_date)
      #   dates_and_data[usg_date]["usg_abdomen"] = usg_abdomen
      # end

      ret_eye_scan_date = sheet_0_each_row[30]
      retinal_eye_scan = sheet_0_each_row[24]
      if(ret_eye_scan_date and ret_eye_scan_date != "NULL")
        ret_eye_scan_date = convertIntoProperDateFormat(sheet_0_each_row[30])
        dates_and_data[ret_eye_scan_date.to_s] ||= {}
        dates_and_data[ret_eye_scan_date.to_s]["retinal_exam"] = retinal_eye_scan
      end

      # puts "========>>> dates_and_data : #{dates_and_data.inspect}"

      merge_patient_details(inv_det,patient_id,dates_and_data) if !dates_and_data.empty?

    end

    # puts "inv_det : #{inv_det.inspect} \n\n"
    # puts "inv_det[81] : #{inv_det[81]} \n\n ===> inv_det[42] ==> #{inv_det[42]}"
    #
    # inv_det[42] = inv_det[42].sort.to_h
    #
    create_inv_details_records_for_patients(inv_det)

  end

  desc "Import all Review Sheet Data"
  task review_data: :environment do
    filename = "#{folder_at_access}/Review_Sheet_Data_original.xlsx"
    review_comorbid_details = {}
    ailment_id = Ailment.find_by_name("Diabetes").id

    xlsx = Roo::Excelx.new(filename)
    sheet_0 = xlsx.sheet(0)
    i=0

    t1 = Time.now
    ActiveRecord::Base.transaction do
      (2..sheet_0.last_row).each do |each_row|
          sheet_0_each_row = sheet_0.row(each_row)

          patient_id = sheet_0_each_row[1]
          created_date = sheet_0_each_row[14]
          next if !created_date or created_date=="NULL"

          created_date = convertIntoProperDateFormat(sheet_0_each_row[14]) #DateTime.strptime(sheet_0_each_row[14].to_s,'%Y-%d-%m').strftime('%Y-%m-%d')
          puts "Processing : #{patient_id} : #{created_date}"

          begin
            patient = Patient.find(patient_id)
          rescue
            next
          end

          # Finding or Creating the Visit for Review Visit Details
              review_visit = Visit.find_or_create_by(
                  :patient_id => patient_id,
                  :visited_on => created_date,
                  :visited_at => Patient.nodal_village(patient_id).village_id,
                  :ailments   => [ailment_id]
              )

          # Examination Findings Of Review Visits
              default_examination_details_hash = {}
              default_examination_details_hash["weight"] = return_empty_on_null_or_0(sheet_0_each_row[5])
              default_examination_details_hash["pulse"] = return_empty_on_null_or_0(sheet_0_each_row[7])

              bp_from_old_portal = sheet_0_each_row[6]
              if bp_from_old_portal and bp_from_old_portal =~ /\//
                default_examination_details_hash["bp"] = bp_from_old_portal
                default_examination_details_hash["bp"].gsub!("NULL","")
              else
                default_examination_details_hash["bp"] = ""
              end

              default_examination_details_hash["hypoglycemic_attacks"] = sheet_0_each_row[10] ? sheet_0_each_row[10] : ""
              default_examination_details_hash["infective_focus"] = sheet_0_each_row[11] ? sheet_0_each_row[11] : ""
              default_examination_details_hash["fbs"] = return_empty_on_null_or_0(sheet_0_each_row[8])
              default_examination_details_hash["ppbs"] = return_empty_on_null_or_0(sheet_0_each_row[9])
              default_examination_details_hash["rbs"] = ""
              default_examination_details_hash["chronic_complication"] = sheet_0_each_row[4] ? sheet_0_each_row[4] : ""
              default_examination_details_hash["current_medicine"] = sheet_0_each_row[12] ? sheet_0_each_row[12] : ""
              default_examination_details_hash["clinical_notes"] = ""

              ExaminationDetail.create({
                 :patient_id => patient_id,
                 :visit_id => review_visit.id,
                 :examination_details => default_examination_details_hash,
                 :examination_id => 0
              })


          unless(review_comorbid_details[patient_id])
            review_comorbid_details[patient_id] = {}
            review_comorbid_details[patient_id]["comorbid_diabteties_type_and_from"] = sheet_0_each_row[17]
            review_comorbid_details[patient_id]["comorbid_htn_and_from"] = sheet_0_each_row[18]
            review_comorbid_details[patient_id]["comorbid_cad"] = sheet_0_each_row[19]
            review_comorbid_details[patient_id]["diet_excercise"] = sheet_0_each_row[21]
          end

      end

    # puts "review_comorbid_details : #{review_comorbid_details.inspect}"

      review_comorbid_details.each do |patient_id,comorbid_condition_details|

    # For Diabetes Comorbid Condition
        comorbid_diabteties_type_and_from =
            comorbid_condition_details["comorbid_diabteties_type_and_from"]

        comorbid_condition_details_for_diabetes = {
            "ailment_type" => "",
            "suffering_since" => "",
            "details" => ""
        }

        if comorbid_diabteties_type_and_from and comorbid_diabteties_type_and_from.class == String
          # if match = comorbid_diabteties_type_and_from.match(/(T1|T2).+(\d+)/)
          if match = comorbid_diabteties_type_and_from.match(/^(T1|T2)\s+.+\s+(\d+)$/)
            diabetes_details = match.captures
            comorbid_condition_details_for_diabetes["ailment_type"] = "Diabetes Type " + (diabetes_details[0] == "T1" ? "1" : "2")
            comorbid_condition_details_for_diabetes["suffering_since"] =
                calculate_year_with_age(diabetes_details[1])
          end
        end

        ComorbidCondition.create({
           :patient_id => patient_id,
           :sub_ailment_id => ailment_id,
           :comorbid_condition_details => comorbid_condition_details_for_diabetes.to_json
        })


    # For HTN Comorbid Condition
        comorbid_htn_and_from = comorbid_condition_details["comorbid_htn_and_from"]
        comorbid_condition_details_for_htn = {
            "suffering_since" => "",
            "details" => ""
        }

        if(comorbid_htn_and_from.class == String)
          if(comorbid_htn_and_from.include?("month"))
            comorbid_condition_details_for_htn["suffering_since"] = calculate_year_with_age(1)
          elsif match = comorbid_htn_and_from.match(/(\d+).*/)
            htn_details = match.captures
            comorbid_condition_details_for_htn["suffering_since"] =
                calculate_year_with_age(htn_details[0])
          end
        end

        ComorbidCondition.create({
           :patient_id => patient_id,
           :sub_ailment_id => Ailment.find_by_name("Hypertension").id,
           :comorbid_condition_details => comorbid_condition_details_for_htn.to_json
        })


    # For CAD Comorbid Condition
        comorbid_cad_and_from = comorbid_condition_details["comorbid_cad"]
        comorbid_condition_details_for_cad = {
            "suffering_since" => "",
            "details" => ""
        }


        if(comorbid_cad_and_from.class == String)
          if match = comorbid_cad_and_from.match(/^(\d*)\s*(.+)/)
            cad_details = match.captures
            cad_suffering_since = cad_details[0]
            cad_comment = cad_details[1]
            if(cad_comment.include? "month")
              cad_suffering_since = 1
            end
            cad_comment.gsub!(/[yr|Yrs.|month|NULL]\s*/,'')

            comorbid_condition_details_for_cad["suffering_since"] =
                calculate_year_with_age(cad_suffering_since) if cad_suffering_since.to_i > 0

            comorbid_condition_details_for_cad["details"] = cad_comment
          end
        end

        ComorbidCondition.create({
           :patient_id => patient_id,
           :sub_ailment_id => Ailment.find_by_name("Cardiac Ailments").id,
           :comorbid_condition_details => comorbid_condition_details_for_cad.to_json
        })

      end
    end

    t2 = Time.now
    t_diff = t2 - t1
    puts " Records Processed : #{i} --- t_diff : #{t_diff}secs, #{t_diff/60}mins and #{t_diff/3600}hours"

  end

  def get_default_investigation_details_hash
    {
        "blood_urea"=>"","s_crt"=>"","lipid_tc"=>"","lipid_tg"=>"","lipid_hdl"=>"","lipid_ldl"=>"",
        "usg_abdomen"=>"","ecg"=>"","2d_echo"=>"","tmt"=>"","retinal_exam"=>"","egfr"=>"",
        "urine_protein_crt_ratio"=>"","hba1c"=>"","others"=>""
    }
  end

  def return_empty_on_null_or_0(parameter)
    return_parameter = parameter
    if(!parameter or parameter == 0)
      return_parameter = ""
    end

    return return_parameter
  end

  # "urine_protein_crt_ratio"=>"","hba1c"=>"","chronic_complication"=>""

  def create_inv_details_records_for_patients(inv_det)

    ailment_id = Ailment.find_by_name("Diabetes").id

    # begin
      inv_det.each do |patient_id,each_patient_details|

        each_patient_details.sort.to_h

        begin
          patient = Patient.find(patient_id)
        rescue
          next
        end

        each_patient_details.each do |inv_detail_date,inv_detail_values_on_date|
          new_patient_inv_details = get_default_investigation_details_hash.merge(inv_detail_values_on_date)
          ActiveRecord::Base.transaction do
            new_visit = Visit.find_or_create_by({
                :patient_id => patient_id,
                :visited_on => inv_detail_date,
                :visited_at=> Patient.nodal_village(patient_id).village_id,
                :ailments => [ailment_id]
            })

            inv_det = InvestigationDetail.create({
              :patient_id => patient_id,
              :visit_id => new_visit.id,
              :ailment_id => ailment_id,
              :investigation_details => new_patient_inv_details
            })
          end
        end
      end
    # rescue Exception => e
    #   puts "==============================>>>>>>>>>>>>>  Exception : #{e.inspect}"
    # end



  end

  def merge_patient_details(inv_det,patient_id,dates_and_data)
    patient_details = inv_det[patient_id]

    patient_details ||= {}
    if(patient_details.empty?)
      patient_details = dates_and_data
    else
      patient_details.each do |each_key,each_value|
        # Check if the date key exists in the dates_and_data
        if(dates_and_data[each_key])
          patient_details[each_key].merge!(dates_and_data[each_key])
        end
        dates_and_data.delete(each_key)
      end
    end

    # Those newly added into the dates_and_data needs to go into patient_details
    dates_and_data.each_key do |each_key|
      patient_details[each_key] = dates_and_data[each_key]
    end

    inv_det[patient_id] = patient_details

  end

  def calculate_year_with_age(age)
    Date.today.year - age.to_i
  end

  def convertIntoProperDateFormat(date_to_be_converted)
    if(date_to_be_converted.class == String)
      DateTime.strptime(date_to_be_converted,'%m/%d/%Y %H:%M:%S').strftime('%Y-%m-%d')
    else
      DateTime.strptime(date_to_be_converted.to_s,'%Y-%d-%m').strftime('%Y-%m-%d')
    end

  end


end
