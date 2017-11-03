class CreateExaminationDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :examination_details do |t|
      t.references :patient
      t.references :visit, default:0
      t.references :examination
      t.references :examination_taken_for_ailment
      t.string :examination_finding

      t.boolean :index
      t.json :examination_details

      t.timestamps
    end
  end
end
