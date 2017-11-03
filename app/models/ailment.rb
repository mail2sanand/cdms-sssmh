class Ailment < ApplicationRecord
  belongs_to :parent, class_name: "Ailment", optional: true
  has_many :sub_ailments, class_name: "Ailment", foreign_key: :parent_ailment_id

  has_many :comorbid_conditions

  scope :all_sub_ailments, -> { where("parent_ailment_id is not null") }
  scope :all_ailments, -> {where("parent_ailment_id is null")}

end
