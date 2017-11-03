class CreateInvestigations < ActiveRecord::Migration[5.1]
  def change
    create_table :investigations do |t|
      t.string :name
      t.string :code
      t.string :units
      t.string :parameter_length
      t.text :desc

      t.timestamps
    end
  end
end
