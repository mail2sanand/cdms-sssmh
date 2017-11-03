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
      sub_ailment_id = each_comorbid_condition.split("_")[0]
      comorbid_condition_details = comorbid_conditions[each_comorbid_condition]

      if(comorbid_condition_details)
        ComorbidCondition.create({
           :patient_id => patient.id,
           :sub_ailment_id => sub_ailment_id,
           :comorbid_condition_details => comorbid_condition_details
        })
      end
    end
  end

  def update_comorbid_condition_for_patient(patient,comorbid_conditions)
    comorbid_conditions.keys.each do |each_comorbid_condition|
      comorbid_condition_details = comorbid_conditions[each_comorbid_condition]

      # comorbid_condition = ComorbidCondition.find_or_create_by(:patient_id=>patient.id,:sub_ailment_id=>sub_ailment_id)
      sub_ailment_id = each_comorbid_condition.split("_")[0]
      comorbid_condition = ComorbidCondition.find_by(:patient_id=>patient.id,:sub_ailment_id=>sub_ailment_id)

      if(comorbid_condition)
        comorbid_condition.update(:comorbid_condition_details => comorbid_condition_details)
      elsif(!comorbid_condition_details.empty?)
        ComorbidCondition.create({
             :patient_id=>patient.id,
             :sub_ailment_id=>sub_ailment_id,
             :comorbid_condition_details => comorbid_condition_details
           }
        )
      end
    end

  end



  # private

  # def comorbid_condition_params
  #
  # end

end
