class CreatePatientAilmentDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :patient_ailment_details do |t|
      t.references :patient
      t.references :ailment
      t.string :ailment_detail_name
      t.string :ailment_detail_value

      t.timestamps
    end
  end
end
