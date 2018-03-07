module AilmentHelper

  def get_examinations_for_ailment(ailment)
    ailmentRecord = Ailment.find_by(:name => ailment)
    Examination.where("#{ailmentRecord.id} = ANY(ailments_supported)").order("id asc")
  end

end
