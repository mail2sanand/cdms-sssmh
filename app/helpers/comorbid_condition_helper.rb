module ComorbidConditionHelper
  def get_comorbid_conditions_from_helper
    Ailment.where(:parent_ailment_id => nil).select(:id,:name,:code)
  end
end
