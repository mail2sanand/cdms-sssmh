class CreatePatients < ActiveRecord::Migration[5.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.integer :age
      t.integer :gender

      t.string :contact
      t.string :cdno
      t.string :sssmhIdNo
      t.string :aadharNo
      t.string :bmNo
      t.string :relationName

      t.date :dateOfBirth
      t.string :annualIncome

      t.integer :alive

      t.references :village, foreign_key: true
      t.integer :nodal_village_id

      # t.references :ailment, foreign_key: true
      # t.attachment :photo

      t.timestamps
    end
  end
end
