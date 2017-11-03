module AilmentHelper

  def get_examinations_for_ailment(ailment)
    ailmentRecord = Ailment.find_by(:name => ailment)
    Examination.where("#{ailmentRecord.id} = ANY(ailments_supported)")
    # dm_ailments = Examination.where("#{ailmentRecord.id} = ANY(ailments_supported)")
    # puts dm_ailments.as_json.inspect
    # dm_ailments
    # dm_ailments.as_json.merge({
    #   "current_medicine" =>
    # })
    #
    # return {
    #     :ailments => dm_ailments,
    # }
  end

end
