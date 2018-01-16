class CreatePatientHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :patient_histories do |t|
      t.references :ailment
      t.references :patient
      t.jsonb :patient_history_details

      t.timestamps
    end
  end
end
