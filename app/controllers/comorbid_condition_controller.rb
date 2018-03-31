class ComorbidConditionController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def get_all_comorbid_conditions_for_combo
    all_co_morbid_conditions = Ailment.where(:parent_ailment_id => nil).select(:id,:name)

    respond_to do |format|
      format.html
      format.json { render json: all_co_morbid_conditions}
    end
  end

  def create_comorbid_condition_for_patient(patient,comorbid_conditions)

    comorbid_conditions.keys.each do |each_comorbid_condition|
      each_comorbid_condition_keys = comorbid_conditions[each_comorbid_condition]
      comorbid_condition_details = {}

      each_comorbid_condition_keys.keys.each do |each_comorbid_condition_key|
        comorbid_condition_details[each_comorbid_condition_key] = each_comorbid_condition_keys[each_comorbid_condition_key]
      end

      if(comorbid_condition_details["suffering_since"] != "0")
        ComorbidCondition.create({
             :patient_id=>patient.id,
             :sub_ailment_id=>each_comorbid_condition,
             :comorbid_condition_details => comorbid_condition_details.to_json
          }
        )
      end

    end

    # comorbid_conditions.keys.each do |each_comorbid_condition|
    #   sub_ailment_id = each_comorbid_condition.split("_")[0]
    #   comorbid_condition_details = comorbid_conditions[each_comorbid_condition]
    #
    #   if(comorbid_condition_details)
    #     ComorbidCondition.create({
    #        :patient_id => patient.id,
    #        :sub_ailment_id => sub_ailment_id,
    #        :comorbid_condition_details => comorbid_condition_details
    #     })
    #   end
    # end

  end

  def update_comorbid_condition_for_patient(patient,comorbid_conditions)

    comorbid_conditions.keys.each do |each_comorbid_condition|
      each_comorbid_condition_keys = comorbid_conditions[each_comorbid_condition]
      comorbid_condition_details = {}

      each_comorbid_condition_keys.keys.each do |each_comorbid_condition_key|
          comorbid_condition_details[each_comorbid_condition_key] = each_comorbid_condition_keys[each_comorbid_condition_key]
      end

      comorbid_condition = ComorbidCondition.find_by(
          :patient_id=>patient.id,
          :sub_ailment_id=>each_comorbid_condition
      )

      if(comorbid_condition)
        comorbid_condition.update(:comorbid_condition_details => comorbid_condition_details.to_json)
      else
        ComorbidCondition.create({
               :patient_id=>patient.id,
               :sub_ailment_id=>each_comorbid_condition,
               :comorbid_condition_details => comorbid_condition_details.to_json
           }
        )
      end

    end
  end

  def get_cmc_details_for_patient(patientId)
    patientCMCDetails = ComorbidCondition.joins(:ailment).where(:patient_id => patientId)
                            .select("comorbid_conditions.*, ailments.code")

    patientCMCDetailsJson = {}
    patientCMCDetails.each do |each_patientCMCDetail|
      comorbid_condition_details = each_patientCMCDetail.comorbid_condition_details
      puts "comorbid_condition_details : #{comorbid_condition_details}"

      comorbid_condition_details_json = JSON.parse(comorbid_condition_details) if comorbid_condition_details

      if comorbid_condition_details_json["suffering_since"] != "0"
        display_detail_1 = "Suffering"

        if(comorbid_condition_details_json["ailment_type"])
          display_detail_1 = "#{display_detail_1} from #{comorbid_condition_details_json["ailment_type"]}"
        end

        display_detail_1 = "#{display_detail_1} since #{comorbid_condition_details_json['suffering_since']}"

        display_detail_1 = "#{display_detail_1}  -- #{comorbid_condition_details_json["details"]}" if comorbid_condition_details_json["details"]

        if comorbid_condition_details_json['suffering_since'] == ""
          patientCMCDetailsJson["#{each_patientCMCDetail.code}__suffering_since_years"] = ""

          patientCMCDetailsJson["#{each_patientCMCDetail.code}__years_select"] = ""
          patientCMCDetailsJson["#{each_patientCMCDetail.code}__sub_ailment_select"] = ""
        else

          patientCMCDetailsJson["#{each_patientCMCDetail.code}__suffering_since_years"] =
              calculate_age_with_year(comorbid_condition_details_json['suffering_since'].to_i)

          patientCMCDetailsJson["#{each_patientCMCDetail.code}__years_select"] = comorbid_condition_details_json["suffering_since"]
          patientCMCDetailsJson["#{each_patientCMCDetail.code}__sub_ailment_select"] = comorbid_condition_details_json["ailment_type"]
        end

        patientCMCDetailsJson["#{each_patientCMCDetail.code}__display_detail"] = display_detail_1
        patientCMCDetailsJson["#{each_patientCMCDetail.code}__details"] = comorbid_condition_details_json["details"]

      end

    end

    patientCMCDetailsJson

  end

  # def update_comorbid_condition_for_patient(patient,comorbid_conditions)
  #   comorbid_conditions.keys.each do |each_comorbid_condition|
  #     comorbid_condition_details = comorbid_conditions[each_comorbid_condition]
  #
  #     # comorbid_condition = ComorbidCondition.find_or_create_by(:patient_id=>patient.id,:sub_ailment_id=>sub_ailment_id)
  #     sub_ailment_id = each_comorbid_condition.split("_")[0]
  #     comorbid_condition = ComorbidCondition.find_by(:patient_id=>patient.id,:sub_ailment_id=>sub_ailment_id)
  #
  #     if(comorbid_condition)
  #       comorbid_condition.update(:comorbid_condition_details => comorbid_condition_details)
  #     elsif(!comorbid_condition_details.empty?)
  #       ComorbidCondition.create({
  #                                    :patient_id=>patient.id,
  #                                    :sub_ailment_id=>sub_ailment_id,
  #                                    :comorbid_condition_details => comorbid_condition_details
  #                                }
  #       )
  #     end
  #   end
  #
  # end



  private

  def comorbid_condition_params

  end

end
