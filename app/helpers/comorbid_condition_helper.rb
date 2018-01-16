module ComorbidConditionHelper
  def get_comorbid_conditions_from_helper
    # Ailment.where(:parent_ailment_id => nil).select(:id,:name,:code)
    Ailment.select(:id,:name,:code,:parent_ailment_id).order("id asc")
  end

  def get_last_100_years
    ApplicationController.new.get_last_100_years
  end
end
