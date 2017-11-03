class Patient < ApplicationRecord
  belongs_to :village
  # belongs_to :ailment

  has_many :visits

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

end
