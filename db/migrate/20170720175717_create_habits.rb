class CreateHabits < ActiveRecord::Migration[5.1]
  def change
    create_table :habits do |t|
      t.string :name
      t.string :code
      t.text :desc

      t.timestamps
    end
  end
end
