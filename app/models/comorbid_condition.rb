class ComorbidCondition < ApplicationRecord
  belongs_to :ailment, foreign_key: "sub_ailment_id"
  belongs_to :patient
end
