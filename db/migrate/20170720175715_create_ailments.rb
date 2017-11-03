class CreateAilments < ActiveRecord::Migration[5.1]
  def up
    create_table :ailments do |t|
      t.string :name
      t.string :desc
      t.integer :parent_ailment_id
      t.string :code
      t.references :department,foreign_key:true

      t.timestamps
    end

    add_foreign_key :ailments, :ailments, column: :parent_ailment_id, primary_key: :id
  end

  def down
    drop_table :ailments
  end

  # def change
  # end
end
