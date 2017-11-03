class ExaminationDetail < ApplicationRecord
  belongs_to :visit, optional: true
  belongs_to :examination, foreign_key: "examination_id", optional: true
  belongs_to :patient
end
