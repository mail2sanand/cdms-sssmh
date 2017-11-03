class CreateExaminations < ActiveRecord::Migration[5.1]
  def change
    create_table :examinations do |t|
      t.string :name
      t.string :code
      t.string :units
      t.string :parameter_length
      t.integer :ailments_supported, array: true
      t.text :desc

      t.timestamps
    end
  end
end
