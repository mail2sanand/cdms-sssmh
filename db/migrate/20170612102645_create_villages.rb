class CreateVillages < ActiveRecord::Migration[5.1]

  def up
    create_table :villages do |t|

      t.string :name, null:false, default:""
      t.string :volunteerName
      t.string :volunteerMobileNumber
      t.float :xcord
      t.float :ycord
      t.integer :displayOrder
      t.integer :parent_village_id,default:0,null:false
      t.string :mandal
      t.string :district

      t.timestamps
    end
  end


  def down
    drop_table :villages
  end



end
