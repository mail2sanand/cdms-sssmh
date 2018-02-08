class Examination < ApplicationRecord

  has_many :examination_details

  scope :get_all_index_ailments, -> {where "0 = ANY(ailments_supported)"}

  def get_diabities_ailments
    dm = Ailment.find_by(:name => "Diabetes")
    where("#{dm.id} = ANY(ailments_supported)")
  end

end
