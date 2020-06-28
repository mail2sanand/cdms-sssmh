require 'report_sqls'

class ReportsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  include ReportSqls

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
      select patient_id, patient_name, village_id, village_name, age, gender, replace(cdno::text,'\"','') as cdno
        from (
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
                p.gender,
                pad.patient_ailment_details->'dm_no' cdno
                FROM patients p
                    JOIN villages v ON v.id = p.village_id
                    left outer join patient_ailment_details pad on pad.patient_id = p.id
    "

    query_2 = ""
    if(village_id == "-1")
      query_2 = "
                   WHERE alive = 0
      "
    elsif(village_id == "-2")
      query_2 = "
                   WHERE alive = 2
      "
    else
      query_2 = "
                   WHERE
      "

      # puts "nodal_village : #{nodal_village} | ",nodal_village
      if(nodal_village == "true")
        # query_2 = query_2 + "(v.id = #{village_id} or v.parent_village_id = #{village_id}) and alive = 1"
        query_2 = query_2 + "p.nodal_village_id = #{village_id} and alive = 1"
      else
        query_2 = query_2 + "p.village_id = #{village_id} and alive = 1"
      end

    end


    query_3 = "
              order by p.name asc
        ) tmp
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
    month_for_printing = (params[:month].empty? ? nil : params[:month].to_i)

    print = params[:print]
    village_name = (village_name == "Select a Village" ? "All Villages" : village_name)

    if(village_name == "Expired Patients" or village_name == "In-Active Patients")
      village_date = ""
    else
      village_date_order = Village.find_by_name(village_name).displayOrder
      
      village_date = calculate_next_month_village_date(village_date_order,month_for_printing)
    end

    combined_village_pdf = CombinePDF.new
    villageFilePath = ""

    if(params[:print] == "review")
      # Select only those Patients whose details have been updated a month ago
      filtered_patients = []

      # to_date = Date.new(Date.today.year, month_for_printing, village_date_order)
      to_date = Date.parse(village_date)
      from_date = to_date.prev_month

      filtered_patients_records =
          Patient.where("patients.id in (#{params[:patient_ids].gsub('_',',')}) and
            patients.updated_at >= '#{from_date.strftime('%Y-%m-%d')}' and patients.updated_at <= '#{to_date.strftime('%Y-%m-%d')}'
      ").order("name ASC")

      # Patient.where("patients.id in (#{params[:patient_ids].gsub('_',',')}) and
      #   patients.updated_at >= (CURRENT_DATE - INTEGER '15') AND patients.updated_at <= CURRENT_TIMESTAMP")
      #     .order("name ASC")


      filtered_patients_records.map{|i| filtered_patients << i.id.to_s} if filtered_patients_records.length > 0

      patient_ids = filtered_patients

      villageFilePath = "ReviewReports"
    elsif(params[:print] == "index")
      villageFilePath = "IndexReports"
    end

    puts "patient_ids : #{patient_ids.inspect}"

    if(patient_ids.length > 0)

      # limit_patients = Array.new
      # limit_patients << patient_ids.first
      # limit_patients << patient_ids.second
      #
      # limit_patients.each do |each_patient|

      patient_ids.each do |each_patient|
          patientFile =
            @@patientsController.print_patient_details_internal(
                each_patient,print,ailment_id,village_date)

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

  def filter_patients_ailments_level
    @ailment_ids = params[:filtered_ailments].keys.map(&:to_i)
    include_expired = params[:include_expired]
    exact_match = params[:exact_match]

    all_sub_ailments = Ailment.all_sub_ailments.select(:id,:parent_ailment_id, :name)

    having_grop_array = []
    filter_query_first = "
      select
        p.id, p.name as patient_name,
        (
          date_part('year', CURRENT_DATE) - date_part('year', \"dateOfBirth\")
        ) as age, 
        case 
          when p.gender = 1 then 'Male'
          else 'Female'
        end as gender, 
        contact,
        (select name from villages where id = village_id) as village_name,
        v.name as nodal_village, tmp2.ccd, pad.patient_ailment_details->>'dm_no' as dm_number
          from patients p
            join villages v on v.id = p.nodal_village_id
            join patient_ailment_details pad on pad.patient_id = p.id
            join ( 
              select patient_id,json_agg(comorbid_condition_details)::jsonb ccd
              from (
    "
    filter_queries_middle_array = []

    params[:filtered_ailments].each do |key, value|
      if sub_ailment=all_sub_ailments.find_by_id(key.to_i)
        filter_queries_middle_array << "(
            select sub_ailment_id,patient_id,comorbid_condition_details::jsonb as comorbid_condition_details
                from comorbid_conditions 
              where comorbid_condition_details->>'ailment_type' = '#{sub_ailment.name}' 
              and (comorbid_condition_details->>'suffering_since')::int > #{value} 
          )
          union all
          "
          having_grop_array << sub_ailment.parent_ailment_id
      else
        filter_queries_middle_array << "(
          select sub_ailment_id,patient_id,comorbid_condition_details
            from (
                select sub_ailment_id,patient_id,
                  ('{\"ailment_type\":\"' || a.name || '\"}')::jsonb || comorbid_condition_details::jsonb as comorbid_condition_details,
                      case 
                        when comorbid_condition_details->>'suffering_since' = '' then '0'
                        else comorbid_condition_details->>'suffering_since'
                      end as formatted_suffering_since,
                      case 
                        when comorbid_condition_details->>'details' = '' then '--'
                        else comorbid_condition_details->>'suffering_since'
                      end as formatted_details
                    from comorbid_conditions cc
                  join ailments a on a.id = cc.sub_ailment_id
                  where sub_ailment_id = #{key.to_i} 
                    and (comorbid_condition_details::jsonb ? 'suffering_since') 
                ) tmp
                where formatted_suffering_since::int > #{value} or formatted_details != '--'
              )
          union all
          "
          having_grop_array << key.to_i
      end
    end

    having_grop_array.uniq!

    filter_queries_middle_array.last.gsub!(/(.*)union all/,"")
    filter_queries_middle = filter_queries_middle_array.join("")

    filter_query_last = "
            ) tmp group by patient_id
            having count(*) = #{having_grop_array.count}
          ) tmp2 on tmp2.patient_id = p.id
          where p.alive = 1
          order by patient_name asc
    "
    
    filter_query = filter_query_first + filter_queries_middle + filter_query_last

    filtered_patients = ActiveRecord::Base.connection.execute(filter_query)
    all_patients_filtered = []

    filtered_patients.each do |each_patient|
      each_patient_detail = {}
      each_patient_detail["patient_name"] = each_patient["patient_name"]
      each_patient_detail["patient_id"] = each_patient["id"]
      each_patient_detail["nodal_village"] = each_patient["nodal_village"]
      each_patient_detail["dm_number"] = each_patient["dm_number"]
      each_patient_detail["age"] = each_patient["age"]
      each_patient_detail["gender"] = each_patient["gender"]
      each_patient_detail["contact"] = each_patient["contact"]
      each_patient_detail["village_name"] = each_patient["village_name"]
      each_patient_detail["ccd"] = ""
      each_patient_detail["ccd_details"] = ""

      JSON.parse(each_patient["ccd"]).each do |each_patient_ccd|
        each_patient_detail["ccd"] += each_patient_ccd["ailment_type"]+" - Since "
        each_patient_detail["ccd"] += each_patient_ccd["suffering_since"].to_s+"</br>" 
        each_patient_detail["ccd_details"] += 
          each_patient_ccd["ailment_type"]+" - "+each_patient_ccd["details"]+"</br>" unless each_patient_ccd["details"].empty?
      end

      all_patients_filtered << each_patient_detail
    end

    respond_to do |format|
      format.html
      format.json { render json: all_patients_filtered}
    end

  end

  def filter_patients_investigation_details_level
    @ailment_ids = params[:filtered_investigation_details].keys.map(&:to_i)
    include_expired = params[:include_expired]
    exact_match = params[:exact_match]

    all_inv_details = []
    all_patients_filtered = []

    all_inv_detail_records = Investigation.select("id, name, code").find(@ailment_ids)

    all_inv_detail_records.each do |each_inv_detail|
      inv_detail_code = each_inv_detail.code
      inv_det_query = send("get_filter_query_for_#{inv_detail_code}")
      
      filtered_patients = ActiveRecord::Base.connection.execute(inv_det_query)

      filtered_patients.each do |each_patient|

        each_patient_detail = {}
        each_patient_detail["patient_name"] = each_patient["patient_name"]
        each_patient_detail["patient_id"] = each_patient["patient_id"]
        each_patient_detail["nodal_village"] = each_patient["nodal_village"]
        each_patient_detail["dm_number"] = each_patient["dm_number"]
        each_patient_detail["age"] = each_patient["age"]
        each_patient_detail["gender"] = each_patient["gender"]
        each_patient_detail["contact"] = each_patient["contact"]
        each_patient_detail["village_name"] = each_patient["village_name"]

        each_patient_detail["inv_specific_remark"] = each_patient["abnormal_usg_abdomen_details"]


        each_patient_ccd = Patient.find(each_patient["patient_id"]).complete_diagnosis_and_remarks
        each_patient_detail["diagnosis"] = each_patient_ccd[:diagnosis]

        each_patient_detail["remarks"] = each_patient_ccd[:remarks]

        all_patients_filtered << each_patient_detail
      end

    end



    respond_to do |format|
      format.html
      format.json { render json: all_patients_filtered}
    end

  end

  def patients_list
    patients_list_for = params[:patients_list_for]

    all_patient_info = []  
  
    patient_records_sql = PatientAilmentDetail.joins(:patient).where(ailment_id: 9)
      # .select(
      #   'patients.name,patients.gender,"relationName","contact",
      #   "dateOfBirth","aadharNo","sssmhIdNo","alive",patient_ailment_details,patient_id')

      patient_records_sql.each do |each_pad|
        each_patient = each_pad.patient
        each_patient_detail = {}
        each_patient_detail["dm_number"] = each_pad.patient_ailment_details["dm_no"]
        each_patient_detail["serial_number"] = each_patient_detail["dm_number"].to_s.delete("^0-9").to_i
        each_patient_detail["patient_name"] = each_patient.name
        each_patient_detail["relation_name"] = each_patient.relationName
        each_patient_detail["patient_id"] = each_patient.id
        each_patient_detail["age"] = calculate_age_with_dob(each_patient.dateOfBirth)
        each_patient_detail["gender"] = each_patient.gender_string
        each_patient_detail["contact"] = each_patient.contact
        each_patient_detail["village_name"] = each_patient.patient_village_name
        each_patient_detail["nodal_village"] = each_patient.nodal_village.name
        each_patient_detail["yob"] = each_patient.dateOfBirth.year

        each_patient_detail["aadharNo"] = each_patient.aadharNo
        each_patient_detail["sssmhIdNo"] = each_patient.sssmhIdNo
        each_patient_detail["live_status"] = each_patient.live_status

        each_patient_ccd = each_patient.complete_diagnosis_and_remarks
        each_patient_detail["diagnosis"] = each_patient_ccd[:diagnosis]

        each_patient_detail["remarks"] = each_patient_ccd[:remarks]

        all_patient_info << each_patient_detail
      end

    respond_to do |format|
      format.html
      format.json { render json: all_patient_info}
    end

  end

  private

  def replace_sub_ailment_ids_with_parent_ailments
    @sub_ailment_conditions = ""
    all_sub_ailments = Ailment.all_sub_ailments.select(:id,:parent_ailment_id, :name)

    all_sub_ailments.each do |each_sub_ailment|
      if @ailment_ids.include? each_sub_ailment.id
        @ailment_ids[@ailment_ids.index(each_sub_ailment.id)] = each_sub_ailment.parent_ailment_id
        sub_ailment_conditions += "and comorbid_condition_details->>'ailment_type' = '#{each_sub_ailment.name}'"
      end

    end
    @ailment_ids.uniq!
  end

end







