class CreateJoinTablePatientAilment < ActiveRecord::Migration[5.1]
  def change
    create_join_table :patients, :ailments do |t|
      t.index [:patient_id, :ailment_id]
      # t.index [:ailment_id, :patient_id]
    end
  end
end
