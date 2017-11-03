class ExaminationController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def create_examination_findings_for_patient(patient,examination_findings)
    examination_findings.keys.each do |each_examination_finding|
      examination_id = each_examination_finding.split("_")[0]
      examination_finding = examination_findings[each_examination_finding]

      if(examination_finding)
        ExaminationDetail.create({
           :patient_id => patient.id,
           :examination_id => examination_id,
           :examination_finding => examination_finding
        })
      end
    end
  end

  def update_examination_findings_for_patient(patient,examination_findings)
    puts "Updating the Examination Findings =========>> #{examination_findings.inspect}"

    examination_findings.keys.each do |each_examination_finding|
      puts "each_examination_finding : ====>>>>>>> #{each_examination_finding}"

      puts " each_examination_finding Detail : >>>> #{examination_findings[each_examination_finding]}"

      examination_id = each_examination_finding.split("_")[0]
      examination_finding = examination_findings[each_examination_finding]

      existing_examination_detail_record = ExaminationDetail.find_by(
          :patient_id=>patient.id,
          :examination_id=>examination_id
      )

      if(existing_examination_detail_record)
        existing_examination_detail_record.update(:examination_finding => examination_finding)
      elsif(!examination_finding.empty?)
        ExaminationDetail.create({
             :patient_id=>patient.id,
             :examination_id => examination_id,
             :examination_finding => examination_finding
        })
      end
    end

  end

end
