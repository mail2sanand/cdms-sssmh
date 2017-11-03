class Visit < ApplicationRecord
  belongs_to :patient, foreign_key: "patient_id"
  belongs_to :village, foreign_key: "visited_at"
end
