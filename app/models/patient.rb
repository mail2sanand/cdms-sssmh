class Patient < ApplicationRecord
  belongs_to :village
  # belongs_to :ailment

  has_many :visits
  # has_one :patient_ailment_detail, :foreign_key => "patient_id"

  attr_accessor :patient_photo,:patient_photo_thumb

  has_attached_file :photo,
                    styles: { medium: "300x300>", thumb: "100x100>" },
                    # path:"patientPhotos/:id/:style_:filename",
                    default_url: "/assets/no_photo_available.jpg",
                    # url:"patientPhotos/:id/:style_:filename",
                    path:":rails_root/public/patientDetails/:id/Photos/:style_:filename",
                    url:"/patientDetails/:id/Photos/:style_:filename"

  # path:":rails_root/public/patientPhotos/:id/:style_:filename",
  #     url:"/patientPhotos/:id/:style_:filename"


  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/

  # validates :photo, attachment_presence: true
  # validates_with AttachmentPresenceValidator, attributes: :photo
  # validates_with AttachmentSizeValidator, attributes: :photo, less_than: 1.megabytes

  def self.nodal_village(patient_id)
    record = joins("inner join villages v on v.id = patients.village_id").where(:id => patient_id)
    .select("
      CASE
          WHEN v.parent_village_id != 0
              THEN (SELECT id FROM villages WHERE id=v.parent_village_id)
          ELSE v.id
       END village_id
      ,CASE
          WHEN v.parent_village_id != 0
              THEN v.name || ' (' || (SELECT name FROM villages WHERE id=v.parent_village_id) || ' )'
          ELSE v.name
      END village_name
    ")

    record.first

  end

  def complete_diagnosis_and_remarks
    diagnosis = ""
    remarks = ""

    cmc_details_with_ailments = ComorbidCondition.joins(:ailment)
      .where("patient_id = #{self.id} and comorbid_condition_details->>'suffering_since' != '' 
        and (comorbid_condition_details->>'suffering_since')::int != 0")
      .select("ailments.name as ailment_name, comorbid_condition_details")

    cmc_details_with_ailments.each do |each_cmc_detail|
      cmc_detail = each_cmc_detail.comorbid_condition_details
      ailment_type = cmc_detail["ailment_type"]
      suffering_since = cmc_detail["suffering_since"]
      details = cmc_detail["details"]
      ailment_name = each_cmc_detail.ailment_name

      diagnosis +=  (ailment_type ? ailment_type : ailment_name )+ " - Since #{suffering_since}, "
      remarks += (ailment_type ? ailment_type : ailment_name )+ " #{details}, " if !details.empty?
    end

    return {
      diagnosis: diagnosis.chomp(", "),
      remarks: remarks.chomp(", ")
    }
  end

end















