class CreatePatientHabits < ActiveRecord::Migration[5.1]
  def change
    create_table :patient_habits do |t|
      t.references :patient
      t.references :habit
      t.references :visit, default:0
      t.references :ailment, default:0
      t.text :comment

      t.timestamps
    end
  end
end
