class PatientHabit < ApplicationRecord
  belongs_to :habit, foreign_key: "habit_id"
  belongs_to :patient
end
