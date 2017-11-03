class AddAttachmentPhotoToPatients < ActiveRecord::Migration[5.1]
  def self.up
    change_table :patients do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :patients, :photo
  end
end
