class CreateInvestigationDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :investigation_details do |t|
      t.references :patient
      t.references :visit
      t.references :ailment
      t.json :investigation_details

      t.timestamps
    end
  end
end
