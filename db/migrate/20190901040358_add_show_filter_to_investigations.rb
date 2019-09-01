class AddShowFilterToInvestigations < ActiveRecord::Migration[5.1]
  def self.up
  	add_column :investigations, :show_filter, :boolean, default: :false
  end

  def self.down
    remove_column :investigations, :show_filter
  end
end
