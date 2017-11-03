class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.string :report_type
      t.string :report_type_value
      t.string :report_file_path

      t.references :visit
      t.references :ailment

      t.json :report_details
      t.timestamps
    end
  end
end
