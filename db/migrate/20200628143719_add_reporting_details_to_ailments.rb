class AddReportingDetailsToAilments < ActiveRecord::Migration[5.1]
  def change
    add_column :ailments, :reporting_details, :json,after: :department_id

	Ailment.find_by(name: "Diabetes").update(
		reporting_details: {
			"ailment_patient_list_report":true
		}
	)

  end

end
