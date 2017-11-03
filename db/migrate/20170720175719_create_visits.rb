class CreateVisits < ActiveRecord::Migration[5.1]
  def change
    create_table :visits do |t|
      t.references :patient
      t.date :visited_on
      t.integer :visited_at
      t.integer :ailments, array:true, default:[]

      t.timestamps
    end
  end
end
