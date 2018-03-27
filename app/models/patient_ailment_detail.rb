class PatientAilmentDetail < ApplicationRecord
  self.primary_key = :id

  belongs_to :patient, :foreign_key => "patient_id"
end
