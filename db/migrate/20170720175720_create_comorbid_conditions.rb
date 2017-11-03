class CreateComorbidConditions < ActiveRecord::Migration[5.1]
  def change
    create_table :comorbid_conditions do |t|
      t.references :sub_ailment
      t.references :patient
      t.string :comorbid_condition_details
      t.integer :identified_on_visit

      t.timestamps
    end
  end
end
